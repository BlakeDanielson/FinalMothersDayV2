"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchIcon, Camera, Images, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AICapabilityBadge } from "@/components/ui/AICapabilityBadge";

interface QuickActionsSectionProps {
  onImportURL: () => void;
  onScanSinglePhoto: () => void;
  onScanMultiPhoto: () => void;
}

export function QuickActionsSection({
  onImportURL,
  onScanSinglePhoto,
  onScanMultiPhoto,
}: QuickActionsSectionProps) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-medium text-foreground">AI-Powered Recipe Import</h2>
        </div>
        <p className="text-muted-foreground font-light mb-4">Advanced AI technology extracts recipes from any source</p>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2">
            <AICapabilityBadge capability="vision" variant="minimal" />
            <AICapabilityBadge capability="web-scraping" variant="minimal" />
            <AICapabilityBadge capability="extraction" variant="minimal" />
            <AICapabilityBadge capability="enhancement" variant="minimal" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" data-tour="recipe-pathways">
        <Card 
          className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary hover:bg-primary/5"
          onClick={onImportURL}
          data-tour="add-recipe-button"
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <SearchIcon className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-primary">Import from URL</h3>
            <p className="text-muted-foreground text-base font-light">AI scrapes and extracts recipes from any website</p>
            <div className="mt-3">
              <AICapabilityBadge capability="web-scraping" variant="detailed" />
            </div>
          </div>
        </Card>
        
        <Card 
          className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-emerald-500 hover:bg-emerald-50/50"
          onClick={onScanSinglePhoto}
          data-tour="scan-recipe-button"
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-emerald-700">Scan Recipe Picture</h3>
            <p className="text-muted-foreground text-base font-light">AI vision reads text from photos, even handwritten recipes</p>
            <div className="mt-3">
              <AICapabilityBadge capability="vision" variant="detailed" />
            </div>
          </div>
        </Card>
        
        <Card 
          className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-purple-500 hover:bg-purple-50/50"
          onClick={onScanMultiPhoto}
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Images className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-purple-700">Scan Multi-Picture Recipe</h3>
            <p className="text-muted-foreground text-base font-light">AI combines multiple photos into one complete recipe</p>
            <div className="mt-3">
              <AICapabilityBadge capability="enhancement" variant="detailed" />
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
} 