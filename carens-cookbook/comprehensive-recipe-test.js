#!/usr/bin/env node

/**
 * Comprehensive Recipe Extraction Test
 * Tests 3 recipes from 25 different recipe sites (75 total)
 * Provides detailed statistics on extraction time and success rate
 * Now using OpenAI only (hyperbrowser removed)
 */

// Try to use built-in fetch first, fallback to node-fetch
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  // If node-fetch is not available, we'll handle it in the function
}

const fs = require('fs').promises;
const path = require('path');

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

// 25 recipe sites with 3 verified working URLs each (75 total)
const RECIPE_SITES = [
  {
    name: "AllRecipes",
    recipes: [
      "https://www.allrecipes.com/recipe/16354/easy-meatloaf",
      "https://www.allrecipes.com/recipe/231506/simple-macaroni-and-cheese",
      "https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies"
    ]
  },
  {
    name: "Bon Appétit",
    recipes: [
      "https://www.bonappetit.com/recipe/bas-best-chocolate-chip-cookies",
      "https://www.bonappetit.com/recipe/perfect-buttermilk-pancakes",
      "https://www.bonappetit.com/recipe/classic-caesar-salad"
    ]
  },
  {
    name: "King Arthur Baking",
    recipes: [
      "https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe",
      "https://www.kingarthurbaking.com/recipes/classic-sandwich-bread-recipe",
      "https://www.kingarthurbaking.com/recipes/perfectly-pillowy-cinnamon-rolls-recipe"
    ]
  },
  {
    name: "Delish",
    recipes: [
      "https://www.delish.com/cooking/recipe-ideas/a19636089/best-chocolate-chip-cookies-recipe",
      "https://www.delish.com/cooking/recipe-ideas/a26950912/chicken-parmesan-recipe",
      "https://www.delish.com/cooking/recipe-ideas/a54848/banana-bread-recipe"
    ]
  },
  {
    name: "Taste of Home",
    recipes: [
      "https://www.tasteofhome.com/recipes/chocolate-chip-cookies",
      "https://www.tasteofhome.com/recipes/classic-beef-stew",
      "https://www.tasteofhome.com/recipes/homemade-chicken-noodle-soup"
    ]
  },
  {
    name: "Simply Recipes",
    recipes: [
      "https://www.simplyrecipes.com/recipes/chocolate_chip_cookies",
      "https://www.simplyrecipes.com/recipes/basic_pancakes",
      "https://www.simplyrecipes.com/recipes/perfect_hard_boiled_eggs"
    ]
  },
  {
    name: "Food & Wine",
    recipes: [
      "https://www.foodandwine.com/recipes/chocolate-chip-cookies",
      "https://www.foodandwine.com/recipes/classic-beef-bourguignon",
      "https://www.foodandwine.com/recipes/perfect-roast-chicken"
    ]
  },
  {
    name: "Epicurious",
    recipes: [
      "https://www.epicurious.com/recipes/food/views/chocolate-chip-cookies-109567",
      "https://www.epicurious.com/recipes/food/views/classic-beef-stew-51160420",
      "https://www.epicurious.com/recipes/food/views/perfect-roast-chicken-51164760"
    ]
  },
  {
    name: "BBC Good Food",
    recipes: [
      "https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies",
      "https://www.bbcgoodfood.com/recipes/classic-beef-stew",
      "https://www.bbcgoodfood.com/recipes/perfect-roast-chicken"
    ]
  },
  {
    name: "Jamie Oliver",
    recipes: [
      "https://www.jamieoliver.com/recipes/chocolate-recipes/chocolate-chip-cookies",
      "https://www.jamieoliver.com/recipes/beef-recipes/beef-stew",
      "https://www.jamieoliver.com/recipes/chicken-recipes/perfect-roast-chicken"
    ]
  },
  {
    name: "Martha Stewart",
    recipes: [
      "https://www.marthastewart.com/recipe/chocolate-chip-cookies",
      "https://www.marthastewart.com/recipe/classic-beef-stew",
      "https://www.marthastewart.com/recipe/perfect-roast-chicken"
    ]
  },
  {
    name: "Food Network",
    recipes: [
      "https://www.foodnetwork.com/recipes/food-network-kitchen/chocolate-chip-cookies-recipe-2107719",
      "https://www.foodnetwork.com/recipes/tyler-florence/beef-stew-recipe-1914647",
      "https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592"
    ]
  },
  {
    name: "Serious Eats",
    recipes: [
      "https://www.seriouseats.com/recipes/2013/12/the-food-lab-best-chocolate-chip-cookie-recipe.html",
      "https://www.seriouseats.com/recipes/2016/01/all-american-beef-stew-recipe.html",
      "https://www.seriouseats.com/recipes/2010/05/perfect-roast-chicken-recipe.html"
    ]
  },
  {
    name: "Cookie and Kate",
    recipes: [
      "https://cookieandkate.com/chocolate-chip-cookies-recipe",
      "https://cookieandkate.com/vegetable-soup-recipe",
      "https://cookieandkate.com/best-banana-bread-recipe"
    ]
  },
  {
    name: "Sally's Baking Addiction",
    recipes: [
      "https://sallysbakingaddiction.com/chocolate-chip-cookies",
      "https://sallysbakingaddiction.com/homemade-bread",
      "https://sallysbakingaddiction.com/vanilla-cupcakes"
    ]
  },
  {
    name: "The Pioneer Woman",
    recipes: [
      "https://www.thepioneerwoman.com/food-cooking/recipes/a11738/chocolate-chip-cookies",
      "https://www.thepioneerwoman.com/food-cooking/recipes/a11757/beef-stew-with-beer",
      "https://www.thepioneerwoman.com/food-cooking/recipes/a11648/perfect-pot-roast"
    ]
  },
  {
    name: "Minimalist Baker",
    recipes: [
      "https://minimalistbaker.com/the-best-vegan-chocolate-chip-cookies",
      "https://minimalistbaker.com/1-bowl-vegan-banana-bread",
      "https://minimalistbaker.com/easy-vegan-fried-rice"
    ]
  },
  {
    name: "Love and Lemons",
    recipes: [
      "https://www.loveandlemons.com/chocolate-chip-cookies-recipe",
      "https://www.loveandlemons.com/vegetable-soup-recipe",
      "https://www.loveandlemons.com/banana-bread-recipe"
    ]
  },
  {
    name: "Half Baked Harvest",
    recipes: [
      "https://www.halfbakedharvest.com/brown-butter-chocolate-chip-cookies",
      "https://www.halfbakedharvest.com/slow-cooker-beef-stew",
      "https://www.halfbakedharvest.com/honey-garlic-chicken"
    ]
  },
  {
    name: "Gimme Some Oven",
    recipes: [
      "https://www.gimmesomeoven.com/chocolate-chip-cookies-recipe",
      "https://www.gimmesomeoven.com/beef-stew-recipe",
      "https://www.gimmesomeoven.com/baked-chicken-breast"
    ]
  },
  {
    name: "Spend with Pennies",
    recipes: [
      "https://www.spendwithpennies.com/chocolate-chip-cookies",
      "https://www.spendwithpennies.com/beef-stew-recipe",
      "https://www.spendwithpennies.com/baked-chicken-breast"
    ]
  },
  {
    name: "The Recipe Critic",
    recipes: [
      "https://therecipecritic.com/chocolate-chip-cookies",
      "https://therecipecritic.com/slow-cooker-beef-stew",
      "https://therecipecritic.com/honey-garlic-chicken"
    ]
  },
  {
    name: "Cafe Delites",
    recipes: [
      "https://cafedelites.com/chocolate-chip-cookies",
      "https://cafedelites.com/slow-cooker-beef-stew",
      "https://cafedelites.com/honey-garlic-chicken"
    ]
  },
  {
    name: "Natasha's Kitchen",
    recipes: [
      "https://natashaskitchen.com/chocolate-chip-cookies-recipe",
      "https://natashaskitchen.com/beef-stew-recipe",
      "https://natashaskitchen.com/baked-chicken-breast"
    ]
  },
  {
    name: "Dinner at the Zoo",
    recipes: [
      "https://www.dinneratthezoo.com/chocolate-chip-cookies",
      "https://www.dinneratthezoo.com/beef-stew-recipe",
      "https://www.dinneratthezoo.com/honey-garlic-chicken"
    ]
  }
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

async function runComprehensiveTest() {
  log('🧪 COMPREHENSIVE RECIPE EXTRACTION TEST', 'bright');
  log('═'.repeat(80), 'cyan');
  log('📊 Testing 75 recipes from 25 different recipe sites', 'blue');
  log('🤖 Using OpenAI only', 'blue');
  log('', 'reset');

  const results = [];
  const siteResults = {};
  let totalTests = 0;
  let successCount = 0;
  let realDataCount = 0;
  const durations = [];

  for (const [siteIndex, site] of RECIPE_SITES.entries()) {
    const siteProgress = `${siteIndex + 1}/${RECIPE_SITES.length}`;
    log(`\n[${siteProgress}] 🌐 Testing ${site.name}`, 'magenta');
    log('─'.repeat(60), 'cyan');

    siteResults[site.name] = {
      total: site.recipes.length,
      success: 0,
      realData: 0,
      durations: [],
      errors: []
    };

    for (const [recipeIndex, url] of site.recipes.entries()) {
      totalTests++;
      const recipeProgress = `${recipeIndex + 1}/${site.recipes.length}`;
      log(`  [${recipeProgress}] Testing: ${url}`, 'cyan');

      const result = await testRecipeExtraction(url);
      
      if (result.success) {
        successCount++;
        siteResults[site.name].success++;
        durations.push(result.duration);
        siteResults[site.name].durations.push(result.duration);
        
        if (result.hasRealData) {
          realDataCount++;
          siteResults[site.name].realData++;
          log(`    ✅ SUCCESS - Real data (${result.duration}ms) - ${result.recipe.title}`, 'green');
          log(`       📝 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
        } else {
          log(`    ⚠️  SUCCESS - Default data (${result.duration}ms)`, 'yellow');
        }
      } else {
        log(`    ❌ FAILED: ${result.error}`, 'red');
        siteResults[site.name].errors.push(result.error);
      }

      results.push({
        site: site.name,
        url,
        ...result
      });

      // Small delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Site summary
    const siteSuccessRate = (siteResults[site.name].success / siteResults[site.name].total * 100).toFixed(1);
    const siteRealDataRate = (siteResults[site.name].realData / siteResults[site.name].total * 100).toFixed(1);
    const siteAvgDuration = siteResults[site.name].durations.length > 0 
      ? (siteResults[site.name].durations.reduce((a, b) => a + b, 0) / siteResults[site.name].durations.length).toFixed(0)
      : 0;

    log(`  📊 ${site.name} Summary: ${siteSuccessRate}% success, ${siteRealDataRate}% real data, avg ${siteAvgDuration}ms`, 'blue');
  }

  // Calculate overall statistics
  const successRate = (successCount / totalTests * 100).toFixed(2);
  const realDataRate = (realDataCount / totalTests * 100).toFixed(2);
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  log('\n📊 COMPREHENSIVE TEST RESULTS', 'bright');
  log('═'.repeat(80), 'cyan');
  log(`🎯 Overall API Success Rate: ${successRate}% (${successCount}/${totalTests})`, 'green');
  log(`📊 Overall Real Data Rate: ${realDataRate}% (${realDataCount}/${totalTests})`, 'blue');
  log(`⏱️  Average Duration: ${avgDuration}ms`, 'blue');
  log(`🏃 Fastest: ${minDuration}ms`, 'green');
  log(`🐌 Slowest: ${maxDuration}ms`, 'yellow');

  // Performance analysis
  log('\n🎯 PERFORMANCE ANALYSIS:', 'bright');
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

  // Top performing sites
  log('\n🏆 TOP PERFORMING SITES:', 'bright');
  const sortedSites = Object.entries(siteResults)
    .map(([name, data]) => ({
      name,
      successRate: (data.success / data.total * 100),
      realDataRate: (data.realData / data.total * 100),
      avgDuration: data.durations.length > 0 ? data.durations.reduce((a, b) => a + b, 0) / data.durations.length : 0
    }))
    .sort((a, b) => b.realDataRate - a.realDataRate);

  sortedSites.slice(0, 5).forEach((site, index) => {
    log(`${index + 1}. ${site.name}: ${site.realDataRate.toFixed(1)}% real data, ${site.avgDuration.toFixed(0)}ms avg`, 'green');
  });

  // Save detailed results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = `comprehensive-test-results-${timestamp}.json`;
  
  try {
    await fs.writeFile(resultsFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        successCount,
        realDataCount,
        successRate: parseFloat(successRate),
        realDataRate: parseFloat(realDataRate),
        avgDuration: parseInt(avgDuration),
        minDuration,
        maxDuration
      },
      siteResults,
      results
    }, null, 2));
    
    log(`\n💾 Detailed results saved to: ${resultsFile}`, 'cyan');
  } catch (error) {
    log(`\n⚠️  Failed to save results: ${error.message}`, 'yellow');
  }

  return {
    totalTests,
    successCount,
    realDataCount,
    successRate: parseFloat(successRate),
    realDataRate: parseFloat(realDataRate),
    avgDuration: parseInt(avgDuration),
    minDuration,
    maxDuration,
    siteResults,
    results
  };
}

// Main execution
if (require.main === module) {
  runComprehensiveTest()
    .then((stats) => {
      log('\n🎉 Comprehensive test completed!', 'green');
      log(`📈 Final Score: ${stats.realDataRate}% real data extraction at ${stats.avgDuration}ms average`, 'bright');
      process.exit(0);
    })
    .catch((error) => {
      log(`\n❌ Test failed: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { runComprehensiveTest }; 