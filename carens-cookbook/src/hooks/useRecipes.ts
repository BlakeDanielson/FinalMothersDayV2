'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { queryKeys, invalidateQueries } from '@/lib/query-client';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  cuisine: string;
  category: string;
  prepTime: string;
  cleanupTime: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categorySource?: 'PREDEFINED' | 'AI_GENERATED' | 'USER_CREATED';
  categoryConfidence?: number;
  originalCategory?: string;
}

/**
 * Fetch user recipes
 */
async function fetchUserRecipes(userId: string): Promise<Recipe[]> {
  const response = await fetch(`/api/recipes?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch recipes by category
 */
async function fetchRecipesByCategory(userId: string, category: string): Promise<Recipe[]> {
  const response = await fetch(`/api/recipes?userId=${userId}&category=${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes for category: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single recipe by ID
 */
async function fetchRecipe(recipeId: string): Promise<Recipe> {
  const response = await fetch(`/api/recipes/${recipeId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Search recipes
 */
async function searchRecipes(query: string, userId?: string): Promise<Recipe[]> {
  const params = new URLSearchParams({ q: query });
  if (userId) {
    params.append('userId', userId);
  }
  
  const response = await fetch(`/api/recipes/search?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to search recipes: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Hook to get user recipes
 */
export function useUserRecipes() {
  const { user, isLoaded } = useUser();
  
  return useQuery({
    queryKey: queryKeys.recipes.user(user?.id || ''),
    queryFn: () => fetchUserRecipes(user!.id),
    enabled: isLoaded && !!user?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to get recipes by category
 */
export function useRecipesByCategory(category: string) {
  const { user, isLoaded } = useUser();
  
  return useQuery({
    queryKey: queryKeys.recipes.category(user?.id || '', category),
    queryFn: () => fetchRecipesByCategory(user!.id, category),
    enabled: isLoaded && !!user?.id && !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Hook to get a single recipe
 */
export function useRecipe(recipeId: string) {
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipe(recipeId),
    enabled: !!recipeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to search recipes
 */
export function useRecipeSearch(query: string, enabled = true) {
  const { user } = useUser();
  
  return useQuery({
    queryKey: queryKeys.recipes.search(query),
    queryFn: () => searchRecipes(query, user?.id),
    enabled: enabled && query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Mutation hook for recipe operations (create, update, delete)
 */
export function useRecipeMutation() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  
  return useMutation({
    mutationFn: async ({ action, data, recipeId }: { 
      action: 'create' | 'update' | 'delete'; 
      data?: Partial<Recipe>; 
      recipeId?: string;
    }) => {
      let url = '/api/recipes';
      let method = 'POST';
      
      if (action === 'update' && recipeId) {
        url = `/api/recipes/${recipeId}`;
        method = 'PUT';
      } else if (action === 'delete' && recipeId) {
        url = `/api/recipes/${recipeId}`;
        method = 'DELETE';
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} recipe: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: (data, variables) => {
      if (user?.id) {
        // Invalidate user recipes
        queryClient.invalidateQueries({ queryKey: queryKeys.recipes.user(user.id) });
        
        // If recipe has a category, invalidate category-specific queries
        if (data?.category || variables.data?.category) {
          const category = data?.category || variables.data?.category;
          queryClient.invalidateQueries({ 
            queryKey: queryKeys.recipes.category(user.id, category) 
          });
        }
        
        // Invalidate user categories (counts might have changed)
        invalidateQueries.userCategories(user.id);
        
        // Invalidate search results
        queryClient.invalidateQueries({ queryKey: ['recipes', 'search'] });
      }
    },
    onError: (error) => {
      console.error('Recipe mutation failed:', error);
    },
  });
}

/**
 * Hook to prefetch recipes for performance
 */
export function usePrefetchRecipes() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  
  const prefetchUserRecipes = () => {
    if (user?.id) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.recipes.user(user.id),
        queryFn: () => fetchUserRecipes(user.id),
        staleTime: 2 * 60 * 1000,
      });
    }
  };
  
  const prefetchCategoryRecipes = (category: string) => {
    if (user?.id) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.recipes.category(user.id, category),
        queryFn: () => fetchRecipesByCategory(user.id, category),
        staleTime: 5 * 60 * 1000,
      });
    }
  };
  
  return {
    prefetchUserRecipes,
    prefetchCategoryRecipes,
  };
} 