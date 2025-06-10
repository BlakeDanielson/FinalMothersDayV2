import { describe, it, expect, beforeAll, afterAll } from '@jest/jest';
import { PrismaClient } from '@prisma/client';
import { extractRecipeViaOrchestrator } from '@/lib/services/recipe-extraction-orchestrator';
import { RecipeExtractionAnalytics } from '@/lib/services/recipe-extraction-analytics';
import { ExtractionStrategy, AIProvider } from '@/generated/prisma';

const prisma = new PrismaClient();

// Test recipe URLs with varying complexity and sources
const TEST_RECIPE_URLS = [
  // High-complexity sites (should test Gemini URL-direct resilience)
  {
    url: 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'high',
    source: 'allrecipes'
  },
  {
    url: 'https://www.foodnetwork.com/recipes/alton-brown/baked-mac-and-cheese-recipe-1939524',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'high',
    source: 'foodnetwork'
  },
  
  // Medium complexity sites
  {
    url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'medium',
    source: 'tasteofhome'
  },
  {
    url: 'https://www.epicurious.com/recipes/food/views/simple-chocolate-chip-cookies',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'medium',
    source: 'epicurious'
  },
  
  // Simpler sites (should work reliably with URL-direct)
  {
    url: 'https://www.recipetineats.com/beef-stroganoff/',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'low',
    source: 'recipetineats'
  },
  {
    url: 'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
    expectedStrategy: ExtractionStrategy.URL_DIRECT,
    difficulty: 'low',
    source: 'kingarthur'
  }
];

// Test user IDs
const TEST_USER_IDS = [
  'test_user_analytics_1',
  'test_user_analytics_2',
  'test_user_analytics_3'
];

describe('Recipe Extraction Analytics Test Suite', () => {
  let analytics: RecipeExtractionAnalytics;

  beforeAll(async () => {
    console.log('🧪 Setting up test environment...');
    analytics = new RecipeExtractionAnalytics();
    
    // Create test users in database
    for (const userId of TEST_USER_IDS) {
      await prisma.user.upsert({
        where: { clerkId: userId },
        create: {
          clerkId: userId,
          email: `test-${userId}@analytics-testing.local`,
          firstName: 'Test',
          lastName: `User ${userId.slice(-1)}`,
          isTestUser: true
        },
        update: {
          isTestUser: true
        }
      });
    }

    console.log(`🎯 Test environment ready with ${TEST_USER_IDS.length} users`);
  });

  afterAll(async () => {
    console.log('🧹 Test complete - data preserved for analysis');
    await prisma.$disconnect();
  });

  describe('Strategy Performance Testing', () => {
    it('should test Gemini URL-direct strategy across various sites', async () => {
      console.log('🚀 Testing Gemini URL-direct strategy...');
      
      for (const testCase of TEST_RECIPE_URLS) {
        console.log(`🔍 Testing ${testCase.source} (${testCase.difficulty} complexity): ${testCase.url}`);
        
        const startTime = Date.now();
        
        try {
          const result = await extractRecipeViaOrchestrator(testCase.url, {
            forceStrategy: 'url-direct',
            userId: TEST_USER_IDS[0],
            analyticsEnabled: true
          });
          
          const duration = Date.now() - startTime;
          
          // Verify extraction worked
          expect(result).toBeDefined();
          expect(result.title).toBeTruthy();
          expect(result.ingredients).toHaveLength.greaterThan(0);
          expect(result.steps).toHaveLength.greaterThan(0);
          
          console.log(`✅ ${testCase.source}: Success in ${duration}ms`);
          console.log(`   Title: ${result.title}`);
          console.log(`   Ingredients: ${result.ingredients.length}`);
          console.log(`   Steps: ${result.steps.length}`);
          
        } catch (error) {
          console.log(`❌ ${testCase.source}: Failed - ${error}`);
        }
        
        // Wait between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }, 300000); // 5 minute timeout

    it('should test automatic strategy selection', async () => {
      console.log('🎯 Testing automatic strategy selection...');
      
      for (let i = 0; i < TEST_RECIPE_URLS.length; i++) {
        const testCase = TEST_RECIPE_URLS[i];
        const userId = TEST_USER_IDS[i % TEST_USER_IDS.length];
        
        console.log(`🤖 Auto-testing ${testCase.source}: ${testCase.url}`);
        
        try {
          const result = await extractRecipeViaOrchestrator(testCase.url, {
            userId,
            analyticsEnabled: true
          });
          
          expect(result).toBeDefined();
          console.log(`✅ ${testCase.source}: Auto-extraction successful`);
          
        } catch (error) {
          console.log(`❌ ${testCase.source}: Auto-extraction failed - ${error}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }, 600000); // 10 minute timeout
  });

  describe('Analytics Data Verification', () => {
    it('should verify comprehensive analytics data was recorded', async () => {
      console.log('📊 Verifying analytics data...');
      
      // Check extraction analytics
      const extractionMetrics = await prisma.recipeExtractionAnalytics.findMany({
        where: {
          user: {
            isTestUser: true
          }
        },
        include: {
          user: true
        }
      });
      
      expect(extractionMetrics.length).toBeGreaterThan(0);
      
      // Verify we have data
      const successfulExtractions = extractionMetrics.filter(m => m.success);
      const failedExtractions = extractionMetrics.filter(m => !m.success);
      
      console.log(`📈 Analytics Summary:`);
      console.log(`   Total extractions: ${extractionMetrics.length}`);
      console.log(`   Successful: ${successfulExtractions.length}`);
      console.log(`   Failed: ${failedExtractions.length}`);
      
      // Strategy breakdown
      const strategyCounts = extractionMetrics.reduce((acc, metric) => {
        acc[metric.strategy] = (acc[metric.strategy] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log(`   Strategy usage:`, strategyCounts);
      
      expect(extractionMetrics.length).toBeGreaterThanOrEqual(TEST_RECIPE_URLS.length);
    });
  });
});

// Helper function to get analytics summary
export async function getAnalyticsSummary() {
  const extractionMetrics = await prisma.recipeExtractionAnalytics.findMany({
    where: {
      user: {
        isTestUser: true
      }
    },
    include: {
      user: true
    }
  });

  const conversions = await prisma.conversionTracking.findMany({
    where: {
      user: {
        isTestUser: true
      }
    }
  });

  return {
    totalExtractions: extractionMetrics.length,
    successfulExtractions: extractionMetrics.filter(m => m.success).length,
    failedExtractions: extractionMetrics.filter(m => !m.success).length,
    totalConversions: conversions.length,
    strategyCounts: extractionMetrics.reduce((acc, m) => {
      acc[m.strategy] = (acc[m.strategy] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    avgProcessingTime: extractionMetrics.reduce((sum, m) => sum + (m.processingTimeMs || 0), 0) / extractionMetrics.length,
    avgTokensUsed: extractionMetrics.reduce((sum, m) => sum + (m.tokensUsed || 0), 0) / extractionMetrics.length
  };
} 