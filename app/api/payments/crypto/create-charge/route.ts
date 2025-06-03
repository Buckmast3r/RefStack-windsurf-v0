import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createCryptoCharge } from '@/lib/coinbase';

// POST - Create a crypto payment charge
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
    const { planId, months = 1 } = await request.json();

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

    // Calculate the total amount based on the plan and duration
    const amount = plan.price * months;
    
    // Create a charge for the subscription
    const charge = await createCryptoCharge(
      `RefStack - ${plan.name} Plan`,
      `${months} month${months > 1 ? 's' : ''} subscription to ${plan.name} plan`,
      amount,
      'USD',
      {
        userId,
        planId,
        months,
        email: user.email,
      }
    );

    // Create a record in the database for this payment attempt
    await prisma.paymentMethod.create({
      data: {
        userId,
        type: 'CRYPTO',
        provider: 'COINBASE',
        providerAccountId: charge.id,
        metadata: {
          chargeId: charge.id,
          planId,
          months,
        },
      },
    });

    // Log this action in audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'CRYPTO_CHARGE',
        metadata: { 
          planName: plan.name, 
          chargeId: charge.id,
          amount,
          months
        },
      },
    });

    return NextResponse.json({
      chargeId: charge.id,
      hostedUrl: charge.hosted_url,
      expiresAt: charge.expires_at,
      amount,
      supportedNetworks: charge.addresses,
    });
  } catch (error) {
    console.error('Error creating crypto charge:', error);
    return NextResponse.json(
      { error: 'Failed to create crypto payment charge' },
      { status: 500 }
    );
  }
}
