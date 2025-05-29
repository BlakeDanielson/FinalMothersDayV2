'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  X,
  Clock,
  ChefHat
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RecipeData } from './FirstRecipeFlow';

export interface ImageScanningPathwayProps {
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
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  selectedFile: File | null;
  previewUrl: string | null;
  extractedRecipe: ExtractedRecipe | null;
  error: string | null;
  isEditing: boolean;
}

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ImageScanningPathway({ 
  onComplete, 
  onBack, 
  className,
  onProgressUpdate
}: ImageScanningPathwayProps) {
  const [scanState, setScanState] = useState<ScanState>({
    status: 'idle',
    selectedFile: null,
    previewUrl: null,
    extractedRecipe: null,
    error: null,
    isEditing: false
  });

  const [editedRecipe, setEditedRecipe] = useState<ExtractedRecipe | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update progress when state changes
  useEffect(() => {
    if (onProgressUpdate) {
      switch (scanState.status) {
        case 'idle':
          onProgressUpdate(scanState.selectedFile ? 20 : 0);
          break;
        case 'uploading':
          onProgressUpdate(40);
          break;
        case 'processing':
          onProgressUpdate(60);
          break;
        case 'success':
          onProgressUpdate(90);
          break;
        case 'error':
          onProgressUpdate(0);
          break;
      }
    }
  }, [scanState.status, scanState.selectedFile, onProgressUpdate]);

  const validateFile = useCallback((file: File): string | null => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return 'Please upload a JPEG, PNG, HEIC, or WebP image file.';
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB.';
    }
    
    return null;
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setScanState(prev => ({ ...prev, error }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setScanState(prev => ({
      ...prev,
      selectedFile: file,
      previewUrl,
      error: null,
      status: 'uploading'
    }));
    
    // Simulate upload completion
    setTimeout(() => {
      setScanState(prev => ({ ...prev, status: 'idle' }));
    }, 500);
  }, [validateFile]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const scanImage = useCallback(async () => {
    if (!scanState.selectedFile) return;

    setScanState(prev => ({ ...prev, status: 'processing', error: null }));

    try {
      const formData = new FormData();
      formData.append('image', scanState.selectedFile);
      formData.append('provider', 'openai');

      const response = await fetch('/api/scan-recipe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scan recipe');
      }

      // The API returns the recipe data directly
      const recipe = {
        title: data.title,
        ingredients: data.ingredients,
        steps: data.steps,
        image: data.image,
        description: data.description,
        cuisine: data.cuisine,
        category: data.category,
        prepTime: data.prepTime,
        cleanupTime: data.cleanupTime
      };

      setScanState(prev => ({
        ...prev,
        status: 'success',
        extractedRecipe: recipe
      }));
      setEditedRecipe(recipe);

    } catch (error) {
      console.error('Recipe scanning error:', error);
      setScanState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  }, [scanState.selectedFile]);

  const handleComplete = useCallback(() => {
    if (scanState.extractedRecipe) {
      onProgressUpdate?.(100);
      onComplete(scanState.extractedRecipe);
    }
  }, [scanState.extractedRecipe, onComplete, onProgressUpdate]);

  const handleTryAgain = useCallback(() => {
    if (scanState.previewUrl) {
      URL.revokeObjectURL(scanState.previewUrl);
    }
    setScanState({
      status: 'idle',
      selectedFile: null,
      previewUrl: null,
      extractedRecipe: null,
      error: null,
      isEditing: false
    });
    setEditedRecipe(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [scanState.previewUrl]);

  const renderImageUpload = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Camera className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Scan from Image</h2>
        </div>
        <p className="text-gray-600">
          Upload a photo of a recipe and our AI will read it for you
        </p>
      </div>

      {!scanState.selectedFile ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your recipe image here
              </p>
              <p className="text-gray-600 mt-1">
                or click to browse your files
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Supports JPEG, PNG, HEIC, and WebP files up to 10MB
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={SUPPORTED_FORMATS.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={scanState.previewUrl!}
              alt="Recipe preview"
              className="w-full max-h-64 object-contain rounded-lg border"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleTryAgain}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            {scanState.selectedFile.name} ({(scanState.selectedFile.size / 1024 / 1024).toFixed(1)}MB)
          </div>
        </div>
      )}

      {scanState.error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{scanState.error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Tips for Best Results</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Make sure the recipe text is clearly visible and well-lit</li>
          <li>• Avoid shadows or glare on the recipe</li>
          <li>• Include both ingredients and instructions in the image</li>
          <li>• Higher resolution images work better</li>
        </ul>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={scanImage}
          disabled={!scanState.selectedFile || scanState.status === 'processing'}
          className="flex-1"
        >
          {scanState.status === 'processing' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning Recipe...
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Scan Recipe
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
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
            <h2 className="text-xl font-semibold text-gray-900">Recipe Scanned!</h2>
          </div>
          <p className="text-gray-600">
            Review the scanned recipe and make any necessary edits
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                {recipe.description && (
                  <CardDescription className="mt-2">
                    {recipe.description}
                  </CardDescription>
                )}
              </div>
              {scanState.previewUrl && (
                <img
                  src={scanState.previewUrl}
                  alt="Original recipe"
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
          <Button onClick={handleComplete} className="flex-1">
            <CheckCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
          <Button variant="outline" onClick={handleTryAgain}>
            Try Another Image
          </Button>
        </div>
      </div>
    );
  };

  const renderError = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Scanning Failed</h2>
        </div>
        <p className="text-gray-600">
          We couldn&apos;t extract the recipe from this image
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
          <li>• Make sure the recipe text is clearly visible and readable</li>
          <li>• Try taking a photo with better lighting</li>
          <li>• Ensure the image includes both ingredients and instructions</li>
          <li>• Consider using the manual entry option instead</li>
        </ul>
      </div>

      <div className="flex space-x-3">
        <Button onClick={handleTryAgain} className="flex-1">
          Try Another Image
        </Button>
        <Button variant="outline" onClick={onBack}>
          Choose Different Method
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {scanState.status === 'idle' || scanState.status === 'processing' ? renderImageUpload() : null}
      {scanState.status === 'success' ? renderRecipePreview() : null}
      {scanState.status === 'error' ? renderError() : null}
    </div>
  );
} 