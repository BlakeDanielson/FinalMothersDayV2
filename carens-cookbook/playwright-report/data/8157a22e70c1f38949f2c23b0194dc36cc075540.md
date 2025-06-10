# Test info

- Name: Real Analytics Generation >> Extract real analytics data from allrecipes.com
- Location: C:\Users\blake\OneDrive\Desktop\NewProjects\FinalMothersDayV2\carens-cookbook\tests\e2e\real-analytics-generation.test.ts:74:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: null
    at C:\Users\blake\OneDrive\Desktop\NewProjects\FinalMothersDayV2\carens-cookbook\tests\e2e\real-analytics-generation.test.ts:116:27
```

# Test source

```ts
   16 |     source: 'kingarthurbaking.com',
   17 |     expectedStrategy: 'url-direct', 
   18 |     difficulty: 'low'
   19 |   },
   20 |   {
   21 |     url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
   22 |     source: 'tasteofhome.com',
   23 |     expectedStrategy: 'url-direct',
   24 |     difficulty: 'medium'
   25 |   }
   26 | ];
   27 |
   28 | const TEST_USER_ID = 'test_real_analytics_playwright';
   29 |
   30 | test.describe('Real Analytics Generation', () => {
   31 |   let baseURL: string;
   32 |
   33 |   test.beforeAll(async () => {
   34 |     baseURL = process.env.BASE_URL || 'http://localhost:3000';
   35 |   });
   36 |
   37 |   test.beforeEach(async () => {
   38 |     // Ensure test user exists before each test (handles parallel execution)
   39 |     await prisma.user.upsert({
   40 |       where: { id: TEST_USER_ID },
   41 |       create: {
   42 |         id: TEST_USER_ID,
   43 |         email: 'test-real-analytics-playwright@testing.local',
   44 |         firstName: 'Real',
   45 |         lastName: 'Analytics'
   46 |       },
   47 |       update: {
   48 |         firstName: 'Real',
   49 |         lastName: 'Analytics'
   50 |       }
   51 |     });
   52 |   });
   53 |
   54 |   test.afterAll(async () => {
   55 |     // Cleanup: Remove test data
   56 |     await prisma.recipeExtractionMetrics.deleteMany({
   57 |       where: { userId: TEST_USER_ID }
   58 |     });
   59 |     
   60 |     await prisma.recipe.deleteMany({
   61 |       where: { userId: TEST_USER_ID }
   62 |     });
   63 |     
   64 |     await prisma.user.delete({
   65 |       where: { id: TEST_USER_ID }
   66 |     }).catch(() => {
   67 |       // User might not exist, ignore error
   68 |     });
   69 |     
   70 |     await prisma.$disconnect();
   71 |   });
   72 |
   73 |   for (const testRecipe of TEST_RECIPES) {
   74 |     test(`Extract real analytics data from ${testRecipe.source}`, async ({ request }) => {
   75 |       console.log(`🔍 Testing extraction from: ${testRecipe.url}`);
   76 |       
   77 |       const startTime = Date.now();
   78 |       
   79 |       // Make actual API call to extraction endpoint
   80 |       const response = await request.post(`${baseURL}/api/fetch-recipe-stream`, {
   81 |         data: {
   82 |           url: testRecipe.url,
   83 |           userId: TEST_USER_ID
   84 |         }
   85 |       });
   86 |       
   87 |       const duration = Date.now() - startTime;
   88 |       console.log(`⏱️  Request completed in ${duration}ms`);
   89 |       
   90 |       // Verify response
   91 |       expect(response.ok()).toBe(true);
   92 |       
   93 |       // Parse streaming response
   94 |       const body = await response.text();
   95 |       const lines = body.split('\n');
   96 |       
   97 |       let finalResult: any = null;
   98 |       let strategy: string = 'unknown';
   99 |       
  100 |       for (const line of lines) {
  101 |         if (line.startsWith('data: ')) {
  102 |           try {
  103 |             const data = JSON.parse(line.slice(6));
  104 |             if (data.type === 'success') {
  105 |               finalResult = data;
  106 |               strategy = data.optimization?.strategy || 'unknown';
  107 |               break;
  108 |             }
  109 |           } catch (e) {
  110 |             // Skip invalid JSON
  111 |           }
  112 |         }
  113 |       }
  114 |       
  115 |       // Verify extraction was successful
> 116 |       expect(finalResult).toBeTruthy();
      |                           ^ Error: expect(received).toBeTruthy()
  117 |       expect(finalResult.recipe).toBeTruthy();
  118 |       expect(finalResult.recipe.title).toBeTruthy();
  119 |       expect(finalResult.recipe.ingredients).toBeTruthy();
  120 |       expect(finalResult.recipe.steps).toBeTruthy();
  121 |       
  122 |       console.log(`✅ Successfully extracted: "${finalResult.recipe.title}"`);
  123 |       console.log(`🔧 Strategy used: ${strategy}`);
  124 |       console.log(`📊 ${finalResult.recipe.ingredients.length} ingredients, ${finalResult.recipe.steps.length} steps`);
  125 |       
  126 |       // Wait a moment for database to be populated
  127 |       await new Promise(resolve => setTimeout(resolve, 1000));
  128 |       
  129 |       // Verify analytics data was recorded
  130 |       const extractionMetrics = await prisma.recipeExtractionMetrics.findMany({
  131 |         where: {
  132 |           userId: TEST_USER_ID,
  133 |           recipeUrl: testRecipe.url
  134 |         },
  135 |         orderBy: { createdAt: 'desc' },
  136 |         take: 1
  137 |       });
  138 |       
  139 |       expect(extractionMetrics.length).toBeGreaterThan(0);
  140 |       
  141 |       const metric = extractionMetrics[0];
  142 |       expect(metric.extractionSuccess).toBe(true);
  143 |       expect(metric.primaryStrategy).toBeTruthy();
  144 |       expect(metric.totalDuration).toBeGreaterThan(0);
  145 |       expect(metric.domain).toBe(testRecipe.source);
  146 |       
  147 |       console.log(`📈 Analytics recorded - Strategy: ${metric.primaryStrategy}, Duration: ${metric.totalDuration}ms`);
  148 |       
  149 |       // Verify recipe was saved
  150 |       const savedRecipes = await prisma.recipe.findMany({
  151 |         where: {
  152 |           userId: TEST_USER_ID,
  153 |           title: finalResult.recipe.title
  154 |         }
  155 |       });
  156 |       
  157 |       expect(savedRecipes.length).toBeGreaterThan(0);
  158 |       
  159 |       const savedRecipe = savedRecipes[0];
  160 |       expect(savedRecipe.ingredients.length).toBeGreaterThan(0);
  161 |       expect(savedRecipe.steps.length).toBeGreaterThan(0);
  162 |       
  163 |       console.log(`🍳 Recipe saved to database with ID: ${savedRecipe.id}`);
  164 |     });
  165 |   }
  166 |
  167 |   test('Verify analytics dashboard can display real data', async ({ page }) => {
  168 |     // Navigate to analytics dashboard (assumes admin route exists)
  169 |     await page.goto(`${baseURL}/admin/analytics`);
  170 |     
  171 |     // Wait for data to load
  172 |     await page.waitForTimeout(2000);
  173 |     
  174 |     // Check for analytics components (these may vary based on your dashboard implementation)
  175 |     const pageContent = await page.textContent('body');
  176 |     
  177 |     // Verify dashboard loads successfully
  178 |     expect(pageContent).toBeTruthy();
  179 |     
  180 |     // Look for analytics-related content
  181 |     const hasAnalyticsContent = 
  182 |       pageContent!.includes('extraction') ||
  183 |       pageContent!.includes('success') ||
  184 |       pageContent!.includes('strategy') ||
  185 |       pageContent!.includes('token') ||
  186 |       pageContent!.includes('metrics');
  187 |     
  188 |     expect(hasAnalyticsContent).toBe(true);
  189 |     
  190 |     console.log('✅ Analytics dashboard loaded successfully with real data');
  191 |   });
  192 |
  193 |   test('Verify analytics aggregation functions work with real data', async () => {
  194 |     // Test analytics aggregation with real data
  195 |     const totalExtractions = await prisma.recipeExtractionMetrics.count({
  196 |       where: { userId: TEST_USER_ID }
  197 |     });
  198 |     
  199 |     expect(totalExtractions).toBeGreaterThan(0);
  200 |     
  201 |     const successfulExtractions = await prisma.recipeExtractionMetrics.count({
  202 |       where: {
  203 |         userId: TEST_USER_ID,
  204 |         extractionSuccess: true
  205 |       }
  206 |     });
  207 |     
  208 |     expect(successfulExtractions).toBeGreaterThan(0);
  209 |     
  210 |     // Calculate success rate
  211 |     const successRate = (successfulExtractions / totalExtractions) * 100;
  212 |     console.log(`📊 Success rate: ${successRate.toFixed(1)}% (${successfulExtractions}/${totalExtractions})`);
  213 |     
  214 |     // Test strategy distribution
  215 |     const strategyStats = await prisma.recipeExtractionMetrics.groupBy({
  216 |       by: ['primaryStrategy'],
```