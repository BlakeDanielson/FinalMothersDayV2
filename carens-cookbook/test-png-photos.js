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
const PNG_PHOTOS_DIR = '../recipe_photos/pngRecipes';
const MAX_PHOTOS = 5; // Test first 5 photos for quick testing

// Test results storage
const results = {
  openai: [],
  gemini: [],
  summary: {}
};

async function testPngPhoto(photoPath, model = 'openai') {
  const startTime = Date.now();
  
  try {
    // Read the PNG file
    const photoBuffer = fs.readFileSync(photoPath);
    const filename = path.basename(photoPath);
    
    log(`📸 Testing ${filename} with ${model.toUpperCase()}...`, 'cyan');
    
    // Create form data - use form-data package directly with buffer
    const formData = new FormData();
    formData.append('image', photoBuffer, {
      filename: filename,
      contentType: 'image/png'
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

async function testAllPngPhotos() {
  const overallStartTime = Date.now();
  
  try {
    log('🔄 Starting PNG photo tests...', 'blue');
    
    const photoPath = path.resolve(__dirname, PNG_PHOTOS_DIR);
    
    if (!fs.existsSync(photoPath)) {
      log('❌ PNG photos directory not found! Run convert-photos-for-testing.js first.', 'red');
      return;
    }
    
    // Get PNG files
    const pngFiles = fs.readdirSync(photoPath)
      .filter(file => file.toLowerCase().endsWith('.png'))
      .sort()
      .slice(0, MAX_PHOTOS); // Limit for quick testing
    
    if (pngFiles.length === 0) {
      log('❌ No PNG files found in pngRecipes directory!', 'red');
      return;
    }
    
    log(`📊 Testing first ${pngFiles.length} PNG photos`, 'cyan');
    
    // Test each photo with both models
    for (const file of pngFiles) {
      const fullPath = path.join(photoPath, file);
      
      // Test with OpenAI
      const openaiResult = await testPngPhoto(fullPath, 'openai');
      results.openai.push(openaiResult);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test with Gemini
      const geminiResult = await testPngPhoto(fullPath, 'gemini');
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
      totalTests: pngFiles.length * 2,
      openaiSuccess: openaiSuccessful.length,
      geminiSuccess: geminiSuccessful.length,
      openaiSuccessRate: ((openaiSuccessful.length / pngFiles.length) * 100).toFixed(1),
      geminiSuccessRate: ((geminiSuccessful.length / pngFiles.length) * 100).toFixed(1),
      openaiAvgTime: Math.round(openaiAvgTime),
      geminiAvgTime: Math.round(geminiAvgTime),
      testDuration: Date.now() - overallStartTime
    };
    
    // Display results
    log('\n📋 PNG Photo Test Results:', 'bright');
    log(`📊 Total tests: ${results.summary.totalTests}`, 'cyan');
    log(`✅ OpenAI: ${results.summary.openaiSuccess}/${pngFiles.length} (${results.summary.openaiSuccessRate}%) - Avg: ${results.summary.openaiAvgTime}ms`, 'green');
    log(`✅ Gemini: ${results.summary.geminiSuccess}/${pngFiles.length} (${results.summary.geminiSuccessRate}%) - Avg: ${results.summary.geminiAvgTime}ms`, 'green');
    log(`⏱️  Total test duration: ${Math.round(results.summary.testDuration / 1000)}s`, 'yellow');
    
    // Save results
    const resultsPath = path.join(__dirname, `png-test-results-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    log(`📝 Results saved to: ${path.basename(resultsPath)}`, 'cyan');
    
    log('\n🎉 PNG photo testing completed!', 'green');
    
    return results;
    
  } catch (error) {
    log(`❌ Error during PNG photo testing: ${error.message}`, 'red');
    throw error;
  }
}

// Run the tests
if (require.main === module) {
  testAllPngPhotos().catch(console.error);
}

module.exports = { testAllPngPhotos, testPngPhoto }; 