'use client';

import Link from 'next/link';
import { Cog } from 'lucide-react';

const FloatingSettingsButton = () => {
  return (
    <Link 
      href="/settings"
      className="fixed bottom-6 right-6 bg-gray-700 hover:bg-gray-900 text-white p-4 rounded-full shadow-lg transition-colors duration-300 z-50 flex items-center justify-center"
      aria-label="Open Settings"
    >
      <Cog className="h-6 w-6" />
    </Link>
  );
};

export default FloatingSettingsButton; 