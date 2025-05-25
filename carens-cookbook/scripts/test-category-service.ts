import { CategoryService } from '../src/lib/categories';

async function testCategoryService() {
  console.log('🧪 Testing CategoryService with current orphaned categories...\n');
  
  const categoryService = new CategoryService();
  
  // Test cases based on our audit findings
  const testCategories = [
    'Main Courses',  // Should match to existing predefined categories
    'Main Course',   // Should match to existing predefined categories  
    'Bread',         // Should find semantic match
    'Pasta'          // Should be exact match
  ];

  for (const testCategory of testCategories) {
    console.log(`\n🔍 Testing category: "${testCategory}"`);
    console.log('─'.repeat(50));
    
    try {
      const analysis = await categoryService.findBestCategory(testCategory);
      
      console.log(`Best Match: ${analysis.bestMatch?.category || 'None'}`);
      console.log(`Confidence: ${analysis.bestMatch?.confidence.toFixed(2) || 'N/A'}`);
      console.log(`Match Type: ${analysis.bestMatch?.isExact ? 'Exact' : analysis.bestMatch?.isFuzzy ? 'Fuzzy' : analysis.bestMatch?.isSemantic ? 'Semantic' : 'None'}`);
      console.log(`Should Create New: ${analysis.shouldCreateNew}`);
      console.log(`Normalized: ${analysis.normalizedCategory}`);
      
      if (analysis.suggestions.length > 1) {
        console.log('\nOther suggestions:');
        analysis.suggestions.slice(1, 4).forEach((suggestion, index) => {
          console.log(`  ${index + 2}. ${suggestion.category} (${suggestion.confidence.toFixed(2)})`);
        });
      }
      
    } catch (error) {
      console.error(`❌ Error testing "${testCategory}":`, error);
    }
  }

  // Test user-specific categories
  console.log('\n\n👤 Testing with user context...');
  console.log('═'.repeat(50));
  
  try {
    // Get user categories (we know there's one user from audit)
    const userCategories = await categoryService.getUserCategories('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ'); // Replace with actual user ID if known
    console.log(`User categories: ${userCategories.join(', ') || 'None found'}`);
    
    const displayCategories = await categoryService.getDisplayCategories('user_2nJJJJJJJJJJJJJJJJJJJJJJJJ');
    console.log(`Display categories: ${displayCategories.join(', ')}`);
    
  } catch (error) {
    console.log('Note: Could not test user-specific functionality (user ID unknown)');
  }

  // Test semantic mappings
  console.log('\n\n🧠 Testing semantic mappings...');
  console.log('═'.repeat(50));
  
  const semanticTests = [
    'beverages',    // Should match to 'Drinks' or 'Beverage'
    'meat',         // Should match to 'Beef', 'Chicken', etc.
    'veggies',      // Should match to 'Vegetable'
    'starter',      // Should match to 'Appetizer'
    'entree'        // Should match to main course categories
  ];

  for (const semantic of semanticTests) {
    try {
      const analysis = await categoryService.findBestCategory(semantic);
      console.log(`"${semantic}" → ${analysis.bestMatch?.category || 'No match'} (${analysis.bestMatch?.confidence.toFixed(2) || 'N/A'})`);
    } catch (error) {
      console.error(`Error testing "${semantic}":`, error);
    }
  }

  console.log('\n✅ CategoryService testing complete!');
}

// Run the test
if (require.main === module) {
  testCategoryService().catch(console.error);
}

export { testCategoryService }; 