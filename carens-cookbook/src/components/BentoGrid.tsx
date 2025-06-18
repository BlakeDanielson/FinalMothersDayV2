"use client"; // Or remove if not strictly needed for this simple component, but good practice for consistency

import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-auto gap-6",
        // Enhanced responsive grid with variable sizing
        "grid-cols-1",
        "sm:grid-cols-2", 
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        // Add masonry-like flow
        "grid-flow-dense",
        className,
      )}
    >
      {children}
    </div>
  );
}; 