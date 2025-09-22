import { Subscription, UserSubscription } from './subscription';

// Correct the API_BASE_URL to be just the base path for all API calls
const API_BASE_URL = 'http://127.0.0.1:8000/api';

class SubscriptionService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = new URL(endpoint, API_BASE_URL);
    const token = this.getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }), 
      ...options.headers,
    };

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  private getAuthToken(): string | null {
    // Get token from localStorage, sessionStorage, or your auth context
    if (typeof window !== 'undefined') {
      // You should set a consistent key for your token, e.g., 'auth_token'
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  
 async getAvailablePlans(): Promise<Subscription[]> {
  return this.request('subscriptions/?status=active');
}

  async getFeaturedPlans(): Promise<Subscription[]> {
    return this.request('subscriptions/featured/');
  }

  async getCurrentUserSubscription(): Promise<UserSubscription | null> {
    try {
      const userSubscriptions = await this.request('user-subscriptions/?status=active');
      return userSubscriptions.length > 0 ? userSubscriptions[0] : null;
    } catch (error) {
      console.error('Error getting current subscription:', error);
      return null;
    }
  }

  // Create a user subscription (store subscription before payment)
  async createUserSubscription(subscriptionId: number): Promise<UserSubscription> {
    return this.request('user-subscriptions/', {
      method: 'POST',
      body: JSON.stringify({
        subscription: subscriptionId,
        status: 'pending', // Start as pending until payment is completed
      }),
    });
  }

  // Activate user subscription after successful payment
  async activateUserSubscription(userSubscriptionId: number): Promise<UserSubscription> {
    return this.request(`user-subscriptions/${userSubscriptionId}/`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'active',
        start_date: new Date().toISOString(),
      }),
    });
  }

  // Create payment record
  async createPayment(paymentData: {
    user_subscription: number;
    amount: string;
    currency: string;
    payment_method: string;
    payment_gateway: string;
    transaction_id?: string;
    phone_number?: string;
  }): Promise<any> {
    return this.request('payments/', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Update payment status (for testing/simulation)
  async updatePaymentStatus(paymentId: number, status: 'pending' | 'completed' | 'failed'): Promise<any> {
    return this.request(`payments/${paymentId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Get user's payment history
  async getPaymentHistory(): Promise<any[]> {
    return this.request('payments/');
  }

  // Get specific payment details
  async getPayment(paymentId: number): Promise<any> {
    return this.request(`payments/${paymentId}/`);
  }

  // Cancel user subscription
  async cancelUserSubscription(userSubscriptionId: number): Promise<UserSubscription> {
    return this.request(`user-subscriptions/${userSubscriptionId}/cancel/`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'cancelled',
        end_date: new Date().toISOString(),
      }),
    });
  }

  // Get subscription analytics/stats for the user
  async getSubscriptionStats(): Promise<any> {
    return this.request('user-subscriptions/stats/');
  }

  // Validate subscription status
  async validateSubscription(userSubscriptionId: number): Promise<boolean> {
    try {
      const subscription = await this.request(`user-subscriptions/${userSubscriptionId}/`);
      return subscription.is_active && new Date(subscription.end_date) > new Date();
    } catch {
      return false;
    }
  }

  // Legacy methods for backward compatibility (you can remove these if not needed)
  async subscribe(subscriptionId: number): Promise<UserSubscription> {
    console.warn('subscribe() is deprecated. Use createUserSubscription() instead.');
    return this.createUserSubscription(subscriptionId);
  }

  async processPayment(paymentData: any): Promise<any> {
    console.warn('processPayment() is deprecated. Use createPayment() instead.');
    return this.createPayment(paymentData);
  }
}

export const subscriptionService = new SubscriptionService();
