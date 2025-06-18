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
        "grid w-full gap-8",
        // Clean 3-column layout with consistent sizing
        "grid-cols-1",
        "md:grid-cols-2", 
        "lg:grid-cols-3",
        // Remove masonry flow for uniform layout
        className,
      )}
    >
      {children}
    </div>
  );
}; 