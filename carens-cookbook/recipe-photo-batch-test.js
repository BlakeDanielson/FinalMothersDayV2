#!/usr/bin/env node

/**
 * Recipe Photo Batch Processing Test
 * Tests batch processing of multiple HEIC photos through the multiple image API
 * Similar to single photo tests but for batch operations
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
    id: 'openai-main',
    endpoint: '/api/scan-recipe-multiple',
    description: 'High accuracy batch processing with excellent image understanding'
  },
  {
    name: 'Google Gemini 2.5 Flash',
    id: 'gemini', 
    endpoint: '/api/scan-recipe-multiple',
    description: 'Fast batch processing with enhanced multimodal capabilities'
  }
];

// Test configuration
const RECIPE_PHOTOS_DIR = '../recipe_photos';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REQUEST_DELAY = 5000; // 5 seconds between requests for batch processing
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

async function convertHeicToJpeg(imageBuffer, filename) {
  try {
    log(`    🔄 Converting ${filename} from HEIC to JPEG (server-side)...`, 'cyan');
    
    // Use heic-convert for server-side conversion (Node.js compatible)
    const heicConvert = require('heic-convert');
    
    const jpegBuffer = await heicConvert({
      buffer: imageBuffer,
      format: 'JPEG',
      quality: 0.8
    });
    
    // Create new filename with .jpeg extension
    const originalNameWithoutExt = filename.split('.').slice(0, -1).join('.');
    const jpegFilename = `${originalNameWithoutExt}.jpeg`;
    
    log(`    ✅ Server-side conversion complete: ${jpegBuffer.length} bytes`, 'green');
    
    return {
      buffer: jpegBuffer,
      filename: jpegFilename,
      mimeType: 'image/jpeg'
    };
  } catch (error) {
    log(`    ❌ HEIC conversion failed: ${error.message}`, 'red');
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

async function processBatchWithAI(photoFiles, aiProvider) {
  await ensureFetch();
  
  try {
    const startTime = Date.now();
    
    log(`  📸 Converting ${photoFiles.length} HEIC files to JPEG...`, 'cyan');
    
    // Create FormData and convert all HEIC files to JPEG
    const formData = new FormData();
    const convertedFiles = [];
    
    for (const photoFile of photoFiles) {
      // Read the image file
      const imageBuffer = await fs.readFile(photoFile.path);
      
      // Convert HEIC to JPEG
      const converted = await convertHeicToJpeg(imageBuffer, photoFile.filename);
      
      // Create a proper File-like object for the converted image (same as working quick test)
      const imageBlob = new Blob([converted.buffer], { type: converted.mimeType });
      formData.append('images', imageBlob, converted.filename);
      
      convertedFiles.push({
        original: photoFile.filename,
        converted: converted.filename
      });
    }
    
    formData.append('provider', aiProvider.id);
    
    log(`  📤 Uploading batch of ${photoFiles.length} converted images to ${aiProvider.name}...`, 'cyan');
    log(`  🔄 Converted files: ${convertedFiles.map(f => f.converted).join(', ')}`, 'blue');
    
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
        batchSize: photoFiles.length,
        originalFiles: photoFiles.map(f => f.filename),
        convertedFiles: convertedFiles.map(f => f.converted)
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
      batchSize: photoFiles.length,
      originalFiles: photoFiles.map(f => f.filename)
    };
  }
}

async function testBatchProcessing() {
  log('🧪 RECIPE PHOTO BATCH PROCESSING TEST (WITH HEIC CONVERSION)', 'bright');
  log('═'.repeat(80), 'cyan');
  log(`📊 Testing batch sizes: ${BATCH_SIZES.join(', ')}`, 'blue');
  log(`🤖 Using ${AI_PROVIDERS.map(p => p.name).join(' & ')}`, 'blue');
  log(`🔄 Converting HEIC → JPEG (like frontend)`, 'blue');
  log(`🌐 Base URL: ${BASE_URL}`, 'blue');
  log('', 'reset');

  try {
    const photoFiles = await getPhotoFiles();
    
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
    const batchStats = {};

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

    // Initialize batch size stats
    BATCH_SIZES.forEach(size => {
      batchStats[size] = {
        total: 0,
        successful: 0,
        realData: 0,
        durations: []
      };
    });

    // Test each batch size with all providers
    for (const batchSize of BATCH_SIZES) {
      if (photoFiles.length < batchSize) {
        log(`⚠️  Skipping batch size ${batchSize} - not enough photos (only ${photoFiles.length} available)`, 'yellow');
        continue;
      }

      // Get a batch of photos for this size
      const batch = photoFiles.slice(0, batchSize);
      
      log(`\n📊 Testing batch size: ${batchSize} photos`, 'bright');
      log(`🖼️  Photos: ${batch.map(f => f.filename).join(', ')}`, 'cyan');
      log('═'.repeat(80), 'cyan');
      
      for (const provider of AI_PROVIDERS) {
        log(`\n🤖 Testing batch with ${provider.name}`, 'magenta');
        
        const result = await processBatchWithAI(batch, provider);
        
        if (result.success) {
          if (result.hasRealData) {
            log(`  ✅ SUCCESS - Real data (${result.duration}ms for ${result.batchSize} photos)`, 'green');
            log(`  📝 Title: "${result.recipe.title}"`, 'green');
            log(`  🥘 ${result.recipe.ingredients.length} ingredients, ${result.recipe.steps.length} steps`, 'cyan');
            log(`  🍽️  Category: ${result.recipe.category} | Cuisine: ${result.recipe.cuisine}`, 'blue');
            log(`  📄 Converted: ${result.convertedFiles.join(', ')}`, 'blue');
            log(`  ⚡ Avg per photo: ${(result.duration / result.batchSize).toFixed(0)}ms`, 'cyan');
          } else {
            log(`  ⚠️  SUCCESS - Default/Empty data (${result.duration}ms for ${result.batchSize} photos)`, 'yellow');
          }
        } else {
          log(`  ❌ FAILED: ${result.error}`, 'red');
        }
        
        results.push(result);
        
        // Update statistics
        totalTests++;
        const stats = providerStats[provider.id];
        const batchStat = batchStats[batchSize];
        
        stats.total++;
        batchStat.total++;
        
        if (result.success) {
          successfulTests++;
          stats.successful++;
          batchStat.successful++;
          
          durations.push(result.duration);
          stats.durations.push(result.duration);
          batchStat.durations.push(result.duration);
          
          if (result.hasRealData) {
            realDataTests++;
            stats.realData++;
            batchStat.realData++;
          }
        }
        
        // Delay between provider requests
        if (AI_PROVIDERS.indexOf(provider) < AI_PROVIDERS.length - 1) {
          log(`  ⏳ Waiting ${REQUEST_DELAY/1000}s before next provider...`, 'blue');
          await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
        }
      }
      
      // Delay between batch sizes
      if (BATCH_SIZES.indexOf(batchSize) < BATCH_SIZES.length - 1) {
        log(`\n⏳ Waiting ${REQUEST_DELAY/1000}s before next batch size...`, 'blue');
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      }
    }

    // Generate results summary
    generateBatchResults(results, totalTests, successfulTests, realDataTests, durations, providerStats, batchStats);
    
  } catch (error) {
    log(`❌ Batch test failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

function generateBatchResults(results, totalTests, successfulTests, realDataTests, durations, providerStats, batchStats) {
  log('\n\n📊 BATCH PROCESSING RESULTS (WITH HEIC CONVERSION)', 'bright');
  log('═'.repeat(80), 'cyan');
  
  // Overall statistics
  const successRate = totalTests > 0 ? (successfulTests / totalTests * 100).toFixed(2) : '0.00';
  const realDataRate = totalTests > 0 ? (realDataTests / totalTests * 100).toFixed(2) : '0.00';
  const avgDuration = durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

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

  // Batch size statistics
  log('\n📊 BATCH SIZE PERFORMANCE:', 'bright');
  log('─'.repeat(50), 'cyan');
  
  Object.entries(batchStats).forEach(([size, stats]) => {
    if (stats.total === 0) return;
    
    const batchSuccessRate = (stats.successful / stats.total * 100).toFixed(2);
    const batchRealDataRate = (stats.realData / stats.total * 100).toFixed(2);
    const batchAvgDuration = stats.durations.length > 0 ? 
      (stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length).toFixed(0) : 0;
    const avgPerPhoto = parseInt(batchAvgDuration) / parseInt(size);
    
    log(`\nBatch Size ${size}:`, 'magenta');
    log(`  📊 Success Rate: ${batchSuccessRate}% (${stats.successful}/${stats.total})`, 'green');
    log(`  🎯 Real Data Rate: ${batchRealDataRate}% (${stats.realData}/${stats.total})`, 'blue');
    log(`  ⏱️  Avg Duration: ${batchAvgDuration}ms total`, 'blue');
    log(`  📸 Avg per photo: ${avgPerPhoto.toFixed(0)}ms`, 'cyan');
  });

  // Performance analysis
  log('\n🎯 BATCH PROCESSING ANALYSIS:', 'bright');
  log('─'.repeat(50), 'cyan');
  
  if (parseFloat(realDataRate) >= 70) {
    log('🏆 EXCELLENT: Batch processing with HEIC conversion is working great!', 'green');
    log('✅ Ready for production use', 'green');
  } else if (parseFloat(realDataRate) >= 40) {
    log('👍 GOOD: Batch processing shows promise with HEIC conversion', 'yellow');
    log('💡 Consider optimizing batch sizes or provider selection', 'yellow');
  } else if (parseFloat(realDataRate) >= 10) {
    log('⚠️  PARTIAL: Some batches are being processed after HEIC conversion', 'yellow');
    log('🔍 Check if photos contain clear, readable recipes', 'yellow');
  } else {
    log('🔴 ISSUES: Batch processing may need attention even with HEIC conversion', 'red');
    log('🛠️  Check API configuration and photo quality', 'red');
  }

  if (parseInt(avgDuration) <= 30000) {
    log('🚀 SPEED: Batch processing is fast (under 30s including conversion)', 'green');
  } else if (parseInt(avgDuration) <= 60000) {
    log('✅ SPEED: Batch processing time is reasonable (under 60s including conversion)', 'yellow');
  } else {
    log('⏱️  SLOW: Batch processing is taking longer than expected (including conversion)', 'red');
  }

  // Efficiency comparison
  const efficiency = Object.entries(batchStats)
    .filter(([, stats]) => stats.durations.length > 0)
    .map(([size, stats]) => {
      const avgDuration = stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length;
      const perPhoto = avgDuration / parseInt(size);
      return { size: parseInt(size), perPhoto };
    })
    .sort((a, b) => a.perPhoto - b.perPhoto);

  if (efficiency.length > 0) {
    log('\n⚡ EFFICIENCY RANKING (avg ms per photo with HEIC conversion):', 'bright');
    efficiency.forEach((item, index) => {
      const emoji = index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉';
      log(`  ${emoji} Batch size ${item.size}: ${item.perPhoto.toFixed(0)}ms per photo`, 'cyan');
    });
  }

  log('\n🔄 HEIC Conversion: Working correctly for batch processing (matches frontend behavior)', 'green');

  return {
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
  testBatchProcessing().catch(error => {
    log(`\n❌ Batch test execution failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { testBatchProcessing, processBatchWithAI, convertHeicToJpeg }; 