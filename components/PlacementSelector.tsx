import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Search, Target, X } from 'lucide-react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { rightsholders, getPlacementsForRightsholder, type Rightsholder } from '../constants/placements';

export interface SelectedPlacement {
  rightsholder: Rightsholder;
  placementName: string;
  displayName: string; // e.g., "New York Yankees - Uniform"
}

interface PlacementSelectorProps {
  selectedPlacement: SelectedPlacement | null;
  onPlacementSelect: (placement: SelectedPlacement | null) => void;
  isKeyboardOpen?: boolean;
  onDropdownClose?: () => void;
}

export interface PlacementSelectorRef {
  openDropdown: () => void;
  closeDropdown: () => void;
}

export const PlacementSelector = forwardRef<PlacementSelectorRef, PlacementSelectorProps>(({
  selectedPlacement,
  onPlacementSelect,
  isKeyboardOpen = false,
  onDropdownClose
}, ref) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRightsholder, setSelectedRightsholder] = useState<Rightsholder | null>(null);

  useImperativeHandle(ref, () => ({
    openDropdown: () => setOpen(true),
    closeDropdown: () => setOpen(false)
  }));

  // Handle keyboard mode - open dropdown when 's' key is pressed
  useEffect(() => {
    // Only sync when there's a meaningful state change
    if (isKeyboardOpen && !open) {
      // Keyboard wants to open dropdown and it's currently closed
      setOpen(true);
    }
    // Don't automatically close when isKeyboardOpen becomes false
    // This prevents infinite loops. Let the dropdown close naturally
    // through user interaction or explicit close calls.
  }, [isKeyboardOpen, open]);

  // Handle dropdown open/close changes
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

  // Group rightsholders by league
  const rightsholdersByLeague = rightsholders.reduce((acc, rh) => {
    if (!acc[rh.league]) {
      acc[rh.league] = [];
    }
    acc[rh.league].push(rh);
    return acc;
  }, {} as Record<string, Rightsholder[]>);

  // Get available placements for selected rightsholder
  const availablePlacements = selectedRightsholder 
    ? getPlacementsForRightsholder(selectedRightsholder.id).map(p => p.placement.name)
    : [];

  const handleRightsholderSelect = (rightsholder: Rightsholder) => {
    setSelectedRightsholder(rightsholder);
    setSearchValue('');
  };

  const handlePlacementSelect = (placementName: string) => {
    if (!selectedRightsholder) return;

    const placement: SelectedPlacement = {
      rightsholder: selectedRightsholder,
      placementName,
      displayName: `${selectedRightsholder.name} - ${placementName}`
    };

    onPlacementSelect(placement);
    handleOpenChange(false);
    setSelectedRightsholder(null);
    setSearchValue('');
  };

  const handleBackToRightsholders = () => {
    setSelectedRightsholder(null);
    setSearchValue('');
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlacementSelect(null);
  };

      return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className={`inline-flex items-center justify-between whitespace-nowrap rounded-lg border-2 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-[120px] sm:min-w-[200px] max-w-[280px] sm:max-w-[350px] cursor-pointer ${
            isKeyboardOpen 
              ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            
            {!selectedPlacement ? (
              <span className="text-gray-500 text-xs sm:text-sm truncate">
                <span className="hidden sm:inline">Select Placement</span>
                <span className="sm:hidden">Select</span>
              </span>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0 overflow-hidden">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 text-xs px-1 sm:px-2 py-0.5 flex items-center space-x-1 whitespace-nowrap flex-shrink-0"
                >
                  <Target className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600 flex-shrink-0" />
                  <span 
                    className="max-w-[100px] sm:max-w-[180px] truncate"
                    style={{ minWidth: '50px', fontSize: 'max(10px, 0.75rem)' }}
                  >
                    {selectedPlacement.displayName}
                  </span>
                  <button
                    onClick={handleClearSelection}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 flex-shrink-0"
                    title="Remove placement"
                    aria-label="Remove placement"
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
        
        <PopoverContent className="w-96 p-0" align="start">
          <Command shouldFilter={false}>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder={selectedRightsholder ? "Search placements..." : "Search teams..."}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchValue}
                onValueChange={setSearchValue}
              />
            </div>
            
            <CommandList className="max-h-80">
              {!selectedRightsholder ? (
                // Show rightsholders grouped by league
                <>
                  {Object.entries(rightsholdersByLeague).map(([league, leagueRightsholders]) => (
                    <CommandGroup key={league} heading={league}>
                      {leagueRightsholders
                        .filter(rh => 
                          searchValue === '' || 
                          rh.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                          rh.teamName.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((rightsholder) => (
                          <CommandItem
                            key={rightsholder.id}
                            value={rightsholder.name}
                            onSelect={() => handleRightsholderSelect(rightsholder)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="text-xs">
                                {rightsholder.league}
                              </Badge>
                              <div>
                                <div className="font-medium">{rightsholder.teamName}</div>
                                <div className="text-sm text-gray-500">{rightsholder.city}</div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  ))}
                  
                  {Object.values(rightsholdersByLeague).flat()
                    .filter(rh => 
                      searchValue !== '' && (
                        rh.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                        rh.teamName.toLowerCase().includes(searchValue.toLowerCase())
                      )
                    ).length === 0 && searchValue !== '' && (
                    <CommandEmpty>No teams found.</CommandEmpty>
                  )}
                </>
              ) : (
                // Show placements for selected rightsholder
                <>
                  <div className="px-3 py-2 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{selectedRightsholder.league}</Badge>
                        <span className="font-medium">{selectedRightsholder.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToRightsholders}
                        className="text-xs"
                      >
                        ← Back
                      </Button>
                    </div>
                  </div>
                  
                  <CommandGroup heading="Available Placements">
                    {availablePlacements
                      .filter(placement => 
                        searchValue === '' || 
                        placement.toLowerCase().includes(searchValue.toLowerCase())
                      )
                      .map((placementName) => (
                        <CommandItem
                          key={placementName}
                          value={placementName}
                          onSelect={() => handlePlacementSelect(placementName)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span>{placementName}</span>
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                  
                  {availablePlacements
                    .filter(placement => 
                      searchValue !== '' && 
                      placement.toLowerCase().includes(searchValue.toLowerCase())
                    ).length === 0 && searchValue !== '' && (
                    <CommandEmpty>No placements found.</CommandEmpty>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
});

PlacementSelector.displayName = 'PlacementSelector'; 