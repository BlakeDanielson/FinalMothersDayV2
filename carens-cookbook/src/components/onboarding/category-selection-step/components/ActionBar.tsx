'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Lightbulb, Trash2 } from 'lucide-react';

interface ActionBarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  showSuggestions: boolean;
  onToggleSuggestions: () => void;
  bulkSelectMode: boolean;
  onToggleBulkMode: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ActionBar({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  showSuggestions,
  onToggleSuggestions,
  bulkSelectMode,
  onToggleBulkMode
}: ActionBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center gap-2"
        >
          <Undo2 className="h-4 w-4" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="flex items-center gap-2"
        >
          <Redo2 className="h-4 w-4" />
          Redo
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSuggestions}
          className="flex items-center gap-2"
        >
          <Lightbulb className="h-4 w-4" />
          Suggestions
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleBulkMode}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Bulk Actions
        </Button>
      </div>
    </div>
  );
} 