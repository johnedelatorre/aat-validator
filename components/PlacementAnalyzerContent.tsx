import React, { useState, useMemo, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ValidationHeader } from './ValidationHeader';
import { FrameGrid } from './FrameGrid';
import { PageSettingsModal } from './PageSettingsModal';
import { toast } from 'sonner';
import { getPlacementTypesForRightsholderPlacement, type PlacementType } from '../constants/placements';
import { PlacementSelector, type SelectedPlacement } from './PlacementSelector';
import { generateMockFrames, groupFramesIntoRows } from '../utils/frameUtils';
import { createKeyboardNavigationHelpers } from '../utils/keyboardUtils';
import { Frame, DragState, PageSettings, RowTransition, ConfidenceLevel, DragAction, RowTransitionState } from '../types';

interface PlacementAnalyzerContentProps {
  isActive: boolean;
}

export interface PlacementAnalyzerContentRef {
  closeDropdown: () => void;
  forceCloseDropdown: () => void;
}

export const PlacementAnalyzerContent = forwardRef<PlacementAnalyzerContentRef, PlacementAnalyzerContentProps>(
  ({ isActive }, ref) => {
  // Page settings state
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    framesPerRow: 5,
    defaultZoomLevel: 'Mid'
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [currentBatch, setCurrentBatch] = useState(1);
  const [frames, setFrames] = useState<Frame[]>(() => generateMockFrames(1, pageSettings.defaultZoomLevel));
  const [queueCount, setQueueCount] = useState(199);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [validatedBatches, setValidatedBatches] = useState(0);
  const [selectedPlacement, setSelectedPlacement] = useState<SelectedPlacement | null>(null);
  
  const [autoPopulatedPlacementTypes, setAutoPopulatedPlacementTypes] = useState<PlacementType[]>([]);
  const [collapsedRows, setCollapsedRows] = useState<Set<number>>(new Set());
  const [rowTransitions, setRowTransitions] = useState<Map<number, RowTransition>>(new Map());
  
  const previouslyCompletedRowsRef = useRef<Set<number>>(new Set());
  const [focusedFrameId, setFocusedFrameId] = useState<string | null>(null);
  const framesRef = useRef<Frame[]>(frames);
  
  const keyboardNavigationRef = useRef<(e: KeyboardEvent) => void>();
  const workflowShortcutsRef = useRef<(e: KeyboardEvent) => void>();
  
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);
  
  const [isPlacementDropdownKeyboardOpen, setIsPlacementDropdownKeyboardOpen] = useState(false);
  const placementSelectorRef = useRef<{ openDropdown: () => void; closeDropdown: () => void } | null>(null);
  const lastActionToastRef = useRef<string | number | null>(null);
  const [showVideoDrawer, setShowVideoDrawer] = useState(false);
  
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    action: 'select',
    frameIds: new Set(),
  });

  // Calculate frame counts
  const greenSelectedCount = frames.filter(frame => frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection).length;
  const selectedCount = frames.filter(frame => frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection).length;
  const doubleSelectedCount = frames.filter(frame => frame.isSelected && frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection).length;
  const rejectedCount = frames.filter(frame => frame.isRejected).length;
  const confirmedCount = frames.filter(frame => frame.isConfirmed).length;
  const unprocessedCount = frames.filter(frame => !frame.isRejected && !frame.isConfirmed).length;
  const framesWithIndividualPlacements = frames.filter(frame => frame.individualSponsor && !frame.isRejected && !frame.isConfirmed).length;
  const allFramesProcessed = frames.filter(frame => !frame.isRejected && !frame.isConfirmed).length === 0;

  // Group frames into rows
  const frameRows = useMemo(() => groupFramesIntoRows(frames, pageSettings.framesPerRow), [frames, pageSettings.framesPerRow]);

  // Helper functions
  const isFrameProcessed = useCallback((frame: Frame): boolean => {
    return frame.isConfirmed || frame.isRejected;
  }, []);

  const isRowCompletelyProcessed = useCallback((rowFrames: Frame[]): boolean => {
    return rowFrames.length > 0 && rowFrames.every(frame => isFrameProcessed(frame));
  }, [isFrameProcessed]);

  // Auto-detect and populate placement types (similar to sponsor auto-detection)
  useEffect(() => {
    if (frames.length > 0 && autoPopulatedPlacementTypes.length === 0) {
      // Auto-populate with a default rightsholder-placement combination for demo
      // In real implementation, this would be based on frame analysis
      const defaultRightsholder = { id: 'ny-yankees', name: 'New York Yankees', league: 'MLB' as const, city: 'New York', teamName: 'Yankees' };
      const defaultPlacement = 'Uniform';
      
      const defaultPlacementTypes = getPlacementTypesForRightsholderPlacement(
        defaultRightsholder.name,
        defaultPlacement
      );
      
      setAutoPopulatedPlacementTypes(defaultPlacementTypes); // Show all placement types
      
      // Auto-select the default placement
      setSelectedPlacement({
        rightsholder: defaultRightsholder,
        placementName: defaultPlacement,
        displayName: `${defaultRightsholder.name} - ${defaultPlacement}`
      });
    }
  }, [frames, autoPopulatedPlacementTypes.length]);

  // When a placement is manually selected, update placement types
  useEffect(() => {
    if (selectedPlacement) {
      const placementTypes = getPlacementTypesForRightsholderPlacement(
        selectedPlacement.rightsholder.name,
        selectedPlacement.placementName
      );
      setAutoPopulatedPlacementTypes(placementTypes); // Show all placement types
    }
  }, [selectedPlacement]);

  // Organize rows with transitions
  const organizedRows = useMemo(() => {
    const unprocessedRows: { frames: Frame[]; originalIndex: number; transitionState?: RowTransitionState }[] = [];
    const completedRows: { frames: Frame[]; originalIndex: number; transitionState?: RowTransitionState }[] = [];

    frameRows.forEach((rowFrames, originalIndex) => {
      const isRowComplete = isRowCompletelyProcessed(rowFrames);
      const transition = rowTransitions.get(originalIndex);
      
      if (transition?.state === 'restoring' || transition?.state === 'expanding') {
        unprocessedRows.push({ 
          frames: rowFrames, 
          originalIndex,
          transitionState: transition.state
        });
      } else if (isRowComplete) {
        completedRows.push({ 
          frames: rowFrames, 
          originalIndex,
          transitionState: transition?.state || 'completed'
        });
      } else {
        unprocessedRows.push({ 
          frames: rowFrames, 
          originalIndex,
          transitionState: transition?.state || 'stable'
        });
      }
    });

    return [...unprocessedRows, ...completedRows];
  }, [frameRows, isRowCompletelyProcessed, rowTransitions]);

  // Toast utility
  const showCompletionToast = useCallback((message: string, description: string, type: 'success' | 'error' = 'success') => {
    toast.dismiss();
    
    const toastId = type === 'success' 
      ? toast.success(message, {
          description,
          duration: 1500,
          style: {
            background: '#10b981',
            color: '#ffffff',
            border: '1px solid #059669'
          }
        })
      : toast.error(message, {
          description,
          duration: 1500,
          style: {
            background: '#dc2626',
            color: '#ffffff',
            border: '1px solid #b91c1c'
          }
        });
    
    lastActionToastRef.current = toastId;
  }, []);

  // Frame state handlers
  const handleSelectAll = useCallback(() => {
    setFrames(prev => prev.map(frame => ({
      ...frame,
      isSelected: !frame.isRejected && !frame.isConfirmed ? true : frame.isSelected,
      isDoubleSelected: false,
      isMarkedForRejection: false
    })));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setFrames(prev => prev.map(frame => 
      frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection
        ? { 
            ...frame, 
            isSelected: true,
            isDoubleSelected: true,
            isMarkedForRejection: false
          }
        : frame
    ));
  }, []);

  // Keyboard navigation setup
  const keyboardHelpers = useMemo(() => 
    createKeyboardNavigationHelpers(framesRef, pageSettings, isFrameProcessed),
    [pageSettings, isFrameProcessed]
  );

  const handleKeyboardFrameSelect = useCallback((frameId: string) => {
    setFrames(prev => {
      const updatedFrames = prev.map(frame => 
        frame.id === frameId && !isFrameProcessed(frame)
          ? { 
              ...frame, 
              isSelected: true, 
              isDoubleSelected: true,
              isMarkedForRejection: false, 
              isConfirmed: false 
            }
          : frame
      );
      
      framesRef.current = updatedFrames;
      return updatedFrames;
    });
  }, [isFrameProcessed]);

  // Keyboard navigation handler
  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    if (!focusedFrameId || isPlacementDropdownKeyboardOpen || showVideoDrawer) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    const currentIndex = keyboardHelpers.getFrameIndex(focusedFrameId);
    if (currentIndex === -1) return;

    let newFrameId: string | null = null;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newFrameId = keyboardHelpers.findNextUnprocessedFrame(currentIndex, 'left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        newFrameId = keyboardHelpers.findNextUnprocessedFrame(currentIndex, 'right');
        break;
      case 'ArrowUp':
        e.preventDefault();
        newFrameId = keyboardHelpers.findNextUnprocessedFrame(currentIndex, 'up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        newFrameId = keyboardHelpers.findNextUnprocessedFrame(currentIndex, 'down');
        break;
      default:
        return;
    }

    if (newFrameId) {
      setFocusedFrameId(newFrameId);
      handleKeyboardFrameSelect(newFrameId);
    }
  }, [focusedFrameId, isPlacementDropdownKeyboardOpen, showVideoDrawer, keyboardHelpers, handleKeyboardFrameSelect]);

  // Placement selection handlers
  const handlePlacementSelect = (placement: SelectedPlacement | null) => {
    const doubleSelectedFrames = frames.filter(frame => frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed);
    
    if (doubleSelectedFrames.length > 0 && placement) {
      // For individual frame placement assignments, we need both placement and placement type
      // For now, we'll just set the global placement
      setSelectedPlacement(placement);
    } else {
      setSelectedPlacement(placement);
    }
    
    if (isPlacementDropdownKeyboardOpen) {
      setIsPlacementDropdownKeyboardOpen(false);
    }
  };

  const handlePlacementDropdownClose = useCallback(() => {
    setIsPlacementDropdownKeyboardOpen(false);
  }, []);

  // Workflow shortcuts handler
  const handleWorkflowShortcuts = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        showSettingsModal) {
      return;
    }

    if (e.key === 'Escape' && showVideoDrawer) {
      e.preventDefault();
      setShowVideoDrawer(false);
      return;
    }

    // Number keys 0-9 for placement type selection (first 10 placement types)
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
      e.preventDefault();
      const numberPressed = parseInt(e.key);
      const placementTypeIndex = numberPressed;
      
      if (placementTypeIndex < autoPopulatedPlacementTypes.length) {
        const placementType = autoPopulatedPlacementTypes[placementTypeIndex];
        
        const doubleSelectedFrames = framesRef.current.filter(frame => frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed);
        
        if (doubleSelectedFrames.length > 0) {
          setFrames(prev => prev.map(frame => 
            frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed
              ? { 
                  ...frame, 
                  individualSponsor: placementType.id, // Reusing this field for placement type
                  isSelected: true,
                  isDoubleSelected: false
                }
              : frame
          ));
          
          showCompletionToast(`✅ Applied ${placementType.name}!`, `Assigned "${placementType.name}" to ${doubleSelectedFrames.length} frames.`);
        }
      }
      return;
    }

    const isSelectAllCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a';
    const isDeselectAllCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd';
    
    if ((e.ctrlKey || e.metaKey || e.altKey) && !isSelectAllCombo && !isDeselectAllCombo) {
      return;
    }
    
    switch (e.key.toLowerCase()) {
      case 'a':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          const unprocessedFrames = framesRef.current.filter(frame => !frame.isRejected && !frame.isConfirmed);
          if (unprocessedFrames.length > 0) {
            handleSelectAll();
          }
        }
        break;
        
      case 'd':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          const selectableFrames = framesRef.current.filter(frame => frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection);
          if (selectableFrames.length > 0) {
            handleDeselectAll();
          }
        } else {
          e.preventDefault();
          const doubleSelectedFrames = framesRef.current.filter(frame => frame.isSelected && frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection);
          
          if (doubleSelectedFrames.length > 0) {
            setFrames(prev => prev.map(frame => 
              frame.isSelected && frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection
                ? { 
                    ...frame, 
                    isMarkedForRejection: true,
                    isSelected: false,
                    isDoubleSelected: false,
                    individualSponsor: undefined
                  }
                : frame
            ));
            
            if (focusedFrameId && doubleSelectedFrames.some(frame => frame.id === focusedFrameId)) {
              setFocusedFrameId(null);
            }
          }
        }
        break;

      case 'n':
        e.preventDefault();
        {
          const currentIndex = focusedFrameId ? keyboardHelpers.getFrameIndex(focusedFrameId) : -1;
          const nextFrameId = keyboardHelpers.findNextUnprocessedFrameSequential(currentIndex);
          
          if (nextFrameId) {
            setFocusedFrameId(nextFrameId);
            handleKeyboardFrameSelect(nextFrameId);
          }
        }
        break;
        
      case 'p':
        e.preventDefault();
        {
          const currentIndex = focusedFrameId ? keyboardHelpers.getFrameIndex(focusedFrameId) : -1;
          const prevFrameId = keyboardHelpers.findPreviousUnprocessedFrameSequential(currentIndex);
          
          if (prevFrameId) {
            setFocusedFrameId(prevFrameId);
            handleKeyboardFrameSelect(prevFrameId);
          }
        }
        break;

      case 's':
        e.preventDefault();
        {
          // Always allow opening placement selector, even without selected frames
          setIsPlacementDropdownKeyboardOpen(true);
          if (placementSelectorRef.current) {
            placementSelectorRef.current.openDropdown();
          }
        }
        break;
        
      case 'r':
        e.preventDefault();
        {
          const selectedFrames = framesRef.current.filter(frame => (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed);
          
          if (selectedFrames.length > 0) {
            setFrames(prev => prev.map(frame => 
              (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed
                ? { 
                    ...frame, 
                    isRejected: true,
                    isSelected: false,
                    isDoubleSelected: false,
                    isMarkedForRejection: false,
                    isConfirmed: false,
                    individualSponsor: undefined,
                    sponsorAnnotations: []
                  }
                : frame
            ));
            
            if (focusedFrameId && selectedFrames.some(frame => frame.id === focusedFrameId)) {
              setFocusedFrameId(null);
            }
            
            showCompletionToast(`✅ ${selectedFrames.length} frames rejected!`, 'Selected frames have been immediately rejected.');
          }
        }
        break;
        
      case 'c':
        e.preventDefault();
        {
          const selectedFrames = framesRef.current.filter(frame => (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection);
          const markedForRejectionFrames = framesRef.current.filter(frame => frame.isMarkedForRejection && !frame.isRejected);
          
          if (selectedFrames.length === 0 && markedForRejectionFrames.length === 0) {
            const unprocessedFrames = framesRef.current.filter(frame => !frame.isRejected && !frame.isConfirmed);
            if (unprocessedFrames.length === 0) {
              return;
            }
            return;
          }

          const framesWithIndividualPlacements = selectedFrames.filter(frame => frame.individualSponsor);
          const framesNeedingGlobalPlacement = selectedFrames.filter(frame => !frame.individualSponsor);
          
          if (framesNeedingGlobalPlacement.length > 0 && !selectedPlacement) {
            return;
          }

          setFrames(prev => prev.map(frame => {
            if ((frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection) {
              const placementToUse = frame.individualSponsor || (selectedPlacement?.displayName);
              if (placementToUse) {
                return {
                  ...frame, 
                  isConfirmed: true, 
                  isSelected: false,
                  isDoubleSelected: false,
                  individualSponsor: undefined,
                  sponsorAnnotations: [...new Set([...frame.sponsorAnnotations, placementToUse])]
                };
              }
            }
            if (frame.isMarkedForRejection && !frame.isRejected) {
              return {
                ...frame,
                isRejected: true,
                isMarkedForRejection: false,
                isSelected: false,
                isDoubleSelected: false,
                isConfirmed: false,
                individualSponsor: undefined,
                sponsorAnnotations: []
              };
            }
            return frame;
          }));
          
          if (focusedFrameId && (selectedFrames.some(frame => frame.id === focusedFrameId) || markedForRejectionFrames.some(frame => frame.id === focusedFrameId))) {
            setFocusedFrameId(null);
          }
          
          const confirmedCount = selectedFrames.filter(frame => frame.individualSponsor || selectedPlacement).length;
          const rejectedCount = markedForRejectionFrames.length;
          const individualAssignments = framesWithIndividualPlacements.length;
          
          if (confirmedCount > 0 && rejectedCount > 0) {
            const message = individualAssignments > 0 
              ? `${confirmedCount} frames confirmed (${individualAssignments} individual assignments), ${rejectedCount} frames rejected.`
              : `${confirmedCount} frames confirmed with ${selectedPlacement?.displayName}, ${rejectedCount} frames rejected.`;
            showCompletionToast(`✅ Batch confirmed!`, message);
          } else if (confirmedCount > 0) {
            const message = individualAssignments > 0
              ? `${confirmedCount} frames confirmed (${individualAssignments} individual assignments).`
              : `Frames annotated with ${selectedPlacement?.displayName}.`;
            showCompletionToast(`✅ ${confirmedCount} frames confirmed!`, message);
          } else if (rejectedCount > 0) {
            showCompletionToast(`✅ ${rejectedCount} frames rejected!`, 'Marked frames have been finalized as rejected.');
          }
        }
        break;
        
      case 'escape':
        e.preventDefault();
        if (isPlacementDropdownKeyboardOpen) {
          setIsPlacementDropdownKeyboardOpen(false);
          if (placementSelectorRef.current) {
            placementSelectorRef.current.closeDropdown();
          }
        } else {
          const doubleSelectedFrames = framesRef.current.filter(frame => frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed);
          
          if (doubleSelectedFrames.length > 0) {
            setFrames(prev => prev.map(frame => 
              frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed
                ? { 
                    ...frame, 
                    isSelected: true,
                    isDoubleSelected: false,
                    isMarkedForRejection: false
                  }
                : frame
            ));
          }
        }
        break;
        
      default:
        return;
    }
  }, [showSettingsModal, selectedPlacement, focusedFrameId, isPlacementDropdownKeyboardOpen, showVideoDrawer, autoPopulatedPlacementTypes, keyboardHelpers, handleSelectAll, handleDeselectAll, handleKeyboardFrameSelect, showCompletionToast]);

  // Row completion effect
  useEffect(() => {
    const currentlyCompletedRows = new Set<number>();

    organizedRows.forEach(({ frames: rowFrames, originalIndex }) => {
      const isRowComplete = isRowCompletelyProcessed(rowFrames);
      const transition = rowTransitions.get(originalIndex);
      
      if (isRowComplete && transition?.state !== 'restoring' && transition?.state !== 'expanding') {
        currentlyCompletedRows.add(originalIndex);
      }
    });

    currentlyCompletedRows.forEach(rowIndex => {
      const wasAlreadyCompleted = previouslyCompletedRowsRef.current.has(rowIndex);
      const currentTransition = rowTransitions.get(rowIndex);
      
      if (!wasAlreadyCompleted && (!currentTransition || currentTransition.state === 'stable')) {
        setRowTransitions(prev => new Map(prev).set(rowIndex, {
          originalIndex: rowIndex,
          state: 'fading-out',
          timestamp: Date.now()
        }));

        setTimeout(() => {
          setRowTransitions(prev => new Map(prev).set(rowIndex, {
            originalIndex: rowIndex,
            state: 'moving',
            timestamp: Date.now()
          }));

          setTimeout(() => {
            setCollapsedRows(prev => new Set(prev).add(rowIndex));
            
            setRowTransitions(prev => new Map(prev).set(rowIndex, {
              originalIndex: rowIndex,
              state: 'fading-in',
              timestamp: Date.now()
            }));

            setTimeout(() => {
              setRowTransitions(prev => new Map(prev).set(rowIndex, {
                originalIndex: rowIndex,
                state: 'completed',
                timestamp: Date.now()
              }));
            }, 400);
          }, 100);
        }, 400);
      }
    });

    previouslyCompletedRowsRef.current = currentlyCompletedRows;
  }, [organizedRows, isRowCompletelyProcessed, rowTransitions]);

  // Batch completion effect
  useEffect(() => {
    if (allFramesProcessed && frames.length > 0 && !hasConfirmed && (frames.filter(f => f.isConfirmed).length > 0 || frames.filter(f => f.isRejected).length > 0)) {
      toast.dismiss();
      
      toast.success(`🎉 Batch ${currentBatch} completed!`, {
        description: `${frames.filter(f => f.isConfirmed).length} confirmed, ${frames.filter(f => f.isRejected).length} rejected. Loading next batch...`,
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#ffffff',
          border: '1px solid #059669'
        }
      });
      
      setHasConfirmed(true);
      
      setTimeout(() => {
        const nextBatch = currentBatch + 1;
        setCurrentBatch(nextBatch);
        const newFrames = generateMockFrames(nextBatch, pageSettings.defaultZoomLevel);
        setFrames(newFrames);
        setQueueCount(prev => Math.max(0, prev - 1));
        setValidatedBatches(prev => prev + 1);
        setHasConfirmed(false);
        
        setSelectedPlacement(null);
        setCollapsedRows(new Set());
        setFocusedFrameId(null);
        previouslyCompletedRowsRef.current = new Set();
        lastActionToastRef.current = null;
        setRowTransitions(new Map());
        setIsPlacementDropdownKeyboardOpen(false);
      }, 1500);
    }
  }, [allFramesProcessed, frames.length, hasConfirmed, currentBatch, pageSettings.defaultZoomLevel, frames]);

  // Keyboard event listeners
  useEffect(() => {
    // Only add event listeners when this tab is active
    if (!isActive) return;

    keyboardNavigationRef.current = handleKeyboardNavigation;
    workflowShortcutsRef.current = handleWorkflowShortcuts;
    
    const stableKeyboardNavigationHandler = (e: KeyboardEvent) => {
      if (keyboardNavigationRef.current) {
        keyboardNavigationRef.current(e);
      }
    };
    
    const stableWorkflowShortcutsHandler = (e: KeyboardEvent) => {
      if (workflowShortcutsRef.current) {
        workflowShortcutsRef.current(e);
      }
    };

    document.addEventListener('keydown', stableKeyboardNavigationHandler);
    document.addEventListener('keydown', stableWorkflowShortcutsHandler);
    
    return () => {
      document.removeEventListener('keydown', stableKeyboardNavigationHandler);
      document.removeEventListener('keydown', stableWorkflowShortcutsHandler);
    };
  }, [isActive]);

  useEffect(() => {
    keyboardNavigationRef.current = handleKeyboardNavigation;
  }, [handleKeyboardNavigation]);

  useEffect(() => {
    workflowShortcutsRef.current = handleWorkflowShortcuts;
  }, [handleWorkflowShortcuts]);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    closeDropdown: () => {
      if (placementSelectorRef.current) {
        placementSelectorRef.current.closeDropdown();
      }
    },
    forceCloseDropdown: () => {
      // Immediately close dropdown without animation for tab switches
      setIsPlacementDropdownKeyboardOpen(false);
      if (placementSelectorRef.current) {
        placementSelectorRef.current.closeDropdown();
      }
    }
  }));

  // Settings save handler
  const handleSettingsSave = (newSettings: PageSettings) => {
    const oldSettings = pageSettings;
    setPageSettings(newSettings);
    
    if (oldSettings.defaultZoomLevel !== newSettings.defaultZoomLevel) {
      setFrames(prev => prev.map(frame => ({
        ...frame,
        confidence: newSettings.defaultZoomLevel
      })));
    }
    
    if (oldSettings.framesPerRow !== newSettings.framesPerRow) {
      setFocusedFrameId(null);
    }
    
    showCompletionToast('✅ Settings updated!', 'Your page settings have been saved.');
  };

  // Frame interaction handlers
  const handleFrameToggle = (frameId: string) => {
    if (showVideoDrawer) return;
    
    setFrames(prev => {
      const updatedFrames = prev.map(frame => {
        if (frame.id === frameId && !isFrameProcessed(frame)) {
          
          if (frame.isMarkedForRejection) {
            return {
              ...frame,
              isSelected: true,
              isDoubleSelected: false,
              isMarkedForRejection: false,
              isConfirmed: false
            };
          }
          
          if (frame.isDoubleSelected) {
            return {
              ...frame,
              isSelected: true,
              isDoubleSelected: false,
              isMarkedForRejection: false,
              isConfirmed: false
            };
          }
          
          if (frame.isSelected && !frame.isDoubleSelected) {
            return {
              ...frame,
              isSelected: true,
              isDoubleSelected: true,
              isMarkedForRejection: false,
              isConfirmed: false
            };
          }
          
          if (!frame.isSelected && !frame.isDoubleSelected && !frame.isMarkedForRejection) {
            return {
              ...frame,
              isSelected: true,
              isDoubleSelected: false,
              isMarkedForRejection: false,
              isConfirmed: false
            };
          }
          
          return frame;
        }
        return frame;
      });
      
      framesRef.current = updatedFrames;
      return updatedFrames;
    });
  };

  const handleFrameReject = (frameId: string) => {
    if (showVideoDrawer) return;
    
    setFrames(prev => prev.map(frame => 
      frame.id === frameId 
        ? { 
            ...frame, 
            isRejected: !frame.isRejected, 
            isSelected: false, 
            isDoubleSelected: false,
            isMarkedForRejection: false,
            isConfirmed: false,
            individualSponsor: frame.isRejected ? frame.individualSponsor : undefined,
            sponsorAnnotations: frame.isRejected ? frame.sponsorAnnotations : []
          }
        : frame
    ));
  };

  const handleConfidenceChange = (frameId: string, confidence: ConfidenceLevel) => {
    setFrames(prev => prev.map(frame => 
      frame.id === frameId 
        ? { ...frame, confidence }
        : frame
    ));
  };

  const handleFrameFocus = (frameId: string) => {
    if (showVideoDrawer) return;
    
    const frame = frames.find(f => f.id === frameId);
    if (frame && !isFrameProcessed(frame)) {
      setFocusedFrameId(frameId);
    }
  };

  // Button handlers
  const handleReject = () => {
    const selectedFrames = frames.filter(frame => (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed);
    
    if (selectedFrames.length > 0) {
      setFrames(prev => prev.map(frame => 
        (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed
          ? { 
              ...frame, 
              isRejected: true,
              isSelected: false,
              isDoubleSelected: false,
              isMarkedForRejection: false,
              isConfirmed: false,
              individualSponsor: undefined,
              sponsorAnnotations: []
            }
          : frame
      ));
      
      if (focusedFrameId && selectedFrames.some(frame => frame.id === focusedFrameId)) {
        setFocusedFrameId(null);
      }
      
      showCompletionToast(`✅ ${selectedFrames.length} frames rejected!`, 'Selected frames have been immediately rejected.');
    }
  };

  const handleConfirm = () => {
    const selectedFrames = frames.filter(frame => (frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection);
    const markedForRejectionFrames = frames.filter(frame => frame.isMarkedForRejection && !frame.isRejected);
    
    if (selectedFrames.length === 0 && markedForRejectionFrames.length === 0) {
      return;
    }

    const framesWithIndividualPlacements = selectedFrames.filter(frame => frame.individualSponsor);
    const framesNeedingGlobalPlacement = selectedFrames.filter(frame => !frame.individualSponsor);
    
    if (framesNeedingGlobalPlacement.length > 0 && !selectedPlacement) {
      return;
    }

    setFrames(prev => prev.map(frame => {
      if ((frame.isSelected || frame.isDoubleSelected) && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection) {
        const placementToUse = frame.individualSponsor || (selectedPlacement?.displayName);
        if (placementToUse) {
          return {
            ...frame, 
            isConfirmed: true, 
            isSelected: false,
            isDoubleSelected: false,
            individualSponsor: undefined,
            sponsorAnnotations: [...new Set([...frame.sponsorAnnotations, placementToUse])]
          };
        }
      }
      if (frame.isMarkedForRejection && !frame.isRejected) {
        return {
          ...frame,
          isRejected: true,
          isMarkedForRejection: false,
          isSelected: false,
          isDoubleSelected: false,
          isConfirmed: false,
          individualSponsor: undefined,
          sponsorAnnotations: []
        };
      }
      return frame;
    }));
    
    if (focusedFrameId && (selectedFrames.some(frame => frame.id === focusedFrameId) || markedForRejectionFrames.some(frame => frame.id === focusedFrameId))) {
      setFocusedFrameId(null);
    }
    
    const confirmedCount = selectedFrames.filter(frame => frame.individualSponsor || selectedPlacement).length;
    const rejectedCount = markedForRejectionFrames.length;
    const individualAssignments = framesWithIndividualPlacements.length;
    
    if (confirmedCount > 0 && rejectedCount > 0) {
      const message = individualAssignments > 0 
        ? `${confirmedCount} frames confirmed (${individualAssignments} individual assignments), ${rejectedCount} frames rejected.`
        : `${confirmedCount} frames confirmed with ${selectedPlacement?.displayName}, ${rejectedCount} frames rejected.`;
      showCompletionToast(`✅ Batch confirmed!`, message);
    } else if (confirmedCount > 0) {
      const message = individualAssignments > 0
        ? `${confirmedCount} frames confirmed (${individualAssignments} individual assignments).`
        : `Frames annotated with ${selectedPlacement?.displayName}.`;
      showCompletionToast(`✅ ${confirmedCount} frames confirmed!`, message);
    } else if (rejectedCount > 0) {
      showCompletionToast(`✅ ${rejectedCount} frames rejected!`, 'Marked frames have been finalized as rejected.');
    }
  };

  // Row handlers
  const handleRowSelectAll = (originalRowIndex: number) => {
    const rowFrameIds = frameRows[originalRowIndex].map(frame => frame.id);
    
    setFrames(prev => prev.map(frame => 
      rowFrameIds.includes(frame.id) && !frame.isRejected && !frame.isConfirmed
        ? { 
            ...frame, 
            isSelected: true, 
            isDoubleSelected: false,
            isMarkedForRejection: false 
          }
        : frame
    ));
  };

  const handleRowDeselectAll = (originalRowIndex: number) => {
    const rowFrameIds = frameRows[originalRowIndex].map(frame => frame.id);
    setFrames(prev => prev.map(frame => 
      rowFrameIds.includes(frame.id) && frame.isSelected && !frame.isDoubleSelected && !frame.isRejected && !frame.isConfirmed && !frame.isMarkedForRejection
        ? { 
            ...frame, 
            isSelected: true,
            isDoubleSelected: true,
            isMarkedForRejection: false
          }
        : frame
    ));
  };

  const handleRowRejectAll = (originalRowIndex: number) => {
    const rowFrameIds = frameRows[originalRowIndex].filter(frame => !frame.isRejected && !frame.isConfirmed).map(frame => frame.id);
    
    if (rowFrameIds.length > 0) {
      setFrames(prev => prev.map(frame => 
        rowFrameIds.includes(frame.id)
          ? { 
              ...frame, 
              isRejected: true,
              isSelected: false,
              isDoubleSelected: false,
              isMarkedForRejection: false,
              isConfirmed: false,
              individualSponsor: undefined,
              sponsorAnnotations: []
            }
          : frame
      ));
      
      if (focusedFrameId && rowFrameIds.includes(focusedFrameId)) {
        setFocusedFrameId(null);
      }
      
      showCompletionToast(`✅ Row ${originalRowIndex + 1} rejected!`, `${rowFrameIds.length} frames rejected.`);
    }
  };

  const handleRowRestoreAll = (originalRowIndex: number) => {
    const rowFrameIds = frameRows[originalRowIndex].map(frame => frame.id);
    
    setRowTransitions(prev => new Map(prev).set(originalRowIndex, {
      originalIndex: originalRowIndex,
      state: 'restoring',
      timestamp: Date.now()
    }));

    setFrames(prev => prev.map(frame => 
      rowFrameIds.includes(frame.id)
        ? { 
            ...frame, 
            isRejected: false, 
            isConfirmed: false, 
            isMarkedForRejection: false,
            isDoubleSelected: false,
            isSelected: true,
            sponsorAnnotations: []
          }
        : frame
    ));

    setTimeout(() => {
      setCollapsedRows(prev => {
        const newCollapsed = new Set(prev);
        newCollapsed.delete(originalRowIndex);
        return newCollapsed;
      });

      previouslyCompletedRowsRef.current.delete(originalRowIndex);

      setRowTransitions(prev => new Map(prev).set(originalRowIndex, {
        originalIndex: originalRowIndex,
        state: 'expanding',
        timestamp: Date.now()
      }));

      setTimeout(() => {
        setRowTransitions(prev => new Map(prev).set(originalRowIndex, {
          originalIndex: originalRowIndex,
          state: 'stable',
          timestamp: Date.now()
        }));
      }, 400);
    }, 300);
  };

  const handleRowZoomChange = (originalRowIndex: number, confidence: ConfidenceLevel) => {
    const rowFrameIds = frameRows[originalRowIndex].map(frame => frame.id);
    setFrames(prev => prev.map(frame => 
      rowFrameIds.includes(frame.id)
        ? { ...frame, confidence }
        : frame
    ));
  };

  const handleRowToggle = (originalRowIndex: number) => {
    setCollapsedRows(prev => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(originalRowIndex)) {
        newCollapsed.delete(originalRowIndex);
      } else {
        newCollapsed.add(originalRowIndex);
      }
      return newCollapsed;
    });
  };

  // Drag handlers
  const handleDragStart = useCallback((e: React.MouseEvent, action: DragAction = 'select') => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    setDragState({
      isDragging: true,
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      action,
      frameIds: new Set(),
    });
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setDragState(prev => ({
      ...prev,
      currentX,
      currentY,
    }));
  }, [dragState.isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;
    
    if (dragState.frameIds.size > 0) {
      const frameIdsArray = Array.from(dragState.frameIds);
      
      setFrames(prev => {
        const updatedFrames = prev.map(frame => {
          if (frameIdsArray.includes(frame.id) && !isFrameProcessed(frame)) {
            switch (dragState.action) {
              case 'select':
                return { 
                  ...frame, 
                  isSelected: true,
                  isDoubleSelected: true,
                  isMarkedForRejection: false, 
                  isConfirmed: false 
                };
              case 'deselect':
                return { 
                  ...frame, 
                  isSelected: false,
                  isDoubleSelected: false,
                  isMarkedForRejection: false
                };
              default:
                return frame;
            }
          }
          return frame;
        });
        
        framesRef.current = updatedFrames;
        return updatedFrames;
      });
    }
    
    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      action: 'select',
      frameIds: new Set(),
    });
  }, [dragState, isFrameProcessed]);

  const handleFrameEnterDrag = useCallback((frameId: string) => {
    if (!dragState.isDragging) return;
    
    const frame = framesRef.current.find(f => f.id === frameId);
    if (frame && !isFrameProcessed(frame)) {
      setDragState(prev => ({
        ...prev,
        frameIds: new Set([...prev.frameIds, frameId]),
      }));
    }
  }, [dragState.isDragging, isFrameProcessed]);

  const handleFrameLeaveDrag = useCallback((frameId: string) => {
    if (!dragState.isDragging) return;
    
    setDragState(prev => {
      const newFrameIds = new Set(prev.frameIds);
      newFrameIds.delete(frameId);
      return {
        ...prev,
        frameIds: newFrameIds,
      };
    });
  }, [dragState.isDragging]);

  const handleGridMouseDown = useCallback((e: React.MouseEvent) => {
    if (showVideoDrawer) return;
    
    let action: DragAction = 'select';
    
    if (e.shiftKey) {
      action = 'deselect';
    }
    
    handleDragStart(e, action);
  }, [handleDragStart, showVideoDrawer]);

  // Frame state calculations
  const unprocessedFrames = frames.filter(frame => !frame.isRejected && !frame.isConfirmed);
  const allUnprocessedFramesSelected = unprocessedFrames.length > 0 && unprocessedFrames.every(frame => frame.isSelected || frame.isDoubleSelected || frame.isMarkedForRejection);
  const hasSelectableFrames = unprocessedFrames.length > 0;
  const hasDoubleSelectedFrames = unprocessedFrames.some(frame => frame.isDoubleSelected);
  const allUnprocessedFramesDoubleSelected = unprocessedFrames.length > 0 && unprocessedFrames.every(frame => frame.isDoubleSelected && frame.isSelected);

  return (
    <div className="h-full">
      <div className="pt-4">
        <ValidationHeader
          title="Placement Analyzer"
          queueCount={queueCount}
          selectedCount={selectedCount + doubleSelectedCount}
          greenSelectedCount={greenSelectedCount}
          onReject={handleReject}
          onConfirm={handleConfirm}
          hasConfirmed={hasConfirmed}
          showCompletion={false}
          // Pass placement-specific props
          selectedPlacement={selectedPlacement}
          autoPopulatedPlacementTypes={autoPopulatedPlacementTypes}
          onPlacementSelect={handlePlacementSelect}
          allFramesSelected={allUnprocessedFramesSelected}
          hasSelectableFrames={hasSelectableFrames}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          confirmedCount={confirmedCount}
          rejectedCount={rejectedCount}
          unprocessedCount={unprocessedCount}
          placementSelectorRef={placementSelectorRef}
          isPlacementDropdownKeyboardOpen={isPlacementDropdownKeyboardOpen}
          onPlacementDropdownClose={handlePlacementDropdownClose}
          framesWithIndividualPlacements={framesWithIndividualPlacements}
          hasDoubleSelectedFrames={hasDoubleSelectedFrames}
          allFramesDoubleSelected={allUnprocessedFramesDoubleSelected}
          onOpenSettings={() => setShowSettingsModal(true)}
          onOpenVideoDrawer={() => setShowVideoDrawer(true)}
        />
      </div>
      
      <main className="pt-0">
        <FrameGrid
          frames={frames}
          frameRows={frameRows}
          organizedRows={organizedRows}
          collapsedRows={collapsedRows}
          rowTransitions={rowTransitions}
          currentBatch={currentBatch}
          validatedBatches={validatedBatches}
          focusedFrameId={focusedFrameId}
          onFrameToggle={handleFrameToggle}
          onFrameReject={handleFrameReject}
          onConfidenceChange={handleConfidenceChange}
          onFrameFocus={handleFrameFocus}
          onRowSelectAll={handleRowSelectAll}
          onRowDeselectAll={handleRowDeselectAll}
          onRowRejectAll={handleRowRejectAll}
          onRowRestoreAll={handleRowRestoreAll}
          onRowZoomChange={handleRowZoomChange}
          onRowToggle={handleRowToggle}
          hasConfirmed={hasConfirmed}
          dragState={dragState}
          onDragStart={handleGridMouseDown}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onFrameEnterDrag={handleFrameEnterDrag}
          onFrameLeaveDrag={handleFrameLeaveDrag}
          showVideoDrawer={showVideoDrawer}
          onCloseVideoDrawer={() => setShowVideoDrawer(false)}
          sponsors={[]} // No sponsors for placement analyzer
          allFrames={frames}
        />
      </main>
      
      <PageSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentSettings={pageSettings}
        onSave={handleSettingsSave}
      />
    </div>
  );
}); 