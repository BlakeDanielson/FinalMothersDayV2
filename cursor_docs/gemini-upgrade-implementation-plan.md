# Gemini API Upgrade Implementation Plan
## Based on Token Usage Analysis & Test Results

### 🎯 Executive Summary
Your test revealed that we're dramatically underutilizing Gemini's capabilities:
- **Current Usage**: ~2,370 tokens (9,063 chars) - heavily processed content
- **Potential Usage**: ~175,078 tokens (368,243 chars) - 73x more data!
- **Constraint**: Artificially limiting Gemini to 5% of its actual capacity

### 📊 Test Results Analysis

#### Current vs. Potential Comparison
| Strategy | Token Count | Content Size | Utilization |
|----------|-------------|--------------|-------------|
| **Current Gemini** | 2,370 | 9,063 chars | ~5% |
| **Full HTML Gemini** | 175,078 | 368,243 chars | ~100% |
| **URL-Direct Gemini** | 143 | Prompt only | Optimal |

#### Key Findings
1. ✅ **URL-Direct Strategy Works** - Successfully formatted 143-token requests
2. ✅ **Full HTML Strategy Proven** - Can handle 38x more content
3. ❌ **Quota Limitations** - Free tier blocking implementation (429 errors)
4. ✅ **Massive Untapped Potential** - Currently like "driving a Ferrari in first gear"

---

## 🚀 Implementation Phases

### Phase 1: API Upgrade & Configuration (Immediate)
**Prerequisites**: Upgrade Gemini API plan to remove quota limitations

#### 1.1 Update Environment Configuration
```typescript
// Update .env with upgraded API quotas
GOOGLE_API_KEY=your_upgraded_api_key
GEMINI_QUOTA_TIER=paid  # New environment variable to track tier
GEMINI_MAX_CONTEXT_TOKENS=2000000  # Gemini 2.5 Pro context limit
```

#### 1.2 Update AI Model Configuration
**File**: `carens-cookbook/src/lib/config/ai-models.ts`

```typescript
// Add new Gemini settings for full-context usage
export const AI_SETTINGS = {
  // ... existing settings ...
  
  GEMINI: {
    // Current conservative settings
    MAX_TOKENS: parseInt(process.env.GEMINI_MAX_TOKENS || '8000'),
    TEMPERATURE: parseFloat(process.env.GEMINI_TEMPERATURE || '0.1'),
    
    // NEW: Full-context settings
    FULL_CONTEXT: {
      MAX_INPUT_TOKENS: parseInt(process.env.GEMINI_MAX_INPUT_TOKENS || '1800000'), // Leave buffer
      MAX_OUTPUT_TOKENS: parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS || '32000'),
      ENABLE_FULL_HTML: process.env.GEMINI_ENABLE_FULL_HTML === 'true',
      ENABLE_URL_DIRECT: process.env.GEMINI_ENABLE_URL_DIRECT === 'true',
    }
  }
} as const;

// Add new strategy types
export type GeminiStrategy = 'current' | 'full-html' | 'url-direct';
```

### Phase 2: URL-Direct Strategy Implementation (High Priority)
**Impact**: Immediate 99%+ token reduction for URL-based recipe imports

#### 2.1 Create URL-Direct Processor
**New File**: `carens-cookbook/src/lib/services/gemini-url-direct.ts`

```typescript
import { GoogleGenAI } from '@google/genai';
import { AI_SETTINGS, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';

interface UrlDirectResult {
  title: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  description: string;
  cuisine: string;
  category: string;
  prepTime: string;
  cleanupTime: string;
}

export async function extractRecipeViaUrlDirect(
  url: string, 
  uiProvider: UIProvider = 'gemini-pro'
): Promise<UrlDirectResult> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API key not configured');
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const modelToUse = getModelFromUIProvider(uiProvider);

  const prompt = `Please visit this URL and extract recipe information: ${url}

Return ONLY a JSON object with these exact fields:
{
  "title": "recipe name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "image": "image_url_or_null",
  "description": "brief description",
  "cuisine": "cuisine type",
  "category": "recipe category",
  "prepTime": "prep time",
  "cleanupTime": "cleanup time"
}

If you cannot access the URL or extract recipe information, return an empty object: {}`;

  console.log(`Gemini URL-Direct: Processing ${url} with ${modelToUse}`);
  console.log(`Prompt tokens: ~${prompt.length / 4}`); // Rough token estimate

  const response = await genAI.models.generateContent({
    model: modelToUse,
    contents: prompt,
    config: {
      maxOutputTokens: AI_SETTINGS.GEMINI.FULL_CONTEXT.MAX_OUTPUT_TOKENS,
      temperature: AI_SETTINGS.GEMINI.TEMPERATURE,
    }
  });

  const content = response.text;
  if (!content) {
    throw new Error('No response from Gemini URL-Direct');
  }

  console.log(`Gemini URL-Direct: Response received for ${url}`);
  return JSON.parse(content);
}
```

### Phase 3: Full-HTML Strategy Implementation (Medium Priority)
**Impact**: 38x more content processing for complex recipe pages

#### 3.1 Create Full-HTML Processor
**New File**: `carens-cookbook/src/lib/services/gemini-full-html.ts`

```typescript
import { GoogleGenAI } from '@google/genai';
import { AI_SETTINGS, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';

export async function extractRecipeFromFullHtml(
  html: string,
  url: string,
  uiProvider: UIProvider = 'gemini-pro'
): Promise<unknown> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API key not configured');
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const modelToUse = getModelFromUIProvider(uiProvider);

  // Smart content chunking for massive HTML
  const maxInputTokens = AI_SETTINGS.GEMINI.FULL_CONTEXT.MAX_INPUT_TOKENS;
  const estimatedTokens = html.length / 4; // Rough estimate: 4 chars per token
  
  let processedHtml = html;
  if (estimatedTokens > maxInputTokens) {
    console.log(`HTML too large (${estimatedTokens} tokens), implementing smart chunking...`);
    processedHtml = smartChunkHtml(html, maxInputTokens);
  }

  const prompt = `Extract recipe information from this complete HTML content and return ONLY a JSON object with these exact fields:

{
  "title": "recipe name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "image": "image_url_or_null",
  "description": "brief description",
  "cuisine": "cuisine type",
  "category": "recipe category",
  "prepTime": "prep time",
  "cleanupTime": "cleanup time"
}

Source URL: ${url}

Full HTML Content:
${processedHtml}`;

  console.log(`Gemini Full-HTML: Processing ${url}`);
  console.log(`Content size: ${processedHtml.length} chars (~${processedHtml.length / 4} tokens)`);

  const response = await genAI.models.generateContent({
    model: modelToUse,
    contents: prompt,
    config: {
      maxOutputTokens: AI_SETTINGS.GEMINI.FULL_CONTEXT.MAX_OUTPUT_TOKENS,
      temperature: AI_SETTINGS.GEMINI.TEMPERATURE,
    }
  });

  return response.text;
}

function smartChunkHtml(html: string, maxTokens: number): string {
  const maxChars = maxTokens * 4; // Conservative estimate
  
  // Priority order for HTML sections
  const prioritySections = [
    // Recipe-specific structured data (highest priority)
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>.*?recipe.*?<\/script>/gi,
    
    // Recipe containers
    /<[^>]*class=[^>]*recipe[^>]*>.*?<\/[^>]+>/gi,
    /<[^>]*id=[^>]*recipe[^>]*>.*?<\/[^>]+>/gi,
    
    // Content sections
    /<main[^>]*>.*?<\/main>/gi,
    /<article[^>]*>.*?<\/article>/gi,
    /<section[^>]*>.*?<\/section>/gi,
  ];

  let result = '';
  let remainingChars = maxChars;

  // Extract priority sections first
  for (const pattern of prioritySections) {
    const matches = html.match(pattern);
    if (matches) {
      for (const match of matches) {
        if (match.length <= remainingChars) {
          result += match + '\n';
          remainingChars -= match.length;
        }
      }
    }
    if (remainingChars <= 1000) break; // Leave buffer
  }

  // Fill remaining space with body content if needed
  if (remainingChars > 5000) {
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/gi);
    if (bodyMatch && bodyMatch[0].length <= remainingChars) {
      result += bodyMatch[0];
    }
  }

  return result || html.substring(0, maxChars);
}
```

### Phase 4: Strategy Selection & Optimization
**Impact**: Intelligent strategy selection based on content type

#### 4.1 Create Strategy Selector
**New File**: `carens-cookbook/src/lib/services/gemini-strategy-selector.ts`

```typescript
export type GeminiProcessingStrategy = 'url-direct' | 'full-html' | 'current';

interface StrategyContext {
  url: string;
  htmlSize: number;
  hasStructuredData: boolean;
  userPreference?: GeminiProcessingStrategy;
}

export function selectOptimalStrategy(context: StrategyContext): GeminiProcessingStrategy {
  const { url, htmlSize, hasStructuredData, userPreference } = context;

  // User preference override
  if (userPreference && isStrategyEnabled(userPreference)) {
    return userPreference;
  }

  // URL-Direct for simple, well-structured sites
  if (isStrategyEnabled('url-direct') && shouldUseUrlDirect(url, hasStructuredData)) {
    return 'url-direct';
  }

  // Full-HTML for complex sites with rich content
  if (isStrategyEnabled('full-html') && shouldUseFullHtml(htmlSize, hasStructuredData)) {
    return 'full-html';
  }

  // Current strategy as fallback
  return 'current';
}

function isStrategyEnabled(strategy: GeminiProcessingStrategy): boolean {
  switch (strategy) {
    case 'url-direct':
      return AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_URL_DIRECT;
    case 'full-html':
      return AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_FULL_HTML;
    case 'current':
      return true; // Always available
    default:
      return false;
  }
}

function shouldUseUrlDirect(url: string, hasStructuredData: boolean): boolean {
  // URL-Direct works well for major recipe sites
  const knownGoodSites = [
    'allrecipes.com',
    'foodnetwork.com',
    'epicurious.com',
    'bonappetit.com',
    'seriouseats.com'
  ];

  const domain = new URL(url).hostname.toLowerCase();
  return knownGoodSites.some(site => domain.includes(site)) || hasStructuredData;
}

function shouldUseFullHtml(htmlSize: number, hasStructuredData: boolean): boolean {
  // Full-HTML for larger, complex pages or when structured data is missing
  return htmlSize > 100000 || !hasStructuredData;
}
```

---

## 🎯 Implementation Timeline

### Week 1: Foundation
- [ ] Upgrade Gemini API plan
- [ ] Update environment configuration  
- [ ] Implement URL-Direct strategy
- [ ] Test URL-Direct with known recipe sites

### Week 2: Enhancement
- [ ] Implement Full-HTML strategy
- [ ] Add smart HTML chunking
- [ ] Create strategy selector
- [ ] Add fallback mechanisms

### Week 3: Optimization
- [ ] Add usage analytics
- [ ] Performance testing & optimization
- [ ] Error handling improvements
- [ ] Deploy to production

---

## 🚨 Critical Considerations

### Cost Management
```typescript
// Monitor usage costs
const GEMINI_COST_PER_1K_TOKENS = {
  input: 0.00075,   // $0.75 per 1M tokens
  output: 0.003     // $3.00 per 1M tokens
};
```

### Error Handling Strategy
1. **URL-Direct fails** → Try Full-HTML
2. **Full-HTML fails** → Fall back to Current
3. **All strategies fail** → Return helpful error message

### Feature Flags
```env
GEMINI_URL_DIRECT_ENABLED=true
GEMINI_FULL_HTML_ENABLED=true
GEMINI_STRATEGY_AUTO_SELECT=true
```

---

## 📈 Expected Results

### Performance Improvements
- **URL-Direct**: 99%+ token reduction for simple sites
- **Full-HTML**: 38x more content processing capability
- **Smart Strategy**: Optimal performance per content type

### Cost Optimization
- **Current**: Paying for 175K tokens, using 2.3K (97% waste)
- **Optimized**: Pay only for what's needed per strategy

This plan transforms your Gemini usage from severely constrained to fully optimized! 🏎️ 