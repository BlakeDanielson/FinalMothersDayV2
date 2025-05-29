"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchIcon, Camera, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickActionsSectionProps {
  onImportURL: () => void;
  onScanPhoto: () => void;
  onShowStats: () => void;
}

export function QuickActionsSection({
  onImportURL,
  onScanPhoto,
  onShowStats,
}: QuickActionsSectionProps) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium text-foreground mb-2">Quick Actions</h2>
        <p className="text-muted-foreground font-light">Start your cooking journey</p>
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
            <p className="text-muted-foreground text-base font-light">Paste any recipe link to import</p>
          </div>
        </Card>
        
        <Card 
          className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-emerald-500 hover:bg-emerald-50/50"
          onClick={onScanPhoto}
          data-tour="scan-recipe-button"
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-emerald-700">Scan Recipe</h3>
            <p className="text-muted-foreground text-base font-light">Upload a photo to extract recipe</p>
          </div>
        </Card>
        
        <Card 
          className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-purple-500 hover:bg-purple-50/50"
          onClick={onShowStats}
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-purple-700">Collection Stats</h3>
            <p className="text-muted-foreground text-base font-light">View insights about your recipes</p>
          </div>
        </Card>
      </div>
    </motion.section>
  );
} 