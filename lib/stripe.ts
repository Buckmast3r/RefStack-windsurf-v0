import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use the latest stable API version
});

export default stripe;
