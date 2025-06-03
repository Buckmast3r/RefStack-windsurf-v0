import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createPayPalSubscription } from '@/lib/paypal';

// POST - Create a PayPal subscription
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

    // Get the user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'User details not found' },
        { status: 400 }
      );
    }

    // Check if the plan has a PayPal plan ID
    if (!plan.paypalPlanId) {
      return NextResponse.json(
        { error: 'This plan is not available for PayPal payments' },
        { status: 400 }
      );
    }

    // Create a PayPal subscription
    const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard?success=true&provider=paypal`;
    const cancelUrl = `${process.env.NEXTAUTH_URL}/pricing?canceled=true&provider=paypal`;

    const paypalSubscription = await createPayPalSubscription(
      plan.paypalPlanId,
      user.email,
      returnUrl,
      cancelUrl
    );

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'PAYPAL_SUBSCRIPTION',
        metadata: { 
          planName: plan.name, 
          paypalSubscriptionId: paypalSubscription.id 
        },
      },
    });

    // Return the approval URL for the user to complete the subscription
    const approvalUrl = paypalSubscription.links.find(
      (link: any) => link.rel === 'approve'
    )?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: 'Failed to create PayPal subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({ approvalUrl });
  } catch (error) {
    console.error('Error creating PayPal subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal subscription' },
      { status: 500 }
    );
  }
}
