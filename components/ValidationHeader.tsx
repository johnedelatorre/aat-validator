import { Button } from './ui/button';
import { SponsorSelector } from './SponsorSelector';
import { PlacementSelector, type SelectedPlacement } from './PlacementSelector';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { CheckCircle, Trash2, Info, CheckCircle2, Settings, Play } from 'lucide-react';
import { Sponsor } from '../types';
import { type PlacementType } from '../constants/placements';

interface ValidationHeaderProps {
  // NEW: Title prop for tab-specific headers
  title?: string;
  queueCount: number;
  selectedCount: number;
  // NEW: Add count for frames in green selected state only
  greenSelectedCount: number;
  onReject: () => void; // Changed from onRejectAll to onReject
  onConfirm: () => void;
  hasConfirmed: boolean;
  showCompletion?: boolean;
  
  // Sponsor-related props (optional for placement workflow)
  availableSponsors?: Sponsor[];
  selectedSponsor?: Sponsor | null;
  recentlyUsedSponsors?: Sponsor[];
  onSponsorSelect?: (sponsor: Sponsor | null) => void;
  onRecentSponsorSelect?: (sponsor: Sponsor | null) => void;
  sponsorSelectorRef?: React.RefObject<{ openDropdown: () => void; closeDropdown: () => void }>;
  isSponsorDropdownKeyboardOpen?: boolean;
  onSponsorDropdownClose?: () => void;
  framesWithIndividualSponsors?: number;
  
  // Placement-related props (optional for sponsor workflow)
  selectedPlacement?: SelectedPlacement | null;
  autoPopulatedPlacementTypes?: PlacementType[];
  onPlacementSelect?: (placement: SelectedPlacement | null) => void;
  placementSelectorRef?: React.RefObject<{ openDropdown: () => void; closeDropdown: () => void }>;
  isPlacementDropdownKeyboardOpen?: boolean;
  onPlacementDropdownClose?: () => void;
  framesWithIndividualPlacements?: number;
  
  // Select all/deselect all props
  allFramesSelected: boolean;
  hasSelectableFrames: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  // New workflow stats
  confirmedCount: number;
  rejectedCount: number;
  unprocessedCount: number;
  // NEW: Enhanced deselect all workflow
  hasDoubleSelectedFrames?: boolean;
  allFramesDoubleSelected?: boolean;
  // NEW: Video and settings handlers
  onOpenSettings: () => void;
  onOpenVideoDrawer: () => void;
}

export function ValidationHeader({ 
  title = "Sponsor Analyzer", // Default title
  queueCount, 
  selectedCount, 
  greenSelectedCount,
  onReject, // Changed from onRejectAll
  onConfirm,
  hasConfirmed,
  showCompletion = false, // eslint-disable-line @typescript-eslint/no-unused-vars
  
  // Sponsor workflow props
  availableSponsors,
  selectedSponsor,
  recentlyUsedSponsors,
  onSponsorSelect,
  onRecentSponsorSelect,
  sponsorSelectorRef,
  isSponsorDropdownKeyboardOpen = false,
  onSponsorDropdownClose,
  framesWithIndividualSponsors = 0,
  
  // Placement workflow props
  selectedPlacement,
  autoPopulatedPlacementTypes,
  onPlacementSelect,
  placementSelectorRef,
  isPlacementDropdownKeyboardOpen = false,
  onPlacementDropdownClose,
  framesWithIndividualPlacements = 0,
  
  allFramesSelected, // eslint-disable-line @typescript-eslint/no-unused-vars
  hasSelectableFrames,
  onSelectAll,
  onDeselectAll,
  confirmedCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  rejectedCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  unprocessedCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  hasDoubleSelectedFrames = false,
  allFramesDoubleSelected = false, // eslint-disable-line @typescript-eslint/no-unused-vars
  onOpenSettings,
  onOpenVideoDrawer,
}: ValidationHeaderProps) {
  
  // Determine which workflow to use
  const isPlacementWorkflow = selectedPlacement !== undefined || autoPopulatedPlacementTypes !== undefined;
  const isSponsorWorkflow = !isPlacementWorkflow;

  const handleConfirm = () => {
    if (hasConfirmed) return; // Prevent double-clicking during confirmation
    onConfirm();
  };

  const handleReject = () => {
    if (hasConfirmed) return; // Prevent actions during batch transition
    onReject();
  };

  return (
    <header className="relative top-0 left-0 right-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="flex flex-col">
        {/* Main Header Row */}
        <div className="flex h-20 items-center justify-between px-6">
          {/* Left side - Title */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>

          {/* Right side - Video and Settings buttons, plus loading indicator */}
          <div className="flex items-center space-x-4">
            {/* Auto-advance indicator when batch is completing */}
            {hasConfirmed && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Loading next batch...</span>
              </div>
            )}
            
            {/* Video and Settings Buttons moved to right side */}
            <div className="flex items-center space-x-2">
              {/* View Original Video Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenVideoDrawer}
                className="h-9 px-3 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center space-x-2"
                title="View Original Video"
              >
                <Play className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">View Original Video</span>
              </Button>
              
              {/* Settings Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenSettings}
                className="h-9 w-9 p-0 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                title="Page Settings"
              >
                <Settings className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Workflow-specific section - Enhanced Display Below Main Header */}
        {((isSponsorWorkflow && recentlyUsedSponsors && recentlyUsedSponsors.length > 0) || 
          (isPlacementWorkflow && autoPopulatedPlacementTypes && autoPopulatedPlacementTypes.length > 0)) && (
          <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Select All/Deselect All button - Responsive */}
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={hasDoubleSelectedFrames ? onSelectAll : onDeselectAll}
                  disabled={!hasSelectableFrames || hasConfirmed}
                  className="h-9 px-2 sm:px-4 w-20 sm:w-32 bg-white border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">{hasDoubleSelectedFrames ? 'Select All' : 'Deselect All'}</span>
                  <span className="sm:hidden">{hasDoubleSelectedFrames ? 'Select' : 'Deselect'}</span>
                </Button>
              </div>
              
              {/* Workflow-specific Selector */}
              <div className="flex-shrink-0">
                {isSponsorWorkflow && availableSponsors && onSponsorSelect && onRecentSponsorSelect && (
                  <SponsorSelector
                    ref={sponsorSelectorRef}
                    availableSponsors={availableSponsors}
                    selectedSponsor={selectedSponsor || null}
                    recentlyUsedSponsors={recentlyUsedSponsors || []}
                    onSponsorSelect={onSponsorSelect}
                    onRecentSponsorSelect={onRecentSponsorSelect}
                    isKeyboardOpen={isSponsorDropdownKeyboardOpen}
                    onDropdownClose={onSponsorDropdownClose}
                  />
                )}
                {isPlacementWorkflow && onPlacementSelect && (
                  <PlacementSelector
                    ref={placementSelectorRef}
                    selectedPlacement={selectedPlacement || null}
                    onPlacementSelect={onPlacementSelect}
                    isKeyboardOpen={isPlacementDropdownKeyboardOpen}
                    onDropdownClose={onPlacementDropdownClose}
                  />
                )}
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide hidden sm:inline">Quick Selects</span>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide sm:hidden">Quick</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Press 0-9 on the keyboard to select {isPlacementWorkflow ? 'placement types' : 'sponsors'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Quick select buttons container with responsive sizing and proper space management */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1 overflow-x-auto scrollbar-hide">
                {isSponsorWorkflow && recentlyUsedSponsors && recentlyUsedSponsors.slice(0, 10).map((sponsor, index) => (
                  <button
                    key={sponsor.id}
                    onClick={() => onRecentSponsorSelect && onRecentSponsorSelect(sponsor)}
                    disabled={hasConfirmed}
                    className="group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex-shrink-0 min-w-0"
                    title={`${sponsor.name} - Press ${index}`}
                    style={{ minWidth: '60px' }}
                  >
                    {/* Keyboard Shortcut Number */}
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      {index}
                    </div>
                    
                    {/* Sponsor Name with responsive sizing */}
                    <span 
                      className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors whitespace-nowrap truncate max-w-[40px] sm:max-w-[80px] md:max-w-none"
                      style={{ minWidth: '20px', fontSize: 'max(10px, 0.75rem)' }}
                    >
                      {sponsor.name}
                    </span>
                  </button>
                ))}
                
                {isPlacementWorkflow && autoPopulatedPlacementTypes && autoPopulatedPlacementTypes.slice(0, 10).map((placementType, index) => (
                  <button
                    key={placementType.id}
                    onClick={() => {
                      // Placement type selection is handled by keyboard shortcuts in the main component
                      // This button is mainly for display purposes
                    }}
                    disabled={hasConfirmed}
                    className="group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex-shrink-0 min-w-0"
                    title={`${placementType.name} - Press ${index}`}
                    style={{ minWidth: '60px' }}
                  >
                    {/* Keyboard Shortcut Number */}
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      {index}
                    </div>
                    
                    {/* Placement Type Name with responsive sizing */}
                    <span 
                      className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-purple-900 transition-colors whitespace-nowrap truncate max-w-[40px] sm:max-w-[80px] md:max-w-none"
                      style={{ minWidth: '20px', fontSize: 'max(10px, 0.75rem)' }}
                    >
                      {placementType.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Buttons and Counters moved to right side */}
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 ml-2 sm:ml-4 lg:ml-6">
                {/* Counters positioned to the left of action buttons */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* SIMPLIFIED: Clean selected frames counter with just icon and number */}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Prominent styled checkmark icon with subtle glow */}
                    <div className="relative">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 drop-shadow-sm" />
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full opacity-20 blur-sm -z-10"></div>
                    </div>
                    
                    {/* Count with enhanced styling */}
                    <span className="text-xs sm:text-sm font-semibold text-green-700 min-w-[1rem] sm:min-w-[1.5rem] text-center">
                      {greenSelectedCount}
                    </span>
                  </div>

                  {/* Queue count */}
                  <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    <span className="hidden sm:inline">Queue: </span>
                    <span className="sm:hidden">Q: </span>
                    <span className="font-medium">{queueCount}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Confirm button - applies selection to selected frames */}
                  <Button 
                    onClick={handleConfirm}
                    className="bg-green-600 hover:bg-green-700 text-white w-16 sm:w-24 flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    disabled={selectedCount === 0 || hasConfirmed || 
                      (isSponsorWorkflow && !selectedSponsor && framesWithIndividualSponsors === 0) ||
                      (isPlacementWorkflow && !selectedPlacement && framesWithIndividualPlacements === 0)}
                    title={
                      isSponsorWorkflow && framesWithIndividualSponsors > 0 
                        ? `Confirm ${framesWithIndividualSponsors} individual assignments`
                        : isPlacementWorkflow && framesWithIndividualPlacements > 0
                        ? `Confirm ${framesWithIndividualPlacements} individual placements`
                        : undefined
                    }
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Confirm</span>
                    <span className="sm:hidden">OK</span>
                  </Button>

                  {/* Reject button - rejects selected frames */}
                  <Button 
                    onClick={handleReject}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 w-16 sm:w-24 flex items-center justify-center space-x-1 text-xs sm:text-sm"
                    disabled={selectedCount === 0 || hasConfirmed}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Reject</span>
                    <span className="sm:hidden">X</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}