/**
 * UI Model Configuration
 * This file connects our centralized AI model config to the UI components
 */

import { AI_MODELS } from './ai-models';

export type AIProvider = 'openai-main' | 'openai-mini' | 'gemini-main' | 'gemini-pro';

export interface UIModelConfig {
  id: AIProvider;
  name: string;
  description: string;
  badge: string;
  icon: 'sparkles' | 'zap';
  iconColor: string;
  actualModel: string;
  features: string[];
  recommended?: boolean;
}

export const UI_MODEL_CONFIGS: Record<AIProvider, UIModelConfig> = {
  'openai-main': {
    id: 'openai-main',
    name: 'OpenAI GPT-4.1-Mini',
    description: 'Most accurate results',
    badge: 'Recommended',
    icon: 'sparkles',
    iconColor: 'text-green-500',
    actualModel: AI_MODELS.OPENAI_MAIN,
    features: ['Reliable extraction', 'High accuracy', 'Consistent formatting'],
    recommended: true,
  },
  'openai-mini': {
    id: 'openai-mini',
    name: 'OpenAI GPT-4o-Mini',
    description: 'Fast and cost-effective',
    badge: 'Economical',
    icon: 'sparkles',
    iconColor: 'text-emerald-500',
    actualModel: AI_MODELS.OPENAI_MINI,
    features: ['Quick processing', 'Cost-effective', 'Good accuracy'],
    recommended: false,
  },
  'gemini-main': {
    id: 'gemini-main',
    name: 'Gemini 2.5 Flash',
    description: 'Fast processing with latest AI',
    badge: 'Fast',
    icon: 'zap',
    iconColor: 'text-blue-500',
    actualModel: AI_MODELS.GEMINI_MAIN,
    features: ['Quick processing', 'Advanced multimodal', 'Latest Google AI'],
    recommended: false,
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Premium quality and reasoning',
    badge: 'Premium',
    icon: 'zap',
    iconColor: 'text-purple-500',
    actualModel: AI_MODELS.GEMINI_PRO,
    features: ['Superior reasoning', 'Complex understanding', 'Premium quality'],
    recommended: false,
  },
};

/**
 * Get UI configuration for a specific provider
 */
export function getUIModelConfig(provider: AIProvider): UIModelConfig {
  return UI_MODEL_CONFIGS[provider];
}

/**
 * Get all available UI model configurations
 */
export function getAllUIModelConfigs(): UIModelConfig[] {
  return Object.values(UI_MODEL_CONFIGS);
}

/**
 * Get display text showing the actual model being used
 */
export function getModelDisplayText(provider: AIProvider): string {
  const config = getUIModelConfig(provider);
  return `${config.name} (${config.actualModel})`;
}

/**
 * Get a detailed description including the actual model
 */
export function getDetailedModelDescription(provider: AIProvider): string {
  const config = getUIModelConfig(provider);
  return `${config.name} - Using ${config.actualModel}: ${config.description}`;
}

/**
 * Helper function to get the actual backend provider from UI provider ID
 */
export function getBackendProvider(uiProvider: AIProvider): 'openai' | 'gemini' {
  if (uiProvider.startsWith('openai')) return 'openai';
  if (uiProvider.startsWith('gemini')) return 'gemini';
  return 'openai'; // fallback
}

/**
 * Helper function to get the model type from UI provider ID
 */
export function getModelType(uiProvider: AIProvider): 'main' | 'mini' | 'pro' {
  if (uiProvider.includes('mini')) return 'mini';
  if (uiProvider.includes('pro')) return 'pro';
  return 'main';
} 