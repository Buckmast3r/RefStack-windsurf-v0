import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    // Only allow for PRO/ENTERPRISE
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const plan = user.subscription?.plan || 'FREE';
    if (plan !== 'PRO' && plan !== 'ENTERPRISE') {
      return NextResponse.json({ error: 'Upgrade required for branding' }, { status: 403 });
    }
    // Update branding in userProfile and userTheme
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        avatarUrl: data.avatarUrl,
        bannerUrl: data.bannerUrl,
      },
      create: {
        userId: user.id,
        avatarUrl: data.avatarUrl,
        bannerUrl: data.bannerUrl,
      },
    });
    await prisma.userTheme.upsert({
      where: { userId: user.id },
      update: {
        logo: data.logo,
        colors: {
          primary: data.primary,
          secondary: data.secondary,
          background: data.background,
        },
        fonts: {
          heading: data.fontHeading,
          body: data.fontBody,
        },
      },
      create: {
        userId: user.id,
        logo: data.logo,
        colors: {
          primary: data.primary,
          secondary: data.secondary,
          background: data.background,
        },
        fonts: {
          heading: data.fontHeading,
          body: data.fontBody,
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating branding:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
