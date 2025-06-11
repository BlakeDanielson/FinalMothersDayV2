'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Users, Flame, Star, Info } from 'lucide-react';

const SKILL_LEVELS = [
  { 
    id: 'beginner', 
    label: 'Beginner', 
    description: 'New to cooking, prefer simple recipes',
    emoji: '🥄'
  },
  { 
    id: 'intermediate', 
    label: 'Intermediate', 
    description: 'Comfortable with basic techniques',
    emoji: '👨‍🍳'
  },
  { 
    id: 'advanced', 
    label: 'Advanced', 
    description: 'Experienced, enjoy complex recipes',
    emoji: '⭐'
  },
  { 
    id: 'expert', 
    label: 'Expert/Professional', 
    description: 'Professional level skills',
    emoji: '🏆'
  }
];

const COOKING_STYLES = [
  { id: 'quick-easy', label: 'Quick & Easy', description: '30 minutes or less' },
  { id: 'meal-prep', label: 'Meal Prep', description: 'Batch cooking for the week' },
  { id: 'gourmet', label: 'Gourmet', description: 'Restaurant-quality dishes' },
  { id: 'comfort-food', label: 'Comfort Food', description: 'Hearty, satisfying meals' },
  { id: 'healthy', label: 'Healthy', description: 'Nutritious, balanced meals' },
  { id: 'international', label: 'International', description: 'Cuisines from around the world' },
  { id: 'baking', label: 'Baking & Desserts', description: 'Breads, cakes, and sweets' },
  { id: 'grilling', label: 'Grilling/BBQ', description: 'Outdoor cooking' }
];

const COOKING_METHODS = [
  'Stovetop', 'Oven', 'Slow Cooker', 'Instant Pot', 'Air Fryer', 
  'Grill', 'Microwave', 'No Cook', 'One Pot', 'Sheet Pan'
];

interface CookingPreferencesData {
  skillLevel: string;
  cookingStyles: string[];
  preferredMethods: string[];
  maxCookingTime: number;
  typicalServings: number;
  budgetLevel: 'low' | 'medium' | 'high';
  adventurousness: number; // 1-5 scale
  kitchenSize: 'small' | 'medium' | 'large';
  specialInterests: string[];
}

interface CookingPreferencesStepProps {
  onComplete: (data: CookingPreferencesData) => void;
  onSkip?: () => void;
  initialData?: Partial<CookingPreferencesData>;
  isLoading?: boolean;
}

export function CookingPreferencesStep({ 
  onComplete, 
  onSkip, 
  initialData = {}, 
  isLoading = false 
}: CookingPreferencesStepProps) {
  const [formData, setFormData] = useState<CookingPreferencesData>({
    skillLevel: initialData.skillLevel || 'beginner',
    cookingStyles: initialData.cookingStyles || [],
    preferredMethods: initialData.preferredMethods || [],
    maxCookingTime: initialData.maxCookingTime || 45,
    typicalServings: initialData.typicalServings || 4,
    budgetLevel: initialData.budgetLevel || 'medium',
    adventurousness: initialData.adventurousness || 3,
    kitchenSize: initialData.kitchenSize || 'medium',
    specialInterests: initialData.specialInterests || []
  });

  const handleStyleChange = (styleId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cookingStyles: checked 
        ? [...prev.cookingStyles, styleId]
        : prev.cookingStyles.filter(id => id !== styleId)
    }));
  };

  const handleMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredMethods: checked 
        ? [...prev.preferredMethods, method]
        : prev.preferredMethods.filter(m => m !== method)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const getAdventurenessLabel = (value: number) => {
    const labels = ['Conservative', 'Cautious', 'Balanced', 'Adventurous', 'Very Adventurous'];
    return labels[value - 1] || 'Balanced';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChefHat className="w-8 h-8 text-orange-600" />
        </div>
        <CardTitle className="text-2xl">Cooking Preferences</CardTitle>
        <CardDescription className="text-base">
          Tell us about your cooking style so we can recommend the perfect recipes for you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Skill Level */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Cooking Skill Level</h3>
            </div>
            <RadioGroup
              value={formData.skillLevel}
              onValueChange={(value) => setFormData(prev => ({ ...prev, skillLevel: value }))}
              disabled={isLoading}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_LEVELS.map((level) => (
                  <div key={level.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={level.id} id={level.id} />
                    <div className="flex-1">
                      <Label htmlFor={level.id} className="font-medium cursor-pointer flex items-center gap-2">
                        <span className="text-lg">{level.emoji}</span>
                        {level.label}
                      </Label>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Cooking Styles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferred Cooking Styles</h3>
            <p className="text-sm text-gray-600">Select all that apply - this helps us suggest recipes you&apos;ll love.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {COOKING_STYLES.map((style) => (
                <div key={style.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={style.id}
                    checked={formData.cookingStyles.includes(style.id)}
                    onCheckedChange={(checked) => 
                      handleStyleChange(style.id, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <div className="flex-1">
                    <Label htmlFor={style.id} className="font-medium cursor-pointer">
                      {style.label}
                    </Label>
                    <p className="text-xs text-gray-600">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time & Servings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Cooking Time */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Maximum Cooking Time</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>15 min</span>
                  <span className="font-medium">{formData.maxCookingTime} minutes</span>
                  <span>2+ hours</span>
                </div>
                <Slider
                  value={[formData.maxCookingTime]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, maxCookingTime: value }))}
                  min={15}
                  max={180}
                  step={15}
                  disabled={isLoading}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  We&apos;ll prioritize recipes that can be made within this time
                </p>
              </div>
            </div>

            {/* Typical Servings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Typical Servings</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 person</span>
                  <span className="font-medium">{formData.typicalServings} servings</span>
                  <span>10+ people</span>
                </div>
                <Slider
                  value={[formData.typicalServings]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, typicalServings: value }))}
                  min={1}
                  max={12}
                  step={1}
                  disabled={isLoading}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  How many people do you usually cook for?
                </p>
              </div>
            </div>
          </div>

          {/* Budget Level */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Budget Level</h3>
            <RadioGroup
              value={formData.budgetLevel}
              onValueChange={(value: 'low' | 'medium' | 'high') => 
                setFormData(prev => ({ ...prev, budgetLevel: value }))
              }
              disabled={isLoading}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="low" id="budget-low" />
                  <div>
                    <Label htmlFor="budget-low" className="font-medium cursor-pointer">Budget-Friendly</Label>
                    <p className="text-sm text-gray-600">Affordable ingredients</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="medium" id="budget-medium" />
                  <div>
                    <Label htmlFor="budget-medium" className="font-medium cursor-pointer">Moderate</Label>
                    <p className="text-sm text-gray-600">Balanced cost & quality</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="high" id="budget-high" />
                  <div>
                    <Label htmlFor="budget-high" className="font-medium cursor-pointer">Premium</Label>
                    <p className="text-sm text-gray-600">High-quality ingredients</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Adventurousness */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Culinary Adventurousness</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Stick to familiar</span>
                <Badge variant="outline" className="font-medium">
                  {getAdventurenessLabel(formData.adventurousness)}
                </Badge>
                <span>Love trying new things</span>
              </div>
              <Slider
                value={[formData.adventurousness]}
                onValueChange={([value]) => setFormData(prev => ({ ...prev, adventurousness: value }))}
                min={1}
                max={5}
                step={1}
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                How open are you to trying new ingredients and cuisines?
              </p>
            </div>
          </div>

          {/* Kitchen Size */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kitchen Size</h3>
            <RadioGroup
              value={formData.kitchenSize}
              onValueChange={(value: 'small' | 'medium' | 'large') => 
                setFormData(prev => ({ ...prev, kitchenSize: value }))
              }
              disabled={isLoading}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="small" id="kitchen-small" />
                  <div>
                    <Label htmlFor="kitchen-small" className="font-medium cursor-pointer">Small</Label>
                    <p className="text-sm text-gray-600">Limited counter space</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="medium" id="kitchen-medium" />
                  <div>
                    <Label htmlFor="kitchen-medium" className="font-medium cursor-pointer">Medium</Label>
                    <p className="text-sm text-gray-600">Standard home kitchen</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="large" id="kitchen-large" />
                  <div>
                    <Label htmlFor="kitchen-large" className="font-medium cursor-pointer">Large</Label>
                    <p className="text-sm text-gray-600">Spacious with full equipment</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Preferred Cooking Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferred Cooking Methods</h3>
            <p className="text-sm text-gray-600">Select the cooking methods you use or want to learn.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {COOKING_METHODS.map((method) => (
                <div key={method} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                  <Checkbox
                    id={`method-${method}`}
                    checked={formData.preferredMethods.includes(method)}
                    onCheckedChange={(checked) => 
                      handleMethodChange(method, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor={`method-${method}`} className="text-sm cursor-pointer">
                    {method}
                  </Label>
                </div>
              ))}
            </div>
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
                  Saving Preferences...
                </>
              ) : (
                'Save Preferences'
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

        {/* Help Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How we use this information</p>
              <p>
                Your cooking preferences help us recommend recipes that match your skill level, 
                available time, and cooking style. You can always update these settings later.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 