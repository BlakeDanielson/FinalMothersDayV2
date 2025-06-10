'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Clock,
  ChefHat,
  Edit3,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RecipeData } from './first-recipe-flow/utils/types';

export interface URLScanningPathwayProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  className?: string;
  onProgressUpdate?: (progress: number) => void;
}

interface ExtractedRecipe {
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string | null;
  description?: string;
  cuisine?: string;
  category?: string;
  prepTime?: string;
  cleanupTime?: string;
}

interface ScanState {
  status: 'idle' | 'validating' | 'extracting' | 'success' | 'error';
  url: string;
  extractedRecipe: ExtractedRecipe | null;
  error: string | null;
  isEditing: boolean;
}

const POPULAR_RECIPE_SITES = [
  'allrecipes.com',
  'food.com',
  'epicurious.com',
  'foodnetwork.com',
  'delish.com',
  'tasteofhome.com',
  'simplyrecipes.com',
  'bonappetit.com'
];

export function URLScanningPathway({ 
  onComplete, 
  onBack, 
  className,
  onProgressUpdate 
}: URLScanningPathwayProps) {
  const [scanState, setScanState] = useState<ScanState>({
    status: 'idle',
    url: '',
    extractedRecipe: null,
    error: null,
    isEditing: false
  });

  const [editedRecipe, setEditedRecipe] = useState<ExtractedRecipe | null>(null);

  // Update progress when state changes
  useEffect(() => {
    if (onProgressUpdate) {
      switch (scanState.status) {
        case 'idle':
          onProgressUpdate(0);
          break;
        case 'validating':
          onProgressUpdate(10);
          break;
        case 'extracting':
          onProgressUpdate(30);
          break;
        case 'success':
          onProgressUpdate(80);
          break;
        case 'error':
          onProgressUpdate(0);
          break;
      }
    }
  }, [scanState.status, onProgressUpdate]);

  const isValidUrl = useCallback((url: string): boolean => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  }, []);

  const handleUrlChange = useCallback((value: string) => {
    setScanState(prev => ({
      ...prev,
      url: value,
      error: null,
      status: value ? 'validating' : 'idle'
    }));
  }, []);

  const extractRecipe = useCallback(async () => {
    if (!isValidUrl(scanState.url)) {
      setScanState(prev => ({
        ...prev,
        error: 'Please enter a valid URL starting with http:// or https://'
      }));
      return;
    }

    setScanState(prev => ({ ...prev, status: 'extracting', error: null }));

    try {
      const response = await fetch('/api/fetch-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: scanState.url,
          processing_method: 'openai'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract recipe');
      }

      if (!data.success) {
        throw new Error(data.error || 'Recipe extraction failed');
      }

      const recipe = data.recipe;
      setScanState(prev => ({
        ...prev,
        status: 'success',
        extractedRecipe: recipe
      }));
      setEditedRecipe(recipe);

    } catch (error) {
      console.error('Recipe extraction error:', error);
      setScanState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  }, [scanState.url, isValidUrl]);

  const handleEdit = useCallback(() => {
    setScanState(prev => ({ ...prev, isEditing: true }));
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editedRecipe) {
      setScanState(prev => ({
        ...prev,
        extractedRecipe: editedRecipe,
        isEditing: false
      }));
    }
  }, [editedRecipe]);

  const handleComplete = useCallback(() => {
    if (scanState.extractedRecipe) {
      onProgressUpdate?.(100);
      onComplete(scanState.extractedRecipe);
    }
  }, [scanState.extractedRecipe, onComplete, onProgressUpdate]);

  const handleTryAgain = useCallback(() => {
    setScanState({
      status: 'idle',
      url: '',
      extractedRecipe: null,
      error: null,
      isEditing: false
    });
    setEditedRecipe(null);
  }, []);

  const renderUrlInput = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Scan from URL</h2>
        </div>
        <p className="text-gray-600">
          Enter a recipe URL and we&apos;ll extract all the details automatically
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="recipe-url" className="text-sm font-medium text-gray-700">
            Recipe URL
          </Label>
          <div className="mt-1">
            <Input
              id="recipe-url"
              type="url"
              placeholder="https://example.com/recipe"
              value={scanState.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={cn(
                "w-full",
                scanState.error && "border-red-300 focus:border-red-500 focus:ring-red-500"
              )}
            />
          </div>
          {scanState.error && (
            <p className="mt-1 text-sm text-red-600">{scanState.error}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Popular Recipe Sites</h3>
          <p className="text-sm text-blue-700 mb-3">
            We work best with these popular recipe websites:
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_RECIPE_SITES.map((site) => (
              <Badge key={site} variant="secondary" className="text-xs">
                {site}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={extractRecipe}
            disabled={!scanState.url || scanState.status === 'extracting'}
            className="flex-1"
          >
            {scanState.status === 'extracting' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting Recipe...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Extract Recipe
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );

  const renderRecipePreview = () => {
    if (!scanState.extractedRecipe) return null;

    const recipe = scanState.isEditing ? editedRecipe : scanState.extractedRecipe;
    if (!recipe) return null;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recipe Extracted!</h2>
          </div>
          <p className="text-gray-600">
            Review the extracted recipe and make any necessary edits
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {scanState.isEditing ? (
                  <Input
                    value={recipe.title}
                    onChange={(e) => setEditedRecipe(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="text-lg font-semibold"
                    placeholder="Recipe title"
                  />
                ) : (
                  <CardTitle className="text-lg">{recipe.title}</CardTitle>
                )}
                {recipe.description && (
                  <CardDescription className="mt-2">
                    {recipe.description}
                  </CardDescription>
                )}
              </div>
              {recipe.image && (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg ml-4"
                />
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4">
              {recipe.prepTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              {recipe.cuisine && (
                <div className="flex items-center space-x-1">
                  <ChefHat className="h-4 w-4" />
                  <span>{recipe.cuisine}</span>
                </div>
              )}
              {recipe.category && (
                <Badge variant="outline">{recipe.category}</Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Ingredients ({recipe.ingredients.length})</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 font-medium min-w-[1.5rem]">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Instructions ({recipe.steps.length} steps)</h3>
              <ol className="space-y-3">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          {scanState.isEditing ? (
            <>
              <Button onClick={handleSaveEdit} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setScanState(prev => ({ ...prev, isEditing: false }))}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleComplete} className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                Add Recipe
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" onClick={handleTryAgain}>
                Try Another URL
              </Button>
            </>
          )}
        </div>

        <div className="text-center">
          <a
            href={scanState.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-3 w-3" />
            <span>View original recipe</span>
          </a>
        </div>
      </div>
    );
  };

  const renderError = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Extraction Failed</h2>
        </div>
        <p className="text-gray-600">
          We couldn&apos;t extract the recipe from this URL
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {scanState.error}
        </AlertDescription>
      </Alert>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2">Troubleshooting Tips</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Make sure the URL contains a complete recipe with ingredients and instructions</li>
          <li>• Try a different recipe URL from a popular cooking website</li>
          <li>• Check that the URL is accessible and not behind a paywall</li>
          <li>• Consider using the manual entry option instead</li>
        </ul>
      </div>

      <div className="flex space-x-3">
        <Button onClick={handleTryAgain} className="flex-1">
          Try Another URL
        </Button>
        <Button variant="outline" onClick={onBack}>
          Choose Different Method
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {scanState.status === 'idle' || scanState.status === 'extracting' ? renderUrlInput() : null}
      {scanState.status === 'success' ? renderRecipePreview() : null}
      {scanState.status === 'error' ? renderError() : null}
    </div>
  );
} 