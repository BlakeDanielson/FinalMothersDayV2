import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanPhotoButtonProps {
  onFileSelect: (file: File) => void; // Changed to be required as it's core functionality
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  buttonText?: string; // Optional prop for button text
}

const ScanPhotoButton: React.FC<ScanPhotoButtonProps> = ({
  onFileSelect,
  className,
  variant = "secondary", // Defaulting to secondary for a less prominent look initially
  size = "lg",        // Defaulting to large for easier tapping on iPad
  buttonText = "Scan Recipe Photo", // Default button text
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { // onFileSelect is required, so we can call it directly
      onFileSelect(file);
    }
    // Reset the input value to allow selecting the same file again if needed
    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <div className={cn("flex justify-center", className)}> {/* Added flex justify-center to help with layout */} 
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden transition-all duration-300 hover:shadow-md",
          // Add specific styling for better touch target and appearance if needed
        )}
      >
        <Camera className="mr-2" size={20} strokeWidth={2} aria-hidden="true" />
        <span>{buttonText}</span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // Accepts all image types
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        id="recipeImageUpload" // Added an id for potential label association
      />
    </div>
  );
};

export default ScanPhotoButton; 