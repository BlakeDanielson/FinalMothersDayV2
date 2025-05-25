#!/usr/bin/env node

/**
 * Multi-Site Recipe Extraction Test
 * Tests multiple URLs with OpenAI method only
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

async function ensureFetch() {
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (error) {
      console.error('fetch is not available and node-fetch could not be imported:', error);
      process.exit(1);
    }
  }
}

async function testSingleUrl(url, method = 'openai') {
  const startTime = Date.now();
  
  try {
    const response = await fetch('http://localhost:3000/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, method }),
    });
    
    const duration = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        success: false,
        duration,
        error: `HTTP ${response.status}: ${response.statusText}`,
        recipe: null
      };
    }
    
    const result = await response.json();
    
    // Check if we got a valid recipe (not all "Unknown" values)
    const hasValidData = result.title !== "Unknown" || result.ingredients.length > 0 || result.instructions.length > 0;
    
    return {
      success: hasValidData,
      duration,
      error: hasValidData ? null : 'Extracted only placeholder data',
      recipe: result
    };
    
  } catch (error) {
    return {
      success: false,
      duration: Date.now() - startTime,
      error: error.message,
      recipe: null
    };
  }
}

async function runMultiSiteTest() {
  await ensureFetch();
  
  // Test URLs organized by site
  const testSites = [
    {
      site: "AllRecipes",
      urls: [
        "https://www.allrecipes.com/recipe/16354/easy-meatloaf",
        "https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole"
      ]
    },
    {
      site: "Food Network", 
      urls: [
        "https://www.foodnetwork.com/recipes/alton-brown/good-eats-meatloaf-recipe-1937667",
        "https://www.foodnetwork.com/recipes/ree-drummond/chicken-fried-steak-recipe-2107832"
      ]
    },
    {
      site: "BBC Good Food",
      urls: [
        "https://www.bbcgoodfood.com/recipes/best-ever-chocolate-brownies",
        "https://www.bbcgoodfood.com/recipes/classic-victoria-sponge"
      ]
    },
    {
      site: "Delish",
      urls: [
        "https://www.delish.com/cooking/recipe-ideas/a19636089/classic-chocolate-chip-cookies-recipe/",
        "https://www.delish.com/cooking/recipe-ideas/recipes/a58479/best-beef-stew-recipe/"
      ]
    },
    {
      site: "Taste of Home",
      urls: [
        "https://www.tasteofhome.com/recipes/makeover-chocolate-chip-cookies/",
        "https://www.tasteofhome.com/recipes/classic-beef-stew/"
      ]
    }
  ];
  
  log('Testing OpenAI extraction method across multiple recipe sites', 'blue');
  log(`Testing ${testSites.length} sites with ${testSites.reduce((sum, site) => sum + site.urls.length, 0)} total URLs\n`, 'cyan');
  
  const results = {
    openai: { total: 0, successful: 0, failed: 0, sites: {} }
  };
  
  // Initialize site tracking
  testSites.forEach(siteGroup => {
    results.openai.sites[siteGroup.site] = { successful: 0, failed: 0, urls: [] };
  });
  
  // Test each site
  for (const siteGroup of testSites) {
    log(`\n🌐 Testing ${siteGroup.site}:`, 'bright');
    
    for (const url of siteGroup.urls) {
      log(`  📄 ${url}`, 'reset');
      
      // Test OpenAI
      log('  🤖 Testing OpenAI...', 'cyan');
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
        url: url,
        success: openaiResult.success,
        duration: openaiResult.duration,
        error: openaiResult.error || null,
        title: openaiResult.recipe?.title || null
      });
      
      // Wait a bit between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Print results
  log('\n' + '='.repeat(60), 'bright');
  log('📊 FINAL RESULTS', 'bright');
  log('='.repeat(60), 'bright');
  
  log('\n🤖 OPENAI RESULTS:', 'cyan');
  log(`  • Success Rate: ${results.openai.successful}/${results.openai.total} (${Math.round(results.openai.successful/results.openai.total*100)}%)`, 'reset');
  log(`  • Average Time: ${Math.round(results.openai.sites ? Object.values(results.openai.sites).reduce((sum, site) => sum + site.urls.reduce((urlSum, url) => urlSum + url.duration, 0), 0) / results.openai.total : 0)}ms`, 'reset');
  
  // Site-by-site breakdown
  log('\n📊 SITE-BY-SITE BREAKDOWN:', 'bright');
  for (const site of Object.keys(results.openai.sites)) {
    const ai = results.openai.sites[site];
    log(`  ${site}:`, 'yellow');
    log(`    OpenAI: ${ai.successful}/${ai.successful + ai.failed} successful`, ai.successful > ai.failed ? 'green' : 'red');
  }
  
  // Best performing sites
  log('\n🏆 RECOMMENDATIONS:', 'bright');
  const bestOpenAISites = Object.entries(results.openai.sites)
    .filter(([, data]) => data.successful > data.failed)
    .map(([site]) => site);
  
  if (bestOpenAISites.length > 0) {
    log(`  ✅ OpenAI works best with: ${bestOpenAISites.join(', ')}`, 'green');
  } else {
    log(`  ⚠️  All sites had challenges`, 'yellow');
  }
  
  log('\n💡 OPTIMIZATION SUGGESTIONS:', 'bright');
  log('  1. Focus testing on AllRecipes and Food Network for best results', 'reset');
  log('  2. Consider retry mechanisms for failed extractions', 'reset');
  log('  3. Monitor extraction times and optimize as needed', 'reset');
  
  log('\n🎯 Test completed!', 'green');
}

// Run the test if this file is executed directly
if (require.main === module) {
  runMultiSiteTest().catch(console.error);
}

module.exports = { testSingleUrl, runMultiSiteTest }; 