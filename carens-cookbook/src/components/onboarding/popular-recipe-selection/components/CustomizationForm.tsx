import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, ArrowLeft, CheckCircle } from 'lucide-react';
import { CustomizationFormProps } from '../utils/types';
import { RecipeData } from '../../first-recipe-flow/utils/types';

export function CustomizationForm({ 
  selectedRecipe,
  customizedRecipe, 
  setCustomizedRecipe, 
  userCategories, 
  onComplete,
  onCancel 
}: CustomizationFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Edit3 className="h-8 w-8 text-blue-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900">Customize Your Recipe</h3>
        <p className="text-gray-600">Make any changes you&apos;d like before adding to your collection</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name
          </label>
          <Input
            value={customizedRecipe.title || ''}
            onChange={(e) => setCustomizedRecipe({ ...customizedRecipe, title: e.target.value })}
            placeholder="Recipe name..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={customizedRecipe.description || ''}
            onChange={(e) => setCustomizedRecipe({ ...customizedRecipe, description: e.target.value })}
            placeholder="Recipe description..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prep Time
          </label>
          <Input
            value={customizedRecipe.prepTime || ''}
            onChange={(e) => setCustomizedRecipe({ ...customizedRecipe, prepTime: e.target.value })}
            placeholder="e.g., 15 minutes"
          />
        </div>

        {userCategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={customizedRecipe.category || userCategories[0]}
              onChange={(e) => setCustomizedRecipe({ ...customizedRecipe, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {userCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients
          </label>
          <Textarea
            value={customizedRecipe.ingredients?.join('\n') || ''}
            onChange={(e) => setCustomizedRecipe({ 
              ...customizedRecipe, 
              ingredients: e.target.value.split('\n').filter(line => line.trim())
            })}
            placeholder="One ingredient per line..."
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <Textarea
            value={customizedRecipe.steps?.join('\n') || ''}
            onChange={(e) => setCustomizedRecipe({ 
              ...customizedRecipe, 
              steps: e.target.value.split('\n').filter(line => line.trim())
            })}
            placeholder="One step per line..."
            rows={8}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipe
        </Button>

        <Button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Save Recipe
        </Button>
      </div>
    </div>
  );
} 