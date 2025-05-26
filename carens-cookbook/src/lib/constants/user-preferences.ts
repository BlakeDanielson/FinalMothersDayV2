// User preference types and constants for onboarding and user management

import { CookingSkillLevel, DietaryPreference, ProcessingMethod } from '@/generated/prisma';

// Export Prisma enums for use in components
export { CookingSkillLevel, DietaryPreference, ProcessingMethod };

// User-friendly labels for cooking skill levels
export const COOKING_SKILL_LABELS: Record<CookingSkillLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate', 
  ADVANCED: 'Advanced'
};

// User-friendly labels and descriptions for dietary preferences
export const DIETARY_PREFERENCE_INFO: Record<DietaryPreference, { label: string; description: string }> = {
  NONE: { 
    label: 'No restrictions', 
    description: 'I enjoy all types of food' 
  },
  VEGETARIAN: { 
    label: 'Vegetarian', 
    description: 'No meat, but includes dairy and eggs' 
  },
  VEGAN: { 
    label: 'Vegan', 
    description: 'No animal products at all' 
  },
  GLUTEN_FREE: { 
    label: 'Gluten-free', 
    description: 'No wheat, barley, rye, or gluten-containing ingredients' 
  },
  DAIRY_FREE: { 
    label: 'Dairy-free', 
    description: 'No milk, cheese, or other dairy products' 
  },
  KETO: { 
    label: 'Keto', 
    description: 'Very low carb, high fat diet' 
  },
  PALEO: { 
    label: 'Paleo', 
    description: 'No processed foods, grains, or legumes' 
  },
  LOW_CARB: { 
    label: 'Low-carb', 
    description: 'Reduced carbohydrate intake' 
  },
  LOW_SODIUM: { 
    label: 'Low-sodium', 
    description: 'Reduced salt and sodium content' 
  },
  NUT_FREE: { 
    label: 'Nut-free', 
    description: 'No tree nuts or peanuts' 
  },
  KOSHER: { 
    label: 'Kosher', 
    description: 'Follows Jewish dietary laws' 
  },
  HALAL: { 
    label: 'Halal', 
    description: 'Follows Islamic dietary laws' 
  }
};

// User-friendly labels for processing methods
export const PROCESSING_METHOD_LABELS: Record<ProcessingMethod, string> = {
  OPENAI: 'OpenAI Processing',
  GEMINI: 'Gemini Processing'
};

// Popular cuisines for selection during onboarding
export const POPULAR_CUISINES = [
  'Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'French',
  'Japanese', 'Thai', 'Greek', 'Spanish', 'Mediterranean', 'Korean',
  'Vietnamese', 'Lebanese', 'Moroccan', 'German', 'British', 'Turkish',
  'Brazilian', 'Peruvian', 'Ethiopian', 'Russian', 'Cajun', 'Caribbean'
];

// Household size options
export const HOUSEHOLD_SIZE_OPTIONS = [
  { value: 1, label: 'Just me' },
  { value: 2, label: '2 people' },
  { value: 3, label: '3 people' },
  { value: 4, label: '4 people' },
  { value: 5, label: '5 people' },
  { value: 6, label: '6+ people' }
];

// Measurement system options
export const MEASUREMENT_SYSTEMS = {
  METRIC: 'Metric (grams, liters)',
  IMPERIAL: 'Imperial (cups, pounds)'
} as const;

export type MeasurementSystem = keyof typeof MEASUREMENT_SYSTEMS;

// Onboarding step configuration - as an array for length property
export const ONBOARDING_STEPS = [
  { 
    id: 0, 
    key: 'WELCOME', 
    title: 'Welcome', 
    description: 'Welcome to Caren\'s Cookbook! Let\'s get you set up to discover and organize your favorite recipes.',
    isOptional: false
  },
  { 
    id: 1, 
    key: 'PROFILE_SETUP', 
    title: 'Profile Setup', 
    description: 'Tell us a bit about yourself to personalize your recipe experience.',
    isOptional: false
  },
  { 
    id: 2, 
    key: 'DIETARY_PREFERENCES', 
    title: 'Dietary Preferences', 
    description: 'Let us know about any dietary restrictions or preferences you have.',
    isOptional: true
  },
  { 
    id: 3, 
    key: 'COOKING_PREFERENCES', 
    title: 'Cooking Preferences', 
    description: 'Help us understand your cooking style and experience level.',
    isOptional: false
  },
  { 
    id: 4, 
    key: 'CATEGORY_SETUP', 
    title: 'Category Setup', 
    description: 'Create custom categories to organize your recipes your way.',
    isOptional: true
  },
  { 
    id: 5, 
    key: 'FIRST_RECIPE', 
    title: 'First Recipe', 
    description: 'Add your first recipe to get started with your collection.',
    isOptional: true
  },
  { 
    id: 6, 
    key: 'COMPLETION', 
    title: 'Completion', 
    description: 'You\'re all set! Start exploring and building your recipe collection.',
    isOptional: false
  }
];

// Default user preferences for new users
export const DEFAULT_USER_PREFERENCES = {
  cookingSkillLevel: CookingSkillLevel.BEGINNER,
  householdSize: 2,
  defaultProcessingMethod: ProcessingMethod.OPENAI,
  timezone: 'America/New_York',
  measurementSystem: 'IMPERIAL' as MeasurementSystem
};

// Validation constants
export const VALIDATION_RULES = {
  displayName: {
    minLength: 1,
    maxLength: 50
  },
  categoryName: {
    minLength: 1,
    maxLength: 50
  },
  categoryDescription: {
    maxLength: 200
  },
  householdSize: {
    min: 1,
    max: 20
  },
  maxFavoriteCuisines: 10,
  maxCustomCategories: 20
}; 