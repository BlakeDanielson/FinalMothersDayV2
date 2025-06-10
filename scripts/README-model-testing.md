# AI Model Testing Script

This script tests all 4 configured AI models against various recipe URLs to compare their performance, accuracy, and speed.

## What it tests

- **Models**: openai-main, openai-mini, gemini-main, gemini-pro
- **URLs**: 10 recipe URLs from different popular recipe sites
- **Metrics**: Success rate, response time, accuracy of extracted data

## How to run

1. **Make sure you have dotenv installed:**
   ```bash
   cd carens-cookbook
   npm install dotenv
   ```

2. **Make sure your development server is running:**
   ```bash
   npm run dev
   ```

3. **In a separate terminal, run the test:**
   ```bash
   node scripts/test-models.js
   ```

4. **Or test against a deployed version:**
   ```bash
   BASE_URL=https://your-app.vercel.app node scripts/test-models.js
   ```

## What you'll see

The script will:
- Test each URL against all 4 models
- Show real-time progress with ✅/❌ indicators
- Display extracted recipe data (title, ingredient count, instruction count)
- Generate a summary table comparing all models
- Save detailed results to a timestamped JSON file

## Sample Output

```
🧪 Testing URL 1/10: https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/
================================================================================

📊 Testing with openai-main...
✅ openai-main: Success (2847ms)
   Recipe: Cheesy Chicken Broccoli Casserole
   Ingredients: 8 items
   Instructions: 6 steps

📊 Testing with openai-mini...
✅ openai-mini: Success (1923ms)
   Recipe: Cheesy Chicken Broccoli Casserole
   Ingredients: 8 items
   Instructions: 6 steps
```

## Results

After completion, you'll get:
- **Summary table** with success rates and average response times
- **Best performers** highlighted (fastest and most reliable)
- **Detailed JSON file** saved to `scripts/model-test-results-[timestamp].json`

## Configuration

- **Timeout**: 30 seconds per request
- **Delays**: 1 second between models, 3 seconds between URLs
- **Base URL**: Defaults to `http://localhost:3000`, override with `BASE_URL` env var

## Notes

- Requires your app to be running with all AI model API keys configured
- Takes about 10-15 minutes to complete (40 total requests with delays)
- Safe to interrupt with Ctrl+C
- Results are automatically saved for later analysis 