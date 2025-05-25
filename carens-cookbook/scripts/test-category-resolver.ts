import { CategoryResolver, categoryResolver } from '../src/lib/categories';
import { PREDEFINED_CATEGORIES, CategoryUtils } from '../src/lib/constants/categories';

async function testCategoryResolver() {
  console.log('🧪 Testing CategoryResolver with centralized category system...\n');
  
  // Test default categories
  console.log('📋 Testing default categories:');
  console.log('─'.repeat(50));
  const defaultCategories = categoryResolver.getDefaultCategories();
  console.log(`Default categories (${defaultCategories.length}):`, defaultCategories.join(', '));
  
  // Test predefined category checking
  console.log('\n🔍 Testing predefined category checking:');
  console.log('─'.repeat(50));
  const testCategories = ['Pasta', 'Main Courses', 'Bread', 'Custom Category'];
  for (const category of testCategories) {
    const isPredefined = CategoryUtils.isPredefined(category);
    console.log(`"${category}": ${isPredefined ? '✅ Predefined' : '❌ Custom'}`);
  }

  // Test category utilities
  console.log('\n🛠️ Testing category utilities:');
  console.log('─'.repeat(50));
  
  // Test alias finding
  const aliasTests = ['starter', 'meat', 'beverages', 'veggies'];
  for (const alias of aliasTests) {
    const found = CategoryUtils.findByAlias(alias);
    console.log(`Alias "${alias}" → ${found || 'Not found'}`);
  }

  // Test normalization
  console.log('\n📝 Testing normalization:');
  const normalizationTests = ['Main Courses', 'PASTA!!!', '  Beef  ', 'Vegetables'];
  for (const test of normalizationTests) {
    const normalized = CategoryUtils.normalize(test);
    console.log(`"${test}" → "${normalized}"`);
  }

  // Test with mock user data (if we can get a real user ID)
  console.log('\n👤 Testing user-specific functionality:');
  console.log('─'.repeat(50));
  
  try {
    // Try to get actual user categories from database
    const userCategories = await categoryResolver.getUserCategories('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
    console.log(`User categories: ${userCategories.join(', ') || 'None found'}`);
    
    if (userCategories.length > 0) {
      const visibleCategories = await categoryResolver.getVisibleCategories('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
      console.log(`Visible categories: ${visibleCategories.join(', ')}`);
      
      const hasRecipes = await categoryResolver.hasRecipes('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
      console.log(`User has recipes: ${hasRecipes}`);
      
      if (hasRecipes) {
        const stats = await categoryResolver.getCategoryStats('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
        console.log('Category statistics:');
        stats.forEach(stat => {
          console.log(`  ${stat.category}: ${stat.count} recipe${stat.count !== 1 ? 's' : ''}`);
        });
      }
    }
  } catch (error) {
    console.log('Note: Could not test with real user data (user ID unknown or database issue)');
    console.log('Testing with mock scenarios instead...');
    
    // Test new user scenario
    console.log('\n🆕 New user scenario:');
    console.log('For a new user with no recipes, should show all predefined categories');
    console.log(`Expected: ${PREDEFINED_CATEGORIES.length} categories`);
  }

  // Test AI prompt categories
  console.log('\n🤖 Testing AI prompt categories:');
  console.log('─'.repeat(50));
  
  try {
    const aiCategories = await categoryResolver.getAIPromptCategories();
    console.log(`AI categories (no user): ${aiCategories.join(', ')}`);
    
    const aiCategoriesWithUser = await categoryResolver.getAIPromptCategories('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
    console.log(`AI categories (with user): ${aiCategoriesWithUser.join(', ')}`);
  } catch (error) {
    console.log('Could not test AI prompt categories with user context');
  }

  // Test core categories
  console.log('\n⭐ Testing core categories:');
  console.log('─'.repeat(50));
  const coreCategories = CategoryUtils.getCoreCategories();
  console.log(`Core categories (${coreCategories.length}): ${coreCategories.join(', ')}`);

  console.log('\n✅ CategoryResolver testing complete!');
}

// Run the test
if (require.main === module) {
  testCategoryResolver().catch(console.error);
}

export { testCategoryResolver }; 