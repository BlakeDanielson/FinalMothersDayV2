#!/usr/bin/env node

/**
 * Batch Test Script for Recipe Extraction
 * Tests multiple URLs with both Hyperbrowser and OpenAI methods
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

// Test URLs grouped by site
const testUrls = [
  {
    site: 'AllRecipes',
    urls: [
      'https://www.allrecipes.com/recipe/16354/easy-meatloaf/',
      'https://www.allrecipes.com/recipe/25202/simple-macaroni-and-cheese/',
      'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/'
    ]
  },
  {
    site: 'Food Network',
    urls: [
      'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
      'https://www.foodnetwork.com/recipes/ree-drummond/chicken-fried-steak-recipe-2107832'
    ]
  },
  {
    site: 'King Arthur Baking',
    urls: [
      'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe'
    ]
  },
  {
    site: 'Food.com',
    urls: [
      'https://www.food.com/recipe/creamy-chicken-and-rice-casserole-40952'
    ]
  },
  {
    site: 'Serious Eats',
    urls: [
      'https://www.seriouseats.com/best-chocolate-chip-cookies-recipe',
      'https://www.seriouseats.com/perfect-pan-pizza-recipe'
    ]
  },
  {
    site: 'Bon Appétit',
    urls: [
      'https://www.bonappetit.com/recipe/basically-chicken-marsala'
    ]
  },
  {
    site: 'Recipe Tin Eats',
    urls: [
      'https://www.recipetineats.com/beef-stew-recipe/'
    ]
  },
  {
    site: 'Tasty',
    urls: [
      'https://tasty.co/recipe/one-pan-lemon-herb-salmon-and-veggies'
    ]
  }
];

async function testSingleUrl(url, method) {
  // Ensure we have fetch available
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (e) {
      throw new Error('No fetch implementation available');
    }
  }

  try {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3003/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        processing_method: method
      })
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: `${response.status}: ${errorData.error || 'Unknown error'}`,
        duration: duration
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      recipe: data.recipe,
      duration: duration,
      processing_method: data.processing_method
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      duration: 0
    };
  }
}

async function runBatchTest() {
  log('🧪 BATCH RECIPE EXTRACTION TEST', 'bright');
  log('═'.repeat(80), 'cyan');
  log('Testing both Hyperbrowser and OpenAI methods across multiple recipe sites', 'blue');
  log('', 'reset');

  const results = {
    hyperbrowser: { total: 0, successful: 0, failed: 0, sites: {} },
    openai: { total: 0, successful: 0, failed: 0, sites: {} }
  };

  for (const siteGroup of testUrls) {
    log(`\n🌐 Testing: ${siteGroup.site}`, 'cyan');
    log('─'.repeat(60), 'yellow');
    
    results.hyperbrowser.sites[siteGroup.site] = { successful: 0, failed: 0, urls: [] };
    results.openai.sites[siteGroup.site] = { successful: 0, failed: 0, urls: [] };

    for (const url of siteGroup.urls) {
      const shortUrl = url.length > 60 ? url.substring(0, 57) + '...' : url;
      log(`\n📍 ${shortUrl}`, 'reset');
      
      // Test Hyperbrowser
      log('  🤖 Testing Hyperbrowser...', 'magenta');
      const hyperbrowserResult = await testSingleUrl(url, 'hyperbrowser');
      results.hyperbrowser.total++;
      
      if (hyperbrowserResult.success) {
        results.hyperbrowser.successful++;
        results.hyperbrowser.sites[siteGroup.site].successful++;
        log(`    ✅ SUCCESS (${hyperbrowserResult.duration}ms) - ${hyperbrowserResult.recipe.title}`, 'green');
      } else {
        results.hyperbrowser.failed++;
        results.hyperbrowser.sites[siteGroup.site].failed++;
        log(`    ❌ FAILED (${hyperbrowserResult.duration}ms) - ${hyperbrowserResult.error}`, 'red');
      }
      
      results.hyperbrowser.sites[siteGroup.site].urls.push({
        url,
        success: hyperbrowserResult.success,
        duration: hyperbrowserResult.duration,
        error: hyperbrowserResult.error || null,
        title: hyperbrowserResult.recipe?.title || null
      });

      // Test OpenAI
      log('  🧠 Testing OpenAI...', 'blue');
      const openaiResult = await testSingleUrl(url, 'openai');
      results.openai.total++;
      
      if (openaiResult.success) {
        results.openai.successful++;
        results.openai.sites[siteGroup.site].successful++;
        log(`    ✅ SUCCESS (${openaiResult.duration}ms) - ${openaiResult.recipe.title}`, 'green');
      } else {
        results.openai.failed++;
        results.openai.sites[siteGroup.site].failed++;
        log(`    ❌ FAILED (${openaiResult.duration}ms) - ${openaiResult.error}`, 'red');
      }
      
      results.openai.sites[siteGroup.site].urls.push({
        url,
        success: openaiResult.success,
        duration: openaiResult.duration,
        error: openaiResult.error || null,
        title: openaiResult.recipe?.title || null
      });
    }
  }

  // Print comprehensive summary
  log('\n\n📊 COMPREHENSIVE TEST RESULTS', 'bright');
  log('═'.repeat(80), 'cyan');
  
  log('\n🤖 HYPERBROWSER RESULTS:', 'magenta');
  log(`  • Success Rate: ${results.hyperbrowser.successful}/${results.hyperbrowser.total} (${Math.round(results.hyperbrowser.successful/results.hyperbrowser.total*100)}%)`, 'reset');
  
  log('\n🧠 OPENAI RESULTS:', 'blue');
  log(`  • Success Rate: ${results.openai.successful}/${results.openai.total} (${Math.round(results.openai.successful/results.openai.total*100)}%)`, 'reset');
  
  log('\n📈 SITE-BY-SITE BREAKDOWN:', 'yellow');
  for (const site of Object.keys(results.hyperbrowser.sites)) {
    const hb = results.hyperbrowser.sites[site];
    const ai = results.openai.sites[site];
    log(`  ${site}:`, 'reset');
    log(`    Hyperbrowser: ${hb.successful}/${hb.successful + hb.failed} successful`, hb.successful > hb.failed ? 'green' : 'red');
    log(`    OpenAI: ${ai.successful}/${ai.successful + ai.failed} successful`, ai.successful > ai.failed ? 'green' : 'red');
  }

  // Recommendations
  log('\n💡 RECOMMENDATIONS:', 'yellow');
  
  const bestHyperbrowserSites = Object.entries(results.hyperbrowser.sites)
    .filter(([site, data]) => data.successful > 0)
    .map(([site]) => site);
    
  const bestOpenAISites = Object.entries(results.openai.sites)
    .filter(([site, data]) => data.successful > 0)
    .map(([site]) => site);

  if (bestHyperbrowserSites.length > 0) {
    log(`  ✅ Hyperbrowser works best with: ${bestHyperbrowserSites.join(', ')}`, 'green');
  }
  
  if (bestOpenAISites.length > 0) {
    log(`  ✅ OpenAI works best with: ${bestOpenAISites.join(', ')}`, 'green');
  }

  log('\n🔧 NEXT STEPS:', 'cyan');
  log('  1. Focus on sites with highest success rates', 'reset');
  log('  2. Investigate common failure patterns', 'reset');
  log('  3. Consider fallback strategy: Hyperbrowser → OpenAI', 'reset');
  log('  4. Implement site-specific extraction optimizations', 'reset');
  
  return results;
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  log('\n👋 Test interrupted!', 'yellow');
  process.exit(0);
});

if (require.main === module) {
  runBatchTest().catch(error => {
    log(`❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
} 