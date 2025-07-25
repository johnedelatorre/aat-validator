import React from 'react';
import { DragAction } from '../types';

interface DragSelectionOverlayProps {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  action: DragAction;
}

export function DragSelectionOverlay({ 
  startX, 
  startY, 
  currentX, 
  currentY, 
  action 
}: DragSelectionOverlayProps) {
  
  // Calculate the rectangle bounds
  const left = Math.min(startX, currentX);
  const top = Math.min(startY, currentY);
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  // Get styling based on action
  const getOverlayStyle = () => {
    switch (action) {
      case 'select':
        return {
          border: '2px dashed #10b981', // green
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
        };
      case 'deselect':
        return {
          border: '2px dashed #f59e0b', // yellow
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
        };
      case 'reject':
        return {
          border: '2px dashed #ef4444', // red
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
        };
      default:
        return {
          border: '2px dashed #6b7280', // gray
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
        };
    }
  };

  // Get action label
  const getActionLabel = () => {
    switch (action) {
      case 'select':
        return 'Select';
      case 'deselect':
        return 'Deselect';
      case 'reject':
        return 'Reject';
      default:
        return 'Select';
    }
  };

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        ...getOverlayStyle(),
      }}
    >
      {/* Action label */}
      {width > 50 && height > 30 && (
        <div 
          className="absolute top-1 left-1 px-2 py-1 text-xs font-medium rounded"
          style={{
            backgroundColor: action === 'select' ? '#10b981' : 
                           action === 'deselect' ? '#f59e0b' : '#ef4444',
            color: 'white',
          }}
        >
          {getActionLabel()}
        </div>
      )}
    </div>
  );
}