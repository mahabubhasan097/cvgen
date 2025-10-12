import React from "react";

interface ActionButtonsProps {
  onAdd?: () => void;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  showAdd?: boolean;
  showRemove?: boolean;
  showMove?: boolean;
  className?: string;
}

/**
 * ActionButtons Component
 * Reusable add/remove/move buttons for dynamic content
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
  showAdd = true,
  showRemove = true,
  showMove = false,
  className = "",
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {showMove && onMoveUp && (
        <button
          onClick={onMoveUp}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Move up"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      {showMove && onMoveDown && (
        <button
          onClick={onMoveDown}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Move down"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      {showAdd && onAdd && (
        <button
          onClick={onAdd}
          className="p-1 hover:bg-green-100 rounded transition-colors"
          title="Add"
        >
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
      {showRemove && onRemove && (
        <button
          onClick={onRemove}
          className="p-1 hover:bg-red-100 rounded transition-colors"
          title="Remove"
        >
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;

