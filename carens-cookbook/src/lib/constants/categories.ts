// Centralized category definitions for the recipe application

/**
 * Predefined categories that are always available in the UI
 * These represent the core recipe categories that users expect to see
 */
export const PREDEFINED_CATEGORIES = [
  "Appetizer",
  "Beef", 
  "Beverage",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Drinks",
  "Lamb",
  "Pasta", 
  "Pork",
  "Salad",
  "Sauce",
  "Seafood",
  "Side Dish",
  "Sauces & Seasoning",
  "Soup",
  "Thanksgiving",
  "Vegetable"
] as const;

/**
 * Categories that the AI should suggest when analyzing recipes
 * These are aligned with the predefined categories but optimized for AI recognition
 */
export const AI_SUGGESTED_CATEGORIES = [
  "Appetizer",
  "Beef",
  "Breakfast", 
  "Chicken",
  "Dessert",
  "Drinks",
  "Lamb",
  "Pasta",
  "Pork", 
  "Salad",
  "Sauces & Seasoning",
  "Seafood",
  "Side Dish",
  "Soup",
  "Thanksgiving",
  "Vegetable"
] as const;

/**
 * Type definitions for categories
 */
export type PredefinedCategory = typeof PREDEFINED_CATEGORIES[number];
export type AISuggestedCategory = typeof AI_SUGGESTED_CATEGORIES[number];
export type CategoryType = PredefinedCategory | string; // Allow custom categories

/**
 * Category display configuration
 */
export interface CategoryDisplayConfig {
  showPredefinedOnly: boolean;
  showUserCategories: boolean;
  hideEmptyCategories: boolean;
  sortAlphabetically: boolean;
}

/**
 * Default category display configuration
 */
export const DEFAULT_CATEGORY_CONFIG: CategoryDisplayConfig = {
  showPredefinedOnly: false,
  showUserCategories: true, 
  hideEmptyCategories: true,
  sortAlphabetically: true
};

/**
 * Category metadata for enhanced functionality
 */
export interface CategoryMetadata {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  aliases?: string[];
  isCore?: boolean;
}

/**
 * Enhanced category definitions with metadata
 */
export const CATEGORY_METADATA: Record<string, CategoryMetadata> = {
  "Appetizer": {
    name: "Appetizer",
    description: "Small dishes served before the main course",
    aliases: ["starter", "starters", "apps", "hors d'oeuvres"],
    isCore: true
  },
  "Beef": {
    name: "Beef", 
    description: "Recipes featuring beef as the main protein",
    aliases: ["beef dishes", "steak", "ground beef", "meat"],
    isCore: true
  },
  "Beverage": {
    name: "Beverage",
    description: "Drinks and liquid refreshments",
    aliases: ["drinks", "beverages", "cocktails", "smoothies"],
    isCore: true
  },
  "Breakfast": {
    name: "Breakfast",
    description: "Morning meal recipes",
    aliases: ["morning", "brunch", "breakfast dishes"],
    isCore: true
  },
  "Chicken": {
    name: "Chicken",
    description: "Recipes featuring chicken as the main protein", 
    aliases: ["poultry", "chicken dishes"],
    isCore: true
  },
  "Dessert": {
    name: "Dessert",
    description: "Sweet treats and after-meal dishes",
    aliases: ["sweets", "desserts", "sweet treats", "baked goods"],
    isCore: true
  },
  "Drinks": {
    name: "Drinks",
    description: "Beverages and liquid refreshments",
    aliases: ["beverages", "cocktails", "smoothies", "juices"],
    isCore: true
  },
  "Lamb": {
    name: "Lamb",
    description: "Recipes featuring lamb as the main protein",
    aliases: ["lamb dishes"],
    isCore: true
  },
  "Pasta": {
    name: "Pasta",
    description: "Noodle-based dishes and recipes",
    aliases: ["noodles", "spaghetti", "macaroni", "pasta dishes"],
    isCore: true
  },
  "Pork": {
    name: "Pork", 
    description: "Recipes featuring pork as the main protein",
    aliases: ["pork dishes", "bacon", "ham"],
    isCore: true
  },
  "Salad": {
    name: "Salad",
    description: "Fresh vegetable-based dishes",
    aliases: ["salads", "greens", "fresh dishes"],
    isCore: true
  },
  "Sauce": {
    name: "Sauce",
    description: "Condiments and flavor enhancers",
    aliases: ["sauces", "condiments", "dressings"],
    isCore: true
  },
  "Seafood": {
    name: "Seafood",
    description: "Fish and shellfish recipes",
    aliases: ["fish", "shellfish", "seafood dishes"],
    isCore: true
  },
  "Side Dish": {
    name: "Side Dish",
    description: "Accompaniments to main courses",
    aliases: ["sides", "side dishes", "accompaniments"],
    isCore: true
  },
  "Sauces & Seasoning": {
    name: "Sauces & Seasoning",
    description: "Flavor enhancers and condiments",
    aliases: ["seasonings", "spices", "condiments", "sauces"],
    isCore: true
  },
  "Soup": {
    name: "Soup",
    description: "Liquid-based dishes and broths",
    aliases: ["soups", "broths", "stews"],
    isCore: true
  },
  "Thanksgiving": {
    name: "Thanksgiving",
    description: "Holiday-specific recipes",
    aliases: ["holiday", "thanksgiving dishes"],
    isCore: true
  },
  "Vegetable": {
    name: "Vegetable",
    description: "Plant-based dishes and sides",
    aliases: ["vegetables", "veggies", "veggie", "plant-based"],
    isCore: true
  }
};

/**
 * Mapping of dietary preferences to relevant categories
 */
export const DIETARY_CATEGORY_MAPPING: Record<string, string[]> = {
  VEGETARIAN: ['Vegetable', 'Pasta', 'Salad', 'Soup'],
  VEGAN: ['Vegetable', 'Salad', 'Soup'],
  GLUTEN_FREE: ['Salad', 'Seafood', 'Chicken', 'Beef'],
  DAIRY_FREE: ['Seafood', 'Chicken', 'Beef', 'Vegetable'],
  KETO: ['Seafood', 'Chicken', 'Beef', 'Sauce'],
  PALEO: ['Seafood', 'Chicken', 'Beef', 'Vegetable'],
  LOW_CARB: ['Seafood', 'Chicken', 'Beef', 'Salad'],
  LOW_SODIUM: ['Vegetable', 'Salad', 'Seafood'],
  NUT_FREE: ['Chicken', 'Beef', 'Seafood', 'Vegetable'],
  KOSHER: ['Chicken', 'Beef', 'Seafood', 'Vegetable'],
  HALAL: ['Chicken', 'Beef', 'Seafood', 'Vegetable']
};

/**
 * Mapping of cuisines to relevant categories
 */
export const CUISINE_CATEGORY_MAPPING: Record<string, string[]> = {
  Italian: ['Pasta', 'Sauce', 'Appetizer'],
  Mexican: ['Chicken', 'Beef', 'Sauce'],
  Asian: ['Seafood', 'Chicken', 'Vegetable'],
  American: ['Beef', 'Chicken', 'Side Dish'],
  Mediterranean: ['Seafood', 'Vegetable', 'Salad'],
  Indian: ['Chicken', 'Vegetable', 'Sauce'],
  French: ['Sauce', 'Seafood', 'Dessert'],
  Chinese: ['Chicken', 'Seafood', 'Vegetable'],
  Japanese: ['Seafood', 'Soup', 'Vegetable'],
  Thai: ['Chicken', 'Seafood', 'Soup'],
  Greek: ['Seafood', 'Salad', 'Vegetable'],
  Spanish: ['Seafood', 'Chicken', 'Appetizer']
};

/**
 * Utility functions for category management
 */
export const CategoryUtils = {
  /**
   * Check if a category is predefined
   */
  isPredefined: (category: string): category is PredefinedCategory => {
    return PREDEFINED_CATEGORIES.includes(category as PredefinedCategory);
  },

  /**
   * Get category metadata
   */
  getMetadata: (category: string): CategoryMetadata | undefined => {
    return CATEGORY_METADATA[category];
  },

  /**
   * Get all aliases for a category
   */
  getAliases: (category: string): string[] => {
    return CATEGORY_METADATA[category]?.aliases || [];
  },

  /**
   * Find category by alias
   */
  findByAlias: (alias: string): string | undefined => {
    const normalizedAlias = alias.toLowerCase().trim();
    for (const [category, metadata] of Object.entries(CATEGORY_METADATA)) {
      if (metadata.aliases?.some(a => a.toLowerCase() === normalizedAlias)) {
        return category;
      }
    }
    return undefined;
  },

  /**
   * Get core categories only
   */
  getCoreCategories: (): string[] => {
    return Object.entries(CATEGORY_METADATA)
      .filter(([, metadata]) => metadata.isCore)
      .map(([category]) => category);
  },

  /**
   * Normalize category name for comparison
   */
  normalize: (category: string): string => {
    return category
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/s$/, ''); // Remove trailing 's'
  }
}; 