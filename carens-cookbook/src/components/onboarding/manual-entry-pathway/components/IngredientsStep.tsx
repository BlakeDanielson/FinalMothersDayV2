import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Plus, Minus } from 'lucide-react';
import { IngredientsStepProps } from '../utils/types';
import { IngredientSuggestions } from './IngredientSuggestions';

export function IngredientsStep({
  formData,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
  activeIngredientIndex,
  setActiveIngredientIndex,
  showIngredientSuggestions,
  setShowIngredientSuggestions
}: IngredientsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <BookOpen className="h-8 w-8 text-green-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900">What ingredients do you need?</h3>
        <p className="text-gray-600">List all the ingredients with amounts</p>
      </div>

      <div className="space-y-3">
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="relative">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={index === 0 ? "e.g., 2 cups all-purpose flour" : "Add another ingredient..."}
                  onFocus={() => setActiveIngredientIndex(index)}
                  onBlur={() => {
                    setTimeout(() => setShowIngredientSuggestions(false), 200);
                  }}
                />
                <IngredientSuggestions
                  isVisible={index === activeIngredientIndex && showIngredientSuggestions}
                  currentInput={ingredient}
                  onSelect={(suggestion) => handleIngredientChange(activeIngredientIndex, suggestion)}
                  onClose={() => setShowIngredientSuggestions(false)}
                />
              </div>
              {formData.ingredients.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={addIngredient}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Ingredient
        </Button>
      </div>

      {/* Tips for ingredients */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Pro Tips</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Include amounts (2 cups, 1 tbsp, etc.)</li>
              <li>• Be specific (all-purpose flour vs. flour)</li>
              <li>• List ingredients in order of use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 