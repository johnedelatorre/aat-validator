import { DetectionQuality } from '../types';

// Actual frame images from the sponsor analysis tool
const frameImages = [
  '/images/frame_0.jpg',
  '/images/frame_1.jpg',
  '/images/frame_30.jpg',
  '/images/frame_90.jpg',
  '/images/frame_120.jpg',
  '/images/frame_150.jpg',
  '/images/frame_180.jpg',
  '/images/frame_210.jpg',
  '/images/frame_240.jpg',
  '/images/frame_270.jpg',
  '/images/frame_360.jpg',
  '/images/frame_480.jpg',
  '/images/frame_630.jpg',
  '/images/frame_2040.jpg',
  '/images/frame_2160.jpg',
  '/images/frame_2220.jpg',
  '/images/frame_2280.jpg',
  '/images/frame_2340.jpg',
  '/images/frame_2400.jpg',
  '/images/frame_2460.jpg',
  '/images/frame_2520.jpg',
  '/images/frame_2580.jpg',
  '/images/frame_2700.jpg',
  '/images/frame_2760.jpg',
  '/images/frame_2820.jpg',
];

export const baseballImages = frameImages;

// Realistic detection boxes for sponsor analysis - positioned as percentages (0-100)
export const realisticDetectionBoxes = [
  // Clear detections (yellow borders) - high confidence sponsor logo detections
  { x: 10, y: 15, width: 25, height: 12, quality: 'clear' as DetectionQuality },   // Top left sponsor banner
  { x: 70, y: 8, width: 20, height: 10, quality: 'clear' as DetectionQuality },    // Top right logo
  { x: 45, y: 75, width: 30, height: 15, quality: 'clear' as DetectionQuality },   // Bottom center sponsor text
  { x: 5, y: 45, width: 18, height: 20, quality: 'clear' as DetectionQuality },    // Left side vertical banner
  { x: 75, y: 55, width: 20, height: 12, quality: 'clear' as DetectionQuality },   // Right side horizontal logo
  { x: 25, y: 25, width: 22, height: 8, quality: 'clear' as DetectionQuality },    // Upper center sponsor text
  { x: 85, y: 85, width: 12, height: 8, quality: 'clear' as DetectionQuality },    // Bottom right corner logo
  { x: 15, y: 85, width: 25, height: 6, quality: 'clear' as DetectionQuality },    // Bottom left sponsor banner
  
  // Unclear detections (red borders) - lower confidence, need manual review
  { x: 55, y: 40, width: 15, height: 10, quality: 'unclear' as DetectionQuality }, // Center area (partially obscured)
  { x: 35, y: 10, width: 18, height: 8, quality: 'unclear' as DetectionQuality },  // Top center (blurry/distant)
  { x: 90, y: 25, width: 8, height: 12, quality: 'unclear' as DetectionQuality },  // Far right edge (partial)
  { x: 2, y: 5, width: 12, height: 6, quality: 'unclear' as DetectionQuality },    // Top left corner (cut off)
  { x: 60, y: 65, width: 12, height: 15, quality: 'unclear' as DetectionQuality }, // Lower right (crowd obstruction)
  { x: 25, y: 50, width: 20, height: 8, quality: 'unclear' as DetectionQuality },  // Mid left (low contrast)
  { x: 80, y: 40, width: 15, height: 6, quality: 'unclear' as DetectionQuality },  // Right center (motion blur)
  
  // Additional mixed detection scenarios for variety
  { x: 50, y: 20, width: 25, height: 10, quality: 'clear' as DetectionQuality },   // Upper center main sponsor
  { x: 8, y: 65, width: 15, height: 18, quality: 'clear' as DetectionQuality },    // Left side logo stack
  { x: 65, y: 30, width: 20, height: 12, quality: 'unclear' as DetectionQuality }, // Right area (lighting issues)
  { x: 40, y: 85, width: 15, height: 8, quality: 'clear' as DetectionQuality },    // Bottom center small logo
  { x: 12, y: 30, width: 20, height: 8, quality: 'unclear' as DetectionQuality },  // Left center (angle distortion)
  { x: 75, y: 75, width: 18, height: 10, quality: 'clear' as DetectionQuality },   // Bottom right sponsor zone
  { x: 30, y: 60, width: 12, height: 12, quality: 'unclear' as DetectionQuality }, // Lower center (crowd/player obstruction)
  { x: 85, y: 15, width: 10, height: 15, quality: 'clear' as DetectionQuality },   // Top right vertical banner
  { x: 5, y: 75, width: 8, height: 12, quality: 'unclear' as DetectionQuality },   // Bottom left edge (partial view)
  { x: 55, y: 5, width: 20, height: 6, quality: 'clear' as DetectionQuality },     // Top center horizontal banner
];