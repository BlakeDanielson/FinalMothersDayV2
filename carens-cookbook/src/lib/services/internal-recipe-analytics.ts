import { prisma } from '@/lib/db';
import { ExtractionStrategy, AIProvider } from '@/generated/prisma';

export interface InternalRecipeDataInput {
  // Basic recipe info
  title: string;
  
  // Source context
  sourceUrl: string;
  
  // Processing method
  extractionStrategy: ExtractionStrategy;
  aiProvider: AIProvider;
  
  // Performance metrics
  totalProcessingTimeMs: number;
  fetchTimeMs?: number;
  parseTimeMs?: number;
  aiTimeMs?: number;
}

export class InternalRecipeAnalytics {
  /**
   * Save recipe data for internal analysis (anonymous users only)
   */
  static async saveRecipeData(data: InternalRecipeDataInput): Promise<string> {
    try {
      // Extract domain from URL
      const domain = new URL(data.sourceUrl).hostname;
      
      const internalRecipe = await prisma.internalRecipeData.create({
        data: {
          // Basic recipe info
          title: data.title,
          
          // Source context
          sourceUrl: data.sourceUrl,
          domain,
          
          // Processing method
          extractionStrategy: data.extractionStrategy,
          aiProvider: data.aiProvider,
          
          // Performance metrics
          totalProcessingTimeMs: data.totalProcessingTimeMs,
          fetchTimeMs: data.fetchTimeMs,
          parseTimeMs: data.parseTimeMs,
          aiTimeMs: data.aiTimeMs
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
   * Get simple analytics insights for internal use
   */
  static async getAnalyticsInsights(options: {
    domain?: string;
    startDate?: Date;
    endDate?: Date;
    strategy?: ExtractionStrategy;
    aiProvider?: AIProvider;
  } = {}) {
    // Build simple where clause
    const where: {
      domain?: string;
      extractionStrategy?: ExtractionStrategy;
      aiProvider?: AIProvider;
      extractedAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};
    if (options.domain) where.domain = options.domain;
    if (options.strategy) where.extractionStrategy = options.strategy;
    if (options.aiProvider) where.aiProvider = options.aiProvider;
    if (options.startDate || options.endDate) {
      where.extractedAt = {};
      if (options.startDate) where.extractedAt.gte = options.startDate;
      if (options.endDate) where.extractedAt.lte = options.endDate;
    }
    
    // Get basic counts and averages
    const totalExtractions = await prisma.internalRecipeData.count({ where });
    
    const avgProcessingTime = await prisma.internalRecipeData.aggregate({
      where,
      _avg: { 
        totalProcessingTimeMs: true,
        fetchTimeMs: true,
        parseTimeMs: true,
        aiTimeMs: true
      }
    });
    
    // Get top domains using simple findMany + processing
    const domainData = await prisma.internalRecipeData.findMany({
      where,
      select: { domain: true },
    });
    
    const domainCounts = domainData.reduce((acc, item) => {
      acc[item.domain] = (acc[item.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topDomains = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, _count: { _all: count } }));
    
    return {
      totalExtractions,
      avgTotalProcessingTimeMs: avgProcessingTime._avg.totalProcessingTimeMs,
      avgFetchTimeMs: avgProcessingTime._avg.fetchTimeMs,
      avgParseTimeMs: avgProcessingTime._avg.parseTimeMs,
      avgAiTimeMs: avgProcessingTime._avg.aiTimeMs,
      topDomains
    };
  }
} 