// services/subscriptionService.ts

export interface Subscription {
  id: number;
  plan_name: string;
  price: string;
  duration: string;
  duration_display: string;
  description: string;
  is_featured: boolean;
  is_active: boolean;
  status: string;
  status_display: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  subscription: Subscription;
  payment?: Payment;
  status: string;
  start_date: string;
  end_date?: string;
  auto_renewal: boolean;
  trial_end_date?: string;
  is_active: boolean;
  is_trial_active?: boolean;
  days_remaining?: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  subscription: number;
  payment_method_type: string;
  amount: string;
  currency: string;
  status: string;
  transaction_id?: string;
  failure_reason?: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  card_type: string;
  last_four: string;
  cardholder_name: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
}

export interface PaymentRequest {
  subscription_id: number;
  amount: string;
  payment_method: string;
  card_number?: string;
  expiry_month?: number;
  expiry_year?: number;
  cvv?: string;
  cardholder_name?: string;
  save_card?: boolean;
  phone_number?: string;
  transaction_id?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class SubscriptionService {
  private baseURL: string;

  constructor() {
    this.baseURL =  'http://127.0.0.1:8000/';
  }

  // Get auth headers with token
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  // Handle API responses
  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    
    return data;
  }

  // Get available subscription plans
  async getAvailablePlans(): Promise<Subscription[]> {
    try {
      const response = await fetch(`${this.baseURL}/subscriptions/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Subscription[]>(response);
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }

  // Get current user subscription
  async getCurrentUserSubscription(): Promise<UserSubscription | null> {
    try {
      const response = await fetch(`${this.baseURL}/user-subscription/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.status === 404) {
        return null; // No active subscription
      }

      return await this.handleResponse<UserSubscription>(response);
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      throw error;
    }
  }

  // Process payment
  async processPayment(paymentData: PaymentRequest): Promise<Payment> {
    try {
      const response = await fetch(`${this.baseURL}/process-payment/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData),
      });

      return await this.handleResponse<Payment>(response);
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  // Subscribe user to a plan
  async subscribe(subscriptionId: number): Promise<UserSubscription> {
    try {
      const response = await fetch(`${this.baseURL}/subscribe/${subscriptionId}/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<UserSubscription>(response);
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error;
    }
  }

  // Get user's saved payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await fetch(`${this.baseURL}/payment-methods/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PaymentMethod[]>(response);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  // Add new payment method
  async addPaymentMethod(paymentMethodData: Omit<PaymentMethod, 'id' | 'created_at'>): Promise<PaymentMethod> {
    try {
      const response = await fetch(`${this.baseURL}/payment-methods/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentMethodData),
      });

      return await this.handleResponse<PaymentMethod>(response);
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  // Get payment history
  async getPaymentHistory(): Promise<Payment[]> {
    try {
      const response = await fetch(`${this.baseURL}/payment-history/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Payment[]>(response);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }
}

export const subscriptionService = new SubscriptionService();