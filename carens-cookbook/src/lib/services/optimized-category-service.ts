import { PrismaClient } from '../../generated/prisma';
import { PREDEFINED_CATEGORIES } from '../constants/categories';
import { categoryCache } from './cache-service';

export interface CategoryWithCount {
  name: string;
  count: number;
}

export interface CategoryStats {
  totalCategories: number;
  totalRecipes: number;
  predefinedCount: number;
  customCount: number;
  categories: CategoryWithCount[];
}

/**
 * Optimized category service with efficient database queries and caching
 */
export class OptimizedCategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get user categories with counts - optimized with single query and caching
   */
  async getUserCategoriesWithCounts(userId: string): Promise<CategoryWithCount[]> {
    // Check cache first
    const cached = await categoryCache.getCategories(userId);
    if (cached) {
      return cached;
    }

    // Single optimized query using groupBy
    const userCategoriesWithCounts = await this.prisma.recipe.groupBy({
      by: ['category'],
      where: { 
        userId,
        category: {
          not: ''
        }
      },
      _count: {
        id: true
      },
      orderBy: { 
        _count: { 
          id: 'desc' 
        } 
      }
    });

    // Transform to CategoryWithCount format
    const categoriesWithCounts = userCategoriesWithCounts.map(item => ({
      name: item.category,
      count: item._count.id
    }));

    // If user has no recipes, return predefined categories with zero counts
    if (categoriesWithCounts.length === 0) {
      const defaultCategories = PREDEFINED_CATEGORIES.map(category => ({
        name: category,
        count: 0
      }));

      // Cache for 1 hour
      await categoryCache.setCategories(defaultCategories, userId);
      return defaultCategories;
    }

    // Merge with predefined categories to ensure all are included
    const allCategoryNames = new Set([
      ...categoriesWithCounts.map(c => c.name),
      ...PREDEFINED_CATEGORIES
    ]);

    const finalCategories = Array.from(allCategoryNames).map(categoryName => {
      const existing = categoriesWithCounts.find(c => c.name === categoryName);
      return {
        name: categoryName,
        count: existing ? existing.count : 0
      };
    });

    // Sort by count (descending) then by name
    finalCategories.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

    // Cache for 1 hour
    await categoryCache.setCategories(finalCategories, userId);
    return finalCategories;
  }

  /**
   * Get default categories for non-authenticated users
   */
  async getDefaultCategories(): Promise<CategoryWithCount[]> {
    // Check cache first
    const cached = await categoryCache.getCategories();
    if (cached) {
      return cached;
    }

    const defaultCategories = PREDEFINED_CATEGORIES.map(category => ({
      name: category,
      count: 0
    }));

    // Cache for 5 minutes
    await categoryCache.setCategories(defaultCategories);
    return defaultCategories;
  }

  /**
   * Get comprehensive category statistics for a user
   */
  async getCategoryStats(userId: string): Promise<CategoryStats> {
    // Use a single query to get all necessary data
    const [categoriesWithCounts, totalRecipes] = await Promise.all([
      this.getUserCategoriesWithCounts(userId),
      this.prisma.recipe.count({ where: { userId } })
    ]);

    const predefinedCount = categoriesWithCounts.filter(c => 
      (PREDEFINED_CATEGORIES as readonly string[]).includes(c.name)
    ).length;

    const customCount = categoriesWithCounts.filter(c => 
      !(PREDEFINED_CATEGORIES as readonly string[]).includes(c.name) && c.count > 0
    ).length;

    return {
      totalCategories: categoriesWithCounts.filter(c => c.count > 0).length,
      totalRecipes,
      predefinedCount,
      customCount,
      categories: categoriesWithCounts
    };
  }

  /**
   * Get popular categories across all users (for suggestions)
   */
  async getPopularCategories(limit: number = 10): Promise<CategoryWithCount[]> {
    const cacheKey = `popular_categories_${limit}`;
    const cached = await categoryCache.getCategorySuggestions(cacheKey);
    if (cached) {
      // Type assertion since we know this cache stores CategoryWithCount[]
      return cached as unknown as CategoryWithCount[];
    }

    const popularCategories = await this.prisma.recipe.groupBy({
      by: ['category'],
      where: {
        category: {
          not: ''
        }
      },
      _count: {
        id: true
      },
      orderBy: { 
        _count: { 
          id: 'desc' 
        } 
      },
      take: limit
    });

    const result = popularCategories.map(item => ({
      name: item.category,
      count: item._count.id
    }));

    // Cache for 30 minutes - convert to expected cache type
    const cacheData = result.map(item => ({
      category: item.name,
      confidence: 1.0,
      reasoning: `Popular category with ${item.count} recipes`,
      source: 'popularity_analysis'
    }));
    await categoryCache.setCategorySuggestions(cacheKey, cacheData);
    return result;
  }

  /**
   * Batch update category cache for multiple users
   */
  async batchUpdateCategoryCache(userIds: string[]): Promise<void> {
    const batchSize = 10;
    
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (userId) => {
          try {
            // Invalidate existing cache
            await categoryCache.invalidateCategories(userId);
            // Pre-populate with fresh data
            await this.getUserCategoriesWithCounts(userId);
          } catch (error) {
            console.error(`Failed to update cache for user ${userId}:`, error);
          }
        })
      );
    }
  }

  /**
   * Optimized batch query for multiple users' categories
   */
  async batchGetUserCategories(userIds: string[]): Promise<Map<string, CategoryWithCount[]>> {
    const startTime = Date.now();
    
    // Single query to get all categories for multiple users
    const allUserCategories = await this.prisma.recipe.groupBy({
      by: ['userId', 'category'],
      where: {
        userId: { in: userIds },
        category: { not: '' }
      },
      _count: { id: true },
      orderBy: [
        { userId: 'asc' },
        { _count: { id: 'desc' } }
      ]
    });

    // Group results by userId
    const resultMap = new Map<string, CategoryWithCount[]>();
    
    // Initialize all users with empty arrays
    userIds.forEach(userId => {
      resultMap.set(userId, []);
    });

    // Populate with actual data
    allUserCategories.forEach(item => {
      const existing = resultMap.get(item.userId) || [];
      existing.push({
        name: item.category,
        count: item._count.id
      });
      resultMap.set(item.userId, existing);
    });

    // Add predefined categories with zero counts for users with no recipes
    resultMap.forEach((categories, userId) => {
      if (categories.length === 0) {
        const defaultCategories = PREDEFINED_CATEGORIES.map(category => ({
          name: category,
          count: 0
        }));
        resultMap.set(userId, defaultCategories);
      } else {
        // Merge with predefined categories
        const allCategoryNames = new Set([
          ...categories.map(c => c.name),
          ...PREDEFINED_CATEGORIES
        ]);

        const finalCategories = Array.from(allCategoryNames).map(categoryName => {
          const existing = categories.find(c => c.name === categoryName);
          return {
            name: categoryName,
            count: existing ? existing.count : 0
          };
        });

        // Sort by count (descending) then by name
        finalCategories.sort((a, b) => {
          if (b.count !== a.count) {
            return b.count - a.count;
          }
          return a.name.localeCompare(b.name);
        });

        resultMap.set(userId, finalCategories);
      }
    });

    // Log performance metrics
    const duration = Date.now() - startTime;
    console.log(`Batch category query for ${userIds.length} users completed in ${duration}ms`);

    return resultMap;
  }

  /**
   * Performance monitoring for category queries
   */
  async measureQueryPerformance<T>(
    queryName: string,
    queryFn: () => Promise<T>
  ): Promise<{ result: T; duration: number; timestamp: Date }> {
    const startTime = Date.now();
    const timestamp = new Date();
    
    try {
      const result = await queryFn();
      const duration = Date.now() - startTime;
      
      // Log performance metrics
      console.log(`Query "${queryName}" completed in ${duration}ms at ${timestamp.toISOString()}`);
      
      // In production, you might want to send this to a monitoring service
      if (duration > 1000) {
        console.warn(`Slow query detected: "${queryName}" took ${duration}ms`);
      }
      
      return { result, duration, timestamp };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Query "${queryName}" failed after ${duration}ms:`, error);
      throw error;
    }
  }

  /**
   * Optimized category existence check
   */
  async categoryExists(userId: string, categoryName: string): Promise<boolean> {
    const result = await this.prisma.recipe.findFirst({
      where: {
        userId,
        category: categoryName
      },
      select: { id: true } // Only select the minimal field needed
    });
    
    return result !== null;
  }

  /**
   * Bulk category existence check
   */
  async categoriesExist(userId: string, categoryNames: string[]): Promise<Map<string, boolean>> {
    const results = await this.prisma.recipe.groupBy({
      by: ['category'],
      where: {
        userId,
        category: { in: categoryNames }
      },
      _count: { id: true }
    });

    const existenceMap = new Map<string, boolean>();
    
    // Initialize all as false
    categoryNames.forEach(name => existenceMap.set(name, false));
    
    // Mark existing ones as true
    results.forEach(result => {
      existenceMap.set(result.category, true);
    });

    return existenceMap;
  }

  /**
   * Get category distribution analytics
   */
  async getCategoryAnalytics(): Promise<{
    totalUsers: number;
    totalRecipes: number;
    categoryDistribution: Array<{
      category: string;
      recipeCount: number;
      userCount: number;
      isPredefined: boolean;
    }>;
  }> {
    // Use raw SQL for complex analytics query
    const categoryDistribution = await this.prisma.$queryRaw<Array<{
      category: string;
      recipe_count: bigint;
      user_count: bigint;
    }>>`
      SELECT 
        category,
        COUNT(*) as recipe_count,
        COUNT(DISTINCT "userId") as user_count
      FROM "Recipe" 
      WHERE category IS NOT NULL
      GROUP BY category
      ORDER BY recipe_count DESC
    `;

    const [totalUsers, totalRecipes] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.recipe.count()
    ]);

    return {
      totalUsers,
      totalRecipes,
      categoryDistribution: categoryDistribution.map(item => ({
        category: item.category,
        recipeCount: Number(item.recipe_count),
        userCount: Number(item.user_count),
        isPredefined: (PREDEFINED_CATEGORIES as readonly string[]).includes(item.category)
      }))
    };
  }

  /**
   * Cleanup and disconnect
   */
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// Export singleton instance
export const optimizedCategoryService = new OptimizedCategoryService(); 