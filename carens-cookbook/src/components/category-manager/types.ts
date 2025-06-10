export interface CategoryData {
  name: string;
  count: number;
  source?: 'PREDEFINED' | 'AI_GENERATED' | 'USER_CREATED';
}

export interface CategoryManagerProps {
  categories: CategoryData[];
  onCategoriesChange: () => void;
}

export interface RenameFormData {
  newName: string;
}

export interface MergeFormData {
  targetCategory: string;
}

export interface DeleteFormData {
  moveToCategory?: string;
  forceDelete: boolean;
}

export interface SortableCategoryItemProps {
  category: CategoryData;
  onRename: (categoryName: string) => void;
  onDelete: (categoryName: string) => void;
  onMerge: (categoryName: string) => void;
  isSelected: boolean;
  onSelectionChange: (categoryName: string, selected: boolean) => void;
}