#!/usr/bin/env node

/**
 * Recipe Photo AI Processing Test
 * Tests all HEIC photos in /recipe_photos through both AI models (OpenAI & Gemini)
 * Similar to existing URL tests but for image processing
 * NOW WITH HEIC TO JPEG CONVERSION (like the frontend)
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
const FormData = require('form-data');

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
    endpoint: '/api/scan-recipe',
    description: 'High accuracy with excellent image understanding'
  },
  {
    name: 'Google Gemini 2.5 Flash',
    id: 'gemini', 
    endpoint: '/api/scan-recipe',
    description: 'Fast processing with enhanced multimodal capabilities'
  }
];

// Test configuration
const RECIPE_PHOTOS_DIR = '../recipe_photos';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REQUEST_DELAY = 3000; // 3 seconds between requests to avoid rate limits

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

async function convertHeicToJpeg(imageBuffer, filename) {
  try {
    log(`  🔄 Converting ${filename} from HEIC to JPEG...`, 'cyan');
    
    // Import heic-convert (Node.js compatible)
    const convert = require('heic-convert');
    
    // Convert HEIC to JPEG using heic-convert
    const jpegBuffer = await convert({
      buffer: imageBuffer,   // the HEIC file buffer
      format: 'JPEG',       // output format
      quality: 0.8          // the jpeg compression quality, between 0 and 1
    });
    
    // Create new filename with .jpeg extension
    const originalNameWithoutExt = filename.split('.').slice(0, -1).join('.');
    const jpegFilename = `${originalNameWithoutExt}.jpeg`;
    
    log(`  ✅ Converted to JPEG: ${jpegBuffer.length} bytes`, 'green');
    
    return {
      buffer: jpegBuffer,
      filename: jpegFilename,
      mimeType: 'image/jpeg'
    };
  } catch (error) {
    log(`  ❌ HEIC conversion failed: ${error.message}`, 'red');
    throw new Error(`HEIC conversion failed: ${error.message}`);
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

async function processPhotoWithAI(photoFile, aiProvider) {
  await ensureFetch();
  
  try {
    const startTime = Date.now();
    
    // Read the image file
    const imageBuffer = await fs.readFile(photoFile.path);
    
    // Convert HEIC to JPEG (like the frontend does)
    const converted = await convertHeicToJpeg(imageBuffer, photoFile.filename);
    
    // Create FormData with the converted image
    const formData = new FormData();
    
    // Create a proper File-like object for the converted image
    const imageBlob = new Blob([converted.buffer], { type: converted.mimeType });
    formData.append('image', imageBlob, converted.filename);
    formData.append('provider', aiProvider.id);
    
    log(`  📤 Uploading converted ${converted.filename} to ${aiProvider.name}...`, 'cyan');
    
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
    
    log(`  📋 API Response: ${JSON.stringify(data, null, 2).slice(0, 200)}...`, 'blue');
    
    // Handle both wrapped {success: true, recipe: {...}} and direct recipe responses
    let recipe = null;
    let success = false;
    
    if (data.success && data.recipe) {
      // Wrapped format: {success: true, recipe: {...}}
      recipe = data.recipe;
      success = true;
    } else if (data.title && data.ingredients && data.steps) {
      // Direct format: {title: "...", ingredients: [...], steps: [...]}
      recipe = data;
      success = true;
    }
    
    if (success && recipe) {
      // Check if we got actual recipe data (not just defaults)
      const hasRealData = recipe.title && 
                         recipe.title !== "Recipe" && 
                         recipe.title !== "Unknown Recipe" &&
                         recipe.ingredients && 
                         recipe.ingredients.length > 0 &&
                         recipe.steps && 
                         recipe.steps.length > 0;

      return {
        success: true,
        duration,
        recipe: recipe,
        hasRealData,
        provider: aiProvider.id,
        filename: photoFile.filename,
        convertedFilename: converted.filename
      };
    } else {
      const errorMsg = data.error || data.userMessage || data.message || 'No recipe data returned';
      log(`  🔍 Response details: success=${data.success}, hasRecipe=${!!data.recipe}, hasTitle=${!!data.title}`, 'yellow');
      throw new Error(errorMsg);
    }
    
  } catch (error) {
    return {
      success: false,
      duration: 0,
      error: error.message,
      hasRealData: false,
      provider: aiProvider.id,
      filename: photoFile.filename
    };
  }
}

async function testPhotoWithAllProviders(photoFile) {
  log(`\n🖼️  Testing photo: ${photoFile.filename}`, 'bright');
  log('═'.repeat(80), 'cyan');
  
  const results = [];
  
  for (const provider of AI_PROVIDERS) {
    log(`\n🤖 Testing with ${provider.name}`, 'magenta');
    
    const result = await processPhotoWithAI(photoFile, provider);
    
    if (result.success) {
      if (result.hasRealData) {
        log(`  ✅ SUCCESS - Real data (${result.duration}ms)`, 'green');
        log(`  📝 Title: "${result.recipe.title}"`, 'green');
        log(`  🥘 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
        log(`  🍽️  Category: ${result.recipe.category} | Cuisine: ${result.recipe.cuisine}`, 'blue');
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

async function runPhotoTest() {
  log('🧪 RECIPE PHOTO AI PROCESSING TEST', 'bright');
  log('═'.repeat(80), 'cyan');
  log(`📊 Testing HEIC photos from ${RECIPE_PHOTOS_DIR}`, 'blue');
  log(`🤖 Using ${AI_PROVIDERS.map(p => p.name).join(' & ')}`, 'blue');
  log(`🌐 Base URL: ${BASE_URL}`, 'blue');
  log('', 'reset');

  try {
    const photoFiles = await getPhotoFiles();
    
    if (photoFiles.length === 0) {
      log('❌ No HEIC files found in recipe_photos directory!', 'red');
      return;
    }

    const allResults = [];
    let totalTests = 0;
    let successfulTests = 0;
    let realDataTests = 0;
    const providerStats = {};
    const durations = [];

    // Initialize provider stats
    AI_PROVIDERS.forEach(provider => {
      providerStats[provider.id] = {
        name: provider.name,
        total: 0,
        successful: 0,
        realData: 0,
        durations: []
      };
    });

    // Test each photo with all providers
    for (const [index, photoFile] of photoFiles.entries()) {
      log(`\n📊 Progress: ${index + 1}/${photoFiles.length} photos`, 'bright');
      
      const photoResults = await testPhotoWithAllProviders(photoFile);
      allResults.push({
        filename: photoFile.filename,
        results: photoResults
      });
      
      // Update statistics
      photoResults.forEach(result => {
        totalTests++;
        const stats = providerStats[result.provider];
        stats.total++;
        
        if (result.success) {
          successfulTests++;
          stats.successful++;
          durations.push(result.duration);
          stats.durations.push(result.duration);
          
          if (result.hasRealData) {
            realDataTests++;
            stats.realData++;
          }
        }
      });
      
      // Delay between photos (longer delay)
      if (index < photoFiles.length - 1) {
        log(`\n⏳ Waiting ${REQUEST_DELAY/1000}s before next photo...`, 'blue');
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      }
    }

    // Generate comprehensive results
    await generateResults(allResults, totalTests, successfulTests, realDataTests, durations, providerStats, photoFiles.length);
    
  } catch (error) {
    log(`❌ Test failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function generateResults(allResults, totalTests, successfulTests, realDataTests, durations, providerStats, totalPhotos) {
  log('\n\n📊 COMPREHENSIVE TEST RESULTS', 'bright');
  log('═'.repeat(80), 'cyan');
  
  // Overall statistics
  const successRate = totalTests > 0 ? (successfulTests / totalTests * 100).toFixed(2) : '0.00';
  const realDataRate = totalTests > 0 ? (realDataTests / totalTests * 100).toFixed(2) : '0.00';
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  log(`📁 Photos Processed: ${totalPhotos}`, 'blue');
  log(`🧪 Total Tests Run: ${totalTests}`, 'blue');
  log(`🎯 Overall Success Rate: ${successRate}% (${successfulTests}/${totalTests})`, 'green');
  log(`📊 Real Data Rate: ${realDataRate}% (${realDataTests}/${totalTests})`, 'blue');
  log(`⏱️  Average Duration: ${avgDuration}ms`, 'blue');
  log(`🏃 Fastest: ${minDuration}ms`, 'green');
  log(`🐌 Slowest: ${maxDuration}ms`, 'yellow');

  // Provider-specific statistics
  log('\n🤖 PROVIDER PERFORMANCE:', 'bright');
  log('─'.repeat(60), 'cyan');
  
  Object.values(providerStats).forEach(stats => {
    const providerSuccessRate = stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(2) : '0.00';
    const providerRealDataRate = stats.total > 0 ? (stats.realData / stats.total * 100).toFixed(2) : '0.00';
    const providerAvgDuration = stats.durations.length > 0 ? 
      (stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length).toFixed(0) : 0;
    
    log(`\n${stats.name}:`, 'magenta');
    log(`  📊 Success Rate: ${providerSuccessRate}% (${stats.successful}/${stats.total})`, 'green');
    log(`  🎯 Real Data Rate: ${providerRealDataRate}% (${stats.realData}/${stats.total})`, 'blue');
    log(`  ⏱️  Avg Duration: ${providerAvgDuration}ms`, 'blue');
  });

  // Performance analysis
  log('\n🎯 PERFORMANCE ANALYSIS:', 'bright');
  log('─'.repeat(60), 'cyan');
  
  if (parseFloat(realDataRate) >= 80) {
    log('🏆 EXCELLENT: Real data extraction rate exceeds 80%!', 'green');
  } else if (parseFloat(realDataRate) >= 60) {
    log('👍 GOOD: Real data extraction rate is acceptable (60%+)', 'yellow');
  } else if (parseFloat(realDataRate) >= 30) {
    log('⚠️  NEEDS WORK: Real data extraction rate below 60%', 'yellow');
  } else {
    log('🔴 POOR: Real data extraction rate below 30% - photos may not contain clear recipes', 'red');
  }

  if (parseInt(avgDuration) <= 20000) {
    log('🚀 EXCELLENT: Average processing time under 20 seconds!', 'green');
  } else if (parseInt(avgDuration) <= 45000) {
    log('✅ GOOD: Average processing time under 45 seconds', 'yellow');
  } else {
    log('⏱️  SLOW: Average processing time exceeds 45 seconds', 'red');
  }

  // Save detailed results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = `recipe-photo-test-results-${timestamp}.json`;
  
  const detailedResults = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPhotos,
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
    detailedResults: allResults
  };

  try {
    await fs.writeFile(resultsFile, JSON.stringify(detailedResults, null, 2));
    log(`\n💾 Detailed results saved to: ${resultsFile}`, 'green');
  } catch (error) {
    log(`\n⚠️  Could not save results file: ${error.message}`, 'yellow');
  }

  return detailedResults;
}

// Main execution
if (require.main === module) {
  runPhotoTest().catch(error => {
    log(`\n❌ Test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runPhotoTest, processPhotoWithAI, getPhotoFiles }; 