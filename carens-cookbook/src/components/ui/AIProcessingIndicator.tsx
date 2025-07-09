import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Sparkles, 
  Zap, 
  Globe, 
  ImageIcon, 
  FileText, 
  CheckCircle,
  Cpu,
  Search,
  Wand2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AIProcessingIndicatorProps {
  stage: 'analyzing' | 'extracting' | 'enhancing' | 'organizing' | 'complete';
  progress: number;
  message: string;
  processingType: 'image' | 'url' | 'text';
  aiProvider?: string;
  showTechnicalDetails?: boolean;
}

const stageConfig = {
  analyzing: {
    icon: Eye,
    title: 'AI Vision Analysis',
    description: 'Advanced computer vision reading your recipe',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  extracting: {
    icon: Brain,
    title: 'Smart Text Extraction',
    description: 'AI understanding ingredients and instructions',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  enhancing: {
    icon: Wand2,
    title: 'Recipe Enhancement',
    description: 'AI filling gaps and improving clarity',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  organizing: {
    icon: Sparkles,
    title: 'Smart Organization',
    description: 'AI categorizing and structuring your recipe',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  complete: {
    icon: CheckCircle,
    title: 'AI Processing Complete',
    description: 'Your recipe is ready!',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  }
};

const processingTypeConfig = {
  image: {
    icon: ImageIcon,
    title: 'Image Processing',
    description: 'AI reading text from your photos',
    features: ['OCR Technology', 'Computer Vision', 'Text Recognition']
  },
  url: {
    icon: Globe,
    title: 'Web Intelligence',
    description: 'AI scraping and analyzing web content',
    features: ['Web Scraping', 'Content Analysis', 'Smart Extraction']
  },
  text: {
    icon: FileText,
    title: 'Text Analysis',
    description: 'AI understanding recipe structure',
    features: ['Natural Language Processing', 'Content Parsing', 'Smart Formatting']
  }
};

export function AIProcessingIndicator({
  stage,
  progress,
  message,
  processingType,
  aiProvider = 'Advanced AI',
  showTechnicalDetails = false
}: AIProcessingIndicatorProps) {
  const currentStage = stageConfig[stage];
  const currentType = processingTypeConfig[processingType];
  const StageIcon = currentStage.icon;
  const TypeIcon = currentType.icon;

  return (
    <Card className="p-6 max-w-lg mx-auto border-2 border-dashed border-primary/30 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="space-y-6">
        {/* Header with AI branding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-primary/10 rounded-full"
              >
                <Brain className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">AI Recipe Assistant</h3>
              <p className="text-sm text-muted-foreground">Powered by {aiProvider}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Cpu className="h-3 w-3 mr-1" />
            AI Active
          </Badge>
        </div>

        {/* Current Stage */}
        <div className={`p-4 rounded-lg border ${currentStage.bgColor} ${currentStage.borderColor}`}>
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <StageIcon className={`h-6 w-6 ${currentStage.color}`} />
            </motion.div>
            <div>
              <h4 className="font-semibold text-foreground">{currentStage.title}</h4>
              <p className="text-sm text-muted-foreground">{currentStage.description}</p>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-2" />
          
          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm font-medium text-foreground"
            >
              {message}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Processing Type Details */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <TypeIcon className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="font-medium text-sm">{currentType.title}</p>
            <p className="text-xs text-muted-foreground">{currentType.description}</p>
          </div>
        </div>

        {/* AI Capabilities Showcase */}
        <div className="grid grid-cols-3 gap-2">
          {currentType.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-2 bg-primary/5 rounded-lg text-center"
            >
              <div className="text-xs font-medium text-primary mb-1">
                {feature}
              </div>
              <div className="flex justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Details (Optional) */}
        {showTechnicalDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t pt-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Technical Details</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Multi-model AI processing for optimal results</p>
              <p>• Real-time content analysis and extraction</p>
              <p>• Advanced error correction and enhancement</p>
              <p>• Smart categorization and organization</p>
            </div>
          </motion.div>
        )}

        {/* Progress indicator */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-muted-foreground">AI Processing</span>
          </div>
          <motion.span
            key={progress}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="font-bold text-primary"
          >
            {progress}%
          </motion.span>
        </div>
      </div>
    </Card>
  );
} 