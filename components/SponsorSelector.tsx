import React, { useState, useMemo, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Sponsor } from '../types';
import { Search, X, Check, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SponsorSelectorProps {
  availableSponsors: Sponsor[];
  selectedSponsor: Sponsor | null;
  recentlyUsedSponsors: Sponsor[];
  onSponsorSelect: (sponsor: Sponsor | null) => void;
  onRecentSponsorSelect: (sponsor: Sponsor | null) => void;
  isKeyboardOpen?: boolean; // NEW: Track if opened via keyboard
  onDropdownClose?: () => void; // NEW: Callback when dropdown closes
}

export interface SponsorSelectorRef {
  openDropdown: () => void;
  closeDropdown: () => void;
}

export const SponsorSelector = forwardRef<SponsorSelectorRef, SponsorSelectorProps>(({
  availableSponsors,
  selectedSponsor,
  recentlyUsedSponsors,
  onSponsorSelect,
  onRecentSponsorSelect,
  isKeyboardOpen = false,
  onDropdownClose,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // KEYBOARD-DRIVEN SPONSOR SELECTION: Expose dropdown control methods
  useImperativeHandle(ref, () => ({
    openDropdown: () => {
      setOpen(true);
    },
    closeDropdown: () => {
      setOpen(false);
    },
    isOpen: () => {
      return open;
    }
  }));

  // FIXED: Improved state synchronization to prevent infinite loops
  useEffect(() => {
    // Only sync when there's a meaningful state change
    if (isKeyboardOpen && !open) {
      // Keyboard wants to open dropdown and it's currently closed
      setOpen(true);
    }
    // REMOVED: Don't automatically close when isKeyboardOpen becomes false
    // This was causing the infinite loop. Let the dropdown close naturally
    // through user interaction or explicit close calls.
  }, [isKeyboardOpen, open]);

  // FIXED: Simplified dropdown close handling to prevent feedback loops
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    
    // Only notify parent when dropdown is actually closing AND it was keyboard-opened
    if (!newOpen && isKeyboardOpen && onDropdownClose) {
      // Use setTimeout to break potential synchronous update loops
      setTimeout(() => {
        onDropdownClose();
      }, 0);
    }
  };

  // All selectable sponsors organized for display (let Command component handle filtering)
  const allSelectableSponsors = useMemo(() => {
    // Create a single array that includes recent sponsors first, then all other sponsors
    const result: Array<{sponsor: Sponsor, isRecent: boolean, category: string}> = [];
    
    // Add recent sponsors first
    recentlyUsedSponsors.forEach(sponsor => {
      result.push({ sponsor, isRecent: true, category: 'Recently Used' });
    });
    
    // Group remaining sponsors by category (excluding those already in recent)
    const sponsorsByCategory = availableSponsors.reduce((acc, sponsor) => {
      // Skip if this sponsor is already in recent
      if (recentlyUsedSponsors.some(recent => recent.id === sponsor.id)) {
        return acc;
      }
      
      if (!acc[sponsor.category]) {
        acc[sponsor.category] = [];
      }
      acc[sponsor.category].push(sponsor);
      return acc;
    }, {} as Record<string, Sponsor[]>);
    
    // Add categorized sponsors to result
    Object.entries(sponsorsByCategory).forEach(([category, sponsors]) => {
      sponsors.forEach(sponsor => {
        result.push({ sponsor, isRecent: false, category });
      });
    });
    
    return result;
  }, [availableSponsors, recentlyUsedSponsors]);

  // FIXED: Always set sponsor, never deselect - Issue 1 Fix
  const handleSponsorSelect = (sponsor: Sponsor, isRecent: boolean) => {
    // FIXED: Always select the sponsor - no toggle behavior
    if (isRecent) {
      onRecentSponsorSelect(sponsor);
    } else {
      onSponsorSelect(sponsor);
    }
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearSelection = () => {
    onSponsorSelect(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearSearch = () => {
    setSearch('');
  };

  const removeSponsor = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSponsorSelect(null);
  };

  // NEW: Get numbered recently used sponsors (0-9)
  const numberedRecentSponsors = useMemo(() => {
    return recentlyUsedSponsors.slice(0, 10);
  }, [recentlyUsedSponsors]);

  // Handle keyboard shortcuts for sponsor selection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle number key shortcuts for recently used sponsors
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      
      const numberPressed = parseInt(e.key);
      const sponsorIndex = numberPressed;
      
      if (sponsorIndex < numberedRecentSponsors.length) {
        const sponsor = numberedRecentSponsors[sponsorIndex];
        handleSponsorSelect(sponsor, true);
      }
      return;
    }
    
    // Handle Escape key to close dropdown
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    
    // Let Command component handle all other keys (including arrow navigation)
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className={`inline-flex items-center justify-between whitespace-nowrap rounded-lg border-2 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-[120px] sm:min-w-[200px] max-w-[180px] sm:max-w-[300px] cursor-pointer ${
            isKeyboardOpen 
              ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
            <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            
            {!selectedSponsor ? (
              <span className="text-gray-500 text-xs sm:text-sm truncate">
                <span className="hidden sm:inline">Select Sponsor</span>
                <span className="sm:hidden">Select</span>
              </span>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0 overflow-hidden">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 text-xs px-1 sm:px-2 py-0.5 flex items-center space-x-1 whitespace-nowrap flex-shrink-0"
                >
                  <ImageWithFallback
                    src={selectedSponsor.logoUrl}
                    alt={`${selectedSponsor.name} logo`}
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full object-cover flex-shrink-0"
                  />
                  <span 
                    className="max-w-[60px] sm:max-w-[120px] truncate"
                    style={{ minWidth: '30px', fontSize: 'max(10px, 0.75rem)' }}
                  >
                    {selectedSponsor.name}
                  </span>
                  <button
                    onClick={removeSponsor}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 flex-shrink-0"
                    title="Remove sponsor"
                    aria-label="Remove sponsor"
                  >
                    <X className="w-2 h-2 sm:w-3 sm:h-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-gray-500 flex-shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] sm:w-[380px] p-0" align="start">
        <Command className="w-full" onKeyDown={handleKeyDown}>
          {/* UPDATED: Enhanced search placeholder to reflect new functionality */}
          <CommandInput 
            placeholder="Search by brand name or tagline..."
            value={search}
            onValueChange={setSearch}
            autoFocus={isKeyboardOpen}
            className="h-9"
          />
          
          {/* NEW: Numbered Pills Section for Recently Used Sponsors */}
          {numberedRecentSponsors.length > 0 && (
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-gray-500">Quick Selection</div>
                <div className="text-xs text-gray-400">Press 1-{numberedRecentSponsors.length}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {numberedRecentSponsors.map((sponsor, index) => (
                  <button
                    key={`quick-${sponsor.id}`}
                    onClick={() => handleSponsorSelect(sponsor, true)}
                    className="flex items-center space-x-1 px-2 py-1 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    {/* Number Badge */}
                    <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {index}
                    </div>
                    
                    {/* Sponsor Name */}
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 max-w-[60px] truncate">
                      {sponsor.name}
                    </span>
                    
                    {/* Selected Indicator */}
                    {selectedSponsor?.id === sponsor.id && (
                      <Check className="w-3 h-3 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <CommandList className="max-h-[300px] scrollbar-elegant">
            <CommandEmpty>No sponsors found.</CommandEmpty>
            
            {/* All sponsors in a single group for seamless keyboard navigation */}
            {allSelectableSponsors.length > 0 && (
              <CommandGroup>
                {allSelectableSponsors.map(({ sponsor, isRecent, category }, index) => {
                  // Add category header for visual grouping (but not Command groups)
                  const showCategoryHeader = index === 0 || 
                    allSelectableSponsors[index - 1].category !== category;
                  
                  return (
                    <React.Fragment key={`${isRecent ? 'recent' : 'sponsor'}-${sponsor.id}`}>
                      {/* Category header for visual grouping */}
                      {showCategoryHeader && (
                        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 border-b border-gray-100">
                          {category}
                        </div>
                      )}
                      
                      <CommandItem
                        value={`${sponsor.name} ${sponsor.tagline}`}
                        onSelect={() => handleSponsorSelect(sponsor, isRecent)}
                        className="group flex items-center space-x-2 cursor-pointer transition-colors hover:bg-blue-50 hover:text-blue-900 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-900 data-[selected=true]:font-medium"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <ImageWithFallback
                              src={sponsor.logoUrl}
                              alt={`${sponsor.name} logo`}
                              className="w-4 h-4 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{sponsor.name}</div>
                            {/* Show tagline with conditional styling for selection state */}
                            <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">{sponsor.tagline}</div>
                          </div>
                        </div>
                        {selectedSponsor?.id === sponsor.id && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </CommandItem>
                    </React.Fragment>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

SponsorSelector.displayName = 'SponsorSelector';