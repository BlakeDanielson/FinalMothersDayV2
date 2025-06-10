import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { SearchAndFiltersProps } from '../utils/types';
import { CUISINE_FILTERS, CATEGORY_FILTERS } from '../data/recipes';

export function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  selectedCuisine,
  setSelectedCuisine,
  selectedCategory,
  setSelectedCategory,
  showFilters,
  setShowFilters,
  filteredCount
}: SearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="pl-10"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <div className="text-sm text-gray-500">
          {filteredCount} recipe{filteredCount !== 1 ? 's' : ''} found
        </div>
      </div>

      {showFilters && (
        <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {CUISINE_FILTERS.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {CATEGORY_FILTERS.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
} 