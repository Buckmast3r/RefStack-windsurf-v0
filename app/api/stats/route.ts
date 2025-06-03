import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // Get the user's referral links with click and conversion data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        referralLinks: {
          include: {
            clickEvents: true,
          },
        },
      },
    })

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }


    // Calculate total clicks and conversions
    let totalClicks = 0
    let totalConversions = 0

    user.referralLinks.forEach((link: { clickEvents?: { converted: boolean }[] }) => {
      const clickEvents = link.clickEvents || []
      totalClicks += clickEvents.length
      totalConversions += clickEvents.filter((clickEvent: { converted: boolean }) => clickEvent.converted).length
    })

    // Calculate conversion rate
    const conversionRate = totalClicks > 0 
      ? ((totalConversions / totalClicks) * 100).toFixed(1)
      : 0

    // Return the stats
    return new NextResponse(
      JSON.stringify({
        totalClicks,
        totalConversions,
        conversionRate,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching stats:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
