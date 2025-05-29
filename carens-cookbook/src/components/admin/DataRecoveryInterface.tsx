'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  RefreshCw, 
  Download, 
  Upload, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  ChefHat,
  FolderOpen,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrphanedRecipe {
  id: string;
  title: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

interface MigrationResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  errors: string[];
}

interface DataRecoveryInterfaceProps {
  isAdmin?: boolean;
}

export function DataRecoveryInterface({ isAdmin = false }: DataRecoveryInterfaceProps) {
  const [orphanedRecipes, setOrphanedRecipes] = useState<OrphanedRecipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Load orphaned recipes
  const loadOrphanedRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/orphaned-recipes');
      if (response.ok) {
        const data = await response.json();
        setOrphanedRecipes(data.recipes || []);
      }
    } catch (error) {
      console.error('Failed to load orphaned recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load available categories
  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories/defaults');
      if (response.ok) {
        const data = await response.json();
        setAvailableCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  // Perform bulk migration
  const performMigration = async (dryRun: boolean = true) => {
    if (selectedRecipes.size === 0 && !selectedCategory) {
      alert('Please select recipes and a target category');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/migrate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeIds: Array.from(selectedRecipes),
          targetCategory: selectedCategory,
          dryRun
        })
      });

      if (response.ok) {
        const result = await response.json();
        setMigrationResult(result);
        setShowResult(true);
        
        if (!dryRun) {
          // Reload data after successful migration
          await loadOrphanedRecipes();
          setSelectedRecipes(new Set());
        }
      }
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-assign categories using AI
  const autoAssignCategories = async (dryRun: boolean = true) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/auto-assign-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeIds: selectedRecipes.size > 0 ? Array.from(selectedRecipes) : undefined,
          dryRun
        })
      });

      if (response.ok) {
        const result = await response.json();
        setMigrationResult(result);
        setShowResult(true);
        
        if (!dryRun) {
          await loadOrphanedRecipes();
          setSelectedRecipes(new Set());
        }
      }
    } catch (error) {
      console.error('Auto-assignment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle recipe selection
  const toggleRecipeSelection = (recipeId: string) => {
    const newSelection = new Set(selectedRecipes);
    if (newSelection.has(recipeId)) {
      newSelection.delete(recipeId);
    } else {
      newSelection.add(recipeId);
    }
    setSelectedRecipes(newSelection);
  };

  // Select all filtered recipes
  const selectAllFiltered = () => {
    const filteredIds = filteredRecipes.map(r => r.id);
    setSelectedRecipes(new Set(filteredIds));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedRecipes(new Set());
  };

  // Filter recipes based on search term
  const filteredRecipes = orphanedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isAdmin) {
      loadOrphanedRecipes();
      loadCategories();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Admin access required to view this interface.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Recovery Interface</h1>
          <p className="text-gray-600">Manage orphaned recipes and perform bulk category assignments</p>
        </div>
        <Button onClick={loadOrphanedRecipes} disabled={loading}>
          <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Orphaned Recipes</p>
                <p className="text-2xl font-bold">{orphanedRecipes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Selected</p>
                <p className="text-2xl font-bold">{selectedRecipes.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{availableCategories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Affected Users</p>
                <p className="text-2xl font-bold">
                  {new Set(orphanedRecipes.map(r => r.userId)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={selectAllFiltered}>
              Select All Filtered ({filteredRecipes.length})
            </Button>
            <Button variant="outline" onClick={clearSelection}>
              Clear Selection
            </Button>
            <Button 
              onClick={() => performMigration(true)} 
              disabled={loading || selectedRecipes.size === 0 || !selectedCategory}
            >
              <Search className="h-4 w-4 mr-2" />
              Preview Migration
            </Button>
            <Button 
              onClick={() => performMigration(false)} 
              disabled={loading || selectedRecipes.size === 0 || !selectedCategory}
              variant="default"
            >
              <Upload className="h-4 w-4 mr-2" />
              Execute Migration
            </Button>
            <Button 
              onClick={() => autoAssignCategories(true)} 
              disabled={loading}
              variant="secondary"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              AI Auto-Assign (Preview)
            </Button>
            <Button 
              onClick={() => autoAssignCategories(false)} 
              disabled={loading}
              variant="secondary"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              AI Auto-Assign (Execute)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Migration Result */}
      {showResult && migrationResult && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p><strong>Migration Result:</strong></p>
              <p>Total Processed: {migrationResult.totalProcessed}</p>
              <p>Successful: {migrationResult.successful}</p>
              <p>Failed: {migrationResult.failed}</p>
              {migrationResult.errors.length > 0 && (
                <div>
                  <p><strong>Errors:</strong></p>
                  <ul className="list-disc list-inside">
                    {migrationResult.errors.map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Recipe List */}
      <Card>
        <CardHeader>
          <CardTitle>Orphaned Recipes ({filteredRecipes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading...
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {orphanedRecipes.length === 0 ? 'No orphaned recipes found!' : 'No recipes match your search.'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredRecipes.map(recipe => (
                <div 
                  key={recipe.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50",
                    selectedRecipes.has(recipe.id) && "bg-blue-50 border-blue-200"
                  )}
                >
                  <Checkbox
                    checked={selectedRecipes.has(recipe.id)}
                    onCheckedChange={() => toggleRecipeSelection(recipe.id)}
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{recipe.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <FolderOpen className="h-3 w-3" />
                        <span>{recipe.category || 'No category'}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{recipe.user?.email || recipe.userId}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>

                  <Badge variant={recipe.category ? "secondary" : "destructive"}>
                    {recipe.category || 'Orphaned'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 