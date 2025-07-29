export interface PlacementType {
  id: string;
  name: string;
  description?: string;
}

export interface Placement {
  id: string;
  name: string;
  description?: string;
}

export interface Rightsholder {
  id: string;
  name: string;
  league: 'NBA' | 'MLB' | 'NFL' | 'MLS' | 'NHL';
  city: string;
  teamName: string;
}

export interface RightsholderPlacementConfig {
  rightsholderName: string;
  placementName: string;
  placementTypes: PlacementType[];
}

// Base placements available across sports
export const basePlacements: Placement[] = [
  { id: 'uniform', name: 'Uniform', description: 'Player uniform and apparel' },
  { id: 'court-field', name: 'Court/Field', description: 'Playing surface markings and logos' },
  { id: 'billboard', name: 'Billboard', description: 'Stadium billboard advertising' },
  { id: 'led-fascia', name: 'LED/Fascia', description: 'LED boards and fascia displays' },
  { id: 'broadcast', name: 'Broadcast Graphic', description: 'On-screen broadcast elements' },
  { id: 'venue', name: 'Venue Branding', description: 'Stadium/arena naming and branding' },
  { id: 'equipment', name: 'Equipment', description: 'Sports equipment branding' }
];

// Comprehensive rightsholders for major leagues (50 teams)
export const rightsholders: Rightsholder[] = [
  // NBA Teams (10 teams)
  { id: 'ny-knicks', name: 'New York Knicks', league: 'NBA', city: 'New York', teamName: 'Knicks' },
  { id: 'la-lakers', name: 'Los Angeles Lakers', league: 'NBA', city: 'Los Angeles', teamName: 'Lakers' },
  { id: 'boston-celtics', name: 'Boston Celtics', league: 'NBA', city: 'Boston', teamName: 'Celtics' },
  { id: 'chicago-bulls', name: 'Chicago Bulls', league: 'NBA', city: 'Chicago', teamName: 'Bulls' },
  { id: 'miami-heat', name: 'Miami Heat', league: 'NBA', city: 'Miami', teamName: 'Heat' },
  { id: 'golden-state-warriors', name: 'Golden State Warriors', league: 'NBA', city: 'San Francisco', teamName: 'Warriors' },
  { id: 'dallas-mavericks', name: 'Dallas Mavericks', league: 'NBA', city: 'Dallas', teamName: 'Mavericks' },
  { id: 'phoenix-suns', name: 'Phoenix Suns', league: 'NBA', city: 'Phoenix', teamName: 'Suns' },
  { id: 'denver-nuggets', name: 'Denver Nuggets', league: 'NBA', city: 'Denver', teamName: 'Nuggets' },
  { id: 'toronto-raptors', name: 'Toronto Raptors', league: 'NBA', city: 'Toronto', teamName: 'Raptors' },
  
  // MLB Teams (10 teams)
  { id: 'ny-yankees', name: 'New York Yankees', league: 'MLB', city: 'New York', teamName: 'Yankees' },
  { id: 'la-dodgers', name: 'Los Angeles Dodgers', league: 'MLB', city: 'Los Angeles', teamName: 'Dodgers' },
  { id: 'boston-red-sox', name: 'Boston Red Sox', league: 'MLB', city: 'Boston', teamName: 'Red Sox' },
  { id: 'chicago-cubs', name: 'Chicago Cubs', league: 'MLB', city: 'Chicago', teamName: 'Cubs' },
  { id: 'houston-astros', name: 'Houston Astros', league: 'MLB', city: 'Houston', teamName: 'Astros' },
  { id: 'atlanta-braves', name: 'Atlanta Braves', league: 'MLB', city: 'Atlanta', teamName: 'Braves' },
  { id: 'philadelphia-phillies', name: 'Philadelphia Phillies', league: 'MLB', city: 'Philadelphia', teamName: 'Phillies' },
  { id: 'san-francisco-giants', name: 'San Francisco Giants', league: 'MLB', city: 'San Francisco', teamName: 'Giants' },
  { id: 'st-louis-cardinals', name: 'St. Louis Cardinals', league: 'MLB', city: 'St. Louis', teamName: 'Cardinals' },
  { id: 'tampa-bay-rays', name: 'Tampa Bay Rays', league: 'MLB', city: 'Tampa Bay', teamName: 'Rays' },
  
  // NFL Teams (10 teams)
  { id: 'ny-giants', name: 'New York Giants', league: 'NFL', city: 'New York', teamName: 'Giants' },
  { id: 'la-rams', name: 'Los Angeles Rams', league: 'NFL', city: 'Los Angeles', teamName: 'Rams' },
  { id: 'new-england-patriots', name: 'New England Patriots', league: 'NFL', city: 'Boston', teamName: 'Patriots' },
  { id: 'chicago-bears', name: 'Chicago Bears', league: 'NFL', city: 'Chicago', teamName: 'Bears' },
  { id: 'dallas-cowboys', name: 'Dallas Cowboys', league: 'NFL', city: 'Dallas', teamName: 'Cowboys' },
  { id: 'green-bay-packers', name: 'Green Bay Packers', league: 'NFL', city: 'Green Bay', teamName: 'Packers' },
  { id: 'pittsburgh-steelers', name: 'Pittsburgh Steelers', league: 'NFL', city: 'Pittsburgh', teamName: 'Steelers' },
  { id: 'san-francisco-49ers', name: 'San Francisco 49ers', league: 'NFL', city: 'San Francisco', teamName: '49ers' },
  { id: 'kansas-city-chiefs', name: 'Kansas City Chiefs', league: 'NFL', city: 'Kansas City', teamName: 'Chiefs' },
  { id: 'buffalo-bills', name: 'Buffalo Bills', league: 'NFL', city: 'Buffalo', teamName: 'Bills' },
  
  // MLS Teams (10 teams)
  { id: 'nycfc', name: 'New York City FC', league: 'MLS', city: 'New York', teamName: 'NYCFC' },
  { id: 'lafc', name: 'Los Angeles FC', league: 'MLS', city: 'Los Angeles', teamName: 'LAFC' },
  { id: 'ne-revolution', name: 'New England Revolution', league: 'MLS', city: 'Boston', teamName: 'Revolution' },
  { id: 'chicago-fire', name: 'Chicago Fire FC', league: 'MLS', city: 'Chicago', teamName: 'Fire' },
  { id: 'atlanta-united', name: 'Atlanta United FC', league: 'MLS', city: 'Atlanta', teamName: 'Atlanta United' },
  { id: 'inter-miami', name: 'Inter Miami CF', league: 'MLS', city: 'Miami', teamName: 'Inter Miami' },
  { id: 'portland-timbers', name: 'Portland Timbers', league: 'MLS', city: 'Portland', teamName: 'Timbers' },
  { id: 'seattle-sounders', name: 'Seattle Sounders FC', league: 'MLS', city: 'Seattle', teamName: 'Sounders' },
  { id: 'toronto-fc', name: 'Toronto FC', league: 'MLS', city: 'Toronto', teamName: 'Toronto FC' },
  { id: 'dc-united', name: 'D.C. United', league: 'MLS', city: 'Washington', teamName: 'D.C. United' },
  
  // NHL Teams (10 teams)
  { id: 'ny-rangers', name: 'New York Rangers', league: 'NHL', city: 'New York', teamName: 'Rangers' },
  { id: 'la-kings', name: 'Los Angeles Kings', league: 'NHL', city: 'Los Angeles', teamName: 'Kings' },
  { id: 'boston-bruins', name: 'Boston Bruins', league: 'NHL', city: 'Boston', teamName: 'Bruins' },
  { id: 'chicago-blackhawks', name: 'Chicago Blackhawks', league: 'NHL', city: 'Chicago', teamName: 'Blackhawks' },
  { id: 'tampa-bay-lightning', name: 'Tampa Bay Lightning', league: 'NHL', city: 'Tampa Bay', teamName: 'Lightning' },
  { id: 'vegas-golden-knights', name: 'Vegas Golden Knights', league: 'NHL', city: 'Las Vegas', teamName: 'Golden Knights' },
  { id: 'colorado-avalanche', name: 'Colorado Avalanche', league: 'NHL', city: 'Denver', teamName: 'Avalanche' },
  { id: 'toronto-maple-leafs', name: 'Toronto Maple Leafs', league: 'NHL', city: 'Toronto', teamName: 'Maple Leafs' },
  { id: 'florida-panthers', name: 'Florida Panthers', league: 'NHL', city: 'Miami', teamName: 'Panthers' },
  { id: 'pittsburgh-penguins', name: 'Pittsburgh Penguins', league: 'NHL', city: 'Pittsburgh', teamName: 'Penguins' }
];

// Rightsholder-Placement-PlacementType configurations
export const rightsholderPlacementConfigs: RightsholderPlacementConfig[] = [
  // NBA - New York Knicks
  {
    rightsholderName: 'New York Knicks',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nba-jersey', name: 'Jersey', description: 'Team jersey branding' },
      { id: 'nba-shorts', name: 'Shorts', description: 'Team shorts branding' },
      { id: 'nba-shoes', name: 'Shoes', description: 'Player footwear' },
      { id: 'nba-warmups', name: 'Warm-ups', description: 'Pre-game warm-up gear' },
      { id: 'nba-headband', name: 'Headband', description: 'Player headband branding' }
    ]
  },
  {
    rightsholderName: 'New York Knicks',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nba-court-logo', name: 'Court Logo', description: 'Center court logo' },
      { id: 'nba-baseline', name: 'Baseline', description: 'Court baseline branding' },
      { id: 'nba-sideline', name: 'Sideline', description: 'Court sideline branding' },
      { id: 'nba-three-point', name: 'Three-Point Line', description: 'Three-point arc branding' }
    ]
  },
  {
    rightsholderName: 'New York Knicks',
    placementName: 'LED/Fascia',
    placementTypes: [
      { id: 'nba-led-courtside', name: 'Courtside LED', description: 'LED boards around court' },
      { id: 'nba-fascia', name: 'Fascia', description: 'Upper arena fascia displays' },
      { id: 'nba-ribbon', name: 'Ribbon Board', description: 'Continuous LED ribbon' }
    ]
  },
  {
    rightsholderName: 'New York Knicks',
    placementName: 'Broadcast Graphic',
    placementTypes: [
      { id: 'nba-scorebug', name: 'Scorebug', description: 'On-screen score display' },
      { id: 'nba-lower-third', name: 'Lower Third', description: 'Player/stat graphics' },
      { id: 'nba-replay', name: 'Replay Graphic', description: 'Replay overlay branding' }
    ]
  },
  {
    rightsholderName: 'New York Knicks',
    placementName: 'Venue Branding',
    placementTypes: [
      { id: 'nba-entrance', name: 'Entrance', description: 'Arena entrance branding' },
      { id: 'nba-concourse', name: 'Concourse', description: 'Arena concourse displays' },
      { id: 'nba-bench', name: 'Bench Area', description: 'Team bench branding' }
    ]
  },

  // MLB - New York Yankees
  {
    rightsholderName: 'New York Yankees',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'mlb-jersey-front', name: 'Jersey Front', description: 'Front jersey branding' },
      { id: 'mlb-jersey-back', name: 'Jersey Back', description: 'Back jersey branding' },
      { id: 'mlb-baseball-cap', name: 'Baseball Cap', description: 'Player cap branding' },
      { id: 'mlb-cleats', name: 'Cleats', description: 'Player footwear' },
      { id: 'mlb-gloves', name: 'Gloves', description: 'Baseball glove branding' },
      { id: 'mlb-batting-helmet', name: 'Batting Helmet', description: 'Batter helmet branding' }
    ]
  },
  {
    rightsholderName: 'New York Yankees',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'mlb-pitchers-mound', name: 'Pitcher\'s Mound', description: 'Mound logo placement' },
      { id: 'mlb-home-plate', name: 'Home Plate Area', description: 'Home plate branding' },
      { id: 'mlb-bases', name: 'Base Paths', description: 'Base path logos' },
      { id: 'mlb-outfield', name: 'Outfield Wall', description: 'Outfield wall signage' },
      { id: 'mlb-foul-territory', name: 'Foul Territory', description: 'Foul territory markings' }
    ]
  },
  {
    rightsholderName: 'New York Yankees',
    placementName: 'Billboard',
    placementTypes: [
      { id: 'mlb-outfield-board', name: 'Outfield Billboard', description: 'Large outfield displays' },
      { id: 'mlb-foul-pole', name: 'Foul Pole', description: 'Foul pole advertising' },
      { id: 'mlb-backstop', name: 'Backstop', description: 'Behind home plate signage' }
    ]
  },

  // NFL - New York Giants  
  {
    rightsholderName: 'New York Giants',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nfl-jersey', name: 'Jersey', description: 'Team jersey branding' },
      { id: 'nfl-pants', name: 'Pants', description: 'Team pants branding' },
      { id: 'nfl-helmet', name: 'Helmet', description: 'Player helmet branding' },
      { id: 'nfl-cleats', name: 'Cleats', description: 'Player footwear' },
      { id: 'nfl-gloves', name: 'Gloves', description: 'Player glove branding' },
      { id: 'nfl-towel', name: 'Towel', description: 'Player towel branding' }
    ]
  },
  {
    rightsholderName: 'New York Giants',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nfl-midfield', name: 'Midfield Logo', description: 'Center field logo' },
      { id: 'nfl-endzone', name: 'End Zone', description: 'End zone branding' },
      { id: 'nfl-sideline', name: 'Sideline', description: 'Sideline markings' },
      { id: 'nfl-goal-posts', name: 'Goal Posts', description: 'Goal post branding' }
    ]
  },

  // MLS - New York City FC
  {
    rightsholderName: 'New York City FC',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'mls-jersey', name: 'Jersey', description: 'Team jersey branding' },
      { id: 'mls-shorts', name: 'Shorts', description: 'Team shorts branding' },
      { id: 'mls-cleats', name: 'Cleats', description: 'Player footwear' },
      { id: 'mls-shin-guards', name: 'Shin Guards', description: 'Shin guard branding' },
      { id: 'mls-captain-armband', name: 'Captain Armband', description: 'Captain armband branding' }
    ]
  },
  {
    rightsholderName: 'New York City FC',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'mls-center-circle', name: 'Center Circle', description: 'Center circle logo' },
      { id: 'mls-penalty-area', name: 'Penalty Area', description: 'Penalty box branding' },
      { id: 'mls-corner', name: 'Corner Areas', description: 'Corner flag area branding' },
      { id: 'mls-sideline-ads', name: 'Sideline Boards', description: 'Sideline advertising boards' }
    ]
  },

  // NHL - New York Rangers
  {
    rightsholderName: 'New York Rangers',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nhl-jersey', name: 'Jersey', description: 'Team jersey branding' },
      { id: 'nhl-pants', name: 'Pants', description: 'Hockey pants branding' },
      { id: 'nhl-helmet', name: 'Helmet', description: 'Player helmet branding' },
      { id: 'nhl-skates', name: 'Skates', description: 'Player skate branding' },
      { id: 'nhl-gloves', name: 'Gloves', description: 'Hockey glove branding' },
      { id: 'nhl-stick', name: 'Hockey Stick', description: 'Stick branding' }
    ]
  },
  {
    rightsholderName: 'New York Rangers',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nhl-center-ice', name: 'Center Ice', description: 'Center ice logo' },
      { id: 'nhl-goal-crease', name: 'Goal Crease', description: 'Goal crease branding' },
      { id: 'nhl-face-off-circles', name: 'Face-off Circles', description: 'Face-off circle logos' },
      { id: 'nhl-boards', name: 'Boards', description: 'Rink board advertising' }
    ]
  },
  {
    rightsholderName: 'New York Rangers',
    placementName: 'LED/Fascia',
    placementTypes: [
      { id: 'nhl-dasher-led', name: 'Dasher LED', description: 'LED boards on dasher boards' },
      { id: 'nhl-glass', name: 'Glass Branding', description: 'Protective glass advertising' },
      { id: 'nhl-arena-fascia', name: 'Arena Fascia', description: 'Upper arena displays' }
    ]
  },

  // Add more sample configurations for other teams
  // Miami Heat - NBA
  {
    rightsholderName: 'Miami Heat',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nba-jersey-heat', name: 'Jersey', description: 'Heat jersey branding' },
      { id: 'nba-shorts-heat', name: 'Shorts', description: 'Heat shorts branding' },
      { id: 'nba-shoes-heat', name: 'Shoes', description: 'Heat player footwear' },
      { id: 'nba-warmups-heat', name: 'Warm-ups', description: 'Heat pre-game gear' }
    ]
  },
  {
    rightsholderName: 'Miami Heat',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nba-court-logo-heat', name: 'Court Logo', description: 'Heat center court logo' },
      { id: 'nba-baseline-heat', name: 'Baseline', description: 'Heat court baseline' },
      { id: 'nba-sideline-heat', name: 'Sideline', description: 'Heat court sideline' }
    ]
  },

  // Dallas Cowboys - NFL
  {
    rightsholderName: 'Dallas Cowboys',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nfl-jersey-cowboys', name: 'Jersey', description: 'Cowboys jersey branding' },
      { id: 'nfl-pants-cowboys', name: 'Pants', description: 'Cowboys pants branding' },
      { id: 'nfl-helmet-cowboys', name: 'Helmet', description: 'Cowboys helmet branding' },
      { id: 'nfl-cleats-cowboys', name: 'Cleats', description: 'Cowboys player footwear' }
    ]
  },
  {
    rightsholderName: 'Dallas Cowboys',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nfl-midfield-cowboys', name: 'Midfield Logo', description: 'Cowboys center field logo' },
      { id: 'nfl-endzone-cowboys', name: 'End Zone', description: 'Cowboys end zone branding' },
      { id: 'nfl-sideline-cowboys', name: 'Sideline', description: 'Cowboys sideline markings' }
    ]
  },

  // Atlanta United - MLS
  {
    rightsholderName: 'Atlanta United FC',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'mls-jersey-atlanta', name: 'Jersey', description: 'Atlanta United jersey branding' },
      { id: 'mls-shorts-atlanta', name: 'Shorts', description: 'Atlanta United shorts branding' },
      { id: 'mls-cleats-atlanta', name: 'Cleats', description: 'Atlanta United player footwear' },
      { id: 'mls-shin-guards-atlanta', name: 'Shin Guards', description: 'Atlanta United shin guard branding' }
    ]
  },
  {
    rightsholderName: 'Atlanta United FC',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'mls-center-circle-atlanta', name: 'Center Circle', description: 'Atlanta United center circle logo' },
      { id: 'mls-penalty-area-atlanta', name: 'Penalty Area', description: 'Atlanta United penalty box branding' },
      { id: 'mls-corner-atlanta', name: 'Corner Areas', description: 'Atlanta United corner flag area branding' }
    ]
  },

  // Tampa Bay Lightning - NHL
  {
    rightsholderName: 'Tampa Bay Lightning',
    placementName: 'Uniform',
    placementTypes: [
      { id: 'nhl-jersey-lightning', name: 'Jersey', description: 'Lightning jersey branding' },
      { id: 'nhl-pants-lightning', name: 'Pants', description: 'Lightning hockey pants branding' },
      { id: 'nhl-helmet-lightning', name: 'Helmet', description: 'Lightning player helmet branding' },
      { id: 'nhl-skates-lightning', name: 'Skates', description: 'Lightning player skate branding' }
    ]
  },
  {
    rightsholderName: 'Tampa Bay Lightning',
    placementName: 'Court/Field',
    placementTypes: [
      { id: 'nhl-center-ice-lightning', name: 'Center Ice', description: 'Lightning center ice logo' },
      { id: 'nhl-goal-crease-lightning', name: 'Goal Crease', description: 'Lightning goal crease branding' },
      { id: 'nhl-boards-lightning', name: 'Boards', description: 'Lightning rink board advertising' }
    ]
  }
];

// Helper functions
export const getRightsholdersByLeague = (league: string): Rightsholder[] => {
  return rightsholders.filter(rh => rh.league === league);
};

export const getPlacementsForRightsholder = (rightsholderName: string): string[] => {
  const configs = rightsholderPlacementConfigs.filter(config => config.rightsholderName === rightsholderName);
  return [...new Set(configs.map(config => config.placementName))];
};

export const getPlacementTypesForRightsholderPlacement = (rightsholderName: string, placementName: string): PlacementType[] => {
  const config = rightsholderPlacementConfigs.find(
    config => config.rightsholderName === rightsholderName && config.placementName === placementName
  );
  return config ? config.placementTypes : [];
};

export const getAllPlacementTypes = (): PlacementType[] => {
  const allTypes: PlacementType[] = [];
  rightsholderPlacementConfigs.forEach(config => {
    allTypes.push(...config.placementTypes);
  });
  
  // Remove duplicates based on id
  const uniqueTypes = allTypes.filter((type, index, self) => 
    index === self.findIndex(t => t.id === type.id)
  );
  
  return uniqueTypes;
}; 