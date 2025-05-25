#!/usr/bin/env node

/**
 * Test script for Hyperbrowser recipe extraction
 * Usage: node test-hyperbrowser.js [URL]
 * Example: node test-hyperbrowser.js https://example.com/recipe
 */

const readline = require('readline');

// Try to use built-in fetch first, fallback to node-fetch
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  // If node-fetch is not available, we'll handle it in the function
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

async function testRecipeExtraction(url, method = 'hyperbrowser') {
  log(`\n🚀 Testing recipe extraction from: ${url}`, 'cyan');
  log(`📊 Using method: ${method}`, 'blue');
  log('─'.repeat(60), 'yellow');

  // Ensure we have fetch available
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (e) {
      throw new Error('No fetch implementation available. Please install node-fetch: npm install node-fetch');
    }
  }

  try {
    const startTime = Date.now();
    
    log('📡 Sending request to API...', 'yellow');
    
    const response = await fetch('http://localhost:3003/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        processing_method: method
      })
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    
    log(`\n✅ SUCCESS! Extraction completed in ${duration}ms`, 'green');
    log('─'.repeat(60), 'yellow');
    
    // Display results
    if (data.recipe) {
      const recipe = data.recipe;
      
      log(`🍽️  TITLE: ${recipe.title}`, 'bright');
      log(`📝 DESCRIPTION: ${recipe.description}`, 'cyan');
      log(`🌍 CUISINE: ${recipe.cuisine}`, 'blue');
      log(`📂 CATEGORY: ${recipe.category}`, 'blue');
      log(`⏱️  PREP TIME: ${recipe.prepTime}`, 'magenta');
      log(`🧹 CLEANUP TIME: ${recipe.cleanupTime}`, 'magenta');
      
      if (recipe.image) {
        log(`🖼️  IMAGE: ${recipe.image}`, 'cyan');
      }
      
      log('\n🥗 INGREDIENTS:', 'green');
      recipe.ingredients.forEach((ingredient, index) => {
        log(`  ${index + 1}. ${ingredient}`, 'reset');
      });
      
      log('\n👨‍🍳 STEPS:', 'green');
      recipe.steps.forEach((step, index) => {
        log(`  ${index + 1}. ${step}`, 'reset');
      });
      
      log('\n📊 EXTRACTION INFO:', 'yellow');
      log(`  • Processing Method: ${data.processing_method}`, 'reset');
      log(`  • Success: ${data.success}`, 'reset');
      log(`  • Message: ${data.message}`, 'reset');
      
    } else {
      log('⚠️  No recipe data returned', 'yellow');
    }
    
  } catch (error) {
    log(`\n❌ ERROR: ${error.message}`, 'red');
    log('─'.repeat(60), 'yellow');
    
    if (error.message.includes('ECONNREFUSED')) {
      log('💡 Make sure your Next.js development server is running on port 3003', 'yellow');
      log('   Run: npm run dev', 'yellow');
    }
    
    if (error.message.includes('HYPERBROWSER_API_KEY')) {
      log('💡 Make sure your HYPERBROWSER_API_KEY is set in your environment', 'yellow');
    }
  }
}

async function promptForUrl() {
  return new Promise((resolve) => {
    rl.question('🔗 Enter recipe URL to test: ', (url) => {
      resolve(url.trim());
    });
  });
}

async function promptForMethod() {
  return new Promise((resolve) => {
    rl.question('⚙️  Choose processing method (hyperbrowser/openai) [hyperbrowser]: ', (method) => {
      const choice = method.trim().toLowerCase() || 'hyperbrowser';
      resolve(choice === 'openai' ? 'openai' : 'hyperbrowser');
    });
  });
}

async function main() {
  log('🧪 Hyperbrowser Recipe Extraction Tester', 'bright');
  log('═'.repeat(60), 'cyan');
  
  // Check if URL was provided as command line argument
  const url = process.argv[2];
  const method = process.argv[3] || 'hyperbrowser';
  
  if (url) {
    await testRecipeExtraction(url, method);
    rl.close();
    return;
  }
  
  // Interactive mode
  log('🔄 Interactive Mode - Enter URLs to test extraction', 'blue');
  log('💡 Tip: Make sure your Next.js server is running (npm run dev)', 'yellow');
  log('', 'reset');
  
  while (true) {
    try {
      const testUrl = await promptForUrl();
      
      if (!testUrl) {
        log('👋 Goodbye!', 'green');
        break;
      }
      
      if (testUrl.toLowerCase() === 'exit' || testUrl.toLowerCase() === 'quit') {
        log('👋 Goodbye!', 'green');
        break;
      }
      
      // Validate URL
      try {
        new URL(testUrl);
      } catch {
        log('❌ Invalid URL format. Please enter a valid URL.', 'red');
        continue;
      }
      
      const testMethod = await promptForMethod();
      await testRecipeExtraction(testUrl, testMethod);
      
      log('\n' + '═'.repeat(60), 'cyan');
      
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
  }
  
  rl.close();
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  log('\n👋 Goodbye!', 'green');
  rl.close();
  process.exit(0);
});

if (require.main === module) {
  main().catch(error => {
    log(`❌ Fatal error: ${error.message}`, 'red');
    rl.close();
    process.exit(1);
  });
} 