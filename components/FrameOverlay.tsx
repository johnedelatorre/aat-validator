// React import removed - not needed with new JSX transform
import { CheckCircle, Trash2 } from 'lucide-react';

interface FrameOverlayProps {
  type: 'confirmed' | 'rejected';
  className?: string;
}

export function FrameOverlay({ type, className = '' }: FrameOverlayProps) {
  if (type === 'confirmed') {
    return (
      <div className={`absolute inset-0 bg-green-600/80 flex items-center justify-center backdrop-blur-sm z-10 ${className}`}>
        <div className="bg-white rounded-full p-3 shadow-lg">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>
    );
  }

  if (type === 'rejected') {
    return (
      <div className={`absolute inset-0 bg-red-600/80 flex items-center justify-center backdrop-blur-sm z-10 ${className}`}>
        <div className="bg-white rounded-full p-3 shadow-lg">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
      </div>
    );
  }

  return null;
}