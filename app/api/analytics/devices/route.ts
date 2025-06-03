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

    // Get all clicks for user's referral links with device info
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
                deviceType: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Count clicks by device type
    const deviceCounts: Record<string, number> = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0,
      Other: 0
    };
    
    user.referralLinks.forEach((link: { clickEvents: Array<{ deviceType?: string }> }) => {
      link.clickEvents.forEach((click: { deviceType?: string }) => {
        const deviceType = click.deviceType || 'Other';
        
        // Map to standard device categories
        if (deviceType.toLowerCase().includes('desktop')) {
          deviceCounts.Desktop += 1;
        } else if (deviceType.toLowerCase().includes('mobile') || deviceType.toLowerCase().includes('phone')) {
          deviceCounts.Mobile += 1;
        } else if (deviceType.toLowerCase().includes('tablet')) {
          deviceCounts.Tablet += 1;
        } else {
          deviceCounts.Other += 1;
        }
      });
    });
    
    // Format data for chart
    const deviceData = Object.entries(deviceCounts).map(([name, value]) => ({
      name,
      value
    }));

    return NextResponse.json(deviceData);
  } catch (error) {
    console.error('Error fetching device data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
