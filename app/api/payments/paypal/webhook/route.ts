import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { getPayPalSubscription } from '@/lib/paypal';

// PayPal webhook verification
function verifyPayPalWebhook(
  requestBody: string,
  transmissionId: string,
  timestamp: string,
  webhookId: string,
  transmissionSig: string
) {
  const webhookSecret = process.env.PAYPAL_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('PayPal webhook secret not configured');
    return false;
  }

  const payload = `${transmissionId}|${timestamp}|${webhookId}|${crypto
    .createHash('sha256')
    .update(requestBody)
    .digest('hex')}`;

  const hmac = crypto.createHmac('sha256', webhookSecret);
  const expectedSignature = hmac.update(payload).digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(transmissionSig),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    
    // Extract PayPal webhook headers
    const transmissionId = headersList.get('paypal-transmission-id');
    const timestamp = headersList.get('paypal-transmission-time');
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    const transmissionSig = headersList.get('paypal-transmission-sig');

    // Verify the webhook signature
    if (!transmissionId || !timestamp || !webhookId || !transmissionSig) {
      return NextResponse.json(
        { error: 'Missing required PayPal webhook headers' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    const isVerified = verifyPayPalWebhook(
      body,
      transmissionId,
      timestamp,
      webhookId,
      transmissionSig
    );

    if (!isVerified) {
      return NextResponse.json(
        { error: 'Invalid PayPal webhook signature' },
        { status: 401 }
      );
    }

    // Parse the event data
    const event = JSON.parse(body);
    const eventType = event.event_type;
    const resource = event.resource;

    // Handle different event types
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.CREATED': {
        // A subscription has been created but not yet activated
        const subscriptionId = resource.id;
        const planId = resource.plan_id;
        const customerId = resource.subscriber.payer_id;
        const email = resource.subscriber.email_address;

        // Find the user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user) {
          console.error('User not found for PayPal subscription:', email);
          break;
        }

        // Find the subscription plan by PayPal plan ID
        const plan = await prisma.subscriptionPlan.findFirst({
          where: { paypalPlanId: planId },
        });

        if (!plan) {
          console.error('Subscription plan not found for PayPal plan:', planId);
          break;
        }

        // Check if user already has a subscription
        const existingSubscription = await prisma.subscription.findUnique({
          where: { userId: user.id },
        });

        // Create a pending subscription record
        if (existingSubscription) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: {
              paypalSubscriptionId: subscriptionId,
              paypalCustomerId: customerId,
              status: 'PENDING',
            },
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId: user.id,
              plan: plan.name,
              maxLinks: plan.maxLinks,
              features: plan.features,
              status: 'PENDING',
              startDate: new Date(),
              paypalSubscriptionId: subscriptionId,
              paypalCustomerId: customerId,
            },
          });
        }

        break;
      }

      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        // Subscription has been activated after first payment
        const subscriptionId = resource.id;
        
        // Get full subscription details from PayPal
        const subscriptionDetails = await getPayPalSubscription(subscriptionId);
        
        // Find the subscription in our database
        const subscription = await prisma.subscription.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });

        if (subscription) {
          // Update the subscription status
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: 'ACTIVE',
              currentPeriodEnd: new Date(subscriptionDetails.billing_info.next_billing_time),
            },
          });

          // Create a notification for the user
          await prisma.notification.create({
            data: {
              userId: subscription.userId,
              title: 'Subscription Active',
              message: `Your subscription is now active!`,
              type: 'SUCCESS',
            },
          });
        }
        
        break;
      }

      case 'BILLING.SUBSCRIPTION.UPDATED': {
        // Subscription details have been updated
        const subscriptionId = resource.id;
        
        // Get full subscription details from PayPal
        const subscriptionDetails = await getPayPalSubscription(subscriptionId);
        
        // Find the subscription in our database
        const subscription = await prisma.subscription.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });

        if (subscription) {
          // Update the subscription details
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: subscriptionDetails.status === 'ACTIVE' ? 'ACTIVE' : 
                     subscriptionDetails.status === 'SUSPENDED' ? 'PAST_DUE' : 
                     'UNKNOWN',
              currentPeriodEnd: new Date(subscriptionDetails.billing_info.next_billing_time),
            },
          });
        }
        
        break;
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED': {
        // Subscription has been cancelled
        const subscriptionId = resource.id;
        
        // Find the subscription in our database
        const subscription = await prisma.subscription.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });

        if (subscription) {
          // Update the subscription status
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: 'CANCELED',
              canceledAt: new Date(),
            },
          });

          // Create a notification for the user
          await prisma.notification.create({
            data: {
              userId: subscription.userId,
              title: 'Subscription Canceled',
              message: 'Your subscription has been canceled.',
              type: 'INFO',
            },
          });
        }
        
        break;
      }

      case 'PAYMENT.SALE.COMPLETED': {
        // Payment has been received
        const saleId = resource.id;
        const paymentAmount = resource.amount.total;
        const paymentCurrency = resource.amount.currency;
        const transactionId = resource.parent_payment;
        const customerId = resource.billing_agreement_id;
        
        // Find the subscription by PayPal customer ID
        const subscription = await prisma.subscription.findFirst({
          where: { paypalSubscriptionId: customerId },
        });

        if (subscription) {
          // Create an invoice record
          await prisma.invoice.create({
            data: {
              userId: subscription.userId,
              amount: parseFloat(paymentAmount),
              currency: paymentCurrency,
              status: 'PAID',
              paypalTransactionId: transactionId,
              paypalSaleId: saleId,
              paymentMethod: 'PAYPAL',
              paidAt: new Date(),
            },
          });

          // Update the subscription's current period
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: 'ACTIVE',
            },
          });
        }
        
        break;
      }

      default:
        console.log(`Unhandled PayPal event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
