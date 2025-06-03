import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyCoinbaseWebhook } from '@/lib/coinbase';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    
    // Get the signature from the header
    const signature = headersList.get('x-cc-webhook-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Coinbase signature header' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    const isVerified = verifyCoinbaseWebhook(body, signature);
    
    if (!isVerified) {
      return NextResponse.json(
        { error: 'Invalid Coinbase webhook signature' },
        { status: 401 }
      );
    }

    // Parse the event data
    const event = JSON.parse(body);
    const eventType = event.type;
    const eventData = event.data;

    // Handle different event types
    switch (eventType) {
      case 'charge:confirmed': {
        // Payment has been confirmed on the blockchain
        const chargeId = eventData.id;
        const metadata = eventData.metadata;
        const paymentAmount = parseFloat(eventData.pricing.local.amount);
        const paymentCurrency = eventData.pricing.local.currency;
        
        if (!metadata || !metadata.userId || !metadata.planId) {
          console.error('Missing metadata in Coinbase charge:', chargeId);
          break;
        }

        const userId = metadata.userId;
        const planId = metadata.planId;
        const months = parseInt(metadata.months) || 1;

        // Fetch the subscription plan
        const plan = await prisma.subscriptionPlan.findUnique({
          where: { id: planId },
        });

        if (!plan) {
          console.error('Plan not found for crypto payment:', planId);
          break;
        }

        // Calculate subscription end date based on months purchased
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);

        // Check if user already has a subscription
        const existingSubscription = await prisma.subscription.findUnique({
          where: { userId },
        });

        let subscription;

        if (existingSubscription) {
          // Update existing subscription
          subscription = await prisma.subscription.update({
            where: { userId },
            data: {
              plan: plan.name,
              maxLinks: plan.maxLinks,
              features: plan.features,
              status: 'ACTIVE',
              currentPeriodEnd: endDate,
            },
          });
        } else {
          // Create new subscription
          subscription = await prisma.subscription.create({
            data: {
              userId,
              plan: plan.name,
              maxLinks: plan.maxLinks,
              features: plan.features,
              status: 'ACTIVE',
              startDate: new Date(),
              currentPeriodEnd: endDate,
            },
          });
        }

        // Create an invoice record
        await prisma.invoice.create({
          data: {
            userId,
            amount: paymentAmount,
            currency: paymentCurrency,
            status: 'PAID',
            cryptoTransactionId: chargeId,
            paymentMethod: 'CRYPTO',
            paidAt: new Date(),
            metadata: {
              chargeCode: eventData.code,
              blockchain: eventData.payments[0]?.network,
              transaction: eventData.payments[0]?.transaction_id,
            },
          },
        });

        // Create a notification for the user
        await prisma.notification.create({
          data: {
            userId,
            title: 'Crypto Payment Confirmed',
            message: `Your payment for the ${plan.name} plan has been confirmed. Your subscription is now active!`,
            type: 'SUCCESS',
          },
        });

        // Log this action in audit log
        await prisma.auditLog.create({
          data: {
            userId,
            action: 'PAYMENT',
            entity: 'SUBSCRIPTION',
            entityId: subscription.id,
            metadata: { 
              planName: plan.name, 
              chargeId,
              amount: paymentAmount,
              months
            },
          },
        });
        
        break;
      }

      case 'charge:failed': {
        // Payment has failed or expired
        const chargeId = eventData.id;
        const metadata = eventData.metadata;
        
        if (!metadata || !metadata.userId) {
          console.error('Missing metadata in failed Coinbase charge:', chargeId);
          break;
        }

        const userId = metadata.userId;

        // Create a notification for the user
        await prisma.notification.create({
          data: {
            userId,
            title: 'Payment Failed',
            message: 'Your cryptocurrency payment has failed or expired. Please try again.',
            type: 'ERROR',
          },
        });

        // Log this action in audit log
        await prisma.auditLog.create({
          data: {
            userId,
            action: 'PAYMENT_FAILED',
            entity: 'CRYPTO_CHARGE',
            metadata: { chargeId },
          },
        });
        
        break;
      }

      default:
        console.log(`Unhandled Coinbase event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Coinbase webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
