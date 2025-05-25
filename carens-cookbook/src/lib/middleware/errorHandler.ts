import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { categoryLogger, CategoryLogContext } from '@/lib/utils/logger';

// Custom error types for category operations
export class CategoryValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: string[],
    public suggestions?: string[]
  ) {
    super(message);
    this.name = 'CategoryValidationError';
  }
}

export class CategoryNotFoundError extends Error {
  constructor(categoryName: string) {
    super(`Category "${categoryName}" not found`);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategoryConflictError extends Error {
  constructor(message: string, public conflictType: 'duplicate' | 'reserved' | 'circular') {
    super(message);
    this.name = 'CategoryConflictError';
  }
}

export class CategoryOperationError extends Error {
  constructor(
    message: string,
    public operation: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'CategoryOperationError';
  }
}

// Error response interface
export interface ErrorResponse {
  error: string;
  code: string;
  details?: string[] | Record<string, unknown>;
  suggestions?: string[];
  retryable?: boolean;
  fallbackAction?: {
    type: 'fallback_category' | 'manual_intervention' | 'retry';
    data?: Record<string, unknown>;
  };
}

// Retry configuration
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  retryableErrors: string[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  retryableErrors: [
    'DATABASE_CONNECTION_ERROR',
    'TIMEOUT_ERROR',
    'RATE_LIMIT_ERROR',
    'TEMPORARY_UNAVAILABLE'
  ]
};

export class CategoryErrorHandler {
  private retryConfig: RetryConfig;

  constructor(retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG) {
    this.retryConfig = retryConfig;
  }

  /**
   * Main error handling wrapper for category API routes
   */
  async handleApiRequest<T>(
    request: NextRequest,
    operation: (req: NextRequest) => Promise<T>,
    context: Omit<CategoryLogContext, 'retryAttempt'>
  ): Promise<NextResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        categoryLogger.logDebug(
          { ...context, retryAttempt: attempt },
          `Starting ${context.operation} operation (attempt ${attempt})`
        );

        const result = await operation(request);
        
        categoryLogger.logSuccess(
          { ...context, retryAttempt: attempt },
          `${context.operation} operation completed successfully`
        );

        return NextResponse.json(result);

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        const errorCode = this.getErrorCode(lastError);
        const isRetryable = this.isRetryableError(errorCode);
        
        categoryLogger.logError(
          { ...context, retryAttempt: attempt, errorCode },
          lastError
        );

        // If this is the last attempt or error is not retryable, break
        if (attempt >= this.retryConfig.maxAttempts || !isRetryable) {
          break;
        }

        // Calculate delay for next retry
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(2, attempt - 1),
          this.retryConfig.maxDelay
        );

        categoryLogger.logRetry(
          { ...context, retryAttempt: attempt },
          `Retrying in ${delay}ms due to: ${lastError.message}`
        );

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // All retries failed, handle the final error
    return this.handleError(lastError!, context);
  }

  /**
   * Handle specific error types and return appropriate responses
   */
  private handleError(error: Error, context: CategoryLogContext): NextResponse {
    const errorCode = this.getErrorCode(error);
    
    // Handle validation errors
    if (error instanceof CategoryValidationError) {
      const response: ErrorResponse = {
        error: 'Validation failed',
        code: 'CATEGORY_VALIDATION_ERROR',
        details: error.validationErrors,
        suggestions: error.suggestions,
        retryable: false
      };

      categoryLogger.logError(context, error, { validationErrors: error.validationErrors });
      return NextResponse.json(response, { status: 400 });
    }

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const response: ErrorResponse = {
        error: 'Invalid request data',
        code: 'INVALID_REQUEST_DATA',
        details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
        retryable: false
      };

      categoryLogger.logError(context, error, { zodErrors: error.errors });
      return NextResponse.json(response, { status: 400 });
    }

    // Handle category not found errors
    if (error instanceof CategoryNotFoundError) {
      const response: ErrorResponse = {
        error: error.message,
        code: 'CATEGORY_NOT_FOUND',
        retryable: false,
        fallbackAction: {
          type: 'fallback_category',
          data: { fallbackCategory: 'Uncategorized' }
        }
      };

      categoryLogger.logError(context, error);
      return NextResponse.json(response, { status: 404 });
    }

    // Handle category conflict errors
    if (error instanceof CategoryConflictError) {
      const response: ErrorResponse = {
        error: error.message,
        code: `CATEGORY_CONFLICT_${error.conflictType.toUpperCase()}`,
        retryable: false,
        fallbackAction: {
          type: 'manual_intervention'
        }
      };

      categoryLogger.logError(context, error, { conflictType: error.conflictType });
      return NextResponse.json(response, { status: 409 });
    }

    // Handle Prisma database errors
    if (error instanceof PrismaClientKnownRequestError) {
      return this.handleDatabaseError(error, context);
    }

    // Handle operation errors
    if (error instanceof CategoryOperationError) {
      const response: ErrorResponse = {
        error: error.message,
        code: 'CATEGORY_OPERATION_ERROR',
        retryable: error.retryable,
        fallbackAction: error.retryable ? { type: 'retry' } : { type: 'manual_intervention' }
      };

      categoryLogger.logError(context, error, { operation: error.operation });
      return NextResponse.json(response, { status: 500 });
    }

    // Handle unknown errors
    const response: ErrorResponse = {
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      retryable: this.isRetryableError(errorCode),
      fallbackAction: {
        type: 'fallback_category',
        data: { fallbackCategory: 'Uncategorized' }
      }
    };

    categoryLogger.logError(context, error, { errorType: 'unknown' });
    return NextResponse.json(response, { status: 500 });
  }

  /**
   * Handle database-specific errors
   */
  private handleDatabaseError(error: PrismaClientKnownRequestError, context: CategoryLogContext): NextResponse {
    let response: ErrorResponse;
    let statusCode: number;

    switch (error.code) {
      case 'P2001': // Record not found
        response = {
          error: 'Record not found',
          code: 'DATABASE_RECORD_NOT_FOUND',
          retryable: false
        };
        statusCode = 404;
        break;

      case 'P2002': // Unique constraint violation
        response = {
          error: 'Duplicate entry detected',
          code: 'DATABASE_DUPLICATE_ENTRY',
          retryable: false,
          suggestions: ['Use a different category name', 'Merge with existing category']
        };
        statusCode = 409;
        break;

      case 'P2025': // Record to update/delete not found
        response = {
          error: 'Category not found for operation',
          code: 'DATABASE_UPDATE_NOT_FOUND',
          retryable: false,
          fallbackAction: {
            type: 'fallback_category',
            data: { fallbackCategory: 'Uncategorized' }
          }
        };
        statusCode = 404;
        break;

      case 'P2028': // Transaction API error
        response = {
          error: 'Database transaction failed',
          code: 'DATABASE_TRANSACTION_ERROR',
          retryable: true
        };
        statusCode = 500;
        break;

      default:
        response = {
          error: 'Database operation failed',
          code: 'DATABASE_ERROR',
          retryable: true
        };
        statusCode = 500;
    }

    categoryLogger.logError(context, error, { 
      prismaErrorCode: error.code,
      prismaMessage: error.message 
    });

    return NextResponse.json(response, { status: statusCode });
  }

  /**
   * Get error code from error instance
   */
  private getErrorCode(error: Error): string {
    if (error instanceof CategoryValidationError) return 'CATEGORY_VALIDATION_ERROR';
    if (error instanceof CategoryNotFoundError) return 'CATEGORY_NOT_FOUND';
    if (error instanceof CategoryConflictError) return 'CATEGORY_CONFLICT';
    if (error instanceof CategoryOperationError) return 'CATEGORY_OPERATION_ERROR';
    if (error instanceof ZodError) return 'VALIDATION_ERROR';
    if (error instanceof PrismaClientKnownRequestError) return `DATABASE_ERROR_${error.code}`;
    
    // Check for common error patterns
    if (error.message.includes('timeout')) return 'TIMEOUT_ERROR';
    if (error.message.includes('rate limit')) return 'RATE_LIMIT_ERROR';
    if (error.message.includes('connection')) return 'DATABASE_CONNECTION_ERROR';
    
    return 'UNKNOWN_ERROR';
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(errorCode: string): boolean {
    return this.retryConfig.retryableErrors.some(retryableCode => 
      errorCode.includes(retryableCode)
    );
  }

  /**
   * Apply fallback logic for failed category operations
   */
  async applyFallback(
    context: CategoryLogContext,
    fallbackCategory: string = 'Uncategorized'
  ): Promise<string> {
    categoryLogger.logFallback(
      context,
      'Applying fallback category due to operation failure',
      fallbackCategory
    );

    return fallbackCategory;
  }
}

// Export singleton instance
export const categoryErrorHandler = new CategoryErrorHandler();

// Helper function to wrap API route handlers
export function withCategoryErrorHandling<T>(
  operation: (req: NextRequest) => Promise<T>,
  context: Omit<CategoryLogContext, 'retryAttempt'>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    return categoryErrorHandler.handleApiRequest(req, operation, context);
  };
} 