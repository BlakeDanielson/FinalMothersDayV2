// Recipe Processing Error Types and Handling

export enum ErrorType {
  // File-related errors
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FILE_CORRUPTED = 'FILE_CORRUPTED',
  FILE_FORMAT_UNSUPPORTED = 'FILE_FORMAT_UNSUPPORTED',
  FILE_CONVERSION_FAILED = 'FILE_CONVERSION_FAILED',
  
  // Network-related errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  SERVER_ERROR = 'SERVER_ERROR',
  
  // AI/Processing errors
  AI_PROCESSING_FAILED = 'AI_PROCESSING_FAILED',
  AI_QUOTA_EXCEEDED = 'AI_QUOTA_EXCEEDED',
  AI_CONTENT_POLICY = 'AI_CONTENT_POLICY',
  RECIPE_NOT_DETECTED = 'RECIPE_NOT_DETECTED',
  
  // Validation errors
  INVALID_RECIPE_DATA = 'INVALID_RECIPE_DATA',
  MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
  
  // Authentication/Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMITED = 'RATE_LIMITED',
  
  // Generic
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface RecipeError {
  type: ErrorType;
  message: string;
  userMessage: string;
  actionable: string;
  retryable: boolean;
  details?: Record<string, unknown>;
  statusCode?: number;
  timestamp: Date;
}

export interface ErrorRecoveryStrategy {
  canRetry: boolean;
  suggestedDelay?: number;
  maxRetries?: number;
  fallbackAction?: string;
  userGuidance: string;
}

export class RecipeProcessingError extends Error {
  public readonly type: ErrorType;
  public readonly userMessage: string;
  public readonly actionable: string;
  public readonly retryable: boolean;
  public readonly details?: Record<string, unknown>;
  public readonly statusCode?: number;
  public readonly timestamp: Date;

  constructor(error: Omit<RecipeError, 'timestamp'>) {
    super(error.message);
    this.name = 'RecipeProcessingError';
    this.type = error.type;
    this.userMessage = error.userMessage;
    this.actionable = error.actionable;
    this.retryable = error.retryable;
    this.details = error.details;
    this.statusCode = error.statusCode;
    this.timestamp = new Date();
  }

  static fromUnknown(error: unknown, context: string = ''): RecipeProcessingError {
    if (error instanceof RecipeProcessingError) {
      return error;
    }

    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new RecipeProcessingError({
        type: ErrorType.NETWORK_ERROR,
        message: `Network error in ${context}: ${error.message}`,
        userMessage: "We're having trouble connecting to our servers.",
        actionable: "Please check your internet connection and try again.",
        retryable: true
      });
    }

    // Server errors
    if (error instanceof Error && error.message.includes('status')) {
      const statusMatch = error.message.match(/status[:\s]+(\d+)/i);
      const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;
      
      if (statusCode >= 500) {
        return new RecipeProcessingError({
          type: ErrorType.SERVER_ERROR,
          message: error.message,
          userMessage: "Our servers are experiencing issues.",
          actionable: "Please try again in a few moments.",
          retryable: true,
          statusCode
        });
      }
    }

    // Default unknown error
    return new RecipeProcessingError({
      type: ErrorType.UNKNOWN_ERROR,
      message: error instanceof Error ? error.message : String(error),
      userMessage: "Something unexpected happened.",
      actionable: "Please try again or contact support if the problem persists.",
      retryable: true,
      details: { context, originalError: error }
    });
  }
}

// Error classification based on status codes and error messages
export function classifyError(error: unknown, statusCode?: number): ErrorType {
  if (statusCode) {
    switch (statusCode) {
      case 400:
        return ErrorType.INVALID_RECIPE_DATA;
      case 401:
        return ErrorType.UNAUTHORIZED;
      case 413:
        return ErrorType.FILE_TOO_LARGE;
      case 422:
        return ErrorType.MISSING_REQUIRED_FIELDS;
      case 429:
        return ErrorType.RATE_LIMITED;
      case 500:
      case 502:
      case 503:
        return ErrorType.SERVER_ERROR;
      default:
        break;
    }
  }

  const errorMessage = (error && typeof error === 'object' && 'message' in error 
    ? String((error as { message: unknown }).message).toLowerCase() 
    : ''
  );
  
  // File-related
  if (errorMessage.includes('file too large') || errorMessage.includes('413')) {
    return ErrorType.FILE_TOO_LARGE;
  }
  if (errorMessage.includes('unsupported') || errorMessage.includes('format')) {
    return ErrorType.FILE_FORMAT_UNSUPPORTED;
  }
  if (errorMessage.includes('conversion') || errorMessage.includes('heic')) {
    return ErrorType.FILE_CONVERSION_FAILED;
  }
  
  // Network-related
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return ErrorType.NETWORK_ERROR;
  }
  if (errorMessage.includes('timeout')) {
    return ErrorType.REQUEST_TIMEOUT;
  }
  
  // AI-related
  if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
    return ErrorType.AI_QUOTA_EXCEEDED;
  }
  if (errorMessage.includes('content policy') || errorMessage.includes('inappropriate')) {
    return ErrorType.AI_CONTENT_POLICY;
  }
  if (errorMessage.includes('no recipe') || errorMessage.includes('not detected')) {
    return ErrorType.RECIPE_NOT_DETECTED;
  }
  if (errorMessage.includes('openai') || errorMessage.includes('ai')) {
    return ErrorType.AI_PROCESSING_FAILED;
  }
  
  return ErrorType.UNKNOWN_ERROR;
}

// Get user-friendly error messages and recovery strategies
export function getErrorDetails(type: ErrorType): { 
  userMessage: string; 
  actionable: string; 
  recovery: ErrorRecoveryStrategy;
} {
  switch (type) {
    case ErrorType.FILE_TOO_LARGE:
      return {
        userMessage: "The image file is too large to process.",
        actionable: "Please compress the image or use a smaller file (under 10MB).",
        recovery: {
          canRetry: true,
          userGuidance: "Try reducing image quality or taking a new photo with lower resolution."
        }
      };

    case ErrorType.FILE_FORMAT_UNSUPPORTED:
      return {
        userMessage: "This image format isn't supported.",
        actionable: "Please use JPG, PNG, or HEIC formats.",
        recovery: {
          canRetry: true,
          userGuidance: "Convert your image to JPG or PNG format, or take a new photo."
        }
      };

    case ErrorType.FILE_CONVERSION_FAILED:
      return {
        userMessage: "We couldn't convert your HEIC image.",
        actionable: "Try converting to JPG manually or take a new photo.",
        recovery: {
          canRetry: true,
          userGuidance: "Save the image as JPG from your phone's Photos app or use a different image."
        }
      };

    case ErrorType.RECIPE_NOT_DETECTED:
      return {
        userMessage: "We couldn't find a clear recipe in this image.",
        actionable: "Make sure the recipe text is clearly visible and well-lit.",
        recovery: {
          canRetry: true,
          userGuidance: "Try taking a clearer photo with better lighting, or crop the image to focus on the recipe."
        }
      };

    case ErrorType.AI_PROCESSING_FAILED:
      return {
        userMessage: "Our recipe analysis system encountered an issue.",
        actionable: "Please try again in a moment.",
        recovery: {
          canRetry: true,
          suggestedDelay: 2000,
          maxRetries: 3,
          userGuidance: "Wait a moment and try again. If it keeps failing, try a different image."
        }
      };

    case ErrorType.AI_QUOTA_EXCEEDED:
      return {
        userMessage: "We've reached our processing limit for now.",
        actionable: "Please try again in a few minutes.",
        recovery: {
          canRetry: true,
          suggestedDelay: 60000,
          maxRetries: 1,
          userGuidance: "Our AI processing service is temporarily at capacity. Try again in 5-10 minutes."
        }
      };

    case ErrorType.NETWORK_ERROR:
      return {
        userMessage: "We're having trouble connecting to our servers.",
        actionable: "Please check your internet connection and try again.",
        recovery: {
          canRetry: true,
          suggestedDelay: 1000,
          maxRetries: 3,
          userGuidance: "Check your WiFi or mobile data connection and try again."
        }
      };

    case ErrorType.SERVER_ERROR:
      return {
        userMessage: "Our servers are experiencing issues.",
        actionable: "Please try again in a few moments.",
        recovery: {
          canRetry: true,
          suggestedDelay: 5000,
          maxRetries: 2,
          userGuidance: "We're working to fix the issue. Try again in a minute or two."
        }
      };

    case ErrorType.RATE_LIMITED:
      return {
        userMessage: "You're uploading images too quickly.",
        actionable: "Please wait a moment before trying again.",
        recovery: {
          canRetry: true,
          suggestedDelay: 30000,
          maxRetries: 1,
          userGuidance: "Wait 30 seconds before uploading another image."
        }
      };

    default:
      return {
        userMessage: "Something unexpected happened.",
        actionable: "Please try again or contact support if the problem persists.",
        recovery: {
          canRetry: true,
          suggestedDelay: 1000,
          maxRetries: 2,
          userGuidance: "Try again, or reach out for help if this keeps happening."
        }
      };
  }
}

// Logging utility for errors
export function logError(error: RecipeProcessingError, additionalContext?: any) {
  const logData = {
    timestamp: error.timestamp,
    type: error.type,
    message: error.message,
    userMessage: error.userMessage,
    retryable: error.retryable,
    statusCode: error.statusCode,
    details: error.details,
    ...additionalContext
  };

  console.error('RecipeProcessingError:', logData);
  
  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or your own analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'recipe_processing_error', {
      error_type: error.type,
      error_message: error.message,
      retryable: error.retryable
    });
  }
} 