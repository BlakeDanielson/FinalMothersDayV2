import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { Button } from '@/components/ui/button';

interface CategoryItem {
  name: string;
  count: number;
  imageUrl?: string | null;
}

interface CategoryCarouselProps {
  title: string;
  subtitle?: string;
  categories: CategoryItem[];
  onCategoryClick: (categoryName: string) => void;
  className?: string;
}

export function CategoryCarousel({
  title,
  subtitle,
  categories,
  onCategoryClick,
  className = ""
}: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check scroll position and update button states
  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollButtons();
    };

    container.addEventListener('scroll', handleScroll);
    // Initial check
    updateScrollButtons();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [categories]);

  // Scroll functions
  const scrollLeft = () => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const cardWidth = 320; // Approximate card width + gap
    const scrollAmount = cardWidth * 2; // Scroll by 2 cards
    
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => setIsScrolling(false), 300);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const cardWidth = 320; // Approximate card width + gap
    const scrollAmount = cardWidth * 2; // Scroll by 2 cards
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => setIsScrolling(false), 300);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground font-light">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollLeft}
            disabled={!canScrollLeft || isScrolling}
            className="h-10 w-10 p-0 rounded-full border-primary/20 hover:border-primary/40 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollRight}
            disabled={!canScrollRight || isScrolling}
            className="h-10 w-10 p-0 rounded-full border-primary/20 hover:border-primary/40 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient fade effects */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
            />
          )}
          {canScrollRight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex-none w-72 h-80"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CategoryCard
                categoryName={category.name}
                itemCount={category.count}
                imageUrl={category.imageUrl}
                onClick={() => onCategoryClick(category.name)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator Dots */}
      {categories.length > 4 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-6 bg-muted rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: index === 0 ? "100%" : "30%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
} 