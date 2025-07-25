export type ConfidenceLevel = 'Min' | 'Mid' | 'Max';
export type DetectionQuality = 'clear' | 'unclear';
export type DragAction = 'select' | 'deselect' | 'reject';
export type RowTransitionState = 'stable' | 'fading-out' | 'moving' | 'fading-in' | 'collapsing' | 'completed' | 'restoring' | 'expanding';

export interface Sponsor {
  id: string;
  name: string;
  category: string;
  tagline: string;
  logoUrl: string;
}

export interface Frame {
  id: string;
  imageUrl: string;
  isSelected: boolean;
  isDoubleSelected: boolean;
  isRejected: boolean;
  isMarkedForRejection: boolean;
  isConfirmed: boolean;
  confidence: ConfidenceLevel;
  clarityLevel: number;
  detectionBox: {
    x: number;
    y: number;
    width: number;
    height: number;
    quality: DetectionQuality;
  };
  sponsorAnnotations: string[];
  individualSponsor?: string;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  action: DragAction;
  frameIds: Set<string>;
}

export interface ValidationSummary {
  totalFrames: number;
  selectedFrames: number;
  rejectedFrames: number;
  completionTime: string;
  avgClarityLevel: number;
}

export interface PageSettings {
  framesPerRow: number;
  defaultZoomLevel: ConfidenceLevel;
}

export interface RowTransition {
  originalIndex: number;
  state: RowTransitionState;
  timestamp: number;
}