"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  FileX, 
  Wifi, 
  Server, 
  Clock,
  Image as ImageIcon,
  Brain,
  Shield,
  Info,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ErrorType, RecipeProcessingError, getErrorDetails } from '@/lib/errors';

interface ErrorDisplayProps {
  error: RecipeProcessingError | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  compact?: boolean;
}

const getErrorIcon = (type: ErrorType) => {
  switch (type) {
    case ErrorType.FILE_TOO_LARGE:
    case ErrorType.FILE_CORRUPTED:
    case ErrorType.FILE_FORMAT_UNSUPPORTED:
    case ErrorType.FILE_CONVERSION_FAILED:
      return FileX;
    case ErrorType.NETWORK_ERROR:
      return Wifi;
    case ErrorType.REQUEST_TIMEOUT:
      return Clock;
    case ErrorType.SERVER_ERROR:
      return Server;
    case ErrorType.AI_PROCESSING_FAILED:
    case ErrorType.AI_QUOTA_EXCEEDED:
    case ErrorType.RECIPE_NOT_DETECTED:
      return Brain;
    case ErrorType.AI_CONTENT_POLICY:
      return Shield;
    case ErrorType.RATE_LIMITED:
      return Clock;
    default:
      return AlertTriangle;
  }
};

const getErrorColor = (type: ErrorType) => {
  switch (type) {
    case ErrorType.FILE_TOO_LARGE:
    case ErrorType.FILE_FORMAT_UNSUPPORTED:
    case ErrorType.FILE_CONVERSION_FAILED:
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case ErrorType.NETWORK_ERROR:
    case ErrorType.REQUEST_TIMEOUT:
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case ErrorType.SERVER_ERROR:
      return 'text-red-600 bg-red-50 border-red-200';
    case ErrorType.AI_PROCESSING_FAILED:
    case ErrorType.AI_QUOTA_EXCEEDED:
    case ErrorType.RECIPE_NOT_DETECTED:
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case ErrorType.RATE_LIMITED:
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-red-600 bg-red-50 border-red-200';
  }
};

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
  className,
  compact = false
}) => {
  if (!error) return null;

  const Icon = getErrorIcon(error.type);
  const colorClasses = getErrorColor(error.type);
  const { recovery } = getErrorDetails(error.type);

  if (compact) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn('flex items-center gap-3 p-3 rounded-lg border', colorClasses, className)}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{error.userMessage}</p>
            <p className="text-xs opacity-75 mt-1">{error.actionable}</p>
          </div>
          <div className="flex items-center gap-2">
            {recovery.canRetry && onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                className="h-8 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            )}
            {onDismiss && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
                className="h-8 w-8 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        <Card className={cn('p-6 border-2', colorClasses)}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-current/10 flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{error.userMessage}</h3>
                  <p className="text-sm opacity-80 mb-4">{error.actionable}</p>
                </div>
                
                {onDismiss && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onDismiss}
                    className="text-current hover:bg-current/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Error details */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="outline" className="border-current/20 text-current">
                  {error.type.replace('_', ' ').toLowerCase()}
                </Badge>
                {error.retryable && (
                  <Badge variant="outline" className="border-current/20 text-current">
                    Retryable
                  </Badge>
                )}
                {error.statusCode && (
                  <Badge variant="outline" className="border-current/20 text-current">
                    Status: {error.statusCode}
                  </Badge>
                )}
              </div>

              {/* Recovery guidance */}
              {recovery.userGuidance && (
                <div className="bg-current/5 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">What you can do:</h4>
                      <p className="text-sm opacity-80">{recovery.userGuidance}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {recovery.canRetry && onRetry && (
                  <Button
                    onClick={onRetry}
                    variant="default"
                    className="bg-current hover:bg-current/90 text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-current/20 text-current hover:bg-current/10"
                >
                  Refresh Page
                </Button>
              </div>

              {/* Technical details (collapsible in development) */}
              {process.env.NODE_ENV === 'development' && error.details && (
                <details className="mt-4">
                  <summary className="text-xs text-current/60 cursor-pointer hover:text-current/80">
                    Technical Details (Dev Mode)
                  </summary>
                  <pre className="text-xs bg-current/5 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(error.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorDisplay; 