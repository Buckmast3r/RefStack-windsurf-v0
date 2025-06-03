// Coinbase Commerce API utilities
import { Client, resources, Webhook } from 'coinbase-commerce-node';

// Initialize the Coinbase Commerce client
const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

if (!apiKey) {
  console.warn('Coinbase Commerce API key not configured');
}

Client.init(apiKey || '');
const { Charge } = resources;

// Create a one-time charge for crypto payment
export async function createCryptoCharge(
  name: string,
  description: string,
  amount: number,
  currency: string = 'USD',
  metadata: any = {}
) {
  try {
    const chargeData = {
      name,
      description,
      pricing_type: 'fixed_price',
      local_price: {
        amount: amount.toString(),
        currency,
      },
      metadata,
    };

    const charge = await Charge.create(chargeData);
    return charge;
  } catch (error) {
    console.error('Error creating Coinbase Commerce charge:', error);
    throw new Error('Failed to create crypto payment charge');
  }
}

// Verify a Coinbase Commerce webhook signature
export function verifyCoinbaseWebhook(
  rawBody: string,
  signature: string
) {
  try {
    if (!webhookSecret) {
      console.warn('Coinbase Commerce webhook secret not configured');
      return false;
    }
    
    return Webhook.verifyEventBody(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error('Error verifying Coinbase webhook:', error);
    return false;
  }
}

// Get charge details
export async function getChargeDetails(chargeId: string) {
  try {
    const charge = await Charge.retrieve(chargeId);
    return charge;
  } catch (error) {
    console.error('Error retrieving Coinbase charge:', error);
    throw new Error('Failed to retrieve charge details');
  }
}
