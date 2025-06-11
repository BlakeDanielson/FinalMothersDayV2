"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Info, Sparkles, ArrowLeft, Settings } from "lucide-react";
import { type AIProvider } from '@/lib/config/ui-models';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUIModelConfig } from '@/lib/config/ui-models';

interface SinglePhotoConfigurationStepProps {
  onBack: () => void;
  onFileSelect: (file: File, provider: AIProvider) => void;
  isLoading: boolean;
}

export function SinglePhotoConfigurationStep({
  onBack,
  onFileSelect,
  isLoading
}: SinglePhotoConfigurationStepProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('openai-main');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentModel = getUIModelConfig(provider);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, [handleFileSelect]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (selectedFile) {
      onFileSelect(selectedFile, provider);
    }
  }, [selectedFile, provider, onFileSelect]);

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center flex-1">
          <h2 className="text-xl font-semibold">📷 Scan Recipe Picture</h2>
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
                ? 'border-emerald-500 bg-emerald-50/50'
                : selectedFile
                ? 'border-emerald-500 bg-emerald-50/20'
                : 'border-muted hover:border-emerald-400 hover:bg-emerald-50/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            
            <div className="p-4 text-center">
              {selectedFile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-2"
                >
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Ready to scan
                  </Badge>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Drop photo here or click to browse
                    </p>
                    <div className="text-sm text-muted-foreground">
                      JPG, PNG, WebP, HEIC formats
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

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
                  <p className="font-medium text-blue-900">💡 Tips for best results:</p>
                  <ul className="space-y-0.5 text-blue-800 text-xs">
                    <li>• Ensure recipe text is clearly visible</li>
                    <li>• Use good lighting to avoid shadows</li>
                    <li>• Keep image straight and in focus</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          size="lg"
          className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700"
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
              Scan Recipe
            </span>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center text-xs text-muted-foreground">
        📱 Tip: Works best with clear, well-lit photos of recipe cards, cookbook pages, or handwritten recipes
      </div>
    </div>
  );
} 