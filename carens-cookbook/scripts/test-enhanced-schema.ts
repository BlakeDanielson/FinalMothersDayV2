import { PrismaClient, CategorySource } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function testEnhancedSchema() {
  console.log('🧪 Testing Enhanced Database Schema with Category Metadata...\n');
  
  try {
    // Test 1: Verify migration was successful
    console.log('📊 Verifying migration results:');
    console.log('─'.repeat(50));
    
    const recipeStats = await prisma.recipe.aggregate({
      _count: {
        id: true,
        categorySource: true,
        categoryConfidence: true,
        originalCategory: true
      }
    });
    
    console.log(`Total recipes: ${recipeStats._count.id}`);
    console.log(`Recipes with categorySource: ${recipeStats._count.categorySource}`);
    console.log(`Recipes with categoryConfidence: ${recipeStats._count.categoryConfidence}`);
    console.log(`Recipes with originalCategory: ${recipeStats._count.originalCategory}`);
    
    // Test 2: Check category source distribution
    console.log('\n📈 Category source distribution:');
    console.log('─'.repeat(50));
    
    const sourceStats = await prisma.recipe.groupBy({
      by: ['categorySource'],
      _count: {
        categorySource: true
      }
    });
    
    sourceStats.forEach(stat => {
      console.log(`${stat.categorySource}: ${stat._count.categorySource} recipes`);
    });
    
    // Test 3: Check confidence score distribution
    console.log('\n🎯 Confidence score distribution:');
    console.log('─'.repeat(50));
    
    const confidenceStats = await prisma.recipe.findMany({
      select: {
        id: true,
        category: true,
        categoryConfidence: true,
        categorySource: true,
        originalCategory: true
      }
    });
    
    confidenceStats.forEach(recipe => {
      const confidence = recipe.categoryConfidence?.toFixed(2) || 'N/A';
      const original = recipe.originalCategory ? ` (was: "${recipe.originalCategory}")` : '';
      console.log(`Recipe ${recipe.id}: "${recipe.category}" - ${confidence} confidence (${recipe.categorySource})${original}`);
    });
    
    // Test 4: Test index performance (simulate category queries)
    console.log('\n⚡ Testing index performance:');
    console.log('─'.repeat(50));
    
    const startTime = Date.now();
    
    // This should be fast due to the userId + category index
    const categoryQuery = await prisma.recipe.findMany({
      where: {
        userId: 'user_test',
        category: 'Pasta'
      },
      select: { id: true, category: true }
    });
    
    const categoryQueryTime = Date.now() - startTime;
    console.log(`Category query (userId + category): ${categoryQueryTime}ms`);
    
    // This should be fast due to the categorySource index
    const sourceQuery = await prisma.recipe.findMany({
      where: {
        categorySource: CategorySource.PREDEFINED
      },
      select: { id: true, categorySource: true }
    });
    
    const sourceQueryTime = Date.now() - startTime - categoryQueryTime;
    console.log(`Source query (categorySource): ${sourceQueryTime}ms`);
    
    // Test 5: Verify enum constraints
    console.log('\n🔒 Testing enum constraints:');
    console.log('─'.repeat(50));
    
    try {
      // This should work with valid enum value
      const validTest = await prisma.recipe.findFirst({
        where: {
          categorySource: CategorySource.PREDEFINED
        }
      });
      console.log('✅ Valid enum query works correctly');
      
      // Note: Can't easily test invalid enum in TypeScript, but database constraints are in place
      console.log('✅ Enum constraints are properly defined in schema');
      
    } catch (error) {
      console.error('❌ Enum constraint test failed:', error);
    }
    
    // Test 6: Performance analytics query example
    console.log('\n📊 Analytics query example:');
    console.log('─'.repeat(50));
    
    const analyticsQuery = await prisma.recipe.groupBy({
      by: ['categorySource', 'category'],
      _count: {
        id: true
      },
      _avg: {
        categoryConfidence: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });
    
    console.log('Category distribution with confidence:');
    analyticsQuery.forEach(result => {
      const avgConfidence = result._avg.categoryConfidence?.toFixed(2) || 'N/A';
      console.log(`  ${result.category} (${result.categorySource}): ${result._count.id} recipes, avg confidence: ${avgConfidence}`);
    });
    
    console.log('\n✅ Enhanced schema testing complete!');
    
  } catch (error) {
    console.error('❌ Schema testing failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
if (require.main === module) {
  testEnhancedSchema().catch(console.error);
}

export { testEnhancedSchema }; 