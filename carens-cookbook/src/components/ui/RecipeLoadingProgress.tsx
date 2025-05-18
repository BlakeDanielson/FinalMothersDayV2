"use client"

import * as React from "react"
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
  return (
    <Card className={cn("p-6 w-full max-w-md mx-auto", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <h3 className="text-lg font-medium">Fetching Recipe</h3>
        </div>
        
        <Progress value={progress} className="w-full h-2" />
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{statusMessage}</span>
          <span className="font-medium">{progress}%</span>
        </div>
      </div>
    </Card>
  )
}

export default RecipeLoadingProgress; 