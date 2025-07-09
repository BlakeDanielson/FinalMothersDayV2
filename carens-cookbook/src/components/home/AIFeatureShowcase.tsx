import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Globe, 
  Wand2, 
  Sparkles, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AIFeatureShowcase() {
  const features = [
    {
      icon: Eye,
      title: "AI Vision Technology",
      description: "Advanced computer vision that can read text from photos, even handwritten recipes and cookbook pages",
      capabilities: ["OCR Text Recognition", "Handwriting Detection", "Multi-language Support"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      icon: Globe,
      title: "Web Intelligence",
      description: "AI scrapes and analyzes recipe websites, extracting clean recipe data from any URL automatically",
      capabilities: ["Smart Web Scraping", "Content Analysis", "Format Detection"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-200"
    },
    {
      icon: Wand2,
      title: "Recipe Enhancement",
      description: "AI automatically fills in missing details, improves clarity, and fixes incomplete recipes",
      capabilities: ["Auto-Fill Missing Info", "Clarity Improvement", "Smart Categorization"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      icon: Sparkles,
      title: "Smart Organization",
      description: "AI automatically categorizes recipes and organizes them by cuisine, meal type, and dietary preferences",
      capabilities: ["Auto-Categorization", "Smart Tagging", "Dietary Analysis"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          >
            <Brain className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground">Powered by Advanced AI</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the future of recipe management with cutting-edge artificial intelligence that understands cooking
        </p>
        <div className="flex justify-center mt-4">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            100% AI-Powered Platform
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-6 h-full border-2 ${feature.borderColor} ${feature.bgColor} hover:shadow-xl transition-all duration-300 group`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} flex-shrink-0`}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${feature.textColor}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <motion.div
                          key={capability}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (capIndex * 0.05) }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className={`h-4 w-4 ${feature.textColor}`} />
                          <span className="text-sm text-muted-foreground">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-12"
      >
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-primary/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-foreground">Ready to Experience AI Magic?</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Upload a photo or paste a recipe URL to see our AI technology in action. 
            Watch as it intelligently extracts, enhances, and organizes your recipes.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <span>Try it now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
} 