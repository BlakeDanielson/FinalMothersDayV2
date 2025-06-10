#!/usr/bin/env node

/**
 * Recipe Photo Batch AI Processing Test
 * Tests batches of HEIC photos using the /scan-recipe-multiple endpoint
 * Simulates how users might upload multiple photos of the same recipe
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

// AI Providers to test
const AI_PROVIDERS = [
  {
    name: 'OpenAI GPT-4o',
    id: 'openai',
    endpoint: '/api/scan-recipe-multiple',
    description: 'High accuracy with excellent image understanding'
  },
  {
    name: 'Google Gemini 2.5 Flash',
    id: 'gemini', 
    endpoint: '/api/scan-recipe-multiple',
    description: 'Fast processing with enhanced multimodal capabilities'
  }
];

// Test configuration
const RECIPE_PHOTOS_DIR = '../recipe_photos';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REQUEST_DELAY = 5000; // 5 seconds between requests (longer for batch processing)
const BATCH_SIZES = [2, 3, 4]; // Different batch sizes to test

async function ensureFetch() {
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (e) {
      throw new Error('No fetch implementation available. Please install node-fetch: npm install node-fetch');
    }
  }
  
  // Also try to import FormData for Node.js environments
  if (typeof FormData === 'undefined') {
    try {
      global.FormData = (await import('form-data')).default;
    } catch (e) {
      console.warn('Warning: FormData not available, some functionality may be limited');
    }
  }
}

async function getPhotoFiles() {
  try {
    const photoPath = path.resolve(__dirname, RECIPE_PHOTOS_DIR);
    const files = await fs.readdir(photoPath);
    
    // Filter for HEIC files
    const heicFiles = files.filter(file => 
      file.toLowerCase().endsWith('.heic')
    );
    
    log(`📁 Found ${heicFiles.length} HEIC files in ${photoPath}`, 'blue');
    
    return heicFiles.map(filename => ({
      filename,
      path: path.join(photoPath, filename)
    }));
  } catch (error) {
    throw new Error(`Failed to read photo directory: ${error.message}`);
  }
}

function createBatches(photoFiles, batchSize) {
  const batches = [];
  for (let i = 0; i < photoFiles.length; i += batchSize) {
    const batch = photoFiles.slice(i, i + batchSize);
    if (batch.length >= 2) { // Only create batches with at least 2 images
      batches.push(batch);
    }
  }
  return batches;
}

async function processBatchWithAI(photoBatch, aiProvider) {
  await ensureFetch();
  
  try {
    const startTime = Date.now();
    
    // Create FormData for multiple images
    const formData = new FormData();
    
    log(`  📤 Uploading ${photoBatch.length} photos to ${aiProvider.name}...`, 'cyan');
    
    // Add each image to the form data
    for (const [index, photoFile] of photoBatch.entries()) {
      const imageBuffer = await fs.readFile(photoFile.path);
      const imageBlob = new Blob([imageBuffer], { type: 'image/heic' });
      formData.append('images', imageBlob, photoFile.filename);
      log(`    📄 Added: ${photoFile.filename}`, 'blue');
    }
    
    formData.append('provider', aiProvider.id);
    
    const response = await fetch(`${BASE_URL}${aiProvider.endpoint}`, {
      method: 'POST',
      body: formData
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error || errorData.userMessage || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.success && data.recipe) {
      // Check if we got actual recipe data (not just defaults)
      const hasRealData = data.recipe.title && 
                         data.recipe.title !== "Recipe" && 
                         data.recipe.title !== "Unknown Recipe" &&
                         data.recipe.ingredients && 
                         data.recipe.ingredients.length > 0 &&
                         data.recipe.steps && 
                         data.recipe.steps.length > 0;

      return {
        success: true,
        duration,
        recipe: data.recipe,
        hasRealData,
        provider: aiProvider.id,
        batchSize: photoBatch.length,
        filenames: photoBatch.map(p => p.filename)
      };
    } else {
      throw new Error(data.error || data.userMessage || 'No recipe data returned');
    }
    
  } catch (error) {
    return {
      success: false,
      duration: 0,
      error: error.message,
      hasRealData: false,
      provider: aiProvider.id,
      batchSize: photoBatch.length,
      filenames: photoBatch.map(p => p.filename)
    };
  }
}

async function testBatchWithAllProviders(photoBatch, batchIndex, totalBatches) {
  const batchName = photoBatch.map(p => p.filename).join(', ');
  log(`\n🖼️  Testing batch ${batchIndex + 1}/${totalBatches} (${photoBatch.length} photos)`, 'bright');
  log(`📄 Files: ${batchName}`, 'cyan');
  log('═'.repeat(100), 'cyan');
  
  const results = [];
  
  for (const provider of AI_PROVIDERS) {
    log(`\n🤖 Testing with ${provider.name}`, 'magenta');
    
    const result = await processBatchWithAI(photoBatch, provider);
    
    if (result.success) {
      if (result.hasRealData) {
        log(`  ✅ SUCCESS - Real data (${result.duration}ms)`, 'green');
        log(`  📝 Title: "${result.recipe.title}"`, 'green');
        log(`  🥘 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
        log(`  🍽️  Category: ${result.recipe.category} | Cuisine: ${result.recipe.cuisine}`, 'blue');
        log(`  🖼️  Images processed: ${result.batchSize}`, 'blue');
      } else {
        log(`  ⚠️  SUCCESS - Default/Empty data (${result.duration}ms)`, 'yellow');
      }
    } else {
      log(`  ❌ FAILED: ${result.error}`, 'red');
    }
    
    results.push(result);
    
    // Delay between provider requests
    if (AI_PROVIDERS.indexOf(provider) < AI_PROVIDERS.length - 1) {
      log(`  ⏳ Waiting ${REQUEST_DELAY/1000}s before next provider...`, 'blue');
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }
  }
  
  return results;
}

async function runBatchTest() {
  log('🧪 RECIPE PHOTO BATCH AI PROCESSING TEST', 'bright');
  log('═'.repeat(100), 'cyan');
  log(`📊 Testing HEIC photo batches from ${RECIPE_PHOTOS_DIR}`, 'blue');
  log(`🤖 Using ${AI_PROVIDERS.map(p => p.name).join(' & ')}`, 'blue');
  log(`📦 Batch sizes: ${BATCH_SIZES.join(', ')} photos`, 'blue');
  log(`🌐 Base URL: ${BASE_URL}`, 'blue');
  log('', 'reset');

  try {
    const photoFiles = await getPhotoFiles();
    
    if (photoFiles.length < 2) {
      log('❌ Need at least 2 HEIC files for batch testing!', 'red');
      return;
    }

    const allResults = [];
    let totalTests = 0;
    let successfulTests = 0;
    let realDataTests = 0;
    const providerStats = {};
    const batchSizeStats = {};
    const durations = [];

    // Initialize provider stats
    AI_PROVIDERS.forEach(provider => {
      providerStats[provider.id] = {
        name: provider.name,
        total: 0,
        successful: 0,
        realData: 0,
        durations: [],
        batchSizes: {}
      };
    });

    // Initialize batch size stats
    BATCH_SIZES.forEach(size => {
      batchSizeStats[size] = {
        total: 0,
        successful: 0,
        realData: 0,
        durations: []
      };
    });

    // Test each batch size
    for (const batchSize of BATCH_SIZES) {
      log(`\n\n📦 TESTING BATCH SIZE: ${batchSize} photos`, 'bright');
      log('═'.repeat(80), 'magenta');
      
      const batches = createBatches(photoFiles, batchSize);
      
      if (batches.length === 0) {
        log(`⚠️  No valid batches of size ${batchSize} can be created`, 'yellow');
        continue;
      }
      
      log(`📊 Created ${batches.length} batches of ${batchSize} photos each`, 'blue');
      
      // Test each batch
      for (const [batchIndex, batch] of batches.entries()) {
        const batchResults = await testBatchWithAllProviders(batch, batchIndex, batches.length);
        allResults.push({
          batchSize,
          batchIndex: batchIndex + 1,
          filenames: batch.map(p => p.filename),
          results: batchResults
        });
        
        // Update statistics
        batchResults.forEach(result => {
          totalTests++;
          const stats = providerStats[result.provider];
          stats.total++;
          
          // Update batch size stats
          batchSizeStats[batchSize].total++;
          
          // Initialize batch size tracking for provider if not exists
          if (!stats.batchSizes[batchSize]) {
            stats.batchSizes[batchSize] = { total: 0, successful: 0, realData: 0 };
          }
          stats.batchSizes[batchSize].total++;
          
          if (result.success) {
            successfulTests++;
            stats.successful++;
            batchSizeStats[batchSize].successful++;
            stats.batchSizes[batchSize].successful++;
            durations.push(result.duration);
            stats.durations.push(result.duration);
            batchSizeStats[batchSize].durations.push(result.duration);
            
            if (result.hasRealData) {
              realDataTests++;
              stats.realData++;
              batchSizeStats[batchSize].realData++;
              stats.batchSizes[batchSize].realData++;
            }
          }
        });
        
        // Delay between batches (longer delay)
        if (batchIndex < batches.length - 1) {
          log(`\n⏳ Waiting ${REQUEST_DELAY/1000}s before next batch...`, 'blue');
          await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
        }
      }
    }

    // Generate comprehensive results
    await generateBatchResults(allResults, totalTests, successfulTests, realDataTests, durations, providerStats, batchSizeStats);
    
  } catch (error) {
    log(`❌ Batch test failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function generateBatchResults(allResults, totalTests, successfulTests, realDataTests, durations, providerStats, batchSizeStats) {
  log('\n\n📊 COMPREHENSIVE BATCH TEST RESULTS', 'bright');
  log('═'.repeat(100), 'cyan');
  
  // Overall statistics
  const successRate = totalTests > 0 ? (successfulTests / totalTests * 100).toFixed(2) : '0.00';
  const realDataRate = totalTests > 0 ? (realDataTests / totalTests * 100).toFixed(2) : '0.00';
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  log(`🧪 Total Batch Tests Run: ${totalTests}`, 'blue');
  log(`🎯 Overall Success Rate: ${successRate}% (${successfulTests}/${totalTests})`, 'green');
  log(`📊 Real Data Rate: ${realDataRate}% (${realDataTests}/${totalTests})`, 'blue');
  log(`⏱️  Average Duration: ${avgDuration}ms`, 'blue');
  log(`🏃 Fastest: ${minDuration}ms`, 'green');
  log(`🐌 Slowest: ${maxDuration}ms`, 'yellow');

  // Batch size performance
  log('\n📦 BATCH SIZE PERFORMANCE:', 'bright');
  log('─'.repeat(80), 'cyan');
  
  Object.entries(batchSizeStats).forEach(([size, stats]) => {
    const batchSuccessRate = stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(2) : '0.00';
    const batchRealDataRate = stats.total > 0 ? (stats.realData / stats.total * 100).toFixed(2) : '0.00';
    const batchAvgDuration = stats.durations.length > 0 ? 
      (stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length).toFixed(0) : 0;
    
    log(`\nBatch Size ${size} photos:`, 'magenta');
    log(`  📊 Success Rate: ${batchSuccessRate}% (${stats.successful}/${stats.total})`, 'green');
    log(`  🎯 Real Data Rate: ${batchRealDataRate}% (${stats.realData}/${stats.total})`, 'blue');
    log(`  ⏱️  Avg Duration: ${batchAvgDuration}ms`, 'blue');
  });

  // Provider-specific statistics
  log('\n🤖 PROVIDER PERFORMANCE:', 'bright');
  log('─'.repeat(80), 'cyan');
  
  Object.values(providerStats).forEach(stats => {
    const providerSuccessRate = stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(2) : '0.00';
    const providerRealDataRate = stats.total > 0 ? (stats.realData / stats.total * 100).toFixed(2) : '0.00';
    const providerAvgDuration = stats.durations.length > 0 ? 
      (stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length).toFixed(0) : 0;
    
    log(`\n${stats.name}:`, 'magenta');
    log(`  📊 Success Rate: ${providerSuccessRate}% (${stats.successful}/${stats.total})`, 'green');
    log(`  🎯 Real Data Rate: ${providerRealDataRate}% (${stats.realData}/${stats.total})`, 'blue');
    log(`  ⏱️  Avg Duration: ${providerAvgDuration}ms`, 'blue');
    
    // Show performance by batch size
    log(`  📦 By Batch Size:`, 'cyan');
    Object.entries(stats.batchSizes).forEach(([size, batchStats]) => {
      const batchSuccessRate = batchStats.total > 0 ? (batchStats.successful / batchStats.total * 100).toFixed(2) : '0.00';
      log(`    ${size} photos: ${batchSuccessRate}% success (${batchStats.successful}/${batchStats.total})`, 'blue');
    });
  });

  // Performance analysis
  log('\n🎯 BATCH PERFORMANCE ANALYSIS:', 'bright');
  log('─'.repeat(80), 'cyan');
  
  if (parseFloat(realDataRate) >= 70) {
    log('🏆 EXCELLENT: Batch processing real data rate exceeds 70%!', 'green');
  } else if (parseFloat(realDataRate) >= 50) {
    log('👍 GOOD: Batch processing real data rate is acceptable (50%+)', 'yellow');
  } else if (parseFloat(realDataRate) >= 25) {
    log('⚠️  NEEDS WORK: Batch processing real data rate below 50%', 'yellow');
  } else {
    log('🔴 POOR: Batch processing real data rate below 25%', 'red');
  }

  if (parseInt(avgDuration) <= 30000) {
    log('🚀 EXCELLENT: Average batch processing time under 30 seconds!', 'green');
  } else if (parseInt(avgDuration) <= 60000) {
    log('✅ GOOD: Average batch processing time under 60 seconds', 'yellow');
  } else {
    log('⏱️  SLOW: Average batch processing time exceeds 60 seconds', 'red');
  }

  // Save detailed results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = `recipe-photo-batch-test-results-${timestamp}.json`;
  
  const detailedResults = {
    timestamp: new Date().toISOString(),
    testType: 'batch-processing',
    summary: {
      totalTests,
      successfulTests,
      realDataTests,
      successRate: parseFloat(successRate),
      realDataRate: parseFloat(realDataRate),
      avgDuration: parseInt(avgDuration),
      minDuration,
      maxDuration
    },
    providerStats,
    batchSizeStats,
    detailedResults: allResults
  };

  try {
    await fs.writeFile(resultsFile, JSON.stringify(detailedResults, null, 2));
    log(`\n💾 Detailed batch results saved to: ${resultsFile}`, 'green');
  } catch (error) {
    log(`\n⚠️  Could not save results file: ${error.message}`, 'yellow');
  }

  return detailedResults;
}

// Main execution
if (require.main === module) {
  runBatchTest().catch(error => {
    log(`\n❌ Batch test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runBatchTest, processBatchWithAI, createBatches }; 