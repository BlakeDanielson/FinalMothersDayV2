import { FormStep, DifficultyOption } from '../utils/types';

export const FORM_STEPS: FormStep[] = [
  {
    id: 'basics',
    title: 'Recipe Basics',
    description: 'Name and description',
    required: true,
    completed: false
  },
  {
    id: 'ingredients',
    title: 'Ingredients',
    description: 'What you need',
    required: true,
    completed: false
  },
  {
    id: 'instructions',
    title: 'Instructions',
    description: 'How to make it',
    required: true,
    completed: false
  },
  {
    id: 'details',
    title: 'Details',
    description: 'Time, servings, etc.',
    required: false,
    completed: false
  }
];

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { value: 'Easy', label: 'Easy', description: 'Simple ingredients, basic techniques' },
  { value: 'Medium', label: 'Medium', description: 'Some cooking experience helpful' },
  { value: 'Hard', label: 'Hard', description: 'Advanced techniques required' }
];

export const CUISINE_SUGGESTIONS = [
  'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'French', 'Japanese', 
  'Thai', 'Mediterranean', 'Greek', 'Spanish', 'Korean', 'Vietnamese', 'Other'
];

export const COMMON_INGREDIENTS = [
  'salt', 'pepper', 'olive oil', 'butter', 'garlic', 'onion', 'flour', 'sugar',
  'eggs', 'milk', 'cheese', 'chicken', 'beef', 'tomatoes', 'lemon', 'herbs'
]; 