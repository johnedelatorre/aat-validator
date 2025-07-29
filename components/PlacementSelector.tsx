import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { ChevronDown, Search, Target, X } from 'lucide-react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { rightsholders, getPlacementsForRightsholder, getAllRightsholderPlacementCombinations, allPlacementTypes, basePlacements, type Rightsholder, type PlacementType } from '../constants/placements';

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

  useImperativeHandle(ref, () => ({
    openDropdown: () => setOpen(true),
    closeDropdown: () => setOpen(false),
    isOpen: () => open
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



  // Comprehensive search results
  const searchResults = useMemo(() => {
    if (!searchValue) {
      // Show all rightsholder-placement combinations grouped by league
      return getAllRightsholderPlacementCombinations().reduce((acc, combo) => {
        const league = combo.rightsholder.league;
        if (!acc[league]) acc[league] = [];
        acc[league].push({
          type: 'combination' as const,
          item: combo,
          searchMatch: combo.displayName
        });
        return acc;
      }, {} as Record<string, Array<{type: 'combination', item: any, searchMatch: string}>>);
    }

    const search = searchValue.toLowerCase();
    const results: Record<string, Array<{type: string, item: any, searchMatch: string}>> = {};

    // Search leagues
    const leagues = ['MLB', 'NBA', 'NFL', 'MLS'];
    leagues.forEach(league => {
      if (league.toLowerCase().includes(search)) {
        if (!results['Leagues']) results['Leagues'] = [];
        results['Leagues'].push({
          type: 'league',
          item: league,
          searchMatch: league
        });
      }
    });

    // Search teams
    rightsholders.forEach(rh => {
      const matches = [
        rh.name.toLowerCase().includes(search),
        rh.teamName.toLowerCase().includes(search),
        rh.city.toLowerCase().includes(search),
        rh.league.toLowerCase().includes(search)
      ].some(Boolean);

      if (matches) {
        if (!results['Teams']) results['Teams'] = [];
        results['Teams'].push({
          type: 'team',
          item: rh,
          searchMatch: rh.name
        });
      }
    });

    // Search placements
    basePlacements.forEach(placement => {
      if (placement.name.toLowerCase().includes(search)) {
        if (!results['Placements']) results['Placements'] = [];
        results['Placements'].push({
          type: 'placement',
          item: placement,
          searchMatch: placement.name
        });
      }
    });

    // Search placement types
    allPlacementTypes.forEach(placementType => {
      if (placementType.name.toLowerCase().includes(search)) {
        if (!results['Placement Types']) results['Placement Types'] = [];
        results['Placement Types'].push({
          type: 'placementType',
          item: placementType,
          searchMatch: placementType.name
        });
      }
    });

    // Search full combinations
    getAllRightsholderPlacementCombinations().forEach(combo => {
      if (combo.displayName.toLowerCase().includes(search)) {
        if (!results['Combinations']) results['Combinations'] = [];
        results['Combinations'].push({
          type: 'combination',
          item: combo,
          searchMatch: combo.displayName
        });
      }
    });

    return results;
  }, [searchValue]);

  const handleDirectPlacementSelect = (combo: any) => {
    const placement: SelectedPlacement = {
      rightsholder: combo.rightsholder,
      placementName: combo.placement.name,
      displayName: combo.displayName
    };

    onPlacementSelect(placement);
    handleOpenChange(false);
    setSearchValue('');
  };

  const handleLeagueSelect = (league: string) => {
    setSearchValue(league);
  };

  const handleTeamSelect = (team: Rightsholder) => {
    setSearchValue(team.name);
  };

  const handlePlacementSelect = (placement: any) => {
    setSearchValue(placement.name);
  };

  const handlePlacementTypeSelect = (placementType: PlacementType) => {
    setSearchValue(placementType.name);
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
                placeholder="Search leagues, teams, placements, or placement types..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchValue}
                onValueChange={setSearchValue}
              />
            </div>
            
            <CommandList className="max-h-80">
              {Object.keys(searchResults).length === 0 && searchValue !== '' ? (
                <CommandEmpty>No results found. Try searching for leagues (NBA), teams (Knicks), placements (Uniform), or placement types (Jersey).</CommandEmpty>
              ) : (
                Object.entries(searchResults).map(([category, items]) => (
                  <CommandGroup key={category} heading={category}>
                    {items.map((result, index) => (
                      <CommandItem
                        key={`${category}-${index}`}
                        value={result.searchMatch}
                        onSelect={() => {
                          if (result.type === 'combination') {
                            handleDirectPlacementSelect(result.item);
                          } else if (result.type === 'league') {
                            handleLeagueSelect(result.item);
                          } else if (result.type === 'team') {
                            handleTeamSelect(result.item);
                          } else if (result.type === 'placement') {
                            handlePlacementSelect(result.item);
                          } else if (result.type === 'placementType') {
                            handlePlacementTypeSelect(result.item);
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          {result.type === 'combination' && (
                            <>
                              <Target className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-medium">{result.item.displayName}</div>
                                <div className="text-xs text-gray-500">Select this combination</div>
                              </div>
                            </>
                          )}
                          
                          {result.type === 'league' && (
                            <>
                              <Badge variant="outline" className="text-xs">
                                {result.item}
                              </Badge>
                              <div className="flex-1">
                                <div className="font-medium">{result.item} Teams</div>
                                <div className="text-xs text-gray-500">Filter by league</div>
                              </div>
                            </>
                          )}
                          
                          {result.type === 'team' && (
                            <>
                              <Badge variant="outline" className="text-xs">
                                {result.item.league}
                              </Badge>
                              <div className="flex-1">
                                <div className="font-medium">{result.item.teamName}</div>
                                <div className="text-xs text-gray-500">{result.item.city} - Filter by team</div>
                              </div>
                            </>
                          )}
                          
                          {result.type === 'placement' && (
                            <>
                              <Target className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-medium">{result.item.name}</div>
                                <div className="text-xs text-gray-500">Filter by placement type</div>
                              </div>
                            </>
                          )}
                          
                          {result.type === 'placementType' && (
                            <>
                              <Target className="h-4 w-4 text-orange-600 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-medium">{result.item.name}</div>
                                <div className="text-xs text-gray-500">Filter by placement element</div>
                              </div>
                            </>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
});

PlacementSelector.displayName = 'PlacementSelector'; 