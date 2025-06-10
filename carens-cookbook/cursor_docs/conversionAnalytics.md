# Conversion Analytics System

## Overview
Comprehensive analytics system tracking anonymous user behavior and conversion funnel for Caren's Cookbook recipe extraction feature.

## Key Features

### 1. Anonymous User Tracking
- **Session Management**: UUID-based session tracking for anonymous users
- **Device Detection**: Browser, OS, device type, screen resolution
- **Geographic Insights**: IP-based location tracking
- **90-Day Retention**: Auto-deletion policy for internal testing

### 2. Rate Limiting
- **Anonymous Users**: 20 recipes per day
- **Registered Users**: 1000 recipes per day  
- **Daily Reset**: Limits reset at midnight
- **IP Tracking**: Additional rate limiting capabilities

### 3. Conversion Funnel Events
- `SESSION_STARTED`: Anonymous user begins session
- `RECIPE_EXTRACTED`: Successfully extracted a recipe
- `RATE_LIMIT_HIT`: User hits daily extraction limit
- `SIGNUP_PROMPT_SHOWN`: "Sign up to save" message displayed
- `SIGNUP_CLICKED`: User clicks signup from prompt
- `SIGNUP_COMPLETED`: User successfully registers
- `RECIPE_SAVE_ATTEMPTED`: Tried to save but couldn't (anonymous)
- `FEATURE_INTERACTION`: Used premium features

### 4. Smart Conversion Triggers
- **Approaching Limit**: Signup prompt when ≤5 recipes remaining
- **Rate Limit Hit**: Strong conversion message at limit
- **Usage Patterns**: Track which features drive conversions

## Database Schema

### AnonymousSession
- Session tracking with device info
- Conversion status and timing
- Geographic and referrer data
- Auto-expires after 90 days

### ConversionEvent
- Granular event tracking
- Session duration calculation
- Contextual data storage
- 90-day retention policy

### DailyRateLimit
- Per-user/session daily counters
- Supports both anonymous and authenticated users
- Date-based tracking for accurate resets

## API Endpoints

### `/api/analytics/conversion-metrics`
- **Method**: GET
- **Auth**: Required (admin access)
- **Params**: `days` (7, 30, 90)
- **Returns**: Comprehensive conversion metrics

### `/api/fetch-recipe-stream` (Enhanced)
- **Added**: Session tracking integration
- **Added**: Rate limit enforcement
- **Added**: Conversion event logging
- **Added**: Smart signup prompt triggers

## Admin Dashboard

### Location: `/admin/analytics`
**Key Metrics Displayed:**
- Total sessions and conversions
- Conversion rate analysis
- Recipe extraction volumes
- Rate limit impact analysis
- Funnel progression tracking

**Insights Provided:**
- Engagement scoring
- Conversion rate benchmarking
- Rate limiting effectiveness
- Feature usage patterns

## Implementation Highlights

### 1. Non-Blocking Analytics
- Analytics failures don't break recipe extraction
- Graceful degradation when tracking unavailable
- Background processing for better UX

### 2. Privacy-Conscious Design
- No personal data stored for anonymous users
- IP addresses for rate limiting only
- 90-day auto-deletion for compliance readiness

### 3. Conversion Optimization
- Strategic signup prompt timing
- Clear value proposition at limits
- Frictionless experience below thresholds

## Usage Examples

```typescript
// Track conversion event
await ConversionAnalytics.trackEvent(
  sessionId,
  ConversionEventType.RECIPE_EXTRACTED,
  { recipeUrl: url, strategy: 'openai-html' }
);

// Check rate limits
const rateLimitResult = await ConversionAnalytics.checkRateLimit(sessionId);
if (!rateLimitResult.allowed) {
  // Show upgrade prompt
}

// Track conversion
await ConversionAnalytics.trackConversion(sessionId, userId, {
  signupSource: 'rate_limit_prompt'
});
```

## Performance Considerations

### Indexes
- Optimized for common query patterns
- Session-based lookups
- Date range analytics queries
- Event type filtering

### Cleanup
- Automatic expiration policies
- Efficient deletion queries
- Minimal storage footprint

## Future Enhancements

### Phase 4 (Planned)
1. **A/B Testing Framework**
   - Different rate limits for segments
   - Prompt messaging variations
   - Conversion optimization

2. **Advanced Segmentation**
   - Behavioral cohorts
   - Geographic performance
   - Device-specific insights

3. **Real-time Alerts**
   - Conversion rate drops
   - High-value user identification
   - System performance monitoring

## Configuration

### Environment Variables
- Standard API keys in `.env` or `mcp.json`
- No additional configuration required

### Rate Limits (Configurable)
```typescript
const maxRequests = userId ? 1000 : 20;
```

### Retention Policy
```sql
expiresAt: DateTime @default(dbgenerated("NOW() + INTERVAL '90 days'"))
```

## Testing Status
- **Current**: Internal testing phase
- **Retention**: 90 days for iteration
- **Privacy**: Minimal compliance requirements
- **Scale**: Ready for production deployment

---

*System successfully tracking anonymous user conversions with 20 recipes/day limit and comprehensive funnel analytics.* 