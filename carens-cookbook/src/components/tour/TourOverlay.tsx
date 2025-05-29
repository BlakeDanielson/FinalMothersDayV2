'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  SkipForward,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { useFeatureTour } from '@/contexts/FeatureTourContext';
import { cn } from '@/lib/utils';

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

interface TooltipPosition {
  top: number;
  left: number;
  transform: string;
  arrowPosition: 'top' | 'bottom' | 'left' | 'right';
}

export function TourOverlay() {
  const {
    tourState,
    currentStep,
    currentTour,
    nextStep,
    previousStep,
    skipTour,
    exitTour
  } = useFeatureTour();

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [elementPosition, setElementPosition] = useState<ElementPosition | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Find and track target element
  useEffect(() => {
    if (!currentStep || !tourState.isActive) {
      setTargetElement(null);
      setElementPosition(null);
      return;
    }

    const findElement = () => {
      const element = document.querySelector(currentStep.target) as HTMLElement;
      if (element) {
        setTargetElement(element);
        // updateElementPosition will be called in a separate effect
      } else {
        console.warn(`Tour target element not found: ${currentStep.target}`);
        setTargetElement(null);
        setElementPosition(null);
      }
    };

    // Initial find
    findElement();

    // Set up observer for dynamic content
    const observer = new MutationObserver(findElement);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      observer.disconnect();
    };
  }, [currentStep, tourState.isActive]);

  const calculateTooltipPosition = useCallback((elementPos: ElementPosition) => {
    if (!currentStep || !tooltipRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16;

    let position: TooltipPosition;

    switch (currentStep.position) {
      case 'top':
        position = {
          top: elementPos.top - tooltipRect.height - margin,
          left: elementPos.centerX - tooltipRect.width / 2,
          transform: 'none',
          arrowPosition: 'bottom'
        };
        break;

      case 'bottom':
        position = {
          top: elementPos.top + elementPos.height + margin,
          left: elementPos.centerX - tooltipRect.width / 2,
          transform: 'none',
          arrowPosition: 'top'
        };
        break;

      case 'left':
        position = {
          top: elementPos.centerY - tooltipRect.height / 2,
          left: elementPos.left - tooltipRect.width - margin,
          transform: 'none',
          arrowPosition: 'right'
        };
        break;

      case 'right':
        position = {
          top: elementPos.centerY - tooltipRect.height / 2,
          left: elementPos.left + elementPos.width + margin,
          transform: 'none',
          arrowPosition: 'left'
        };
        break;

      case 'center':
      default:
        position = {
          top: viewportHeight / 2,
          left: viewportWidth / 2,
          transform: 'translate(-50%, -50%)',
          arrowPosition: 'bottom'
        };
        break;
    }

    // Adjust for viewport boundaries
    if (position.left < margin) {
      position.left = margin;
    } else if (position.left + tooltipRect.width > viewportWidth - margin) {
      position.left = viewportWidth - tooltipRect.width - margin;
    }

    if (position.top < margin) {
      position.top = margin;
    } else if (position.top + tooltipRect.height > viewportHeight - margin) {
      position.top = viewportHeight - tooltipRect.height - margin;
    }

    setTooltipPosition(position);
  }, [currentStep]);

  const updateElementPosition = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const position: ElementPosition = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2
    };
    setElementPosition(position);
    calculateTooltipPosition(position);
  }, [calculateTooltipPosition]);

  // Handle element positioning and window events
  useEffect(() => {
    if (!targetElement) return;

    // Initial position update
    updateElementPosition(targetElement);

    // Handle window resize and scroll
    const handleResize = () => {
      if (targetElement) {
        updateElementPosition(targetElement);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [targetElement, updateElementPosition]);

  // Scroll target element into view
  useEffect(() => {
    if (targetElement && elementPosition) {
      const elementCenter = elementPosition.centerY;
      const viewportHeight = window.innerHeight;
      const scrollOffset = elementCenter - viewportHeight / 2;

      window.scrollTo({
        top: window.scrollY + scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [targetElement, elementPosition]);

  if (!tourState.isActive || !currentStep || !currentTour) {
    return null;
  }

  const isFirstStep = tourState.currentStepIndex === 0;
  const isLastStep = tourState.currentStepIndex === currentTour.steps.length - 1;

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking on the overlay itself, not the tooltip
    if (e.target === e.currentTarget) {
      exitTour();
    }
  };

  const renderSpotlight = () => {
    if (!elementPosition) return null;

    const spotlightStyle = {
      position: 'absolute' as const,
      top: elementPosition.top - 8,
      left: elementPosition.left - 8,
      width: elementPosition.width + 16,
      height: elementPosition.height + 16,
      borderRadius: '8px',
      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5)',
      pointerEvents: 'none' as const,
      zIndex: 9998
    };

    return <div style={spotlightStyle} />;
  };

  const renderTooltip = () => {
    if (!tooltipPosition) return null;

    const tooltipStyle = {
      position: 'fixed' as const,
      top: tooltipPosition.top,
      left: tooltipPosition.left,
      transform: tooltipPosition.transform,
      zIndex: 9999
    };

    return (
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        className="max-w-sm animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-blue-100 rounded-full">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-900">
                    {currentStep.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {tourState.currentStepIndex + 1} of {currentTour.steps.length}
                    </Badge>
                    <span className="text-xs text-gray-500">{currentTour.name}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={exitTour}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 mb-4">
              {currentStep.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousStep}
                    className="h-8"
                  >
                    <ChevronLeft className="h-3 w-3 mr-1" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTour}
                  className="h-8 text-gray-500 hover:text-gray-700"
                >
                  <SkipForward className="h-3 w-3 mr-1" />
                  Skip Tour
                </Button>

                <Button
                  size="sm"
                  onClick={nextStep}
                  className="h-8"
                >
                  {isLastStep ? (
                    <>
                      <HelpCircle className="h-3 w-3 mr-1" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arrow indicator */}
        <div
          className={cn(
            "absolute w-3 h-3 bg-white border-2 border-blue-200 rotate-45",
            tooltipPosition.arrowPosition === 'top' && "-top-2 left-1/2 -translate-x-1/2",
            tooltipPosition.arrowPosition === 'bottom' && "-bottom-2 left-1/2 -translate-x-1/2",
            tooltipPosition.arrowPosition === 'left' && "-left-2 top-1/2 -translate-y-1/2",
            tooltipPosition.arrowPosition === 'right' && "-right-2 top-1/2 -translate-y-1/2"
          )}
        />
      </div>
    );
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9997]"
      onClick={handleOverlayClick}
    >
      {renderSpotlight()}
      {renderTooltip()}
    </div>,
    document.body
  );
} 