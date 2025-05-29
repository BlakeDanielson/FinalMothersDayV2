'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Search, 
  Tags, 
  Share2, 
  Camera, 
  Globe,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  color: string;
}

const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: 'organize',
    title: 'Smart Organization',
    description: 'Keep your recipes organized with intelligent categorization and custom tags',
    icon: BookOpen,
    benefits: [
      'Custom categories for your cooking style',
      'Smart auto-categorization',
      'Easy browsing and filtering'
    ],
    color: 'blue'
  },
  {
    id: 'scan',
    title: 'Recipe Scanning',
    description: 'Instantly digitize recipes from photos or URLs with AI-powered extraction',
    icon: Camera,
    benefits: [
      'Scan cookbook pages and recipe cards',
      'Extract recipes from any website',
      'No more manual typing'
    ],
    color: 'green'
  },
  {
    id: 'search',
    title: 'Powerful Search',
    description: 'Find exactly what you\'re looking for with advanced search and filtering',
    icon: Search,
    benefits: [
      'Search by ingredients, cuisine, or prep time',
      'Filter by dietary preferences',
      'Quick access to favorites'
    ],
    color: 'purple'
  },
  {
    id: 'share',
    title: 'Easy Sharing',
    description: 'Share your favorite recipes with family and friends effortlessly',
    icon: Share2,
    benefits: [
      'Share individual recipes or collections',
      'Export to various formats',
      'Build your recipe community'
    ],
    color: 'orange'
  }
];

const STATS = [
  { label: 'Active Users', value: '10,000+', icon: Users },
  { label: 'Recipes Organized', value: '250,000+', icon: BookOpen },
  { label: 'Average Rating', value: '4.8/5', icon: Star }
];

export function AppOverviewScreen() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % FEATURE_HIGHLIGHTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextFeature = () => {
    setIsAutoPlaying(false);
    setCurrentFeature(prev => (prev + 1) % FEATURE_HIGHLIGHTS.length);
  };

  const previousFeature = () => {
    setIsAutoPlaying(false);
    setCurrentFeature(prev => (prev - 1 + FEATURE_HIGHLIGHTS.length) % FEATURE_HIGHLIGHTS.length);
  };

  const goToFeature = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentFeature(index);
  };

  const currentFeatureData = FEATURE_HIGHLIGHTS[currentFeature];
  const Icon = currentFeatureData.icon;

  return (
    <WelcomeScreen
      screenId="overview"
      title="Welcome to Caren's Cookbook"
      subtitle="Your personal recipe management companion that makes cooking more organized, accessible, and enjoyable."
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>Trusted by home cooks worldwide</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8">
            {STATS.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-gray-900">
                    <StatIcon className="h-5 w-5 text-blue-600" />
                    <span>{stat.value}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Carousel */}
        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  <Play className={cn("h-4 w-4 text-gray-600", isAutoPlaying && "text-blue-600")} />
                </button>
                <button
                  onClick={previousFeature}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={nextFeature}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Feature Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-3 rounded-lg",
                    currentFeatureData.color === 'blue' && "bg-blue-100",
                    currentFeatureData.color === 'green' && "bg-green-100",
                    currentFeatureData.color === 'purple' && "bg-purple-100",
                    currentFeatureData.color === 'orange' && "bg-orange-100"
                  )}>
                    <Icon className={cn(
                      "h-6 w-6",
                      currentFeatureData.color === 'blue' && "text-blue-600",
                      currentFeatureData.color === 'green' && "text-green-600",
                      currentFeatureData.color === 'purple' && "text-purple-600",
                      currentFeatureData.color === 'orange' && "text-orange-600"
                    )} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {currentFeatureData.title}
                  </h4>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {currentFeatureData.description}
                </p>

                <ul className="space-y-2">
                  {currentFeatureData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        currentFeatureData.color === 'blue' && "bg-blue-500",
                        currentFeatureData.color === 'green' && "bg-green-500",
                        currentFeatureData.color === 'purple' && "bg-purple-500",
                        currentFeatureData.color === 'orange' && "bg-orange-500"
                      )} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Visual */}
              <div className="relative">
                <div className={cn(
                  "aspect-video rounded-lg flex items-center justify-center",
                  currentFeatureData.color === 'blue' && "bg-gradient-to-br from-blue-50 to-blue-100",
                  currentFeatureData.color === 'green' && "bg-gradient-to-br from-green-50 to-green-100",
                  currentFeatureData.color === 'purple' && "bg-gradient-to-br from-purple-50 to-purple-100",
                  currentFeatureData.color === 'orange' && "bg-gradient-to-br from-orange-50 to-orange-100"
                )}>
                  <Icon className={cn(
                    "h-16 w-16 opacity-60",
                    currentFeatureData.color === 'blue' && "text-blue-400",
                    currentFeatureData.color === 'green' && "text-green-400",
                    currentFeatureData.color === 'purple' && "text-purple-400",
                    currentFeatureData.color === 'orange' && "text-orange-400"
                  )} />
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {FEATURE_HIGHLIGHTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToFeature(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentFeature ? "bg-blue-500" : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">Save Time</div>
              <div className="text-sm text-green-600">
                Spend less time organizing and more time cooking
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">Stay Organized</div>
              <div className="text-sm text-blue-600">
                Never lose a recipe again with smart categorization
              </div>
            </CardContent>
          </Card>

          <Card className="border border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700 mb-1">Cook More</div>
              <div className="text-sm text-purple-600">
                Discover new recipes and rediscover old favorites
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Ready to transform your recipe collection?
          </p>
          <Badge variant="secondary" className="text-xs">
            Let's get you set up in just a few minutes!
          </Badge>
        </div>
      </div>
    </WelcomeScreen>
  );
} 