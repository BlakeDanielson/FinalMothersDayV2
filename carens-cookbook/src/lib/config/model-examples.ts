/**
 * Example configurations for different AI models
 * Copy these to your .env file to experiment with different models
 * 
 * Note: This project uses the modern @google/genai unified SDK
 */

// OpenAI Models
export const OPENAI_EXAMPLES = {
  // Latest models (current defaults)
  CURRENT: {
    OPENAI_MAIN_MODEL: 'gpt-4.1-mini-2025-04-14',
    OPENAI_MINI_MODEL: 'gpt-4o-mini-2024-07-18',
  },
  
  // Standard GPT-4 models
  GPT4_STANDARD: {
    OPENAI_MAIN_MODEL: 'gpt-4o',
    OPENAI_MINI_MODEL: 'gpt-4o-mini',
  },
  
  // Previous generation
  GPT4_TURBO: {
    OPENAI_MAIN_MODEL: 'gpt-4-turbo',
    OPENAI_MINI_MODEL: 'gpt-3.5-turbo',
  },
};

// Example configurations for different use cases
export const USE_CASE_EXAMPLES = {
  // High quality, slower processing
  HIGH_QUALITY: {
    OPENAI_MAIN_MODEL: 'gpt-4o',
    OPENAI_MINI_MODEL: 'gpt-4o-mini',
    AI_MAX_TOKENS: '2000',
    AI_TEMPERATURE: '0.1',
  },
  
  // Fast processing, good quality
  BALANCED: {
    OPENAI_MAIN_MODEL: 'gpt-4.1-mini-2025-04-14',
    OPENAI_MINI_MODEL: 'gpt-4o-mini-2024-07-18',
    AI_MAX_TOKENS: '1000',
    AI_TEMPERATURE: '0.1',
  },
  
  // Maximum speed, acceptable quality
  FAST: {
    OPENAI_MAIN_MODEL: 'gpt-4o-mini',
    OPENAI_MINI_MODEL: 'gpt-3.5-turbo',
    AI_MAX_TOKENS: '800',
    AI_TEMPERATURE: '0.2',
  },
  
  // Cost-optimized
  ECONOMICAL: {
    OPENAI_MAIN_MODEL: 'gpt-4o-mini-2024-07-18',
    OPENAI_MINI_MODEL: 'gpt-3.5-turbo',
    AI_MAX_TOKENS: '500',
    AI_TEMPERATURE: '0.1',
  },
};

/**
 * Instructions for use:
 * 
 * 1. Choose a configuration above
 * 2. Add the variables to your .env file
 * 3. Restart your development server
 * 4. All API endpoints will automatically use the new models
 * 
 * Example .env addition:
 * 
 * # High Quality Configuration
 * OPENAI_MAIN_MODEL=gpt-4o
 * OPENAI_MINI_MODEL=gpt-4o-mini
 * AI_MAX_TOKENS=2000
 * AI_TEMPERATURE=0.1
 */ 