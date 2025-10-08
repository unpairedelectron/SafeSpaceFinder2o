/**
 * Custom hooks for data fetching using SWR
 * Provides real-time data synchronization and caching
 */

import useSWR, { mutate } from 'swr';
import { apiClient, APIResponse } from '@/lib/api-client';

// ============================================================================
// Business Hooks
// ============================================================================

interface UseBusinessesOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  city?: string;
  minScore?: number;
  features?: {
    wheelchair?: boolean;
    lgbtq?: boolean;
    autismFriendly?: boolean;
    [key: string]: boolean | undefined;
  };
}

export function useBusinesses(options: UseBusinessesOptions = {}) {
  const params = new URLSearchParams();
  
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle nested objects (like features)
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue) params.append(subKey, String(subValue));
        });
      } else {
        params.append(key, String(value));
      }
    }
  });

  const queryString = params.toString();
  const key = queryString ? `/api/businesses?${queryString}` : '/api/businesses';

  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    key,
    () => apiClient.getBusinesses(options),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    businesses: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate: revalidate,
  };
}

export function useBusiness(id: string | null) {
  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    id ? `/api/businesses/${id}` : null,
    id ? () => apiClient.getBusiness(id) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    business: data?.data,
    isLoading,
    error,
    mutate: revalidate,
  };
}

// ============================================================================
// Review Hooks
// ============================================================================

interface UseReviewsOptions {
  page?: number;
  limit?: number;
  sort?: 'recent' | 'helpful' | 'rating';
}

export function useReviews(
  businessId: string | null,
  options: UseReviewsOptions = {}
) {
  const { page = 1, limit = 10, sort = 'recent' } = options;

  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    businessId ? `/api/reviews?businessId=${businessId}&page=${page}&limit=${limit}&sort=${sort}` : null,
    businessId ? () => apiClient.getReviews(businessId, { page, limit, sort }) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    reviews: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate: revalidate,
  };
}

// ============================================================================
// User Hooks
// ============================================================================

export function useProfile(userId: string | null) {
  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    userId ? `/api/users/${userId}` : null,
    userId ? () => apiClient.getProfile(userId) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    profile: data?.data,
    isLoading,
    error,
    mutate: revalidate,
  };
}

export function useSavedBusinesses(userId: string | null) {
  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    userId ? `/api/users/${userId}/saved` : null,
    userId ? () => apiClient.getSavedBusinesses(userId) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    savedBusinesses: data?.data || [],
    isLoading,
    error,
    mutate: revalidate,
  };
}

// ============================================================================
// Notification Hooks
// ============================================================================

interface UseNotificationsOptions {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { unreadOnly = false, page = 1, limit = 20 } = options;

  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    `/api/notifications?unreadOnly=${unreadOnly}&page=${page}&limit=${limit}`,
    () => apiClient.getNotifications({ unreadOnly, page, limit }),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  const markAsRead = async (id: string) => {
    await apiClient.markNotificationRead(id);
    revalidate();
  };

  const markAllAsRead = async () => {
    await apiClient.markAllNotificationsRead();
    revalidate();
  };

  return {
    notifications: data?.data || [],
    unreadCount: (data as any)?.unreadCount || 0,
    pagination: data?.pagination,
    isLoading,
    error,
    mutate: revalidate,
    markAsRead,
    markAllAsRead,
  };
}

// ============================================================================
// Admin Hooks
// ============================================================================

export function useAdminStats() {
  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    '/api/admin/stats',
    () => apiClient.getAdminStats(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    stats: data?.data,
    isLoading,
    error,
    mutate: revalidate,
  };
}

export function usePendingReports() {
  const { data, error, mutate: revalidate, isLoading } = useSWR<APIResponse>(
    '/api/admin/reports',
    () => apiClient.getPendingReports(),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  return {
    reports: data?.data || [],
    isLoading,
    error,
    mutate: revalidate,
  };
}

// ============================================================================
// Mutation Helpers
// ============================================================================

/**
 * Create a new business and revalidate the businesses list
 */
export async function createBusiness(businessData: any) {
  const response = await apiClient.createBusiness(businessData);
  
  // Revalidate all businesses lists
  mutate(
    (key) => typeof key === 'string' && key.startsWith('/api/businesses'),
    undefined,
    { revalidate: true }
  );
  
  return response;
}

/**
 * Create a new review and revalidate related data
 */
export async function createReview(reviewData: any) {
  const response = await apiClient.createReview(reviewData);
  
  // Revalidate reviews for this business
  mutate(
    (key) =>
      typeof key === 'string' &&
      key.startsWith('/api/reviews') &&
      key.includes(reviewData.businessId),
    undefined,
    { revalidate: true }
  );
  
  // Revalidate the business to update ratings
  mutate(`/api/businesses/${reviewData.businessId}`, undefined, {
    revalidate: true,
  });
  
  return response;
}

/**
 * Update user profile and revalidate
 */
export async function updateProfile(userId: string, updates: any) {
  const response = await apiClient.updateProfile(userId, updates);
  
  // Revalidate profile
  mutate(`/api/users/${userId}`, undefined, { revalidate: true });
  
  return response;
}

/**
 * Toggle save business and revalidate
 */
export async function toggleSaveBusiness(businessId: string, userId: string) {
  const response = await apiClient.saveBusinessToggle(businessId);
  
  // Revalidate saved businesses
  mutate(`/api/users/${userId}/saved`, undefined, { revalidate: true });
  
  return response;
}

/**
 * Mark review as helpful and revalidate
 */
export async function markReviewHelpful(reviewId: string, businessId: string) {
  const response = await apiClient.markReviewHelpful(reviewId);
  
  // Revalidate reviews for this business
  mutate(
    (key) =>
      typeof key === 'string' &&
      key.startsWith('/api/reviews') &&
      key.includes(businessId),
    undefined,
    { revalidate: true }
  );
  
  return response;
}

// ============================================================================
// Search Hook with Debouncing
// ============================================================================

import { useState, useEffect } from 'react';

export function useBusinessSearch(
  initialQuery: string = '',
  filters: Record<string, any> = {},
  debounceMs: number = 500
) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceMs]);

  const { businesses, pagination, isLoading, error, mutate } = useBusinesses({
    search: debouncedQuery,
    ...filters,
  });

  return {
    query,
    setQuery,
    businesses,
    pagination,
    isLoading: isLoading || query !== debouncedQuery,
    error,
    mutate,
  };
}
