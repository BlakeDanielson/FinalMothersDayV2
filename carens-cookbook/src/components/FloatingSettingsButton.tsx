'use client';

import Link from 'next/link';
import { Cog } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const FloatingSettingsButton = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2 z-50">
      <SignedIn>
        <Link 
          href="/settings"
          className="bg-gray-700 hover:bg-gray-900 text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
          aria-label="Open Settings"
        >
          <Cog className="h-6 w-6" />
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300"
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default FloatingSettingsButton; 