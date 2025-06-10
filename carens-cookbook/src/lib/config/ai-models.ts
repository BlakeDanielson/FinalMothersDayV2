/**
 * Centralized AI Model Configuration
 * Update model names here to experiment with different models across the entire project
 */

export const AI_MODELS = {
  // OpenAI Models
  OPENAI_MAIN: process.env.OPENAI_MAIN_MODEL || 'gpt-4.1-mini-2025-04-14',
  OPENAI_MINI: process.env.OPENAI_MINI_MODEL || 'gpt-4o-mini-2024-07-18',
  
  // Gemini Models
  GEMINI_MAIN: process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-05-20',
  GEMINI_PRO: process.env.GEMINI_PRO_MODEL || 'gemini-2.5-pro-preview-06-05',
  
  // Claude Models (if you decide to add Anthropic)
  CLAUDE_MAIN: process.env.CLAUDE_MODEL || 'claude-3-haiku-20240307',
} as const;

export const AI_SETTINGS = {
  MAX_TOKENS: parseInt(process.env.AI_MAX_TOKENS || '8000'),
  TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.1'),
  
  // Model-specific settings
  OPENAI: {
    MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '8000'),
    TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || '0.1'),
  },
  
  GEMINI: {
    MAX_TOKENS: parseInt(process.env.GEMINI_MAX_TOKENS || '8000'),
    TEMPERATURE: parseFloat(process.env.GEMINI_TEMPERATURE || '0.1'),
    
    // NEW: Full-context settings for advanced Gemini capabilities
    FULL_CONTEXT: {
      MAX_INPUT_TOKENS: parseInt(process.env.GEMINI_MAX_INPUT_TOKENS || '1800000'), // Leave buffer from 2M limit
      MAX_OUTPUT_TOKENS: parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS || '32000'),
      ENABLE_FULL_HTML: process.env.GEMINI_ENABLE_FULL_HTML === 'true',
      ENABLE_URL_DIRECT: process.env.GEMINI_ENABLE_URL_DIRECT === 'true',
    }
  },

  // Individual model max tokens (for fine-grained control)
  // These are OUTPUT token limits - how much the AI can generate back
  MODEL_SPECIFIC: {
    OPENAI_MAIN: parseInt(process.env.OPENAI_MAIN_MAX_TOKENS || '8000'),
    OPENAI_MINI: parseInt(process.env.OPENAI_MINI_MAX_TOKENS || '8000'), 
    GEMINI_MAIN: parseInt(process.env.GEMINI_MAIN_MAX_TOKENS || '8000'),
    GEMINI_PRO: parseInt(process.env.GEMINI_PRO_MAX_TOKENS || '8000'),
    CLAUDE_MAIN: parseInt(process.env.CLAUDE_MAIN_MAX_TOKENS || '8000'),
  }
} as const;

// Type definitions for better TypeScript support
export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS];
export type ModelProvider = 'openai' | 'gemini' | 'claude';

// UI Provider types (for the new 4-model system)
export type UIProvider = 'openai-main' | 'openai-mini' | 'gemini-main' | 'gemini-pro';

// Gemini processing strategy types
export type GeminiStrategy = 'url-direct' | 'full-html' | 'current';

// Helper function to get model by provider and type
export function getModelByProvider(
  provider: ModelProvider, 
  modelType: 'main' | 'mini' = 'main'
): string {
  switch (provider) {
    case 'openai':
      return modelType === 'mini' ? AI_MODELS.OPENAI_MINI : AI_MODELS.OPENAI_MAIN;
    case 'gemini':
      return AI_MODELS.GEMINI_MAIN;
    case 'claude':
      return AI_MODELS.CLAUDE_MAIN;
    default:
      return AI_MODELS.OPENAI_MAIN;
  }
}

// Helper function to get the backend provider from UI provider
export function getBackendProviderFromUI(uiProvider: UIProvider): ModelProvider {
  if (uiProvider.startsWith('openai')) return 'openai';
  if (uiProvider.startsWith('gemini')) return 'gemini';
  return 'openai'; // fallback
}

// Helper function to get the specific model from UI provider
export function getModelFromUIProvider(uiProvider: UIProvider): string {
  switch (uiProvider) {
    case 'openai-main':
      return AI_MODELS.OPENAI_MAIN;
    case 'openai-mini':
      return AI_MODELS.OPENAI_MINI;
    case 'gemini-main':
      return AI_MODELS.GEMINI_MAIN;
    case 'gemini-pro':
      return AI_MODELS.GEMINI_PRO;
    default:
      return AI_MODELS.OPENAI_MAIN;
  }
}

// Helper function to get max tokens for a specific model
export function getMaxTokensForModel(uiProvider: UIProvider): number {
  switch (uiProvider) {
    case 'openai-main':
      return AI_SETTINGS.MODEL_SPECIFIC.OPENAI_MAIN;
    case 'openai-mini':
      return AI_SETTINGS.MODEL_SPECIFIC.OPENAI_MINI;
    case 'gemini-main':
      return AI_SETTINGS.MODEL_SPECIFIC.GEMINI_MAIN;
    case 'gemini-pro':
      return AI_SETTINGS.MODEL_SPECIFIC.GEMINI_PRO;
    default:
      return AI_SETTINGS.MAX_TOKENS;
  }
} 