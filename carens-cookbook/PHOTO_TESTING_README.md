# Recipe Photo AI Testing Suite

This testing suite provides comprehensive testing for your recipe photo processing AI models. It's designed to test the HEIC photos in the `/recipe_photos` directory through both OpenAI GPT-4o and Google Gemini 2.5 Flash models.

## 📁 Test Scripts Overview

### 1. `quick-photo-test.js` - Quick Validation Test
**Purpose**: Fast validation test using the first 3 photos to verify setup
**Best for**: Initial testing, debugging, and quick validation

```bash
cd carens-cookbook
node quick-photo-test.js
```

**Features**:
- Tests first 3 HEIC photos only (fast)
- Tests both AI providers (OpenAI & Gemini)
- 2-second delays between requests
- Provides performance analysis and next steps

### 2. `recipe-photo-test.js` - Comprehensive Single Photo Test
**Purpose**: Complete testing of all photos through both AI models individually
**Best for**: Detailed analysis of each photo's processing capability

```bash
cd carens-cookbook
node recipe-photo-test.js
```

**Features**:
- Tests ALL HEIC photos in `/recipe_photos`
- Tests each photo with both AI providers
- 3-second delays to respect rate limits
- Detailed provider performance comparison
- Saves comprehensive results to JSON file

### 3. `recipe-photo-batch-test.js` - Batch Processing Test
**Purpose**: Tests multiple photos processed together using the scan-recipe-multiple endpoint
**Best for**: Testing how well the AI handles multiple photos of the same recipe

```bash
cd carens-cookbook
node recipe-photo-batch-test.js
```

**Features**:
- Tests batches of 2, 3, and 4 photos
- Uses `/scan-recipe-multiple` endpoint
- 5-second delays for batch processing
- Batch size performance analysis
- Tests how AI combines information from multiple images

### 4. E2E Playwright Test
**Location**: `tests/e2e/recipe-photo-processing.test.ts`
**Purpose**: Integration testing within the full application context

```bash
cd carens-cookbook
npm run test:e2e -- recipe-photo-processing
```

## 📊 Test Results and Analysis

### What the Tests Measure

1. **Success Rate**: Percentage of API calls that return successful responses
2. **Real Data Rate**: Percentage of successful calls that extract actual recipe data (not just defaults)
3. **Processing Speed**: Time taken for each AI provider to process images
4. **Provider Comparison**: Head-to-head performance between OpenAI and Gemini
5. **Error Handling**: How gracefully the system handles various error conditions

### Performance Benchmarks

#### Excellent Performance
- **Real Data Rate**: >80% for single photos, >70% for batch processing
- **Processing Speed**: <15s for single photos, <30s for batch processing

#### Good Performance
- **Real Data Rate**: 60-80% for single photos, 50-70% for batch processing
- **Processing Speed**: 15-30s for single photos, 30-60s for batch processing

#### Needs Attention
- **Real Data Rate**: <60% for single photos, <50% for batch processing
- **Processing Speed**: >30s for single photos, >60s for batch processing

## 🛠️ Setup Requirements

### Prerequisites
1. **Server Running**: Your Next.js app must be running on `localhost:3000`
2. **API Keys**: Ensure both OpenAI and Google AI API keys are configured
3. **Photos**: HEIC files must be present in `/recipe_photos` directory
4. **Dependencies**: Node.js with fetch support or node-fetch installed

### Environment Configuration

Ensure these environment variables are set:
```bash
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_key
BASE_URL=http://localhost:3000  # Optional, defaults to localhost:3000
```

### Dependencies Check
The scripts automatically handle fetch availability, but if you encounter issues:
```bash
npm install node-fetch form-data
```

## 📋 Testing Strategy

### Recommended Testing Flow

1. **Start with Quick Test**
   ```bash
   node quick-photo-test.js
   ```
   - Validates basic setup
   - Tests first 3 photos quickly
   - Provides go/no-go decision for full testing

2. **Run Comprehensive Test** (if quick test shows >50% real data rate)
   ```bash
   node recipe-photo-test.js
   ```
   - Tests all photos thoroughly
   - Generates detailed performance metrics
   - Saves results for analysis

3. **Test Batch Processing** (if individual photos work well)
   ```bash
   node recipe-photo-batch-test.js
   ```
   - Tests multi-photo processing
   - Validates scan-recipe-multiple endpoint
   - Tests different batch sizes

4. **Run E2E Tests** (for integration validation)
   ```bash
   npm run test:e2e -- recipe-photo-processing
   ```

### When to Run Each Test

- **Daily Development**: Quick test
- **Before Deployment**: Comprehensive + E2E tests
- **Feature Testing**: All scripts when testing photo processing features
- **Performance Monitoring**: Comprehensive test weekly

## 📈 Understanding Results

### Output Files
All tests save results to timestamped JSON files:
- `recipe-photo-test-results-[timestamp].json`
- `recipe-photo-batch-test-results-[timestamp].json`

### Key Metrics to Monitor

1. **Real Data Rate by Provider**
   - Compare OpenAI vs Gemini performance
   - Identify which provider works better for your photo types

2. **Processing Speed Trends**
   - Monitor for performance degradation
   - Identify rate limiting issues

3. **Photo Quality Patterns**
   - Which photos consistently fail/succeed
   - Use insights to improve photo quality guidelines

### Common Issues and Solutions

#### Low Real Data Rate (<30%)
- **Check Photo Quality**: Ensure photos contain clear, readable recipes
- **Verify API Keys**: Confirm both OpenAI and Google AI keys are valid
- **Test Manual Upload**: Try uploading a photo through the UI

#### Slow Processing (>30s average)
- **Rate Limiting**: Check if you're hitting API rate limits
- **Network Issues**: Test your internet connection to AI services
- **Server Resources**: Monitor your server performance

#### API Errors
- **Check Server Logs**: Look for detailed error messages
- **Verify Endpoints**: Ensure `/api/scan-recipe` and `/api/scan-recipe-multiple` are working
- **Test Dependencies**: Verify all required packages are installed

## 🔧 Customization

### Modifying Test Parameters

Edit these constants in the test files:

```javascript
// In any test file
const REQUEST_DELAY = 3000; // Increase for slower testing
const MAX_PHOTOS = 5; // Change number of photos to test
const BATCH_SIZES = [2, 3, 4]; // Modify batch sizes to test

// Test different providers
const AI_PROVIDERS = [
  { name: 'OpenAI GPT-4o', id: 'openai' },
  { name: 'Google Gemini', id: 'gemini' }
];
```

### Adding New AI Providers

1. Add provider to `AI_PROVIDERS` array
2. Ensure your API supports the provider ID
3. Update provider configuration in `/src/lib/ai-providers.ts`

### Custom Photo Directories

Change the photo directory:
```javascript
const RECIPE_PHOTOS_DIR = '../your-custom-photos';
```

## 📞 Troubleshooting

### Common Error Messages

#### "No HEIC files found"
- Verify photos exist in `/recipe_photos`
- Check file extensions (must be `.heic`)
- Ensure correct path to photo directory

#### "No fetch implementation available"
- Install node-fetch: `npm install node-fetch`
- Or use Node.js version 18+ with built-in fetch

#### "API Error (401)"
- Check API keys are correctly set
- Verify keys have sufficient credits/quota

#### "API Error (429)"
- You're hitting rate limits
- Increase `REQUEST_DELAY` values
- Check your API plan limits

### Getting Help

1. Check server logs for detailed error messages
2. Verify API configuration in your application
3. Test individual endpoints manually first
4. Review the comprehensive test results JSON for patterns

---

## 🎯 Quick Start

To get started immediately:

```bash
# 1. Ensure your server is running
npm run dev

# 2. Run quick validation (in another terminal)
cd carens-cookbook
node quick-photo-test.js

# 3. If results look good (>50% real data rate), run full test
node recipe-photo-test.js
```

This will give you a complete picture of how well your AI models are processing the recipe photos! 