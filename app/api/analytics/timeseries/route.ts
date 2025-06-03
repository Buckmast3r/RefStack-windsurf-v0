import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { subDays, format, parseISO } from 'date-fns';

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

    // Get all clicks for user's referral links
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
              orderBy: {
                timestamp: 'asc'
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prepare data for time series
    const clicksByDay: Record<string, { date: string; clicks: number; conversions: number }> = {};
    
    user.referralLinks.forEach((link: { clickEvents: Array<{ timestamp: Date | string; converted: boolean }> }) => {
      link.clickEvents.forEach((click: { timestamp: Date | string; converted: boolean }) => {
        // Format the date to YYYY-MM-DD
        const day = format(new Date(click.timestamp), 'yyyy-MM-dd');
        
        if (!clicksByDay[day]) {
          clicksByDay[day] = {
            date: day,
            clicks: 0,
            conversions: 0
          };
        }
        
        // Increment clicks for this day
        clicksByDay[day].clicks += 1;
        
        // If this click resulted in a conversion, increment conversions
        if (click.converted) {
          clicksByDay[day].conversions += 1;
        }
      });
    });
    
    // Convert to array and sort by date
    const timeSeriesData = Object.values(clicksByDay).sort((a, b) => 
      parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );

    return NextResponse.json({
      clicks: timeSeriesData,
      conversions: timeSeriesData
    });
  } catch (error) {
    console.error('Error fetching timeseries data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
