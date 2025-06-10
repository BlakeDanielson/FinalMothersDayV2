# Recipe Extraction Analytics Plan

## 📊 **Overview**
Implement a comprehensive analytics system to track recipe extraction performance, AI provider efficiency, and user satisfaction metrics. This will enable data-driven optimization of the AI extraction pipeline.

## 🎯 **Objectives**
1. **Performance Optimization**: Identify bottlenecks and optimize extraction times
2. **AI Provider Analysis**: Compare OpenAI vs Gemini effectiveness and costs
3. **Quality Assurance**: Track extraction accuracy and user satisfaction
4. **Business Intelligence**: Understand usage patterns and cost optimization opportunities

## 📋 **Metrics Categories**

### **1. Core Performance Metrics**
- **Stage-by-Stage Timing**:
  - HTML fetch time
  - AI processing time 
  - Validation & transformation time
  - Database save time
  - Total end-to-end time

- **AI Provider Performance**:
  - Success/failure rates by provider
  - Average response times per provider
  - Token usage & cost tracking
  - Fallback frequency and triggers

### **2. Quality & Accuracy Metrics**
- **Extraction Quality**:
  - Validation error rates
  - Missing field analysis (title, ingredients, steps, etc.)
  - Recipe completeness scores
  - Category confidence scores

- **User Satisfaction Indicators**:
  - Recipes favorited post-extraction
  - Time from extraction to first view
  - Recipe edit frequency (indicates extraction quality)

### **3. Source & Domain Analysis**
- **Website Performance**:
  - Success rates by recipe website domain
  - Average extraction time by domain
  - Optimal strategies per domain type

- **Content Analysis**:
  - HTML size vs extraction success
  - Structured data presence impact
  - Recipe keyword density correlation

### **4. Business Intelligence**
- **Usage Patterns**:
  - Peak extraction times
  - Most popular recipe sources
  - User extraction frequency

- **Cost Analysis**:
  - Token costs per provider
  - Cost per successful extraction
  - ROI of different AI strategies

## 🗄️ **Database Schema Design**

### **Primary Table: `RecipeExtractionMetrics`**
```sql
CREATE TABLE RecipeExtractionMetrics (
  id                    TEXT PRIMARY KEY DEFAULT (gen_random_uuid()),
  
  -- Request Context
  userId                TEXT NOT NULL REFERENCES User(id),
  recipeUrl             TEXT NOT NULL,
  domain                TEXT NOT NULL, -- extracted from URL
  requestTimestamp      TIMESTAMP DEFAULT NOW(),
  
  -- Strategy & Provider Info
  primaryStrategy       TEXT NOT NULL, -- 'url-direct' | 'html-fallback'
  aiProvider            TEXT NOT NULL, -- 'openai-mini' | 'openai-main' | 'gemini-main'
  fallbackUsed          BOOLEAN DEFAULT FALSE,
  fallbackReason        TEXT, -- why fallback was triggered
  
  -- Timing Metrics (all in milliseconds)
  totalDuration         INTEGER NOT NULL,
  htmlFetchDuration     INTEGER,
  aiProcessingDuration  INTEGER NOT NULL,
  validationDuration    INTEGER,
  databaseSaveDuration  INTEGER,
  
  -- Content & Processing Info
  htmlContentSize       INTEGER, -- bytes
  cleanedContentSize    INTEGER, -- bytes
  promptTokens          INTEGER,
  responseTokens        INTEGER,
  totalTokens           INTEGER,
  
  -- Success & Quality Metrics
  extractionSuccess     BOOLEAN NOT NULL,
  validationErrors      JSONB, -- array of validation errors
  missingFields         TEXT[], -- array of field names that were missing/null
  completenessScore     DECIMAL(3,2), -- 0.00 to 1.00
  
  -- AI Response Quality
  categoryConfidence    DECIMAL(3,2), -- from existing recipe.categoryConfidence
  hasStructuredData     BOOLEAN, -- whether site had JSON-LD
  
  -- Cost Tracking (in USD)
  estimatedCost         DECIMAL(10,6), -- calculated cost for this extraction
  
  -- Final Recipe Reference
  recipeId              TEXT REFERENCES Recipe(id), -- null if extraction failed
  
  -- Performance Flags
  wasOptimal            BOOLEAN DEFAULT FALSE, -- used optimal strategy
  
  createdAt             TIMESTAMP DEFAULT NOW(),
  updatedAt             TIMESTAMP DEFAULT NOW()
);
```

### **Supporting Tables**

#### **Domain Performance Summary**
```sql
CREATE TABLE DomainPerformanceMetrics (
  id                    TEXT PRIMARY KEY DEFAULT (gen_random_uuid()),
  domain                TEXT UNIQUE NOT NULL,
  
  -- Aggregated Performance
  totalExtractions      INTEGER DEFAULT 0,
  successfulExtractions INTEGER DEFAULT 0,
  averageExtractTime    INTEGER, -- milliseconds
  averageTokens         INTEGER,
  averageCost           DECIMAL(10,6),
  
  -- Optimal Strategy
  optimalStrategy       TEXT, -- determined strategy for this domain
  optimalProvider       TEXT, -- determined provider for this domain
  
  -- Quality Metrics
  averageCompleteness   DECIMAL(3,2),
  hasStructuredDataPct  DECIMAL(3,2), -- percentage with JSON-LD
  
  lastUpdated           TIMESTAMP DEFAULT NOW()
);
```

#### **AI Provider Cost Tracking**
```sql
CREATE TABLE AIProviderCosts (
  id                    TEXT PRIMARY KEY DEFAULT (gen_random_uuid()),
  provider              TEXT NOT NULL, -- 'openai' | 'gemini'
  model                 TEXT NOT NULL, -- 'gpt-4o-mini' | 'gemini-pro'
  
  -- Pricing (per 1000 tokens)
  inputTokenCost        DECIMAL(10,6),
  outputTokenCost       DECIMAL(10,6),
  
  effectiveDate         DATE NOT NULL,
  createdAt             TIMESTAMP DEFAULT NOW()
);
```

## 🛠️ **Implementation Plan**

### **Phase 1: Database Setup** ✅ COMPLETED
1. ✅ Create migration for new analytics tables
2. ✅ Add indexes for performance
3. ✅ Set up relationships and constraints

### **Phase 2: Metrics Collection** ✅ COMPLETED
1. ✅ Enhance extraction orchestrator with timing collection
2. ✅ Add validation metrics capture
3. ✅ Implement cost calculation logic
4. ✅ Update POST /api/fetch-recipe endpoint with full analytics
5. 🔄 **IN PROGRESS**: Update PUT /api/fetch-recipe endpoint  
6. 🔄 **IN PROGRESS**: Update streaming endpoint

### **Phase 3: Quality Tracking** 🔄 IN PROGRESS
1. ✅ Add recipe completeness scoring
2. ✅ Track user satisfaction metrics
3. ✅ Implement domain performance aggregation
4. 🔄 **NEXT**: Add structured data detection
5. 🔄 **NEXT**: Enhance category confidence tracking

### **Phase 4: Analytics Dashboard** (Future)
1. ✅ Create analytics API endpoints
2. 🔄 **NEXT**: Build dashboard UI components
3. 🔄 **FUTURE**: Add real-time monitoring alerts

## 📈 **Key Performance Indicators (KPIs)**

### **Performance KPIs**
- Average extraction time by provider
- 95th percentile response times
- Fallback rate percentage
- Success rate by domain

### **Quality KPIs**
- Recipe completeness score (target: >85%)
- Validation error rate (target: <5%)
- User satisfaction rate (favorites/views ratio)

### **Business KPIs**
- Cost per successful extraction
- Token efficiency (recipes/1000 tokens)
- User engagement post-extraction

## 🔄 **Analytics Automation**

### **Real-time Tracking**
- ✅ Every extraction logged immediately
- ✅ Async aggregation of domain metrics
- 🔄 **NEXT**: Cost tracking updated daily

### **Scheduled Analysis**
- 🔄 **NEXT**: Daily domain performance updates
- 🔄 **FUTURE**: Weekly provider performance reports
- 🔄 **FUTURE**: Monthly cost optimization analysis

## 📊 **Current Implementation Status**

### **✅ Completed Features:**
- **Database Schema**: All analytics tables created and indexed
- **Analytics Service**: Comprehensive tracking service with timing utilities
- **Cost Calculation**: Real-time cost estimation for all AI providers
- **Recipe Completeness**: Quality scoring algorithm implemented
- **Legacy Endpoint**: POST /api/fetch-recipe fully instrumented
- **Analytics API**: GET /api/analytics/extraction-metrics for data retrieval

### **🔄 In Progress:**
- **Optimized Endpoint**: PUT /api/fetch-recipe analytics integration
- **Streaming Endpoint**: POST /api/fetch-recipe-stream analytics integration

### **🔄 Next Steps:**
1. Complete analytics integration for remaining endpoints
2. Add structured data detection
3. Build analytics dashboard UI
4. Set up automated reporting

### **📊 Analytics Features Available:**

#### **Real-time Metrics Tracked:**
- ⏱️ **Timing**: HTML fetch, AI processing, validation, DB save, total duration
- 🤖 **AI Performance**: Provider used, token counts, cost estimation
- ✅ **Quality**: Validation errors, missing fields, completeness scores
- 🌐 **Domain Analysis**: Automatic domain performance aggregation
- 💰 **Cost Tracking**: Real-time cost calculation and tracking

#### **API Endpoints:**
- `GET /api/analytics/extraction-metrics?days=30` - User analytics
- `GET /api/analytics/extraction-metrics?scope=system&days=7` - System analytics

## 🚀 **Future Enhancements**
- Machine learning for optimal strategy prediction
- A/B testing framework for new extraction methods
- Predictive cost modeling
- User feedback integration
- Automated performance alerting

---

**Latest Update**: Phase 2 mostly completed! The legacy POST endpoint now has comprehensive analytics tracking including timing, cost calculation, quality scoring, and domain performance aggregation. Next: Complete integration for optimized and streaming endpoints. 