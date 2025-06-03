import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        userProfile: {
          select: {
            bio: true,
            website: true,
            twitter: true,
            github: true,
            linkedin: true,
            company: true,
            location: true,
            timezone: true,
            avatarUrl: true,
            bannerUrl: true,
          },
        },
        userPreference: {
          select: {
            theme: true,
          },
        },
        subscription: {
          select: {
            plan: true,
            status: true,
            endDate: true,
          },
        },
        // Include user addons to check for white-label and custom domain permissions
        userAddons: {
          select: {
            addon: {
              select: {
                name: true,
              },
            },
            active: true,
          },
          where: {
            active: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check for active subscription and permissions
    const hasActiveSubscription = user.subscription && 
      user.subscription.status === 'ACTIVE' && 
      (!user.subscription.endDate || new Date(user.subscription.endDate) > new Date());

    // Check for pro features
    const isPro = hasActiveSubscription && user.subscription.plan === 'PRO';
    const isEnterprise = hasActiveSubscription && user.subscription.plan === 'ENTERPRISE';
    
    // Check for white-label addon
    const hasWhiteLabel = user.userAddons.some(
      addon => addon.active && addon.addon.name === 'WHITELABEL'
    );

    // Get custom theme settings if they exist
    const customTheme = isPro || isEnterprise ? await prisma.userTheme.findUnique({
      where: { userId: user.id },
      select: {
        name: true,
        colors: true,
        fonts: true,
      },
    }) : null;

    // Format the response
    const response = {
      id: user.id,
      username: user.username,
      name: user.name,
      bio: user.userProfile?.bio,
      website: user.userProfile?.website,
      twitter: user.userProfile?.twitter,
      github: user.userProfile?.github,
      linkedin: user.userProfile?.linkedin,
      company: user.userProfile?.company,
      location: user.userProfile?.location,
      avatarUrl: user.userProfile?.avatarUrl || user.image,
      bannerUrl: user.userProfile?.bannerUrl,
      theme: user.userPreference?.theme || 'default',
      subscription: isPro || isEnterprise ? {
        plan: user.subscription.plan,
        status: user.subscription.status,
      } : undefined,
      // Only include custom branding for pro/enterprise users
      customTheme: isPro || isEnterprise ? (customTheme?.name || 'default') : 'default',
      customBranding: (isPro || isEnterprise) && customTheme ? {
        colors: customTheme.colors,
        fonts: customTheme.fonts,
      } : undefined,
      // Only include white-label status for users with that addon or enterprise plan
      isWhiteLabeled: hasWhiteLabel || isEnterprise,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch public profile' },
      { status: 500 }
    );
  }
}
