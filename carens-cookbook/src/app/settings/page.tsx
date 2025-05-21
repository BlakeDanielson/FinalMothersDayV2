'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import { useSettings } from '@/contexts/SettingsContext'; // Import useSettings
import { Home } from 'lucide-react'; // Import Home icon

const SettingsPage = () => {
  const { showImages, toggleShowImages } = useSettings(); // Use the context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-4 border rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <label htmlFor="showImagesToggle" className="text-lg">
            Show Recipe Images
          </label>
          <button
            id="showImagesToggle"
            onClick={toggleShowImages} // Use toggleShowImages from context
            className={`px-4 py-2 rounded-full font-semibold transition-colors
              ${showImages ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {showImages ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <Link 
        href="/"
        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Home className="h-5 w-5 mr-2" />
        Return to Home
      </Link>
      {/* More settings can be added here */}
    </div>
  );
};

export default SettingsPage; 