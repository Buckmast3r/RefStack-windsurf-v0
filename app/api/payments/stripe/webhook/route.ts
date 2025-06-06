import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import prisma from '@/lib/prisma';

// This is your Stripe webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret as string
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        // Extract metadata
        const { userId, planId } = session.metadata || {};

        if (userId && planId) {
          // Fetch the selected plan
          const plan = await prisma.subscriptionPlan.findUnique({
            where: { id: planId },
          });

          if (!plan) {
            console.error('Plan not found:', planId);
            break;
          }

          // Check if user already has a subscription
          const existingSubscription = await prisma.subscription.findUnique({
            where: { userId },
          });

          if (existingSubscription) {
            // Update existing subscription
            await prisma.subscription.update({
              where: { userId },
              data: {
                plan: plan.name,
                maxLinks: plan.maxLinks,
                features: plan.features,
                status: 'ACTIVE',
                stripeSubscriptionId: session.subscription as string,
                stripeCustomerId: session.customer as string,
                stripePriceId: plan.stripePriceId,
                currentPeriodEnd: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ), // Placeholder for 30 days from now
              },
            });
          } else {
            // Create new subscription
            await prisma.subscription.create({
              data: {
                userId,
                plan: plan.name,
                maxLinks: plan.maxLinks,
                features: plan.features,
                status: 'ACTIVE',
                startDate: new Date(),
                stripeSubscriptionId: session.subscription as string,
                stripeCustomerId: session.customer as string,
                stripePriceId: plan.stripePriceId,
                currentPeriodEnd: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ), // Placeholder for 30 days from now
              },
            });
          }

          // Create a success notification for the user
          await prisma.notification.create({
            data: {
              userId,
              title: 'Subscription Active',
              message: `Your ${plan.name} subscription is now active!`,
              type: 'SUCCESS',
            },
          });

          // Log this action in audit log
          await prisma.auditLog.create({
            data: {
              userId,
              action: 'ACTIVATE',
              entity: 'SUBSCRIPTION',
              metadata: { 
                planName: plan.name, 
                checkoutSessionId: session.id,
                stripeSubscriptionId: session.subscription
              },
            },
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;
        const customerId = invoice.customer as string;

        // Find the subscription in our database
        const subscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (subscription) {
          // Update the subscription's current period end
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: 'ACTIVE',
              currentPeriodEnd: new Date(
                (invoice.lines.data[0]?.period?.end || Date.now() / 1000) * 1000
              ),
            },
          });

          // Create an invoice record
          await prisma.invoice.create({
            data: {
              userId: subscription.userId,
              amount: invoice.amount_paid / 100, // Convert from cents
              currency: invoice.currency,
              status: invoice.status,
              stripeInvoiceId: invoice.id,
              stripeCustomerId: customerId,
              paymentMethod: 'STRIPE',
              paidAt: new Date(),
            },
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const stripeSubscriptionId = subscription.id;
        
        // Find the subscription in our database
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId },
        });

        if (dbSubscription) {
          // Update the subscription status
          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              status: subscription.status === 'active' ? 'ACTIVE' : 
                     subscription.status === 'past_due' ? 'PAST_DUE' : 
                     subscription.status === 'unpaid' ? 'UNPAID' : 
                     subscription.status === 'canceled' ? 'CANCELED' : 
                     'UNKNOWN',
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const stripeSubscriptionId = subscription.id;

        // Find the subscription in our database
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId },
        });

        if (dbSubscription) {
          // Update the subscription status to canceled
          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              status: 'CANCELED',
              canceledAt: new Date(),
            },
          });

          // Create a notification for the user
          await prisma.notification.create({
            data: {
              userId: dbSubscription.userId,
              title: 'Subscription Canceled',
              message: 'Your subscription has been canceled.',
              type: 'INFO',
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
