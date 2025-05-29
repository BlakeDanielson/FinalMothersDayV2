'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Lightbulb, 
  ChefHat, 
  Clock, 
  Search, 
  Users, 
  Sparkles,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SuggestionResult } from '@/lib/services/CategorySuggestionEngine';

interface CategorySuggestionsProps {
  suggestions: SuggestionResult[];
  loading?: boolean;
  error?: string | null;
  onSelectSuggestion?: (category: string) => void;
  selectedCategory?: string;
  className?: string;
  showReasoningDetails?: boolean;
}

const SOURCE_ICONS = {
  ingredient: ChefHat,
  method: Clock,
  mealtime: Clock,
  keyword: Search,
  similarity: Users
};

const SOURCE_COLORS = {
  ingredient: 'bg-green-100 text-green-800 border-green-200',
  method: 'bg-blue-100 text-blue-800 border-blue-200',
  mealtime: 'bg-purple-100 text-purple-800 border-purple-200',
  keyword: 'bg-orange-100 text-orange-800 border-orange-200',
  similarity: 'bg-pink-100 text-pink-800 border-pink-200'
};

const SOURCE_LABELS = {
  ingredient: 'Ingredients',
  method: 'Cooking Method',
  mealtime: 'Meal Time',
  keyword: 'Keywords',
  similarity: 'Similar Recipes'
};

export function CategorySuggestions({
  suggestions,
  loading = false,
  error = null,
  onSelectSuggestion,
  selectedCategory,
  className,
  showReasoningDetails = true
}: CategorySuggestionsProps) {
  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Getting suggestions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full border-red-200", className)}>
        <CardContent className="py-4">
          <div className="flex items-center space-x-2 text-red-600">
            <span className="text-sm">Error: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="py-8 text-center text-gray-500">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No category suggestions available</p>
          <p className="text-xs text-gray-400 mt-1">
            Try adding more details to your recipe
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span>Suggested Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const Icon = SOURCE_ICONS[suggestion.source];
          const isSelected = selectedCategory === suggestion.category;
          const confidencePercentage = Math.round(suggestion.confidence * 100);
          
          return (
            <div
              key={`${suggestion.category}-${index}`}
              className={cn(
                "border rounded-lg p-3 transition-all duration-200",
                isSelected 
                  ? "border-blue-500 bg-blue-50 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => onSelectSuggestion?.(suggestion.category)}
                      className="flex items-center space-x-2"
                    >
                      {isSelected && <CheckCircle className="h-3 w-3" />}
                      <span className="truncate">{suggestion.category}</span>
                    </Button>
                    
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", SOURCE_COLORS[suggestion.source])}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {SOURCE_LABELS[suggestion.source]}
                    </Badge>
                  </div>

                  {showReasoningDetails && (
                    <p className="text-xs text-gray-600 mb-2">
                      {suggestion.reasoning}
                    </p>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-300",
                              confidencePercentage >= 80 ? "bg-green-500" :
                              confidencePercentage >= 60 ? "bg-yellow-500" :
                              "bg-red-500"
                            )}
                            style={{ width: `${confidencePercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {confidencePercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {suggestions.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Suggestions are based on recipe content analysis
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for inline use
export function CompactCategorySuggestions({
  suggestions,
  loading = false,
  onSelectSuggestion,
  selectedCategory,
  maxVisible = 3
}: {
  suggestions: SuggestionResult[];
  loading?: boolean;
  onSelectSuggestion?: (category: string) => void;
  selectedCategory?: string;
  maxVisible?: number;
}) {
  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span className="text-xs">Getting suggestions...</span>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const visibleSuggestions = suggestions.slice(0, maxVisible);
  const hasMore = suggestions.length > maxVisible;

  return (
    <div className="flex flex-wrap gap-1">
      <span className="text-xs text-gray-500 mr-1">Suggested:</span>
      {visibleSuggestions.map((suggestion, index) => {
        const isSelected = selectedCategory === suggestion.category;
        const confidencePercentage = Math.round(suggestion.confidence * 100);
        
        return (
          <Button
            key={`${suggestion.category}-${index}`}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectSuggestion?.(suggestion.category)}
            className="h-6 px-2 text-xs"
            title={`${suggestion.reasoning} (${confidencePercentage}% confidence)`}
          >
            {suggestion.category}
          </Button>
        );
      })}
      {hasMore && (
        <span className="text-xs text-gray-400 self-center">
          +{suggestions.length - maxVisible} more
        </span>
      )}
    </div>
  );
} 