# AI Model Configuration

This directory contains centralized configuration for AI models used throughout the application.

## Files

- `ai-models.ts` - Central configuration for AI models and settings

## How to Change Models

To experiment with different AI models across the entire project, you have two options:

> **📦 Package Info:** This project uses the modern `@google/genai` unified SDK (not the deprecated `@google/generative-ai`).

### Option 1: Environment Variables (Recommended)
Add these variables to your `.env` file:

```env
# AI Model Configuration
OPENAI_MAIN_MODEL=gpt-4.1-mini-2025-04-14
OPENAI_MINI_MODEL=gpt-4o-mini-2024-07-18
GEMINI_MODEL=gemini-1.5-flash
CLAUDE_MODEL=claude-3-haiku-20240307

# AI Settings
AI_MAX_TOKENS=1000
AI_TEMPERATURE=0.1

# Model-specific settings (optional)
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.1
GEMINI_MAX_TOKENS=1000
GEMINI_TEMPERATURE=0.1
```

### Option 2: Direct Code Changes
Edit the default values in `ai-models.ts`:

```typescript
export const AI_MODELS = {
  OPENAI_MAIN: 'your-preferred-main-model',
  OPENAI_MINI: 'your-preferred-mini-model',
  // ... etc
}
```

## Usage

Import and use the centralized configuration in your API routes:

```typescript
import { AI_MODELS, AI_SETTINGS, getModelByProvider } from '@/lib/config/ai-models';

// Use specific model
const completion = await openai.chat.completions.create({
  model: AI_MODELS.OPENAI_MAIN,
  max_tokens: AI_SETTINGS.OPENAI.MAX_TOKENS,
  temperature: AI_SETTINGS.OPENAI.TEMPERATURE,
  // ...
});

// Or use helper function
const model = getModelByProvider('openai', 'main');
```

## Files Using This Configuration

The following files have been updated to use this centralized configuration:

- `/api/fetch-recipe/route.ts`
- `/api/scan-recipe/route.ts`
- `/api/scan-recipe-multiple/route.ts`

## Benefits

- **Easy Experimentation**: Change models in one place
- **Consistent Settings**: Same model settings across all endpoints
- **Environment-Specific**: Different models for dev/staging/prod
- **Type Safety**: TypeScript support for model names
- **Flexibility**: Override via environment variables or code changes 