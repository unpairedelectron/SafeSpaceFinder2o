/**
 * API Client for Safe Space Finder
 * Centralized API communication with axios
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/signin';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // ============================================================================
  // Business APIs
  // ============================================================================

  async getBusinesses(params?: Record<string, any>): Promise<APIResponse> {
    const { data } = await this.client.get('/api/businesses', { params });
    return data;
  }

  async getBusiness(id: string): Promise<APIResponse> {
    const { data } = await this.client.get(`/api/businesses/${id}`);
    return data;
  }

  async createBusiness(business: any): Promise<APIResponse> {
    const { data } = await this.client.post('/api/businesses', business);
    return data;
  }

  async updateBusiness(id: string, updates: any): Promise<APIResponse> {
    const { data } = await this.client.patch(`/api/businesses/${id}`, updates);
    return data;
  }

  async deleteBusiness(id: string): Promise<APIResponse> {
    const { data } = await this.client.delete(`/api/businesses/${id}`);
    return data;
  }

  async searchBusinesses(query: string, filters?: Record<string, any>): Promise<APIResponse> {
    const { data } = await this.client.get('/api/businesses/search', {
      params: { q: query, ...filters }
    });
    return data;
  }

  // ============================================================================
  // Review APIs
  // ============================================================================

  async getReviews(businessId: string, params?: Record<string, any>): Promise<APIResponse> {
    const { data } = await this.client.get('/api/reviews', {
      params: { businessId, ...params }
    });
    return data;
  }

  async createReview(review: any): Promise<APIResponse> {
    const { data } = await this.client.post('/api/reviews', review);
    return data;
  }

  async updateReview(id: string, updates: any): Promise<APIResponse> {
    const { data } = await this.client.patch(`/api/reviews/${id}`, updates);
    return data;
  }

  async deleteReview(id: string): Promise<APIResponse> {
    const { data } = await this.client.delete(`/api/reviews/${id}`);
    return data;
  }

  async markReviewHelpful(id: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/reviews/${id}/helpful`);
    return data;
  }

  async reportReview(id: string, reason: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/reviews/${id}/report`, { reason });
    return data;
  }

  // ============================================================================
  // User APIs
  // ============================================================================

  async getProfile(userId: string): Promise<APIResponse> {
    const { data } = await this.client.get(`/api/users/${userId}`);
    return data;
  }

  async updateProfile(userId: string, updates: any): Promise<APIResponse> {
    const { data } = await this.client.patch(`/api/users/${userId}`, updates);
    return data;
  }

  async deleteAccount(userId: string): Promise<APIResponse> {
    const { data } = await this.client.delete(`/api/users/${userId}`);
    return data;
  }

  async getSavedBusinesses(userId: string): Promise<APIResponse> {
    const { data } = await this.client.get(`/api/users/${userId}/saved`);
    return data;
  }

  async saveBusinessToggle(businessId: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/users/saved', { businessId });
    return data;
  }

  async followUser(userId: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/users/${userId}/follow`);
    return data;
  }

  async unfollowUser(userId: string): Promise<APIResponse> {
    const { data } = await this.client.delete(`/api/users/${userId}/follow`);
    return data;
  }

  // ============================================================================
  // Authentication APIs
  // ============================================================================

  async login(email: string, password: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/login', {
      email,
      password
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async signup(userData: any): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/signup', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async logout(): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/logout');
    localStorage.removeItem('token');
    return data;
  }

  async verifyEmail(token: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/verify-email', { token });
    return data;
  }

  async requestPasswordReset(email: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/forgot-password', { email });
    return data;
  }

  async resetPassword(token: string, password: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/auth/reset-password', {
      token,
      password
    });
    return data;
  }

  // ============================================================================
  // Notification APIs
  // ============================================================================

  async getNotifications(params?: Record<string, any>): Promise<APIResponse> {
    const { data } = await this.client.get('/api/notifications', { params });
    return data;
  }

  async markNotificationRead(id: string): Promise<APIResponse> {
    const { data } = await this.client.patch(`/api/notifications/${id}`, {
      read: true
    });
    return data;
  }

  async markAllNotificationsRead(): Promise<APIResponse> {
    const { data } = await this.client.patch('/api/notifications/mark-all-read');
    return data;
  }

  async deleteNotification(id: string): Promise<APIResponse> {
    const { data } = await this.client.delete(`/api/notifications/${id}`);
    return data;
  }

  // ============================================================================
  // Report APIs
  // ============================================================================

  async reportBusiness(businessId: string, reason: string, details?: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/reports', {
      type: 'business',
      targetId: businessId,
      reason,
      details
    });
    return data;
  }

  async reportUser(userId: string, reason: string, details?: string): Promise<APIResponse> {
    const { data } = await this.client.post('/api/reports', {
      type: 'user',
      targetId: userId,
      reason,
      details
    });
    return data;
  }

  // ============================================================================
  // Upload APIs
  // ============================================================================

  async uploadImage(file: File, folder: string = 'general'): Promise<APIResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const { data } = await this.client.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async uploadMultipleImages(files: File[], folder: string = 'general'): Promise<APIResponse> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('folder', folder);

    const { data } = await this.client.post('/api/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  // ============================================================================
  // Admin APIs
  // ============================================================================

  async getAdminStats(): Promise<APIResponse> {
    const { data } = await this.client.get('/api/admin/stats');
    return data;
  }

  async approveBusiness(businessId: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/admin/businesses/${businessId}/approve`);
    return data;
  }

  async rejectBusiness(businessId: string, reason: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/admin/businesses/${businessId}/reject`, {
      reason
    });
    return data;
  }

  async suspendUser(userId: string, reason: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/admin/users/${userId}/suspend`, {
      reason
    });
    return data;
  }

  async getPendingReports(): Promise<APIResponse> {
    const { data } = await this.client.get('/api/admin/reports');
    return data;
  }

  async resolveReport(reportId: string, action: string): Promise<APIResponse> {
    const { data } = await this.client.post(`/api/admin/reports/${reportId}/resolve`, {
      action
    });
    return data;
  }
}

// Export singleton instance
export const apiClient = new APIClient();
export default apiClient;

// Export types
export type { APIResponse };
