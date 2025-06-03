import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { subDays } from 'date-fns';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query parameters
    const url = new URL(request.url);
    const timeframe = url.searchParams.get('timeframe') || '30d';
    
    // Calculate the start date based on timeframe
    let startDate = new Date();
    switch (timeframe) {
      case '7d':
        startDate = subDays(new Date(), 7);
        break;
      case '30d':
        startDate = subDays(new Date(), 30);
        break;
      case '90d':
        startDate = subDays(new Date(), 90);
        break;
      case '1y':
        startDate = subDays(new Date(), 365);
        break;
      case 'all':
        // Default to very old date to get all results
        startDate = new Date(2020, 0, 1);
        break;
    }

    // Get all user's referral links with click and conversion data
    const referralLinks = await prisma.referralLink.findMany({
      where: {
        userId: session.user.id,
        status: 'active'
      },
      include: {
        clickEvents: {
          where: {
            timestamp: {
              gte: startDate
            }
          }
        }
      }
    });

    // Calculate performance metrics for each referral link
    const referralData = referralLinks.map((link: {
      id: string;
      name: string;
      shortCode: string;
      clickEvents: Array<{ converted: boolean }>;
    }) => {
      const clicks = link.clickEvents.length;
      const conversions = link.clickEvents.filter(click => click.converted).length;
      const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
      
      return {
        id: link.id,
        name: link.name || link.shortCode,
        clicks,
        conversions,
        conversionRate: parseFloat(conversionRate.toFixed(1))
      };
    })
    .sort((a: { clicks: number }, b: { clicks: number }) => b.clicks - a.clicks); // Sort by most clicks

    return NextResponse.json(referralData);
  } catch (error) {
    console.error('Error fetching referral performance data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
