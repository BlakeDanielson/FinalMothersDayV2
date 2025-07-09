import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Sparkles, 
  Zap, 
  Globe, 
  ImageIcon, 
  FileText, 
  Wand2,
  Search,
  Cpu,
  Bot,
  Stars,
  Wand
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AICapabilityBadgeProps {
  capability: 'vision' | 'extraction' | 'enhancement' | 'organization' | 'web-scraping' | 'smart-categorization' | 'auto-fill' | 'content-analysis';
  variant?: 'default' | 'minimal' | 'detailed';
  animated?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const capabilityConfig = {
  vision: {
    icon: Eye,
    label: 'AI Vision',
    description: 'Advanced computer vision that can read text from photos, even handwritten recipes',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  extraction: {
    icon: Brain,
    label: 'Smart Extraction',
    description: 'AI automatically identifies and extracts ingredients, steps, and recipe details',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  enhancement: {
    icon: Wand2,
    label: 'AI Enhancement',
    description: 'Automatically fills in missing details, improves clarity, and fixes incomplete recipes',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  organization: {
    icon: Sparkles,
    label: 'Smart Organization',
    description: 'AI automatically categorizes recipes and organizes them by cuisine, meal type, and more',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  },
  'web-scraping': {
    icon: Globe,
    label: 'Web Intelligence',
    description: 'AI scrapes and analyzes recipe websites, extracting clean recipe data from any URL',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200'
  },
  'smart-categorization': {
    icon: Stars,
    label: 'Auto-Categorization',
    description: 'AI analyzes recipe content to automatically assign appropriate categories and tags',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200'
  },
  'auto-fill': {
    icon: Wand,
    label: 'Auto-Fill',
    description: 'AI intelligently fills in missing recipe information like prep time, cuisine, and descriptions',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200'
  },
  'content-analysis': {
    icon: Search,
    label: 'Content Analysis',
    description: 'Deep AI analysis of recipe content to understand cooking techniques and complexity',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200'
  }
};

export function AICapabilityBadge({
  capability,
  variant = 'default',
  animated = true,
  showTooltip = true,
  className = ''
}: AICapabilityBadgeProps) {
  const config = capabilityConfig[capability];
  const Icon = config.icon;

  const badgeContent = (
    <motion.div
      initial={animated ? { scale: 0.9, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {variant === 'minimal' ? (
        <Badge variant="secondary" className={`bg-gradient-to-r ${config.color} text-white border-0`}>
          <Icon className="h-3 w-3 mr-1" />
          AI
        </Badge>
      ) : variant === 'detailed' ? (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor}`}>
          <motion.div
            animate={animated ? { rotate: [0, 360] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Icon className={`h-4 w-4 ${config.textColor}`} />
          </motion.div>
          <span className={`text-sm font-medium ${config.textColor}`}>
            {config.label}
          </span>
          <motion.div
            animate={animated ? { scale: [1, 1.2, 1] } : undefined}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.color}`}
          />
        </div>
      ) : (
        <Badge variant="secondary" className={`bg-gradient-to-r ${config.color} text-white border-0`}>
          <motion.div
            animate={animated ? { rotate: [0, 360] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="h-3 w-3 mr-1" />
          </motion.div>
          {config.label}
        </Badge>
      )}
    </motion.div>
  );

  if (!showTooltip) {
    return badgeContent;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span className="font-semibold">{config.label}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Preset combinations for common use cases
export function AIFeatureShowcase({ features }: { features: AICapabilityBadgeProps['capability'][] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AICapabilityBadge
            capability={feature}
            variant="default"
            animated={true}
            showTooltip={true}
          />
        </motion.div>
      ))}
    </div>
  );
}

// AI-powered indicator for recipe cards
export function AIProcessedIndicator({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Bot className="h-3 w-3" />
      </motion.div>
      AI Enhanced
    </motion.div>
  );
} 