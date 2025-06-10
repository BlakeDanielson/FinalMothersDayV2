'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface BulkActionsBarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRemoveSelected: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onRemoveSelected
}: BulkActionsBarProps) {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm text-blue-700">
          Select categories for bulk actions. Selected: {selectedCount}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onSelectAll}
            disabled={selectedCount === 0}
          >
            Select All
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDeselectAll}
            disabled={selectedCount === 0}
          >
            Deselect All
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onRemoveSelected}
            disabled={selectedCount === 0}
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
} 