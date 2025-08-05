import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Globe, 
  Wand2, 
  Sparkles,
  ArrowRight,
  Quote,
  Star,
  Play,
  ChefHat,
  Utensils,
  Flame,
  Coffee,
  Heart,
  Award,
  Timer,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AIFeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: Eye,
      emoji: "👁️",
      title: "Recipe Vision",
      subtitle: "Reads any recipe like a chef",
      description: "Our AI has been trained on thousands of cookbook pages, handwritten notes, and recipe cards. It understands cooking language and can extract recipes from any image with chef-level precision.",
      stats: "99.7% accuracy",
      gradient: "from-orange-100 via-orange-50 to-cream-50",
      cardBg: "bg-gradient-to-br from-orange-50 to-amber-25",
      iconBg: "bg-gradient-to-br from-orange-400 to-orange-500",
      accentColor: "text-orange-600",
      borderColor: "border-orange-200",
      shadowColor: "shadow-orange-100",
    },
    {
      icon: Globe,
      emoji: "🌍",
      title: "Web Foraging",
      subtitle: "Finds recipes anywhere",
      description: "Like a master forager knows where to find the best ingredients, our AI knows how to extract perfect recipes from any cooking website, blog, or online source.",
      stats: "50k+ sites",
      gradient: "from-emerald-100 via-emerald-50 to-green-50",
      cardBg: "bg-gradient-to-br from-emerald-50 to-green-25",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
      accentColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      shadowColor: "shadow-emerald-100",
    },
    {
      icon: Wand2,
      emoji: "✨",
      title: "Recipe Magic",
      subtitle: "Perfects every dish",
      description: "Just like how a seasoned chef can fix any dish, our AI enhances recipes by filling missing ingredients, adjusting portions, and ensuring every step is crystal clear.",
      stats: "100% complete",
      gradient: "from-purple-100 via-purple-50 to-pink-50",
      cardBg: "bg-gradient-to-br from-purple-50 to-pink-25",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      accentColor: "text-purple-600",
      borderColor: "border-purple-200",
      shadowColor: "shadow-purple-100",
    },
    {
      icon: Sparkles,
      emoji: "🏷️",
      title: "Smart Pantry",
      subtitle: "Organizes like a pro",
      description: "Our AI organizes your recipes like a professional chef organizes their kitchen - by cuisine, cooking method, difficulty, and dietary needs. Everything has its perfect place.",
      stats: "15+ categories",
      gradient: "from-blue-100 via-blue-50 to-sky-50",
      cardBg: "bg-gradient-to-br from-blue-50 to-sky-25",
      iconBg: "bg-gradient-to-br from-blue-500 to-sky-500",
      accentColor: "text-blue-600",
      borderColor: "border-blue-200",
      shadowColor: "shadow-blue-100",
    }
  ];

  const cookingStats = [
    { icon: ChefHat, value: "10,000+", label: "Recipes Enhanced", color: "text-orange-600" },
    { icon: Timer, value: "< 30s", label: "Processing Time", color: "text-emerald-600" },
    { icon: Award, value: "99.7%", label: "Accuracy Rate", color: "text-purple-600" },
    { icon: Heart, value: "5,000+", label: "Happy Cooks", color: "text-red-500" }
  ];

  const testimonials = [
    {
      text: "This AI is like having Julia Child as my personal sous chef. It reads my grandmother's handwritten recipe cards perfectly!",
      author: "Maria",
      role: "Home Baker",
      rating: 5,
      emoji: "🍰",
      specialty: "Specializes in European pastries"
    },
    {
      text: "I run a food blog and this AI saves me hours. It extracts recipes from any website and makes them look professional instantly.",
      author: "James",
      role: "Food Blogger", 
      rating: 5,
      emoji: "📝",
      specialty: "Writes about fusion cuisine"
    },
    {
      text: "The way it organizes my recipe collection is incredible. It's like having a master chef organize my entire kitchen!",
      author: "Sophie",
      role: "Cookbook Author",
      rating: 5,
      emoji: "📚",
      specialty: "Published 3 Mediterranean cookbooks"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-amber-25 via-orange-25 to-cream-50 relative overflow-hidden">
      {/* Cooking Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-5 rotate-12">🍳</div>
        <div className="absolute top-40 right-20 text-4xl opacity-5 -rotate-12">🥘</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-5 rotate-45">🍲</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-5 -rotate-45">🥕</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-3">👨‍🍳</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-orange-200/50 mb-8"
          >
            <ChefHat className="h-6 w-6 text-orange-600" />
            <span className="text-lg font-medium text-gray-800">AI Kitchen Assistant</span>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Your Digital
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent block sm:inline"> 
              {" "}Sous Chef
            </span>
          </h2>
          
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed mb-8">
            Powered by culinary AI that thinks like a master chef, reads like a food critic, 
            and organizes like a kitchen manager. Welcome to the future of cooking.
          </p>

          {/* Cooking Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {cookingStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                    <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onHoverStart={() => setActiveFeature(index)}
                className="group cursor-pointer"
              >
                <Card className={`p-8 h-full ${feature.cardBg} border-2 ${feature.borderColor} hover:border-orange-300 transition-all duration-500 hover:shadow-2xl ${feature.shadowColor} hover:scale-105 transform`}>
                  <div className="flex items-start gap-6">
                    <motion.div 
                      animate={isActive ? { 
                        scale: 1.15, 
                        rotate: [0, -5, 5, 0],
                        y: [-2, 0, -2]
                      } : { 
                        scale: 1, 
                        rotate: 0,
                        y: 0
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={`relative p-4 ${feature.iconBg} rounded-3xl shadow-lg border border-white/50`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                      <div className="absolute -top-2 -right-2 text-2xl">{feature.emoji}</div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                        <Badge className={`${feature.iconBg} text-white border-0 px-3 py-1 text-sm font-bold shadow-md`}>
                          {feature.stats}
                        </Badge>
                      </div>
                      
                      <p className="text-xl font-semibold text-gray-800 mb-4">{feature.subtitle}</p>
                      <p className="text-gray-700 leading-relaxed text-lg">{feature.description}</p>
                      
                      <motion.div 
                        animate={isActive ? { x: 8 } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`flex items-center gap-3 mt-6 ${feature.accentColor} group-hover:text-orange-600 transition-colors font-semibold`}
                      >
                        <Utensils className="h-5 w-5" />
                        <span className="text-lg">Taste the magic</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Kitchen Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-24"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-red-600/20 to-amber-600/30"></div>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-4xl opacity-20">🔥</div>
              <div className="absolute top-10 right-10 text-4xl opacity-20">🍳</div>
              <div className="absolute bottom-10 left-10 text-4xl opacity-20">🥘</div>
              <div className="absolute bottom-10 right-10 text-4xl opacity-20">👨‍🍳</div>
            </div>
            
            <div className="relative p-16 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full shadow-2xl mb-8 cursor-pointer relative"
              >
                <Play className="h-10 w-10 text-white ml-1" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-white/30"
                />
              </motion.div>
              
              <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Flame className="h-8 w-8 text-orange-300" />
                Watch the Kitchen Magic
                <Coffee className="h-8 w-8 text-amber-300" />
              </h3>
              <p className="text-orange-100 text-xl font-light max-w-3xl mx-auto leading-relaxed">
                See how our AI transforms a messy handwritten recipe card into a beautifully organized digital recipe, 
                complete with cooking tips and nutritional information - all in under 30 seconds.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Chef Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <h3 className="text-4xl font-bold text-gray-900">Loved by Food Enthusiasts</h3>
            <Utensils className="h-8 w-8 text-orange-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-8 h-full bg-white border-2 border-orange-200/50 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 shadow-orange-100">
                  <div className="text-4xl mb-4 text-center">{testimonial.emoji}</div>
                  <Quote className="h-8 w-8 text-orange-300 mb-4" />
                  
                  <p className="text-gray-800 mb-6 leading-relaxed text-lg font-medium">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  <div className="border-t border-orange-200 pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                        <p className="text-orange-600 font-semibold">{testimonial.role}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">{testimonial.specialty}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action - Kitchen Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="inline-block p-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 shadow-2xl shadow-orange-200/50">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <ChefHat className="h-12 w-12 text-orange-600" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900">
                Ready to cook smarter?
              </h3>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Utensils className="h-12 w-12 text-orange-600" />
              </motion.div>
            </div>
            
            <p className="text-gray-700 mb-8 font-medium text-xl max-w-2xl mx-auto">
                             Join thousands of home chefs who&apos;ve transformed their kitchens with AI. 
              Start your culinary journey today! 👨‍🍳✨
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 hover:from-orange-600 hover:via-red-600 hover:to-amber-600 text-white border-0 px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="mr-3 h-6 w-6" />
              Start Cooking with AI
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-orange-500" />
                <span>Instant setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-500" />
                <span>Try it in 30 seconds</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
      </div>
    </section>
  );
} 