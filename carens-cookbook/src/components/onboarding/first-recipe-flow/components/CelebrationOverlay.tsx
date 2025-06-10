'use client';

import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { ProgressState, Achievement } from '../utils';

interface CelebrationOverlayProps {
  progressState: ProgressState;
  achievements: Achievement[];
}

export function CelebrationOverlay({ progressState, achievements }: CelebrationOverlayProps) {
  if (!progressState.showCelebration) {
    return null;
  }

  const recentAchievements = achievements.filter(a => 
    a.unlocked && 
    a.timestamp && 
    new Date().getTime() - a.timestamp.getTime() < 5000
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
      aria-describedby="celebration-message"
    >
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center animate-in zoom-in duration-500 shadow-2xl border border-gray-100">
        {/* Celebration animation */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full animate-ping opacity-30" />
          </div>
          <div className="relative">
            <Trophy className="h-16 w-16 text-yellow-500 animate-bounce" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>
        
        <h3 id="celebration-title" className="text-xl font-bold text-gray-900 mb-3">
          Milestone Achieved!
        </h3>
        
        <p id="celebration-message" className="text-lg font-medium text-gray-700 mb-4 leading-relaxed">
          {progressState.motivationalMessage}
        </p>
        
        {/* Animated sparkles */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[...Array(7)].map((_, i) => (
            <Sparkles 
              key={i} 
              className="h-4 w-4 text-yellow-400 animate-pulse" 
              style={{ 
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1.5s'
              }} 
            />
          ))}
        </div>
        
        {/* Achievement badges if any were unlocked */}
        {recentAchievements.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
            <div className="text-sm font-medium text-blue-900 mb-2">New Achievement!</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentAchievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 border border-blue-200">
                    <Icon className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-800 font-medium">{achievement.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 