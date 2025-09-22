const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try multiple token storage locations
    const tokenSources = [
      'access_token',
      'authToken',
      'token',
      'auth_token',
      'jwt_token'
    ];
    
    for (const source of tokenSources) {
      const token = localStorage.getItem(source);
      if (token) {
        console.log(`Found token in ${source}`);
        return token;
      }
    }
    
    console.log('No authentication token found');
    return null;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log(`Making request to: ${fullUrl}`);
    console.log(`Has token: ${!!token}`);

    try {
      const response = await fetch(fullUrl, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) return {} as T;
      return await response.json();
      
    } catch (error) {
      console.error(`Request failed: ${fullUrl}`, error);
      throw error;
    }
  }

  async getSubscriptions(): Promise<any> {
    return this.makeRequest('/subscriptions/');
  }

  async createUserSubscription(subscriptionId: number): Promise<any> {
    return this.makeRequest('/user-subscriptions/', {
      method: 'POST',
      body: JSON.stringify({ subscription: subscriptionId }),
    });
  }

  async createPayment(paymentData: any): Promise<any> {
    return this.makeRequest('/payments/', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }
}

export const apiService = new ApiService();