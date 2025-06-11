"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImagePlus, Link, Settings, ChevronDown, ChevronUp, 
  Sparkles, Zap, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { type AIProvider } from '@/lib/config/ui-models';
import { getUIModelConfig } from '@/lib/config/ui-models';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";

interface SmartRecipeInputProps {
  isOpen: boolean;
  onClose: () => void;
  
  // URL handling (now with optimized strategy)
  onUrlSubmit: (url: string, geminiProvider: AIProvider, openaiProvider: AIProvider, forceStrategy?: 'url-direct' | 'html-fallback') => void;
  
  // Photo handling  
  onPhotosSubmit: (files: File[], provider: AIProvider) => void;
  
  // Loading states
  isLoading: boolean;
  loadingProgress: number;
  loadingStepMessage: string;
  
  // Error handling
  error: string | null;
}

type InputMode = 'idle' | 'url' | 'photo';

export function SmartRecipeInput({
  isOpen,
  onClose,
  onUrlSubmit,
  onPhotosSubmit,
  isLoading,
  loadingProgress,
  loadingStepMessage,
  error
}: SmartRecipeInputProps) {
  const [inputMode, setInputMode] = useState<InputMode>('idle');
  const [urlValue, setUrlValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedGeminiProvider, setSelectedGeminiProvider] = useState<AIProvider>('gemini-pro');
  const [selectedOpenaiProvider, setSelectedOpenaiProvider] = useState<AIProvider>('openai-main');
  const [forceStrategy, setForceStrategy] = useState<'url-direct' | 'html-fallback' | 'auto'>('auto');
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect input type and switch modes
  const handleUrlChange = useCallback((value: string) => {
    setUrlValue(value);
    if (value.length > 0) {
      setInputMode('url');
      setSelectedFiles([]); // Clear any selected files
    } else if (selectedFiles.length === 0) {
      setInputMode('idle');
    }
  }, [selectedFiles.length]);

  const handleFileSelection = useCallback((files: File[]) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic') || 
      file.name.toLowerCase().endsWith('.heif')
    );

    if (imageFiles.length === 0) {
      toast.error('Please select image files only.');
      return;
    }

    setSelectedFiles(imageFiles.slice(0, 3)); // Limit to 3 files for optimal results
    setInputMode('photo');
    setUrlValue(''); // Clear URL input
  }, []);

  // Drag and drop handlers
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isLoading) return;
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  }, [isLoading, handleFileSelection]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // File input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files));
    }
  };

  // Submit handlers
  const handleSubmit = () => {
    if (inputMode === 'url' && urlValue.trim()) {
      const strategy = forceStrategy === 'auto' ? undefined : forceStrategy;
      onUrlSubmit(urlValue.trim(), selectedGeminiProvider, selectedOpenaiProvider, strategy);
    } else if (inputMode === 'photo' && selectedFiles.length > 0) {
      // For photos, we'll use the primary provider (gemini for now, could add photo provider selection)
      onPhotosSubmit(selectedFiles, selectedGeminiProvider);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i: number) => i !== index);
    setSelectedFiles(newFiles);
    if (newFiles.length === 0 && !urlValue) {
      setInputMode('idle');
    }
  };

  const clearAll = () => {
    setUrlValue('');
    setSelectedFiles([]);
    setInputMode('idle');
  };

  const getSmartTips = () => {
    switch (inputMode) {
      case 'url':
        return [
          "✨ Works with most recipe websites",
          "🔗 Just paste any recipe URL",
        ];
      case 'photo':
        return [
          "📸 Best results with 1-3 clear photos",
          "🍳 Include ingredients and instructions",
        ];
      default:
        return [
          "🔗 Paste any recipe URL",
          "📸 Upload 1-3 photos for best results",
          "⚡ AI extracts all the details automatically",
        ];
    }
  };

  const canSubmit = (inputMode === 'url' && urlValue.trim()) || 
                   (inputMode === 'photo' && selectedFiles.length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Add Your Recipe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Input Area */}
          <div className="space-y-4">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Recipe URL
              </label>
              <Input
                type="url"
                placeholder="Paste recipe URL here..."
                value={urlValue}
                onChange={(e) => handleUrlChange(e.target.value)}
                disabled={isLoading}
                className="text-lg p-4"
                autoComplete="off"
              />
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Photo Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Recipe Photos
              </label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*,.heic,.heif"
                multiple
                className="hidden"
                disabled={isLoading}
              />

              <div
                onClick={() => !isLoading && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-muted-foreground/25 hover:border-primary hover:bg-muted/30",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-muted">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Drop photos here or click to select</p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG, HEIC • Up to 3 photos • Large PNGs auto-converted
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Selected Photos ({selectedFiles.length})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAll}
                      disabled={isLoading}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded border bg-muted flex items-center justify-center">
                          <span className="text-xs text-center p-1">
                            {file.name.length > 20 
                              ? `${file.name.substring(0, 20)}...` 
                              : file.name}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                          disabled={isLoading}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Smart Tips */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Smart Tips</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {getSmartTips().map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Advanced Options
              </span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border rounded-lg space-y-4">
                    {/* URL Strategy Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        URL Processing Strategy
                        <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          OPTIMIZED
                        </div>
                      </label>
                      <Select
                        value={forceStrategy}
                        onValueChange={(value: 'url-direct' | 'html-fallback' | 'auto') => setForceStrategy(value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="font-medium">Auto-Detect (Recommended)</div>
                                <div className="text-xs text-muted-foreground">Smart selection based on website</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="url-direct">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-green-500" />
                              <div>
                                <div className="font-medium">Ultra-Efficient URL-Direct</div>
                                <div className="text-xs text-muted-foreground">99%+ token reduction, instant processing</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="html-fallback">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-orange-500" />
                              <div>
                                <div className="font-medium">Traditional HTML Processing</div>
                                <div className="text-xs text-muted-foreground">Reliable fallback method</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Primary Gemini Model Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        Primary Model (Gemini URL-Direct)
                      </label>
                      <Select
                        value={selectedGeminiProvider}
                        onValueChange={(value: AIProvider) => setSelectedGeminiProvider(value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gemini-main">
                            <div className="flex items-center gap-2">
                              <Zap className={cn("h-4 w-4", getUIModelConfig('gemini-main').iconColor)} />
                              <div>
                                <div className="font-medium">{getUIModelConfig('gemini-main').name} ({getUIModelConfig('gemini-main').badge})</div>
                                <div className="text-xs text-muted-foreground">{getUIModelConfig('gemini-main').actualModel} - {getUIModelConfig('gemini-main').description}</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="gemini-pro">
                            <div className="flex items-center gap-2">
                              <Zap className={cn("h-4 w-4", getUIModelConfig('gemini-pro').iconColor)} />
                              <div>
                                <div className="font-medium">{getUIModelConfig('gemini-pro').name} ({getUIModelConfig('gemini-pro').badge})</div>
                                <div className="text-xs text-muted-foreground">{getUIModelConfig('gemini-pro').actualModel} - {getUIModelConfig('gemini-pro').description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fallback OpenAI Model Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Fallback Model (OpenAI HTML Processing)
                      </label>
                      <Select
                        value={selectedOpenaiProvider}
                        onValueChange={(value: AIProvider) => setSelectedOpenaiProvider(value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai-main">
                            <div className="flex items-center gap-2">
                              <Sparkles className={cn("h-4 w-4", getUIModelConfig('openai-main').iconColor)} />
                              <div>
                                <div className="font-medium">{getUIModelConfig('openai-main').name} ({getUIModelConfig('openai-main').badge})</div>
                                <div className="text-xs text-muted-foreground">{getUIModelConfig('openai-main').actualModel} - {getUIModelConfig('openai-main').description}</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="openai-mini">
                            <div className="flex items-center gap-2">
                              <Sparkles className={cn("h-4 w-4", getUIModelConfig('openai-mini').iconColor)} />
                              <div>
                                <div className="font-medium">{getUIModelConfig('openai-mini').name} ({getUIModelConfig('openai-mini').badge})</div>
                                <div className="text-xs text-muted-foreground">{getUIModelConfig('openai-mini').actualModel} - {getUIModelConfig('openai-mini').description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Optimization Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-green-800">Ultra-Efficient Processing</p>
                          <p className="text-xs text-green-700">
                            • Primary: Gemini processes URLs directly (99%+ token reduction)<br/>
                            • Fallback: OpenAI processes HTML if Gemini fails<br/>
                            • Auto-strategy: Smart selection based on website compatibility
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Display */}
          {error && !isLoading && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Loading Progress */}
          {isLoading && loadingStepMessage && (
            <RecipeLoadingProgress 
              progress={loadingProgress} 
              statusMessage={loadingStepMessage} 
            />
          )}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            size="lg"
            className="w-full text-lg"
          >
            {isLoading ? (
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
                <Sparkles className="h-5 w-5" />
                Extract Recipe
                {inputMode === 'url' && <Link className="h-4 w-4" />}
                {inputMode === 'photo' && <ImagePlus className="h-4 w-4" />}
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 