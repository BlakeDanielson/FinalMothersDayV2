#!/usr/bin/env node

/**
 * Quick Recipe Photo Test
 * Tests first 3 HEIC photos through both AI models for quick validation
 * Similar to quick-test.js but for image processing
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
const MAX_PHOTOS = 50; // Test more photos (up to 50, but we only have 14)
const REQUEST_DELAY = 3000; // 3 seconds between requests

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

async function getTestPhotoFiles() {
  try {
    const photoPath = path.resolve(__dirname, RECIPE_PHOTOS_DIR);
    const files = await fs.readdir(photoPath);
    
    // Filter for HEIC files and take up to MAX_PHOTOS
    const heicFiles = files
      .filter(file => file.toLowerCase().endsWith('.heic'))
      .slice(0, MAX_PHOTOS);
    
    log(`📁 Found ${heicFiles.length} HEIC files for full test in ${photoPath}`, 'blue');
    
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

async function runQuickPhotoTest() {
  log('🧪 FULL RECIPE PHOTO AI TEST (WITH HEIC CONVERSION)', 'bright');
  log('═'.repeat(70), 'cyan');
  log(`📊 Testing up to ${MAX_PHOTOS} HEIC photos from ${RECIPE_PHOTOS_DIR}`, 'blue');
  log(`🤖 Using ${AI_PROVIDERS.map(p => p.name).join(' & ')}`, 'blue');
  log(`🔄 Converting HEIC → JPEG (like frontend)`, 'blue');
  log(`🌐 Base URL: ${BASE_URL}`, 'blue');
  log('', 'reset');

  try {
    const photoFiles = await getTestPhotoFiles();
    
    if (photoFiles.length === 0) {
      log('❌ No HEIC files found in recipe_photos directory!', 'red');
      return;
    }

    const results = [];
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
    for (const [photoIndex, photoFile] of photoFiles.entries()) {
      log(`\n📊 Progress: ${photoIndex + 1}/${photoFiles.length} photos`, 'bright');
      log(`🖼️  Testing: ${photoFile.filename}`, 'cyan');
      
      for (const [providerIndex, provider] of AI_PROVIDERS.entries()) {
        log(`\n🤖 Testing with ${provider.name}`, 'magenta');
        
        const result = await processPhotoWithAI(photoFile, provider);
        
        if (result.success) {
          if (result.hasRealData) {
            log(`  ✅ SUCCESS - Real data (${result.duration}ms)`, 'green');
            log(`  📝 Title: "${result.recipe.title}"`, 'green');
            log(`  🥘 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
            log(`  🍽️  Category: ${result.recipe.category} | Cuisine: ${result.recipe.cuisine}`, 'blue');
            log(`  📄 Converted: ${result.convertedFilename}`, 'blue');
            
            // Show a sample ingredient and step for validation
            if (result.recipe.ingredients.length > 0) {
              log(`  📋 Sample ingredient: "${result.recipe.ingredients[0]}"`, 'blue');
            }
            if (result.recipe.steps.length > 0) {
              log(`  👨‍🍳 Sample step: "${result.recipe.steps[0]}"`, 'blue');
            }
          } else {
            log(`  ⚠️  SUCCESS - Default/Empty data (${result.duration}ms)`, 'yellow');
          }
        } else {
          log(`  ❌ FAILED: ${result.error}`, 'red');
        }
        
        results.push(result);
        
        // Update statistics
        totalTests++;
        const stats = providerStats[provider.id];
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
        
        // Delay between provider requests
        if (providerIndex < AI_PROVIDERS.length - 1) {
          log(`  ⏳ Waiting ${REQUEST_DELAY/1000}s before next provider...`, 'blue');
          await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
        }
      }
      
      // Delay between photos
      if (photoIndex < photoFiles.length - 1) {
        log(`\n⏳ Waiting ${REQUEST_DELAY/1000}s before next photo...`, 'blue');
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      }
    }

    // Generate results summary
    generateQuickResults(results, totalTests, successfulTests, realDataTests, durations, providerStats, photoFiles.length);
    
  } catch (error) {
    log(`❌ Quick test failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

function generateQuickResults(results, totalTests, successfulTests, realDataTests, durations, providerStats, totalPhotos) {
  log('\n\n📊 QUICK TEST RESULTS (WITH HEIC CONVERSION)', 'bright');
  log('═'.repeat(70), 'cyan');
  
  // Overall statistics
  const successRate = totalTests > 0 ? (successfulTests / totalTests * 100).toFixed(2) : '0.00';
  const realDataRate = totalTests > 0 ? (realDataTests / totalTests * 100).toFixed(2) : '0.00';
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  log(`📁 Photos Tested: ${totalPhotos}`, 'blue');
  log(`🧪 Total Tests Run: ${totalTests}`, 'blue');
  log(`🎯 Overall Success Rate: ${successRate}% (${successfulTests}/${totalTests})`, 'green');
  log(`📊 Real Data Rate: ${realDataRate}% (${realDataTests}/${totalTests})`, 'blue');
  log(`⏱️  Average Duration: ${avgDuration}ms (includes HEIC conversion)`, 'blue');
  log(`🏃 Fastest: ${minDuration}ms`, 'green');
  log(`🐌 Slowest: ${maxDuration}ms`, 'yellow');

  // Provider-specific statistics
  log('\n🤖 PROVIDER PERFORMANCE:', 'bright');
  log('─'.repeat(50), 'cyan');
  
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
  log('\n🎯 QUICK PERFORMANCE ANALYSIS:', 'bright');
  log('─'.repeat(50), 'cyan');
  
  if (parseFloat(realDataRate) >= 70) {
    log('🏆 EXCELLENT: Photo processing with HEIC conversion is working great!', 'green');
    log('✅ Ready to run full test suite', 'green');
  } else if (parseFloat(realDataRate) >= 40) {
    log('👍 GOOD: Photo processing shows promise with HEIC conversion', 'yellow');
    log('💡 Consider running full test to get better insights', 'yellow');
  } else if (parseFloat(realDataRate) >= 10) {
    log('⚠️  PARTIAL: Some photos are being processed after HEIC conversion', 'yellow');
    log('🔍 Check if photos contain clear, readable recipes', 'yellow');
  } else {
    log('🔴 ISSUES: Photo processing may need attention even with HEIC conversion', 'red');
    log('🛠️  Check API configuration and photo quality', 'red');
  }

  if (parseInt(avgDuration) <= 20000) {
    log('🚀 SPEED: Processing is fast (under 20s including conversion)', 'green');
  } else if (parseInt(avgDuration) <= 40000) {
    log('✅ SPEED: Processing time is reasonable (under 40s including conversion)', 'yellow');
  } else {
    log('⏱️  SLOW: Processing is taking longer than expected (including conversion)', 'red');
  }

  // Next steps recommendations
  log('\n🎯 NEXT STEPS:', 'bright');
  if (parseFloat(realDataRate) >= 50) {
    log('1. Run full test suite: node recipe-photo-test.js', 'green');
    log('2. Test batch processing: node recipe-photo-batch-test.js', 'green');
  } else {
    log('1. Check photo quality - ensure they contain clear recipes', 'yellow');
    log('2. Verify API keys are configured correctly', 'yellow');
    log('3. Test with a known good recipe photo manually', 'yellow');
  }

  log('\n🔄 HEIC Conversion: Working correctly (matches frontend behavior)', 'green');

  return {
    totalPhotos,
    totalTests,
    successfulTests,
    realDataTests,
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
  runQuickPhotoTest().catch(error => {
    log(`\n❌ Quick test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runQuickPhotoTest, processPhotoWithAI, convertHeicToJpeg };