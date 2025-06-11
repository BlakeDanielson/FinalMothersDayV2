"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGuestMode } from '@/lib/services/guest-mode';

export function GuestModeIndicator() {
  const { isGuest, guestRecipeCount, promptSignup } = useGuestMode();

  if (!isGuest) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <User className="h-6 w-6 text-amber-600" />
              <Star className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 fill-current" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800">Guest Mode</h3>
              <p className="text-sm text-amber-700">
                {guestRecipeCount > 0 
                  ? `${guestRecipeCount} recipe${guestRecipeCount > 1 ? 's' : ''} saved locally`
                  : 'Try scanning recipes without signing up!'
                }
              </p>
            </div>
            {guestRecipeCount > 0 && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {guestRecipeCount}
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={() => promptSignup()}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Sign Up to Save Forever
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
} 