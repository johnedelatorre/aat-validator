import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { X, RotateCcw, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import the same images used in the main app for consistency
// Use the same frame images from constants
const baseballImage1 = '/images/frame_2820.jpg';
const kcRoyalsLineup = '/images/frame_2700.jpg';
const dodgersLineup = '/images/frame_2460.jpg';
const stadiumBurgerJoint = '/images/frame_2280.jpg';
const chickFilAStadium = '/images/frame_480.jpg';
const coorsLightStrikeZone = '/images/frame_630.jpg';

// Import the same ConfidenceLevel type used throughout the app
export type ConfidenceLevel = 'Min' | 'Mid' | 'Max';

interface VideoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// NEW: Key frame interface for sponsor detection sections
interface VideoKeyFrame {
  id: string;
  timestamp: number; // Time in seconds
  title: string;
  sponsorName: string;
  sponsorLogo: string;
  placement: string;
  thumbnailImage: string;
}

// Map confidence levels to zoom values
const ZOOM_LEVELS: Record<ConfidenceLevel, number> = {
  'Min': 0.75,
  'Mid': 1.0,
  'Max': 1.5
};

// UPDATED: Compact key frame data with specified placement examples
const VIDEO_KEY_FRAMES: VideoKeyFrame[] = [
  {
    id: 'keyframe-1',
    timestamp: 630, // 10:30
    title: 'Stadium Wall',
    sponsorName: 'Coca-Cola',
    sponsorLogo: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=24&h=24&fit=crop&crop=center',
    placement: 'Billboard',
    thumbnailImage: baseballImage1
  },
  {
    id: 'keyframe-2',
    timestamp: 1560, // 26:00
    title: 'Team Lineup',
    sponsorName: 'KC Royals',
    sponsorLogo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=24&h=24&fit=crop&crop=center',
    placement: 'Broadcast Graphic',
    thumbnailImage: kcRoyalsLineup
  },
  {
    id: 'keyframe-3',
    timestamp: 2340, // 39:00
    title: 'Graphics Package',
    sponsorName: 'LA Dodgers',
    sponsorLogo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=24&h=24&fit=crop&crop=center',
    placement: 'Jersey',
    thumbnailImage: dodgersLineup
  },
  {
    id: 'keyframe-4',
    timestamp: 3720, // 62:00
    title: 'Concession Area',
    sponsorName: 'Cold Beers',
    sponsorLogo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=24&h=24&fit=crop&crop=center',
    placement: 'LED/Fascia',
    thumbnailImage: stadiumBurgerJoint
  },
  {
    id: 'keyframe-5',
    timestamp: 4680, // 78:00
    title: 'Center Field',
    sponsorName: 'Chick-fil-A',
    sponsorLogo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=24&h=24&fit=crop&crop=center',
    placement: 'Floor-court Logo',
    thumbnailImage: chickFilAStadium
  },
  {
    id: 'keyframe-6',
    timestamp: 5400, // 90:00
    title: 'Strike Zone',
    sponsorName: 'Coors Light',
    sponsorLogo: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=24&h=24&fit=crop&crop=center',
    placement: 'Entrance',
    thumbnailImage: coorsLightStrikeZone
  }
];

export function VideoDrawer({ isOpen, onClose }: VideoDrawerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<ConfidenceLevel>('Mid'); // Default to Mid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Updated video URL from the user's request
  const videoUrl = 'https://s3.amazonaws.com/gumgum-sports-analyst-data/media-files/2024%20THE%20TURN%20powered%20by%20AT%26T%20%28Bracket%20Play%2C%20Day%201%29-0z07dhnlcpt.mp4';

  // Get current zoom value from zoom level
  const currentZoom = ZOOM_LEVELS[zoomLevel];

  // Enhanced close handler that immediately stops video/audio
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
    onClose();
  };

  // Handle ESC key to close drawer with immediate video stop
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        handleClose(); // Use enhanced close handler
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape, { capture: true });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, { capture: true });
    };
  }, [isOpen]);

  // Handle click outside to close drawer with immediate video stop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        overlayRef.current &&
        drawerRef.current &&
        overlayRef.current.contains(e.target as Node) &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        handleClose(); // Use enhanced close handler
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Enhanced video setup when drawer opens with improved loading
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setZoomLevel('Mid'); // Reset to Mid on open
      setCanAutoPlay(false);
      
      // Try to load and start playing as soon as possible
      video.load();
    }
  }, [isOpen]);

  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Enhanced loading handler to enable autoplay as data loads
  const handleCanPlay = () => {
    setCanAutoPlay(true);
    if (videoRef.current && isOpen) {
      // Optional: Auto-start playback when enough data is loaded
      // videoRef.current.play().catch(console.error);
      // setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // New Min/Mid/Max zoom handlers
  const handleZoomChange = (level: ConfidenceLevel) => {
    setZoomLevel(level);
  };

  const handleZoomReset = () => {
    setZoomLevel('Mid');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && drawerRef.current) {
      drawerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // NEW: Key frame click handler to jump to specific timestamp
  const handleKeyFrameClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      
      // Auto-play when jumping to key frame if video wasn't playing
      if (!isPlaying && canAutoPlay) {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Overlay with backdrop blur and smooth transitions */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 backdrop-blur-sm bg-black/20' 
            : 'opacity-0 backdrop-blur-none bg-black/0 pointer-events-none'
        }`}
      >
        {/* Slide Drawer with Tailwind transitions */}
        <div
          ref={drawerRef}
          className={`absolute right-0 top-0 h-full w-2/3 max-w-4xl bg-white shadow-2xl border-l border-gray-200 flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header with subtle border and better spacing */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">Original Video Context</h2>
              <div className="text-sm text-gray-500 hidden sm:block">
                Use this video to understand the full context of the frames you're annotating
              </div>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Video Container with improved styling - REDUCED padding for more space */}
          <div className="flex-1 p-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto scrollbar-elegant">
            <div className="bg-black rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <div 
                className="relative transition-transform duration-300 ease-out"
                style={{ 
                  transform: `scale(${currentZoom})`,
                  transformOrigin: 'center center'
                }}
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-auto"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onCanPlay={handleCanPlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false}
                  preload="auto"
                  playsInline
                />
              </div>
            </div>

            {/* Video Controls with modern design - REDUCED padding */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl mt-3 p-4 shadow-lg border border-gray-100">
              {/* Progress Bar with improved styling - REDUCED margin */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all hover:h-3
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 
                    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer 
                    [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span className="font-medium">{formatTime(currentTime)}</span>
                  <span className="font-medium">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons with improved layout - REDUCED spacing */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Play/Pause */}
                  <Button
                    onClick={handlePlayPause}
                    variant="outline"
                    size="sm"
                    disabled={!canAutoPlay}
                    className="flex items-center space-x-2 px-3 py-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all disabled:opacity-50"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span className="hidden sm:inline text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
                  </Button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 
                        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white
                        [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white"
                    />
                  </div>
                </div>

                {/* Min/Mid/Max Zoom Controls with better spacing - REDUCED spacing */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 font-medium">Zoom:</span>
                  <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                    <Button
                      onClick={() => handleZoomChange('Min')}
                      variant="ghost"
                      size="sm"
                      className={`px-2 h-7 text-xs font-medium transition-all ${
                        zoomLevel === 'Min' 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'hover:bg-white'
                      }`}
                    >
                      Min
                    </Button>
                    <Button
                      onClick={() => handleZoomChange('Mid')}
                      variant="ghost"
                      size="sm"
                      className={`px-2 h-7 text-xs font-medium transition-all ${
                        zoomLevel === 'Mid' 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'hover:bg-white'
                      }`}
                    >
                      Mid
                    </Button>
                    <Button
                      onClick={() => handleZoomChange('Max')}
                      variant="ghost"
                      size="sm"
                      className={`px-2 h-7 text-xs font-medium transition-all ${
                        zoomLevel === 'Max' 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'hover:bg-white'
                      }`}
                    >
                      Max
                    </Button>
                  </div>
                  
                  {/* Reset and Fullscreen buttons */}
                  <Button
                    onClick={handleZoomReset}
                    variant="ghost"
                    size="sm"
                    className="p-1.5 h-7 w-7 hover:bg-gray-100 transition-all"
                    title="Reset to Mid"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>

                {/* Fullscreen */}
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  className="p-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* UPDATED: Compact Key Frames Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl mt-3 p-4 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
                  <Play className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Sponsor Detection Key Frames</h3>
                  <p className="text-xs text-gray-600">Click any key frame to jump to that section</p>
                </div>
              </div>

              {/* UPDATED: Compact Key Frames Grid - 3 columns, smaller cards */}
              <div className="grid grid-cols-3 gap-3">
                {VIDEO_KEY_FRAMES.map((keyFrame) => (
                  <div
                    key={keyFrame.id}
                    onClick={() => handleKeyFrameClick(keyFrame.timestamp)}
                    className="group cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {/* UPDATED: Smaller thumbnail with reduced aspect ratio */}
                    <div className="relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <ImageWithFallback
                        src={keyFrame.thumbnailImage}
                        alt={keyFrame.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      
                      {/* Timestamp Overlay - smaller */}
                      <div className="absolute top-1 right-1 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                        {formatTime(keyFrame.timestamp)}
                      </div>
                      
                      {/* Play Overlay - smaller */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-3 w-3 text-gray-800 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* UPDATED: Ultra-compact Key Frame Info with inline placement */}
                    <div className="p-2">
                      {/* Title - smaller font */}
                      <h4 className="font-medium text-gray-900 text-xs mb-1.5 line-clamp-1">
                        {keyFrame.title}
                      </h4>
                      
                      {/* UPDATED: Sponsor Info + Placement on same line */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                          <img
                            src={keyFrame.sponsorLogo}
                            alt={keyFrame.sponsorName}
                            className="w-4 h-4 rounded-full object-cover border border-gray-200 flex-shrink-0"
                          />
                          <span className="text-xs font-medium text-gray-800 truncate">
                            {keyFrame.sponsorName}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                          {keyFrame.placement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Information with enhanced design - REDUCED padding */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 mt-3 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
                  <Play className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1 text-sm">Video Context Guide</h3>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    This video shows the original broadcast content from which the frames were extracted. 
                    Use the scrubber to navigate or click key frames above to jump to sponsor detection moments. 
                    Use Min/Mid/Max zoom to adjust the video size for better visibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}