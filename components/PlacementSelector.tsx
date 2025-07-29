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
  recentlyUsedPlacements?: SelectedPlacement[];
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
  recentlyUsedPlacements = [],
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
      const results: Record<string, Array<{type: 'combination', item: any, searchMatch: string}>> = {};
      
      // Add recently used placements first (up to 10)
      if (recentlyUsedPlacements.length > 0) {
        results['Recently Used'] = recentlyUsedPlacements.slice(0, 10).map(placement => ({
          type: 'combination' as const,
          item: placement,
          searchMatch: placement.displayName
        }));
      }
      
      // Show all rightsholder-placement combinations grouped by league
      const allCombos = getAllRightsholderPlacementCombinations().reduce((acc, combo) => {
        // Skip if this combo is already in recently used
        const isInRecent = recentlyUsedPlacements.some(recent => 
          recent.rightsholder.id === combo.rightsholder.id && 
          recent.placementName === combo.placement.name
        );
        
        if (!isInRecent) {
          const league = combo.rightsholder.league;
          if (!acc[league]) acc[league] = [];
          acc[league].push({
            type: 'combination' as const,
            item: combo,
            searchMatch: combo.displayName
          });
        }
        return acc;
      }, {} as Record<string, Array<{type: 'combination', item: any, searchMatch: string}>>);
      
      // Merge league results with recently used results
      return { ...results, ...allCombos };
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
  }, [searchValue, recentlyUsedPlacements]);

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
          className={`inline-flex items-center justify-between whitespace-nowrap rounded-lg border-2 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-[120px] sm:min-w-[200px] max-w-[180px] sm:max-w-[300px] cursor-pointer ${
            isKeyboardOpen 
              ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
            <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            
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
                    className="max-w-[60px] sm:max-w-[120px] truncate"
                    style={{ minWidth: '30px', fontSize: 'max(10px, 0.75rem)' }}
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
        
        <PopoverContent className="w-[280px] sm:w-[380px] p-0" align="start">
          <Command className="w-full" shouldFilter={false}>
            <CommandInput 
              placeholder="Search leagues, teams, placements, or placement types..."
              value={searchValue}
              onValueChange={setSearchValue}
              autoFocus={isKeyboardOpen}
              className="h-9"
            />
            
            <CommandList className="max-h-[300px] scrollbar-elegant">
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
                        className="group flex items-center space-x-2 cursor-pointer transition-colors hover:bg-blue-50 hover:text-blue-900 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-900 data-[selected=true]:font-medium"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <Target className="w-4 h-4 rounded-full text-blue-600" />
                          </div>
                          <div className="flex-1">
                            {result.type === 'combination' && (
                              <>
                                <div className="text-sm font-medium">{result.item.displayName}</div>
                                <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">Select this combination</div>
                              </>
                            )}
                            
                            {result.type === 'league' && (
                              <>
                                <div className="text-sm font-medium">{result.item} Teams</div>
                                <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">Filter by league</div>
                              </>
                            )}
                            
                            {result.type === 'team' && (
                              <>
                                <div className="text-sm font-medium">{result.item.teamName}</div>
                                <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">{result.item.city} - {result.item.league}</div>
                              </>
                            )}
                            
                            {result.type === 'placement' && (
                              <>
                                <div className="text-sm font-medium">{result.item.name}</div>
                                <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">Filter by placement type</div>
                              </>
                            )}
                            
                            {result.type === 'placementType' && (
                              <>
                                <div className="text-sm font-medium">{result.item.name}</div>
                                <div className="text-xs text-gray-500 group-data-[selected=true]:text-blue-700">Filter by placement element</div>
                              </>
                            )}
                          </div>
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