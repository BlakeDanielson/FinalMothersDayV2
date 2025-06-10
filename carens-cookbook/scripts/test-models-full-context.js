const https = require('https');
const http = require('http');
const path = require('path');

// Load environment variables from carens-cookbook/.env (same as test-models.js)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const fs = require('fs');

// AI SDK imports
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');

// Utility functions from existing codebase
// Note: These are simplified versions since the original is TypeScript
const { JSDOM } = require('jsdom');

function cleanHtml(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove unwanted elements
    const unwantedSelectors = ['script', 'style', 'nav', 'header', 'footer', '.ad', '.advertisement'];
    unwantedSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });
    
    return document.body.textContent || '';
}

function extractRecipeContent(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Try to find structured data first
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const script of jsonLdScripts) {
        try {
            const data = JSON.parse(script.textContent);
            if (data['@type'] === 'Recipe' || (Array.isArray(data) && data.some(item => item['@type'] === 'Recipe'))) {
                return JSON.stringify(data);
            }
        } catch (e) {
            // Continue to next script
        }
    }
    
    // Fallback to recipe-specific selectors
    const recipeSelectors = [
        '.recipe, .recipe-card, .recipe-content',
        '[itemtype*="Recipe"]',
        '.entry-content',
        'main'
    ];
    
    for (const selector of recipeSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            return element.textContent || '';
        }
    }
    
    // Final fallback
    return cleanHtml(html);
}

/**
 * Check if environment is properly configured (copied from test-models.js)
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
  
  return true;
}

// Initialize AI clients
const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test URLs - reliable recipe sites
const testUrls = [
    'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
    'https://www.simplyrecipes.com/recipes/banana_bread/',
    'https://www.kingarthurbaking.com/recipes/rustic-sourdough-bread-recipe',
    'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
    'https://www.bonappetit.com/recipe/chocolate-chip-cookies-2',
    'https://www.epicurious.com/recipes/food/views/perfect-roast-chicken-51164760',
    'https://www.tasteofhome.com/recipes/slow-cooker-chicken-and-dumplings/',
    'https://www.delish.com/cooking/recipe-ideas/a52893647/garlic-butter-steak-bites-recipe/',
];

// AI Models to test
const models = {
    'openai-main': {
        type: 'openai',
        model: 'gpt-4o',
        maxTokens: 100000, // OpenAI's limit
    },
    'openai-mini': {
        type: 'openai',
        model: 'gpt-4o-mini',
        maxTokens: 100000,
    },
    'gemini-main': {
        type: 'gemini',
        model: 'gemini-1.5-pro',
        maxTokens: 2000000, // Gemini's massive limit!
    },
    'gemini-pro': {
        type: 'gemini',
        model: 'gemini-1.5-pro-002',
        maxTokens: 2000000,
    }
};

// Test strategies
const strategies = {
    'current-openai': 'Current OpenAI approach (basic HTML cleaning)',
    'current-gemini': 'Current Gemini approach (recipe extraction)',
    'full-html-gemini': 'Send full HTML to Gemini (2M token limit)',
    'url-direct-gemini': 'Direct URL access by Gemini (if supported)'
};

// Utility functions
async function fetchWithTimeout(url, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

async function getRecipePrompt(content, strategy) {
    const basePrompt = `Extract the recipe information from the provided content and return it in this exact JSON format:

{
    "title": "Recipe title",
    "description": "Brief recipe description", 
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"],
    "prepTime": "preparation time",
    "cookTime": "cooking time", 
    "servings": "number of servings"
}

Important: Return ONLY valid JSON, no additional text or formatting.`;

    switch (strategy) {
        case 'url-direct-gemini':
            return `${basePrompt}\n\nPlease access this URL and extract the recipe: ${content}`;
        default:
            return `${basePrompt}\n\nContent:\n${content}`;
    }
}

async function testUrlAccessibility(url) {
    try {
        console.log(`🔍 Testing URL accessibility: ${url}`);
        const response = await fetchWithTimeout(url);
        const accessible = response.ok;
        console.log(`${accessible ? '✅' : '❌'} URL ${accessible ? 'accessible' : 'not accessible'}: ${response.status}`);
        return accessible;
    } catch (error) {
        console.log(`❌ URL inaccessible: ${error.message}`);
        return false;
    }
}

async function getContentByStrategy(url, strategy) {
    switch (strategy) {
        case 'current-openai':
        case 'full-html-gemini': {
            const response = await fetchWithTimeout(url);
            const html = await response.text();
            return strategy === 'current-openai' ? cleanHtml(html) : html; // Full HTML for Gemini!
        }
        case 'current-gemini': {
            const response = await fetchWithTimeout(url);
            const html = await response.text();
            return extractRecipeContent(html);
        }
        case 'url-direct-gemini':
            return url; // Just pass the URL directly
        default:
            throw new Error(`Unknown strategy: ${strategy}`);
    }
}

async function callOpenAI(model, content, strategy) {
    const prompt = await getRecipePrompt(content, strategy);
    
    const response = await openai.chat.completions.create({
        model: model.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.1,
    });

    return response.choices[0].message.content;
}

async function callGemini(model, content, strategy) {
    const genaiModel = genai.getGenerativeModel({ model: model.model });
    const prompt = await getRecipePrompt(content, strategy);
    
    // For URL-direct strategy, test if Gemini can access URLs
    if (strategy === 'url-direct-gemini') {
        try {
            // First check token count of the prompt
            const tokenCount = await genaiModel.countTokens(prompt);
            console.log(`📊 Prompt tokens for URL-direct: ${tokenCount.totalTokens}`);
            
            const result = await genaiModel.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.log(`⚠️  URL-direct strategy failed: ${error.message}`);
            // Fall back to current approach
            const response = await fetchWithTimeout(content);
            const html = await response.text();
            const extractedContent = extractRecipeContent(html);
            const fallbackPrompt = await getRecipePrompt(extractedContent, 'current-gemini');
            const result = await genaiModel.generateContent(fallbackPrompt);
            return result.response.text();
        }
    }
    
    // For other strategies, check token count first
    const tokenCount = await genaiModel.countTokens(prompt);
    console.log(`📊 Content tokens: ${tokenCount.totalTokens} (Strategy: ${strategy})`);
    
    if (tokenCount.totalTokens > model.maxTokens) {
        console.log(`⚠️  Content exceeds ${model.maxTokens} tokens, truncating...`);
        // Truncate content if it exceeds limit
        const truncatedContent = content.substring(0, Math.floor(content.length * (model.maxTokens / tokenCount.totalTokens)));
        const truncatedPrompt = await getRecipePrompt(truncatedContent, strategy);
        const result = await genaiModel.generateContent(truncatedPrompt);
        return result.response.text();
    }
    
    const result = await genaiModel.generateContent(prompt);
    return result.response.text();
}

async function testModelWithStrategy(modelName, model, url, strategy) {
    const startTime = Date.now();
    
    try {
        console.log(`\n🧪 Testing ${modelName} with ${strategy} on ${url}`);
        
        // Get content based on strategy
        const content = await getContentByStrategy(url, strategy);
        console.log(`📄 Content size: ${typeof content === 'string' ? content.length : 'URL'} chars`);
        
        // Call appropriate AI service
        let response;
        if (model.type === 'openai') {
            response = await callOpenAI(model, content, strategy);
        } else {
            response = await callGemini(model, content, strategy);
        }
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Try to parse JSON response
        let parsedRecipe;
        try {
            // Clean response (remove any markdown formatting)
            const cleanResponse = response.replace(/```json\s*|\s*```/g, '').trim();
            parsedRecipe = JSON.parse(cleanResponse);
        } catch (parseError) {
            console.log(`⚠️  JSON parsing failed: ${parseError.message}`);
            parsedRecipe = null;
        }
        
        // Evaluate success
        const success = parsedRecipe && parsedRecipe.title && parsedRecipe.ingredients && parsedRecipe.instructions;
        const ingredientCount = success ? parsedRecipe.ingredients.length : 0;
        const instructionCount = success ? parsedRecipe.instructions.length : 0;
        
        console.log(`${success ? '✅' : '❌'} ${modelName} (${strategy}): ${duration}ms`);
        if (success) {
            console.log(`   📝 Title: ${parsedRecipe.title}`);
            console.log(`   🥕 Ingredients: ${ingredientCount}`);
            console.log(`   📋 Instructions: ${instructionCount}`);
        }
        
        return {
            modelName,
            strategy,
            url,
            success,
            duration,
            title: success ? parsedRecipe.title : null,
            ingredientCount,
            instructionCount,
            error: null,
            contentSize: typeof content === 'string' ? content.length : 0
        };
        
    } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.log(`❌ ${modelName} (${strategy}) failed: ${error.message}`);
        
        return {
            modelName,
            strategy,
            url,
            success: false,
            duration,
            title: null,
            ingredientCount: 0,
            instructionCount: 0,
            error: error.message,
            contentSize: 0
        };
    }
}

function getSpeedRating(duration) {
    if (duration < 2000) return '🚀 Very Fast';
    if (duration < 4000) return '⚡ Fast';
    if (duration < 8000) return '🐌 Slow';
    return '🐌🐌 Very Slow';
}

function generateReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPREHENSIVE MODEL COMPARISON REPORT');
    console.log('='.repeat(80));

    // Filter out inaccessible URLs
    const validResults = results.filter(r => r.success !== null);
    
    // Group by strategy
    const byStrategy = {};
    validResults.forEach(result => {
        if (!byStrategy[result.strategy]) {
            byStrategy[result.strategy] = [];
        }
        byStrategy[result.strategy].push(result);
    });

    // Strategy comparison
    console.log('\n📋 STRATEGY COMPARISON:');
    Object.keys(byStrategy).forEach(strategy => {
        const strategyResults = byStrategy[strategy];
        const successRate = (strategyResults.filter(r => r.success).length / strategyResults.length) * 100;
        const avgDuration = strategyResults.reduce((sum, r) => sum + r.duration, 0) / strategyResults.length;
        const avgContentSize = strategyResults.reduce((sum, r) => sum + r.contentSize, 0) / strategyResults.length;
        
        console.log(`\n${strategy}:`);
        console.log(`  ✅ Success Rate: ${successRate.toFixed(1)}%`);
        console.log(`  ⏱️  Avg Time: ${avgDuration.toFixed(0)}ms (${getSpeedRating(avgDuration)})`);
        console.log(`  📄 Avg Content Size: ${(avgContentSize / 1000).toFixed(1)}K chars`);
    });

    // Model comparison by strategy
    console.log('\n🏆 MODEL PERFORMANCE BY STRATEGY:');
    Object.keys(byStrategy).forEach(strategy => {
        console.log(`\n--- ${strategy} ---`);
        const strategyResults = byStrategy[strategy];
        
        const modelStats = {};
        strategyResults.forEach(result => {
            if (!modelStats[result.modelName]) {
                modelStats[result.modelName] = {
                    successes: 0,
                    total: 0,
                    totalTime: 0,
                    totalIngredients: 0,
                    totalInstructions: 0
                };
            }
            
            const stats = modelStats[result.modelName];
            stats.total++;
            if (result.success) {
                stats.successes++;
                stats.totalIngredients += result.ingredientCount;
                stats.totalInstructions += result.instructionCount;
            }
            stats.totalTime += result.duration;
        });

        Object.keys(modelStats).forEach(modelName => {
            const stats = modelStats[modelName];
            const successRate = (stats.successes / stats.total) * 100;
            const avgTime = stats.totalTime / stats.total;
            const avgIngredients = stats.successes > 0 ? stats.totalIngredients / stats.successes : 0;
            const avgInstructions = stats.successes > 0 ? stats.totalInstructions / stats.successes : 0;
            
            console.log(`  ${modelName}: ${successRate.toFixed(1)}% success, ${avgTime.toFixed(0)}ms avg, ${avgIngredients.toFixed(1)} ingredients, ${avgInstructions.toFixed(1)} steps`);
        });
    });

    // Key insights
    console.log('\n💡 KEY INSIGHTS:');
    
    // Compare content sizes
    const currentGeminiSize = byStrategy['current-gemini']?.[0]?.contentSize || 0;
    const fullHtmlSize = byStrategy['full-html-gemini']?.[0]?.contentSize || 0;
    
    if (fullHtmlSize > 0) {
        const sizeIncrease = ((fullHtmlSize - currentGeminiSize) / currentGeminiSize * 100);
        console.log(`📄 Full HTML is ${sizeIncrease.toFixed(0)}% larger than extracted content`);
    }
    
    // URL-direct capability
    const urlDirectResults = byStrategy['url-direct-gemini'] || [];
    const urlDirectSuccess = urlDirectResults.filter(r => r.success).length;
    console.log(`🌐 URL-direct access: ${urlDirectSuccess}/${urlDirectResults.length} successful`);
    
    // Best strategy recommendation
    const strategySummary = Object.keys(byStrategy).map(strategy => {
        const results = byStrategy[strategy];
        const successRate = (results.filter(r => r.success).length / results.length) * 100;
        const avgTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
        return { strategy, successRate, avgTime };
    }).sort((a, b) => b.successRate - a.successRate || a.avgTime - b.avgTime);

    if (strategySummary.length > 0) {
        console.log(`🏆 Best performing strategy: ${strategySummary[0].strategy} (${strategySummary[0].successRate.toFixed(1)}% success, ${strategySummary[0].avgTime.toFixed(0)}ms avg)`);
    }

    // Save detailed results
    const reportPath = path.join(__dirname, 'full-context-test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(validResults, null, 2));
    console.log(`\n💾 Detailed results saved to: ${reportPath}`);
}

async function main() {
    console.log('🚀 Starting comprehensive Gemini capabilities test...');
    console.log('Testing full context windows, URL-direct access, and strategy comparison\n');
    
    // Check environment first (same as test-models.js)
    if (!checkEnvironment()) {
        process.exit(1);
    }
    
    // Test URL accessibility first
    console.log('🔍 Testing URL accessibility...');
    const accessibleUrls = [];
    for (const url of testUrls) {
        const accessible = await testUrlAccessibility(url);
        if (accessible) {
            accessibleUrls.push(url);
        }
    }
    
    if (accessibleUrls.length === 0) {
        console.error('❌ No accessible URLs found. Exiting.');
        return;
    }
    
    console.log(`\n✅ Found ${accessibleUrls.length} accessible URLs out of ${testUrls.length}`);
    
    // Test subset for comprehensive analysis
    const testSubset = accessibleUrls.slice(0, 3); // Test first 3 accessible URLs
    const results = [];
    
    // Test each strategy with Gemini models
    for (const url of testSubset) {
        console.log(`\n🌐 Testing URL: ${url}`);
        
        // Test current approaches
        for (const [modelName, model] of Object.entries(models)) {
            if (model.type === 'openai') {
                const result = await testModelWithStrategy(modelName, model, url, 'current-openai');
                results.push(result);
            } else {
                // Test all Gemini strategies
                const geminiStrategies = ['current-gemini', 'full-html-gemini', 'url-direct-gemini'];
                for (const strategy of geminiStrategies) {
                    const result = await testModelWithStrategy(modelName, model, url, strategy);
                    results.push(result);
                }
            }
        }
    }
    
    // Generate comprehensive report
    generateReport(results);
    
    console.log('\n🎉 Comprehensive testing complete!');
    console.log('\n💡 This test reveals whether we should:');
    console.log('   1. Send full HTML to Gemini (leveraging 2M token limit)');
    console.log('   2. Use URL-direct access (if Gemini supports it)');
    console.log('   3. Keep current extraction approach');
    console.log('   4. How performance compares across all strategies');
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

main().catch(console.error); 