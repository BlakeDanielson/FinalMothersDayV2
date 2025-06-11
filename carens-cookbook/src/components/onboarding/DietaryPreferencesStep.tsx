'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Utensils, Apple, AlertTriangle, Plus, X } from 'lucide-react';

const COMMON_DIETARY_RESTRICTIONS = [
  { id: 'vegetarian', label: 'Vegetarian', description: 'No meat or poultry' },
  { id: 'vegan', label: 'Vegan', description: 'No animal products' },
  { id: 'gluten-free', label: 'Gluten-Free', description: 'No wheat, barley, rye' },
  { id: 'dairy-free', label: 'Dairy-Free', description: 'No milk products' },
  { id: 'nut-free', label: 'Nut-Free', description: 'No tree nuts' },
  { id: 'soy-free', label: 'Soy-Free', description: 'No soy products' },
  { id: 'keto', label: 'Keto', description: 'Low carb, high fat' },
  { id: 'paleo', label: 'Paleo', description: 'No processed foods' },
  { id: 'low-sodium', label: 'Low Sodium', description: 'Reduced salt intake' },
  { id: 'diabetic', label: 'Diabetic-Friendly', description: 'Low sugar, controlled carbs' },
];

const COMMON_ALLERGIES = [
  'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish', 'Sesame'
];

interface DietaryPreferencesData {
  dietaryRestrictions: string[];
  allergies: string[];
  customAllergies: string[];
  dislikedIngredients: string[];
  additionalNotes?: string;
}

interface DietaryPreferencesStepProps {
  onComplete: (data: DietaryPreferencesData) => void;
  onSkip?: () => void;
  initialData?: DietaryPreferencesData;
  isLoading?: boolean;
}

export function DietaryPreferencesStep({ 
  onComplete, 
  onSkip, 
  initialData = {
    dietaryRestrictions: [],
    allergies: [],
    customAllergies: [],
    dislikedIngredients: [],
    additionalNotes: ''
  }, 
  isLoading = false 
}: DietaryPreferencesStepProps) {
  const [formData, setFormData] = useState<DietaryPreferencesData>(initialData);
  const [newCustomAllergy, setNewCustomAllergy] = useState('');
  const [newDislikedIngredient, setNewDislikedIngredient] = useState('');

  const handleDietaryRestrictionChange = (restrictionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, restrictionId]
        : prev.dietaryRestrictions.filter(id => id !== restrictionId)
    }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      allergies: checked 
        ? [...prev.allergies, allergy]
        : prev.allergies.filter(a => a !== allergy)
    }));
  };

  const addCustomAllergy = () => {
    if (newCustomAllergy.trim() && !formData.customAllergies.includes(newCustomAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        customAllergies: [...prev.customAllergies, newCustomAllergy.trim()]
      }));
      setNewCustomAllergy('');
    }
  };

  const removeCustomAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      customAllergies: prev.customAllergies.filter(a => a !== allergy)
    }));
  };

  const addDislikedIngredient = () => {
    if (newDislikedIngredient.trim() && !formData.dislikedIngredients.includes(newDislikedIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        dislikedIngredients: [...prev.dislikedIngredients, newDislikedIngredient.trim()]
      }));
      setNewDislikedIngredient('');
    }
  };

  const removeDislikedIngredient = (ingredient: string) => {
    setFormData(prev => ({
      ...prev,
      dislikedIngredients: prev.dislikedIngredients.filter(i => i !== ingredient)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const hasSelections = 
    formData.dietaryRestrictions.length > 0 || 
    formData.allergies.length > 0 || 
    formData.customAllergies.length > 0 || 
    formData.dislikedIngredients.length > 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Apple className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Dietary Preferences & Restrictions</CardTitle>
        <CardDescription className="text-base">
          Help us show you recipes that work for your dietary needs and preferences.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dietary Restrictions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Dietary Restrictions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMMON_DIETARY_RESTRICTIONS.map((restriction) => (
                <div key={restriction.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={restriction.id}
                    checked={formData.dietaryRestrictions.includes(restriction.id)}
                    onCheckedChange={(checked) => 
                      handleDietaryRestrictionChange(restriction.id, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <div className="flex-1">
                    <Label htmlFor={restriction.id} className="font-medium cursor-pointer">
                      {restriction.label}
                    </Label>
                    <p className="text-sm text-gray-600">{restriction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold">Food Allergies</h3>
              <Badge variant="destructive" className="text-xs">Important</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Select any foods you&apos;re allergic to. We&apos;ll make sure to exclude them from recipe suggestions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COMMON_ALLERGIES.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                  <Checkbox
                    id={`allergy-${allergy}`}
                    checked={formData.allergies.includes(allergy)}
                    onCheckedChange={(checked) => 
                      handleAllergyChange(allergy, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor={`allergy-${allergy}`} className="text-sm cursor-pointer">
                    {allergy}
                  </Label>
                </div>
              ))}
            </div>

            {/* Custom Allergies */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Other Allergies</Label>
              <div className="flex space-x-2">
                <Input
                  value={newCustomAllergy}
                  onChange={(e) => setNewCustomAllergy(e.target.value)}
                  placeholder="Add custom allergy..."
                  disabled={isLoading}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAllergy())}
                />
                <Button 
                  type="button" 
                  onClick={addCustomAllergy}
                  disabled={!newCustomAllergy.trim() || isLoading}
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.customAllergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.customAllergies.map((allergy) => (
                    <Badge key={allergy} variant="secondary" className="flex items-center gap-1">
                      {allergy}
                      <button
                        type="button"
                        onClick={() => removeCustomAllergy(allergy)}
                        disabled={isLoading}
                        className="hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Disliked Ingredients */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ingredients You Dislike</h3>
            <p className="text-sm text-gray-600">
              Tell us what you don&apos;t enjoy eating so we can suggest better recipes for you.
            </p>
            
            <div className="flex space-x-2">
              <Input
                value={newDislikedIngredient}
                onChange={(e) => setNewDislikedIngredient(e.target.value)}
                placeholder="e.g., mushrooms, cilantro, blue cheese..."
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDislikedIngredient())}
              />
              <Button 
                type="button" 
                onClick={addDislikedIngredient}
                disabled={!newDislikedIngredient.trim() || isLoading}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.dislikedIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.dislikedIngredients.map((ingredient) => (
                  <Badge key={ingredient} variant="outline" className="flex items-center gap-1">
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeDislikedIngredient(ingredient)}
                      disabled={isLoading}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-sm font-medium">
              Additional Notes
            </Label>
            <textarea
              id="additionalNotes"
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any other dietary considerations or special requirements..."
              disabled={isLoading}
            />
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
                hasSelections ? 'Save Preferences' : 'No Restrictions'
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

        {/* Safety Notice */}
        {(formData.allergies.length > 0 || formData.customAllergies.length > 0) && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Important Safety Notice</p>
                <p>
                  Always check recipe ingredients carefully. While we&apos;ll filter recipes based on your allergies, 
                  please verify all ingredients and potential cross-contamination risks before cooking.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 