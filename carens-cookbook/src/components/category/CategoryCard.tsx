"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, 
  Coffee, 
  Cake, 
  Fish, 
  Leaf, 
  Pizza, 
  Soup,
  Cookie,
  Salad,
  Beef,
  IceCream
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  categoryName: string;
  itemCount: number;
  imageUrl?: string | null;
  onClick: () => void;
}

// Category icon mapping with colors
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('breakfast') || name.includes('morning')) {
    return { icon: Coffee, color: 'from-amber-500 to-orange-500' };
  } else if (name.includes('dessert') || name.includes('sweet') || name.includes('cake')) {
    return { icon: Cake, color: 'from-pink-500 to-purple-500' };
  } else if (name.includes('appetizer') || name.includes('snack')) {
    return { icon: Cookie, color: 'from-yellow-500 to-orange-500' };
  } else if (name.includes('salad') || name.includes('healthy')) {
    return { icon: Salad, color: 'from-green-500 to-emerald-500' };
  } else if (name.includes('soup') || name.includes('stew')) {
    return { icon: Soup, color: 'from-orange-500 to-red-500' };
  } else if (name.includes('meat') || name.includes('beef') || name.includes('protein')) {
    return { icon: Beef, color: 'from-red-500 to-red-600' };
  } else if (name.includes('fish') || name.includes('seafood')) {
    return { icon: Fish, color: 'from-blue-500 to-cyan-500' };
  } else if (name.includes('vegetarian') || name.includes('vegan')) {
    return { icon: Leaf, color: 'from-green-600 to-green-500' };
  } else if (name.includes('pizza') || name.includes('italian')) {
    return { icon: Pizza, color: 'from-red-500 to-yellow-500' };
  } else if (name.includes('ice cream') || name.includes('frozen')) {
    return { icon: IceCream, color: 'from-blue-400 to-purple-400' };
  } else {
    return { icon: ChefHat, color: 'from-gray-600 to-gray-500' };
  }
};

// Animated counter component
const AnimatedCounter = ({ value, isVisible }: { value: number; isVisible: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isVisible && value > 0) {
      const duration = 1000; // 1 second
      const steps = 20;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [value, isVisible]);

  return <span>{displayValue}</span>;
};

export function CategoryCard({
  categoryName,
  itemCount,
  imageUrl,
  onClick,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { icon: IconComponent, color: gradientColor } = getCategoryIcon(categoryName);

  return (
    <motion.div
      className="relative group block w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full overflow-hidden border border-white/30 bg-white/80 backdrop-blur-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 hover:bg-white/90">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradientColor} flex items-center justify-center relative overflow-hidden`}>
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: isHovered ? '100% 100%' : '0% 0%'
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                   radial-gradient(circle at 70% 80%, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              <motion.div
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <IconComponent className="h-20 w-20 text-white drop-shadow-lg" />
              </motion.div>
            </div>
          )}
          
          {/* Enhanced gradient overlay with animated opacity */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Recipe count badge with animated counter */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            <Badge 
              className={cn(
                "bg-white/95 text-gray-900 border-0 font-bold backdrop-blur-sm px-4 py-2 text-sm shadow-lg",
                "transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              <AnimatedCounter value={itemCount} isVisible={isVisible} /> {itemCount === 1 ? 'recipe' : 'recipes'}
            </Badge>
          </motion.div>
          
          {/* Category name overlay with enhanced typography and animations */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3 
              className="text-2xl font-bold text-white mb-3 transition-all duration-300 tracking-wide drop-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? -5 : 0, 
                opacity: 1,
                letterSpacing: isHovered ? "0.05em" : "0.025em"
              }}
              transition={{ duration: 0.3 }}
            >
              {categoryName}
            </motion.h3>
            
            {/* Animated progress bar */}
            <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white via-primary-foreground to-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "30%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
        
        {/* Enhanced progressive disclosure with glassmorphism */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="bg-white/95 backdrop-blur-lg border-t border-primary/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }}
            >
              <div className="p-6">
                <motion.p 
                  className="text-sm text-gray-700 font-medium leading-relaxed mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {itemCount === 0 
                    ? `No ${categoryName.toLowerCase()} recipes yet. Start building your collection!`
                    : `Discover ${itemCount} delicious ${categoryName.toLowerCase()} ${itemCount === 1 ? 'recipe' : 'recipes'} waiting for you`
                  }
                </motion.p>
                {itemCount > 0 && (
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="text-xs font-bold text-primary uppercase tracking-wider">
                      Click to explore →
                    </div>
                    <div className="flex gap-1">
                      {[...Array(Math.min(itemCount, 5))].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.3 + i * 0.1 }}
                        />
                      ))}
                      {itemCount > 5 && (
                        <motion.div
                          className="text-xs text-primary font-bold ml-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          +{itemCount - 5}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
} 