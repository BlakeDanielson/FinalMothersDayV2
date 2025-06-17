"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
    title: "Pasta Carbonara",
    category: "Italian"
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    title: "Fresh Garden Salad",
    category: "Healthy"
  },
  {
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    title: "Grilled Chicken",
    category: "Protein"
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78d8d590d?auto=format&fit=crop&w=800&q=80",
    title: "Chocolate Dessert",
    category: "Dessert"
  },
  {
    src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    title: "Fresh Seafood",
    category: "Seafood"
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    title: "Asian Stir Fry",
    category: "Asian"
  },
  {
    src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    title: "Breakfast Bowl",
    category: "Breakfast"
  }
];

export default function RecipePhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(nextSlide, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [nextSlide, isPlaying, isHovered]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-8 group">
      {/* Main carousel container */}
      <div 
        className="relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Image info overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="backdrop-blur-md bg-white/20 rounded-2xl px-4 py-3 border border-white/30">
                  <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 text-white p-3 rounded-full border border-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 text-white p-3 rounded-full border border-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 backdrop-blur-md bg-white/20 hover:bg-white/30 text-white p-2 rounded-full border border-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-indigo-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ 
            width: `${((currentIndex + 1) / photos.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
} 