'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  showImages: boolean;
  toggleShowImages: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showImages, setShowImages] = useState<boolean>(() => {
    // Get initial value from localStorage or default to true
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('showImages');
      return storedValue !== null ? JSON.parse(storedValue) : true;
    }
    return true; // Default for server-side rendering or if window is not available
  });

  useEffect(() => {
    // Persist to localStorage whenever showImages changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('showImages', JSON.stringify(showImages));
    }
  }, [showImages]);

  const toggleShowImages = () => {
    setShowImages(prev => !prev);
  };

  return (
    <SettingsContext.Provider value={{ showImages, toggleShowImages }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 