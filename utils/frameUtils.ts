import { Frame, ConfidenceLevel, Sponsor } from '../types';
import { baseballImages, realisticDetectionBoxes } from '../constants/images';
import { mockSponsors } from '../constants/sponsors';

export const generateMockFrames = (batchNumber: number, defaultZoom: ConfidenceLevel = 'Mid'): Frame[] => {
  return Array.from({ length: 20 }, (_, i) => {
    const seed = (batchNumber * 20 + i);
    const detectionBoxIndex = seed % realisticDetectionBoxes.length;
    const imageIndex = seed % baseballImages.length;
    const detectionBox = realisticDetectionBoxes[detectionBoxIndex];

    return {
      id: `frame-${batchNumber}-${i + 1}`,
      imageUrl: baseballImages[imageIndex],
      isSelected: true,
      isDoubleSelected: false,
      isRejected: false,
      isMarkedForRejection: false,
      isConfirmed: false,
      confidence: defaultZoom,
      clarityLevel: Math.floor(Math.random() * 5) + 1, // Random clarity level from 1-5
      detectionBox: {
        x: detectionBox.x,
        y: detectionBox.y,
        width: detectionBox.width,
        height: detectionBox.height,
        quality: detectionBox.quality,
      },
      sponsorAnnotations: [],
    };
  });
};

export const groupFramesIntoRows = (frames: Frame[], itemsPerRow: number): Frame[][] => {
  const rows: Frame[][] = [];
  for (let i = 0; i < frames.length; i += itemsPerRow) {
    rows.push(frames.slice(i, i + itemsPerRow));
  }
  return rows;
};

export const detectMostLikelySponsor = (frames: Frame[]): Sponsor | null => {
  const sponsorScores: Record<string, number> = {};
  
  frames.forEach((frame) => {
    const imageIndex = baseballImages.findIndex(img => img === frame.imageUrl);
    
    if (imageIndex !== -1) {
      let likelySponsorIds: string[] = [];
      
      switch (imageIndex) {
        case 0:
          likelySponsorIds = ['coca-cola', 'budweiser', 'mastercard'];
          break;
        case 1:
          likelySponsorIds = ['nike', 'adidas', 'pepsi'];
          break;
        case 2:
          likelySponsorIds = ['state-farm', 'geico', 'chevrolet'];
          break;
        case 3:
          likelySponsorIds = ['nike', 'budweiser', 'coca-cola'];
          break;
        case 4:
          likelySponsorIds = ['nike', 'coca-cola', 'pepsi'];
          break;
        case 5:
          likelySponsorIds = ['coca-cola', 'nike', 'pepsi'];
          break;
        case 6:
          likelySponsorIds = ['dignity-health', 'mcdonalds', 'coca-cola'];
          break;
        case 7:
          likelySponsorIds = ['chick-fil-a', 'chase', 'coca-cola'];
          break;
        case 8:
          likelySponsorIds = ['coors-light', 'banner-health', 'cox'];
          break;
        default:
          likelySponsorIds = ['coca-cola', 'pepsi', 'budweiser'];
      }
      
      const qualityMultiplier = frame.detectionBox.quality === 'clear' ? 1.0 : 0.5;
      
      likelySponsorIds.forEach(sponsorId => {
        sponsorScores[sponsorId] = (sponsorScores[sponsorId] || 0) + qualityMultiplier;
      });
    }
  });
  
  const topSponsorId = Object.entries(sponsorScores)
    .sort(([,a], [,b]) => b - a)[0]?.[0];
  
  return topSponsorId ? mockSponsors.find(s => s.id === topSponsorId) || null : null;
};

export const generateAutoPopulatedSponsors = (): Sponsor[] => {
  const existingSponsorIds = [
    'coca-cola',
    'chick-fil-a',
    'coors-light',
    'nike',
    'chase',
    'budweiser',
    'pepsi',
    'adidas',
    'dignity-health'
  ];
  
  const autoDetectedSponsors: Sponsor[] = existingSponsorIds
    .map(id => mockSponsors.find(s => s.id === id))
    .filter(Boolean) as Sponsor[];
  
  if (autoDetectedSponsors.length < 9) {
    const additionalSponsors = mockSponsors
      .filter(sponsor => !existingSponsorIds.includes(sponsor.id))
      .slice(0, 9 - autoDetectedSponsors.length);
    
    autoDetectedSponsors.push(...additionalSponsors);
  }
  
  return autoDetectedSponsors.slice(0, 9);
};