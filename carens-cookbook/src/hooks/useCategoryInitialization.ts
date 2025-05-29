import { useState, useEffect } from 'react';
import type { 
  CategorySuggestion, 
  CategoryInitializationResult 
} from '@/lib/services/category-initialization';

interface UseCategoryInitializationReturn {
  suggestions: CategorySuggestion[];
  isLoading: boolean;
  error: string | null;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  applyCategorySelections: () => Promise<CategoryInitializationResult | null>;
  isApplying: boolean;
  applyError: string | null;
  refreshSuggestions: () => Promise<void>;
}

export function useCategoryInitialization(): UseCategoryInitializationReturn {
  const [suggestions, setSuggestions] = useState<CategorySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  // Fetch category suggestions
  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/onboarding/category-suggestions');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch category suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);

      // Auto-select recommended categories
      const recommendedCategories = data.suggestions
        .filter((suggestion: CategorySuggestion) => suggestion.isRecommended)
        .map((suggestion: CategorySuggestion) => suggestion.name);
      
      setSelectedCategories(recommendedCategories);

    } catch (err) {
      console.error('Error fetching category suggestions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  // Apply category selections
  const applyCategorySelections = async (): Promise<CategoryInitializationResult | null> => {
    try {
      setIsApplying(true);
      setApplyError(null);

      if (selectedCategories.length === 0) {
        throw new Error('Please select at least one category');
      }

      const response = await fetch('/api/onboarding/category-initialization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedCategories
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to apply category selections');
      }

      const data = await response.json();
      return data.result;

    } catch (err) {
      console.error('Error applying category selections:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply selections';
      setApplyError(errorMessage);
      return null;
    } finally {
      setIsApplying(false);
    }
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Refresh suggestions
  const refreshSuggestions = async () => {
    await fetchSuggestions();
  };

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    applyCategorySelections,
    isApplying,
    applyError,
    refreshSuggestions
  };
} 