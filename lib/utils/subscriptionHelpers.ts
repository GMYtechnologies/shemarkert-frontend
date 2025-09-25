// lib/utils/subscriptionHelpers.js

// Define your plans with a `const` assertion to infer the literal keys.
const planData = {
  Free: {
    features: [
      'Browse all products',
      'Basic search functionality',
      '5 favorites maximum',
      'Standard customer support'
    ],
    color: 'blue'
  },
  Premium: {
    features: [
      'Everything in Free',
      'Unlimited favorites',
      'Price drop alerts',
      'Early access to sales',
      'Priority customer support',
      'Advanced filters',
      'Wishlist sharing'
    ],
    color: 'purple'
  },
  VIP: {
    features: [
      'Everything in Premium',
      'Personal shopping assistant',
      'VIP customer support',
      'Exclusive deals and offers',
      'Free shipping on all orders',
      'Monthly style consultation',
      'Priority access to new arrivals'
    ],
    color: 'gold' // <-- Add the missing 'color' property here
  },
} as const;

// Create a union type of valid plan names.
type PlanName = keyof typeof planData;

// Format price from string to number
export function formatPrice(priceString: string) {
  return parseFloat(priceString || '0');
}

// Get plan features based on plan name
export function getPlanFeatures(planName: PlanName) {
  return planData[planName].features;
}

// Get plan color scheme
export function getPlanColor(planName: PlanName) {
  return planData[planName].color;
}

