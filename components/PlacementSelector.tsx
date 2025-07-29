import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Search, Target } from 'lucide-react';
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
    if (isKeyboardOpen) {
      setOpen(true);
    }
  }, [isKeyboardOpen]);

  // Close dropdown when keyboard mode is disabled
  useEffect(() => {
    if (!isKeyboardOpen && open) {
      // Allow manual closing but don't auto-close on keyboard mode change
      // Only close if explicitly requested
    }
  }, [isKeyboardOpen, open]);

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
    ? getPlacementsForRightsholder(selectedRightsholder.name)
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
    setOpen(false);
    setSelectedRightsholder(null);
    setSearchValue('');
    
    if (onDropdownClose) {
      onDropdownClose();
    }
  };

  const handleBackToRightsholders = () => {
    setSelectedRightsholder(null);
    setSearchValue('');
  };

  const handleClearSelection = () => {
    onPlacementSelect(null);
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-72 justify-between bg-white border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            {selectedPlacement ? (
              <div className="flex items-center space-x-2 max-w-full">
                <Target className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-blue-600 font-medium truncate">
                  {selectedPlacement.displayName}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <Target className="h-4 w-4" />
                <span>Select Placement...</span>
              </div>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
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

      {selectedPlacement && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearSelection}
          className="text-gray-500 hover:text-gray-700"
          title="Clear selection"
        >
          ✕
        </Button>
      )}
    </div>
  );
});

PlacementSelector.displayName = 'PlacementSelector'; 