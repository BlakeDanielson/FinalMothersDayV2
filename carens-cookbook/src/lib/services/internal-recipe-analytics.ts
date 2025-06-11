import { prisma } from '@/lib/db';
import { ExtractionStrategy, AIProvider } from '@/generated/prisma';

export interface InternalRecipeDataInput {
  // Recipe content
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string | null;
  cuisine: string;
  category: string;
  prepTime: string;
  cleanupTime: string;
  
  // Source context
  sourceUrl: string;
  
  // User context (optional)
  userId?: string | null;
  sessionId?: string | null;
  
  // Processing metadata
  extractionStrategy: ExtractionStrategy;
  aiProvider: AIProvider;
  fallbackUsed?: boolean;
  processingTimeMs: number;
  tokenCount?: number;
  estimatedCost?: number;
  
  // Quality metrics
  categoryConfidence?: number;
  completenessScore?: number;
  hasStructuredData?: boolean;
  validationErrors?: Array<{ type: string; message: string }>;
}

export class InternalRecipeAnalytics {
  /**
   * Save recipe data for internal analysis (works for both authenticated and anonymous users)
   */
  static async saveRecipeData(data: InternalRecipeDataInput): Promise<string> {
    try {
      // Extract domain from URL
      const domain = new URL(data.sourceUrl).hostname;
      
      // Calculate additional metrics
      const ingredientCount = data.ingredients.length;
      const stepCount = data.steps.length;
      const estimatedCookTime = this.calculateEstimatedCookTime(data.prepTime, data.cleanupTime);
      const recipeComplexity = this.calculateRecipeComplexity(ingredientCount, stepCount);
      
      const internalRecipe = await prisma.internalRecipeData.create({
        data: {
          // Recipe content
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          steps: data.steps,
          image: data.image,
          cuisine: data.cuisine,
          category: data.category,
          prepTime: data.prepTime,
          cleanupTime: data.cleanupTime,
          
          // Source context
          sourceUrl: data.sourceUrl,
          domain,
          
          // User context
          userId: data.userId,
          sessionId: data.sessionId,
          
          // Processing metadata
          extractionStrategy: data.extractionStrategy,
          aiProvider: data.aiProvider,
          fallbackUsed: data.fallbackUsed || false,
          processingTimeMs: data.processingTimeMs,
          tokenCount: data.tokenCount,
          estimatedCost: data.estimatedCost,
          
          // Quality metrics
          categoryConfidence: data.categoryConfidence,
          completenessScore: data.completenessScore,
          hasStructuredData: data.hasStructuredData,
          validationErrors: data.validationErrors,
          
          // Calculated metrics
          ingredientCount,
          stepCount,
          estimatedCookTime,
          recipeComplexity
        }
      });
      
      console.log(`📊 Internal recipe data saved: ${data.title} from ${domain}`);
      return internalRecipe.id;
      
    } catch (error) {
      console.error('Failed to save internal recipe data:', error);
      // Don't let analytics failures break the main flow
      throw error;
    }
  }
  
  /**
   * Calculate estimated total cook time from prep and cleanup times
   */
  private static calculateEstimatedCookTime(prepTime: string, cleanupTime: string): number | null {
    try {
      const prepMinutes = this.parseTimeToMinutes(prepTime);
      const cleanupMinutes = this.parseTimeToMinutes(cleanupTime);
      
      if (prepMinutes !== null && cleanupMinutes !== null) {
        return prepMinutes + cleanupMinutes;
      } else if (prepMinutes !== null) {
        return prepMinutes;
      }
      
      return null;
    } catch {
      return null;
    }
  }
  
  /**
   * Parse time strings like "30 minutes", "1 hour", "2 hrs 30 mins" to minutes
   */
  private static parseTimeToMinutes(timeStr: string): number | null {
    if (!timeStr) return null;
    
    const str = timeStr.toLowerCase();
    let totalMinutes = 0;
    
    // Match hours
    const hourMatch = str.match(/(\d+)\s*(hour|hr|hours|hrs)/);
    if (hourMatch) {
      totalMinutes += parseInt(hourMatch[1]) * 60;
    }
    
    // Match minutes
    const minuteMatch = str.match(/(\d+)\s*(minute|min|minutes|mins)/);
    if (minuteMatch) {
      totalMinutes += parseInt(minuteMatch[1]);
    }
    
    // If no specific units, assume minutes
    if (totalMinutes === 0) {
      const numberMatch = str.match(/^\d+$/);
      if (numberMatch) {
        totalMinutes = parseInt(numberMatch[0]);
      }
    }
    
    return totalMinutes > 0 ? totalMinutes : null;
  }
  
  /**
   * Calculate recipe complexity based on ingredients and steps
   */
  private static calculateRecipeComplexity(ingredientCount: number, stepCount: number): string {
    const complexityScore = ingredientCount + (stepCount * 1.5);
    
    if (complexityScore <= 8) return 'simple';
    if (complexityScore <= 15) return 'moderate';
    return 'complex';
  }
  
  /**
   * Get analytics insights for internal use
   */
  static async getAnalyticsInsights(options: {
    domain?: string;
    startDate?: Date;
    endDate?: Date;
    strategy?: ExtractionStrategy;
    aiProvider?: AIProvider;
  } = {}) {
    // Helper function to build clean where clauses for each query
    const buildWhereClause = () => {
      const where: any = {};
      if (options.domain) where.domain = options.domain;
      if (options.strategy) where.extractionStrategy = options.strategy;
      if (options.aiProvider) where.aiProvider = options.aiProvider;
      if (options.startDate || options.endDate) {
        where.extractedAt = {};
        if (options.startDate) where.extractedAt.gte = options.startDate;
        if (options.endDate) where.extractedAt.lte = options.endDate;
      }
      return where;
    };
    
    // Execute queries separately to avoid circular reference issues
    const totalExtractions = await prisma.internalRecipeData.count({ 
      where: buildWhereClause() 
    });
    
    const avgProcessingTime = await prisma.internalRecipeData.aggregate({
      where: buildWhereClause(),
      _avg: { processingTimeMs: true }
    });
    
    const complexityDistribution = await prisma.internalRecipeData.groupBy({
      by: ['recipeComplexity'],
      where: buildWhereClause(),
      _count: { _all: true }
    });
    
    const topDomains = await prisma.internalRecipeData.groupBy({
      by: ['domain'],
      where: buildWhereClause(),
      _count: { _all: true },
      orderBy: { _count: { _all: 'desc' } },
      take: 10
    });
    
    const topCategories = await prisma.internalRecipeData.groupBy({
      by: ['category'],
      where: buildWhereClause(),
      _count: { _all: true },
      orderBy: { _count: { _all: 'desc' } },
      take: 10
    });
    
    const topCuisines = await prisma.internalRecipeData.groupBy({
      by: ['cuisine'],
      where: buildWhereClause(),
      _count: { _all: true },
      orderBy: { _count: { _all: 'desc' } },
      take: 10
    });
    
    return {
      totalExtractions,
      avgProcessingTimeMs: avgProcessingTime._avg.processingTimeMs,
      complexityDistribution,
      topDomains,
      topCategories,
      topCuisines
    };
  }
} 