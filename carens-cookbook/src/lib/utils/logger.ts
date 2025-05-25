import winston from 'winston';
import { format } from 'winston';

// Define log levels for category operations
const categoryLogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
};

// Custom format for category logs
const categoryLogFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.json(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      component: 'CategoryManager',
      message,
      ...meta
    };
    return JSON.stringify(logEntry, null, 2);
  })
);

// Create the logger instance
const winstonLogger = winston.createLogger({
  levels: categoryLogLevels,
  level: process.env.LOG_LEVEL || 'info',
  format: categoryLogFormat,
  defaultMeta: { service: 'recipe-category-service' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, operation, ...meta }) => {
          const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
          return `${timestamp} [${level}] ${operation ? `[${operation}]` : ''} ${message}${metaStr}`;
        })
      )
    }),
    
    // File transport for production logs
    new winston.transports.File({
      filename: 'logs/category-errors.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/category-operations.log',
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    })
  ],
});

// Enhanced logging interface for category operations
export interface CategoryLogContext {
  operation: 'validate' | 'create' | 'rename' | 'merge' | 'delete' | 'fallback';
  userId: string;
  categoryName?: string;
  sourceCategories?: string[];
  targetCategory?: string;
  validationResult?: Record<string, unknown>;
  errorCode?: string;
  retryAttempt?: number;
  duration?: number;
}

export class CategoryLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winstonLogger;
  }

  /**
   * Log validation operations
   */
  logValidation(context: CategoryLogContext, message: string, level: 'info' | 'warn' | 'error' = 'info') {
    this.logger.log(level, message, {
      operation: context.operation,
      userId: context.userId,
      categoryName: context.categoryName,
      validationResult: context.validationResult,
      errorCode: context.errorCode
    });
  }

  /**
   * Log successful category operations
   */
  logSuccess(context: CategoryLogContext, message: string) {
    this.logger.info(message, {
      operation: context.operation,
      userId: context.userId,
      categoryName: context.categoryName,
      sourceCategories: context.sourceCategories,
      targetCategory: context.targetCategory,
      duration: context.duration,
      status: 'success'
    });
  }

  /**
   * Log category operation errors
   */
  logError(context: CategoryLogContext, error: Error | string, additionalInfo?: Record<string, unknown>) {
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    this.logger.error(errorMessage, {
      operation: context.operation,
      userId: context.userId,
      categoryName: context.categoryName,
      sourceCategories: context.sourceCategories,
      targetCategory: context.targetCategory,
      errorCode: context.errorCode,
      retryAttempt: context.retryAttempt,
      stack,
      additionalInfo,
      status: 'error'
    });
  }

  /**
   * Log fallback operations when category assignment fails
   */
  logFallback(context: CategoryLogContext, reason: string, fallbackCategory: string) {
    this.logger.warn(`Fallback to "${fallbackCategory}": ${reason}`, {
      operation: 'fallback',
      userId: context.userId,
      originalCategory: context.categoryName,
      fallbackCategory,
      reason,
      status: 'fallback'
    });
  }

  /**
   * Log retry attempts
   */
  logRetry(context: CategoryLogContext, reason: string) {
    this.logger.info(`Retry attempt ${context.retryAttempt}: ${reason}`, {
      operation: context.operation,
      userId: context.userId,
      categoryName: context.categoryName,
      retryAttempt: context.retryAttempt,
      reason,
      status: 'retry'
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(context: CategoryLogContext, operationName: string, duration: number) {
    const level = duration > 1000 ? 'warn' : 'info'; // Warn if operation takes > 1 second
    
    this.logger.log(level, `Performance: ${operationName} completed in ${duration}ms`, {
      operation: context.operation,
      userId: context.userId,
      operationName,
      duration,
      status: 'performance'
    });
  }

  /**
   * Log debug information for development
   */
  logDebug(context: CategoryLogContext, message: string, debugData?: Record<string, unknown>) {
    this.logger.debug(message, {
      operation: context.operation,
      userId: context.userId,
      categoryName: context.categoryName,
      debugData,
      status: 'debug'
    });
  }

  /**
   * Log user actions for audit trail
   */
  logUserAction(context: CategoryLogContext, action: string, details: Record<string, unknown>) {
    this.logger.info(`User action: ${action}`, {
      operation: context.operation,
      userId: context.userId,
      action,
      details,
      timestamp: new Date().toISOString(),
      status: 'user_action'
    });
  }

  /**
   * Log category statistics for analytics
   */
  logStatistics(userId: string, stats: {
    totalCategories: number;
    predefinedCount: number;
    aiGeneratedCount: number;
    userCreatedCount: number;
    totalRecipes: number;
  }) {
    this.logger.info('Category statistics', {
      operation: 'statistics',
      userId,
      stats,
      status: 'analytics'
    });
  }
}

// Export singleton instance
export const categoryLogger = new CategoryLogger();

// Utility function to measure operation duration
export function withPerformanceLogging<T>(
  operation: () => Promise<T>,
  context: CategoryLogContext,
  operationName: string
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      
      const logger = new CategoryLogger();
      logger.logPerformance(
        { ...context, duration },
        operationName,
        duration
      );
      
      resolve(result);
    } catch (error) {
      const duration = Date.now() - startTime;
      
      const logger = new CategoryLogger();
      logger.logError(
        { ...context, duration },
        error instanceof Error ? error : new Error(String(error))
      );
      
      reject(error);
    }
  });
} 