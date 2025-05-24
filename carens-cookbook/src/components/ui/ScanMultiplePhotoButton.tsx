import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, X, Plus, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ScanMultiplePhotoButtonProps {
  onFilesSelect: (files: File[]) => void;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  buttonText?: string;
  disabled?: boolean;
  maxFiles?: number;
}

const ScanMultiplePhotoButton: React.FC<ScanMultiplePhotoButtonProps> = ({
  onFilesSelect,
  className,
  variant = "secondary",
  size = "lg",
  buttonText = "Scan Multiple Recipe Photos",
  disabled = false,
  maxFiles = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    
    if (newFiles.length === 0) return;

    // Combine existing files with new files, respecting maxFiles limit
    const combinedFiles = [...selectedFiles, ...newFiles];
    const limitedFiles = combinedFiles.slice(0, maxFiles);
    
    // Create preview URLs for new files only
    const newUrls = newFiles.slice(0, maxFiles - selectedFiles.length).map(file => URL.createObjectURL(file));
    
    // Combine existing URLs with new URLs
    const combinedUrls = [...previewUrls, ...newUrls];
    const limitedUrls = combinedUrls.slice(0, maxFiles);
    
    // Clean up any excess URLs if we exceeded maxFiles
    if (combinedUrls.length > maxFiles) {
      combinedUrls.slice(maxFiles).forEach(url => URL.revokeObjectURL(url));
    }
    
    setSelectedFiles(limitedFiles);
    setPreviewUrls(limitedUrls);
    
    // Reset the input value to allow selecting the same files again if needed
    if (e.target) {
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Clean up the removed URL
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const processImages = () => {
    if (selectedFiles.length > 0 && !disabled) {
      onFilesSelect(selectedFiles);
      // Clean up preview URLs after processing
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  };

  const addMoreFiles = () => {
    if (selectedFiles.length < maxFiles) {
      fileInputRef.current?.click();
    }
  };

  // Clean up URLs when component unmounts
  React.useEffect(() => {
    const currentUrls = previewUrls;
    return () => {
      currentUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Main Button or Add More Button */}
      {selectedFiles.length === 0 ? (
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "relative overflow-hidden transition-all duration-300 hover:shadow-md",
          )}
        >
          <Camera className="mr-2" size={20} strokeWidth={2} aria-hidden="true" />
          <span>{buttonText}</span>
        </Button>
      ) : (
        <div className="flex gap-2">
          {selectedFiles.length < maxFiles && (
            <Button
              variant="outline"
              size="sm"
              onClick={addMoreFiles}
              disabled={disabled}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add {maxFiles - selectedFiles.length} More ({selectedFiles.length}/{maxFiles})
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={processImages}
            disabled={disabled || selectedFiles.length === 0}
            className="flex items-center gap-1"
          >
            <Camera size={16} />
            Process {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
          </Button>
        </div>
      )}

      {/* Preview Grid */}
      {selectedFiles.length > 0 && (
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Selected Images ({selectedFiles.length}/{maxFiles})
            </h4>
            {selectedFiles.length >= maxFiles && (
              <Badge variant="secondary" className="text-xs">
                Maximum reached
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative group bg-muted rounded-lg overflow-hidden aspect-square"
              >
                {/* Image Preview */}
                <Image
                  src={previewUrls[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                
                {/* Overlay with file info and remove button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(index)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <FileImage size={12} />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <div className="text-white/70 text-xs">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground text-center">
            Tip: Select photos showing different parts of your recipe (ingredients, steps, etc.)
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        id="multipleRecipeImageUpload"
        disabled={disabled}
      />
    </div>
  );
};

export default ScanMultiplePhotoButton; 