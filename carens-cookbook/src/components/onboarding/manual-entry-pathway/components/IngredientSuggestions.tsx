import React from 'react';
import { IngredientSuggestionsProps } from '../utils/types';
import { COMMON_INGREDIENTS } from '../data/constants';

export function IngredientSuggestions({ 
  isVisible, 
  currentInput, 
  onSelect, 
  onClose 
}: IngredientSuggestionsProps) {
  if (!isVisible) return null;

  const suggestions = COMMON_INGREDIENTS.filter(ing => 
    ing.toLowerCase().includes(currentInput.toLowerCase()) && 
    ing.toLowerCase() !== currentInput.toLowerCase()
  ).slice(0, 5);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
          onClick={() => {
            onSelect(suggestion);
            onClose();
          }}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
} 