export const formatPrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  return parseFloat(price.replace(/[^0-9.-]/g, '')) || 0;
};

export const getPlanFeatures = (planName: string): string[] => {
  const features: Record<string, string[]> = {
    'Free': [
      "Browse all products",
      "Basic search filters",
      "Save up to 10 favorites",
      "Standard customer support",
      "Mobile app access",
    ],
    'Premium': [
      "Everything in Free",
      "Unlimited favorites",
      "Advanced search & filters",
      "Price drop notifications",
      "Early access to sales",
      "Priority customer support",
      "Exclusive deals & discounts",
      "Personal style recommendations",
    ],
    'VIP': [
      "Everything in Premium",
      "Free shipping on all orders",
      "VIP customer service",
      "Personal shopping assistant",
      "Exclusive VIP-only products",
      "Monthly style consultation",
      "Birthday & anniversary gifts",
      "Private sales access",
      "Return shipping covered",
    ]
  };
  
  return features[planName] || [];
};

export const getPlanColor = (planName: string): string => {
  const colors: Record<string, string> = {
    'Free': 'plan-card plan-card--free',
    'Premium': 'plan-card plan-card--premium',
    'VIP': 'plan-card plan-card--vip'
  };
  return colors[planName] || '';
};