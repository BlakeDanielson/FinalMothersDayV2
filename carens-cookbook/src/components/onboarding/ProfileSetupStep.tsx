'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, MessageSquare } from 'lucide-react';

interface ProfileSetupData {
  displayName?: string;
  bio?: string;
  favoriteFood?: string;
  cookingGoals?: string;
}

interface ProfileSetupStepProps {
  onComplete: (data: ProfileSetupData) => void;
  onSkip?: () => void;
  initialData?: ProfileSetupData;
  isLoading?: boolean;
}

export function ProfileSetupStep({ 
  onComplete, 
  onSkip, 
  initialData = {}, 
  isLoading = false 
}: ProfileSetupStepProps) {
  const [formData, setFormData] = useState<ProfileSetupData>({
    displayName: initialData.displayName || '',
    bio: initialData.bio || '',
    favoriteFood: initialData.favoriteFood || '',
    cookingGoals: initialData.cookingGoals || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProfileSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
        <CardDescription className="text-base">
          Help us personalize your recipe experience by sharing a bit about yourself.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              Display Name *
            </Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              placeholder="What should we call you?"
              className={errors.displayName ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.displayName && (
              <p className="text-sm text-red-600">{errors.displayName}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              A Little About You
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about your cooking journey, interests, or anything you'd like to share..."
              rows={3}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">Optional - This helps us understand your cooking style</p>
          </div>

          {/* Favorite Food */}
          <div className="space-y-2">
            <Label htmlFor="favoriteFood" className="text-sm font-medium">
              Favorite Food or Cuisine
            </Label>
            <Input
              id="favoriteFood"
              value={formData.favoriteFood}
              onChange={(e) => handleInputChange('favoriteFood', e.target.value)}
              placeholder="e.g., Italian, Thai, BBQ, Desserts..."
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">We&apos;ll suggest recipes you might love</p>
          </div>

          {/* Cooking Goals */}
          <div className="space-y-2">
            <Label htmlFor="cookingGoals" className="text-sm font-medium">
              Cooking Goals
            </Label>
            <Textarea
              id="cookingGoals"
              value={formData.cookingGoals}
              onChange={(e) => handleInputChange('cookingGoals', e.target.value)}
              placeholder="What do you hope to achieve? (e.g., Learn new techniques, eat healthier, cook family meals...)"
              rows={2}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">Help us tailor recommendations to your goals</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              disabled={isLoading}
              className="sm:w-auto"
            >
              Skip for Now
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Why do we ask for this?</p>
              <p>Your profile helps us recommend recipes that match your tastes and skill level. You can always update this information later in your settings.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 