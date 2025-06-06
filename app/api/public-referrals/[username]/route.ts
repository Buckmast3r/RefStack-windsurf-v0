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
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all active referral links for the user
    const referralLinks = await prisma.referralLink.findMany({
      where: {
        userId: user.id,
        active: true,
      },
      select: {
        id: true,
        name: true,
        url: true,
        shortCode: true,
        customSlug: true,
        description: true,
        customLogo: true,
        customColor: true,
        category: true,
        displayOrder: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            clicks: true,
          },
        },
        clicks: {
          where: {
            converted: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Define type for referral link
    type ReferralLink = {
      id: string;
      name: string;
      url: string;
      shortCode: string;
      customSlug: string | null;
      description: string | null;
      customLogo: string | null;
      customColor: string | null;
      category: string;
      displayOrder: number;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      _count: {
        clicks: number;
      };
      clicks: {
        id: string;
      }[];
    };

    // Format the referral links
    const formattedLinks = referralLinks.map((link: ReferralLink) => ({
      id: link.id,
      name: link.name,
      url: link.url,
      shortCode: link.shortCode,
      customSlug: link.customSlug,
      description: link.description,
      customLogo: link.customLogo,
      customColor: link.customColor,
      category: link.category,
      displayOrder: link.displayOrder,
      status: link.active ? 'active' : 'inactive',
      clicks: link._count.clicks,
      conversions: link.clicks.length,
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      links: formattedLinks,
      totalCount: formattedLinks.length,
    });
  } catch (error) {
    console.error('Error fetching public referral links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch public referral links' },
      { status: 500 }
    );
  }
}
