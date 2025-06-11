"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, ImagePlus, Settings, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getUIModelConfig, type AIProvider } from '@/lib/config/ui-models';

interface PhotoConfigurationStepProps {
  onBack: () => void;
  onSingleFileSelect: (file: File, provider: AIProvider) => void;
  onMultipleFilesSelect: (files: File[], provider: AIProvider) => void;
  isLoading: boolean;
  maxFiles?: number;
}

export function PhotoConfigurationStep({
  onBack,
  onSingleFileSelect,
  onMultipleFilesSelect,
  isLoading,
  maxFiles = 5
}: PhotoConfigurationStepProps) {
  const [uploadMode, setUploadMode] = useState<'single' | 'multiple'>('multiple');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai-main');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  const currentModel = getUIModelConfig(selectedProvider);

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

    if (files.length === 0) return;

    if (uploadMode === 'single') {
      onSingleFileSelect(files[0], selectedProvider);
    } else {
      handleMultipleFileSelection(files);
    }
  };

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    onSingleFileSelect(file, selectedProvider);
    e.target.value = '';
  };

  const handleMultipleFileSelection = (newFiles: File[]) => {
    if (isLoading) return;

    const imageFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic') || 
      file.name.toLowerCase().endsWith('.heif')
    );

    if (imageFiles.length === 0) return;

    const combinedFiles = [...selectedFiles, ...imageFiles].slice(0, maxFiles);
    const newUrls = imageFiles.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(combinedFiles);
    setPreviewUrls(prev => [...prev, ...newUrls].slice(0, maxFiles));
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    handleMultipleFileSelection(files);
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
    if (selectedFiles.length === 0) return;
    onMultipleFilesSelect(selectedFiles, selectedProvider);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center flex-1">
          <h2 className="text-xl font-semibold">📷 Scan Photos</h2>
          <p className="text-sm text-muted-foreground">Step 2/3</p>
        </div>
        <div className="w-16" />
      </div>

      {/* Upload Mode Selection */}
      <div className="space-y-4">
        <h3 className="font-medium text-center">How many photos do you have?</h3>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setUploadMode('single')}
            className={cn(
              "flex-1 p-4 rounded-lg border-2 transition-all",
              uploadMode === 'single' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="text-center space-y-2">
              <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="font-medium">One photo</div>
              <div className="text-xs text-muted-foreground">Single recipe image</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setUploadMode('multiple')}
            className={cn(
              "flex-1 p-4 rounded-lg border-2 transition-all relative",
              uploadMode === 'multiple' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/30"
            )}
          >
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
              Recommended
            </Badge>
            <div className="text-center space-y-2">
              <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="font-medium">Multiple photos</div>
              <div className="text-xs text-muted-foreground">Up to {maxFiles} photos</div>
            </div>
          </button>
        </div>
      </div>

      {/* AI Engine Display */}
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
          Advanced Settings
        </Button>
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 border-t pt-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Processing Engine</label>
            <Select
              value={selectedProvider}
              onValueChange={(value: AIProvider) => setSelectedProvider(value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai-main">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Recommended
                    </Badge>
                    <span className="font-medium">{getUIModelConfig('openai-main').name}</span>
                  </div>
                </SelectItem>
                <SelectItem value="openai-mini">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      Fast
                    </Badge>
                    <span className="font-medium">{getUIModelConfig('openai-mini').name}</span>
                  </div>
                </SelectItem>
                <SelectItem value="gemini-main">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Alternative</Badge>
                    <span className="font-medium">{getUIModelConfig('gemini-main').name}</span>
                  </div>
                </SelectItem>
                <SelectItem value="gemini-pro">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      Premium
                    </Badge>
                    <span className="font-medium">{getUIModelConfig('gemini-pro').name}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-xs text-muted-foreground p-3 rounded-md bg-muted/50 border">
              <strong>{currentModel.name}:</strong> {currentModel.features.join(', ')}
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Area */}
      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          ref={uploadMode === 'single' ? fileInputRef : multipleFileInputRef}
          onChange={uploadMode === 'single' ? handleSingleFileChange : handleMultipleFileChange}
          multiple={uploadMode === 'multiple'}
          disabled={isLoading}
        />

        {uploadMode === 'single' ? (
          <div
            onClick={() => !isLoading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex h-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 bg-muted/30 hover:bg-muted/50",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="rounded-full bg-background p-3 shadow-sm">
              <Camera className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">📷 Drop photo here or click to select</p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPG, PNG, HEIC formats
              </p>
            </div>
          </div>
        ) : selectedFiles.length === 0 ? (
          <div
            onClick={() => !isLoading && multipleFileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex h-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 bg-muted/30 hover:bg-muted/50",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="rounded-full bg-background p-3 shadow-sm">
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">📷 Drop photos here or click to select</p>
              <p className="text-xs text-muted-foreground mt-1">
                Up to {maxFiles} photos of your recipe
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
                  previewUrls.forEach(url => URL.revokeObjectURL(url));
                  setPreviewUrls([]);
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
          </div>
        )}
      </div>

      {/* Continue Button */}
      <Button 
        onClick={uploadMode === 'single' 
          ? () => fileInputRef.current?.click() 
          : selectedFiles.length > 0 
            ? handleProcessMultipleFiles 
            : () => multipleFileInputRef.current?.click()
        }
        disabled={isLoading || (uploadMode === 'multiple' && selectedFiles.length === 0)}
        size="lg" 
        className="w-full h-12 text-lg"
      >
        <Camera className="mr-2 h-5 w-5" />
        {uploadMode === 'single' 
          ? 'Select Photo' 
          : selectedFiles.length > 0 
            ? `Process ${selectedFiles.length} ${selectedFiles.length === 1 ? 'Photo' : 'Photos'}`
            : 'Select Photos'
        }
      </Button>

      {/* Help Text */}
      <div className="text-center text-xs text-muted-foreground">
        💡 Tip: Multiple photos give better results - try different angles or pages
      </div>
    </div>
  );
} 