"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecipeData as ImportedRecipeData } from "@/components/RecipeDisplay"; // Assuming RecipeDisplay exports this
import { useSettings } from '@/contexts/SettingsContext'; // Import useSettings
import { AIProcessedIndicator } from "@/components/ui/AICapabilityBadge";

export interface RecipeCardProps extends ImportedRecipeData {
  tags?: string[];
  onDeleteAttempt?: (recipeId: string) => void;
  // onClick is implicitly part of the props when spread in CategoryPage,
  // but defining it here for clarity if this component were used more directly
  // with a specific onClick handler not just for navigation.
  // onClick: () => void; // Already in CategoryPage's RecipeCard usage as a direct prop
}

// Note: The original RecipeCard in CategoryPage had 'onClick' directly in its props list along with RecipeCardProps.
// Here, RecipeCardProps includes onDeleteAttempt. The main onClick for navigation is handled by the parent component
// wrapping this card or passed directly. The delete button has its own onClick.

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  tags,
  prepTime,
  cleanupTime,
  onDeleteAttempt,
  ...rest
}: RecipeCardProps & { onClick: () => void }) => {
  const { showImages } = useSettings();

  return (
    <Card
      onClick={rest.onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer",
        "bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg",
        showImages ? "h-[350px]" : "min-h-[170px]" // Conditional height, min-h allows for some content growth
      )}
    >
      {/* Delete button for when images are SHOWN (overlays image area) */}
      {showImages && id && onDeleteAttempt && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 bg-black/50 hover:bg-red-700/80 border-none backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteAttempt(id);
          }}
          aria-label="Delete recipe"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </Button>
      )}

      {/* Conditionally render the entire image container block */} 
      {showImages && (
        <div className="relative h-1/2 w-full overflow-hidden">
          {image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
        </div>
      )}

      {/* Text content */}
      <div 
        className={cn(
          "flex flex-col gap-2", 
          showImages ? "p-4" : "px-4 pt-3 pb-3 relative" // Adjusted padding for no-image state
        )}
      >
        {/* Delete button for when images are OFF (inside text content area) */}
        {!showImages && id && onDeleteAttempt && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-10 h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteAttempt(id);
              }}
              aria-label="Delete recipe"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
        )}

        <div className="flex flex-wrap items-center gap-1 mb-1">
          {tags && tags.length > 0 && (
            <>
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tag}
                </Badge>
              ))}
            </>
          )}
          <AIProcessedIndicator className="ml-auto" />
        </div>
        <h3 
          className={cn(
            "text-lg font-semibold text-foreground line-clamp-2",
            !showImages && id && onDeleteAttempt && "pr-10" // Keep padding for title if delete button is there
          )}
        >
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>

        {(prepTime || cleanupTime) && (
          <div className="flex justify-between mt-auto pt-2 text-xs text-muted-foreground border-t border-border/50">
            {prepTime && <span>Prep: {prepTime}</span>}
            {cleanupTime && <span>Cook: {cleanupTime}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}; 