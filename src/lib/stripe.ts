import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY environment variable');
}

export const stripePromise = stripeKey ? loadStripe(stripeKey) : null;
