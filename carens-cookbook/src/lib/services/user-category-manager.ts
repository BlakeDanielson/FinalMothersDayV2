// User Category Manager Service
// Handles CRUD operations for user-specific categories with validation and error handling

import { prisma } from '@/lib/db';
import { PREDEFINED_CATEGORIES, CATEGORY_METADATA } from '@/lib/constants/categories';
import type { User } from '@/generated/prisma';

export interface CategoryOperationResult {
  success: boolean;
  message: string;
  categories?: string[];
  error?: string;
}

export interface CategoryValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CategoryBackup {
  userId: string;
  categories: string[];
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export class UserCategoryManager {
  /**
   * Get all categories for a user
   */
  static async getUserCategories(userId: string): Promise<string[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferredCategories: true }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    return user.preferredCategories || [];
  }

  /**
   * Add a category to user's preferences
   */
  static async addCategory(
    userId: string, 
    categoryName: string
  ): Promise<CategoryOperationResult> {
    try {
      // Validate category name
      const validation = this.validateCategoryName(categoryName);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Invalid category name',
          error: validation.errors.join(', ')
        };
      }

      // Get current categories
      const currentCategories = await this.getUserCategories(userId);

      // Check for duplicates
      if (currentCategories.includes(categoryName)) {
        return {
          success: false,
          message: 'Category already exists',
          error: `Category "${categoryName}" is already in your list`
        };
      }

      // Add category
      const updatedCategories = [...currentCategories, categoryName];
      
      await prisma.user.update({
        where: { id: userId },
        data: { preferredCategories: updatedCategories }
      });

      return {
        success: true,
        message: `Category "${categoryName}" added successfully`,
        categories: updatedCategories
      };

    } catch (error) {
      console.error('Error adding category:', error);
      return {
        success: false,
        message: 'Failed to add category',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Remove a category from user's preferences
   */
  static async removeCategory(
    userId: string, 
    categoryName: string
  ): Promise<CategoryOperationResult> {
    try {
      // Get current categories
      const currentCategories = await this.getUserCategories(userId);

      // Check if category exists
      if (!currentCategories.includes(categoryName)) {
        return {
          success: false,
          message: 'Category not found',
          error: `Category "${categoryName}" is not in your list`
        };
      }

      // Ensure user has at least one category after removal
      if (currentCategories.length <= 1) {
        return {
          success: false,
          message: 'Cannot remove last category',
          error: 'You must have at least one category'
        };
      }

      // Check if category has recipes
      const recipeCount = await prisma.recipe.count({
        where: {
          userId,
          category: categoryName
        }
      });

      if (recipeCount > 0) {
        return {
          success: false,
          message: 'Category has recipes',
          error: `Cannot remove "${categoryName}" because it contains ${recipeCount} recipe(s). Please move or delete the recipes first.`
        };
      }

      // Remove category
      const updatedCategories = currentCategories.filter(cat => cat !== categoryName);
      
      await prisma.user.update({
        where: { id: userId },
        data: { preferredCategories: updatedCategories }
      });

      return {
        success: true,
        message: `Category "${categoryName}" removed successfully`,
        categories: updatedCategories
      };

    } catch (error) {
      console.error('Error removing category:', error);
      return {
        success: false,
        message: 'Failed to remove category',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Update/rename a category
   */
  static async updateCategory(
    userId: string, 
    oldName: string, 
    newName: string
  ): Promise<CategoryOperationResult> {
    try {
      // Validate new category name
      const validation = this.validateCategoryName(newName);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Invalid new category name',
          error: validation.errors.join(', ')
        };
      }

      // Get current categories
      const currentCategories = await this.getUserCategories(userId);

      // Check if old category exists
      if (!currentCategories.includes(oldName)) {
        return {
          success: false,
          message: 'Category not found',
          error: `Category "${oldName}" is not in your list`
        };
      }

      // Check if new name already exists (and is different from old name)
      if (newName !== oldName && currentCategories.includes(newName)) {
        return {
          success: false,
          message: 'Category name already exists',
          error: `Category "${newName}" already exists`
        };
      }

      // Update category in user preferences
      const updatedCategories = currentCategories.map(cat => 
        cat === oldName ? newName : cat
      );

      // Update in database transaction
      await prisma.$transaction(async (tx) => {
        // Update user preferences
        await tx.user.update({
          where: { id: userId },
          data: { preferredCategories: updatedCategories }
        });

        // Update all recipes with this category
        await tx.recipe.updateMany({
          where: {
            userId,
            category: oldName
          },
          data: {
            category: newName
          }
        });
      });

      return {
        success: true,
        message: `Category renamed from "${oldName}" to "${newName}"`,
        categories: updatedCategories
      };

    } catch (error) {
      console.error('Error updating category:', error);
      return {
        success: false,
        message: 'Failed to update category',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Reorder user categories
   */
  static async reorderCategories(
    userId: string, 
    orderedCategories: string[]
  ): Promise<CategoryOperationResult> {
    try {
      // Get current categories
      const currentCategories = await this.getUserCategories(userId);

      // Validate that all current categories are included
      const missingCategories = currentCategories.filter(cat => 
        !orderedCategories.includes(cat)
      );
      
      const extraCategories = orderedCategories.filter(cat => 
        !currentCategories.includes(cat)
      );

      if (missingCategories.length > 0 || extraCategories.length > 0) {
        return {
          success: false,
          message: 'Invalid category list',
          error: `Category list mismatch. Missing: ${missingCategories.join(', ')}. Extra: ${extraCategories.join(', ')}`
        };
      }

      // Update order
      await prisma.user.update({
        where: { id: userId },
        data: { preferredCategories: orderedCategories }
      });

      return {
        success: true,
        message: 'Categories reordered successfully',
        categories: orderedCategories
      };

    } catch (error) {
      console.error('Error reordering categories:', error);
      return {
        success: false,
        message: 'Failed to reorder categories',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Bulk update categories
   */
  static async bulkUpdateCategories(
    userId: string, 
    categories: string[]
  ): Promise<CategoryOperationResult> {
    try {
      // Validate all category names
      const validationErrors: string[] = [];
      for (const category of categories) {
        const validation = this.validateCategoryName(category);
        if (!validation.isValid) {
          validationErrors.push(`"${category}": ${validation.errors.join(', ')}`);
        }
      }

      if (validationErrors.length > 0) {
        return {
          success: false,
          message: 'Invalid category names',
          error: validationErrors.join('; ')
        };
      }

      // Ensure at least one category
      if (categories.length === 0) {
        return {
          success: false,
          message: 'At least one category required',
          error: 'You must have at least one category'
        };
      }

      // Remove duplicates while preserving order
      const uniqueCategories = [...new Set(categories)];

      // Update categories
      await prisma.user.update({
        where: { id: userId },
        data: { preferredCategories: uniqueCategories }
      });

      return {
        success: true,
        message: `Successfully updated ${uniqueCategories.length} categories`,
        categories: uniqueCategories
      };

    } catch (error) {
      console.error('Error bulk updating categories:', error);
      return {
        success: false,
        message: 'Failed to update categories',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Create backup of user categories
   */
  static async createBackup(userId: string): Promise<CategoryBackup> {
    const categories = await this.getUserCategories(userId);
    
    return {
      userId,
      categories,
      timestamp: new Date(),
      metadata: {
        totalCategories: categories.length,
        predefinedCount: categories.filter(cat => 
          PREDEFINED_CATEGORIES.includes(cat as any)
        ).length
      }
    };
  }

  /**
   * Restore categories from backup
   */
  static async restoreFromBackup(
    userId: string, 
    backup: CategoryBackup
  ): Promise<CategoryOperationResult> {
    try {
      // Validate backup
      if (backup.userId !== userId) {
        return {
          success: false,
          message: 'Invalid backup',
          error: 'Backup does not belong to this user'
        };
      }

      if (!backup.categories || backup.categories.length === 0) {
        return {
          success: false,
          message: 'Invalid backup',
          error: 'Backup contains no categories'
        };
      }

      // Restore categories
      await prisma.user.update({
        where: { id: userId },
        data: { preferredCategories: backup.categories }
      });

      return {
        success: true,
        message: `Restored ${backup.categories.length} categories from backup`,
        categories: backup.categories
      };

    } catch (error) {
      console.error('Error restoring from backup:', error);
      return {
        success: false,
        message: 'Failed to restore from backup',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Repair incomplete category setup
   */
  static async repairCategorySetup(userId: string): Promise<CategoryOperationResult> {
    try {
      const currentCategories = await this.getUserCategories(userId);

      // If user has no categories, initialize with defaults
      if (currentCategories.length === 0) {
        const defaultCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
        
        await prisma.user.update({
          where: { id: userId },
          data: { preferredCategories: defaultCategories }
        });

        return {
          success: true,
          message: 'Repaired category setup with default categories',
          categories: defaultCategories
        };
      }

      return {
        success: true,
        message: 'Category setup is already valid',
        categories: currentCategories
      };

    } catch (error) {
      console.error('Error repairing category setup:', error);
      return {
        success: false,
        message: 'Failed to repair category setup',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Validate category name
   */
  private static validateCategoryName(name: string): CategoryValidationResult {
    const errors: string[] = [];

    if (!name || typeof name !== 'string') {
      errors.push('Category name is required');
      return { isValid: false, errors };
    }

    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      errors.push('Category name cannot be empty');
    }

    if (trimmedName.length < 1) {
      errors.push('Category name must be at least 1 character long');
    }

    if (trimmedName.length > 50) {
      errors.push('Category name must be 50 characters or less');
    }

    // Check for invalid characters (optional - you can customize this)
    const invalidChars = /[<>:"\/\\|?*]/;
    if (invalidChars.test(trimmedName)) {
      errors.push('Category name contains invalid characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get category statistics for a user
   */
  static async getCategoryStats(userId: string) {
    const categories = await this.getUserCategories(userId);
    
    // Get recipe counts per category
    const recipeCounts = await prisma.recipe.groupBy({
      by: ['category'],
      where: { userId },
      _count: { id: true }
    });

    const stats = categories.map(category => {
      const recipeCount = recipeCounts.find(rc => rc.category === category)?._count.id || 0;
      const isPredefined = PREDEFINED_CATEGORIES.includes(category as any);
      const metadata = CATEGORY_METADATA[category];

      return {
        name: category,
        recipeCount,
        isPredefined,
        hasMetadata: !!metadata,
        description: metadata?.description || null
      };
    });

    return {
      totalCategories: categories.length,
      predefinedCount: stats.filter(s => s.isPredefined).length,
      customCount: stats.filter(s => !s.isPredefined).length,
      totalRecipes: stats.reduce((sum, s) => sum + s.recipeCount, 0),
      categories: stats
    };
  }
} 