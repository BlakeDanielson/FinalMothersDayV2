"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  categoryName: string;
  itemCount: number;
  imageUrl?: string | null;
  onClick: () => void;
}

export function CategoryCard({
  categoryName,
  itemCount,
  imageUrl,
  onClick,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group block w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border border-border bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <HomeIcon className="h-20 w-20 text-primary/40" />
            </div>
          )}
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Recipe count badge with better prominence */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge 
              className={cn(
                "bg-white/95 text-gray-900 border-0 font-medium backdrop-blur-sm px-3 py-1 text-sm",
                "transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:font-semibold"
              )}
            >
              {itemCount} {itemCount === 1 ? 'recipe' : 'recipes'}
            </Badge>
          </motion.div>
          
          {/* Category name overlay with enhanced typography */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3 
              className="text-2xl font-medium text-white mb-2 transition-all duration-300 tracking-wide"
              initial={{ y: 10, opacity: 0.9 }}
              animate={{ 
                y: isHovered ? -8 : 0, 
                opacity: 1,
                letterSpacing: isHovered ? "0.025em" : "0"
              }}
              transition={{ duration: 0.3 }}
            >
              {categoryName}
            </motion.h3>
            <motion.div
              className="h-1 bg-primary rounded-full transition-all duration-500"
              initial={{ width: "24px" }}
              animate={{ width: isHovered ? "80px" : "24px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* Progressive disclosure - additional info that appears on hover */}
        <motion.div 
          className="bg-background border-t border-border/50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {itemCount === 0 
                ? `No ${categoryName.toLowerCase()} recipes yet. Start building your collection!`
                : `Explore ${itemCount} delicious ${categoryName.toLowerCase()} ${itemCount === 1 ? 'recipe' : 'recipes'}`
              }
            </p>
            {itemCount > 0 && (
              <motion.div 
                className="mt-3 flex items-center text-xs text-primary font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Click to explore →
              </motion.div>
            )}
          </div>
        </motion.div>
      </Card>
    </div>
  );
} 