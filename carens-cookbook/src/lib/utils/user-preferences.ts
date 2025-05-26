// Utility functions for user preferences and onboarding

import { 
  CookingSkillLevel, 
  DietaryPreference, 
  ProcessingMethod 
} from '@/generated/prisma';
import { 
  UserPreferences, 
  OnboardingState, 
  ProfileSetupFormData, 
  PreferencesFormData, 
  CategorySetupFormData,
  FormValidationResult,
  ValidationError
} from '@/lib/types/user';
import { 
  ONBOARDING_STEPS,
  DEFAULT_USER_PREFERENCES,
  POPULAR_CUISINES,
  PROCESSING_METHOD_LABELS
} from '@/lib/constants/user-preferences';

// Get default user preferences for new users
export function getDefaultUserPreferences(): UserPreferences {
  return {
    cookingSkillLevel: DEFAULT_USER_PREFERENCES.cookingSkillLevel,
    dietaryPreferences: [DietaryPreference.NONE],
    favoriteCuisines: [],
    householdSize: DEFAULT_USER_PREFERENCES.householdSize,
    defaultProcessingMethod: DEFAULT_USER_PREFERENCES.defaultProcessingMethod,
    preferredCategories: [],
    timezone: DEFAULT_USER_PREFERENCES.timezone,
    measurementSystem: DEFAULT_USER_PREFERENCES.measurementSystem
  };
}

// Initialize onboarding state
export function initializeOnboardingState(): OnboardingState {
  return {
    currentStep: 0,
    completed: false,
    preferences: getDefaultUserPreferences(),
    selectedCategories: []
  };
}

// Validation functions
export function validateProfileSetup(data: Partial<ProfileSetupFormData>): FormValidationResult {
  const errors: ValidationError[] = [];

  if (!data.cookingSkillLevel) {
    errors.push({ field: 'cookingSkillLevel', message: 'Please select your cooking skill level' });
  }

  if (!data.householdSize || data.householdSize < 1 || data.householdSize > 20) {
    errors.push({ field: 'householdSize', message: 'Household size must be between 1 and 20' });
  }

  if (!data.timezone) {
    errors.push({ field: 'timezone', message: 'Please select your timezone' });
  }

  if (!data.measurementSystem) {
    errors.push({ field: 'measurementSystem', message: 'Please select your preferred measurement system' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePreferences(data: Partial<PreferencesFormData>): FormValidationResult {
  const errors: ValidationError[] = [];

  if (!data.dietaryPreferences || data.dietaryPreferences.length === 0) {
    errors.push({ field: 'dietaryPreferences', message: 'Please select at least one dietary preference (or "No restrictions")' });
  }

  if (!data.favoriteCuisines || data.favoriteCuisines.length === 0) {
    errors.push({ field: 'favoriteCuisines', message: 'Please select at least one favorite cuisine' });
  }

  if (data.favoriteCuisines && data.favoriteCuisines.length > 10) {
    errors.push({ field: 'favoriteCuisines', message: 'Please select no more than 10 favorite cuisines' });
  }

  if (!data.defaultProcessingMethod) {
    errors.push({ field: 'defaultProcessingMethod', message: 'Please select your default recipe processing method' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCategorySetup(data: Partial<CategorySetupFormData>): FormValidationResult {
  const errors: ValidationError[] = [];

  if (!data.selectedCategories || data.selectedCategories.length === 0) {
    errors.push({ field: 'selectedCategories', message: 'Please select at least 3 categories to organize your recipes' });
  }

  if (data.selectedCategories && data.selectedCategories.length < 3) {
    errors.push({ field: 'selectedCategories', message: 'Please select at least 3 categories for better organization' });
  }

  // Validate custom categories
  if (data.customCategories) {
    data.customCategories.forEach((category, index) => {
      if (!category.name || category.name.trim().length < 2) {
        errors.push({ 
          field: `customCategories.${index}.name`, 
          message: 'Category name must be at least 2 characters long' 
        });
      }
      if (category.name && category.name.length > 50) {
        errors.push({ 
          field: `customCategories.${index}.name`, 
          message: 'Category name must be less than 50 characters' 
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Onboarding progress helpers
export function getOnboardingProgress(currentStep: number, totalSteps: number = ONBOARDING_STEPS.length): number {
  return Math.round((currentStep / totalSteps) * 100);
}

export function getNextStep(currentStep: number): number {
  return Math.min(currentStep + 1, ONBOARDING_STEPS.length - 1);
}

export function getPreviousStep(currentStep: number): number {
  return Math.max(currentStep - 1, 0);
}

export function isLastStep(currentStep: number): boolean {
  return currentStep === ONBOARDING_STEPS.length - 1;
}

export function isFirstStep(currentStep: number): boolean {
  return currentStep === 0;
}

export function getStepTitle(stepIndex: number): string {
  const step = ONBOARDING_STEPS[stepIndex];
  return step ? step.title : 'Unknown Step';
}

// Preference formatting helpers
export function formatCookingSkillLevel(level: CookingSkillLevel): string {
  const levels = {
    [CookingSkillLevel.BEGINNER]: 'Beginner',
    [CookingSkillLevel.INTERMEDIATE]: 'Intermediate',
    [CookingSkillLevel.ADVANCED]: 'Advanced'
  };
  return levels[level];
}

export function formatDietaryPreferences(preferences: DietaryPreference[]): string {
  if (preferences.includes(DietaryPreference.NONE)) {
    return 'No dietary restrictions';
  }
  return preferences.map(pref => pref.replace(/_/g, ' ').toLowerCase()).join(', ');
}

export function formatProcessingMethod(method: ProcessingMethod): string {
  return PROCESSING_METHOD_LABELS[method] || 'Unknown method';
}

// Category helpers
export function mergeCategoriesWithCustom(
  defaultCategories: string[], 
  selectedCategories: string[], 
  customCategories: { name: string; description: string }[],
  removedCategories: string[] = []
): string[] {
  // Start with selected default categories
  let finalCategories = defaultCategories.filter(cat => 
    selectedCategories.includes(cat) && !removedCategories.includes(cat)
  );
  
  // Add custom categories
  const customCategoryNames = customCategories.map(cat => cat.name);
  finalCategories = [...finalCategories, ...customCategoryNames];
  
  return finalCategories;
}

// Local storage helpers for onboarding state
export function saveOnboardingState(state: OnboardingState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('onboarding-state', JSON.stringify(state));
  }
}

export function loadOnboardingState(): OnboardingState | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('onboarding-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse onboarding state:', error);
        localStorage.removeItem('onboarding-state');
      }
    }
  }
  return null;
}

export function clearOnboardingState(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('onboarding-state');
  }
}

// Timezone helpers
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

// Cuisine suggestion helpers
export function getPopularCuisines(): string[] {
  return POPULAR_CUISINES;
}

export function getCuisineSuggestions(searchTerm: string): string[] {
  const term = searchTerm.toLowerCase();
  return POPULAR_CUISINES.filter(cuisine => 
    cuisine.toLowerCase().includes(term)
  ).slice(0, 5);
}

// Onboarding step management functions
export function getNextOnboardingStep(currentStep: number): number {
  return Math.min(currentStep + 1, ONBOARDING_STEPS.length - 1);
}

export function isValidOnboardingStep(step: number): boolean {
  return step >= 0 && step < ONBOARDING_STEPS.length;
}

export function getOnboardingStepByIndex(index: number): typeof ONBOARDING_STEPS[0] | null {
  return ONBOARDING_STEPS[index] || null;
} 