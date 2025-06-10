import * as Yup from 'yup';
import { CategorySuggestion } from './types';
import { VALIDATION_RULES } from '@/lib/constants/user-preferences';

// Category suggestions based on cooking patterns
export const CATEGORY_SUGGESTIONS: CategorySuggestion[] = [
  { name: 'Quick Meals', description: 'Recipes that can be made in 30 minutes or less' },
  { name: 'Meal Prep', description: 'Make-ahead recipes perfect for weekly meal planning' },
  { name: 'One-Pot Meals', description: 'Complete meals made in a single pot or pan' },
  { name: 'Healthy Options', description: 'Nutritious and wholesome recipe choices' },
  { name: 'Comfort Food', description: 'Hearty, satisfying dishes for cozy meals' },
  { name: 'Holiday Treats', description: 'Special recipes for celebrations and holidays' },
  { name: 'Kid-Friendly', description: 'Recipes that children will love' },
  { name: 'Date Night', description: 'Romantic and special occasion recipes' },
  { name: 'Budget-Friendly', description: 'Delicious meals that won\'t break the bank' },
  { name: 'Seasonal', description: 'Recipes featuring seasonal ingredients' }
];

// Validation schema
export const validationSchema = Yup.object({
  selectedCategories: Yup.array()
    .min(3, 'Please select at least 3 categories for better organization')
    .required('Please select at least 3 categories'),
  customCategories: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .min(VALIDATION_RULES.categoryName.minLength, `Category name must be at least ${VALIDATION_RULES.categoryName.minLength} characters`)
        .max(VALIDATION_RULES.categoryName.maxLength, `Category name must be less than ${VALIDATION_RULES.categoryName.maxLength} characters`)
        .required('Category name is required'),
      description: Yup.string()
        .max(VALIDATION_RULES.categoryDescription.maxLength, `Description must be less than ${VALIDATION_RULES.categoryDescription.maxLength} characters`)
    })
  )
});

// History management constants
export const MAX_HISTORY_SIZE = 20;
export const DEBOUNCE_DELAY = 300;
export const MIN_CATEGORIES_REQUIRED = 3; 