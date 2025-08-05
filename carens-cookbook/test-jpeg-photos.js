const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

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

// API Configuration
const API_BASE_URL = 'http://localhost:3000';
const JPEG_PHOTOS_DIR = '../recipe_photos/jpegRecipes';
const MAX_PHOTOS = 5; // Test first 5 photos for quick testing

// Test results storage
const results = {
  openai: [],
  gemini: [],
  summary: {}
};

async function testJpegPhoto(photoPath, model = 'openai') {
  const startTime = Date.now();
  
  try {
    // Read the JPEG file
    const photoBuffer = fs.readFileSync(photoPath);
    const filename = path.basename(photoPath);
    
    log(`📸 Testing ${filename} with ${model.toUpperCase()}...`, 'cyan');
    
    // Create form data - use form-data package directly with buffer
    const formData = new FormData();
    formData.append('image', photoBuffer, {
      filename: filename,
      contentType: 'image/jpeg'
    });
    formData.append('provider', model);
    
    // Make API request
    const endpoint = '/api/scan-recipe';
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData
    });
    
    const processingTime = Date.now() - startTime;
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error || errorData.userMessage || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
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
    
    if (!success || !recipe) {
      throw new Error(data.error || data.userMessage || 'No recipe data returned');
    }
    
    // Validate result structure
    const isValid = recipe && 
                   recipe.title && 
                   recipe.ingredients && 
                   recipe.steps && 
                   Array.isArray(recipe.ingredients) && 
                   Array.isArray(recipe.steps);
    
    const testResult = {
      filename,
      model,
      processingTime,
      success: true,
      valid: isValid,
      title: recipe.title || 'No title',
      ingredientCount: recipe.ingredients ? recipe.ingredients.length : 0,
      instructionCount: recipe.steps ? recipe.steps.length : 0,
      fileSize: photoBuffer.length,
      timestamp: new Date().toISOString()
    };
    
    log(`✅ ${model.toUpperCase()} - ${filename}:`, 'green');
    log(`   ⏱️  Processing time: ${processingTime}ms`, 'yellow');
    log(`   📝 Title: ${recipe.title || 'No title'}`, 'cyan');
    log(`   🥕 Ingredients: ${recipe.ingredients ? recipe.ingredients.length : 0}`, 'cyan');
    log(`   📋 Instructions: ${recipe.steps ? recipe.steps.length : 0}`, 'cyan');
    log(`   📏 File size: ${(photoBuffer.length / 1024).toFixed(1)}KB`, 'cyan');
    
    return testResult;
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    log(`❌ ${model.toUpperCase()} - ${path.basename(photoPath)}: ${error.message}`, 'red');
    
    return {
      filename: path.basename(photoPath),
      model,
      processingTime,
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

async function testAllJpegPhotos() {
  const overallStartTime = Date.now();
  
  try {
    log('🔄 Starting JPEG photo tests...', 'blue');
    
    const photoPath = path.resolve(__dirname, JPEG_PHOTOS_DIR);
    
    if (!fs.existsSync(photoPath)) {
      log('❌ JPEG photos directory not found! Run convert-photos-for-testing.js first.', 'red');
      return;
    }
    
    // Get JPEG files
    const jpegFiles = fs.readdirSync(photoPath)
      .filter(file => file.toLowerCase().match(/\.jpe?g$/))
      .sort()
      .slice(0, MAX_PHOTOS); // Limit for quick testing
    
    if (jpegFiles.length === 0) {
      log('❌ No JPEG files found in jpegRecipes directory!', 'red');
      return;
    }
    
    log(`📊 Testing first ${jpegFiles.length} JPEG photos`, 'cyan');
    
    // Test each photo with both models
    for (const file of jpegFiles) {
      const fullPath = path.join(photoPath, file);
      
      // Test with OpenAI
      const openaiResult = await testJpegPhoto(fullPath, 'openai');
      results.openai.push(openaiResult);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test with Gemini
      const geminiResult = await testJpegPhoto(fullPath, 'gemini');
      results.gemini.push(geminiResult);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate summary
    const openaiSuccessful = results.openai.filter(r => r.success);
    const geminiSuccessful = results.gemini.filter(r => r.success);
    
    const openaiAvgTime = openaiSuccessful.length > 0 ? 
      openaiSuccessful.reduce((sum, r) => sum + r.processingTime, 0) / openaiSuccessful.length : 0;
    const geminiAvgTime = geminiSuccessful.length > 0 ? 
      geminiSuccessful.reduce((sum, r) => sum + r.processingTime, 0) / geminiSuccessful.length : 0;
    
    results.summary = {
      totalTests: jpegFiles.length * 2,
      openaiSuccess: openaiSuccessful.length,
      geminiSuccess: geminiSuccessful.length,
      openaiSuccessRate: ((openaiSuccessful.length / jpegFiles.length) * 100).toFixed(1),
      geminiSuccessRate: ((geminiSuccessful.length / jpegFiles.length) * 100).toFixed(1),
      openaiAvgTime: Math.round(openaiAvgTime),
      geminiAvgTime: Math.round(geminiAvgTime),
      testDuration: Date.now() - overallStartTime
    };
    
    // Display results
    log('\n📋 JPEG Photo Test Results:', 'bright');
    log(`📊 Total tests: ${results.summary.totalTests}`, 'cyan');
    log(`✅ OpenAI: ${results.summary.openaiSuccess}/${jpegFiles.length} (${results.summary.openaiSuccessRate}%) - Avg: ${results.summary.openaiAvgTime}ms`, 'green');
    log(`✅ Gemini: ${results.summary.geminiSuccess}/${jpegFiles.length} (${results.summary.geminiSuccessRate}%) - Avg: ${results.summary.geminiAvgTime}ms`, 'green');
    log(`⏱️  Total test duration: ${Math.round(results.summary.testDuration / 1000)}s`, 'yellow');
    
    // Save results
    const resultsPath = path.join(__dirname, `jpeg-test-results-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    log(`📝 Results saved to: ${path.basename(resultsPath)}`, 'cyan');
    
    log('\n🎉 JPEG photo testing completed!', 'green');
    
    return results;
    
  } catch (error) {
    log(`❌ Error during JPEG photo testing: ${error.message}`, 'red');
    throw error;
  }
}

// Run the tests
if (require.main === module) {
  testAllJpegPhotos().catch(console.error);
}

module.exports = { testAllJpegPhotos, testJpegPhoto }; 