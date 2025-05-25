#!/usr/bin/env node

/**
 * Simple Recipe Extraction Test
 * Tests individual URLs using OpenAI extraction
 */

// Try to use built-in fetch first, fallback to node-fetch
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  // If node-fetch is not available, we'll handle it in the function
}

const readline = require('readline');

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

async function ensureFetch() {
  if (!fetch) {
    try {
      fetch = (await import('node-fetch')).default;
    } catch (e) {
      throw new Error('No fetch implementation available. Please install node-fetch: npm install node-fetch');
    }
  }
}

async function testRecipeExtraction(url) {
  await ensureFetch();

  try {
    log(`🧪 Testing URL: ${url}`, 'cyan');
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3000/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    
    log(`⏱️  Duration: ${duration}ms`, 'yellow');
    log(`🤖 Method: ${data.processing_method || 'openai'}`, 'blue');
    
    if (data.success && data.recipe) {
      log('✅ SUCCESS - Recipe extracted!', 'green');
      log(`📝 Title: ${data.recipe.title}`, 'cyan');
      log(`🥘 Ingredients: ${data.recipe.ingredients.length} items`, 'cyan');
      log(`👩‍🍳 Steps: ${data.recipe.steps.length} steps`, 'cyan');
      log(`🖼️  Image: ${data.recipe.image ? 'Yes' : 'No'}`, 'cyan');
      log(`🌍 Cuisine: ${data.recipe.cuisine}`, 'cyan');
      log(`📂 Category: ${data.recipe.category}`, 'cyan');
      
      return {
        success: true,
        duration,
        recipe: data.recipe
      };
    } else {
      throw new Error(data.error || 'No recipe data returned');
    }
    
  } catch (error) {
    log(`❌ FAILED: ${error.message}`, 'red');
    return {
      success: false,
      duration: 0,
      error: error.message
    };
  }
}

async function runInteractiveTest() {
  log('🧪 RECIPE EXTRACTION TESTER (OpenAI)', 'bright');
  log('═'.repeat(60), 'cyan');
  log('Enter recipe URLs to test (or "quit" to exit)', 'blue');
  log('', 'reset');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

  while (true) {
    try {
      const url = await question('\nEnter recipe URL: ');
      
      if (url.toLowerCase() === 'quit' || url.toLowerCase() === 'exit' || url.toLowerCase() === 'q') {
        break;
      }

      if (!url.trim()) {
        log('Please enter a valid URL', 'yellow');
        continue;
      }

      log('', 'reset');
      await testRecipeExtraction(url.trim());
      
    } catch (error) {
      log(`Error: ${error.message}`, 'red');
    }
  }

  rl.close();
  log('\n👋 Thanks for testing!', 'green');
}

// Default test URLs if run without arguments
const DEFAULT_TEST_URLS = [
  'https://www.allrecipes.com/recipe/16354/easy-meatloaf/',
  'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
  'https://www.bonappetit.com/recipe/bas-best-chocolate-chip-cookies'
];

async function runDefaultTest() {
  log('🧪 RUNNING DEFAULT RECIPE TESTS (OpenAI)', 'bright');
  log('═'.repeat(60), 'cyan');
  
  for (const [index, url] of DEFAULT_TEST_URLS.entries()) {
    log(`\n🧪 Test ${index + 1}/${DEFAULT_TEST_URLS.length}`, 'magenta');
    log('─'.repeat(40), 'yellow');
    await testRecipeExtraction(url);
    
    // Small delay between tests
    if (index < DEFAULT_TEST_URLS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  log('\n🎉 All tests completed!', 'green');
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Interactive mode
    runInteractiveTest().catch(error => {
      log(`Error: ${error.message}`, 'red');
      process.exit(1);
    });
  } else if (args[0] === '--default' || args[0] === '-d') {
    // Run default tests
    runDefaultTest().catch(error => {
      log(`Error: ${error.message}`, 'red');
      process.exit(1);
    });
  } else {
    // Test specific URL
    testRecipeExtraction(args[0]).catch(error => {
      log(`Error: ${error.message}`, 'red');
      process.exit(1);
    });
  }
}

module.exports = { testRecipeExtraction }; 