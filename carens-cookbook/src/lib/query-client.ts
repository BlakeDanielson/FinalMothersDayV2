import { QueryClient } from '@tanstack/react-query';

/**
 * React Query client configuration optimized for category caching
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale-while-revalidate strategy
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes - cache garbage collection time (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Background refetch settings
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      
      // Network mode
      networkMode: 'online',
    },
    mutations: {
      // Retry mutations once on network errors
      retry: 1,
      networkMode: 'online',
    },
  },
});

/**
 * Query keys for consistent cache management
 */
export const queryKeys = {
  // Category-related queries
  categories: {
    all: ['categories'] as const,
    user: (userId: string) => ['categories', 'user', userId] as const,
    userWithCounts: (userId: string) => ['categories', 'user', userId, 'counts'] as const,
    popular: (limit?: number) => ['categories', 'popular', limit] as const,
    suggestions: (query: string) => ['categories', 'suggestions', query] as const,
    stats: (userId: string) => ['categories', 'stats', userId] as const,
    defaults: () => ['categories', 'defaults'] as const,
  },
  
  // Recipe-related queries
  recipes: {
    all: ['recipes'] as const,
    user: (userId: string) => ['recipes', 'user', userId] as const,
    category: (userId: string, category: string) => ['recipes', 'user', userId, 'category', category] as const,
    search: (query: string) => ['recipes', 'search', query] as const,
  },
  
  // User-related queries
  user: {
    preferences: (userId: string) => ['user', 'preferences', userId] as const,
    onboarding: (userId: string) => ['user', 'onboarding', userId] as const,
  },
} as const;

/**
 * Cache invalidation helpers
 */
export const invalidateQueries = {
  // Invalidate all category-related queries for a user
  userCategories: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.user(userId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.userWithCounts(userId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.stats(userId) });
  },
  
  // Invalidate popular categories (affects all users)
  popularCategories: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.categories.popular() });
  },
  
  // Invalidate recipes for a specific category
  categoryRecipes: (userId: string, category: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.recipes.category(userId, category) });
    queryClient.invalidateQueries({ queryKey: queryKeys.recipes.user(userId) });
  },
  
  // Invalidate all user-related data
  userData: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: ['user', userId] });
    queryClient.invalidateQueries({ queryKey: ['categories', 'user', userId] });
    queryClient.invalidateQueries({ queryKey: ['recipes', 'user', userId] });
  },
};

/**
 * Prefetch helpers for performance optimization
 */
export const prefetchQueries = {
  // Prefetch user categories when user logs in
  userCategories: async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.categories.userWithCounts(userId),
      queryFn: () => fetch(`/api/categories?userId=${userId}`).then(res => res.json()),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  },
  
  // Prefetch popular categories for suggestions
  popularCategories: async (limit = 10) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.categories.popular(limit),
      queryFn: () => fetch(`/api/categories/suggestions?limit=${limit}`).then(res => res.json()),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  },
}; 