#!/usr/bin/env tsx

/**
 * Real Recipe Extraction Analytics Generator
 * 
 * This script actually calls the real recipe extraction endpoints to:
 * 1. Test system performance across different recipe sites
 * 2. Generate authentic analytics data for dashboard testing
 * 3. Validate both Gemini URL-direct and OpenAI fallback strategies
 * 4. Capture real timing, token usage, and cost data
 */

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Real recipe URLs from various sites with different complexity levels
const TEST_RECIPE_URLS = [
  // AllRecipes - Generally reliable for URL-direct
  {
    url: 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
    expectedStrategy: 'url-direct',
    difficulty: 'medium',
    source: 'allrecipes'
  },
  {
    url: 'https://www.allrecipes.com/recipe/280933/peach-stuffed-pork-chops/',
    expectedStrategy: 'url-direct',
    difficulty: 'medium', 
    source: 'allrecipes'
  },
  
  // Food Network - Higher complexity
  {
    url: 'https://www.foodnetwork.com/recipes/alton-brown/baked-mac-and-cheese-recipe-1939524',
    expectedStrategy: 'url-direct',
    difficulty: 'high',
    source: 'foodnetwork'
  },
  
  // Taste of Home - Medium complexity
  {
    url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
    expectedStrategy: 'url-direct',
    difficulty: 'medium',
    source: 'tasteofhome'
  },
  
  // King Arthur Baking - Usually reliable
  {
    url: 'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
    expectedStrategy: 'url-direct',
    difficulty: 'low',
    source: 'kingarthur'
  },
  
  // RecipeTin Eats - Simple structure
  {
    url: 'https://www.recipetineats.com/beef-stroganoff/',
    expectedStrategy: 'url-direct', 
    difficulty: 'low',
    source: 'recipetineats'
  },
  
  // NYTimes - Complex, likely to trigger fallback
  {
    url: 'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
    expectedStrategy: 'html-fallback',
    difficulty: 'very_high',
    source: 'nytimes'
  },
  
  // Bon Appétit - Complex, likely to trigger fallback
  {
    url: 'https://www.bonappetit.com/recipe/classic-chocolate-chip-cookies',
    expectedStrategy: 'html-fallback',
    difficulty: 'very_high', 
    source: 'bonappetit'
  }
];

// Test user for analytics
const TEST_USER_ID = 'test_analytics_real_extraction';

interface ExtractionResult {
  url: string;
  source: string;
  difficulty: string;
  success: boolean;
  strategy: string;
  duration: number;
  title?: string;
  ingredientCount?: number;
  stepCount?: number;
  error?: string;
}

async function setupTestUser(): Promise<void> {
  console.log('🧪 Setting up test user...');
  
  await prisma.user.upsert({
    where: { id: TEST_USER_ID },
    create: {
      id: TEST_USER_ID,
      email: 'test-real-analytics@testing.local',
      firstName: 'Analytics',
      lastName: 'Test'
    },
    update: {
      firstName: 'Analytics',
      lastName: 'Test'
    }
  });
  
  console.log(`✅ Test user ready: ${TEST_USER_ID}`);
}

async function callExtractionAPI(url: string): Promise<ExtractionResult> {
  const startTime = Date.now();
  
  console.log(`🔍 Extracting: ${url}`);
  
  try {
    // Call the actual streaming extraction endpoint
    const response = await fetch('http://localhost:3000/api/fetch-recipe-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        userId: TEST_USER_ID
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse the streaming response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';
    let lastProgressData: any = null;
    
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              lastProgressData = data;
              
              if (data.type === 'complete') {
                result = JSON.stringify(data);
                break;
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    }
    
    const duration = Date.now() - startTime;
    const parsedResult = lastProgressData;
    
    if (parsedResult?.type === 'complete' && parsedResult?.recipe) {
      const recipe = parsedResult.recipe;
      return {
        url,
        source: new URL(url).hostname.replace('www.', '').split('.')[0],
        difficulty: 'unknown',
        success: true,
        strategy: parsedResult.strategy || 'unknown',
        duration,
        title: recipe.title,
        ingredientCount: recipe.ingredients?.length || 0,
        stepCount: recipe.steps?.length || 0
      };
    } else {
      throw new Error('Extraction failed or incomplete');
    }
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Failed to extract ${url}:`, error);
    
    return {
      url,
      source: new URL(url).hostname.replace('www.', '').split('.')[0],
      difficulty: 'unknown',
      success: false,
      strategy: 'unknown',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function runExtractionTests(): Promise<ExtractionResult[]> {
  console.log('🚀 Starting real extraction tests...\n');
  
  const results: ExtractionResult[] = [];
  
  for (let i = 0; i < TEST_RECIPE_URLS.length; i++) {
    const testCase = TEST_RECIPE_URLS[i];
    
    console.log(`\n📊 Test ${i + 1}/${TEST_RECIPE_URLS.length}: ${testCase.source}`);
    console.log(`🔗 URL: ${testCase.url}`);
    console.log(`📈 Expected: ${testCase.expectedStrategy} (${testCase.difficulty} difficulty)`);
    
    const result = await callExtractionAPI(testCase.url);
    result.difficulty = testCase.difficulty;
    results.push(result);
    
    // Log result
    if (result.success) {
      console.log(`✅ SUCCESS: "${result.title}" (${result.strategy})`);
      console.log(`   📝 ${result.ingredientCount} ingredients, ${result.stepCount} steps`);
      console.log(`   ⏱️  ${result.duration}ms`);
    } else {
      console.log(`❌ FAILED: ${result.error}`);
      console.log(`   ⏱️  ${result.duration}ms`);
    }
    
    // Add delay between requests to be respectful to sites
    if (i < TEST_RECIPE_URLS.length - 1) {
      console.log('⏳ Waiting 3 seconds before next extraction...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  return results;
}

async function generateAnalyticsReport(results: ExtractionResult[]): Promise<void> {
  console.log('\n📊 ANALYTICS REPORT');
  console.log('==================\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => r.success === false);
  
  console.log(`📈 Overall Success Rate: ${successful.length}/${results.length} (${Math.round(successful.length / results.length * 100)}%)`);
  console.log(`⏱️  Average Duration: ${Math.round(results.reduce((sum, r) => sum + r.duration, 0) / results.length)}ms`);
  
  // Strategy breakdown
  const strategies: { [key: string]: { count: number; successes: number; avgDuration: number } } = {};
  
  for (const result of results) {
    if (!strategies[result.strategy]) {
      strategies[result.strategy] = { count: 0, successes: 0, avgDuration: 0 };
    }
    strategies[result.strategy].count++;
    if (result.success) strategies[result.strategy].successes++;
    strategies[result.strategy].avgDuration += result.duration;
  }
  
  console.log('\n🔧 Strategy Performance:');
  for (const [strategy, stats] of Object.entries(strategies)) {
    const successRate = Math.round(stats.successes / stats.count * 100);
    const avgDuration = Math.round(stats.avgDuration / stats.count);
    console.log(`   ${strategy}: ${stats.successes}/${stats.count} (${successRate}%) - ${avgDuration}ms avg`);
  }
  
  // Site difficulty analysis
  console.log('\n🌐 Site Difficulty Analysis:');
  const byDifficulty: { [key: string]: ExtractionResult[] } = {};
  
  for (const result of results) {
    if (!byDifficulty[result.difficulty]) {
      byDifficulty[result.difficulty] = [];
    }
    byDifficulty[result.difficulty].push(result);
  }
  
  for (const [difficulty, diffResults] of Object.entries(byDifficulty)) {
    const successes = diffResults.filter(r => r.success).length;
    const successRate = Math.round(successes / diffResults.length * 100);
    const avgDuration = Math.round(diffResults.reduce((sum, r) => sum + r.duration, 0) / diffResults.length);
    console.log(`   ${difficulty}: ${successes}/${diffResults.length} (${successRate}%) - ${avgDuration}ms avg`);
  }
  
  // Failed extractions
  if (failed.length > 0) {
    console.log('\n❌ Failed Extractions:');
    for (const failure of failed) {
      console.log(`   ${failure.source}: ${failure.error}`);
    }
  }
  
  // Successful extractions details
  if (successful.length > 0) {
    console.log('\n✅ Successful Extractions:');
    for (const success of successful) {
      console.log(`   ${success.source}: "${success.title}" (${success.strategy}, ${success.duration}ms)`);
    }
  }
}

async function checkAnalyticsData(): Promise<void> {
  console.log('\n🔍 Checking generated analytics data...');
  
  // Check extraction metrics
  const extractionMetrics = await prisma.recipeExtractionMetrics.findMany({
    where: { userId: TEST_USER_ID },
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  console.log(`📊 Found ${extractionMetrics.length} extraction metrics records`);
  
  if (extractionMetrics.length > 0) {
    console.log('\n📈 Recent extraction metrics:');
    for (const metric of extractionMetrics.slice(0, 3)) {
      console.log(`   ${metric.domain}: ${metric.primaryStrategy} - ${metric.extractionSuccess ? 'SUCCESS' : 'FAILED'}`);
      console.log(`      Duration: ${metric.totalDuration}ms, Tokens: ${metric.totalTokens}, Cost: $${metric.estimatedCost?.toFixed(4)}`);
    }
  }
  
  // Check if any recipes were saved
  const recipes = await prisma.recipe.findMany({
    where: { userId: TEST_USER_ID },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  
  console.log(`🍳 Found ${recipes.length} saved recipes`);
  
  if (recipes.length > 0) {
    console.log('\n🍳 Recent recipes:');
    for (const recipe of recipes.slice(0, 3)) {
      console.log(`   "${recipe.title}" - ${recipe.ingredients.length} ingredients, ${recipe.steps.length} steps`);
    }
  }
}

async function main(): Promise<void> {
  try {
    console.log('🧪 REAL RECIPE EXTRACTION ANALYTICS GENERATOR');
    console.log('==============================================\n');
    
    // Setup
    await setupTestUser();
    
    // Run real extractions
    const results = await runExtractionTests();
    
    // Generate report
    await generateAnalyticsReport(results);
    
    // Check database analytics
    await checkAnalyticsData();
    
    console.log('\n✅ Real extraction analytics generation complete!');
    console.log('📊 Check your admin analytics dashboard for the real data.');
    
  } catch (error) {
    console.error('❌ Error during analytics generation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Self-executing function
if (require.main === module) {
  main();
}

export { main as generateRealAnalytics }; 