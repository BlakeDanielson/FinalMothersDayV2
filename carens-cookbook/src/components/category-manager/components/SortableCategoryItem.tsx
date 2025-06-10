"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit3, Trash2, GitMerge, GripVertical, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SortableCategoryItemProps } from '../types';
import { getSourceBadgeColor } from '../utils/badge-colors';

export function SortableCategoryItem({
  category,
  onRename,
  onDelete,
  onMerge,
  isSelected,
  onSelectionChange,
}: SortableCategoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 border rounded-lg bg-white transition-all ${
        isDragging ? 'shadow-lg z-10' : 'shadow-sm'
      } ${isSelected ? 'ring-2 ring-primary border-primary' : 'border-gray-200'}`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        {/* Selection Checkbox */}
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => 
            onSelectionChange(category.name, checked as boolean)
          }
        />

        {/* Category Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{category.name}</h3>
            {category.source && (
              <Badge variant="secondary" className={`text-xs ${getSourceBadgeColor(category.source)}`}>
                {category.source === 'PREDEFINED' ? 'Built-in' : 
                 category.source === 'AI_GENERATED' ? 'AI' : 'Custom'}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Package className="h-3 w-3" />
            {category.count} {category.count === 1 ? 'recipe' : 'recipes'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRename(category.name)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMerge(category.name)}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            disabled={category.count === 0}
          >
            <GitMerge className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(category.name)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}