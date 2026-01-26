const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

console.log('wwwwwwwwww', process.env.NEXT_PUBLIC_API_URL)
interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class FetchClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...init } = options;

    console.log('wwwwwaaaa', this.baseURL)
    let fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      fullUrl += `?${searchParams.toString()}`;
    }

    const headers = {
      'Content-Type': 'application/json',
      ...init.headers,
    };

    try {
      const response = await fetch(fullUrl, {
        ...init,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  get<T>(url: string, params?: Record<string, string>, options?: Omit<FetchOptions, 'params' | 'method'>) {
    return this.request<T>(url, { ...options, method: 'GET', params });
  }

  post<T>(url: string, body?: unknown, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return this.request<T>(url, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(body) 
    });
  }

  put<T>(url: string, body?: unknown, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return this.request<T>(url, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(body) 
    });
  }

  delete<T>(url: string, options?: Omit<FetchOptions, 'method'>) {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new FetchClient(BASE_URL);
