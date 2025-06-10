import { describe, it, expect, beforeAll, afterAll } from '@jest/testing-library';
import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';
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
  },

  // Sites that might trigger HTML fallback (complex JS, paywalls, etc.)
  {
    url: 'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
    expectedStrategy: ExtractionStrategy.HTML_FALLBACK,
    difficulty: 'very_high',
    source: 'nytimes'
  },
  {
    url: 'https://www.bonappetit.com/recipe/classic-chocolate-chip-cookies',
    expectedStrategy: ExtractionStrategy.HTML_FALLBACK,
    difficulty: 'very_high',
    source: 'bonappetit'
  }
];

// Test user configuration
const TEST_USER_IDS = [
  'test_user_analytics_1',
  'test_user_analytics_2',
  'test_user_analytics_3'
];

describe('Recipe Extraction Analytics Test Suite', () => {
  let testUsers: any[] = [];
  let analytics: RecipeExtractionAnalytics;

  beforeAll(async () => {
    console.log('🧪 Setting up test environment...');
    
    // Initialize analytics service
    analytics = new RecipeExtractionAnalytics();
    
    // Create test users in Clerk (if they don't exist)
    for (const userId of TEST_USER_IDS) {
      try {
        const user = await clerkClient.users.getUser(userId);
        testUsers.push(user);
        console.log(`✅ Test user ${userId} already exists`);
      } catch (error) {
        // User doesn't exist, create them
        const user = await clerkClient.users.createUser({
          externalId: userId,
          emailAddress: [`test-${userId}@analytics-testing.local`],
          firstName: `Test`,
          lastName: `User ${userId.slice(-1)}`,
          publicMetadata: {
            isTestUser: true,
            purpose: 'analytics-data-seeding'
          }
        });
        testUsers.push(user);
        console.log(`✅ Created test user ${userId}`);
      }
    }

    // Ensure test users have basic database records
    for (const user of testUsers) {
      await prisma.user.upsert({
        where: { clerkId: user.id },
        create: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || `${user.id}@test.local`,
          firstName: user.firstName || 'Test',
          lastName: user.lastName || 'User',
          isTestUser: true
        },
        update: {
          isTestUser: true
        }
      });
    }

    console.log(`🎯 Test environment ready with ${testUsers.length} users`);
  });

  afterAll(async () => {
    console.log('🧹 Cleaning up test environment...');
    
    // Note: We'll keep the test data for analysis but mark it clearly
    // Only clean up if needed for CI/CD
    if (process.env.CLEANUP_TEST_DATA === 'true') {
      await prisma.recipeExtractionAnalytics.deleteMany({
        where: {
          user: {
            isTestUser: true
          }
        }
      });
      
      await prisma.conversionTracking.deleteMany({
        where: {
          user: {
            isTestUser: true
          }
        }
      });
    }
    
    await prisma.$disconnect();
  });

  describe('Strategy Performance Testing', () => {
    it('should test Gemini URL-direct strategy across various sites', async () => {
      console.log('🚀 Testing Gemini URL-direct strategy...');
      
      const urlDirectTests = TEST_RECIPE_URLS.filter(
        test => test.expectedStrategy === ExtractionStrategy.URL_DIRECT
      );

      for (const testCase of urlDirectTests) {
        console.log(`🔍 Testing ${testCase.source} (${testCase.difficulty} complexity): ${testCase.url}`);
        
        const startTime = Date.now();
        
        try {
          const result = await extractRecipeViaOrchestrator(testCase.url, {
            forceStrategy: 'url-direct',
            userId: testUsers[0].id,
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
          
          // Verify analytics were recorded
          const analyticsEntry = await prisma.recipeExtractionAnalytics.findFirst({
            where: {
              url: testCase.url,
              userId: testUsers[0].id
            },
            orderBy: { createdAt: 'desc' }
          });
          
          expect(analyticsEntry).toBeDefined();
          expect(analyticsEntry?.strategy).toBe(ExtractionStrategy.URL_DIRECT);
          expect(analyticsEntry?.success).toBe(true);
          
        } catch (error) {
          console.log(`❌ ${testCase.source}: Failed - ${error}`);
          
          // Still verify analytics recorded the failure
          const analyticsEntry = await prisma.recipeExtractionAnalytics.findFirst({
            where: {
              url: testCase.url,
              userId: testUsers[0].id
            },
            orderBy: { createdAt: 'desc' }
          });
          
          expect(analyticsEntry).toBeDefined();
          expect(analyticsEntry?.success).toBe(false);
        }
        
        // Wait between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }, 300000); // 5 minute timeout for all URL-direct tests

    it('should test HTML fallback strategy for complex sites', async () => {
      console.log('🔄 Testing HTML fallback strategy...');
      
      const fallbackTests = TEST_RECIPE_URLS.filter(
        test => test.expectedStrategy === ExtractionStrategy.HTML_FALLBACK
      );

      for (const testCase of fallbackTests) {
        console.log(`🔍 Testing ${testCase.source} fallback: ${testCase.url}`);
        
        const startTime = Date.now();
        
        try {
          const result = await extractRecipeViaOrchestrator(testCase.url, {
            forceStrategy: 'html-fallback',
            userId: testUsers[1].id,
            analyticsEnabled: true
          });
          
          const duration = Date.now() - startTime;
          
          expect(result).toBeDefined();
          expect(result.title).toBeTruthy();
          
          console.log(`✅ ${testCase.source} fallback: Success in ${duration}ms`);
          console.log(`   Title: ${result.title}`);
          console.log(`   Token usage: ~${Math.ceil(JSON.stringify(result).length / 4)}`);
          
        } catch (error) {
          console.log(`❌ ${testCase.source} fallback: Failed - ${error}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }, 600000); // 10 minute timeout for fallback tests

    it('should test automatic strategy selection', async () => {
      console.log('🎯 Testing automatic strategy selection...');
      
      for (let i = 0; i < TEST_RECIPE_URLS.length; i++) {
        const testCase = TEST_RECIPE_URLS[i];
        const userId = testUsers[i % testUsers.length].id;
        
        console.log(`🤖 Auto-testing ${testCase.source}: ${testCase.url}`);
        
        try {
          const result = await extractRecipeViaOrchestrator(testCase.url, {
            userId,
            analyticsEnabled: true
          });
          
          expect(result).toBeDefined();
          
          // Check what strategy was actually used
          const analyticsEntry = await prisma.recipeExtractionAnalytics.findFirst({
            where: {
              url: testCase.url,
              userId
            },
            orderBy: { createdAt: 'desc' }
          });
          
          console.log(`✅ ${testCase.source}: Used ${analyticsEntry?.strategy} strategy`);
          
        } catch (error) {
          console.log(`❌ ${testCase.source}: Auto-extraction failed - ${error}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }, 900000); // 15 minute timeout for auto tests
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
      
      // Verify we have both successful and failed extractions
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
      
      // AI Provider breakdown
      const providerCounts = extractionMetrics.reduce((acc, metric) => {
        if (metric.aiProvider) {
          acc[metric.aiProvider] = (acc[metric.aiProvider] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
      
      console.log(`   AI Provider usage:`, providerCounts);
      
      // Performance metrics
      const avgProcessingTime = extractionMetrics.reduce((sum, m) => sum + (m.processingTimeMs || 0), 0) / extractionMetrics.length;
      const avgTokens = extractionMetrics.reduce((sum, m) => sum + (m.tokensUsed || 0), 0) / extractionMetrics.length;
      
      console.log(`   Avg processing time: ${avgProcessingTime.toFixed(0)}ms`);
      console.log(`   Avg tokens used: ${avgTokens.toFixed(0)}`);
      
      expect(extractionMetrics.length).toBeGreaterThanOrEqual(TEST_RECIPE_URLS.length);
    });

    it('should verify conversion tracking data', async () => {
      console.log('🎯 Verifying conversion tracking...');
      
      // Simulate some recipe saves (conversions)
      const successfulExtractions = await prisma.recipeExtractionAnalytics.findMany({
        where: {
          success: true,
          user: {
            isTestUser: true
          }
        },
        take: 5 // Convert about half of successful extractions
      });
      
      for (const extraction of successfulExtractions) {
        await analytics.trackConversion(extraction.userId, {
          extractionId: extraction.id,
          conversionType: 'recipe_saved',
          sourceUrl: extraction.url,
          extractionStrategy: extraction.strategy,
          metadata: {
            testData: true,
            extractionDuration: extraction.processingTimeMs
          }
        });
      }
      
      const conversions = await prisma.conversionTracking.findMany({
        where: {
          user: {
            isTestUser: true
          }
        }
      });
      
      console.log(`📊 Conversion Summary:`);
      console.log(`   Total conversions: ${conversions.length}`);
      console.log(`   Conversion rate: ${((conversions.length / successfulExtractions.length) * 100).toFixed(1)}%`);
      
      expect(conversions.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Benchmarking', () => {
    it('should compare URL-direct vs HTML fallback performance', async () => {
      console.log('⚡ Performance comparison test...');
      
      // Pick a reliable recipe URL for head-to-head comparison
      const testUrl = 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/';
      
      // Test URL-direct performance
      const urlDirectStart = Date.now();
      const urlDirectResult = await extractRecipeViaOrchestrator(testUrl, {
        forceStrategy: 'url-direct',
        userId: testUsers[0].id,
        analyticsEnabled: true
      });
      const urlDirectDuration = Date.now() - urlDirectStart;
      
      // Test HTML fallback performance
      const fallbackStart = Date.now();
      const fallbackResult = await extractRecipeViaOrchestrator(testUrl, {
        forceStrategy: 'html-fallback',
        userId: testUsers[1].id,
        analyticsEnabled: true
      });
      const fallbackDuration = Date.now() - fallbackStart;
      
      console.log(`⚡ Performance Comparison:`);
      console.log(`   URL-Direct: ${urlDirectDuration}ms`);
      console.log(`   HTML Fallback: ${fallbackDuration}ms`);
      console.log(`   Efficiency gain: ${((fallbackDuration - urlDirectDuration) / fallbackDuration * 100).toFixed(1)}%`);
      
      // Both should succeed
      expect(urlDirectResult).toBeDefined();
      expect(fallbackResult).toBeDefined();
      
      // URL-direct should be faster (usually)
      if (urlDirectDuration < fallbackDuration) {
        console.log(`✅ URL-direct was ${(fallbackDuration / urlDirectDuration).toFixed(1)}x faster`);
      } else {
        console.log(`⚠️ HTML fallback was faster (unusual but possible)`);
      }
    }, 120000); // 2 minute timeout
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