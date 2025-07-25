import { Frame } from '../types';

export const createKeyboardNavigationHelpers = (
  framesRef: React.RefObject<Frame[]>,
  pageSettings: { framesPerRow: number },
  isFrameProcessed: (frame: Frame) => boolean
) => {
  const getFrameIndex = (frameId: string): number => {
    return framesRef.current?.findIndex(frame => frame.id === frameId) ?? -1;
  };

  const getFramePosition = (frameIndex: number): { row: number; col: number } => {
    const row = Math.floor(frameIndex / pageSettings.framesPerRow);
    const col = frameIndex % pageSettings.framesPerRow;
    return { row, col };
  };

  const getFrameIdByPosition = (row: number, col: number): string | null => {
    const frameIndex = row * pageSettings.framesPerRow + col;
    return frameIndex < (framesRef.current?.length ?? 0) ? framesRef.current?.[frameIndex]?.id ?? null : null;
  };

  const findNextUnprocessedFrame = (currentIndex: number, direction: 'left' | 'right' | 'up' | 'down'): string | null => {
    if (!framesRef.current) return null;
    
    const currentPosition = getFramePosition(currentIndex);
    const maxRow = Math.floor((framesRef.current.length - 1) / pageSettings.framesPerRow);
    
    let searchRow = currentPosition.row;
    let searchCol = currentPosition.col;
    
    switch (direction) {
      case 'left':
        searchCol--;
        break;
      case 'right':
        searchCol++;
        break;
      case 'up':
        searchRow--;
        break;
      case 'down':
        searchRow++;
        break;
    }
    
    while (searchRow >= 0 && searchRow <= maxRow && searchCol >= 0 && searchCol < pageSettings.framesPerRow) {
      const frameId = getFrameIdByPosition(searchRow, searchCol);
      if (frameId) {
        const frame = framesRef.current.find(f => f.id === frameId);
        if (frame && !isFrameProcessed(frame)) {
          return frameId;
        }
      }
      
      switch (direction) {
        case 'left':
          searchCol--;
          break;
        case 'right':
          searchCol++;
          break;
        case 'up':
          searchRow--;
          break;
        case 'down':
          searchRow++;
          break;
      }
    }
    
    return null;
  };

  const findNextUnprocessedFrameSequential = (currentIndex: number): string | null => {
    if (!framesRef.current) return null;
    
    const startIndex = currentIndex === -1 ? 0 : currentIndex + 1;
    
    for (let i = startIndex; i < framesRef.current.length; i++) {
      const frame = framesRef.current[i];
      if (!isFrameProcessed(frame)) {
        return frame.id;
      }
    }
    
    for (let i = 0; i < startIndex; i++) {
      const frame = framesRef.current[i];
      if (!isFrameProcessed(frame)) {
        return frame.id;
      }
    }
    
    return null;
  };

  const findPreviousUnprocessedFrameSequential = (currentIndex: number): string | null => {
    if (!framesRef.current) return null;
    
    const startIndex = currentIndex === -1 ? framesRef.current.length - 1 : currentIndex - 1;
    
    for (let i = startIndex; i >= 0; i--) {
      const frame = framesRef.current[i];
      if (!isFrameProcessed(frame)) {
        return frame.id;
      }
    }
    
    for (let i = framesRef.current.length - 1; i > startIndex; i--) {
      const frame = framesRef.current[i];
      if (!isFrameProcessed(frame)) {
        return frame.id;
      }
    }
    
    return null;
  };

  return {
    getFrameIndex,
    getFramePosition,
    getFrameIdByPosition,
    findNextUnprocessedFrame,
    findNextUnprocessedFrameSequential,
    findPreviousUnprocessedFrameSequential,
  };
};