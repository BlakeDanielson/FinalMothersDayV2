import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Test recipe URLs for seeding
const TEST_RECIPE_URLS = [
  'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
  'https://www.foodnetwork.com/recipes/alton-brown/baked-mac-and-cheese-recipe-1939524',
  'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
  'https://www.epicurious.com/recipes/food/views/simple-chocolate-chip-cookies',
  'https://www.recipetineats.com/beef-stroganoff/',
  'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
  'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
  'https://www.bonappetit.com/recipe/classic-chocolate-chip-cookies'
];

// Test user IDs
const TEST_USER_IDS = [
  'test_user_analytics_1',
  'test_user_analytics_2', 
  'test_user_analytics_3'
];

async function setupTestUsers() {
  console.log('🧪 Setting up test users...');
  
  for (const userId of TEST_USER_IDS) {
    try {
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
    } catch (error) {
      console.log(`⚠️ User ${userId} might already exist, continuing...`);
    }
  }
}

async function createAnalyticsEntry(
  userId: string,
  url: string,
  strategy: 'URL_DIRECT' | 'HTML_FALLBACK',
  success: boolean,
  duration: number
) {
  const domain = new URL(url).hostname.replace('www.', '');
  
  const promptTokens = strategy === 'HTML_FALLBACK' ? Math.floor(15000 + Math.random() * 10000) : Math.floor(100 + Math.random() * 100);
  const responseTokens = Math.floor(100 + Math.random() * 900);
  
  // Calculate estimated cost
  const costs = strategy === 'HTML_FALLBACK' ? 
    { input: 0.0025, output: 0.01 } : 
    { input: 0.000125, output: 0.000375 };
  
  const estimatedCost = ((promptTokens / 1000) * costs.input) + ((responseTokens / 1000) * costs.output);

  await prisma.recipeExtractionMetrics.create({
    data: {
      userId,
      recipeUrl: url,
      domain,
      primaryStrategy: strategy,
      aiProvider: strategy === 'URL_DIRECT' ? 'GEMINI_MAIN' : 'OPENAI_MAIN',
      fallbackUsed: strategy === 'HTML_FALLBACK',
      fallbackReason: strategy === 'HTML_FALLBACK' ? 'URL_DIRECT_TIMEOUT' : null,
      totalDuration: duration,
      aiProcessingDuration: Math.floor(duration * 0.8),
      htmlFetchDuration: strategy === 'HTML_FALLBACK' ? Math.floor(duration * 0.2) : null,
      promptTokens,
      responseTokens,
      totalTokens: promptTokens + responseTokens,
      extractionSuccess: success,
      validationErrors: null,
      missingFields: success ? [] : ['title', 'ingredients', 'steps'],
      completenessScore: success ? (0.8 + Math.random() * 0.2) : null,
      categoryConfidence: success ? (0.7 + Math.random() * 0.3) : null,
      hasStructuredData: Math.random() > 0.7,
      estimatedCost,
      wasOptimal: strategy === 'URL_DIRECT' && success,
      user: {
        connect: { id: userId }
      }
    }
  });
}

async function simulateExtractions() {
  console.log('🎯 Simulating recipe extractions...');
  
  for (const userId of TEST_USER_IDS) {
    for (const url of TEST_RECIPE_URLS) {
      // Determine strategy based on URL complexity
      const isComplex = url.includes('nytimes') || url.includes('bonappetit');
      const strategy = isComplex ? 'HTML_FALLBACK' : 'URL_DIRECT';
      
      // Simulate outcomes
      const shouldFail = Math.random() < (isComplex ? 0.3 : 0.1);
      const success = !shouldFail;
      
      const baseDuration = strategy === 'HTML_FALLBACK' ? 15000 : 3000;
      const duration = baseDuration + Math.floor(Math.random() * 5000);
      
      await createAnalyticsEntry(userId, url, strategy, success, duration);
      
      // Add some delay to make it realistic
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`✅ Created analytics entries for ${TEST_USER_IDS.length} users across ${TEST_RECIPE_URLS.length} URLs`);
}

async function generateReport() {
  console.log('\n📊 Analytics Report:');
  
  const totalExtractions = await prisma.recipeExtractionMetrics.count();
  const successfulExtractions = await prisma.recipeExtractionMetrics.count({
    where: { extractionSuccess: true }
  });
  
  const avgDuration = await prisma.recipeExtractionMetrics.aggregate({
    _avg: { totalDuration: true }
  });
  
  const strategyBreakdown = await prisma.recipeExtractionMetrics.groupBy({
    by: ['primaryStrategy'],
    _count: { primaryStrategy: true }
  });
  
  console.log(`Total extractions: ${totalExtractions}`);
  console.log(`Successful extractions: ${successfulExtractions} (${Math.round(successfulExtractions / totalExtractions * 100)}%)`);
  console.log(`Average duration: ${Math.round(avgDuration._avg.totalDuration || 0)}ms`);
  
  console.log('\nStrategy breakdown:');
  strategyBreakdown.forEach(item => {
    console.log(`  ${item.primaryStrategy}: ${item._count.primaryStrategy} extractions`);
  });
}

async function main() {
  try {
    console.log('🚀 Starting analytics data seeding...\n');
    
    await setupTestUsers();
    await simulateExtractions();
    await generateReport();
    
    console.log('\n✨ Analytics seeding completed successfully!');
    console.log('🔍 Check your analytics dashboard at: http://localhost:3000/admin/analytics');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 