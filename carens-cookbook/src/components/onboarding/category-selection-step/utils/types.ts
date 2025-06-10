export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  isCustom: boolean;
  isEditing: boolean;
  originalName?: string;
  order: number;
}

export interface CategorySelectionStepProps {
  onNext: (data: CategorySelectionData) => void;
  onBack: () => void;
  initialData?: Partial<CategorySelectionData>;
  isLoading?: boolean;
}

export interface CategorySelectionData {
  selectedCategories: string[];
  customCategories: Array<{
    name: string;
    description: string;
  }>;
  removedCategories: string[];
  categoryOrder: string[];
}

export interface HistoryState {
  categories: CategoryItem[];
  timestamp: number;
}

export interface EnhancedCategoryCardProps {
  category: CategoryItem;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onSaveEdit: (id: string, name: string, description: string) => void;
  onCancelEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
  validationError?: string;
  bulkSelectMode: boolean;
  isSelectedForBulk: boolean;
  onBulkToggle: (selected: boolean) => void;
}

export interface CategorySuggestion {
  name: string;
  description: string;
} 