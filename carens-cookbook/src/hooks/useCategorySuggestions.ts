import { useState, useCallback } from 'react';
import { SuggestionResult } from '@/lib/services/CategorySuggestionEngine';

interface RecipeContent {
  title: string;
  ingredients?: string[];
  instructions?: string[];
  description?: string;
}

interface SuggestionOptions {
  maxSuggestions?: number;
  minConfidence?: number;
  includeUserCategories?: boolean;
}

interface UseCategorySuggestionsReturn {
  suggestions: SuggestionResult[];
  loading: boolean;
  error: string | null;
  getSuggestions: (content: RecipeContent, options?: SuggestionOptions) => Promise<void>;
  clearSuggestions: () => void;
}

export function useCategorySuggestions(): UseCategorySuggestionsReturn {
  const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = useCallback(async (
    content: RecipeContent, 
    options: SuggestionOptions = {}
  ) => {
    if (!content.title.trim()) {
      setError('Recipe title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/categories/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...content,
          ...options
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  return {
    suggestions,
    loading,
    error,
    getSuggestions,
    clearSuggestions
  };
}

// Quick suggestion hook for simple title-based suggestions
export function useQuickCategorySuggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
  const [loading, setLoading] = useState(false);

  const getQuickSuggestions = useCallback(async (title: string) => {
    if (!title.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/categories/suggestions?title=${encodeURIComponent(title)}`
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Quick suggestions error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    suggestions,
    loading,
    getQuickSuggestions
  };
} 