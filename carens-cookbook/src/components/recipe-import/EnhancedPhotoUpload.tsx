"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, ImagePlus, Info, AlertCircle, CheckCircle2, 
  Trash2, Plus, FileImage
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { RecipeProcessingError } from "@/lib/errors";
import { getUIModelConfig, type AIProvider } from '@/lib/config/ui-models';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

interface EnhancedPhotoUploadProps {
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

export function EnhancedPhotoUpload({
  onSingleFileSelect,
  onMultipleFilesSelect,
  isLoading,
  singleImageError,
  multipleImageError,
  onRetrySingleImage,
  onRetryMultipleImages,
  onDismissSingleError,
  onDismissMultipleError,
  maxFiles = 5
}: EnhancedPhotoUploadProps) {
  const [uploadMode, setUploadMode] = useState<'single' | 'multiple'>('single');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai-main');
  const [isDragging, setIsDragging] = useState(false);
  
  // For multiple file upload
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  // Clear selected files when changing modes
  useEffect(() => {
    setSelectedFiles([]);
    setPreviewUrls(prev => {
      // Revoke any existing object URLs to prevent memory leaks
      prev.forEach(url => URL.revokeObjectURL(url));
      return [];
    });
  }, [uploadMode]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isLoading) return;

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic') || 
      file.name.toLowerCase().endsWith('.heif')
    );

    if (files.length === 0) {
      toast.error('Please drop image files only.');
      return;
    }

    if (uploadMode === 'single') {
      onSingleFileSelect(files[0], selectedProvider);
    } else {
      // For multiple mode, add to existing selection up to maxFiles
      handleMultipleFileSelection(files);
    }
  };

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    onSingleFileSelect(file, selectedProvider);
    
    // Reset the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const handleMultipleFileSelection = (newFiles: File[]) => {
    if (isLoading) return;

    // Filter out non-image files
    const imageFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic') || 
      file.name.toLowerCase().endsWith('.heif')
    );

    if (imageFiles.length === 0) {
      toast.error('Please select image files only.');
      return;
    }

    // Limit total files to maxFiles
    const combinedFiles = [...selectedFiles, ...imageFiles].slice(0, maxFiles);
    
    // Create preview URLs for new files
    const newUrls = imageFiles.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(combinedFiles);
    setPreviewUrls(prev => {
      // Keep only the URLs for files that are still selected
      const updatedUrls = [...prev];
      newUrls.forEach(url => updatedUrls.push(url));
      return updatedUrls.slice(0, maxFiles);
    });

    // Show warning if some files were ignored due to maxFiles limit
    if (selectedFiles.length + imageFiles.length > maxFiles) {
      toast.warning(`Only ${maxFiles} images can be uploaded at once. Some files were not added.`);
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    handleMultipleFileSelection(files);
    
    // Reset the input value so the same files can be selected again
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });

    setPreviewUrls(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index]);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleProcessMultipleFiles = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image file.');
      return;
    }

    onMultipleFilesSelect(selectedFiles, selectedProvider);
  };

  const getProviderDescription = (provider: AIProvider) => {
    const config = getUIModelConfig(provider);
    const iconColor = provider.startsWith('openai') ? 'text-green-500' : 
                     provider.startsWith('gemini') ? 'text-blue-500' : 'text-gray-500';
    const IconComponent = provider.startsWith('openai') ? CheckCircle2 : AlertCircle;
    
    return {
      name: `${config.name} (${config.actualModel})`,
      description: config.description,
      maxFileSize: '25MB',
      icon: <IconComponent className={cn("h-4 w-4", iconColor)} />
    };
  };

  const currentProvider = getProviderDescription(selectedProvider);

  return (
    <div className="space-y-6">
      {/* Mode Selection - Simplified without RadioGroup */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div 
            className={cn(
              "flex-1 relative rounded-lg border-2 p-4 cursor-pointer transition-all",
              uploadMode === 'single' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30 hover:bg-muted/30"
            )}
            onClick={() => setUploadMode('single')}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                uploadMode === 'single' ? "bg-primary" : "bg-muted"
              )}>
                <FileImage className={cn(
                  "h-6 w-6",
                  uploadMode === 'single' ? "text-primary-foreground" : "text-muted-foreground"
                )} />
              </div>
              <span className="font-medium text-base">Single Photo</span>
              <p className="text-xs text-muted-foreground text-center">
                Upload one photo of your recipe
              </p>
            </div>
          </div>

          <div 
            className={cn(
              "flex-1 relative rounded-lg border-2 p-4 cursor-pointer transition-all",
              uploadMode === 'multiple' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30 hover:bg-muted/30"
            )}
            onClick={() => setUploadMode('multiple')}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                uploadMode === 'multiple' ? "bg-primary" : "bg-muted"
              )}>
                <ImagePlus className={cn(
                  "h-6 w-6",
                  uploadMode === 'multiple' ? "text-primary-foreground" : "text-muted-foreground"
                )} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-base">Multiple Photos</span>
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Upload up to {maxFiles} photos of your recipe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">AI Processing Engine</span>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </div>
        <Select
          value={selectedProvider}
          onValueChange={(value: AIProvider) => setSelectedProvider(value)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai-main">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{getUIModelConfig('openai-main').name} ({getUIModelConfig('openai-main').actualModel})</span>
                  <span className="text-xs text-muted-foreground">{getUIModelConfig('openai-main').description}</span>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="openai-mini">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{getUIModelConfig('openai-mini').name} ({getUIModelConfig('openai-mini').actualModel})</span>
                  <span className="text-xs text-muted-foreground">{getUIModelConfig('openai-mini').description}</span>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="gemini-main">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{getUIModelConfig('gemini-main').name} ({getUIModelConfig('gemini-main').actualModel})</span>
                  <span className="text-xs text-muted-foreground">{getUIModelConfig('gemini-main').description}</span>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="gemini-pro">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{getUIModelConfig('gemini-pro').name} ({getUIModelConfig('gemini-pro').actualModel})</span>
                  <span className="text-xs text-muted-foreground">{getUIModelConfig('gemini-pro').description}</span>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        
        {/* Provider Info */}
        <div className="text-xs flex items-center gap-2 p-2 rounded-md bg-muted/50 border">
          {currentProvider.icon}
          <span>
            <strong>{currentProvider.name}:</strong> {currentProvider.description}. 
            Max file size: {currentProvider.maxFileSize}
          </span>
        </div>
      </div>

      {/* Error Displays */}
      {singleImageError && uploadMode === 'single' && (
        <ErrorDisplay 
          error={singleImageError}
          onRetry={onRetrySingleImage}
          onDismiss={onDismissSingleError}
          compact={true}
        />
      )}

      {multipleImageError && uploadMode === 'multiple' && (
        <ErrorDisplay 
          error={multipleImageError}
          onRetry={onRetryMultipleImages}
          onDismiss={onDismissMultipleError}
          compact={true}
        />
      )}

      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {uploadMode === 'single' ? (
          <motion.div
            key="single-upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              type="file"
              accept="image/*,.heic,.heif"
              className="hidden"
              ref={fileInputRef}
              onChange={handleSingleFileChange}
              disabled={isLoading}
            />
            
            <div
              onClick={() => !isLoading && fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "flex h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors",
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 bg-muted/30 hover:bg-muted/50",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="rounded-full bg-background p-3 shadow-sm">
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-medium">Click to select a photo</p>
                <p className="text-xs text-muted-foreground mt-1">
                  or drag and drop an image here
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports JPG, PNG (50MB), HEIC (25MB) formats • Large files auto-converted to JPEG
                </p>
              </div>
            </div>

            <Button 
              className="w-full mt-4"
              disabled={isLoading}
              onClick={() => !isLoading && fileInputRef.current?.click()}
            >
              <Camera className="mr-2 h-4 w-4" />
              Select Photo
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="multiple-upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Input
              type="file"
              accept="image/*,.heic,.heif"
              className="hidden"
              ref={multipleFileInputRef}
              onChange={handleMultipleFileChange}
              multiple
              disabled={isLoading}
            />
            
            {selectedFiles.length === 0 ? (
              <div
                onClick={() => !isLoading && multipleFileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "flex h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors",
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-muted-foreground/25 bg-muted/30 hover:bg-muted/50",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="rounded-full bg-background p-3 shadow-sm">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium">Click to select multiple photos</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    or drag and drop images here
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload up to {maxFiles} photos of your recipe
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Selected Photos ({selectedFiles.length}/{maxFiles})</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedFiles([]);
                      setPreviewUrls(prev => {
                        prev.forEach(url => URL.revokeObjectURL(url));
                        return [];
                      });
                    }}
                    disabled={isLoading}
                    className="h-8 px-2 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group aspect-square">
                      <div className="h-full w-full rounded-md border overflow-hidden bg-muted">
                        {previewUrls[index] && (
                          <div 
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${previewUrls[index]})` }}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleRemoveFile(index)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-1 text-xs truncate text-muted-foreground">
                        {file.name}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add more button */}
                  {selectedFiles.length < maxFiles && (
                    <div 
                      className="border border-dashed rounded-md flex items-center justify-center aspect-square cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => !isLoading && multipleFileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center text-muted-foreground">
                        <Plus className="h-6 w-6" />
                        <span className="text-xs mt-1">Add Photo</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4"
                  disabled={isLoading || selectedFiles.length === 0}
                  onClick={handleProcessMultipleFiles}
                  variant="default"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Process {selectedFiles.length} {selectedFiles.length === 1 ? 'Photo' : 'Photos'}
                </Button>
              </div>
            )}
            
            {selectedFiles.length === 0 && (
              <Button 
                className="w-full"
                disabled={isLoading}
                onClick={() => !isLoading && multipleFileInputRef.current?.click()}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Select Multiple Photos
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 