export type AIProvider = 'openai' | 'gemini';

export interface ImageProcessingConfig {
  provider: AIProvider;
  model?: string;
}

export const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI GPT-4o',
    description: 'High accuracy with excellent image understanding',
    model: 'gpt-4o',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif']
  },
  gemini: {
    name: 'Google Gemini 2.5 Flash',
    description: 'Latest fast processing with enhanced multimodal capabilities',
    model: 'gemini-2.5-flash-preview-05-20',
    maxFileSize: 20 * 1024 * 1024, // 20MB
    supportedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
  }
} as const;

export function getProviderConfig(provider: AIProvider) {
  return AI_PROVIDERS[provider];
}

export function validateProviderSupport(provider: AIProvider, file: File): boolean {
  const config = getProviderConfig(provider);
  
  // Check file size
  if (file.size > config.maxFileSize) {
    return false;
  }
  
  // Check MIME type
  if (!(config.supportedFormats as readonly string[]).includes(file.type.toLowerCase())) {
    return false;
  }
  
  return true;
} 