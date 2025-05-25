"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Edit3,
  Trash2,
  GitMerge,
  GripVertical,

  AlertTriangle,
  Package,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface CategoryData {
  name: string;
  count: number;
  source?: 'PREDEFINED' | 'AI_GENERATED' | 'USER_CREATED';
}

interface CategoryManagerProps {
  categories: CategoryData[];
  onCategoriesChange: () => void;
}

interface RenameFormData {
  newName: string;
}

interface MergeFormData {
  targetCategory: string;
}

interface DeleteFormData {
  moveToCategory?: string;
  forceDelete: boolean;
}

// Sortable Category Item Component
function SortableCategoryItem({
  category,
  onRename,
  onDelete,
  onMerge,
  isSelected,
  onSelectionChange,
}: {
  category: CategoryData;
  onRename: (categoryName: string) => void;
  onDelete: (categoryName: string) => void;
  onMerge: (categoryName: string) => void;
  isSelected: boolean;
  onSelectionChange: (categoryName: string, selected: boolean) => void;
}) {
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

  const getSourceBadgeColor = (source?: string) => {
    switch (source) {
      case 'PREDEFINED':
        return 'bg-blue-100 text-blue-800';
      case 'AI_GENERATED':
        return 'bg-purple-100 text-purple-800';
      case 'USER_CREATED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

export default function CategoryManager({ categories, onCategoriesChange }: CategoryManagerProps) {
  const [localCategories, setLocalCategories] = useState<CategoryData[]>(categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Modal states
  const [renameModal, setRenameModal] = useState<{ isOpen: boolean; categoryName: string }>({
    isOpen: false,
    categoryName: '',
  });
  const [mergeModal, setMergeModal] = useState<{ isOpen: boolean; sourceCategory: string }>({
    isOpen: false,
    sourceCategory: '',
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; categoryName: string }>({
    isOpen: false,
    categoryName: '',
  });

  // Form handling
  const renameForm = useForm<RenameFormData>();
  const mergeForm = useForm<MergeFormData>();
  const deleteForm = useForm<DeleteFormData>();

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalCategories((items) => {
        const oldIndex = items.findIndex((item) => item.name === active.id);
        const newIndex = items.findIndex((item) => item.name === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSelectionChange = (categoryName: string, selected: boolean) => {
    setSelectedCategories(prev => 
      selected 
        ? [...prev, categoryName]
        : prev.filter(name => name !== categoryName)
    );
  };

  const handleBulkMerge = () => {
    if (selectedCategories.length < 2) {
      toast.error('Select at least 2 categories to merge');
      return;
    }

    // Use the first selected category as target, rest as sources
    const [targetCategory, ...sourceCategories] = selectedCategories;
    performMerge(sourceCategories, targetCategory);
  };

  // API calls
  const performRename = async (oldName: string, newName: string) => {
    try {
      const response = await fetch('/api/categories/rename', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldName, newName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        onCategoriesChange();
        setRenameModal({ isOpen: false, categoryName: '' });
        renameForm.reset();
      } else {
        toast.error(data.error || 'Failed to rename category');
      }
    } catch (error) {
      console.error('Error renaming category:', error);
      toast.error('Failed to rename category');
    }
  };

  const performMerge = async (sourceCategories: string[], targetCategory: string) => {
    try {
      const response = await fetch('/api/categories/merge', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCategories, targetCategory }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        onCategoriesChange();
        setMergeModal({ isOpen: false, sourceCategory: '' });
        setSelectedCategories([]);
        mergeForm.reset();
      } else {
        toast.error(data.error || 'Failed to merge categories');
      }
    } catch (error) {
      console.error('Error merging categories:', error);
      toast.error('Failed to merge categories');
    }
  };

  const performDelete = async (categoryName: string, options: DeleteFormData) => {
    try {
      const response = await fetch('/api/categories/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryName,
          moveToCategory: options.moveToCategory,
          forceDelete: options.forceDelete,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        onCategoriesChange();
        setDeleteModal({ isOpen: false, categoryName: '' });
        deleteForm.reset();
      } else {
        toast.error(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Category Management</h2>
          <p className="text-gray-600">Organize, rename, and merge your recipe categories</p>
        </div>
        
        {selectedCategories.length > 1 && (
          <Button onClick={handleBulkMerge} className="flex items-center gap-2">
            <GitMerge className="h-4 w-4" />
            Merge {selectedCategories.length} Categories
          </Button>
        )}
      </div>

      {selectedCategories.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-800">
              {selectedCategories.length} categories selected: {selectedCategories.join(', ')}
            </p>
          </CardContent>
        </Card>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localCategories.map(c => c.name)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            <AnimatePresence>
              {localCategories.map((category) => (
                <SortableCategoryItem
                  key={category.name}
                  category={category}
                  isSelected={selectedCategories.includes(category.name)}
                  onSelectionChange={handleSelectionChange}
                  onRename={(name) => setRenameModal({ isOpen: true, categoryName: name })}
                  onMerge={(name) => setMergeModal({ isOpen: true, sourceCategory: name })}
                  onDelete={(name) => setDeleteModal({ isOpen: true, categoryName: name })}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Rename Modal */}
      <Dialog open={renameModal.isOpen} onOpenChange={(open) => 
        setRenameModal({ isOpen: open, categoryName: open ? renameModal.categoryName : '' })
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Category</DialogTitle>
            <DialogDescription>
              Rename &quot;{renameModal.categoryName}&quot; and update all associated recipes
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={renameForm.handleSubmit((data) => 
            performRename(renameModal.categoryName, data.newName)
          )}>
            <div className="space-y-4">
              <Input
                {...renameForm.register('newName', { 
                  required: 'New name is required',
                  minLength: { value: 1, message: 'Name cannot be empty' }
                })}
                placeholder="Enter new category name"
                defaultValue={renameModal.categoryName}
              />
              {renameForm.formState.errors.newName && (
                <p className="text-sm text-red-600">
                  {renameForm.formState.errors.newName.message}
                </p>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRenameModal({ isOpen: false, categoryName: '' })}
              >
                Cancel
              </Button>
              <Button type="submit">Rename Category</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Merge Modal */}
      <Dialog open={mergeModal.isOpen} onOpenChange={(open) => 
        setMergeModal({ isOpen: open, sourceCategory: open ? mergeModal.sourceCategory : '' })
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge Categories</DialogTitle>
            <DialogDescription>
              Move all recipes from &quot;{mergeModal.sourceCategory}&quot; into another category
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={mergeForm.handleSubmit((data) => 
            performMerge([mergeModal.sourceCategory], data.targetCategory)
          )}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <ArrowRight className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">
                  {mergeModal.sourceCategory} → 
                </span>
              </div>
              
              <Select onValueChange={(value) => mergeForm.setValue('targetCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target category" />
                </SelectTrigger>
                <SelectContent>
                  {localCategories
                    .filter(c => c.name !== mergeModal.sourceCategory)
                    .map(category => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name} ({category.count} recipes)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              {mergeForm.formState.errors.targetCategory && (
                <p className="text-sm text-red-600">Please select a target category</p>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMergeModal({ isOpen: false, sourceCategory: '' })}
              >
                Cancel
              </Button>
              <Button type="submit">Merge Categories</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal.isOpen} onOpenChange={(open) => 
        setDeleteModal({ isOpen: open, categoryName: open ? deleteModal.categoryName : '' })
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Delete Category
            </DialogTitle>
            <DialogDescription>
              What should happen to recipes in &quot;{deleteModal.categoryName}&quot;?
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={deleteForm.handleSubmit((data) => 
            performDelete(deleteModal.categoryName, data)
          )}>
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Move recipes to:</label>
                <Select onValueChange={(value) => 
                  deleteForm.setValue('moveToCategory', value === 'none' ? undefined : value)
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose destination category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Don&apos;t move (prevent deletion)</SelectItem>
                    {localCategories
                      .filter(c => c.name !== deleteModal.categoryName)
                      .map(category => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                <Checkbox
                  {...deleteForm.register('forceDelete')}
                  id="forceDelete"
                  className="border-red-300"
                />
                <label htmlFor="forceDelete" className="text-sm text-red-800">
                  Force delete (permanently remove all recipes)
                </label>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteModal({ isOpen: false, categoryName: '' })}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Delete Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 