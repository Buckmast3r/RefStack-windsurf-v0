import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';

// POST - Create a Stripe checkout session for subscription
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

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `RefStack - ${plan.name} Plan`,
              description: plan.description || `${plan.maxLinks} referral links, and more features`,
            },
            unit_amount: Math.round(plan.price * 100), // Convert to cents
            recurring: {
              interval: plan.billingInterval === 'MONTHLY' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'CHECKOUT_SESSION',
        metadata: { planName: plan.name, checkoutSessionId: stripeSession.id },
      },
    });

    return NextResponse.json({ checkoutUrl: stripeSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
