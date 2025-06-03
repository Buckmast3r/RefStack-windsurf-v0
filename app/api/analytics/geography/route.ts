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

    // Get all clicks for user's referral links with country info
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        referralLinks: {
          include: {
            clickEvents: {
              where: {
                timestamp: {
                  gte: startDate
                }
              },
              select: {
                id: true,
                country: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Count clicks by country
    const countryCounts: Record<string, number> = {};
    
    user.referralLinks.forEach((link: { clickEvents: Array<{ country?: string }> }) => {
      link.clickEvents.forEach((click: { country?: string }) => {
        const country = click.country || 'Unknown';
        
        if (!countryCounts[country]) {
          countryCounts[country] = 0;
        }
        
        countryCounts[country] += 1;
      });
    });
    
    // Convert to array and sort by count (descending)
    const geoData = Object.entries(countryCounts)
      .map(([country, clicks]) => ({ country, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10); // Get top 10 countries

    return NextResponse.json(geoData);
  } catch (error) {
    console.error('Error fetching geography data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
