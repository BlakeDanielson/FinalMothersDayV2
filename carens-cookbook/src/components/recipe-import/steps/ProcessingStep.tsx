"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
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