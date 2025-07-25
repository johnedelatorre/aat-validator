import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Frame, ConfidenceLevel, DragState, Sponsor } from '../types';
import { CheckCircle, Trash2, ZoomIn, ZoomOut, Eye, HelpCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FrameOverlay } from './FrameOverlay';

interface FrameCardProps {
  frame: Frame;
  isFocused: boolean;
  onToggle: () => void;
  onReject: () => void;
  onConfidenceChange: (confidence: ConfidenceLevel) => void;
  onFocus: () => void;
  hasConfirmed: boolean;
  dragState?: DragState;
  onFrameEnterDrag?: () => void;
  onFrameLeaveDrag?: () => void;
  framesPerRow?: number;
  sponsors?: Sponsor[];
  disabled?: boolean;
}

export function FrameCard({ 
  frame, 
  isFocused,
  onToggle, 
  onReject, 
  onConfidenceChange,
  onFocus,
  hasConfirmed,
  dragState,
  onFrameEnterDrag,
  onFrameLeaveDrag,
  framesPerRow = 5,
  sponsors = [],
  disabled = false,
}: FrameCardProps) {
  
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const isRejected = frame.isRejected;
  const isConfirmed = frame.isConfirmed;
  const isMarkedForRejection = frame.isMarkedForRejection;
  const isDoubleSelected = frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection;
  const isSelected = frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection;
  const isProcessed = isRejected || isConfirmed;
  const isInDragSelection = dragState?.frameIds.has(frame.id) || false;

  // FIXED: Responsive container width detection
  const updateContainerWidth = useCallback(() => {
    if (cardWrapperRef.current) {
      const container = cardWrapperRef.current.closest('.drag-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        setContainerWidth(containerRect.width);
      }
    }
  }, []);

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, [updateContainerWidth]);

  // Helper function to get sponsor name from sponsor ID
  const getSponsorName = (sponsorId: string): string => {
    const sponsor = sponsors.find(s => s.id === sponsorId);
    return sponsor ? sponsor.name : sponsorId;
  };

  // Get the sponsor name for confirmed frames
  const getConfirmedSponsorText = (): string => {
    if (!isConfirmed || frame.sponsorAnnotations.length === 0) {
      return 'Confirmed';
    }
    
    const firstSponsorId = frame.sponsorAnnotations[0];
    const sponsorName = getSponsorName(firstSponsorId);
    
    return `Confirmed with ${sponsorName}`;
  };

  // NEW: Get individual sponsor assignment indicator
  const getIndividualSponsorText = (): string => {
    if (!frame.individualSponsor) return '';
    const sponsorName = getSponsorName(frame.individualSponsor);
    return sponsorName;
  };

  // FIXED: Responsive frame dimensions based on container width and frames per row
  const getFrameDimensions = () => {
    const buttonHeight = 30; // Always exactly 30px as requested
    
    // Calculate gap sizes for each density
    const gapSizes = {
      5: 16,  // 16px gap
      7: 12,  // 12px gap  
      10: 8,  // 8px gap
      15: 4,  // 4px gap
      default: 16
    };
    
    const gapSize = gapSizes[framesPerRow as keyof typeof gapSizes] || gapSizes.default;
    
    // FIXED: Calculate available width for frames
    const containerPadding = 48; // 24px on each side (px-6 in FrameGrid)
    const availableWidth = containerWidth - containerPadding;
    const totalGapWidth = (framesPerRow - 1) * gapSize;
    const availableFrameWidth = availableWidth - totalGapWidth;
    const maxFrameWidth = availableFrameWidth / framesPerRow;
    
    // FIXED: Calculate responsive frame dimensions maintaining 4:3 aspect ratio
    // If we don't have container width yet, use fallback calculations
    let frameWidth, totalHeight, imageHeight;
    
    if (containerWidth > 0 && maxFrameWidth > 0) {
      // RESPONSIVE: Calculate based on available space
      frameWidth = Math.floor(maxFrameWidth);
      // FIXED: Cap maximum height at 305px instead of 350px
      const calculatedHeight = Math.floor((frameWidth / 4) * 3) + buttonHeight; // 4:3 ratio + 30px button
      totalHeight = Math.min(calculatedHeight, 305); // Cap at 305px maximum
      imageHeight = totalHeight - buttonHeight;
    } else {
      // FALLBACK: Use fixed dimensions when container width not available
      switch (framesPerRow) {
        case 5:
          totalHeight = 275;
          frameWidth = Math.floor((275 - buttonHeight) * 4 / 3); // Maintain 4:3
          imageHeight = 245;
          break;
        case 7:
          totalHeight = 235;
          frameWidth = Math.floor((235 - buttonHeight) * 4 / 3);
          imageHeight = 205;
          break;
        case 10:
          totalHeight = 200;
          frameWidth = Math.floor((200 - buttonHeight) * 4 / 3);
          imageHeight = 170;
          break;
        case 15:
          totalHeight = 170;
          frameWidth = Math.floor((170 - buttonHeight) * 4 / 3);
          imageHeight = 140;
          break;
        default:
          totalHeight = 275;
          frameWidth = Math.floor((275 - buttonHeight) * 4 / 3);
          imageHeight = 245;
      }
    }
    
    // FIXED: Button styling and text visibility based on frames per row
    return {
      totalHeight,
      imageHeight,
      frameWidth,
      buttonHeight,
      // FIXED: Button styling - icon-only starts at 10 frames per row
      buttonClasses: framesPerRow >= 15 ? 'h-full px-1 text-xs' : 
                    framesPerRow >= 10 ? 'h-full px-2 text-sm' : 'h-full px-3 text-sm',
      iconSize: 'w-4 h-4',
      showText: framesPerRow < 10, // FIXED: Text only for 5 and 7 frames per row
      selectionIconSize: 'w-6 h-6',
      statusEmojiSize: framesPerRow >= 15 ? 'text-2xs' : framesPerRow >= 10 ? 'text-xs' : 'text-sm',
      statusTextSize: framesPerRow >= 15 ? 'text-2xs' : 'text-xs',
      statusPadding: framesPerRow >= 15 ? 'px-0.5 py-0' : framesPerRow >= 10 ? 'px-1 py-0.5' : 'px-2 py-1',
      statusMargin: framesPerRow >= 15 ? 'bottom-0.5 left-0.5 right-0.5' : 
                   framesPerRow >= 10 ? 'bottom-1 left-1 right-1' : 'bottom-2 left-2 right-2'
    };
  };

  const dimensions = getFrameDimensions();

  // Detection box styling based on quality
  const getDetectionBoxStyling = () => {
    const config = getLogoZoomConfig();
    const detectionBox = frame.detectionBox;
    
    let positionStyle;
    if (frame.confidence === 'Min') {
      positionStyle = {
        left: `${detectionBox.x}%`,
        top: `${detectionBox.y}%`,
        width: `${detectionBox.width}%`,
        height: `${detectionBox.height}%`,
      };
    } else {
      const centerX = detectionBox.x + (detectionBox.width / 2);
      const centerY = detectionBox.y + (detectionBox.height / 2);
      
      let visibleWidth, visibleHeight, visibleX, visibleY;
      
      if (frame.confidence === 'Mid') {
        const cropPadding = 40;
        visibleWidth = Math.min(100, detectionBox.width + cropPadding);
        visibleHeight = Math.min(100, detectionBox.height + cropPadding);
        visibleX = Math.max(0, Math.min(100 - visibleWidth, centerX - visibleWidth / 2));
        visibleY = Math.max(0, Math.min(100 - visibleHeight, centerY - visibleHeight / 2));
      } else {
        const cropPadding = 15;
        visibleWidth = Math.min(100, detectionBox.width + cropPadding);
        visibleHeight = Math.min(100, detectionBox.height + cropPadding);
        visibleX = Math.max(0, Math.min(100 - visibleWidth, centerX - visibleWidth / 2));
        visibleY = Math.max(0, Math.min(100 - visibleHeight, centerY - visibleHeight / 2));
      }
      
      const relativeX = ((detectionBox.x - visibleX) / visibleWidth) * 100;
      const relativeY = ((detectionBox.y - visibleY) / visibleHeight) * 100;
      const relativeWidth = (detectionBox.width / visibleWidth) * 100;
      const relativeHeight = (detectionBox.height / visibleHeight) * 100;
      
      positionStyle = {
        left: `${relativeX}%`,
        top: `${relativeY}%`,
        width: `${relativeWidth}%`,
        height: `${relativeHeight}%`,
      };
    }

    return positionStyle;
  };

  const getDetectionBoxClasses = () => {
    const isHighQuality = frame.detectionBox.quality === 'clear';
    
    if (isHighQuality) {
      return 'absolute border-2 border-yellow-400 bg-yellow-400/10 shadow-sm';
    } else {
      return 'absolute border-2 border-red-500 bg-red-500/10 shadow-sm';
    }
  };

  // Handle drag selection detection
  useEffect(() => {
    if (!dragState?.isDragging || !cardWrapperRef.current) return;

    const cardWrapper = cardWrapperRef.current;
    const cardRect = cardWrapper.getBoundingClientRect();
    const containerRect = cardWrapper.closest('.drag-container')?.getBoundingClientRect();
    
    if (!containerRect) return;

    const cardLeft = cardRect.left - containerRect.left;
    const cardTop = cardRect.top - containerRect.top;
    const cardRight = cardLeft + cardRect.width;
    const cardBottom = cardTop + cardRect.height;

    const selectionLeft = Math.min(dragState.startX, dragState.currentX);
    const selectionTop = Math.min(dragState.startY, dragState.currentY);
    const selectionRight = Math.max(dragState.startX, dragState.currentX);
    const selectionBottom = Math.max(dragState.startY, dragState.currentY);

    const isIntersecting = !(
      cardRight < selectionLeft ||
      cardLeft > selectionRight ||
      cardBottom < selectionTop ||
      cardTop > selectionBottom
    );

    if (isIntersecting && !isInDragSelection) {
      onFrameEnterDrag?.();
    } else if (!isIntersecting && isInDragSelection) {
      onFrameLeaveDrag?.();
    }
  }, [
    dragState?.isDragging,
    dragState?.startX,
    dragState?.startY,
    dragState?.currentX,
    dragState?.currentY,
    isInDragSelection,
    onFrameEnterDrag,
    onFrameLeaveDrag,
  ]);

  // Logo-centered zoom configuration
  const getLogoZoomConfig = () => {
    const detectionBox = frame.detectionBox;
    const centerX = detectionBox.x + (detectionBox.width / 2);
    const centerY = detectionBox.y + (detectionBox.height / 2);
    
    switch (frame.confidence) {
      case 'Min': {
        return {
          transform: 'scale(1)',
          objectPosition: 'center center',
          detectionBoxScale: 1,
          detectionBoxOffset: { x: 0, y: 0 }
        };
      }
      
      case 'Mid': {
        const cropPadding = 40;
        const cropWidth = Math.min(100, detectionBox.width + cropPadding);
        const cropHeight = Math.min(100, detectionBox.height + cropPadding);
        
        const cropX = Math.max(0, Math.min(100 - cropWidth, centerX - cropWidth / 2));
        const cropY = Math.max(0, Math.min(100 - cropHeight, centerY - cropHeight / 2));
        
        const positionX = -cropX * (100 / cropWidth);
        const positionY = -cropY * (100 / cropHeight);
        const scale = 100 / Math.max(cropWidth, cropHeight);
        
        return {
          transform: `scale(${scale})`,
          objectPosition: `${positionX + (100 / cropWidth) * centerX}% ${positionY + (100 / cropHeight) * centerY}%`,
          detectionBoxScale: scale,
          detectionBoxOffset: { 
            x: (positionX + cropX * scale) / scale, 
            y: (positionY + cropY * scale) / scale 
          }
        };
      }
      
      case 'Max': {
        const cropPadding = 15;
        const cropWidth = Math.min(100, detectionBox.width + cropPadding);
        const cropHeight = Math.min(100, detectionBox.height + cropPadding);
        
        const cropX = Math.max(0, Math.min(100 - cropWidth, centerX - cropWidth / 2));
        const cropY = Math.max(0, Math.min(100 - cropHeight, centerY - cropHeight / 2));
        
        const positionX = -cropX * (100 / cropWidth);
        const positionY = -cropY * (100 / cropHeight);
        const scale = 100 / Math.max(cropWidth, cropHeight);
        
        return {
          transform: `scale(${scale})`,
          objectPosition: `${positionX + (100 / cropWidth) * centerX}% ${positionY + (100 / cropHeight) * centerY}%`,
          detectionBoxScale: scale,
          detectionBoxOffset: { 
            x: (positionX + cropX * scale) / scale, 
            y: (positionY + cropY * scale) / scale 
          }
        };
      }
      
      default:
        return {
          transform: 'scale(1)',
          objectPosition: 'center center',
          detectionBoxScale: 1,
          detectionBoxOffset: { x: 0, y: 0 }
        };
    }
  };

  const getImageStyling = () => {
    const config = getLogoZoomConfig();
    return {
      transform: config.transform,
      objectPosition: config.objectPosition,
      transformOrigin: 'center center',
    };
  };

  // Handle card click for selection
  const handleCardClick = (e: React.MouseEvent) => {
    if (dragState?.isDragging) return;
    
    const target = e.target as HTMLElement;
    const isButton = target.closest('button');
    const isBadge = target.closest('.badge');
    
    if (isButton || isBadge) return;
    
    onFocus();
    
    if (!isProcessed) {
      onToggle();
    }
  };

  // Get drag selection preview styling
  const getDragSelectionStyle = () => {
    if (!isInDragSelection || !dragState?.isDragging) return {};
    
    switch (dragState.action) {
      case 'select':
        // ENHANCED: Use amber colors for drag select since it creates double-selected state
        return { boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.5)' };
      case 'deselect':
        return { boxShadow: '0 0 0 3px rgba(156, 163, 175, 0.5)' };
      default:
        return {};
    }
  };

  // FIXED: Get card border styling with consistent border width to prevent flickering
  const getCardBorderStyle = () => {
    // FIXED: Use consistent border-2 (2px) for all states to prevent width changes
    if (isConfirmed) return 'border-2 border-green-500 bg-white';
    if (isRejected) return 'border-2 border-red-500 bg-white';
    if (isMarkedForRejection) return 'border-2 border-red-500 bg-red-50'; // RED: Marked for rejection
    if (isDoubleSelected) return 'border-2 border-amber-500 bg-amber-50'; // AMBER: Double selected (question mark state)
    if (isSelected && frame.individualSponsor) return 'border-2 border-green-500 bg-green-50'; // GREEN: Selected with individual sponsor (simplified to avoid gradient width issues)
    if (isSelected) return 'border-2 border-green-500 bg-green-50'; // GREEN: Selected
    if (isFocused && !isProcessed && !isSelected && !isDoubleSelected && !isMarkedForRejection) return 'border-2 border-blue-400 shadow-md';
    // FIXED: Use border-2 with transparent border for unselected state to maintain consistent sizing
    return 'border-2 border-gray-200 bg-white';
  };

  // Don't render rejected frames after confirmation
  if (isRejected && hasConfirmed) {
    return null;
  }

  // FIXED: Responsive Card with proper 4:3 aspect ratio and container width detection
  return (
    <div 
      ref={cardWrapperRef}
      style={getDragSelectionStyle()}
      className="transition-all duration-300"
    >
      <Card 
        className={`
          relative overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer
          ${getCardBorderStyle()}
        `}
        onClick={handleCardClick}
        style={{ 
          height: `${dimensions.totalHeight}px`,
          width: '100%', // Let grid control width - responsive
          // FIXED: No forced aspect ratio - let responsive calculations handle it
        }}
      >
        {/* CardContent with corrected last-child selector */}
        <CardContent className="[&:last-child]:p-0 pb-0 h-full flex flex-col">
          {/* Drag selection indicator */}
          {isInDragSelection && dragState?.isDragging && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div 
                className={`
                  absolute inset-0 border-2 border-dashed
                  ${dragState.action === 'select' ? 'border-amber-500 bg-amber-500/10' : ''}
                  ${dragState.action === 'deselect' ? 'border-gray-500 bg-gray-500/10' : ''}
                `}
              />
              <div className="absolute top-1 right-1 px-2 py-1 text-xs font-medium rounded text-white bg-black/70">
                {dragState.action === 'select' && 'Double Select'}
                {dragState.action === 'deselect' && 'Deselect'}
              </div>
            </div>
          )}

          {/* IMAGE SECTION - FIXED: Uses calculated responsive dimensions */}
          <div 
            className="relative overflow-hidden flex-1"
            style={{ height: `${dimensions.imageHeight}px` }}
          >
            <ImageWithFallback
              src={frame.imageUrl}
              alt={`Frame ${frame.id}`}
              className="w-full h-full object-cover transition-all duration-300"
              style={getImageStyling()}
            />
            
            {/* Detection box overlay */}
            {!isProcessed && (
              <div 
                className={getDetectionBoxClasses()}
                style={getDetectionBoxStyling()}
              />
            )}

            {/* Frame overlay for confirmed/rejected states */}
            {isConfirmed && <FrameOverlay type="confirmed" />}
            {isRejected && <FrameOverlay type="rejected" />}

            {/* Selection indicators for different states */}
            {isSelected && !isProcessed && (
              <div className="absolute top-2 right-2">
                {frame.individualSponsor ? (
                  // Individual sponsor assigned - show special checkmark with blue accent
                  <div className="relative">
                    <CheckCircle className={`${dimensions.selectionIconSize} text-green-500 bg-white rounded-full shadow-sm`} />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                  </div>
                ) : (
                  // Regular selected state
                  <CheckCircle className={`${dimensions.selectionIconSize} text-green-500 bg-white rounded-full shadow-sm`} />
                )}
              </div>
            )}

            {/* Double selected indicator - Question mark */}
            {isDoubleSelected && !isProcessed && (
              <div className="absolute top-2 right-2">
                <HelpCircle className={`${dimensions.selectionIconSize} text-amber-500 bg-white rounded-full shadow-sm`} />
              </div>
            )}

            {/* Marked for rejection indicator - Red trash can */}
            {isMarkedForRejection && !isProcessed && (
              <div className="absolute top-2 right-2">
                <Trash2 className={`${dimensions.selectionIconSize} text-red-500 bg-white rounded-full shadow-sm p-0.5`} />
              </div>
            )}

            {/* Click indicator for unselected frames */}
            {!isSelected && !isDoubleSelected && !isMarkedForRejection && !isProcessed && (
              <div className="absolute top-2 right-2 opacity-50 hover:opacity-100 transition-opacity">
                <div className={`${dimensions.selectionIconSize} border-2 border-gray-400 bg-white/80 rounded-full flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Click anywhere hint overlay */}
            {!dragState?.isDragging && !isSelected && !isDoubleSelected && !isMarkedForRejection && !isProcessed && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="bg-white/90 px-3 py-1 rounded-md text-xs text-gray-700 shadow-lg">
                  Click to select
                </div>
              </div>
            )}

            {/* Selected frame with individual sponsor hint overlay */}
            {!dragState?.isDragging && isSelected && frame.individualSponsor && !isProcessed && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="bg-white/90 px-3 py-1 rounded-md text-xs text-gray-700 shadow-lg">
                  Individual sponsor: {getIndividualSponsorText()}
                </div>
              </div>
            )}

            {/* Double selected hint overlay */}
            {!dragState?.isDragging && isDoubleSelected && !isProcessed && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="bg-white/90 px-3 py-1 rounded-md text-xs text-gray-700 shadow-lg">
                  {frame.individualSponsor ? 'Individual sponsor assigned' : 'Press D to reject, 1-9 for sponsor, or ESC to reset'}
                </div>
              </div>
            )}

            {/* Individual sponsor assignment indicator - shows for any frame with individual sponsor */}
            {frame.individualSponsor && !isProcessed && (
              <div className="absolute top-2 left-2">
                <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-sm">
                  {getIndividualSponsorText()}
                </div>
              </div>
            )}

            {/* Status overlay for processed frames */}
            {isProcessed && (
              <div className={`absolute ${dimensions.statusMargin}`}>
                <div className={`${dimensions.statusPadding} rounded ${dimensions.statusTextSize} font-medium text-center`}>
                  {isConfirmed && (
                    <span className="text-green-600 bg-white/95 px-0.5 py-0 rounded flex items-center justify-center" 
                          style={{ 
                            fontSize: framesPerRow >= 15 ? '6px' : undefined,
                            lineHeight: framesPerRow >= 15 ? '1' : undefined,
                            minHeight: framesPerRow >= 15 ? '12px' : undefined
                          }}>
                      <span className={dimensions.statusEmojiSize} 
                            style={{ 
                              fontSize: framesPerRow >= 15 ? '6px' : undefined,
                              lineHeight: '1'
                            }}>✅</span>
                      {framesPerRow < 15 && (
                        <span className="ml-1 truncate">{getConfirmedSponsorText()}</span>
                      )}
                      {framesPerRow >= 15 && (
                        <span className="ml-0.5" style={{ fontSize: '6px' }}>OK</span>
                      )}
                    </span>
                  )}
                  {isRejected && (
                    <span className="text-red-600 bg-white/95 px-0.5 py-0 rounded flex items-center justify-center"
                          style={{ 
                            fontSize: framesPerRow >= 15 ? '6px' : undefined,
                            lineHeight: framesPerRow >= 15 ? '1' : undefined,
                            minHeight: framesPerRow >= 15 ? '12px' : undefined
                          }}>
                      <span className={dimensions.statusEmojiSize}
                            style={{ 
                              fontSize: framesPerRow >= 15 ? '6px' : undefined,
                              lineHeight: '1'
                            }}>🗑️</span>
                      {framesPerRow < 15 && (
                        <span className="ml-1">Rejected</span>
                      )}
                      {framesPerRow >= 15 && (
                        <span className="ml-0.5" style={{ fontSize: '6px' }}>X</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* WHITE BOTTOM PORTION - FIXED: Exact 30px height with responsive button group */}
          <div 
            className="bg-white border-t border-gray-200 flex-shrink-0 relative z-20"
            style={{ height: `${dimensions.buttonHeight}px` }}
          >
            {/* BUTTON GROUP - FIXED: Responsive sizing with proper text/icon visibility */}
            <div className="h-full w-full flex overflow-hidden">
              {/* Min Zoom Button */}
              <Button
                size="sm"
                variant={frame.confidence === 'Min' ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isProcessed) onConfidenceChange('Min');
                }}
                disabled={isProcessed}
                className={`
                  flex-1 ${dimensions.buttonClasses}
                  pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center rounded-none border-0
                  ${dimensions.showText ? 'space-x-1' : ''}
                  ${frame.confidence === 'Min' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
                title="Zoom Out (Min)"
              >
                <ZoomOut className={dimensions.iconSize} />
                {dimensions.showText && <span>Min</span>}
              </Button>

              {/* Mid Zoom Button */}
              <Button
                size="sm"
                variant={frame.confidence === 'Mid' ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isProcessed) onConfidenceChange('Mid');
                }}
                disabled={isProcessed}
                className={`
                  flex-1 ${dimensions.buttonClasses}
                  pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center rounded-none border-0 border-l border-gray-300
                  ${dimensions.showText ? 'space-x-1' : ''}
                  ${frame.confidence === 'Mid' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
                title="Normal View (Mid)"
              >
                <Eye className={dimensions.iconSize} />
                {dimensions.showText && <span>Mid</span>}
              </Button>

              {/* Max Zoom Button */}
              <Button
                size="sm"
                variant={frame.confidence === 'Max' ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isProcessed) onConfidenceChange('Max');
                }}
                disabled={isProcessed}
                className={`
                  flex-1 ${dimensions.buttonClasses}
                  pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center rounded-none border-0 border-l border-gray-300
                  ${dimensions.showText ? 'space-x-1' : ''}
                  ${frame.confidence === 'Max' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
                title="Zoom In (Max)"
              >
                <ZoomIn className={dimensions.iconSize} />
                {dimensions.showText && <span>Max</span>}
              </Button>


            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}