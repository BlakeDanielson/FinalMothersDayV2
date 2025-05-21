'use client';

import Link from 'next/link';
import { Cog } from 'lucide-react'; // Using lucide-react for a settings icon

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          Caren's Cookbook
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/settings" className="hover:text-gray-300 transition-colors flex items-center">
            <Cog className="h-5 w-5 mr-1" />
            Settings
          </Link>
          {/* Add other nav links here if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 