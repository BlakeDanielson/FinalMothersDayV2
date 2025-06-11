"use client";

import React, { useState, useEffect } from "react";
import { type AIProvider } from '@/lib/config/ui-models';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { URLConfigurationStep } from "./steps/URLConfigurationStep";
import { SinglePhotoConfigurationStep } from "./steps/SinglePhotoConfigurationStep";
import { MultiPhotoConfigurationStep } from "./steps/MultiPhotoConfigurationStep";
import { ProcessingStep } from "./steps/ProcessingStep";

type WizardStep = 'url-config' | 'single-photo-config' | 'multi-photo-config' | 'processing';

interface RecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'url' | 'single-photo' | 'multi-photo';
  
  // URL import props
  url: string;
  onUrlChange: (url: string) => void;
  urlProcessingMethod: AIProvider;
  onUrlProcessingMethodChange: (method: AIProvider) => void;
  onUrlSubmit: (e: React.FormEvent) => void;
  urlError: string | null;
  
  // Photo upload props
  onSingleFileSelect: (file: File, provider: AIProvider) => void;
  onMultipleFilesSelect: (files: File[], provider: AIProvider) => void;
  
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  loadingStepMessage: string;
}

export function RecipeImportModal({
  isOpen,
  onClose,
  activeTab,
  url,
  onUrlChange,
  urlProcessingMethod,
  onUrlProcessingMethodChange,
  onUrlSubmit,
  urlError,
  onSingleFileSelect,
  onMultipleFilesSelect,
  isLoading,
  loadingProgress,
  loadingStepMessage,
}: RecipeImportModalProps) {
  // Helper function to map activeTab to WizardStep
  const getInitialStep = (tab: 'url' | 'single-photo' | 'multi-photo'): WizardStep => {
    switch (tab) {
      case 'url': return 'url-config';
      case 'single-photo': return 'single-photo-config';
      case 'multi-photo': return 'multi-photo-config';
    }
  };

  // Start directly at the appropriate configuration step based on activeTab
  const [currentStep, setCurrentStep] = useState<WizardStep>(getInitialStep(activeTab));
  
  // Reset to appropriate step when modal opens or tab changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(getInitialStep(activeTab));
    }
  }, [isOpen, activeTab]);
  
  // Determine modal size based on step
  const getModalSize = () => {
    switch (currentStep) {
      case 'url-config':
      case 'single-photo-config':
      case 'multi-photo-config':
        return "max-w-2xl";
      case 'processing':
        return "max-w-lg";
      default:
        return "max-w-2xl";
    }
  };

  // Handle back navigation - close modal since there's no previous step
  const handleBack = () => {
    onClose();
  };

  // Handle URL submission with processing step
  const handleUrlSubmit = (e: React.FormEvent) => {
    setCurrentStep('processing');
    onUrlSubmit(e);
  };

  // Handle photo submission with processing step
  const handleSingleFileSelect = (file: File, provider: AIProvider) => {
    setCurrentStep('processing');
    onSingleFileSelect(file, provider);
  };

  const handleMultipleFilesSelect = (files: File[], provider: AIProvider) => {
    setCurrentStep('processing');
    onMultipleFilesSelect(files, provider);
  };

  // Handle modal close
  const handleClose = () => {
    onClose();
  };

  // Auto-advance to processing step when loading starts
  useEffect(() => {
    if (isLoading && currentStep !== 'processing') {
      setCurrentStep('processing');
    }
  }, [isLoading, currentStep]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${getModalSize()} ${isLoading ? 'pointer-events-none' : ''}`}>
        {currentStep === 'url-config' && (
          <URLConfigurationStep
            url={url}
            onUrlChange={onUrlChange}
            urlProcessingMethod={urlProcessingMethod}
            onUrlProcessingMethodChange={onUrlProcessingMethodChange}
            onSubmit={handleUrlSubmit}
            onBack={handleBack}
            urlError={urlError}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'single-photo-config' && (
          <SinglePhotoConfigurationStep
            onBack={handleBack}
            onFileSelect={handleSingleFileSelect}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'multi-photo-config' && (
          <MultiPhotoConfigurationStep
            onBack={handleBack}
            onFilesSelect={handleMultipleFilesSelect}
            isLoading={isLoading}
            maxFiles={5}
          />
        )}

        {currentStep === 'processing' && (
          <ProcessingStep
            isLoading={isLoading}
            loadingProgress={loadingProgress}
            loadingStepMessage={loadingStepMessage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
} 