#!/usr/bin/env node

/**
 * HTML Inspector Script
 * Shows the cleaned HTML that gets sent to AI models for recipe processing
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

/**
 * Fetch webpage HTML
 */
async function fetchWebpageHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = new URL(url);
    
    const req = protocol.request({
      hostname: options.hostname,
      port: options.port,
      path: options.pathname + options.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Clean HTML using the same logic as your app
 * This mirrors the cleanHtml function from your fetch-recipe route
 */
function cleanHtmlBasic(html, forGemini = false) {
  console.log(`🧹 Cleaning HTML (Gemini mode: ${forGemini})...`);
  
  const cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // More aggressive trimming for Gemini
  const maxLength = forGemini ? 50000 : 100000;
  const truncated = cleaned.substring(0, maxLength);
  
  console.log(`   Original HTML: ${html.length.toLocaleString()} characters`);
  console.log(`   After cleaning: ${cleaned.length.toLocaleString()} characters`);
  console.log(`   After truncation: ${truncated.length.toLocaleString()} characters`);
  
  return truncated;
}

/**
 * Extract recipe content using the same logic as your app
 */
function extractRecipeContent(html) {
  console.log('🎯 Extracting recipe-specific content...');
  
  // Look for JSON-LD structured data first
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi);
  if (jsonLdMatches) {
    console.log(`   Found ${jsonLdMatches.length} JSON-LD script(s)`);
    for (const match of jsonLdMatches) {
      const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      if (jsonContent.includes('Recipe') || jsonContent.includes('recipe')) {
        console.log('   ✅ Found recipe JSON-LD data');
        const result = `JSON-LD Recipe Data: ${jsonContent}`;
        console.log(`   Recipe JSON-LD length: ${result.length.toLocaleString()} characters`);
        return result;
      }
    }
  }

  // Look for recipe-specific sections
  const recipeKeywords = ['recipe-card', 'recipe-content', 'recipe-instructions', 'ingredients', 'directions', 'recipe-summary'];
  let recipeContent = '';
  
  console.log('   Looking for recipe-specific HTML sections...');
  for (const keyword of recipeKeywords) {
    const regex = new RegExp(`<[^>]*class=[^>]*${keyword}[^>]*>([\\s\\S]*?)<\/[^>]+>`, 'gi');
    const matches = html.match(regex);
    if (matches) {
      console.log(`   Found ${matches.length} matches for "${keyword}"`);
      recipeContent += matches.join(' ');
    }
  }

  // If we found recipe-specific content, use it
  if (recipeContent.length > 1000) {
    console.log('   ✅ Using recipe-specific content');
    const result = recipeContent.substring(0, 25000);
    console.log(`   Recipe content length: ${result.length.toLocaleString()} characters`);
    return result;
  }

  // Fallback to general cleaning
  console.log('   ⚠️  No recipe-specific content found, using general cleaning');
  return cleanHtmlBasic(html, true);
}

/**
 * Check for recipe keywords
 */
function analyzeContent(html) {
  const keywords = ['recipe', 'ingredient', 'instruction', 'direction', 'cook', 'prep', 'bake', 'serve'];
  const found = keywords.filter(keyword => 
    html.toLowerCase().includes(keyword)
  );
  
  console.log(`🔍 Recipe keyword analysis:`);
  console.log(`   Found keywords: ${found.join(', ')}`);
  console.log(`   Recipe confidence: ${found.length >= 3 ? 'HIGH' : found.length >= 1 ? 'MEDIUM' : 'LOW'}`);
  
  return found;
}

/**
 * Save output to files for inspection
 */
function saveOutput(url, rawHtml, cleanedOpenAI, cleanedGemini, recipeExtracted) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const baseFilename = `html-inspect-${timestamp}`;
  
  try {
    // Save raw HTML
    fs.writeFileSync(
      path.join(__dirname, `${baseFilename}-raw.html`), 
      rawHtml
    );
    
    // Save OpenAI cleaned version
    fs.writeFileSync(
      path.join(__dirname, `${baseFilename}-openai-cleaned.html`), 
      `<!-- URL: ${url} -->\n<!-- OpenAI Cleaned Version -->\n<!-- Length: ${cleanedOpenAI.length} characters -->\n\n${cleanedOpenAI}`
    );
    
    // Save Gemini cleaned version
    fs.writeFileSync(
      path.join(__dirname, `${baseFilename}-gemini-cleaned.html`), 
      `<!-- URL: ${url} -->\n<!-- Gemini Cleaned Version -->\n<!-- Length: ${cleanedGemini.length} characters -->\n\n${cleanedGemini}`
    );
    
    // Save recipe-extracted version
    fs.writeFileSync(
      path.join(__dirname, `${baseFilename}-recipe-extracted.html`), 
      `<!-- URL: ${url} -->\n<!-- Recipe-Specific Extracted Content -->\n<!-- Length: ${recipeExtracted.length} characters -->\n\n${recipeExtracted}`
    );
    
    console.log(`\n💾 Files saved:`);
    console.log(`   Raw HTML: ${baseFilename}-raw.html`);
    console.log(`   OpenAI cleaned: ${baseFilename}-openai-cleaned.html`);
    console.log(`   Gemini cleaned: ${baseFilename}-gemini-cleaned.html`);
    console.log(`   Recipe extracted: ${baseFilename}-recipe-extracted.html`);
    
  } catch (error) {
    console.log(`❌ Error saving files: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('🍳 HTML Inspector for Recipe Processing');
    console.log('=====================================');
    console.log('');
    console.log('Usage: node scripts/inspect-cleaned-html.js <recipe-url>');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/inspect-cleaned-html.js https://www.allrecipes.com/recipe/16354/easy-meatloaf/');
    console.log('  node scripts/inspect-cleaned-html.js https://www.simplyrecipes.com/recipes/chocolate_chip_cookies/');
    console.log('');
    console.log('This will show you exactly what HTML gets sent to the AI models.');
    process.exit(1);
  }
  
  console.log('🍳 HTML Inspector for Recipe Processing');
  console.log('=====================================');
  console.log(`📋 URL: ${url}`);
  console.log('');
  
  try {
    // Fetch the webpage
    console.log('📥 Fetching webpage...');
    const rawHtml = await fetchWebpageHtml(url);
    console.log(`   Raw HTML size: ${rawHtml.length.toLocaleString()} characters`);
    
    // Analyze content
    analyzeContent(rawHtml);
    
    console.log('');
    console.log('🔄 Processing HTML with different methods:');
    console.log('==========================================');
    
    // Clean for OpenAI (standard cleaning)
    console.log('\n1️⃣ OPENAI PROCESSING:');
    const cleanedOpenAI = cleanHtmlBasic(rawHtml, false);
    
    // Clean for Gemini (more aggressive)
    console.log('\n2️⃣ GEMINI PROCESSING:');
    const cleanedGemini = cleanHtmlBasic(rawHtml, true);
    
    // Extract recipe-specific content (Gemini method)
    console.log('\n3️⃣ RECIPE-SPECIFIC EXTRACTION:');
    const recipeExtracted = extractRecipeContent(rawHtml);
    
    // Show comparison
    console.log('\n📊 SIZE COMPARISON:');
    console.log('==================');
    console.log(`Raw HTML:           ${rawHtml.length.toLocaleString()} chars`);
    console.log(`OpenAI cleaned:     ${cleanedOpenAI.length.toLocaleString()} chars (${Math.round((cleanedOpenAI.length/rawHtml.length)*100)}% of original)`);
    console.log(`Gemini cleaned:     ${cleanedGemini.length.toLocaleString()} chars (${Math.round((cleanedGemini.length/rawHtml.length)*100)}% of original)`);
    console.log(`Recipe extracted:   ${recipeExtracted.length.toLocaleString()} chars (${Math.round((recipeExtracted.length/rawHtml.length)*100)}% of original)`);
    
    // Save files for inspection
    saveOutput(url, rawHtml, cleanedOpenAI, cleanedGemini, recipeExtracted);
    
    // Show preview of what gets sent to AI
    console.log('\n👀 PREVIEW OF CLEANED CONTENT (first 500 chars):');
    console.log('===============================================');
    console.log('\n📤 What OpenAI receives:');
    console.log('-'.repeat(50));
    console.log(cleanedOpenAI.substring(0, 500) + (cleanedOpenAI.length > 500 ? '...' : ''));
    
    console.log('\n📤 What Gemini receives:');
    console.log('-'.repeat(50));
    console.log(recipeExtracted.substring(0, 500) + (recipeExtracted.length > 500 ? '...' : ''));
    
    console.log('\n✨ Inspection complete! Check the saved HTML files for full content.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the inspector
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Inspector failed:', error.message);
    process.exit(1);
  });
} 