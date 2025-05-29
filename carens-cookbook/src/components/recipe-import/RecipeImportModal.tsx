"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link, Camera, SearchIcon } from "lucide-react";
import { AIProvider } from '@/lib/ai-providers';
import { RecipeProcessingError } from "@/lib/errors";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";
import { EnhancedPhotoUpload } from "./EnhancedPhotoUpload";

interface RecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'url' | 'photo';
  onTabChange: (tab: 'url' | 'photo') => void;
  
  // URL import props
  url: string;
  onUrlChange: (url: string) => void;
  urlProcessingMethod: 'openai' | 'gemini';
  onUrlProcessingMethodChange: (method: 'openai' | 'gemini') => void;
  onUrlSubmit: (e: React.FormEvent) => void;
  urlError: string | null;
  
  // Photo upload props
  onSingleFileSelect: (file: File, provider: AIProvider) => void;
  onMultipleFilesSelect: (files: File[], provider: AIProvider) => void;
  singleImageError: RecipeProcessingError | null;
  multipleImageError: RecipeProcessingError | null;
  onRetrySingleImage: () => void;
  onRetryMultipleImages: () => void;
  onDismissSingleError: () => void;
  onDismissMultipleError: () => void;
  
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  loadingStepMessage: string;
}

export function RecipeImportModal({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  url,
  onUrlChange,
  urlProcessingMethod,
  onUrlProcessingMethodChange,
  onUrlSubmit,
  urlError,
  onSingleFileSelect,
  onMultipleFilesSelect,
  singleImageError,
  multipleImageError,
  onRetrySingleImage,
  onRetryMultipleImages,
  onDismissSingleError,
  onDismissMultipleError,
  isLoading,
  loadingProgress,
  loadingStepMessage,
}: RecipeImportModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            Recipe Import
          </DialogTitle>
          <DialogDescription>
            Choose a method to import a new recipe
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'url' | 'photo')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="url" className="flex items-center gap-2 text-sm font-medium">
                <Link className="h-4 w-4" />
                Import from URL
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-2 text-sm font-medium">
                <Camera className="h-4 w-4" />
                Scan Photo
              </TabsTrigger>
            </TabsList>
            
            {/* URL Import Tab */}
            <TabsContent value="url" className="mt-6">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <SearchIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Import from URL</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste a recipe URL and we&apos;ll extract all the details
                  </p>
                </div>
                <form onSubmit={onUrlSubmit}>
                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="https://example.com/recipe"
                      value={url}
                      onChange={(e) => onUrlChange(e.target.value)}
                      disabled={isLoading}
                      className="text-lg p-6"
                    />
                    
                    {/* Processing Method Selector */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Processing Method
                      </label>
                      <Select
                        value={urlProcessingMethod}
                        onValueChange={onUrlProcessingMethodChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="text-lg p-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">GPT-4.1-mini (Primary)</span>
                              <span className="text-xs text-muted-foreground">Reliable and accurate recipe extraction</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="gemini">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">GPT-4o-mini (Alternative)</span>
                              <span className="text-xs text-muted-foreground">Fast processing with enhanced multimodal capabilities</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Info about selected method */}
                      <div className="text-xs text-muted-foreground p-3 rounded-md bg-muted/50 border">
                        {urlProcessingMethod === 'openai' ? (
                          <>🧠 <strong>GPT-4.1-mini (Primary):</strong> AI-powered recipe extraction with intelligent content parsing</>
                        ) : (
                          <>⚡ <strong>GPT-4o-mini (Alternative):</strong> Fast and efficient AI processing with enhanced understanding</>
                        )}
                      </div>
                    </div>
                    
                    <Button type="submit" disabled={isLoading} size="lg" className="text-lg px-6">
                      {isLoading && !loadingStepMessage.toLowerCase().includes('scan') ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <SearchIcon className="h-5 w-5" />
                          Import Recipe
                        </span>
                      )}
                    </Button>
                  </div>
                  {urlError && !isLoading && (
                    <p className="text-sm text-red-600 mt-2">{urlError}</p>
                  )}
                </form>
              </div>
            </TabsContent>
            
            {/* Photo Scan Tab - Enhanced with new component */}
            <TabsContent value="photo" className="mt-6">
              <EnhancedPhotoUpload
                onSingleFileSelect={onSingleFileSelect}
                onMultipleFilesSelect={onMultipleFilesSelect}
                isLoading={isLoading}
                singleImageError={singleImageError}
                multipleImageError={multipleImageError}
                onRetrySingleImage={onRetrySingleImage}
                onRetryMultipleImages={onRetryMultipleImages}
                onDismissSingleError={onDismissSingleError}
                onDismissMultipleError={onDismissMultipleError}
                maxFiles={5}
              />
            </TabsContent>
          </Tabs>

          {/* Loading Progress */}
          {isLoading && loadingStepMessage && (
            <div className="mt-6">
              <RecipeLoadingProgress 
                progress={loadingProgress} 
                statusMessage={loadingStepMessage} 
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 