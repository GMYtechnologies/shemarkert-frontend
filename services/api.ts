// api.ts
const API_BASE_URL = 'http://127.0.0.1:8000/api/subscriptions/';

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    // Try multiple token storage locations (keeps parity with your current lookup)
    const tokenSources = ["access_token", "authToken", "token", "auth_token", "jwt_token"];
    for (const source of tokenSources) {
      const token = localStorage.getItem(source);
      if (token) {
        console.log(`Found token in ${source}`);
        return token;
      }
    }

    console.log("No authentication token found");
    return null;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const fullUrl = `${API_BASE_URL}${endpoint}`;

    // Build headers correctly and merge with any provided headers
    const headers = new Headers((options && options.headers) || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
      // uncomment if your backend uses session cookies:
      // credentials: 'include',
    };

    console.log(`Making request to: ${fullUrl}`);
    console.log(`Has token: ${!!token}`);

    try {
      const response = await fetch(fullUrl, config);

      // Keep helpful logging for failures
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status}: ${response.statusText} ${text}`);
      }

      // 204 No Content case
      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`Request failed: ${fullUrl}`, error);
      throw error;
    }
  }

  async getSubscriptions(): Promise<any> {
    return this.makeRequest("/subscriptions/");
  }

  // NEW: fetch user subscriptions (GET)
  async getUserSubscriptions(): Promise<any> {
    return this.makeRequest("/user-subscriptions/");
  }

  async createUserSubscription(subscriptionId: number): Promise<any> {
    return this.makeRequest("/user-subscriptions/", {
      method: "POST",
      body: JSON.stringify({ subscription: subscriptionId }),
    });
  }

  async createPayment(paymentData: any): Promise<any> {
    return this.makeRequest("/payments/", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  }
}

export const apiService = new ApiService();
