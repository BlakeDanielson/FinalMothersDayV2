"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";

interface ProcessingStepProps {
  isLoading: boolean;
  loadingProgress: number;
  loadingStepMessage: string;
}

export function ProcessingStep({
  isLoading,
  loadingProgress,
  loadingStepMessage
}: ProcessingStepProps) {
  if (!isLoading) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">🤖 Processing Your Recipe</h2>
        <p className="text-sm text-muted-foreground">Step 3/3</p>
      </div>

      {/* Main Loading Progress */}
      <div className="flex justify-center">
        <RecipeLoadingProgress 
          progress={loadingProgress} 
          statusMessage={loadingStepMessage}
          className="w-full max-w-md"
        />
      </div>

      {/* Processing Steps Visual */}
      <div className="space-y-4">
        <h3 className="text-center font-medium text-muted-foreground">Processing Steps</h3>
        
        <div className="space-y-3">
          {/* Step indicators */}
          <ProcessingStepIndicator 
            label="Analyzing content..."
            isComplete={loadingProgress > 20}
            isActive={loadingProgress <= 20 && loadingProgress > 0}
          />
          
          <ProcessingStepIndicator 
            label="Extracting ingredients..."
            isComplete={loadingProgress > 50}
            isActive={loadingProgress <= 50 && loadingProgress > 20}
          />
          
          <ProcessingStepIndicator 
            label="Finding cooking steps..."
            isComplete={loadingProgress > 75}
            isActive={loadingProgress <= 75 && loadingProgress > 50}
          />
          
          <ProcessingStepIndicator 
            label="Formatting recipe..."
            isComplete={loadingProgress > 90}
            isActive={loadingProgress <= 90 && loadingProgress > 75}
          />
        </div>
      </div>

      {/* Time Estimate */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          This usually takes 30-60 seconds
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Powered by AI • Processing in the cloud</span>
        </div>
      </div>

      {/* Strategy indicators */}
      {loadingStepMessage.includes('ultra-efficient') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mx-auto max-w-sm"
        >
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">
            Ultra-efficient processing active
          </span>
        </motion.div>
      )}

      {loadingStepMessage.includes('backup') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mx-auto max-w-sm"
        >
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-blue-700">
            Backup processing engaged
          </span>
        </motion.div>
      )}
    </div>
  );
}

interface ProcessingStepIndicatorProps {
  label: string;
  isComplete: boolean;
  isActive: boolean;
}

function ProcessingStepIndicator({ label, isComplete, isActive }: ProcessingStepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
        isComplete 
          ? 'bg-green-500 border-green-500 text-white' 
          : isActive 
            ? 'border-primary bg-primary/10' 
            : 'border-muted-foreground/30'
      }`}>
        {isComplete ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : isActive ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-3 w-3 border-2 border-primary border-t-transparent rounded-full"
          />
        ) : (
          <div className="h-2 w-2 bg-muted-foreground/30 rounded-full" />
        )}
      </div>
      
      <span className={`text-sm transition-colors ${
        isComplete 
          ? 'text-green-700 font-medium' 
          : isActive 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground'
      }`}>
        {isComplete ? '✅ ' : isActive ? '🔄 ' : ''}{label}
      </span>
    </div>
  );
} 