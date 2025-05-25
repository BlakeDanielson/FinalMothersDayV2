import Fuse from 'fuse.js';
import { distance } from 'fastest-levenshtein';
import { PrismaClient } from '../generated/prisma';
import { 
  PREDEFINED_CATEGORIES, 
  AI_SUGGESTED_CATEGORIES,
  CategoryUtils
} from './constants/categories';

export interface CategoryMatch {
  category: string;
  confidence: number;
  isExact: boolean;
  isFuzzy: boolean;
  isSemantic: boolean;
  originalCategory: string;
}

export interface CategoryAnalysis {
  bestMatch: CategoryMatch | null;
  shouldCreateNew: boolean;
  suggestions: CategoryMatch[];
  normalizedCategory: string;
}

export class CategoryService {
  private prisma: PrismaClient;
  private categoryCache = new Map<string, CategoryMatch>();
  private userCategoriesCache = new Map<string, string[]>();
  private readonly SIMILARITY_THRESHOLD = 0.8;
  private readonly FUZZY_THRESHOLD = 0.7;
  private readonly SEMANTIC_THRESHOLD = 0.6;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * Main method to find the best category match for a given category string
   */
  async findBestCategory(
    category: string, 
    userId?: string,
    options: {
      allowNewCategories?: boolean;
      preferUserCategories?: boolean;
      strictMatching?: boolean;
    } = {}
  ): Promise<CategoryAnalysis> {
    const normalizedInput = this.normalizeCategory(category);
    
    // Check cache first
    const cacheKey = `${normalizedInput}-${userId || 'global'}`;
    if (this.categoryCache.has(cacheKey)) {
      const cachedMatch = this.categoryCache.get(cacheKey)!;
      return {
        bestMatch: cachedMatch,
        shouldCreateNew: false,
        suggestions: [cachedMatch],
        normalizedCategory: cachedMatch.category
      };
    }

    // Get available categories
    const availableCategories = await this.getAvailableCategories(userId);
    
    // Try different matching strategies
    const matches: CategoryMatch[] = [];

    // 1. Exact match (highest priority)
    const exactMatch = this.findExactMatch(normalizedInput, availableCategories);
    if (exactMatch) {
      matches.push(exactMatch);
    }

    // 2. Fuzzy matching for similar strings
    const fuzzyMatches = this.findFuzzyMatches(normalizedInput, availableCategories);
    matches.push(...fuzzyMatches);

    // 3. Semantic matching for related concepts
    const semanticMatches = this.findSemanticMatches(normalizedInput, availableCategories);
    matches.push(...semanticMatches);

    // Sort by confidence
    matches.sort((a, b) => b.confidence - a.confidence);

    const bestMatch = matches[0] || null;
    const shouldCreateNew = !bestMatch && (options.allowNewCategories !== false);

    // Cache the result
    if (bestMatch) {
      this.categoryCache.set(cacheKey, bestMatch);
    }

    return {
      bestMatch,
      shouldCreateNew,
      suggestions: matches.slice(0, 5), // Top 5 suggestions
      normalizedCategory: bestMatch?.category || this.normalizeCategory(category)
    };
  }

  /**
   * Get all categories available for matching (predefined + user categories)
   */
  private async getAvailableCategories(userId?: string): Promise<string[]> {
    const categories = new Set<string>();

    // Always include predefined categories
    PREDEFINED_CATEGORIES.forEach(cat => categories.add(cat));

    // Add user-specific categories if userId provided
    if (userId) {
      const userCategories = await this.getUserCategories(userId);
      userCategories.forEach(cat => categories.add(cat));
    }

    return Array.from(categories);
  }

  /**
   * Get categories that a specific user has used
   */
  async getUserCategories(userId: string): Promise<string[]> {
    if (this.userCategoriesCache.has(userId)) {
      return this.userCategoriesCache.get(userId)!;
    }

    try {
      const userCategories = await this.prisma.recipe.findMany({
        where: { userId },
        select: { category: true },
        distinct: ['category']
      });

      const categories = userCategories.map(r => r.category).filter(Boolean);
      this.userCategoriesCache.set(userId, categories);
      return categories;
    } catch (error) {
      console.error('Error fetching user categories:', error);
      return [];
    }
  }

  /**
   * Find exact matches (case-insensitive)
   */
  private findExactMatch(normalizedCategory: string, availableCategories: string[]): CategoryMatch | null {
    const exactMatch = availableCategories.find(
      cat => this.normalizeCategory(cat) === normalizedCategory
    );

    if (exactMatch) {
      return {
        category: exactMatch,
        confidence: 1.0,
        isExact: true,
        isFuzzy: false,
        isSemantic: false,
        originalCategory: normalizedCategory
      };
    }

    return null;
  }

  /**
   * Find fuzzy matches using Levenshtein distance and Fuse.js
   */
  private findFuzzyMatches(normalizedCategory: string, availableCategories: string[]): CategoryMatch[] {
    const matches: CategoryMatch[] = [];

    // Levenshtein distance matching
    for (const category of availableCategories) {
      const normalizedAvailable = this.normalizeCategory(category);
      const maxLength = Math.max(normalizedCategory.length, normalizedAvailable.length);
      const similarity = 1 - (distance(normalizedCategory, normalizedAvailable) / maxLength);

      if (similarity >= this.FUZZY_THRESHOLD) {
        matches.push({
          category,
          confidence: similarity,
          isExact: false,
          isFuzzy: true,
          isSemantic: false,
          originalCategory: normalizedCategory
        });
      }
    }

    // Fuse.js fuzzy search
    const fuse = new Fuse(availableCategories, {
      threshold: 1 - this.FUZZY_THRESHOLD, // Fuse uses different scale
      includeScore: true,
      keys: ['']
    });

    const fuseResults = fuse.search(normalizedCategory);
    for (const result of fuseResults) {
      const confidence = 1 - (result.score || 1);
      if (confidence >= this.FUZZY_THRESHOLD) {
        // Avoid duplicates
        const existing = matches.find(m => m.category === result.item);
        if (!existing) {
          matches.push({
            category: result.item,
            confidence,
            isExact: false,
            isFuzzy: true,
            isSemantic: false,
            originalCategory: normalizedCategory
          });
        }
      }
    }

    return matches;
  }

  /**
   * Find semantic matches based on food-related concepts
   */
  private findSemanticMatches(normalizedCategory: string, availableCategories: string[]): CategoryMatch[] {
    const matches: CategoryMatch[] = [];
    const semanticMappings = this.getSemanticMappings();

    // Check if input category has semantic equivalents
    const inputSynonyms = semanticMappings.get(normalizedCategory) || [];
    
    for (const category of availableCategories) {
      const normalizedAvailable = this.normalizeCategory(category);
      const availableSynonyms = semanticMappings.get(normalizedAvailable) || [];

      // Check if categories are semantically related
      let confidence = 0;

      // Direct synonym match
      if (inputSynonyms.includes(normalizedAvailable) || availableSynonyms.includes(normalizedCategory)) {
        confidence = 0.9;
      }
      // Shared synonyms
      else {
        const sharedSynonyms = inputSynonyms.filter(syn => availableSynonyms.includes(syn));
        if (sharedSynonyms.length > 0) {
          confidence = 0.7;
        }
      }

      if (confidence >= this.SEMANTIC_THRESHOLD) {
        matches.push({
          category,
          confidence,
          isExact: false,
          isFuzzy: false,
          isSemantic: true,
          originalCategory: normalizedCategory
        });
      }
    }

    return matches;
  }

  /**
   * Get semantic mappings for food categories
   */
  private getSemanticMappings(): Map<string, string[]> {
    return new Map([
      ['main course', ['beef', 'chicken', 'pork', 'lamb', 'seafood', 'pasta']],
      ['main courses', ['beef', 'chicken', 'pork', 'lamb', 'seafood', 'pasta']],
      ['entree', ['beef', 'chicken', 'pork', 'lamb', 'seafood', 'pasta']],
      ['entrees', ['beef', 'chicken', 'pork', 'lamb', 'seafood', 'pasta']],
      ['meat', ['beef', 'chicken', 'pork', 'lamb']],
      ['protein', ['beef', 'chicken', 'pork', 'lamb', 'seafood']],
      ['vegetables', ['vegetable', 'salad', 'side dish']],
      ['veggies', ['vegetable', 'salad', 'side dish']],
      ['veggie', ['vegetable', 'salad', 'side dish']],
      ['bread', ['breakfast', 'side dish']],
      ['baked goods', ['dessert', 'breakfast', 'bread']],
      ['sweets', ['dessert']],
      ['beverages', ['drinks', 'beverage']],
      ['beverage', ['drinks']],
      ['drinks', ['beverage']],
      ['condiments', ['sauce', 'sauces & seasoning']],
      ['seasoning', ['sauces & seasoning', 'sauce']],
      ['seasonings', ['sauces & seasoning', 'sauce']],
      ['sides', ['side dish', 'vegetable']],
      ['starter', ['appetizer']],
      ['starters', ['appetizer']],
      ['apps', ['appetizer']],
      ['fish', ['seafood']],
      ['shellfish', ['seafood']],
      ['poultry', ['chicken']],
      ['noodles', ['pasta']],
      ['spaghetti', ['pasta']],
      ['macaroni', ['pasta']],
    ]);
  }

  /**
   * Normalize category string for consistent comparison
   */
  private normalizeCategory(category: string): string {
    return CategoryUtils.normalize(category);
  }

  /**
   * Merge similar categories and return mapping
   */
  async mergeSimilarCategories(userId?: string): Promise<Map<string, string>> {
    const userCategories = userId ? await this.getUserCategories(userId) : [];
    const allCategories = [...new Set([...PREDEFINED_CATEGORIES, ...userCategories])];
    
    const mergeMap = new Map<string, string>();
    const processed = new Set<string>();

    for (const category of allCategories) {
      if (processed.has(category)) continue;

      const analysis = await this.findBestCategory(category, userId, { 
        allowNewCategories: false,
        strictMatching: true 
      });

      if (analysis.bestMatch && analysis.bestMatch.category !== category) {
        mergeMap.set(category, analysis.bestMatch.category);
        processed.add(category);
        processed.add(analysis.bestMatch.category);
      }
    }

    return mergeMap;
  }

  /**
   * Get categories that should be displayed in the UI for a user
   */
  async getDisplayCategories(userId?: string): Promise<string[]> {
    if (!userId) {
      // New user - show predefined categories
      return [...PREDEFINED_CATEGORIES];
    }

    // Existing user - show categories they have recipes in
    const userCategories = await this.getUserCategories(userId);
    
    if (userCategories.length === 0) {
      // User has no recipes yet - show predefined categories
      return [...PREDEFINED_CATEGORIES];
    }

    // Return unique categories, prioritizing predefined ones
    const displayCategories = new Set<string>();
    
    // Add predefined categories that have recipes
    for (const predefined of PREDEFINED_CATEGORIES) {
      if (userCategories.includes(predefined)) {
        displayCategories.add(predefined);
      }
    }

    // Add user-specific categories
    for (const userCat of userCategories) {
      if (!CategoryUtils.isPredefined(userCat)) {
        displayCategories.add(userCat);
      }
    }

    return Array.from(displayCategories).sort();
  }

  /**
   * Clear caches (useful for testing or when data changes)
   */
  clearCache(): void {
    this.categoryCache.clear();
    this.userCategoriesCache.clear();
  }

  /**
   * Get AI prompt with user's existing categories
   */
  async getAIPromptCategories(userId?: string): Promise<string[]> {
    if (!userId) {
      return [...AI_SUGGESTED_CATEGORIES];
    }

    const userCategories = await this.getUserCategories(userId);
    const combinedCategories = new Set([...AI_SUGGESTED_CATEGORIES, ...userCategories]);
    
    return Array.from(combinedCategories).sort();
  }
}

/**
 * CategoryResolver class for dynamic category resolution logic
 */
export class CategoryResolver {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * Get categories that should be visible in the UI for a specific user
   */
  async getVisibleCategories(userId: string): Promise<string[]> {
    try {
      // Get user's recipe categories
      const userRecipeCategories = await this.getUserCategories(userId);
      
      if (userRecipeCategories.length === 0) {
        // New user - show all predefined categories
        return [...PREDEFINED_CATEGORIES];
      }

      // Existing user - show categories they have recipes in
      const visibleCategories = new Set<string>();

      // Add predefined categories that have recipes
      for (const predefined of PREDEFINED_CATEGORIES) {
        if (userRecipeCategories.includes(predefined)) {
          visibleCategories.add(predefined);
        }
      }

      // Add user-specific categories that aren't predefined
      for (const userCategory of userRecipeCategories) {
        if (!CategoryUtils.isPredefined(userCategory)) {
          visibleCategories.add(userCategory);
        }
      }

      return Array.from(visibleCategories).sort();
    } catch (error) {
      console.error('Error getting visible categories:', error);
      return this.getDefaultCategories();
    }
  }

  /**
   * Get default categories (predefined categories)
   */
  getDefaultCategories(): string[] {
    return [...PREDEFINED_CATEGORIES];
  }

  /**
   * Get categories that a specific user has recipes in
   */
  async getUserCategories(userId: string): Promise<string[]> {
    try {
      const userCategories = await this.prisma.recipe.findMany({
        where: { userId },
        select: { category: true },
        distinct: ['category']
      });

      return userCategories
        .map(r => r.category)
        .filter(Boolean)
        .sort();
    } catch (error) {
      console.error('Error fetching user categories:', error);
      return [];
    }
  }

  /**
   * Get categories for AI prompt generation
   */
  async getAIPromptCategories(userId?: string): Promise<string[]> {
    if (!userId) {
      return [...AI_SUGGESTED_CATEGORIES];
    }

    try {
      const userCategories = await this.getUserCategories(userId);
      const combinedCategories = new Set([
        ...AI_SUGGESTED_CATEGORIES,
        ...userCategories
      ]);
      
      return Array.from(combinedCategories).sort();
    } catch (error) {
      console.error('Error getting AI prompt categories:', error);
      return [...AI_SUGGESTED_CATEGORIES];
    }
  }

  /**
   * Check if a user has any recipes
   */
  async hasRecipes(userId: string): Promise<boolean> {
    try {
      const count = await this.prisma.recipe.count({
        where: { userId }
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking if user has recipes:', error);
      return false;
    }
  }

  /**
   * Get category statistics for a user
   */
  async getCategoryStats(userId: string): Promise<Array<{category: string, count: number}>> {
    try {
      const stats = await this.prisma.recipe.groupBy({
        by: ['category'],
        where: { userId },
        _count: {
          category: true
        }
      });

      return stats.map(stat => ({
        category: stat.category,
        count: stat._count.category
      })).sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error('Error getting category stats:', error);
      return [];
    }
  }
}

// Export singleton instances
export const categoryService = new CategoryService();
export const categoryResolver = new CategoryResolver(); 