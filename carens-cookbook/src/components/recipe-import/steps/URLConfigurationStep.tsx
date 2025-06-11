"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SearchIcon, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { getUIModelConfig, type AIProvider } from '@/lib/config/ui-models';

interface URLConfigurationStepProps {
  url: string;
  onUrlChange: (url: string) => void;
  urlProcessingMethod: AIProvider;
  onUrlProcessingMethodChange: (method: AIProvider) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  urlError: string | null;
  isLoading: boolean;
}

export function URLConfigurationStep({
  url,
  onUrlChange,
  urlProcessingMethod,
  onUrlProcessingMethodChange,
  onSubmit,
  onBack,
  urlError,
  isLoading
}: URLConfigurationStepProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const currentModel = getUIModelConfig(urlProcessingMethod);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center flex-1">
          <h2 className="text-xl font-semibold">🔗 Import from URL</h2>
          <p className="text-sm text-muted-foreground">Step 1/2</p>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* URL Input */}
        <div className="space-y-3">
          <div className="text-center">
            <h3 className="font-medium">📋 Paste your recipe URL below:</h3>
          </div>
          
          <Input
            type="url"
            placeholder="https://example.com/recipe"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            disabled={isLoading}
            className="text-lg p-4 h-14"
            autoFocus
          />
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
            Advanced Settings
          </Button>
        </div>

        {/* Advanced Settings - Collapsible */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 border-t pt-4"
            >
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                Processing Method
                <Info className="h-4 w-4 text-muted-foreground" />
              </label>
              <Select
                value={urlProcessingMethod}
                onValueChange={onUrlProcessingMethodChange}
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
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{getUIModelConfig('openai-main').name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getUIModelConfig('openai-main').actualModel}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="openai-mini">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Fast
                      </Badge>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{getUIModelConfig('openai-mini').name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getUIModelConfig('openai-mini').actualModel}
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
                  <SelectItem value="gemini-pro">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        Premium
                      </Badge>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{getUIModelConfig('gemini-pro').name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getUIModelConfig('gemini-pro').actualModel}
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

            {/* Tips Section */}
            <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-blue-900">💡 URL Import Tips:</p>
                  <ul className="space-y-0.5 text-blue-800 text-xs">
                    <li>• Works best with dedicated recipe websites</li>
                    <li>• Ensure the URL is publicly accessible</li>
                    <li>• Some sites may require additional processing time</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {urlError && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <p className="text-sm text-red-600">{urlError}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading || !url.trim()} 
          size="lg" 
          className="w-full h-12 text-lg"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
              Processing URL...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              Import Recipe
            </span>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="text-center text-xs text-muted-foreground">
        💡 Tip: Works with most recipe websites including AllRecipes, Food Network, BBC Good Food, and more
      </div>
    </div>
  );
} 