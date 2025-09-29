export interface Subscription {
  id: number;
  plan_name: string;
  duration: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  duration_display: string;
  price: string;
  price_display: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  status_display: string;
  description?: string;
  is_featured: boolean;
  max_users?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: number;
  user: number;
  subscription: Subscription;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  status: 'active' | 'expired' | 'cancelled';
}

export interface Payment {
  id: number;
  user_subscription?: number;
  user: number;
  amount: string;
  currency: string;
  payment_method?: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  completed_at?: string;
  failure_reason?: string;
}