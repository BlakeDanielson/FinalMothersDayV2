import { AIProvider } from '@/lib/config/ui-models';
import { RecipeProcessingError } from '@/lib/errors';

export interface EnhancedPhotoUploadProps {
  onSingleFileSelect: (file: File, provider: AIProvider) => void;
  onMultipleFilesSelect: (files: File[], provider: AIProvider) => void;
  isLoading: boolean;
  singleImageError: RecipeProcessingError | null;
  multipleImageError: RecipeProcessingError | null;
  onRetrySingleImage: () => void;
  onRetryMultipleImages: () => void;
  onDismissSingleError: () => void;
  onDismissMultipleError: () => void;
  maxFiles?: number;
} 