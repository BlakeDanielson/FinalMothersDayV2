#!/usr/bin/env node

/**
 * Quick Recipe Extraction Test
 * Tests 10 working recipe URLs to validate extraction
 */

// Try to use built-in fetch first, fallback to node-fetch
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  // If node-fetch is not available, we'll handle it in the function
}

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Working recipe URLs (no trailing slashes, verified)
const TEST_URLS = [
  'https://www.allrecipes.com/recipe/16354/easy-meatloaf',
  'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole',
  'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
  'https://www.bonappetit.com/recipe/bas-best-chocolate-chip-cookies',
  'https://www.seriouseats.com/the-best-chocolate-chip-cookies-recipe',
  'https://www.epicurious.com/recipes/food/views/my-favorite-buttermilk-biscuits-231000',
  'https://www.delish.com/cooking/recipe-ideas/recipes/a54724/perfect-chocolate-chip-cookies-recipe',
  'https://www.marthastewart.com/318599/basic-muffins',
  'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
  'https://cookieandkate.com/best-chocolate-chip-cookies-recipe'
];

async function ensureFetch() {
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (e) {
      throw new Error('No fetch implementation available. Please install node-fetch: npm install node-fetch');
    }
  }
}

async function testRecipeExtraction(url) {
  await ensureFetch();

  try {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3001/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.success && data.recipe) {
      // Check if we got actual recipe data (not just defaults)
      const hasRealData = data.recipe.title !== "Recipe" && 
                         data.recipe.title !== "Unknown Recipe" &&
                         data.recipe.ingredients.length > 0 &&
                         data.recipe.steps.length > 0;

      return {
        success: true,
        duration,
        recipe: data.recipe,
        hasRealData
      };
    } else {
      throw new Error(data.error || 'No recipe data returned');
    }
    
  } catch (error) {
    return {
      success: false,
      duration: 0,
      error: error.message,
      hasRealData: false
    };
  }
}

async function runQuickTest() {
  log('🧪 QUICK RECIPE EXTRACTION TEST', 'bright');
  log('═'.repeat(60), 'cyan');
  log('📊 Testing 10 working recipe URLs', 'blue');
  log('🤖 Using OpenAI only', 'blue');
  log('', 'reset');

  const results = [];
  let successCount = 0;
  let realDataCount = 0;
  const durations = [];

  for (const [index, url] of TEST_URLS.entries()) {
    const progress = `${index + 1}/${TEST_URLS.length}`;
    log(`[${progress}] Testing: ${url}`, 'cyan');

    const result = await testRecipeExtraction(url);
    
    if (result.success) {
      successCount++;
      durations.push(result.duration);
      
      if (result.hasRealData) {
        realDataCount++;
        log(`✅ SUCCESS - Real data (${result.duration}ms) - ${result.recipe.title}`, 'green');
        log(`   📝 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
      } else {
        log(`⚠️  SUCCESS - Default data (${result.duration}ms)`, 'yellow');
      }
    } else {
      log(`❌ FAILED: ${result.error}`, 'red');
    }

    results.push({
      url,
      ...result
    });

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Calculate statistics
  const successRate = (successCount / TEST_URLS.length * 100).toFixed(2);
  const realDataRate = (realDataCount / TEST_URLS.length * 100).toFixed(2);
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  log('');
  log('📊 QUICK TEST RESULTS', 'bright');
  log('═'.repeat(60), 'cyan');
  log(`🎯 API Success Rate: ${successRate}% (${successCount}/${TEST_URLS.length})`, 'green');
  log(`📊 Real Data Rate: ${realDataRate}% (${realDataCount}/${TEST_URLS.length})`, 'blue');
  log(`⏱️  Average Duration: ${avgDuration}ms`, 'blue');
  log(`🏃 Fastest: ${minDuration}ms`, 'green');
  log(`🐌 Slowest: ${maxDuration}ms`, 'yellow');

  // Performance analysis
  log('');
  log('🎯 PERFORMANCE ANALYSIS:', 'bright');
  if (parseFloat(realDataRate) >= 80) {
    log('🏆 EXCELLENT: Real data extraction rate exceeds 80%!', 'green');
  } else if (parseFloat(realDataRate) >= 60) {
    log('👍 GOOD: Real data extraction rate is acceptable (60%+)', 'yellow');
  } else {
    log('⚠️  NEEDS WORK: Real data extraction rate below 60%', 'red');
  }

  if (parseInt(avgDuration) <= 15000) {
    log('🚀 EXCELLENT: Average time under 15 seconds!', 'green');
  } else if (parseInt(avgDuration) <= 30000) {
    log('✅ GOOD: Average time under 30 seconds', 'yellow');
  } else {
    log('⏱️  SLOW: Average time exceeds 30 seconds', 'red');
  }

  return {
    totalTests: TEST_URLS.length,
    successCount,
    realDataCount,
    successRate: parseFloat(successRate),
    realDataRate: parseFloat(realDataRate),
    avgDuration: parseInt(avgDuration),
    minDuration,
    maxDuration,
    results
  };
}

// Main execution
if (require.main === module) {
  runQuickTest()
    .then((stats) => {
      log('');
      log('🎉 Quick test completed!', 'green');
      process.exit(0);
    })
    .catch((error) => {
      log('');
      log(`❌ Test failed: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { runQuickTest }; 