#!/usr/bin/env node

/**
 * AI Model Testing Script
 * Tests all 4 configured AI models against various recipe URLs
 */

const https = require('https');
const http = require('http');
const path = require('path');

// Load environment variables from carens-cookbook/.env
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Test recipe URLs from different sites (verified working URLs)
const TEST_URLS = [
  'https://www.allrecipes.com/recipe/16354/easy-meatloaf/',
  'https://www.tasteofhome.com/recipes/slow-cooker-chicken-and-dumplings/',
  'https://www.delish.com/cooking/recipe-ideas/a19636089/best-beef-stew-recipe/',
  'https://www.simplyrecipes.com/recipes/chocolate_chip_cookies/',
  'https://www.kingarthurbaking.com/recipes/classic-chocolate-chip-cookies-recipe',
  'https://www.bbcgoodfood.com/recipes/classic-pancakes'
];

// All 4 models to test
const MODELS_TO_TEST = [
  'openai-main',
  'openai-mini', 
  'gemini-main',
  'gemini-pro'
];

// Base URL - adjust if needed
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Make HTTP request to recipe processing API
 */
async function fetchRecipe(url, model) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      aiProvider: model
    });

    const options = {
      hostname: BASE_URL.replace(/https?:\/\//, '').split(':')[0],
      port: BASE_URL.includes('localhost') ? 3000 : 443,
      path: '/api/fetch-recipe',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const protocol = BASE_URL.startsWith('https') ? https : http;
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            success: res.statusCode === 200,
            statusCode: res.statusCode,
            data: result,
            model: model,
            url: url
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Invalid JSON response',
            model: model,
            url: url,
            rawData: data
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        model: model,
        url: url
      });
    });

    req.setTimeout(30000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout',
        model: model,
        url: url
      });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Test a single URL against all models
 */
async function testUrlAcrossModels(url, urlIndex) {
  console.log(`\n🧪 Testing URL ${urlIndex + 1}/10: ${url}`);
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const model of MODELS_TO_TEST) {
    console.log(`\n📊 Testing with ${model}...`);
    const startTime = Date.now();
    
    try {
      const result = await fetchRecipe(url, model);
      const duration = Date.now() - startTime;
      
      if (result.success) {
        console.log(`✅ ${model}: Success (${duration}ms)`);
        console.log(`   Recipe: ${result.data.recipe?.title || 'No title'}`);
        console.log(`   Ingredients: ${result.data.recipe?.ingredients?.length || 0} items`);
        console.log(`   Instructions: ${result.data.recipe?.instructions?.length || 0} steps`);
      } else {
        console.log(`❌ ${model}: Failed (${duration}ms)`);
        console.log(`   Error: ${result.error || 'Unknown error'}`);
        if (result.statusCode) {
          console.log(`   Status Code: ${result.statusCode}`);
        }
      }
      
      results.push({
        model,
        success: result.success,
        duration,
        url,
        data: result.data,
        error: result.error,
        statusCode: result.statusCode
      });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`💥 ${model}: Exception (${duration}ms)`);
      console.log(`   Error: ${error.message}`);
      
      results.push({
        model,
        success: false,
        duration,
        url,
        error: error.message
      });
    }
    
    // Small delay between requests to be nice to APIs
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

/**
 * Generate summary report
 */
function generateSummary(allResults) {
  console.log('\n📈 SUMMARY REPORT');
  console.log('=' .repeat(80));
  
  const modelStats = {};
  
  // Initialize stats
  MODELS_TO_TEST.forEach(model => {
    modelStats[model] = {
      totalTests: 0,
      successes: 0,
      failures: 0,
      totalDuration: 0,
      avgDuration: 0,
      successRate: 0
    };
  });
  
  // Calculate stats
  allResults.flat().forEach(result => {
    const stats = modelStats[result.model];
    stats.totalTests++;
    stats.totalDuration += result.duration;
    
    if (result.success) {
      stats.successes++;
    } else {
      stats.failures++;
    }
  });
  
  // Calculate averages and rates
  Object.keys(modelStats).forEach(model => {
    const stats = modelStats[model];
    stats.avgDuration = Math.round(stats.totalDuration / stats.totalTests);
    stats.successRate = Math.round((stats.successes / stats.totalTests) * 100);
    
    // Calculate timing statistics
    const durations = allResults.flat()
      .filter(r => r.model === model && r.success)
      .map(r => r.duration);
    
    if (durations.length > 0) {
      stats.minDuration = Math.min(...durations);
      stats.maxDuration = Math.max(...durations);
      stats.medianDuration = durations.sort((a, b) => a - b)[Math.floor(durations.length / 2)];
    } else {
      stats.minDuration = 0;
      stats.maxDuration = 0;
      stats.medianDuration = 0;
    }
  });
  
  // Display summary table
  console.log('\nModel Performance Summary:');
  console.log('┌─────────────┬─────────┬──────────┬─────────────┬──────────────┐');
  console.log('│    Model    │ Success │ Failures │ Avg Time(ms)│ Success Rate │');
  console.log('├─────────────┼─────────┼──────────┼─────────────┼──────────────┤');
  
  Object.entries(modelStats).forEach(([model, stats]) => {
    const modelPadded = model.padEnd(11);
    const successPadded = stats.successes.toString().padStart(7);
    const failuresPadded = stats.failures.toString().padStart(8);
    const avgTimePadded = stats.avgDuration.toString().padStart(11);
    const ratePadded = `${stats.successRate}%`.padStart(12);
    
    console.log(`│ ${modelPadded} │ ${successPadded} │ ${failuresPadded} │ ${avgTimePadded} │ ${ratePadded} │`);
  });
  
  console.log('└─────────────┴─────────┴──────────┴─────────────┴──────────────┘');
  
  // Find best and worst performers
  const sortedBySuccess = Object.entries(modelStats).sort((a, b) => b[1].successRate - a[1].successRate);
  const sortedBySpeed = Object.entries(modelStats).sort((a, b) => a[1].avgDuration - b[1].avgDuration);
  
  console.log(`\n🏆 Best Success Rate: ${sortedBySuccess[0][0]} (${sortedBySuccess[0][1].successRate}%)`);
  console.log(`⚡ Fastest Average: ${sortedBySpeed[0][0]} (${sortedBySpeed[0][1].avgDuration}ms)`);
  
  // Detailed timing analysis
  console.log('\n⏱️  DETAILED TIMING ANALYSIS');
  console.log('=' .repeat(80));
  
  Object.entries(modelStats)
    .filter(([_, stats]) => stats.successes > 0)
    .sort((a, b) => a[1].avgDuration - b[1].avgDuration)
    .forEach(([model, stats]) => {
      console.log(`\n📊 ${model.toUpperCase()}:`);
      console.log(`   Average: ${stats.avgDuration}ms`);
      console.log(`   Fastest: ${stats.minDuration}ms`);
      console.log(`   Slowest: ${stats.maxDuration}ms`);
      console.log(`   Median:  ${stats.medianDuration}ms`);
      console.log(`   Range:   ${stats.maxDuration - stats.minDuration}ms`);
      
      // Performance rating
      const speed = stats.avgDuration;
      let rating;
      if (speed < 2000) rating = '🚀 Very Fast';
      else if (speed < 4000) rating = '⚡ Fast';
      else if (speed < 8000) rating = '🐌 Slow';
      else rating = '🐌🐌 Very Slow';
      
      console.log(`   Rating:  ${rating}`);
    });
  
  // Speed comparison
  console.log('\n🏁 SPEED RANKING:');
  Object.entries(modelStats)
    .filter(([_, stats]) => stats.successes > 0)
    .sort((a, b) => a[1].avgDuration - b[1].avgDuration)
    .forEach(([model, stats], index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
      console.log(`${medal} ${index + 1}. ${model}: ${stats.avgDuration}ms avg`);
    });
  
  // Save detailed results to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = path.join(__dirname, `model-test-results-${timestamp}.json`);
  
  try {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: modelStats,
      detailedResults: allResults
    }, null, 2));
    console.log(`\n💾 Detailed results saved to: ${filename}`);
  } catch (error) {
    console.log(`\n❌ Could not save results file: ${error.message}`);
  }
}

/**
 * Test if a URL is accessible before running the full test
 */
async function testUrlAccessibility(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = new URL(url);
    
    const req = protocol.request({
      hostname: options.hostname,
      port: options.port,
      path: options.pathname + options.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      resolve({
        url,
        accessible: res.statusCode < 400,
        statusCode: res.statusCode
      });
    });

    req.on('error', () => {
      resolve({
        url,
        accessible: false,
        statusCode: null
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
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
 * Check if environment is properly configured
 */
function checkEnvironment() {
  console.log('🔍 Checking environment configuration...\n');
  
  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'GOOGLE_API_KEY'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\nPlease check your .env file in the carens-cookbook directory.\n');
    return false;
  }
  
  console.log('✅ Environment variables configured correctly');
  console.log(`   - OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`   - GOOGLE_API_KEY: ${process.env.GOOGLE_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`   - Base URL: ${BASE_URL}\n`);
  
  return true;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting AI Model Comparison Test');
  console.log(`📋 Testing ${TEST_URLS.length} URLs across ${MODELS_TO_TEST.length} models`);
  console.log(`🎯 Target API: ${BASE_URL}/api/fetch-recipe`);
  console.log('\nModels to test:', MODELS_TO_TEST.join(', '));
  
  // Check environment first
  if (!checkEnvironment()) {
    process.exit(1);
  }
  
  // Test URL accessibility first
  console.log('🔍 Testing URL accessibility...\n');
  const urlTests = await Promise.all(TEST_URLS.map(testUrlAccessibility));
  
  const workingUrls = [];
  const failedUrls = [];
  
  urlTests.forEach(test => {
    if (test.accessible) {
      workingUrls.push(test.url);
      console.log(`✅ ${test.url} (${test.statusCode})`);
    } else {
      failedUrls.push(test);
      console.log(`❌ ${test.url} (${test.statusCode})`);
    }
  });
  
  console.log(`\n📊 URL Accessibility: ${workingUrls.length}/${TEST_URLS.length} URLs accessible`);
  
  if (workingUrls.length === 0) {
    console.log('❌ No URLs are accessible. Please check your internet connection or try different URLs.');
    process.exit(1);
  }
  
  if (failedUrls.length > 0) {
    console.log(`⚠️  Skipping ${failedUrls.length} inaccessible URLs`);
  }
  
  console.log(`\n🚀 Proceeding with ${workingUrls.length} working URLs...\n`);
  
  const allResults = [];
  
  for (let i = 0; i < workingUrls.length; i++) {
    const results = await testUrlAcrossModels(workingUrls[i], i);
    allResults.push(results);
    
    // Progress indicator
    console.log(`\n⏳ Progress: ${i + 1}/${workingUrls.length} URLs completed`);
    
    // Longer delay between URLs to avoid overwhelming the API
    if (i < workingUrls.length - 1) {
      console.log('   Waiting 3 seconds before next URL...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  generateSummary(allResults);
  
  console.log('\n✨ Test completed!');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⛔ Test interrupted by user');
  process.exit(0);
});

// Run the test
if (require.main === module) {
  main().catch(error => {
    console.error('\n💥 Test failed:', error.message);
    process.exit(1);
  });
}

module.exports = { testUrlAcrossModels, fetchRecipe }; 