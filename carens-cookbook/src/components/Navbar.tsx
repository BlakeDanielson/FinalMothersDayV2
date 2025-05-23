"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, BookOpen, Settings, Heart, Clock, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/favorites", label: "Favorites", icon: Heart, badge: "New" },
    { href: "/meal-plans", label: "Meal Plans", icon: Clock, badge: "New" },
    { href: "/shopping-lists", label: "Shopping", icon: ShoppingCart, badge: "New" },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Caren's Cookbook</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleGlobalSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search all recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <SignedIn>
              {navItems.map(({ href, label, icon: Icon, badge }) => (
                <Link key={href} href={href}>
                  <Button variant="ghost" className="relative flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                    {badge && (
                      <Badge variant="secondary" className="absolute -top-1 -right-1 text-xs">
                        {badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleGlobalSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search all recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </form>

            <SignedIn>
              {/* Mobile Navigation Items */}
              <div className="space-y-2 mb-4">
                {navItems.map(({ href, label, icon: Icon, badge }) => (
                  <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start relative">
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                      {badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                ))}
              </div>
              {/* Mobile User Button */}
              <div className="flex justify-center pt-2 border-t border-gray-200">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex justify-center">
                <SignInButton mode="modal">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
} 