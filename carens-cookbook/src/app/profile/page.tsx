'use client';

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Clock, User } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4">Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your cooking statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {user.imageUrl && (
                <Image 
                  src={user.imageUrl} 
                  alt="Profile" 
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
                <Badge variant="secondary" className="mt-1">
                  Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recipe Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Total Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">0</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium">Add Recipe</div>
                  <div className="text-sm text-muted-foreground">Import or create new</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <div className="font-medium">View Favorites</div>
                  <div className="text-sm text-muted-foreground">Your saved recipes</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <Clock className="h-8 w-8 text-purple-500" />
                <div>
                  <div className="font-medium">Meal Plans</div>
                  <div className="text-sm text-muted-foreground">Plan your week</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 