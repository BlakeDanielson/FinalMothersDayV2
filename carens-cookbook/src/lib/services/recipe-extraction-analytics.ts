import { prisma } from '@/lib/db';
import { ExtractionStrategy, AIProvider } from '@/generated/prisma';

// Type definitions for analytics data
export interface ExtractionMetrics {
  // Request Context
  userId: string;
  recipeUrl: string;
  
  // Strategy & Provider Info
  primaryStrategy: ExtractionStrategy;
  aiProvider: AIProvider;
  fallbackUsed?: boolean;
  fallbackReason?: string;
  
  // Timing Metrics (all in milliseconds)
  totalDuration: number;
  htmlFetchDuration?: number;
  aiProcessingDuration: number;
  validationDuration?: number;
  databaseSaveDuration?: number;
  
  // Content & Processing Info
  htmlContentSize?: number;
  cleanedContentSize?: number;
  promptTokens?: number;
  responseTokens?: number;
  totalTokens?: number;
  
  // Success & Quality Metrics
  extractionSuccess: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors?: any[];
  missingFields?: string[];
  completenessScore?: number;
  
  // AI Response Quality
  categoryConfidence?: number;
  hasStructuredData?: boolean;
  
  // Cost Tracking (in USD)
  estimatedCost?: number;
  
  // Final Recipe Reference
  recipeId?: string;
  
  // Performance Flags
  wasOptimal?: boolean;
}

// Timer utility class for tracking stages
export class ExtractionTimer {
  private startTime: number;
  private stages: Record<string, number> = {};
  private lastStageTime: number;

  constructor() {
    this.startTime = Date.now();
    this.lastStageTime = this.startTime;
  }

  markStage(stageName: string): number {
    const now = Date.now();
    const stageDuration = now - this.lastStageTime;
    this.stages[stageName] = stageDuration;
    this.lastStageTime = now;
    return stageDuration;
  }

  getTotalDuration(): number {
    return Date.now() - this.startTime;
  }

  getStage(stageName: string): number | undefined {
    return this.stages[stageName];
  }

  getAllStages(): Record<string, number> {
    return { ...this.stages };
  }
}

// Cost calculation utilities
const AI_COSTS = {
  'openai-mini': { input: 0.00015, output: 0.0006 }, // per 1k tokens
  'openai-main': { input: 0.0025, output: 0.01 },
  'gemini-main': { input: 0.000125, output: 0.000375 },
  'gemini-flash': { input: 0.000075, output: 0.0003 }
};

function calculateEstimatedCost(
  aiProvider: AIProvider, 
  promptTokens?: number, 
  responseTokens?: number
): number | undefined {
  if (!promptTokens || !responseTokens) return undefined;

  const providerKey = aiProvider.toLowerCase().replace('_', '-') as keyof typeof AI_COSTS;
  const costs = AI_COSTS[providerKey];
  
  if (!costs) return undefined;

  const inputCost = (promptTokens / 1000) * costs.input;
  const outputCost = (responseTokens / 1000) * costs.output;
  
  return Number((inputCost + outputCost).toFixed(6));
}

// Recipe completeness scoring
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateCompletenessScore(recipe: any, missingFields: string[]): number {
  const criticalFields = ['title', 'ingredients', 'steps'];
  const importantFields = ['description', 'cuisine', 'category', 'prepTime'];
  const optionalFields = ['cleanupTime', 'image'];
  
  let score = 0;

  // Critical fields are worth 40% (0.4 / 3 = 0.133 each)
  criticalFields.forEach(field => {
    if (!missingFields.includes(field) && recipe[field]) {
      score += 0.133;
    }
  });

  // Important fields are worth 40% (0.4 / 4 = 0.1 each)
  importantFields.forEach(field => {
    if (!missingFields.includes(field) && recipe[field]) {
      score += 0.1;
    }
  });

  // Optional fields are worth 20% (0.2 / 2 = 0.1 each)
  optionalFields.forEach(field => {
    if (!missingFields.includes(field) && recipe[field]) {
      score += 0.1;
    }
  });

  return Math.min(1.0, score);
}

// Extract domain from URL
function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
}

// Identify missing fields in extracted recipe
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function identifyMissingFields(recipe: any): string[] {
  const fields = ['title', 'ingredients', 'steps', 'description', 'cuisine', 'category', 'prepTime', 'cleanupTime', 'image'];
  return fields.filter(field => !recipe[field] || 
    (Array.isArray(recipe[field]) && recipe[field].length === 0) ||
    recipe[field] === null || 
    recipe[field] === undefined ||
    recipe[field] === ''
  );
}

// Main analytics service class
export class RecipeExtractionAnalytics {
  
  // Track a complete extraction attempt
  static async trackExtraction(metrics: ExtractionMetrics): Promise<void> {
    try {
      const domain = extractDomain(metrics.recipeUrl);
      
      // Calculate missing fields and completeness if recipe data provided
      let missingFields: string[] = [];
      let completenessScore: number | undefined;
      
      if (metrics.extractionSuccess && metrics.recipeId) {
        // If we have the recipe, we can calculate these metrics
        // Note: This would need the actual recipe data passed in or fetched
        missingFields = metrics.missingFields || [];
        completenessScore = metrics.completenessScore;
      }

      // Calculate estimated cost
      const estimatedCost = calculateEstimatedCost(
        metrics.aiProvider,
        metrics.promptTokens,
        metrics.responseTokens
      );

      // Store the metrics
      await prisma.recipeExtractionMetrics.create({
        data: {
          userId: metrics.userId,
          recipeUrl: metrics.recipeUrl,
          domain,
          primaryStrategy: metrics.primaryStrategy,
          aiProvider: metrics.aiProvider,
          fallbackUsed: metrics.fallbackUsed || false,
          fallbackReason: metrics.fallbackReason,
          totalDuration: metrics.totalDuration,
          htmlFetchDuration: metrics.htmlFetchDuration,
          aiProcessingDuration: metrics.aiProcessingDuration,
          validationDuration: metrics.validationDuration,
          databaseSaveDuration: metrics.databaseSaveDuration,
          htmlContentSize: metrics.htmlContentSize,
          cleanedContentSize: metrics.cleanedContentSize,
          promptTokens: metrics.promptTokens,
          responseTokens: metrics.responseTokens,
          totalTokens: metrics.totalTokens,
          extractionSuccess: metrics.extractionSuccess,
          validationErrors: metrics.validationErrors ? JSON.parse(JSON.stringify(metrics.validationErrors)) : null,
          missingFields,
          completenessScore,
          categoryConfidence: metrics.categoryConfidence,
          hasStructuredData: metrics.hasStructuredData,
          estimatedCost,
          recipeId: metrics.recipeId,
          wasOptimal: metrics.wasOptimal || false
        }
      });

      // Update domain performance metrics asynchronously
      this.updateDomainMetrics(domain).catch(error => {
        console.error('Failed to update domain metrics:', error);
      });

    } catch (error) {
      console.error('Failed to track extraction metrics:', error);
      // Don't throw - analytics shouldn't break the main flow
    }
  }

  // Update aggregated domain performance metrics
  static async updateDomainMetrics(domain: string): Promise<void> {
    try {
      // Get current domain stats
      const stats = await prisma.recipeExtractionMetrics.aggregate({
        where: { domain },
        _count: { id: true },
        _avg: {
          totalDuration: true,
          totalTokens: true,
          estimatedCost: true,
          completenessScore: true
        }
      });

      const successfulExtractions = await prisma.recipeExtractionMetrics.count({
        where: { domain, extractionSuccess: true }
      });

      const structuredDataCount = await prisma.recipeExtractionMetrics.count({
        where: { domain, hasStructuredData: true }
      });

      // Find the most successful strategy and provider for this domain
      const optimalStrategy = await prisma.recipeExtractionMetrics.groupBy({
        by: ['primaryStrategy'],
        where: { domain, extractionSuccess: true },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1
      });

      const optimalProvider = await prisma.recipeExtractionMetrics.groupBy({
        by: ['aiProvider'],
        where: { domain, extractionSuccess: true },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1
      });

      // Upsert domain performance metrics
      await prisma.domainPerformanceMetrics.upsert({
        where: { domain },
        create: {
          domain,
          totalExtractions: stats._count.id,
          successfulExtractions,
          averageExtractTime: Math.round(stats._avg.totalDuration || 0),
          averageTokens: Math.round(stats._avg.totalTokens || 0),
          averageCost: stats._avg.estimatedCost,
          optimalStrategy: optimalStrategy[0]?.primaryStrategy,
          optimalProvider: optimalProvider[0]?.aiProvider,
          averageCompleteness: stats._avg.completenessScore,
          hasStructuredDataPct: structuredDataCount / stats._count.id
        },
        update: {
          totalExtractions: stats._count.id,
          successfulExtractions,
          averageExtractTime: Math.round(stats._avg.totalDuration || 0),
          averageTokens: Math.round(stats._avg.totalTokens || 0),
          averageCost: stats._avg.estimatedCost,
          optimalStrategy: optimalStrategy[0]?.primaryStrategy,
          optimalProvider: optimalProvider[0]?.aiProvider,
          averageCompleteness: stats._avg.completenessScore,
          hasStructuredDataPct: structuredDataCount / stats._count.id,
          lastUpdated: new Date()
        }
      });

    } catch (error) {
      console.error('Failed to update domain metrics:', error);
    }
  }

  // Get analytics for a specific user
  static async getUserAnalytics(userId: string, days: number = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [totalExtractions, successfulExtractions, averageTime, totalCost] = await Promise.all([
      prisma.recipeExtractionMetrics.count({
        where: { userId, requestTimestamp: { gte: since } }
      }),
      prisma.recipeExtractionMetrics.count({
        where: { userId, extractionSuccess: true, requestTimestamp: { gte: since } }
      }),
      prisma.recipeExtractionMetrics.aggregate({
        where: { userId, requestTimestamp: { gte: since } },
        _avg: { totalDuration: true }
      }),
      prisma.recipeExtractionMetrics.aggregate({
        where: { userId, requestTimestamp: { gte: since } },
        _sum: { estimatedCost: true }
      })
    ]);

    return {
      totalExtractions,
      successfulExtractions,
      successRate: totalExtractions > 0 ? successfulExtractions / totalExtractions : 0,
      averageTime: Math.round(averageTime._avg.totalDuration || 0),
      totalCost: totalCost._sum.estimatedCost || 0,
      period: `${days} days`
    };
  }

  // Get system-wide analytics
  static async getSystemAnalytics(days: number = 7) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [providerStats, domainStats, qualityStats] = await Promise.all([
      // Provider performance
      prisma.recipeExtractionMetrics.groupBy({
        by: ['aiProvider'],
        where: { requestTimestamp: { gte: since } },
        _count: { id: true },
        _avg: { totalDuration: true, estimatedCost: true }
      }),
      // Top domains
      prisma.recipeExtractionMetrics.groupBy({
        by: ['domain'],
        where: { requestTimestamp: { gte: since } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10
      }),
      // Quality metrics
      prisma.recipeExtractionMetrics.aggregate({
        where: { requestTimestamp: { gte: since } },
        _avg: { completenessScore: true },
        _count: { id: true }
      })
    ]);

    return {
      providerStats,
      domainStats,
      qualityStats,
      period: `${days} days`
    };
  }
}

// Export the trackExtraction with recipe utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function trackExtractionWithRecipe(
  metrics: Omit<ExtractionMetrics, 'missingFields' | 'completenessScore'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recipe?: any
): Promise<void> {
  let missingFields: string[] = [];
  let completenessScore: number | undefined;

  if (recipe && metrics.extractionSuccess) {
    missingFields = identifyMissingFields(recipe);
    completenessScore = calculateCompletenessScore(recipe, missingFields);
  }

  await RecipeExtractionAnalytics.trackExtraction({
    ...metrics,
    missingFields,
    completenessScore
  });
} 