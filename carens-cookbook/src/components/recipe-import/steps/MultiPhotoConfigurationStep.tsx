"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Info, Sparkles, FileImage, ArrowLeft, Settings } from "lucide-react";
import { type AIProvider } from '@/lib/config/ui-models';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUIModelConfig } from '@/lib/config/ui-models';

interface MultiPhotoConfigurationStepProps {
  onBack: () => void;
  onFilesSelect: (files: File[], provider: AIProvider) => void;
  isLoading: boolean;
  maxFiles?: number;
}

export function MultiPhotoConfigurationStep({
  onBack,
  onFilesSelect,
  isLoading,
  maxFiles = 5
}: MultiPhotoConfigurationStepProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('openai-main');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentModel = getUIModelConfig(provider);

  // Handle file selection
  const handleFileSelect = useCallback((newFiles: FileList) => {
    const validFiles = Array.from(newFiles).filter(file => 
      file.type.startsWith('image/') && selectedFiles.length + Array.from(newFiles).length <= maxFiles
    );
    
    setSelectedFiles(prev => {
      const combined = [...prev, ...validFiles];
      return combined.slice(0, maxFiles);
    });
  }, [selectedFiles.length, maxFiles]);

  // Remove file
  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  }, [handleFileSelect]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles, provider);
    }
  }, [selectedFiles, provider, onFilesSelect]);

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center flex-1">
          <h2 className="text-xl font-semibold">📸 Scan Multi-Picture Recipe</h2>
          <p className="text-sm text-muted-foreground">Step 1/2</p>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Upload Area */}
        <div className="space-y-3">
          <Card
            className={`relative border-2 border-dashed transition-all duration-300 cursor-pointer ${
              dragActive
                ? 'border-purple-500 bg-purple-50/50'
                : selectedFiles.length > 0
                ? 'border-purple-500 bg-purple-50/20'
                : 'border-muted hover:border-purple-400 hover:bg-purple-50/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading || selectedFiles.length >= maxFiles}
            />
            
            <div className="p-4 text-center">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Drop multiple photos here or click to browse
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{selectedFiles.length} / {maxFiles} photos selected</span>
                    <Badge variant="outline" className="text-xs">
                      JPG, PNG, WebP, HEIC
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Selected Files List */}
        <AnimatePresence>
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-4">
                <h3 className="font-medium text-foreground mb-3">Selected Photos</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <motion.div
                      key={file.name + index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileImage className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smart AI Engine Display */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              🧠
            </div>
            <div>
              <p className="font-medium text-sm">
                AI Engine: {currentModel.name} ({currentModel.actualModel})
              </p>
              <p className="text-xs text-muted-foreground">
                {currentModel.description}
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings className="h-4 w-4" />
            Advanced
          </Button>
        </div>

        {/* Advanced Settings - Collapsible */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 border-t pt-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                AI Provider
                <Info className="h-4 w-4 text-muted-foreground" />
              </label>
              <Select value={provider} onValueChange={(value: AIProvider) => setProvider(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai-main">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        Recommended
                      </Badge>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{getUIModelConfig('openai-main').name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getUIModelConfig('openai-main').actualModel}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="gemini-main">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Alternative
                      </Badge>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{getUIModelConfig('gemini-main').name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getUIModelConfig('gemini-main').actualModel}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Model Features */}
              <div className="text-xs text-muted-foreground p-3 rounded-md bg-muted/50 border">
                <div className="flex items-center gap-2">
                  {currentModel.badge === 'Recommended' ? '🧠' : 
                   currentModel.badge === 'Fast' ? '⚡' : 
                   currentModel.badge === 'Premium' ? '💎' : '💰'} 
                  <span>
                    <strong>{currentModel.name}:</strong> {currentModel.features.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips - Collapsible */}
            <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-blue-900">💡 Best practices for multi-photo recipes:</p>
                  <ul className="space-y-0.5 text-blue-800 text-xs">
                    <li>• Upload photos in the order they should be read</li>
                    <li>• Include all recipe parts (ingredients, instructions, notes)</li>
                    <li>• Ensure each photo is clear and well-lit</li>
                    <li>• Avoid duplicate or overlapping content</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={selectedFiles.length === 0 || isLoading}
          size="lg"
          className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Scan {selectedFiles.length} Photos
            </span>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center text-xs text-muted-foreground">
        📸 Tip: Great for cookbook recipes spanning multiple pages or handwritten recipes on separate cards
      </div>
    </div>
  );
} 