'use client';

import React from 'react';
import { useSettings } from '@/contexts/SettingsContext'; // Import useSettings

const SettingsPage = () => {
  const { showImages, toggleShowImages } = useSettings(); // Use the context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
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
      {/* More settings can be added here */}
    </div>
  );
};

export default SettingsPage; 