// Category Initialization Service
// Handles smart category setup for new users during onboarding

import { prisma } from '@/lib/db';
import { 
  PREDEFINED_CATEGORIES, 
  CATEGORY_METADATA, 
  CUISINE_CATEGORY_MAPPING,
  DIETARY_CATEGORY_MAPPING,
  type PredefinedCategory
} from '@/lib/constants/categories';
import type { DietaryPreference, CookingSkillLevel } from '@/generated/prisma';

export interface CategorySuggestion {
  name: string;
  description: string;
  reason: string;
  confidence: number; // 0.0 to 1.0
  source: 'dietary' | 'cuisine' | 'skill' | 'popular' | 'default';
  isRecommended: boolean;
}

export interface CategoryInitializationResult {
  suggestedCategories: CategorySuggestion[];
  selectedCategories: string[];
  conflictResolutions: CategoryConflictResolution[];
  analytics: CategoryAnalytics;
}

export interface CategoryConflictResolution {
  originalCategory: string;
  suggestedCategory: string;
  reason: string;
  action: 'merge' | 'rename' | 'keep_both' | 'replace';
}

export interface CategoryAnalytics {
  totalSuggested: number;
  bySource: Record<string, number>;
  averageConfidence: number;
  coverageScore: number; // How well categories cover user preferences
  diversityScore: number; // How diverse the category selection is
}

export interface UserCategoryPreferences {
  dietaryPreferences: DietaryPreference[];
  favoriteCuisines: string[];
  cookingSkillLevel: CookingSkillLevel | null;
  householdSize: number | null;
  existingCategories?: string[];
}

export class CategoryInitializationService {
  /**
   * Generate smart category suggestions based on user preferences
   */
  static async generateCategorySuggestions(
    userId: string,
    preferences: UserCategoryPreferences
  ): Promise<CategorySuggestion[]> {
    const suggestions: CategorySuggestion[] = [];
    const addedCategories = new Set<string>();

    // 1. Add dietary preference-based categories
    for (const dietary of preferences.dietaryPreferences) {
      const categories = DIETARY_CATEGORY_MAPPING[dietary] || [];
      for (const categoryName of categories) {
        if (!addedCategories.has(categoryName)) {
          const metadata = CATEGORY_METADATA[categoryName];
          if (metadata && metadata.description) {
            suggestions.push({
              name: categoryName,
              description: metadata.description,
              reason: `Suggested based on your ${dietary.toLowerCase().replace('_', ' ')} dietary preference`,
              confidence: 0.9,
              source: 'dietary',
              isRecommended: true
            });
            addedCategories.add(categoryName);
          }
        }
      }
    }

    // 2. Add cuisine-based categories
    for (const cuisine of preferences.favoriteCuisines) {
      const categories = CUISINE_CATEGORY_MAPPING[cuisine] || [];
      for (const categoryName of categories) {
        if (!addedCategories.has(categoryName)) {
          const metadata = CATEGORY_METADATA[categoryName];
          if (metadata && metadata.description) {
            suggestions.push({
              name: categoryName,
              description: metadata.description,
              reason: `Suggested based on your interest in ${cuisine} cuisine`,
              confidence: 0.8,
              source: 'cuisine',
              isRecommended: true
            });
            addedCategories.add(categoryName);
          }
        }
      }
    }

    // 3. Add skill-level appropriate categories
    if (preferences.cookingSkillLevel) {
      const skillCategories = this.getCategoriesForSkillLevel(preferences.cookingSkillLevel);
      for (const categoryName of skillCategories) {
        if (!addedCategories.has(categoryName)) {
          const metadata = CATEGORY_METADATA[categoryName];
          if (metadata && metadata.description) {
            suggestions.push({
              name: categoryName,
              description: metadata.description,
              reason: `Recommended for ${preferences.cookingSkillLevel.toLowerCase()} cooks`,
              confidence: 0.7,
              source: 'skill',
              isRecommended: true
            });
            addedCategories.add(categoryName);
          }
        }
      }
    }

    // 4. Add household size-based categories
    if (preferences.householdSize) {
      const householdCategories = this.getCategoriesForHouseholdSize(preferences.householdSize);
      for (const categoryName of householdCategories) {
        if (!addedCategories.has(categoryName)) {
          const metadata = CATEGORY_METADATA[categoryName];
          if (metadata && metadata.description) {
            suggestions.push({
              name: categoryName,
              description: metadata.description,
              reason: `Useful for cooking for ${preferences.householdSize} people`,
              confidence: 0.6,
              source: 'popular',
              isRecommended: false
            });
            addedCategories.add(categoryName);
          }
        }
      }
    }

    // 5. Add popular categories from other users
    const popularCategories = await this.getPopularCategories(userId);
    for (const categoryName of popularCategories) {
      if (!addedCategories.has(categoryName)) {
        const metadata = CATEGORY_METADATA[categoryName];
        if (metadata && metadata.description) {
          suggestions.push({
            name: categoryName,
            description: metadata.description,
            reason: 'Popular among other users',
            confidence: 0.5,
            source: 'popular',
            isRecommended: false
          });
          addedCategories.add(categoryName);
        }
      }
    }

    // 6. Fill with essential default categories
    const essentialCategories = ['Breakfast', 'Side Dish', 'Dessert'];
    for (const categoryName of essentialCategories) {
      if (!addedCategories.has(categoryName)) {
        const metadata = CATEGORY_METADATA[categoryName];
        if (metadata && metadata.description) {
          suggestions.push({
            name: categoryName,
            description: metadata.description,
            reason: 'Essential category for recipe organization',
            confidence: 0.8,
            source: 'default',
            isRecommended: true
          });
          addedCategories.add(categoryName);
        }
      }
    }

    // Sort by confidence and recommendation status
    return suggestions.sort((a, b) => {
      if (a.isRecommended !== b.isRecommended) {
        return a.isRecommended ? -1 : 1;
      }
      return b.confidence - a.confidence;
    });
  }

  /**
   * Initialize categories for a new user
   */
  static async initializeUserCategories(
    userId: string,
    selectedCategories: string[],
    preferences: UserCategoryPreferences
  ): Promise<CategoryInitializationResult> {
    // Generate suggestions
    const suggestedCategories = await this.generateCategorySuggestions(userId, preferences);

    // Resolve conflicts with existing categories
    const conflictResolutions = await this.resolveConflicts(
      userId,
      selectedCategories,
      preferences.existingCategories || []
    );

    // Update user preferences with selected categories
    await prisma.user.update({
      where: { id: userId },
      data: {
        preferredCategories: selectedCategories
      }
    });

    // Generate analytics
    const analytics = this.generateAnalytics(suggestedCategories, selectedCategories);

    return {
      suggestedCategories,
      selectedCategories,
      conflictResolutions,
      analytics
    };
  }

  /**
   * Get categories appropriate for cooking skill level
   */
  private static getCategoriesForSkillLevel(skillLevel: CookingSkillLevel): string[] {
    switch (skillLevel) {
      case 'BEGINNER':
        return [
          'Quick & Easy',
          'One-Pot Meals',
          'No-Bake',
          'Microwave',
          'Simple Sides',
          'Basic Breakfast'
        ];
      case 'INTERMEDIATE':
        return [
          'Comfort Food',
          'Baked Goods',
          'Grilled',
          'Stir-Fry',
          'Pasta',
          'Soups & Stews'
        ];
      case 'ADVANCED':
        return [
          'Gourmet',
          'Fermented',
          'Artisan Bread',
          'Complex Sauces',
          'Multi-Course',
          'International'
        ];
      default:
        return [];
    }
  }

  /**
   * Get categories appropriate for household size
   */
  private static getCategoriesForHouseholdSize(size: number): string[] {
    if (size === 1) {
      return ['Single Serving', 'Quick & Easy', 'Microwave', 'No-Cook'];
    } else if (size <= 3) {
      return ['Small Batch', 'Weeknight Dinners', 'Light Meals'];
    } else if (size <= 6) {
      return ['Family Meals', 'Batch Cooking', 'Large Portions'];
    } else {
      return ['Crowd Pleasers', 'Party Food', 'Bulk Cooking', 'Entertaining'];
    }
  }

  /**
   * Get popular categories from other users
   */
  private static async getPopularCategories(excludeUserId: string): Promise<string[]> {
    try {
      const popularCategories = await prisma.recipe.groupBy({
        by: ['category'],
        where: {
          userId: { not: excludeUserId }
        },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10
      });

      return popularCategories
        .map(item => item.category)
        .filter((category): category is PredefinedCategory => 
          typeof category === 'string' && PREDEFINED_CATEGORIES.includes(category as PredefinedCategory)
        );
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      return [];
    }
  }

  /**
   * Resolve conflicts between selected and existing categories
   */
  private static async resolveConflicts(
    userId: string,
    selectedCategories: string[],
    existingCategories: string[]
  ): Promise<CategoryConflictResolution[]> {
    const resolutions: CategoryConflictResolution[] = [];

    // Check for similar category names that might be duplicates
    for (const selected of selectedCategories) {
      for (const existing of existingCategories) {
        const similarity = this.calculateStringSimilarity(selected, existing);
        
        if (similarity > 0.8 && selected !== existing) {
          // High similarity - suggest merge
          resolutions.push({
            originalCategory: existing,
            suggestedCategory: selected,
            reason: `"${existing}" and "${selected}" appear to be similar categories`,
            action: 'merge'
          });
        } else if (similarity > 0.6 && selected !== existing) {
          // Medium similarity - suggest rename
          resolutions.push({
            originalCategory: existing,
            suggestedCategory: selected,
            reason: `"${existing}" might be better named as "${selected}"`,
            action: 'rename'
          });
        }
      }
    }

    return resolutions;
  }

  /**
   * Calculate string similarity using Levenshtein distance
   */
  private static calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Generate analytics for category initialization
   */
  private static generateAnalytics(
    suggestions: CategorySuggestion[],
    selected: string[]
  ): CategoryAnalytics {
    const bySource: Record<string, number> = {};
    let totalConfidence = 0;

    for (const suggestion of suggestions) {
      bySource[suggestion.source] = (bySource[suggestion.source] || 0) + 1;
      totalConfidence += suggestion.confidence;
    }

    const averageConfidence = suggestions.length > 0 ? totalConfidence / suggestions.length : 0;
    
    // Calculate coverage score (how many suggested categories were selected)
    const recommendedSuggestions = suggestions.filter(s => s.isRecommended);
    const selectedRecommended = selected.filter(cat => 
      recommendedSuggestions.some(s => s.name === cat)
    );
    const coverageScore = recommendedSuggestions.length > 0 
      ? selectedRecommended.length / recommendedSuggestions.length 
      : 0;

    // Calculate diversity score (variety of sources in selected categories)
    const selectedSources = new Set(
      selected.map(cat => {
        const suggestion = suggestions.find(s => s.name === cat);
        return suggestion?.source || 'unknown';
      })
    );
    const diversityScore = selectedSources.size / Object.keys(bySource).length;

    return {
      totalSuggested: suggestions.length,
      bySource,
      averageConfidence,
      coverageScore,
      diversityScore
    };
  }

  /**
   * Get category recommendations for onboarding step
   */
  static async getOnboardingRecommendations(userId: string): Promise<CategorySuggestion[]> {
    // Get user preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        dietaryPreferences: true,
        favoriteCuisines: true,
        cookingSkillLevel: true,
        householdSize: true,
        preferredCategories: true
      }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const preferences: UserCategoryPreferences = {
      dietaryPreferences: user.dietaryPreferences,
      favoriteCuisines: user.favoriteCuisines,
      cookingSkillLevel: user.cookingSkillLevel,
      householdSize: user.householdSize,
      existingCategories: user.preferredCategories
    };

    return this.generateCategorySuggestions(userId, preferences);
  }

  /**
   * Apply category selections from onboarding
   */
  static async applyOnboardingSelections(
    userId: string,
    selectedCategories: string[]
  ): Promise<CategoryInitializationResult> {
    // Get user preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        dietaryPreferences: true,
        favoriteCuisines: true,
        cookingSkillLevel: true,
        householdSize: true,
        preferredCategories: true
      }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const preferences: UserCategoryPreferences = {
      dietaryPreferences: user.dietaryPreferences,
      favoriteCuisines: user.favoriteCuisines,
      cookingSkillLevel: user.cookingSkillLevel,
      householdSize: user.householdSize,
      existingCategories: user.preferredCategories
    };

    return this.initializeUserCategories(userId, selectedCategories, preferences);
  }
} 