import { z } from 'zod';
import { PrismaClient } from '@/generated/prisma';
import { PREDEFINED_CATEGORIES } from '@/lib/constants/categories';

// Reserved category names that cannot be used
const RESERVED_CATEGORY_NAMES = [
  'all', 'none', 'undefined', 'null', 'uncategorized',
  'admin', 'system', 'default', 'temp', 'temporary'
];

// Validation schemas
export const categoryNameSchema = z
  .string()
  .min(1, 'Category name cannot be empty')
  .max(50, 'Category name cannot exceed 50 characters')
  .regex(
    /^[a-zA-Z0-9\s\-&'().,]+$/,
    'Category name can only contain letters, numbers, spaces, hyphens, ampersands, apostrophes, parentheses, commas, and periods'
  )
  .transform(name => name.trim())
  .refine(name => name.length > 0, 'Category name cannot be only whitespace')
  .refine(
    name => !RESERVED_CATEGORY_NAMES.includes(name.toLowerCase()),
    name => ({
      message: `"${name}" is a reserved category name and cannot be used`,
    })
  );

export const categoryOperationSchema = z.object({
  categoryName: categoryNameSchema,
  userId: z.string().min(1, 'User ID is required'),
});

export const renameCategorySchema = z.object({
  oldName: categoryNameSchema,
  newName: categoryNameSchema,
  userId: z.string().min(1, 'User ID is required'),
});

export const mergeCategoriesSchema = z.object({
  sourceCategories: z
    .array(categoryNameSchema)
    .min(1, 'At least one source category is required')
    .max(10, 'Cannot merge more than 10 categories at once'),
  targetCategory: categoryNameSchema,
  userId: z.string().min(1, 'User ID is required'),
});

export const deleteCategorySchema = z.object({
  categoryName: categoryNameSchema,
  moveToCategory: categoryNameSchema.optional(),
  forceDelete: z.boolean().default(false),
  userId: z.string().min(1, 'User ID is required'),
});

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedValue?: string;
  suggestedAlternatives?: string[];
}

export interface CategoryValidationContext {
  userId: string;
  operation: 'create' | 'rename' | 'merge' | 'delete';
  existingCategories?: string[];
  skipDuplicateCheck?: boolean;
}

export class CategoryValidator {
  private prisma: PrismaClient;
  private fallbackCategory = 'Uncategorized';

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Comprehensive category name validation
   */
  async validateCategoryName(
    categoryName: string, 
    context: CategoryValidationContext
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestedAlternatives: []
    };

    try {
      // Basic schema validation
      const parsed = categoryNameSchema.parse(categoryName);
      result.sanitizedValue = parsed;

      // Check for reserved names
      if (RESERVED_CATEGORY_NAMES.includes(parsed.toLowerCase())) {
        result.errors.push(`"${parsed}" is a reserved category name and cannot be used`);
        result.suggestedAlternatives = this.generateAlternativeNames(parsed);
      }

      // Check for duplicates (unless explicitly skipped)
      if (!context.skipDuplicateCheck) {
        const isDuplicate = await this.checkDuplicate(parsed, context.userId);
        if (isDuplicate && context.operation === 'create') {
          result.errors.push(`Category "${parsed}" already exists`);
          result.suggestedAlternatives = this.generateAlternativeNames(parsed);
        }
      }

      // Check for confusing similarity to existing categories
      const similarCategories = await this.findSimilarCategories(parsed, context.userId);
      if (similarCategories.length > 0) {
        result.warnings.push(
          `Category "${parsed}" is similar to existing categories: ${similarCategories.join(', ')}`
        );
        result.suggestedAlternatives = [...(result.suggestedAlternatives || []), ...similarCategories];
      }

      // Additional validation for specific operations
      if (context.operation === 'rename') {
        const hasRecipes = await this.categoryHasRecipes(categoryName, context.userId);
        if (!hasRecipes) {
          result.warnings.push(`Category "${categoryName}" has no recipes`);
        }
      }

      result.isValid = result.errors.length === 0;

    } catch (error) {
      if (error instanceof z.ZodError) {
        result.errors = error.errors.map(e => e.message);
      } else {
        result.errors.push('Unknown validation error occurred');
      }
      result.isValid = false;
    }

    return result;
  }

  /**
   * Validate rename operation
   */
  async validateRename(
    oldName: string, 
    newName: string, 
    userId: string
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      // Validate the rename schema
      renameCategorySchema.parse({ oldName, newName, userId });

      // Check if old category exists and has recipes
      const oldCategoryExists = await this.categoryHasRecipes(oldName, userId);
      if (!oldCategoryExists) {
        result.errors.push(`Source category "${oldName}" does not exist or has no recipes`);
      }

      // Validate new name
      const newNameValidation = await this.validateCategoryName(newName, {
        userId,
        operation: 'create',
        skipDuplicateCheck: false
      });

      result.errors.push(...newNameValidation.errors);
      result.warnings.push(...newNameValidation.warnings);
      result.sanitizedValue = newNameValidation.sanitizedValue;
      result.suggestedAlternatives = newNameValidation.suggestedAlternatives;

      result.isValid = result.errors.length === 0;

    } catch (error) {
      if (error instanceof z.ZodError) {
        result.errors = error.errors.map(e => e.message);
      } else {
        result.errors.push('Rename validation failed');
      }
      result.isValid = false;
    }

    return result;
  }

  /**
   * Validate merge operation
   */
  async validateMerge(
    sourceCategories: string[], 
    targetCategory: string, 
    userId: string
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      // Validate the merge schema
      mergeCategoriesSchema.parse({ sourceCategories, targetCategory, userId });

      // Check if source categories exist and have recipes
      for (const sourceCategory of sourceCategories) {
        const hasRecipes = await this.categoryHasRecipes(sourceCategory, userId);
        if (!hasRecipes) {
          result.errors.push(`Source category "${sourceCategory}" does not exist or has no recipes`);
        }
      }

      // Ensure target is not in source list
      if (sourceCategories.includes(targetCategory)) {
        result.errors.push('Target category cannot be the same as a source category');
      }

      // Validate target category name
      const targetValidation = await this.validateCategoryName(targetCategory, {
        userId,
        operation: 'create',
        skipDuplicateCheck: true // Target can exist for merge
      });

      if (!targetValidation.isValid) {
        result.errors.push(`Target category validation failed: ${targetValidation.errors.join(', ')}`);
      }

      result.warnings.push(...targetValidation.warnings);
      result.isValid = result.errors.length === 0;

    } catch (error) {
      if (error instanceof z.ZodError) {
        result.errors = error.errors.map(e => e.message);
      } else {
        result.errors.push('Merge validation failed');
      }
      result.isValid = false;
    }

    return result;
  }

  /**
   * Validate delete operation
   */
  async validateDelete(
    categoryName: string, 
    moveToCategory: string | undefined, 
    forceDelete: boolean, 
    userId: string
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      // Validate the delete schema
      deleteCategorySchema.parse({ 
        categoryName, 
        moveToCategory, 
        forceDelete, 
        userId 
      });

      // Check if category exists and has recipes
      const recipeCount = await this.getCategoryRecipeCount(categoryName, userId);
      if (recipeCount === 0) {
        result.warnings.push(`Category "${categoryName}" has no recipes`);
        return result; // Safe to delete empty category
      }

      // If has recipes but no migration plan
      if (recipeCount > 0 && !moveToCategory && !forceDelete) {
        result.errors.push(
          `Category "${categoryName}" contains ${recipeCount} recipes. ` +
          'Either specify a target category to move recipes or enable force delete.'
        );
      }

      // Validate move target if specified
      if (moveToCategory) {
        if (moveToCategory === categoryName) {
          result.errors.push('Cannot move recipes to the same category being deleted');
        }

        const targetValidation = await this.validateCategoryName(moveToCategory, {
          userId,
          operation: 'create',
          skipDuplicateCheck: true
        });

        if (!targetValidation.isValid) {
          result.errors.push(`Move target validation failed: ${targetValidation.errors.join(', ')}`);
        }
      }

      // Warn about force delete
      if (forceDelete && recipeCount > 0) {
        result.warnings.push(
          `⚠️ Force delete will permanently remove ${recipeCount} recipes. This cannot be undone!`
        );
      }

      result.isValid = result.errors.length === 0;

    } catch (error) {
      if (error instanceof z.ZodError) {
        result.errors = error.errors.map(e => e.message);
      } else {
        result.errors.push('Delete validation failed');
      }
      result.isValid = false;
    }

    return result;
  }

  /**
   * Get fallback category name for failed operations
   */
  getFallbackCategory(): string {
    return this.fallbackCategory;
  }

  /**
   * Generate alternative category names
   */
  private generateAlternativeNames(baseName: string): string[] {
    const alternatives = [
      `${baseName} Recipes`,
      `My ${baseName}`,
      `${baseName} Collection`,
      `${baseName}s`,
      `Custom ${baseName}`
    ];

    // Add predefined category suggestions if similar
    const similarPredefined = PREDEFINED_CATEGORIES
      .filter(cat => cat.toLowerCase().includes(baseName.toLowerCase()) || 
                     baseName.toLowerCase().includes(cat.toLowerCase()))
      .slice(0, 3);

    return [...alternatives, ...similarPredefined].slice(0, 5);
  }

  /**
   * Check if category name is duplicate
   */
  private async checkDuplicate(categoryName: string, userId: string): Promise<boolean> {
    const existingRecipe = await this.prisma.recipe.findFirst({
      where: {
        userId,
        category: {
          equals: categoryName,
          mode: 'insensitive' // Case-insensitive check
        }
      }
    });

    return existingRecipe !== null;
  }

  /**
   * Find categories with similar names
   */
  private async findSimilarCategories(categoryName: string, userId: string): Promise<string[]> {
    // Get all user categories
    const userCategories = await this.prisma.recipe.groupBy({
      by: ['category'],
      where: { userId },
      _count: { id: true }
    });

    const similarities = userCategories
      .map(cat => ({
        name: cat.category,
        similarity: this.calculateSimilarity(categoryName.toLowerCase(), cat.category.toLowerCase())
      }))
      .filter(cat => cat.similarity > 0.6 && cat.name.toLowerCase() !== categoryName.toLowerCase())
      .sort((a, b) => b.similarity - a.similarity)
      .map(cat => cat.name)
      .slice(0, 3);

    return similarities;
  }

  /**
   * Calculate string similarity (simple Levenshtein-based)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Check if category has recipes
   */
  private async categoryHasRecipes(categoryName: string, userId: string): Promise<boolean> {
    const count = await this.getCategoryRecipeCount(categoryName, userId);
    return count > 0;
  }

  /**
   * Get recipe count for category
   */
  private async getCategoryRecipeCount(categoryName: string, userId: string): Promise<number> {
    return await this.prisma.recipe.count({
      where: {
        userId,
        category: categoryName
      }
    });
  }
} 