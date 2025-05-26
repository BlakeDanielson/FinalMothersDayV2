// Zod validation schemas for user preferences and onboarding forms

import { z } from 'zod';
import { CookingSkillLevel, DietaryPreference, ProcessingMethod } from '@/generated/prisma';
import { MeasurementSystem } from '@/lib/constants/user-preferences';

// Base validation schemas for enums
export const cookingSkillLevelSchema = z.nativeEnum(CookingSkillLevel);
export const dietaryPreferenceSchema = z.nativeEnum(DietaryPreference);
export const processingMethodSchema = z.nativeEnum(ProcessingMethod);
export const measurementSystemSchema = z.enum(['METRIC', 'IMPERIAL'] as [MeasurementSystem, ...MeasurementSystem[]]);

// Profile setup form validation
export const profileSetupSchema = z.object({
  displayName: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be less than 50 characters'),
  cookingSkillLevel: cookingSkillLevelSchema.optional(),
  householdSize: z.number()
    .int('Household size must be a whole number')
    .min(1, 'Household size must be at least 1')
    .max(20, 'Household size seems too large')
    .optional(),
  timezone: z.string().optional(),
  measurementSystem: measurementSystemSchema.optional()
});

// Preferences form validation
export const preferencesSchema = z.object({
  dietaryPreferences: z.array(dietaryPreferenceSchema)
    .min(1, 'Please select at least one dietary preference'),
  favoriteCuisines: z.array(z.string())
    .max(10, 'Please select no more than 10 favorite cuisines'),
  defaultProcessingMethod: processingMethodSchema.optional()
});

// Category setup form validation
export const categorySetupSchema = z.object({
  selectedCategories: z.array(z.string())
    .min(1, 'Please select at least one category'),
  customCategories: z.array(z.object({
    name: z.string()
      .min(1, 'Category name is required')
      .max(50, 'Category name must be less than 50 characters'),
    description: z.string()
      .max(200, 'Category description must be less than 200 characters')
      .optional()
  })).optional()
});

// Complete user preferences validation
export const userPreferencesSchema = z.object({
  cookingSkillLevel: cookingSkillLevelSchema.optional(),
  dietaryPreferences: z.array(dietaryPreferenceSchema),
  favoriteCuisines: z.array(z.string()),
  householdSize: z.number().int().min(1).max(20).optional(),
  defaultProcessingMethod: processingMethodSchema.optional(),
  preferredCategories: z.array(z.string()),
  timezone: z.string().optional(),
  measurementSystem: measurementSystemSchema.optional()
});

// Onboarding state validation
export const onboardingStateSchema = z.object({
  currentStep: z.number().int().min(0).max(10),
  completed: z.boolean(),
  preferences: userPreferencesSchema.partial(),
  selectedCategories: z.array(z.string())
});

// Export schema types
export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type CategorySetupFormData = z.infer<typeof categorySetupSchema>;
export type UserPreferencesData = z.infer<typeof userPreferencesSchema>;
export type OnboardingStateData = z.infer<typeof onboardingStateSchema>;

// Validation helper functions
export function validateProfileSetup(data: unknown): { success: true; data: ProfileSetupFormData } | { success: false; errors: z.ZodError } {
  const result = profileSetupSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

export function validatePreferences(data: unknown): { success: true; data: PreferencesFormData } | { success: false; errors: z.ZodError } {
  const result = preferencesSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

export function validateCategorySetup(data: unknown): { success: true; data: CategorySetupFormData } | { success: false; errors: z.ZodError } {
  const result = categorySetupSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

export function validateUserPreferences(data: unknown): { success: true; data: UserPreferencesData } | { success: false; errors: z.ZodError } {
  const result = userPreferencesSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
} 