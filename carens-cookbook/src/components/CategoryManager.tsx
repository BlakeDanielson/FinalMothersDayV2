"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
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
} from '@dnd-kit/sortable';
import { GitMerge } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CategoryManagerProps,
  CategoryData,
  RenameFormData,
  MergeFormData,
  DeleteFormData,
  SortableCategoryItem,
  RenameModal,
  MergeModal,
  DeleteModal,
} from './category-manager';

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

      {/* Modals */}
      <RenameModal
        isOpen={renameModal.isOpen}
        categoryName={renameModal.categoryName}
        onClose={() => setRenameModal({ isOpen: false, categoryName: '' })}
        onSubmit={(data) => performRename(renameModal.categoryName, data.newName)}
        form={renameForm}
      />

      <MergeModal
        isOpen={mergeModal.isOpen}
        sourceCategory={mergeModal.sourceCategory}
        categories={localCategories}
        onClose={() => setMergeModal({ isOpen: false, sourceCategory: '' })}
        onSubmit={(data) => performMerge([mergeModal.sourceCategory], data.targetCategory)}
        form={mergeForm}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        categoryName={deleteModal.categoryName}
        categories={localCategories}
        onClose={() => setDeleteModal({ isOpen: false, categoryName: '' })}
        onSubmit={(data) => performDelete(deleteModal.categoryName, data)}
        form={deleteForm}
      />
    </div>
  );
} 