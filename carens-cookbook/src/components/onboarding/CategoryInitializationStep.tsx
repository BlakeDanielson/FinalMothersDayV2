'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useCategoryInitialization } from '@/hooks/useCategoryInitialization';
// import { useToast } from '@/hooks/use-toast';

interface CategoryInitializationStepProps {
  onComplete: (data: { selectedCategories: string[] }) => void;
  onSkip?: () => void;
}

export function CategoryInitializationStep({ 
  onComplete, 
  onSkip 
}: CategoryInitializationStepProps) {
  const {
    suggestions,
    isLoading,
    error,
    selectedCategories,
    toggleCategory,
    applyCategorySelections,
    isApplying,
    applyError,
    refreshSuggestions
  } = useCategoryInitialization();

  const handleComplete = async () => {
    const result = await applyCategorySelections();
    
    if (result) {
      // Show success feedback - could integrate with toast later
      console.log(`Successfully set up ${result.selectedCategories.length} categories for your cookbook.`);
      onComplete({ selectedCategories });
    } else if (applyError) {
      // Show error feedback - could integrate with toast later
      console.error('Error:', applyError);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'dietary': return '🥗';
      case 'cuisine': return '🌍';
      case 'skill': return '👨‍🍳';
      case 'popular': return '⭐';
      default: return '📁';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Personalizing Your Categories
          </CardTitle>
          <CardDescription>
            We&apos;re analyzing your preferences to suggest the perfect categories for your cookbook...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-muted-foreground">Creating personalized suggestions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Error Loading Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={refreshSuggestions} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            {onSkip && (
              <Button onClick={onSkip} variant="ghost">
                Skip This Step
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Your Personalized Categories
        </CardTitle>
        <CardDescription>
          Based on your preferences, we&apos;ve suggested categories that will work best for your cookbook. 
          Select the ones you&apos;d like to use, or customize as needed.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Selection Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">
                {selectedCategories.length} categories selected
              </h3>
              <p className="text-sm text-blue-700">
                You can always add, remove, or modify categories later in your settings.
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        {/* Category Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => {
            const isSelected = selectedCategories.includes(suggestion.name);
            
            return (
              <Card 
                key={suggestion.name}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => toggleCategory(suggestion.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => toggleCategory(suggestion.name)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getSourceIcon(suggestion.source)}</span>
                        <h4 className="font-medium text-sm">{suggestion.name}</h4>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {suggestion.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-blue-600 font-medium">
                          {suggestion.reason}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}
                          >
                            {Math.round(suggestion.confidence * 100)}% match
                          </Badge>
                          
                          {suggestion.isRecommended && (
                            <Badge variant="default" className="text-xs">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Error Display */}
        {applyError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{applyError}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button onClick={refreshSuggestions} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Suggestions
            </Button>
            {onSkip && (
              <Button onClick={onSkip} variant="ghost" size="sm">
                Skip This Step
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleComplete}
            disabled={selectedCategories.length === 0 || isApplying}
            className="min-w-[120px]"
          >
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Setting Up...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 