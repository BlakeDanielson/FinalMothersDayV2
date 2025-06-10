#!/usr/bin/env node

/**
 * Simple URL Accessibility Tester
 * Tests if recipe URLs are accessible before running AI model tests
 */

const https = require('https');
const http = require('http');

// Test recipe URLs from different sites
const TEST_URLS = [
  'https://www.allrecipes.com/recipe/16354/easy-meatloaf/',
  'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
  'https://www.foodnetwork.com/recipes/alton-brown/good-eats-meatloaf-recipe-1937667',
  'https://www.epicurious.com/recipes/food/views/simple-roast-chicken-51164760',
  'https://www.tasteofhome.com/recipes/slow-cooker-chicken-and-dumplings/',
  'https://www.delish.com/cooking/recipe-ideas/a19636089/best-beef-stew-recipe/',
  'https://www.simplyrecipes.com/recipes/chocolate_chip_cookies/',
  'https://www.simplyrecipes.com/recipes/homemade_pizza_dough/',
  'https://www.kingarthurbaking.com/recipes/classic-chocolate-chip-cookies-recipe',
  'https://www.bbcgoodfood.com/recipes/classic-pancakes'
];

/**
 * Test if a URL is accessible
 */
async function testUrlAccessibility(url) {
  return new Promise((resolve) => {
    console.log(`Testing: ${url}`);
    
    const protocol = url.startsWith('https') ? https : http;
    const options = new URL(url);
    
    const req = protocol.request({
      hostname: options.hostname,
      port: options.port,
      path: options.pathname + options.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      const accessible = res.statusCode < 400;
      console.log(`  ${accessible ? '✅' : '❌'} Status: ${res.statusCode}`);
      resolve({
        url,
        accessible,
        statusCode: res.statusCode
      });
    });

    req.on('error', (error) => {
      console.log(`  ❌ Error: ${error.message}`);
      resolve({
        url,
        accessible: false,
        statusCode: 'error',
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`  ❌ Timeout`);
      resolve({
        url,
        accessible: false,
        statusCode: 'timeout'
      });
    });

    req.end();
  });
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Testing URL Accessibility');
  console.log('=' .repeat(50));
  console.log(`Testing ${TEST_URLS.length} recipe URLs...\n`);
  
  const results = [];
  
  for (const url of TEST_URLS) {
    const result = await testUrlAccessibility(url);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Summary:');
  console.log('=' .repeat(50));
  
  const accessible = results.filter(r => r.accessible);
  const failed = results.filter(r => !r.accessible);
  
  console.log(`✅ Accessible: ${accessible.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    failed.forEach(result => {
      console.log(`   ${result.url} (${result.statusCode})`);
    });
  }
  
  if (accessible.length > 0) {
    console.log('\n✅ Working URLs for testing:');
    accessible.forEach(result => {
      console.log(`   ${result.url}`);
    });
  }
  
  console.log(`\n${accessible.length > 0 ? '🎉' : '😞'} Ready for AI model testing: ${accessible.length > 0 ? 'YES' : 'NO'}`);
}

// Run the test
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  });
} 