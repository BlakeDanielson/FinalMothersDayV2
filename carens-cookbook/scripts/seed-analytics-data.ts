import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Using string literals instead of enums to avoid import issues
type ExtractionStrategy = 'URL_DIRECT' | 'HTML_FALLBACK';
type AIProvider = 'OPENAI_MINI' | 'OPENAI_MAIN' | 'GEMINI_MAIN' | 'GEMINI_FLASH';

// Test recipe URLs with varying complexity and sources
const TEST_RECIPE_URLS = [
  // High-complexity sites (should test Gemini URL-direct resilience)
  {
    url: 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'high',
    source: 'allrecipes'
  },
  {
    url: 'https://www.foodnetwork.com/recipes/alton-brown/baked-mac-and-cheese-recipe-1939524',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'high',
    source: 'foodnetwork'
  },
  
  // Medium complexity sites
  {
    url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'medium',
    source: 'tasteofhome'
  },
  {
    url: 'https://www.epicurious.com/recipes/food/views/simple-chocolate-chip-cookies',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'medium',
    source: 'epicurious'
  },
  
  // Simpler sites (should work reliably with URL-direct)
  {
    url: 'https://www.recipetineats.com/beef-stroganoff/',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'low',
    source: 'recipetineats'
  },
  {
    url: 'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
    expectedStrategy: 'URL_DIRECT' as ExtractionStrategy,
    difficulty: 'low',
    source: 'kingarthur'
  },

  // Sites that might trigger HTML fallback
  {
    url: 'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
    expectedStrategy: 'HTML_FALLBACK' as ExtractionStrategy,
    difficulty: 'very_high',
    source: 'nytimes'
  },
  {
    url: 'https://www.bonappetit.com/recipe/classic-chocolate-chip-cookies',
    expectedStrategy: 'HTML_FALLBACK' as ExtractionStrategy,
    difficulty: 'very_high',
    source: 'bonappetit'
  }
];

// Test user IDs - these will be created as test users
const TEST_USER_IDS = [
  'test_user_analytics_1',
  'test_user_analytics_2',
  'test_user_analytics_3'
];

interface TestResult {
  url: string;
  source: string;
  difficulty: string;
  success: boolean;
  duration: number;
  strategy: ExtractionStrategy;
  error?: string;
  title?: string;
  ingredientCount?: number;
  stepCount?: number;
}

async function setupTestUsers() {
  console.log('🧪 Setting up test users...');
  
  for (const userId of TEST_USER_IDS) {
    await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: `test-${userId}@analytics-testing.local`,
        firstName: 'Test',
        lastName: `User ${userId.slice(-1)}`
      },
      update: {
        firstName: 'Test',
        lastName: `User ${userId.slice(-1)}`
      }
    });
    console.log(`✅ Created/updated test user: ${userId}`);
  }
}

async function createAnalyticsEntry(
  userId: string,
  url: string,
  strategy: ExtractionStrategy,
  success: boolean,
  duration: number,
  tokensUsed: number,
  error?: string
) {
  const domain = new URL(url).hostname.replace('www.', '');
  const aiProvider: AIProvider = strategy === 'URL_DIRECT' ? 'GEMINI_MAIN' : 'OPENAI_MAIN';
  
  // Calculate estimated cost based on realistic token usage
  const costs = {
    'GEMINI_MAIN': { input: 0.000125, output: 0.000375 },
    'OPENAI_MAIN': { input: 0.0025, output: 0.01 }
  };
  
  const promptTokens = strategy === 'HTML_FALLBACK' ? Math.floor(15000 + Math.random() * 10000) : Math.floor(100 + Math.random() * 100);
  const responseTokens = tokensUsed;
  const providerCosts = costs[aiProvider];
  const estimatedCost = ((promptTokens / 1000) * providerCosts.input) + ((responseTokens / 1000) * providerCosts.output);

  await prisma.recipeExtractionMetrics.create({
    data: {
      userId,
      recipeUrl: url,
      domain,
      primaryStrategy: strategy,
      aiProvider,
      fallbackUsed: strategy === 'HTML_FALLBACK',
      fallbackReason: strategy === 'HTML_FALLBACK' ? 'URL_DIRECT_TIMEOUT' : null,
      totalDuration: duration,
      aiProcessingDuration: Math.floor(duration * 0.8),
      htmlFetchDuration: strategy === 'HTML_FALLBACK' ? Math.floor(duration * 0.2) : null,
      promptTokens,
      responseTokens,
      totalTokens: promptTokens + responseTokens,
      extractionSuccess: success,
      validationErrors: error ? JSON.stringify([{ type: 'extraction_error', message: error }]) : null,
      missingFields: success ? [] : ['title', 'ingredients', 'steps'],
      completenessScore: success ? (0.8 + Math.random() * 0.2) : null,
      categoryConfidence: success ? (0.7 + Math.random() * 0.3) : null,
      hasStructuredData: Math.random() > 0.7,
      estimatedCost,
      wasOptimal: strategy === 'URL_DIRECT' && success,
      user: {
        connect: { clerkId: userId }
      }
    }
  });
}

async function simulateExtractionTest(url: string, userId: string, forceStrategy?: ExtractionStrategy): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    // Simulate different outcomes based on URL characteristics
    const isComplex = url.includes('nytimes') || url.includes('bonappetit');
    const shouldFail = Math.random() < (isComplex ? 0.3 : 0.1); // 30% failure for complex sites, 10% for others
    
    const strategy = forceStrategy || (isComplex ? 'HTML_FALLBACK' : 'URL_DIRECT');
    const baseDuration = strategy === 'HTML_FALLBACK' ? 15000 : 3000;
    const duration = baseDuration + Math.floor(Math.random() * 5000);
    
    if (shouldFail) {
      const error = 'Request timeout after retries';
      const tokensUsed = strategy === 'HTML_FALLBACK' ? 25000 : 150;
      
      // Record failed extraction
      await createAnalyticsEntry(userId, url, strategy, false, duration, tokensUsed, error);
      
      throw new Error(error);
    }
    
    // Record successful extraction
    const tokensUsed = strategy === 'HTML_FALLBACK' ? 
      Math.floor(1000 + Math.random() * 500) : 
      Math.floor(100 + Math.random() * 100);
    
    await createAnalyticsEntry(userId, url, strategy, true, duration, tokensUsed);
    
    // Simulate recipe data
    const mockRecipe = {
      title: `Test Recipe from ${url.split('/').pop()?.replace(/-/g, ' ') || 'unknown'}`,
      ingredients: Array.from({ length: Math.floor(5 + Math.random() * 10) }, (_, i) => `Ingredient ${i + 1}`),
      steps: Array.from({ length: Math.floor(3 + Math.random() * 7) }, (_, i) => `Step ${i + 1}`)
    };
    
    return {
      url,
      source: url.split('.')[1],
      difficulty: isComplex ? 'very_high' : 'medium',
      success: true,
      duration,
      strategy,
      title: mockRecipe.title,
      ingredientCount: mockRecipe.ingredients.length,
      stepCount: mockRecipe.steps.length
    };
    
  } catch (error) {
    return {
      url,
      source: url.split('.')[1],
      difficulty: 'high',
      success: false,
      duration: Date.now() - startTime,
      strategy: forceStrategy || 'URL_DIRECT',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function seedAnalyticsData() {
  console.log('🌱 Starting analytics data seeding...');
  
  const results: TestResult[] = [];
  
  // Test each URL with different strategies and users
  for (let i = 0; i < TEST_RECIPE_URLS.length; i++) {
    const testCase = TEST_RECIPE_URLS[i];
    const userId = TEST_USER_IDS[i % TEST_USER_IDS.length];
    
    console.log(`\n🔍 Testing ${testCase.source} (${testCase.difficulty}): ${testCase.url}`);
    
    // Test with auto strategy selection
    console.log('  📊 Auto strategy...');
    const autoResult = await simulateExtractionTest(testCase.url, userId);
    results.push(autoResult);
    
    if (autoResult.success) {
      console.log(`  ✅ Success in ${autoResult.duration}ms - ${autoResult.strategy}`);
      console.log(`     Title: ${autoResult.title}`);
      console.log(`     Ingredients: ${autoResult.ingredientCount}, Steps: ${autoResult.stepCount}`);
    } else {
      console.log(`  ❌ Failed: ${autoResult.error}`);
    }
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test with forced URL-direct (if not already used)
    if (autoResult.strategy !== 'URL_DIRECT') {
      console.log('  🎯 Forcing URL-direct...');
      const urlDirectResult = await simulateExtractionTest(testCase.url, userId, 'URL_DIRECT');
      results.push(urlDirectResult);
      
      if (urlDirectResult.success) {
        console.log(`  ✅ URL-direct success in ${urlDirectResult.duration}ms`);
      } else {
        console.log(`  ❌ URL-direct failed: ${urlDirectResult.error}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Occasionally test HTML fallback
    if (i % 3 === 0) {
      console.log('  🔄 Testing HTML fallback...');
      const fallbackResult = await simulateExtractionTest(testCase.url, userId, 'HTML_FALLBACK');
      results.push(fallbackResult);
      
      if (fallbackResult.success) {
        console.log(`  ✅ Fallback success in ${fallbackResult.duration}ms`);
      } else {
        console.log(`  ❌ Fallback failed: ${fallbackResult.error}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

async function simulateConversions() {
  console.log('\n🎯 Simulating conversion tracking...');
  
  // Get successful extractions
  const successfulExtractions = await prisma.recipeExtractionMetrics.findMany({
    where: {
      extractionSuccess: true,
      user: {
        isTestUser: true
      }
    },
    take: 10 // Convert about half
  });
  
  for (const extraction of successfulExtractions) {
    // Simulate some conversions (about 60% conversion rate)
    if (Math.random() < 0.6) {
      await prisma.conversionTracking.create({
        data: {
          userId: extraction.userId,
          extractionId: extraction.id,
          conversionType: 'recipe_saved',
          sourceUrl: extraction.recipeUrl,
          extractionStrategy: extraction.primaryStrategy,
          metadata: {
            testData: true,
            extractionDuration: extraction.totalDuration
          },
          user: {
            connect: { clerkId: extraction.userId }
          }
        }
      });
      
      console.log(`✅ Conversion tracked for ${extraction.recipeUrl}`);
    }
  }
}

async function generateAnalyticsReport() {
  console.log('\n📊 Generating analytics report...');
  
  const extractionMetrics = await prisma.recipeExtractionMetrics.findMany({
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

  const successfulExtractions = extractionMetrics.filter(m => m.extractionSuccess);
  const failedExtractions = extractionMetrics.filter(m => !m.extractionSuccess);

  const strategyCounts = extractionMetrics.reduce((acc: Record<string, number>, metric) => {
    acc[metric.primaryStrategy] = (acc[metric.primaryStrategy] || 0) + 1;
    return acc;
  }, {});

  const providerCounts = extractionMetrics.reduce((acc: Record<string, number>, metric) => {
    acc[metric.aiProvider] = (acc[metric.aiProvider] || 0) + 1;
    return acc;
  }, {});

  const avgProcessingTime = extractionMetrics.reduce((sum, m) => sum + m.totalDuration, 0) / extractionMetrics.length;
  const avgTokens = extractionMetrics.reduce((sum, m) => sum + (m.totalTokens || 0), 0) / extractionMetrics.length;

  const report = {
    totalExtractions: extractionMetrics.length,
    successfulExtractions: successfulExtractions.length,
    failedExtractions: failedExtractions.length,
    successRate: `${((successfulExtractions.length / extractionMetrics.length) * 100).toFixed(1)}%`,
    totalConversions: conversions.length,
    conversionRate: successfulExtractions.length > 0 ? `${((conversions.length / successfulExtractions.length) * 100).toFixed(1)}%` : '0%',
    strategyCounts,
    providerCounts,
    avgProcessingTime: Math.round(avgProcessingTime),
    avgTokensUsed: Math.round(avgTokens)
  };

  console.log('\n📈 Analytics Report:');
  console.log('==================');
  console.log(`Total Extractions: ${report.totalExtractions}`);
  console.log(`Successful: ${report.successfulExtractions} (${report.successRate})`);
  console.log(`Failed: ${report.failedExtractions}`);
  console.log(`Conversions: ${report.totalConversions} (${report.conversionRate})`);
  console.log(`\nStrategy Usage:`);
  Object.entries(report.strategyCounts).forEach(([strategy, count]) => {
    console.log(`  ${strategy}: ${count}`);
  });
  console.log(`\nAI Provider Usage:`);
  Object.entries(report.providerCounts).forEach(([provider, count]) => {
    console.log(`  ${provider}: ${count}`);
  });
  console.log(`\nPerformance:`);
  console.log(`  Avg Processing Time: ${report.avgProcessingTime}ms`);
  console.log(`  Avg Tokens Used: ${report.avgTokensUsed}`);

  return report;
}

async function main() {
  try {
    console.log('🚀 Starting Recipe Extraction Analytics Data Seeding');
    console.log('==================================================\n');
    
    // Setup
    await setupTestUsers();
    
    // Seed data
    const results = await seedAnalyticsData();
    
    // Simulate conversions
    await simulateConversions();
    
    // Generate report
    const report = await generateAnalyticsReport();
    
    console.log('\n✅ Data seeding complete!');
    console.log(`Generated ${report.totalExtractions} extraction records and ${report.totalConversions} conversion records.`);
    console.log('\n💡 You can now:');
    console.log('  1. View analytics dashboard at /admin/analytics');
    console.log('  2. Test with real URLs using the seeded framework');
    console.log('  3. Analyze performance patterns before user testing');
    
  } catch (error) {
    console.error('❌ Error during data seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { main as seedAnalyticsData, generateAnalyticsReport }; 