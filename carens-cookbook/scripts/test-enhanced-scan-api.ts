import { categoryService, categoryResolver } from '../src/lib/categories';
import { PREDEFINED_CATEGORIES, AI_SUGGESTED_CATEGORIES } from '../src/lib/constants/categories';

async function testEnhancedScanAPI() {
  console.log('🧪 Testing Enhanced Scan-Recipe API Integration...\n');
  
  // Test the system prompt category generation
  console.log('📋 Testing AI prompt category generation:');
  console.log('─'.repeat(50));
  
  // Test without user (new user)
  const defaultAICategories = await categoryResolver.getAIPromptCategories();
  console.log(`Default AI categories (${defaultAICategories.length}):`, defaultAICategories.join(', '));
  
  // Test with mock user context
  const mockUserId = 'user_123';
  console.log(`\n👤 Testing with user context (${mockUserId}):`);
  
  try {
    const userAICategories = await categoryResolver.getAIPromptCategories(mockUserId);
    console.log(`User AI categories (${userAICategories.length}):`, userAICategories.join(', '));
  } catch (error) {
    console.log('Note: User does not exist in database (expected for test)');
  }

  // Test category resolution scenarios that would happen in scan-recipe API
  console.log('\n🔍 Testing category resolution scenarios:');
  console.log('─'.repeat(50));
  
  const testScenarios = [
    { category: 'Main Courses', expected: 'Should match to Beef or similar predefined category' },
    { category: 'Main Course', expected: 'Should match to Beef or similar predefined category' },
    { category: 'Bread', expected: 'Should semantically match to Breakfast or create new' },
    { category: 'Pasta', expected: 'Should exact match to Pasta' },
    { category: 'Italian Pasta', expected: 'Should fuzzy match to Pasta' },
    { category: 'Appetizers', expected: 'Should fuzzy match to Appetizer' },
    { category: 'Custom New Category', expected: 'Should create new category' }
  ];

  for (const scenario of testScenarios) {
    console.log(`\n🎯 Testing: "${scenario.category}"`);
    console.log(`Expected: ${scenario.expected}`);
    
    try {
      const analysis = await categoryService.findBestCategory(
        scenario.category,
        undefined, // No user context for this test
        { allowNewCategories: true, preferUserCategories: true }
      );
      
      if (analysis.bestMatch) {
        const matchType = analysis.bestMatch.isExact ? 'exact' : 
                         analysis.bestMatch.isFuzzy ? 'fuzzy' : 
                         analysis.bestMatch.isSemantic ? 'semantic' : 'unknown';
        console.log(`✅ Resolved to: "${analysis.bestMatch.category}" (${analysis.bestMatch.confidence.toFixed(2)} confidence, ${matchType} match)`);
      } else if (analysis.shouldCreateNew) {
        console.log(`🆕 Would create new category: "${scenario.category}"`);
      } else {
        console.log(`❌ No match found, would fallback to "Uncategorized"`);
      }
    } catch (error) {
      console.error(`❌ Error testing "${scenario.category}":`, error);
    }
  }

  // Test the complete API flow simulation
  console.log('\n🚀 Simulating complete API flow:');
  console.log('─'.repeat(50));
  
  // Simulate what happens when AI returns different categories
  const aiResponseCategories = ['Entrees', 'Main Dishes', 'Bread & Baking', 'Italian'];
  
  for (const aiCategory of aiResponseCategories) {
    console.log(`\n📥 AI returned category: "${aiCategory}"`);
    
    try {
      const analysis = await categoryService.findBestCategory(
        aiCategory,
        undefined,
        { allowNewCategories: true, preferUserCategories: true }
      );
      
      let finalCategory = aiCategory; // Default to AI suggestion
      let action = 'keep original';
      
      if (analysis.bestMatch) {
        finalCategory = analysis.bestMatch.category;
        const matchType = analysis.bestMatch.isExact ? 'exact' : 
                         analysis.bestMatch.isFuzzy ? 'fuzzy' : 
                         analysis.bestMatch.isSemantic ? 'semantic' : 'unknown';
        action = `resolve to "${finalCategory}" (${matchType}, ${analysis.bestMatch.confidence.toFixed(2)})`;
      } else if (analysis.shouldCreateNew) {
        action = 'create new category';
      } else {
        finalCategory = 'Uncategorized';
        action = 'fallback to Uncategorized';
      }
      
      console.log(`📤 Final category: "${finalCategory}" (${action})`);
    } catch (error) {
      console.error(`❌ Error processing "${aiCategory}":`, error);
    }
  }

  // Show the difference between predefined and AI categories
  console.log('\n📊 Category Configuration Summary:');
  console.log('─'.repeat(50));
  console.log(`Predefined UI categories: ${PREDEFINED_CATEGORIES.length}`);
  console.log(`AI suggested categories: ${AI_SUGGESTED_CATEGORIES.length}`);
  
  const inBoth = AI_SUGGESTED_CATEGORIES.filter(cat => (PREDEFINED_CATEGORIES as readonly string[]).includes(cat));
  const aiOnly = AI_SUGGESTED_CATEGORIES.filter(cat => !(PREDEFINED_CATEGORIES as readonly string[]).includes(cat));
  const uiOnly = PREDEFINED_CATEGORIES.filter(cat => !(AI_SUGGESTED_CATEGORIES as readonly string[]).includes(cat));
  
  console.log(`Categories in both: ${inBoth.length} (${inBoth.join(', ')})`);
  console.log(`AI-only categories: ${aiOnly.length} (${aiOnly.join(', ')})`);
  console.log(`UI-only categories: ${uiOnly.length} (${uiOnly.join(', ')})`);

  console.log('\n✅ Enhanced Scan-Recipe API integration testing complete!');
}

// Run the test
if (require.main === module) {
  testEnhancedScanAPI().catch(console.error);
}

export { testEnhancedScanAPI }; 