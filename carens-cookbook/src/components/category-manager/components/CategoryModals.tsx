"use client";

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
import { CategoryData, RenameFormData, MergeFormData, DeleteFormData } from '../types';

interface RenameModalProps {
  isOpen: boolean;
  categoryName: string;
  onClose: () => void;
  onSubmit: (data: RenameFormData) => void;
  form: UseFormReturn<RenameFormData>;
}

interface MergeModalProps {
  isOpen: boolean;
  sourceCategory: string;
  categories: CategoryData[];
  onClose: () => void;
  onSubmit: (data: MergeFormData) => void;
  form: UseFormReturn<MergeFormData>;
}

interface DeleteModalProps {
  isOpen: boolean;
  categoryName: string;
  categories: CategoryData[];
  onClose: () => void;
  onSubmit: (data: DeleteFormData) => void;
  form: UseFormReturn<DeleteFormData>;
}

export function RenameModal({ isOpen, categoryName, onClose, onSubmit, form }: RenameModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Category</DialogTitle>
          <DialogDescription>
            Rename &quot;{categoryName}&quot; and update all associated recipes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...form.register('newName', { 
                required: 'New name is required',
                minLength: { value: 1, message: 'Name cannot be empty' }
              })}
              placeholder="Enter new category name"
              defaultValue={categoryName}
            />
            {form.formState.errors.newName && (
              <p className="text-sm text-red-600">
                {form.formState.errors.newName.message}
              </p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Rename Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function MergeModal({ isOpen, sourceCategory, categories, onClose, onSubmit, form }: MergeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Merge Categories</DialogTitle>
          <DialogDescription>
            Move all recipes from &quot;{sourceCategory}&quot; into another category
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
              <ArrowRight className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">
                {sourceCategory} → 
              </span>
            </div>
            
            <Select onValueChange={(value) => form.setValue('targetCategory', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select target category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(c => c.name !== sourceCategory)
                  .map(category => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name} ({category.count} recipes)
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            {form.formState.errors.targetCategory && (
              <p className="text-sm text-red-600">Please select a target category</p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Merge Categories</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteModal({ isOpen, categoryName, categories, onClose, onSubmit, form }: DeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete Category
          </DialogTitle>
          <DialogDescription>
            What should happen to recipes in &quot;{categoryName}&quot;?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Move recipes to:</label>
              <Select onValueChange={(value) => 
                form.setValue('moveToCategory', value === 'none' ? undefined : value)
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Choose destination category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Don&apos;t move (prevent deletion)</SelectItem>
                  {categories
                    .filter(c => c.name !== categoryName)
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
                {...form.register('forceDelete')}
                id="forceDelete"
                className="border-red-300"
              />
              <label htmlFor="forceDelete" className="text-sm text-red-800">
                Force delete (permanently remove all recipes)
              </label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}