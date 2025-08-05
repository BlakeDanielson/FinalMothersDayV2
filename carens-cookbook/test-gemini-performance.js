#!/usr/bin/env node

// Try to use built-in fetch first, fallback to node-fetch
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  // If node-fetch is not available, we'll handle it in the function
}

async function testGeminiPerformance() {
  console.log('🧪 Testing improved Gemini performance...');
  const startTime = Date.now();
  
  try {
    const response = await fetch('http://localhost:3001/api/fetch-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://www.allrecipes.com/recipe/16354/easy-meatloaf',
        processing_method: 'gemini'
      })
    });

    const data = await response.json();
    const duration = Date.now() - startTime;
    
    if (data.success) {
      console.log(`✅ SUCCESS in ${duration}ms (${(duration/1000).toFixed(1)}s)`);
      console.log(`📝 Title: ${data.recipe.title}`);
      console.log(`🥘 Ingredients: ${data.recipe.ingredients.length}`);
      console.log(`👩‍🍳 Steps: ${data.recipe.steps.length}`);
    } else {
      console.log(`❌ FAILED: ${data.error}`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
  }
}

testGeminiPerformance(); 