'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Check, X, GripVertical } from 'lucide-react';
import { EnhancedCategoryCardProps } from '../utils';

export const EnhancedCategoryCard = React.memo(function EnhancedCategoryCard({
  category,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  validationError,
  bulkSelectMode,
  isSelectedForBulk,
  onBulkToggle
}: EnhancedCategoryCardProps) {
  const [editName, setEditName] = useState(category.name);
  const [editDescription, setEditDescription] = useState(category.description);

  useEffect(() => {
    if (category.isEditing) {
      setEditName(category.name);
      setEditDescription(category.description);
    }
  }, [category.isEditing, category.name, category.description]);

  return (
    <Card 
      className={`transition-all ${category.isSelected ? 'ring-2 ring-primary' : ''} ${
        isSelectedForBulk ? 'ring-2 ring-blue-500' : ''
      }`}
      draggable={!category.isEditing}
      onDragStart={(e) => onDragStart(e, category.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {bulkSelectMode ? (
            <Checkbox
              checked={isSelectedForBulk}
              onCheckedChange={onBulkToggle}
              className="mt-1"
            />
          ) : (
            <Checkbox
              checked={category.isSelected}
              onCheckedChange={() => onToggle(category.id)}
              className="mt-1"
            />
          )}
          
          <div className="flex-1 space-y-2">
            {category.isEditing ? (
              <div className="space-y-3">
                <div>
                  <Input
                    value={editName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
                    placeholder="Category name"
                    className={validationError ? 'border-red-500' : ''}
                  />
                  {validationError && (
                    <p className="text-sm text-red-500 mt-1">{validationError}</p>
                  )}
                </div>
                <Textarea
                  value={editDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                  placeholder="Category description"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onSaveEdit(category.id, editName, editDescription)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCancelEdit(category.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {category.isCustom && (
                      <Badge variant="secondary" className="text-xs">
                        Custom
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onStartEdit(category.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    {category.isCustom && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemove(category.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                {category.description && (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}); 