// TypeScript types for user preferences and onboarding

import { User, CookingSkillLevel, DietaryPreference, ProcessingMethod } from '@/generated/prisma';
import type { MeasurementSystem } from '@/lib/constants/user-preferences';

// Simplified user preference types for forms and components
export type UserPreferences = {
  cookingSkillLevel?: CookingSkillLevel;
  dietaryPreferences: DietaryPreference[];
  favoriteCuisines: string[];
  householdSize?: number;
  defaultProcessingMethod?: ProcessingMethod;
  preferredCategories: string[];
  timezone?: string;
  measurementSystem?: MeasurementSystem;
};

// Onboarding state type
export type OnboardingState = {
  currentStep: number;
  completed: boolean;
  preferences: Partial<UserPreferences>;
  selectedCategories: string[];
};

// Form data types for each onboarding step
export type ProfileSetupFormData = {
  cookingSkillLevel: CookingSkillLevel;
  householdSize: number;
  timezone: string;
  measurementSystem: MeasurementSystem;
};

export type PreferencesFormData = {
  dietaryPreferences: DietaryPreference[];
  favoriteCuisines: string[];
  defaultProcessingMethod: ProcessingMethod;
};

export type CategorySetupFormData = {
  selectedCategories: string[];
  customCategories: { name: string; description: string }[];
  removedCategories: string[];
};

// API response types
export type UserPreferencesResponse = {
  user: User;
  preferences: UserPreferences;
};

export type OnboardingProgressResponse = {
  currentStep: number;
  completed: boolean;
  totalSteps: number;
};

// Validation types
export type ValidationError = {
  field: string;
  message: string;
};

export type FormValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

// Component prop types
export type OnboardingStepProps = {
  onNext: (data: Record<string, unknown>) => void;
  onPrevious: () => void;
  onSkip?: () => void;
  initialData?: Record<string, unknown>;
  isLastStep?: boolean;
};

// User creation type with onboarding defaults
export type CreateUserWithDefaults = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  preferences?: Partial<UserPreferences>;
}; 