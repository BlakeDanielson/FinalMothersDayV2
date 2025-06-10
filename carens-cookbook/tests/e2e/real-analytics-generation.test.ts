import { test, expect } from '@playwright/test';
import { PrismaClient } from '../../src/generated/prisma';

const prisma = new PrismaClient();

// Test recipes from different sites with varying complexity
const TEST_RECIPES = [
  {
    url: 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
    source: 'allrecipes',
    expectedStrategy: 'url-direct',
    difficulty: 'medium'
  },
  {
    url: 'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
    source: 'kingarthur',
    expectedStrategy: 'url-direct', 
    difficulty: 'low'
  },
  {
    url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
    source: 'tasteofhome',
    expectedStrategy: 'url-direct',
    difficulty: 'medium'
  }
];

const TEST_USER_ID = 'test_real_analytics_playwright';

test.describe('Real Analytics Generation', () => {
  let baseURL: string;

  test.beforeAll(async () => {
    baseURL = process.env.BASE_URL || 'http://localhost:3000';
    
    // Setup test user
    await prisma.user.upsert({
      where: { id: TEST_USER_ID },
      create: {
        id: TEST_USER_ID,
        email: 'test-real-analytics-playwright@testing.local',
        firstName: 'Real',
        lastName: 'Analytics'
      },
      update: {
        firstName: 'Real',
        lastName: 'Analytics'
      }
    });
  });

  test.afterAll(async () => {
    // Cleanup: Remove test data
    await prisma.recipeExtractionMetrics.deleteMany({
      where: { userId: TEST_USER_ID }
    });
    
    await prisma.recipe.deleteMany({
      where: { userId: TEST_USER_ID }
    });
    
    await prisma.user.delete({
      where: { id: TEST_USER_ID }
    }).catch(() => {
      // User might not exist, ignore error
    });
    
    await prisma.$disconnect();
  });

  for (const testRecipe of TEST_RECIPES) {
    test(`Extract real analytics data from ${testRecipe.source}`, async ({ request }) => {
      console.log(`🔍 Testing extraction from: ${testRecipe.url}`);
      
      const startTime = Date.now();
      
      // Make actual API call to extraction endpoint
      const response = await request.post(`${baseURL}/api/fetch-recipe-stream`, {
        data: {
          url: testRecipe.url,
          userId: TEST_USER_ID
        }
      });
      
      const duration = Date.now() - startTime;
      console.log(`⏱️  Request completed in ${duration}ms`);
      
      // Verify response
      expect(response.ok()).toBe(true);
      
      // Parse streaming response
      const body = await response.text();
      const lines = body.split('\n');
      
      let finalResult: any = null;
      let strategy: string = 'unknown';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'success') {
              finalResult = data;
              strategy = data.optimization?.strategy || 'unknown';
              break;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
      
      // Verify extraction was successful
      expect(finalResult).toBeTruthy();
      expect(finalResult.recipe).toBeTruthy();
      expect(finalResult.recipe.title).toBeTruthy();
      expect(finalResult.recipe.ingredients).toBeTruthy();
      expect(finalResult.recipe.steps).toBeTruthy();
      
      console.log(`✅ Successfully extracted: "${finalResult.recipe.title}"`);
      console.log(`🔧 Strategy used: ${strategy}`);
      console.log(`📊 ${finalResult.recipe.ingredients.length} ingredients, ${finalResult.recipe.steps.length} steps`);
      
      // Wait a moment for database to be populated
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify analytics data was recorded
      const extractionMetrics = await prisma.recipeExtractionMetrics.findMany({
        where: {
          userId: TEST_USER_ID,
          recipeUrl: testRecipe.url
        },
        orderBy: { createdAt: 'desc' },
        take: 1
      });
      
      expect(extractionMetrics.length).toBeGreaterThan(0);
      
      const metric = extractionMetrics[0];
      expect(metric.extractionSuccess).toBe(true);
      expect(metric.primaryStrategy).toBeTruthy();
      expect(metric.totalDuration).toBeGreaterThan(0);
      expect(metric.domain).toBe(testRecipe.source);
      
      console.log(`📈 Analytics recorded - Strategy: ${metric.primaryStrategy}, Duration: ${metric.totalDuration}ms`);
      
      // Verify recipe was saved
      const savedRecipes = await prisma.recipe.findMany({
        where: {
          userId: TEST_USER_ID,
          title: finalResult.recipe.title
        }
      });
      
      expect(savedRecipes.length).toBeGreaterThan(0);
      
      const savedRecipe = savedRecipes[0];
      expect(savedRecipe.ingredients.length).toBeGreaterThan(0);
      expect(savedRecipe.steps.length).toBeGreaterThan(0);
      
      console.log(`🍳 Recipe saved to database with ID: ${savedRecipe.id}`);
    });
  }

  test('Verify analytics dashboard can display real data', async ({ page }) => {
    // Navigate to analytics dashboard (assumes admin route exists)
    await page.goto(`${baseURL}/admin/analytics`);
    
    // Wait for data to load
    await page.waitForTimeout(2000);
    
    // Check for analytics components (these may vary based on your dashboard implementation)
    const pageContent = await page.textContent('body');
    
    // Verify dashboard loads successfully
    expect(pageContent).toBeTruthy();
    
    // Look for analytics-related content
    const hasAnalyticsContent = 
      pageContent!.includes('extraction') ||
      pageContent!.includes('success') ||
      pageContent!.includes('strategy') ||
      pageContent!.includes('token') ||
      pageContent!.includes('metrics');
    
    expect(hasAnalyticsContent).toBe(true);
    
    console.log('✅ Analytics dashboard loaded successfully with real data');
  });

  test('Verify analytics aggregation functions work with real data', async () => {
    // Test analytics aggregation with real data
    const totalExtractions = await prisma.recipeExtractionMetrics.count({
      where: { userId: TEST_USER_ID }
    });
    
    expect(totalExtractions).toBeGreaterThan(0);
    
    const successfulExtractions = await prisma.recipeExtractionMetrics.count({
      where: {
        userId: TEST_USER_ID,
        extractionSuccess: true
      }
    });
    
    expect(successfulExtractions).toBeGreaterThan(0);
    
    // Calculate success rate
    const successRate = (successfulExtractions / totalExtractions) * 100;
    console.log(`📊 Success rate: ${successRate.toFixed(1)}% (${successfulExtractions}/${totalExtractions})`);
    
    // Test strategy distribution
    const strategyStats = await prisma.recipeExtractionMetrics.groupBy({
      by: ['primaryStrategy'],
      where: { userId: TEST_USER_ID },
      _count: {
        id: true
      },
      _avg: {
        totalDuration: true,
        totalTokens: true,
        estimatedCost: true
      }
    });
    
    expect(strategyStats.length).toBeGreaterThan(0);
    
    console.log('🔧 Strategy Performance:');
    for (const stat of strategyStats) {
      console.log(`   ${stat.primaryStrategy}: ${stat._count.id} extractions`);
      console.log(`      Avg Duration: ${Math.round(stat._avg.totalDuration || 0)}ms`);
      console.log(`      Avg Tokens: ${Math.round(stat._avg.totalTokens || 0)}`);
      console.log(`      Avg Cost: $${(stat._avg.estimatedCost || 0).toFixed(4)}`);
    }
    
    // Test domain performance
    const domainStats = await prisma.recipeExtractionMetrics.groupBy({
      by: ['domain'],
      where: { userId: TEST_USER_ID },
      _count: {
        id: true
      },
      _avg: {
        totalDuration: true
      }
    });
    
    expect(domainStats.length).toBeGreaterThan(0);
    
    console.log('🌐 Domain Performance:');
    for (const stat of domainStats) {
      console.log(`   ${stat.domain}: ${stat._count.id} extractions, ${Math.round(stat._avg.totalDuration || 0)}ms avg`);
    }
  });
}); 