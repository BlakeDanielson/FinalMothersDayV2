'use client';

import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * React Query provider component that wraps the app with QueryClient
 * Includes devtools in development mode if available
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools will be added when the package is installed */}
    </QueryClientProvider>
  );
} 