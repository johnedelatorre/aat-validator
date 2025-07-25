import React, { useEffect } from 'react';
import { FrameCard } from './FrameCard';
import { DragSelectionOverlay } from './DragSelectionOverlay';
import { VideoDrawer } from './VideoDrawer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Frame, ConfidenceLevel, DragState, Sponsor } from '../types';
import { CheckSquare, Square } from 'lucide-react';

interface FrameGridProps {
  frames: Frame[];
  frameRows: Frame[][];
  organizedRows?: { frames: Frame[]; originalIndex: number; transitionState?: any }[];
  collapsedRows: Set<number>;
  rowTransitions?: Map<number, any>;
  currentBatch: number;
  validatedBatches: number;
  focusedFrameId: string | null;
  onFrameToggle: (frameId: string) => void;
  onFrameReject: (frameId: string) => void;
  onConfidenceChange: (frameId: string, confidence: ConfidenceLevel) => void;
  onFrameFocus: (frameId: string) => void;
  onRowSelectAll: (rowIndex: number) => void;
  onRowDeselectAll: (rowIndex: number) => void;
  onRowRejectAll: (rowIndex: number) => void;
  onRowRestoreAll: (rowIndex: number) => void;
  onRowZoomChange: (rowIndex: number, confidence: ConfidenceLevel) => void;
  onRowToggle: (rowIndex: number) => void;
  hasConfirmed: boolean;
  dragState: DragState;
  onDragStart: (e: React.MouseEvent) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onFrameEnterDrag: (frameId: string) => void;
  onFrameLeaveDrag: (frameId: string) => void;

  showVideoDrawer: boolean;
  onCloseVideoDrawer: () => void;
  sponsors?: Sponsor[];
  allFrames: Frame[];
}

export function FrameGrid({ 
  frames,
  frameRows,
  organizedRows,
  collapsedRows,
  rowTransitions,
  currentBatch,
  validatedBatches,
  focusedFrameId,
  onFrameToggle, 
  onFrameReject, 
  onConfidenceChange,
  onFrameFocus,
  onRowSelectAll,
  onRowDeselectAll,
  onRowRejectAll,
  onRowRestoreAll,
  onRowZoomChange,
  onRowToggle,
  hasConfirmed,
  dragState,
  onDragStart,
  onDragMove,
  onDragEnd,
  onFrameEnterDrag,
  onFrameLeaveDrag,

  showVideoDrawer,
  onCloseVideoDrawer,
  sponsors = [],
  allFrames,
}: FrameGridProps) {
  
  // Helper function to check if all frames in a row are processed
  const isRowCompletelyProcessed = (rowFrames: Frame[]): boolean => {
    return rowFrames.length > 0 && rowFrames.every(frame => frame.isConfirmed || frame.isRejected);
  };

  // Helper function to determine row button state (copied from RowHeader logic)
  const getRowButtonState = (rowFrames: Frame[]) => {
    const unprocessedFrames = rowFrames.filter(frame => !frame.isRejected && !frame.isConfirmed);
    const hasDoubleSelectedFrames = unprocessedFrames.some(frame => frame.isDoubleSelected);
    const allUnprocessedSelected = unprocessedFrames.length > 0 && unprocessedFrames.every(frame => frame.isSelected && !frame.isDoubleSelected);
    
    if (hasDoubleSelectedFrames) {
      return 'select';
    } else if (allUnprocessedSelected) {
      return 'deselect';
    } else {
      return 'select';
    }
  };

  // Handle mouse events for drag selection
  useEffect(() => {
    const handleMouseUp = () => {
      if (dragState.isDragging) {
        onDragEnd();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging) {
        const syntheticEvent = {
          currentTarget: document.querySelector('.drag-container'),
          clientX: e.clientX,
          clientY: e.clientY,
        } as React.MouseEvent;
        
        if (syntheticEvent.currentTarget) {
          onDragMove(syntheticEvent);
        }
      }
    };

    if (dragState.isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragState.isDragging, onDragEnd, onDragMove]);

  // Handle drag start - only from empty areas
  const handleGridMouseDown = (e: React.MouseEvent) => {
    // Prevent drag when video drawer is open
    if (showVideoDrawer) return;
    
    const target = e.target as HTMLElement;
    const isFrameCard = target.closest('.cursor-pointer');
    const isControlArea = target.closest('.control-area');
    const isButton = target.closest('button');
    const isBadge = target.closest('.badge');
    const isSidewaysButton = target.closest('.sideways-button');
    
    if (isFrameCard || isControlArea || isButton || isBadge || isSidewaysButton) {
      return;
    }

    onDragStart(e);
  };

  // Grid layout styles
  const getGridLayoutStyles = () => {
    const columnsPerRow = frameRows[0]?.length || 5;
    
    switch (columnsPerRow) {
      case 5:
        return {
          gap: '16px',
        };
      case 7:
        return {
          gap: '12px',
        };
      case 10:
        return {
          gap: '8px',
        };
      case 15:
        return {
          gap: '4px',
        };
      default:
        return {
          gap: '16px',
        };
    }
  };

  const gridLayout = getGridLayoutStyles();

  // Use organized rows if provided, otherwise fall back to frameRows
  const rowsToRender = organizedRows || frameRows.map((frames, index) => ({ frames, originalIndex: index }));

  return (
    <div className="px-6 pt-6 pb-[17px]">
      {/* 30px spacing below sticky header */}
      <div className="h-[30px]"></div>

      <div 
        className="drag-container relative select-none"
        onMouseDown={handleGridMouseDown}
        onMouseMove={onDragMove}
        style={{ cursor: dragState.isDragging ? 'crosshair' : 'default' }}
      >
        {/* Drag Selection Overlay */}
        {dragState.isDragging && (
          <DragSelectionOverlay
            startX={dragState.startX}
            startY={dragState.startY}
            currentX={dragState.currentX}
            currentY={dragState.currentY}
            action={dragState.action}
          />
        )}

        {/* Render rows with elegant sideways buttons */}
        {rowsToRender.map(({ frames: rowFrames, originalIndex }, displayIndex) => {
          const isCollapsed = collapsedRows.has(originalIndex);
          const isCompleted = isRowCompletelyProcessed(rowFrames);
          const buttonState = getRowButtonState(rowFrames);
          
          return (
            <div key={`row-${originalIndex}`} className="mb-6">
              {/* Row with elegant sideways button and frames */}
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-none opacity-100'}
                `}
              >
                {/* Container for elegant button and frames */}
                <div className="flex items-center gap-4">
                  {/* FIXED: Elegant Select All/Deselect All Button with proper width and padding */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (buttonState === 'select') {
                          onRowSelectAll(originalIndex);
                        } else {
                          onRowDeselectAll(originalIndex);
                        }
                      }}
                      disabled={isCompleted}
                      className={`
                        sideways-button h-10 flex items-center gap-1.5
                        border transition-colors text-sm font-medium
                        min-w-[120px] w-[120px] px-2.5
                        ${isCompleted 
                          ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400' 
                          : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                        }
                      `}
                      title={buttonState === 'select' ? 'Select All' : 'Deselect All'}
                    >
                      {/* Icon */}
                      {buttonState === 'select' ? (
                        <CheckSquare className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 flex-shrink-0" />
                      )}
                      
                      {/* Text */}
                      <span className="whitespace-nowrap">
                        {buttonState === 'select' ? 'Select All' : 'Deselect All'}
                      </span>
                    </Button>
                  </div>

                  {/* Frame Grid Container with edge-to-edge alignment */}
                  <div 
                    className="flex-1"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${frameRows[0]?.length || 5}, 1fr)`,
                      gap: gridLayout.gap,
                    }}
                  >
                    {rowFrames.map((frame) => (
                      <FrameCard
                        key={frame.id}
                        frame={frame}
                        isFocused={focusedFrameId === frame.id}
                        onToggle={() => onFrameToggle(frame.id)}
                        onReject={() => onFrameReject(frame.id)}
                        onConfidenceChange={(confidence) => onConfidenceChange(frame.id, confidence)}
                        onFocus={() => onFrameFocus(frame.id)}
                        hasConfirmed={hasConfirmed}
                        dragState={dragState}
                        onFrameEnterDrag={() => onFrameEnterDrag(frame.id)}
                        onFrameLeaveDrag={() => onFrameLeaveDrag(frame.id)}
                        framesPerRow={frameRows[0]?.length || 5}
                        sponsors={sponsors}
                        disabled={showVideoDrawer}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Video Drawer */}
      <VideoDrawer
        isOpen={showVideoDrawer}
        onClose={onCloseVideoDrawer}
      />
    </div>
  );
}