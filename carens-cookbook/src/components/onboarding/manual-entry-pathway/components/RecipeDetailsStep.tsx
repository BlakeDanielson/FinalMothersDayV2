import React from 'react';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecipeDetailsStepProps } from '../utils/types';
import { DIFFICULTY_OPTIONS, CUISINE_SUGGESTIONS } from '../data/constants';

export function RecipeDetailsStep({
  formData,
  setFormData,
  userCategories
}: RecipeDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Sparkles className="h-8 w-8 text-orange-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900">Final details</h3>
        <p className="text-gray-600">Add helpful information for cooking</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prep Time
          </label>
          <Input
            value={formData.prepTime}
            onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
            placeholder="e.g., 15 minutes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servings
          </label>
          <Input
            value={formData.servings}
            onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
            placeholder="e.g., 4 people"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData(prev => ({ ...prev, difficulty: option.value as 'Easy' | 'Medium' | 'Hard' }))}
              className={cn(
                "p-3 border rounded-lg text-center transition-colors",
                formData.difficulty === option.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cuisine Type
        </label>
        <div className="relative">
          <Input
            value={formData.cuisine}
            onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
            placeholder="e.g., Italian, Mexican, American..."
            list="cuisine-suggestions"
          />
          <datalist id="cuisine-suggestions">
            {CUISINE_SUGGESTIONS.map((cuisine) => (
              <option key={cuisine} value={cuisine} />
            ))}
          </datalist>
        </div>
      </div>

      {userCategories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {userCategories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setFormData(prev => ({ ...prev, category }))}
                className={cn(
                  "p-2 border rounded-lg text-sm transition-colors",
                  formData.category === category
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 