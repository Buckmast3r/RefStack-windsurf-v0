import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Fetch user's subscription details
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

    // Fetch the user's subscription with plan details
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    // Fetch available subscription plans
    const plans = await prisma.subscriptionPlan.findMany({
      where: { 
        isPublic: true,
        active: true,
      },
      orderBy: {
        price: 'asc',
      }
    });

    // Fetch user's add-ons
    const userAddons = await prisma.userAddon.findMany({
      where: { userId },
      include: {
        addon: true,
      }
    });

    // Fetch available add-ons
    const availableAddons = await prisma.addon.findMany({
      where: {
        isPublic: true,
        active: true,
      }
    });

    return NextResponse.json({
      subscription,
      plans,
      userAddons,
      availableAddons,
    });
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription details' },
      { status: 500 }
    );
  }
}

// POST - Update user's subscription plan
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
    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Fetch the selected plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.active) {
      return NextResponse.json(
        { error: 'Invalid or inactive subscription plan' },
        { status: 400 }
      );
    }

    // Check if the user already has a subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    let subscription;

    if (existingSubscription) {
      // Update the existing subscription
      subscription = await prisma.subscription.update({
        where: { userId },
        data: {
          plan: plan.name,
          maxLinks: plan.maxLinks,
          features: plan.features,
          // In a real application, you would also update payment-related fields
        },
      });
    } else {
      // Create a new subscription
      subscription = await prisma.subscription.create({
        data: {
          userId,
          plan: plan.name,
          maxLinks: plan.maxLinks,
          features: plan.features,
          status: 'ACTIVE',
          startDate: new Date(),
          // In a real application, you would also set payment-related fields
        },
      });
    }

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'UPDATE',
        entity: 'SUBSCRIPTION',
        entityId: subscription.id,
        metadata: { planName: plan.name },
      },
    });

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId,
        title: 'Subscription Updated',
        message: `Your subscription has been updated to ${plan.name}`,
        type: 'SUCCESS',
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel user's subscription
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
    const { reason } = await request.json();

    // Check if the user has a subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Update the subscription status
    const updatedSubscription = await prisma.subscription.update({
      where: { userId },
      data: {
        status: 'CANCELED',
        cancelAtPeriodEnd: true,
        // In a real application, you would handle the actual cancellation with the payment provider
      },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CANCEL',
        entity: 'SUBSCRIPTION',
        entityId: subscription.id,
        metadata: { reason },
      },
    });

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId,
        title: 'Subscription Canceled',
        message: 'Your subscription has been canceled. You can continue using your current plan until the end of the billing period.',
        type: 'INFO',
      },
    });

    return NextResponse.json(updatedSubscription);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
