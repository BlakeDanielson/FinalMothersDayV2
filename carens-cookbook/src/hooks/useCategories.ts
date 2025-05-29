'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { queryKeys, invalidateQueries } from '@/lib/query-client';
import type { CategoryWithCount, CategoryStats } from '@/lib/services/optimized-category-service';

/**
 * Fetch user categories with counts
 */
async function fetchUserCategories(userId: string): Promise<CategoryWithCount[]> {
  const response = await fetch(`/api/categories?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch default categories for non-authenticated users
 */
async function fetchDefaultCategories(): Promise<CategoryWithCount[]> {
  const response = await fetch('/api/categories/defaults');
  if (!response.ok) {
    throw new Error(`Failed to fetch default categories: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch category statistics for a user
 */
async function fetchCategoryStats(userId: string): Promise<CategoryStats> {
  const response = await fetch(`/api/categories/stats?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category stats: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch popular categories across all users
 */
async function fetchPopularCategories(limit = 10): Promise<CategoryWithCount[]> {
  const response = await fetch(`/api/categories/suggestions?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch popular categories: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Hook to get user categories with counts
 */
export function useUserCategories() {
  const { user, isLoaded } = useUser();
  
  return useQuery({
    queryKey: queryKeys.categories.userWithCounts(user?.id || ''),
    queryFn: () => fetchUserCategories(user!.id),
    enabled: isLoaded && !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

/**
 * Hook to get default categories (for non-authenticated users)
 */
export function useDefaultCategories() {
  const { user, isLoaded } = useUser();
  
  return useQuery({
    queryKey: queryKeys.categories.defaults(),
    queryFn: fetchDefaultCategories,
    enabled: isLoaded && !user,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Hook to get categories (user-specific or default)
 */
export function useCategories() {
  const { user, isLoaded } = useUser();
  const userCategoriesQuery = useUserCategories();
  const defaultCategoriesQuery = useDefaultCategories();
  
  if (!isLoaded) {
    return {
      data: undefined,
      isLoading: true,
      error: null,
      refetch: () => Promise.resolve(),
    };
  }
  
  if (user) {
    return userCategoriesQuery;
  } else {
    return defaultCategoriesQuery;
  }
}

/**
 * Hook to get category statistics
 */
export function useCategoryStats() {
  const { user, isLoaded } = useUser();
  
  return useQuery({
    queryKey: queryKeys.categories.stats(user?.id || ''),
    queryFn: () => fetchCategoryStats(user!.id),
    enabled: isLoaded && !!user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to get popular categories
 */
export function usePopularCategories(limit = 10) {
  return useQuery({
    queryKey: queryKeys.categories.popular(limit),
    queryFn: () => fetchPopularCategories(limit),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Mutation hook for category operations (rename, merge, delete)
 */
export function useCategoryMutation() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  
  return useMutation({
    mutationFn: async ({ action, data }: { action: string; data: any }) => {
      const response = await fetch(`/api/categories/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} category: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate all category-related queries for the user
      if (user?.id) {
        invalidateQueries.userCategories(user.id);
        invalidateQueries.popularCategories();
      }
    },
    onError: (error) => {
      console.error('Category mutation failed:', error);
    },
  });
}

/**
 * Hook to prefetch categories for performance
 */
export function usePrefetchCategories() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  
  const prefetchUserCategories = () => {
    if (user?.id) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.categories.userWithCounts(user.id),
        queryFn: () => fetchUserCategories(user.id),
        staleTime: 5 * 60 * 1000,
      });
    }
  };
  
  const prefetchPopularCategories = (limit = 10) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.categories.popular(limit),
      queryFn: () => fetchPopularCategories(limit),
      staleTime: 30 * 60 * 1000,
    });
  };
  
  return {
    prefetchUserCategories,
    prefetchPopularCategories,
  };
} 