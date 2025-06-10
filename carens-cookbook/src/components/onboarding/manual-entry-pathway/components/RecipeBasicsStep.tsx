import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChefHat, CheckCircle, Upload, Camera } from 'lucide-react';
import { RecipeBasicsStepProps } from '../utils/types';

export function RecipeBasicsStep({ 
  formData, 
  setFormData, 
  onImageUpload, 
  fileInputRef 
}: RecipeBasicsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <ChefHat className="h-8 w-8 text-blue-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900">Let&apos;s start with the basics</h3>
        <p className="text-gray-600">Give your recipe a name and description</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Mom's Famous Chocolate Chip Cookies"
            className="text-lg"
            autoFocus
          />
          {formData.title.trim() && (
            <div className="mt-1 flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Great title!
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="A brief description of your recipe..."
            rows={3}
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Photo (optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
            {formData.image ? (
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <p className="text-sm text-gray-600">Image uploaded: {formData.image.name}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Image
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">Click to upload a photo</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Choose Photo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 