import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

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

    // Get the user's profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
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

    // Return the user's profile data
    return new NextResponse(
      JSON.stringify({
        ...user,
        ...user.profile,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching user profile:', error)
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

export async function PATCH(request: Request) {
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

    const data = await request.json()

    // Update the user's profile
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
        email: data.email,
        profile: {
          upsert: {
            create: {
              bio: data.bio || null,
              website: data.website || null,
              company: data.company || null,
              location: data.location || null,
              twitter: data.twitter || null,
              github: data.github || null,
              linkedin: data.linkedin || null,
            },
            update: {
              bio: data.bio || null,
              website: data.website || null,
              company: data.company || null,
              location: data.location || null,
              twitter: data.twitter || null,
              github: data.github || null,
              linkedin: data.linkedin || null,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    })

    // Return the updated user data
    return new NextResponse(
      JSON.stringify({
        ...user,
        ...user.profile,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating user profile:', error)
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
