// PayPal SDK utilities
import fetch from 'node-fetch';

const PAYPAL_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';

// Generate an access token for PayPal API calls
export async function getPayPalAccessToken(): Promise<string> {
  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json() as { access_token: string };
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw new Error('Failed to authenticate with PayPal');
  }
}

// Create a subscription plan in PayPal
export async function createPayPalSubscriptionPlan(
  planName: string,
  description: string,
  price: number,
  interval: 'MONTH' | 'YEAR'
) {
  const accessToken = await getPayPalAccessToken();
  
  const frequency = interval === 'MONTH' ? 'MONTH' : 'YEAR';
  const frequencyInterval = 1;

  const payload = {
    product_id: process.env.PAYPAL_PRODUCT_ID,
    name: planName,
    description: description,
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: frequency,
          interval_count: frequencyInterval
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: {
            value: price.toString(),
            currency_code: 'USD'
          }
        }
      }
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '0',
        currency_code: 'USD'
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3
    }
  };

  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating PayPal subscription plan:', error);
    throw new Error('Failed to create PayPal subscription plan');
  }
}

// Create a subscription in PayPal
export async function createPayPalSubscription(
  planId: string,
  customerEmail: string,
  returnUrl: string,
  cancelUrl: string
) {
  const accessToken = await getPayPalAccessToken();

  const payload = {
    plan_id: planId,
    subscriber: {
      email_address: customerEmail
    },
    application_context: {
      brand_name: 'RefStack',
      locale: 'en-US',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'SUBSCRIBE_NOW',
      payment_method: {
        payer_selected: 'PAYPAL',
        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
      },
      return_url: returnUrl,
      cancel_url: cancelUrl
    }
  };

  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating PayPal subscription:', error);
    throw new Error('Failed to create PayPal subscription');
  }
}

// Get subscription details from PayPal
export async function getPayPalSubscription(subscriptionId: string) {
  const accessToken = await getPayPalAccessToken();

  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error getting PayPal subscription:', error);
    throw new Error('Failed to get PayPal subscription details');
  }
}

// Cancel a subscription in PayPal
export async function cancelPayPalSubscription(subscriptionId: string, reason: string) {
  const accessToken = await getPayPalAccessToken();

  try {
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        reason: reason
      })
    });

    return response.status === 204;
  } catch (error) {
    console.error('Error cancelling PayPal subscription:', error);
    throw new Error('Failed to cancel PayPal subscription');
  }
}
