import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { nanoid } from 'nanoid';

// Function to generate a unique short code
const generateUniqueShortCode = async () => {
  const shortCode = nanoid(8);
  const existingLink = await prisma.referralLink.findUnique({
    where: { shortCode },
  });
  if (existingLink) {
    return generateUniqueShortCode();
  }
  return shortCode;
};

// Function to check if user has reached their referral link limit
const checkReferralLinkLimit = async (userId: string) => {
  // Get user's subscription
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Count existing active referral links
  const currentLinkCount = await prisma.referralLink.count({
    where: { 
      userId: userId,
      active: true 
    },
  });

  // Get max allowed links (default to 5 for free tier)
  const maxLinks = user.subscription?.maxLinks || 5;

  return {
    canCreate: currentLinkCount < maxLinks,
    currentCount: currentLinkCount,
    maxLinks,
  };
};

// GET - Fetch user's referral links
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // Fetch referral links for the authenticated user
    const referralLinks = await prisma.referralLink.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get user's link limit info
    const limitInfo = await checkReferralLinkLimit(userId);

    return NextResponse.json({
      links: referralLinks,
      limitInfo
    });
  } catch (error) {
    console.error('Error fetching referral links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referral links' },
      { status: 500 }
    );
  }
}

// POST - Create a new referral link
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { name, url, description, customSlug, customColor, customLogo } = await request.json();

    // Validate required fields
    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      );
    }

    // Check user's limit
    const { canCreate, currentCount, maxLinks } = await checkReferralLinkLimit(userId);

    if (!canCreate) {
      return NextResponse.json(
        { 
          error: 'You have reached your referral link limit',
          currentCount,
          maxLinks 
        },
        { status: 403 }
      );
    }

    // Generate a unique short code
    const shortCode = await generateUniqueShortCode();

    // Create the referral link
    const referralLink = await prisma.referralLink.create({
      data: {
        userId,
        name,
        url,
        shortCode,
        description,
        customSlug,
        customColor,
        customLogo,
        active: true,
      },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'REFERRAL_LINK',
        entityId: referralLink.id,
        metadata: { name, url },
      },
    });

    return NextResponse.json(referralLink, { status: 201 });
  } catch (error) {
    console.error('Error creating referral link:', error);
    return NextResponse.json(
      { error: 'Failed to create referral link' },
      { status: 500 }
    );
  }
}

// PATCH - Update an existing referral link
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { id, name, url, description, customSlug, customColor, customLogo, active } = await request.json();

    // Validate required fields
    if (!id || !name || !url) {
      return NextResponse.json(
        { error: 'ID, name, and URL are required' },
        { status: 400 }
      );
    }

    // Check if the referral link exists and belongs to the user
    const existingLink = await prisma.referralLink.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingLink) {
      return NextResponse.json(
        { error: 'Referral link not found or does not belong to you' },
        { status: 404 }
      );
    }

    // If trying to activate, check user's limit
    if (active && !existingLink.active) {
      const { canCreate } = await checkReferralLinkLimit(userId);
      if (!canCreate) {
        return NextResponse.json(
          { error: 'You have reached your referral link limit' },
          { status: 403 }
        );
      }
    }

    // Check if custom slug is already taken
    if (customSlug && customSlug !== existingLink.customSlug) {
      const slugExists = await prisma.referralLink.findFirst({
        where: {
          customSlug,
          id: { not: id },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Custom slug is already taken' },
          { status: 400 }
        );
      }
    }

    // Update the referral link
    const updatedLink = await prisma.referralLink.update({
      where: { id },
      data: {
        name,
        url,
        description,
        customSlug,
        customColor,
        customLogo,
        active: active !== undefined ? active : existingLink.active,
      },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'UPDATE',
        entity: 'REFERRAL_LINK',
        entityId: id,
        metadata: { name, url },
      },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating referral link:', error);
    return NextResponse.json(
      { error: 'Failed to update referral link' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a referral link
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Referral link ID is required' },
        { status: 400 }
      );
    }

    // Check if the referral link exists and belongs to the user
    const existingLink = await prisma.referralLink.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingLink) {
      return NextResponse.json(
        { error: 'Referral link not found or does not belong to you' },
        { status: 404 }
      );
    }

    // Delete the referral link
    await prisma.referralLink.delete({
      where: { id },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'DELETE',
        entity: 'REFERRAL_LINK',
        entityId: id,
        metadata: { name: existingLink.name },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting referral link:', error);
    return NextResponse.json(
      { error: 'Failed to delete referral link' },
      { status: 500 }
    );
  }
}
