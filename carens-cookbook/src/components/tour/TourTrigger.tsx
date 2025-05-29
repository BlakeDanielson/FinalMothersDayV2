'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Play, 
  BookOpen, 
  Search, 
  User,
  Lightbulb
} from 'lucide-react';
import { useFeatureTour } from '@/contexts/FeatureTourContext';
import { cn } from '@/lib/utils';

interface TourTriggerProps {
  tourId: string;
  variant?: 'button' | 'badge' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  showIfCompleted?: boolean;
}

const TOUR_ICONS = {
  'recipe-basics': BookOpen,
  'search-features': Search,
  'profile-settings': User
};

const TOUR_COLORS = {
  'recipe-basics': 'blue',
  'search-features': 'green',
  'profile-settings': 'purple'
};

export function TourTrigger({ 
  tourId, 
  variant = 'button', 
  size = 'md',
  className,
  children,
  showIfCompleted = false
}: TourTriggerProps) {
  const { 
    startTour, 
    isTourCompleted, 
    shouldShowTour,
    tourState
  } = useFeatureTour();

  const isCompleted = isTourCompleted(tourId);
  const shouldShow = shouldShowTour(tourId);
  const isActive = tourState.activeTour === tourId;

  // Don't show if tour is completed and showIfCompleted is false
  if (isCompleted && !showIfCompleted) {
    return null;
  }

  // Don't show if tour shouldn't be shown (e.g., skipped)
  if (!shouldShow && !showIfCompleted) {
    return null;
  }

  const handleClick = () => {
    if (!isActive) {
      startTour(tourId);
    }
  };

  const Icon = TOUR_ICONS[tourId as keyof typeof TOUR_ICONS] || HelpCircle;
  const color = TOUR_COLORS[tourId as keyof typeof TOUR_COLORS] || 'blue';

  if (variant === 'badge') {
    return (
      <Badge
        variant={isCompleted ? 'secondary' : 'default'}
        className={cn(
          'cursor-pointer hover:opacity-80 transition-opacity',
          isActive && 'ring-2 ring-blue-500',
          className
        )}
        onClick={handleClick}
      >
        <Icon className="h-3 w-3 mr-1" />
        {children || (isCompleted ? 'Completed' : 'Start Tour')}
      </Badge>
    );
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-8 w-8 p-0',
          isActive && 'ring-2 ring-blue-500',
          className
        )}
        onClick={handleClick}
        title={children?.toString() || `Start ${tourId} tour`}
      >
        <Icon className="h-4 w-4" />
      </Button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        className={cn(
          'text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer',
          isActive && 'font-semibold',
          className
        )}
        onClick={handleClick}
      >
        {children || 'Take a tour'}
      </button>
    );
  }

  // Default button variant
  const buttonSize = size === 'md' ? 'default' : size;
  
  return (
    <Button
      variant={isCompleted ? 'outline' : 'default'}
      size={buttonSize}
      className={cn(
        isActive && 'ring-2 ring-blue-500',
        className
      )}
      onClick={handleClick}
    >
      <Icon className={cn(
        'mr-2',
        size === 'sm' && 'h-3 w-3',
        size === 'md' && 'h-4 w-4',
        size === 'lg' && 'h-5 w-5'
      )} />
      {children || (isCompleted ? 'Retake Tour' : 'Start Tour')}
    </Button>
  );
}

// Specialized tour trigger components
export function RecipeBasicsTourTrigger(props: Omit<TourTriggerProps, 'tourId'>) {
  return (
    <TourTrigger 
      {...props} 
      tourId="recipe-basics"
    >
      {props.children || 'Learn Recipe Basics'}
    </TourTrigger>
  );
}

export function SearchFeaturesTourTrigger(props: Omit<TourTriggerProps, 'tourId'>) {
  return (
    <TourTrigger 
      {...props} 
      tourId="search-features"
    >
      {props.children || 'Learn Search Features'}
    </TourTrigger>
  );
}

export function ProfileSettingsTourTrigger(props: Omit<TourTriggerProps, 'tourId'>) {
  return (
    <TourTrigger 
      {...props} 
      tourId="profile-settings"
    >
      {props.children || 'Learn Profile Settings'}
    </TourTrigger>
  );
}

// Help menu component that shows all available tours
interface TourMenuProps {
  className?: string;
}

export function TourMenu({ className }: TourMenuProps) {
  const { tourState } = useFeatureTour();

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Interactive Tours</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Recipe Management</p>
              <p className="text-xs text-gray-600">Learn to add and organize recipes</p>
            </div>
          </div>
          <RecipeBasicsTourTrigger variant="badge" size="sm" showIfCompleted />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <Search className="h-4 w-4 text-green-600" />
            <div>
              <p className="font-medium text-sm">Search & Discovery</p>
              <p className="text-xs text-gray-600">Master the search features</p>
            </div>
          </div>
          <SearchFeaturesTourTrigger variant="badge" size="sm" showIfCompleted />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Profile & Preferences</p>
              <p className="text-xs text-gray-600">Customize your experience</p>
            </div>
          </div>
          <ProfileSettingsTourTrigger variant="badge" size="sm" showIfCompleted />
        </div>
      </div>

      {tourState.isActive && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <Play className="h-4 w-4 inline mr-1" />
            Tour in progress... Use arrow keys to navigate or ESC to exit.
          </p>
        </div>
      )}
    </div>
  );
} 