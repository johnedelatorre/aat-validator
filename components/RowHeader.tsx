import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Frame, ConfidenceLevel } from '../types';
import { CheckSquare, Square, X, RotateCcw, ZoomIn, ZoomOut, Eye, ChevronDown, ChevronRight, Check } from 'lucide-react';

interface RowHeaderProps {
  rowIndex: number;
  frames: Frame[];
  isCollapsed: boolean;
  isCompleted?: boolean; // New prop to indicate if row is completed
  onSelectAll: (rowIndex: number) => void;
  onDeselectAll: (rowIndex: number) => void;
  onRejectAll: (rowIndex: number) => void;
  onRestoreAll: (rowIndex: number) => void;
  onZoomChange: (rowIndex: number, confidence: ConfidenceLevel) => void;
  onToggle: (rowIndex: number) => void;
}

export function RowHeader({ 
  rowIndex, 
  frames, 
  isCollapsed,
  isCompleted = false, // Default to false
  onSelectAll, 
  onDeselectAll, 
  onRejectAll,
  onRestoreAll,
  onZoomChange,
  onToggle
}: RowHeaderProps) {
  const selectedCount = frames.filter(frame => frame.isSelected && !frame.isRejected && !frame.isConfirmed).length;
  const doubleSelectedCount = frames.filter(frame => frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed).length;
  const rejectedCount = frames.filter(frame => frame.isRejected).length;
  const confirmedCount = frames.filter(frame => frame.isConfirmed).length;
  const totalFrames = frames.length;
  const unprocessedFrames = frames.filter(frame => !frame.isRejected && !frame.isConfirmed);
  
  // NEW: Enhanced state detection for double-selected frames
  const hasDoubleSelectedFrames = unprocessedFrames.some(frame => frame.isDoubleSelected);
  const allUnprocessedSelected = unprocessedFrames.length > 0 && unprocessedFrames.every(frame => frame.isSelected && !frame.isDoubleSelected);
  const allRejected = rejectedCount === totalFrames;

  // Calculate zoom level distribution for the row
  const zoomCounts = frames.reduce((acc, frame) => {
    acc[frame.confidence] = (acc[frame.confidence] || 0) + 1;
    return acc;
  }, {} as Record<ConfidenceLevel, number>);

  const dominantZoom = Object.entries(zoomCounts).reduce((a, b) => 
    zoomCounts[a[0] as ConfidenceLevel] > zoomCounts[b[0] as ConfidenceLevel] ? a : b
  )[0] as ConfidenceLevel;

  // Dynamic styling based on completion status
  const headerClasses = isCompleted 
    ? "flex items-center mb-4 p-4 bg-green-50 border-green-200 rounded-lg border-2 shadow-sm transition-colors"
    : "flex items-center mb-4 p-4 bg-white rounded-lg border shadow-sm";

  const titleClasses = isCompleted
    ? "text-sm font-medium text-green-800"
    : "text-sm font-medium text-gray-700";

  return (
    <div className={headerClasses}>
      {/* Left Section - Row Info with Completion Indicator - FIXED: Increased width to prevent wrapping */}
      <div className="flex items-center space-x-3 flex-shrink-0 w-96">
        <div className="flex items-center space-x-2">
          {/* Completion Status Icon - Clean circle design */}
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
          )}
          <h3 className={`${titleClasses} whitespace-nowrap`}>
            Row {rowIndex + 1}
            {isCompleted && (
              <span className="ml-2 text-xs text-green-600 font-normal">
                (Completed)
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={`text-xs w-32 justify-center ${
              isCompleted 
                ? 'border-green-300 bg-green-100 text-green-800' 
                : ''
            }`}
          >
            Showing: {totalFrames} frames
          </Badge>
          {(selectedCount > 0 || doubleSelectedCount > 0) && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              {selectedCount + doubleSelectedCount} selected
              {doubleSelectedCount > 0 && (
                <span className="ml-1 text-xs opacity-75">
                  ({doubleSelectedCount} ready)
                </span>
              )}
            </Badge>
          )}
          {confirmedCount > 0 && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              {confirmedCount} confirmed
            </Badge>
          )}
          {rejectedCount > 0 && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              {rejectedCount} rejected
            </Badge>
          )}
        </div>
      </div>

      {/* Center Section - Row Zoom Controls (Prominent) - FIXED: Disabled buttons for completed rows */}
      <div className="flex items-center justify-center flex-1">
        <div className={`flex items-center space-x-3 rounded-lg p-2 border ${
          isCompleted 
            ? 'bg-green-100 border-green-300' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <span className={`text-sm font-medium ${
            isCompleted ? 'text-green-800' : 'text-gray-700'
          }`}>
            Row Zoom:
          </span>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant={dominantZoom === 'Min' ? 'default' : 'outline'}
              onClick={() => onZoomChange(rowIndex, 'Min')}
              disabled={isCompleted} // FIXED: Disable for completed rows
              className={`h-8 px-3 text-xs flex items-center space-x-1 ${
                isCompleted 
                  ? 'opacity-50 cursor-not-allowed' 
                  : dominantZoom !== 'Min' && isCompleted
                    ? 'border-green-300 hover:bg-green-100'
                    : ''
              }`}
              title="Zoom out all frames in this row"
            >
              <ZoomOut className="w-3 h-3" />
              <span>Min</span>
            </Button>
            <Button
              size="sm"
              variant={dominantZoom === 'Mid' ? 'default' : 'outline'}
              onClick={() => onZoomChange(rowIndex, 'Mid')}
              disabled={isCompleted} // FIXED: Disable for completed rows
              className={`h-8 px-3 text-xs flex items-center space-x-1 ${
                isCompleted 
                  ? 'opacity-50 cursor-not-allowed' 
                  : dominantZoom !== 'Mid' && isCompleted
                    ? 'border-green-300 hover:bg-green-100'
                    : ''
              }`}
              title="Default zoom for all frames in this row"
            >
              <Eye className="w-3 h-3" />
              <span>Mid</span>
            </Button>
            <Button
              size="sm"
              variant={dominantZoom === 'Max' ? 'default' : 'outline'}
              onClick={() => onZoomChange(rowIndex, 'Max')}
              disabled={isCompleted} // FIXED: Disable for completed rows
              className={`h-8 px-3 text-xs flex items-center space-x-1 ${
                isCompleted 
                  ? 'opacity-50 cursor-not-allowed' 
                  : dominantZoom !== 'Max' && isCompleted
                    ? 'border-green-300 hover:bg-green-100'
                    : ''
              }`}
              title="Zoom in all frames in this row"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Max</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Selection Controls */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Enhanced Select All / Deselect All Toggle - Dynamic based on double-selected state */}
        {hasDoubleSelectedFrames ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSelectAll(rowIndex)}
            disabled={isCompleted}
            className={`text-xs h-8 px-3 w-28 ${
              isCompleted 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <CheckSquare className="w-3 h-3 mr-1" />
            Select All
          </Button>
        ) : allUnprocessedSelected ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDeselectAll(rowIndex)}
            disabled={isCompleted}
            className={`text-xs h-8 px-3 w-28 ${
              isCompleted 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <Square className="w-3 h-3 mr-1" />
            Deselect All
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSelectAll(rowIndex)}
            disabled={isCompleted}
            className={`text-xs h-8 px-3 w-28 ${
              isCompleted 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <CheckSquare className="w-3 h-3 mr-1" />
            Select All
          </Button>
        )}

        {/* Reject All / Restore All Toggle */}
        {allRejected ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRestoreAll(rowIndex)}
            className={`text-xs h-8 px-3 w-28 text-green-600 hover:text-green-700 hover:bg-green-50 ${
              isCompleted 
                ? 'border-green-300' 
                : ''
            }`}
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Restore All
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRejectAll(rowIndex)}
            disabled={isCompleted}
            className={`text-xs h-8 px-3 w-28 ${
              isCompleted 
                ? 'opacity-50 cursor-not-allowed' 
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }`}
          >
            <X className="w-3 h-3 mr-1" />
            Reject All
          </Button>
        )}

        {/* Collapse/Expand Toggle Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggle(rowIndex)}
          className={`h-8 w-8 p-0 transition-colors ${
            isCompleted 
              ? 'text-green-700 hover:text-green-800 hover:bg-green-100 border-green-300' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
          title={isCollapsed ? 'Expand row' : 'Collapse row'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}