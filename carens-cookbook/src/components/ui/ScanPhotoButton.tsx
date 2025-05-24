import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Zap, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIProvider, AI_PROVIDERS } from "@/lib/ai-providers";

interface ScanPhotoButtonProps {
  onFileSelect: (file: File, provider: AIProvider) => void; // Updated to include provider
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  buttonText?: string; // Optional prop for button text
  disabled?: boolean; // Added disabled prop
  defaultProvider?: AIProvider; // Allow setting default provider
}

const ScanPhotoButton: React.FC<ScanPhotoButtonProps> = ({
  onFileSelect,
  className,
  variant = "secondary", // Defaulting to secondary for a less prominent look initially
  size = "lg",        // Defaulting to large for easier tapping on iPad
  buttonText = "Scan Recipe Photo", // Default button text
  disabled = false, // Default to enabled
  defaultProvider = "openai", // Default to OpenAI
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(defaultProvider);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !disabled) {
      onFileSelect(file, selectedProvider);
    }
    // Reset the input value to allow selecting the same file again if needed
    if (e.target) {
      e.target.value = "";
    }
  };

  const getProviderIcon = (provider: AIProvider) => {
    return provider === 'openai' ? Brain : Zap;
  };

  const getProviderInfo = (provider: AIProvider) => {
    const config = AI_PROVIDERS[provider];
    const maxSizeMB = Math.round(config.maxFileSize / (1024 * 1024));
    const formats = config.supportedFormats.map(fmt => fmt.replace('image/', '')).join(', ').toUpperCase();
    return { ...config, maxSizeMB, formats };
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* AI Provider Selection */}
      <div className="space-y-2">
        <label htmlFor="ai-provider" className="text-sm font-medium text-gray-700">
          Choose AI Provider
        </label>
        <Select value={selectedProvider} onValueChange={(value) => setSelectedProvider(value as AIProvider)}>
          <SelectTrigger id="ai-provider" className="w-full">
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AI_PROVIDERS).map(([key, config]) => {
              const provider = key as AIProvider;
              const Icon = getProviderIcon(provider);
              const info = getProviderInfo(provider);
              return (
                <SelectItem key={provider} value={provider}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{config.name}</span>
                      <span className="text-xs text-gray-500">
                        Max {info.maxSizeMB}MB • {info.formats}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        {/* Provider Description */}
        <p className="text-xs text-gray-600">
          {AI_PROVIDERS[selectedProvider].description}
        </p>
      </div>

      {/* Scan Button */}
      <div className="flex justify-center">
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
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // Accepts all image types
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        id="recipeImageUpload" // Added an id for potential label association
        disabled={disabled}
      />
    </div>
  );
};

export default ScanPhotoButton; 