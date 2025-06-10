"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface RecipeLoadingProgressProps {
  progress: number
  statusMessage: string
  className?: string
}

const RecipeLoadingProgress: React.FC<RecipeLoadingProgressProps> = ({
  progress,
  statusMessage,
  className,
}) => {
  // Extract emoji from the beginning of the message for animation
  const emojiMatch = statusMessage.match(/^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
  const emoji = emojiMatch ? emojiMatch[0] : "🤖";
  const messageWithoutEmoji = statusMessage.replace(/^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]\s*/u, "");

  return (
    <Card className={cn("p-6 w-full max-w-md mx-auto border-primary/20 bg-gradient-to-br from-background to-muted/30", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.div
            key={emoji}
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-2xl"
          >
            {emoji}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Recipe Extraction</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={statusMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-muted-foreground font-medium"
              >
                {messageWithoutEmoji || statusMessage}
              </motion.p>
            </AnimatePresence>
          </div>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="w-full h-3 bg-muted/50" />
          
          <div className="flex justify-between items-center text-sm">
            <motion.span 
              className="text-muted-foreground font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Processing...
            </motion.span>
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

        {/* Strategy indicator */}
        {statusMessage.includes('ultra-efficient') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">
              Ultra-efficient processing active
            </span>
          </motion.div>
        )}

        {statusMessage.includes('backup') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-700">
              Backup processing engaged
            </span>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default RecipeLoadingProgress; 