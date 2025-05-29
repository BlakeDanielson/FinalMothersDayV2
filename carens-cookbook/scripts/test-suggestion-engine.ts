#!/usr/bin/env tsx

import { PrismaClient } from '../src/generated/prisma';
import { CategorySuggestionEngine } from '../src/lib/services/CategorySuggestionEngine';

const prisma = new PrismaClient();

// Test recipes with expected categories
const TEST_RECIPES = [
  {
    title: "Classic Spaghetti Carbonara",
    ingredients: ["spaghetti", "eggs", "parmesan cheese", "pancetta", "black pepper"],
    instructions: ["Cook pasta", "Fry pancetta", "Mix eggs and cheese", "Combine all"],
    description: "Traditional Italian pasta dish",
    expectedCategories: ["Italian", "Pasta", "Dinner"]
  },
  {
    title: "Chicken Teriyaki Stir Fry",
    ingredients: ["chicken breast", "soy sauce", "teriyaki sauce", "broccoli", "rice"],
    instructions: ["Cut chicken", "Stir fry in wok", "Add sauce", "Serve over rice"],
    description: "Quick Asian-inspired dinner",
    expectedCategories: ["Asian", "Chicken", "Dinner", "Fried"]
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
    instructions: ["Mix dry ingredients", "Cream butter and sugar", "Bake in oven"],
    description: "Classic homemade cookies",
    expectedCategories: ["Desserts", "Baked"]
  },
  {
    title: "Greek Salad",
    ingredients: ["lettuce", "tomatoes", "cucumber", "feta cheese", "olives", "olive oil"],
    instructions: ["Chop vegetables", "Add feta and olives", "Dress with olive oil"],
    description: "Fresh Mediterranean salad",
    expectedCategories: ["Salads", "Vegetarian", "No-Cook"]
  },
  {
    title: "Slow Cooker Beef Stew",
    ingredients: ["beef chuck", "potatoes", "carrots", "onions", "beef broth"],
    instructions: ["Brown beef", "Add to slow cooker with vegetables", "Cook 8 hours"],
    description: "Hearty comfort food",
    expectedCategories: ["Slow Cooked", "Beef", "Dinner"]
  },
  {
    title: "Pancakes",
    ingredients: ["flour", "eggs", "milk", "butter", "syrup"],
    instructions: ["Mix batter", "Cook on griddle", "Serve with syrup"],
    description: "Fluffy breakfast pancakes",
    expectedCategories: ["Breakfast", "Pancakes"]
  }
];

async function testSuggestionEngine() {
  console.log('🧪 Testing Category Suggestion Engine\n');
  
  const engine = new CategorySuggestionEngine(prisma);
  
  for (const [index, recipe] of TEST_RECIPES.entries()) {
    console.log(`\n📝 Test ${index + 1}: ${recipe.title}`);
    console.log(`Expected: ${recipe.expectedCategories.join(', ')}`);
    
    try {
      const suggestions = await engine.suggestCategories(
        {
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          description: recipe.description
        },
        {
          maxSuggestions: 5,
          minConfidence: 0.2,
          includeUserCategories: false
        }
      );

      console.log(`\n✨ Suggestions (${suggestions.length}):`);
      suggestions.forEach((suggestion, i) => {
        const confidence = Math.round(suggestion.confidence * 100);
        const match = recipe.expectedCategories.some(expected => 
          expected.toLowerCase() === suggestion.category.toLowerCase()
        );
        const matchIcon = match ? '✅' : '❓';
        
        console.log(`  ${i + 1}. ${matchIcon} ${suggestion.category} (${confidence}% - ${suggestion.source})`);
        console.log(`     ${suggestion.reasoning}`);
      });

      // Check if we got at least one expected category
      const hasExpectedMatch = suggestions.some(suggestion =>
        recipe.expectedCategories.some(expected =>
          expected.toLowerCase() === suggestion.category.toLowerCase()
        )
      );

      console.log(`\n🎯 Result: ${hasExpectedMatch ? 'PASS' : 'NEEDS REVIEW'}`);
      
    } catch (error) {
      console.error(`❌ Error testing ${recipe.title}:`, error);
    }
  }

  // Test cache functionality
  console.log('\n🔄 Testing Cache Functionality...');
  const cacheTestRecipe = TEST_RECIPES[0];
  
  // First call
  const start1 = Date.now();
  await engine.suggestCategories(cacheTestRecipe);
  const time1 = Date.now() - start1;
  
  // Second call (should be cached)
  const start2 = Date.now();
  await engine.suggestCategories(cacheTestRecipe);
  const time2 = Date.now() - start2;
  
  console.log(`First call: ${time1}ms`);
  console.log(`Second call: ${time2}ms (cached)`);
  console.log(`Cache stats:`, engine.getCacheStats());
  
  // Test edge cases
  console.log('\n🔍 Testing Edge Cases...');
  
  // Empty recipe
  try {
    const emptySuggestions = await engine.suggestCategories({ title: "" });
    console.log(`Empty title: ${emptySuggestions.length} suggestions`);
  } catch (error) {
    console.log(`Empty title: Error handled correctly`);
  }
  
  // Very short title
  const shortSuggestions = await engine.suggestCategories({ title: "Soup" });
  console.log(`Short title "Soup": ${shortSuggestions.length} suggestions`);
  
  // Complex title
  const complexSuggestions = await engine.suggestCategories({
    title: "Grandma's Secret Recipe Slow-Cooked Italian Beef Ragu with Fresh Herbs"
  });
  console.log(`Complex title: ${complexSuggestions.length} suggestions`);
  
  console.log('\n✅ Testing Complete!');
}

async function testPerformance() {
  console.log('\n⚡ Performance Testing...');
  
  const engine = new CategorySuggestionEngine(prisma);
  const iterations = 10;
  
  const start = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    const recipe = TEST_RECIPES[i % TEST_RECIPES.length];
    await engine.suggestCategories(recipe);
  }
  
  const totalTime = Date.now() - start;
  const avgTime = totalTime / iterations;
  
  console.log(`${iterations} suggestions in ${totalTime}ms`);
  console.log(`Average: ${avgTime.toFixed(2)}ms per suggestion`);
  console.log(`Cache stats:`, engine.getCacheStats());
}

async function main() {
  try {
    await testSuggestionEngine();
    await testPerformance();
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
} 