export interface PlacementType {
  id: string;
  name: string;
}

export interface Placement {
  id: string;
  name: string; // "Uniform", "Field", "Court", "Pitch"
}

export interface Rightsholder {
  id: string;
  name: string;
  league: 'MLB' | 'NBA' | 'NFL' | 'MLS';
  city: string;
  teamName: string;
}

export interface RightsholderPlacementConfig {
  rightsholderId: string;
  placementId: string;
  placementTypeIds: string[];
}

export interface SelectedPlacement {
  rightsholder: Rightsholder;
  placementName: string;
  displayName: string; // "NY Yankees - Uniform"
}

// Base placement types
export const basePlacements: Placement[] = [
  { id: 'uniform', name: 'Uniform' },
  { id: 'field', name: 'Field' },
  { id: 'court', name: 'Court' },
  { id: 'pitch', name: 'Pitch' }
];

// All placement types across all sports
export const allPlacementTypes: PlacementType[] = [
  // MLB Uniform
  { id: 'jersey', name: 'Jersey' },
  { id: 'pants', name: 'Pants' },
  { id: 'cap', name: 'Cap' },
  { id: 'cleats', name: 'Cleats' },
  { id: 'jacket', name: 'Jacket' },
  { id: 'batting-gloves', name: 'Batting Gloves' },
  { id: 'gloves', name: 'Gloves' },
  { id: 'baseball-cap', name: 'Baseball Cap' },
  { id: 'hard-baseball-cap', name: 'Hard Baseball Cap' },
  { id: 'helmet', name: 'Helmet' },
  
  // MLB Field
  { id: 'outfield-wall-ad', name: 'Outfield Wall Ad' },
  { id: 'infield-grass-stencil', name: 'Infield Grass Stencil' },
  { id: 'mound-logo', name: 'Mound Logo' },
  { id: 'bullpen-fence-ad', name: 'Bullpen Fence Ad' },
  { id: 'outfield-sign', name: 'Outfield Sign' },
  { id: 'dugout-logo', name: 'Dugout Logo' },
  { id: 'scoreboard-logo', name: 'Scoreboard Logo' },
  { id: 'fence-signage', name: 'Fence Signage' },
  { id: 'home-plate-decal', name: 'Home Plate Decal' },
  { id: 'green-monster-ad', name: 'Green Monster Ad' },
  { id: 'infield-paint', name: 'Infield Paint' },
  { id: 'dugout-decal', name: 'Dugout Decal' },
  { id: 'bleacher-signage', name: 'Bleacher Signage' },
  { id: 'ivy-wall-ad', name: 'Ivy Wall Ad' },
  { id: 'scoreboard-decal', name: 'Scoreboard Decal' },
  { id: 'dugout-ad', name: 'Dugout Ad' },
  { id: 'wall-ad', name: 'Wall Ad' },
  { id: 'grass-stencil', name: 'Grass Stencil' },
  { id: 'scoreboard-ad', name: 'Scoreboard Ad' },
  { id: 'bullpen-sign', name: 'Bullpen Sign' },
  { id: 'infield-logo', name: 'Infield Logo' },
  { id: 'rockies-sign', name: 'Rockies Sign' },
  { id: 'outfield-board-ad', name: 'Outfield Board Ad' },
  { id: 'infield-stencil', name: 'Infield Stencil' },
  { id: 'outfield-signage', name: 'Outfield Signage' },
  { id: 'outfield-logo', name: 'Outfield Logo' },
  { id: 'infield-autograph-surface', name: 'Infield Autograph Surface' },
  { id: 'fence-ad', name: 'Fence Ad' },
  { id: 'bullpen-fence-logo', name: 'Bullpen Fence Logo' },
  { id: 'willets-point-ad', name: 'Willets Point Ad' },
  { id: 'yankee-stadium-ad', name: 'Yankee Stadium Ad' },
  { id: 'mound-stencil', name: 'Mound Stencil' },
  { id: 'wall-signage', name: 'Wall Signage' },
  { id: 'citizens-bank-signage', name: 'Citizens Bank Signage' },
  { id: 'mound-sticker', name: 'Mound Sticker' },
  { id: 'wall-sign', name: 'Wall Sign' },
  { id: 'mound-decal', name: 'Mound Decal' },
  
  // NBA Uniform
  { id: 'shorts', name: 'Shorts' },
  { id: 'socks', name: 'Socks' },
  { id: 'headband', name: 'Headband' },
  { id: 'compression-sleeves', name: 'Compression Sleeves' },
  
  // NBA Court
  { id: 'baseline-signage', name: 'Baseline Signage' },
  { id: 'center-court-logo', name: 'Center Court Logo' },
  { id: 'sideline-led', name: 'Sideline LED' },
  { id: 'parquet-logo', name: 'Parquet Logo' },
  { id: 'sideline-ad', name: 'Sideline Ad' },
  { id: 'baseline-digital', name: 'Baseline Digital' },
  { id: 'center-logo', name: 'Center Logo' },
  { id: 'sideline-sign', name: 'Sideline Sign' },
  { id: 'baseline-led', name: 'Baseline LED' },
  { id: 'baseline-ad', name: 'Baseline Ad' },
  { id: 'sideline-signage', name: 'Sideline Signage' },
  { id: 'court-logo', name: 'Court Logo' },
  { id: 'center-court-decal', name: 'Center Court Decal' },
  { id: 'sideline-board', name: 'Sideline Board' },
  { id: 'sideline-digital', name: 'Sideline Digital' },
  { id: 'center-court-logo-2', name: 'Center Court Logo' },
  { id: 'center-logo-2', name: 'Center Logo' },
  { id: 'baseline-signage-2', name: 'Baseline Signage' },
  
  // NFL Uniform
  { id: 'helmet-nfl', name: 'Helmet' },
  
  // NFL Field
  { id: 'endzone-logo', name: 'Endzone Logo' },
  { id: '50-yard-hash-branding', name: '50 Yard Hash Branding' },
  { id: 'endzone-decal', name: 'Endzone Decal' },
  { id: 'sideline-board', name: 'Sideline Board' },
  { id: 'line-of-scrimmage-ad', name: 'Line of Scrimmage Ad' },
  { id: 'endzone-branding', name: 'Endzone Branding' },
  { id: 'midfield-logo', name: 'Midfield Logo' },
  { id: 'endzone-stencil', name: 'Endzone Stencil' },
  { id: 'endzone-ad', name: 'Endzone Ad' },
  { id: 'midfield-decal', name: 'Midfield Decal' },
  { id: 'midfield-brand', name: 'Midfield Brand' },
  { id: 'star-logo', name: 'Star Logo' },
  { id: 'midfield-sign', name: 'Midfield Sign' },
  { id: 'midfield-branding', name: 'Midfield Branding' },
  { id: 'midfield-ad', name: 'Midfield Ad' },
  { id: 'line-of-scrimmage-board', name: 'Line of Scrimmage Board' },
  { id: 'endzone-arrowhead-logo', name: 'Endzone Arrowhead Logo' },
  { id: 'midfield-board', name: 'Midfield Board' },
  { id: 'midfield-sticker', name: 'Midfield Sticker' },
  { id: 'midfield-signage', name: 'Midfield Signage' },
  { id: 'midfield-sign-2', name: 'Midfield Sign' },
  
  // MLS Uniform - same as others where applicable
  
  // MLS Pitch
  { id: 'center-circle-logo', name: 'Center Circle Logo' },
  { id: 'sideline-board-ad', name: 'Sideline Board Ad' },
  { id: 'goal-net-signage', name: 'Goal Net Signage' },
  { id: 'sideline-ads', name: 'Sideline Ads' },
  { id: 'goal-signage', name: 'Goal Signage' },
  { id: 'center-circle-ad', name: 'Center Circle Ad' },
  { id: 'goal-net-sign', name: 'Goal Net Sign' },
  { id: 'goal-sponsorship', name: 'Goal Sponsorship' },
  { id: 'goal-net-ad', name: 'Goal Net Ad' },
  { id: 'sideline-boards', name: 'Sideline Boards' },
  { id: 'sideline-branding', name: 'Sideline Branding' },
  { id: 'goal-net-branding', name: 'Goal Net Branding' },
  { id: 'sideline-advertising', name: 'Sideline Advertising' }
];

// All teams across all leagues
export const rightsholders: Rightsholder[] = [
  // MLB Teams (30)
  { id: 'arizona-diamondbacks', name: 'Arizona Diamondbacks', league: 'MLB', city: 'Arizona', teamName: 'Diamondbacks' },
  { id: 'atlanta-braves', name: 'Atlanta Braves', league: 'MLB', city: 'Atlanta', teamName: 'Braves' },
  { id: 'baltimore-orioles', name: 'Baltimore Orioles', league: 'MLB', city: 'Baltimore', teamName: 'Orioles' },
  { id: 'boston-red-sox', name: 'Boston Red Sox', league: 'MLB', city: 'Boston', teamName: 'Red Sox' },
  { id: 'chicago-cubs', name: 'Chicago Cubs', league: 'MLB', city: 'Chicago', teamName: 'Cubs' },
  { id: 'chicago-white-sox', name: 'Chicago White Sox', league: 'MLB', city: 'Chicago', teamName: 'White Sox' },
  { id: 'cincinnati-reds', name: 'Cincinnati Reds', league: 'MLB', city: 'Cincinnati', teamName: 'Reds' },
  { id: 'cleveland-guardians', name: 'Cleveland Guardians', league: 'MLB', city: 'Cleveland', teamName: 'Guardians' },
  { id: 'colorado-rockies', name: 'Colorado Rockies', league: 'MLB', city: 'Colorado', teamName: 'Rockies' },
  { id: 'detroit-tigers', name: 'Detroit Tigers', league: 'MLB', city: 'Detroit', teamName: 'Tigers' },
  { id: 'houston-astros', name: 'Houston Astros', league: 'MLB', city: 'Houston', teamName: 'Astros' },
  { id: 'kansas-city-royals', name: 'Kansas City Royals', league: 'MLB', city: 'Kansas City', teamName: 'Royals' },
  { id: 'los-angeles-angels', name: 'Los Angeles Angels', league: 'MLB', city: 'Los Angeles', teamName: 'Angels' },
  { id: 'los-angeles-dodgers', name: 'Los Angeles Dodgers', league: 'MLB', city: 'Los Angeles', teamName: 'Dodgers' },
  { id: 'miami-marlins', name: 'Miami Marlins', league: 'MLB', city: 'Miami', teamName: 'Marlins' },
  { id: 'milwaukee-brewers', name: 'Milwaukee Brewers', league: 'MLB', city: 'Milwaukee', teamName: 'Brewers' },
  { id: 'minnesota-twins', name: 'Minnesota Twins', league: 'MLB', city: 'Minnesota', teamName: 'Twins' },
  { id: 'new-york-mets', name: 'New York Mets', league: 'MLB', city: 'New York', teamName: 'Mets' },
  { id: 'new-york-yankees', name: 'New York Yankees', league: 'MLB', city: 'New York', teamName: 'Yankees' },
  { id: 'oakland-athletics', name: 'Oakland Athletics', league: 'MLB', city: 'Oakland', teamName: 'Athletics' },
  { id: 'philadelphia-phillies', name: 'Philadelphia Phillies', league: 'MLB', city: 'Philadelphia', teamName: 'Phillies' },
  { id: 'pittsburgh-pirates', name: 'Pittsburgh Pirates', league: 'MLB', city: 'Pittsburgh', teamName: 'Pirates' },
  { id: 'san-diego-padres', name: 'San Diego Padres', league: 'MLB', city: 'San Diego', teamName: 'Padres' },
  { id: 'san-francisco-giants', name: 'San Francisco Giants', league: 'MLB', city: 'San Francisco', teamName: 'Giants' },
  { id: 'seattle-mariners', name: 'Seattle Mariners', league: 'MLB', city: 'Seattle', teamName: 'Mariners' },
  { id: 'st-louis-cardinals', name: 'St. Louis Cardinals', league: 'MLB', city: 'St. Louis', teamName: 'Cardinals' },
  { id: 'tampa-bay-rays', name: 'Tampa Bay Rays', league: 'MLB', city: 'Tampa Bay', teamName: 'Rays' },
  { id: 'texas-rangers', name: 'Texas Rangers', league: 'MLB', city: 'Texas', teamName: 'Rangers' },
  { id: 'toronto-blue-jays', name: 'Toronto Blue Jays', league: 'MLB', city: 'Toronto', teamName: 'Blue Jays' },
  { id: 'washington-nationals', name: 'Washington Nationals', league: 'MLB', city: 'Washington', teamName: 'Nationals' },

  // NBA Teams (30)
  { id: 'atlanta-hawks', name: 'Atlanta Hawks', league: 'NBA', city: 'Atlanta', teamName: 'Hawks' },
  { id: 'boston-celtics', name: 'Boston Celtics', league: 'NBA', city: 'Boston', teamName: 'Celtics' },
  { id: 'brooklyn-nets', name: 'Brooklyn Nets', league: 'NBA', city: 'Brooklyn', teamName: 'Nets' },
  { id: 'charlotte-hornets', name: 'Charlotte Hornets', league: 'NBA', city: 'Charlotte', teamName: 'Hornets' },
  { id: 'chicago-bulls', name: 'Chicago Bulls', league: 'NBA', city: 'Chicago', teamName: 'Bulls' },
  { id: 'cleveland-cavaliers', name: 'Cleveland Cavaliers', league: 'NBA', city: 'Cleveland', teamName: 'Cavaliers' },
  { id: 'dallas-mavericks', name: 'Dallas Mavericks', league: 'NBA', city: 'Dallas', teamName: 'Mavericks' },
  { id: 'denver-nuggets', name: 'Denver Nuggets', league: 'NBA', city: 'Denver', teamName: 'Nuggets' },
  { id: 'detroit-pistons', name: 'Detroit Pistons', league: 'NBA', city: 'Detroit', teamName: 'Pistons' },
  { id: 'golden-state-warriors', name: 'Golden State Warriors', league: 'NBA', city: 'Golden State', teamName: 'Warriors' },
  { id: 'houston-rockets', name: 'Houston Rockets', league: 'NBA', city: 'Houston', teamName: 'Rockets' },
  { id: 'indiana-pacers', name: 'Indiana Pacers', league: 'NBA', city: 'Indiana', teamName: 'Pacers' },
  { id: 'la-clippers', name: 'LA Clippers', league: 'NBA', city: 'Los Angeles', teamName: 'Clippers' },
  { id: 'los-angeles-lakers', name: 'Los Angeles Lakers', league: 'NBA', city: 'Los Angeles', teamName: 'Lakers' },
  { id: 'memphis-grizzlies', name: 'Memphis Grizzlies', league: 'NBA', city: 'Memphis', teamName: 'Grizzlies' },
  { id: 'miami-heat', name: 'Miami Heat', league: 'NBA', city: 'Miami', teamName: 'Heat' },
  { id: 'milwaukee-bucks', name: 'Milwaukee Bucks', league: 'NBA', city: 'Milwaukee', teamName: 'Bucks' },
  { id: 'minnesota-timberwolves', name: 'Minnesota Timberwolves', league: 'NBA', city: 'Minnesota', teamName: 'Timberwolves' },
  { id: 'new-orleans-pelicans', name: 'New Orleans Pelicans', league: 'NBA', city: 'New Orleans', teamName: 'Pelicans' },
  { id: 'new-york-knicks', name: 'New York Knicks', league: 'NBA', city: 'New York', teamName: 'Knicks' },
  { id: 'oklahoma-city-thunder', name: 'Oklahoma City Thunder', league: 'NBA', city: 'Oklahoma City', teamName: 'Thunder' },
  { id: 'orlando-magic', name: 'Orlando Magic', league: 'NBA', city: 'Orlando', teamName: 'Magic' },
  { id: 'philadelphia-76ers', name: 'Philadelphia 76ers', league: 'NBA', city: 'Philadelphia', teamName: '76ers' },
  { id: 'phoenix-suns', name: 'Phoenix Suns', league: 'NBA', city: 'Phoenix', teamName: 'Suns' },
  { id: 'portland-trail-blazers', name: 'Portland Trail Blazers', league: 'NBA', city: 'Portland', teamName: 'Trail Blazers' },
  { id: 'sacramento-kings', name: 'Sacramento Kings', league: 'NBA', city: 'Sacramento', teamName: 'Kings' },
  { id: 'san-antonio-spurs', name: 'San Antonio Spurs', league: 'NBA', city: 'San Antonio', teamName: 'Spurs' },
  { id: 'toronto-raptors', name: 'Toronto Raptors', league: 'NBA', city: 'Toronto', teamName: 'Raptors' },
  { id: 'utah-jazz', name: 'Utah Jazz', league: 'NBA', city: 'Utah', teamName: 'Jazz' },
  { id: 'washington-wizards', name: 'Washington Wizards', league: 'NBA', city: 'Washington', teamName: 'Wizards' },

  // NFL Teams (32)
  { id: 'arizona-cardinals', name: 'Arizona Cardinals', league: 'NFL', city: 'Arizona', teamName: 'Cardinals' },
  { id: 'atlanta-falcons', name: 'Atlanta Falcons', league: 'NFL', city: 'Atlanta', teamName: 'Falcons' },
  { id: 'baltimore-ravens', name: 'Baltimore Ravens', league: 'NFL', city: 'Baltimore', teamName: 'Ravens' },
  { id: 'buffalo-bills', name: 'Buffalo Bills', league: 'NFL', city: 'Buffalo', teamName: 'Bills' },
  { id: 'carolina-panthers', name: 'Carolina Panthers', league: 'NFL', city: 'Carolina', teamName: 'Panthers' },
  { id: 'chicago-bears', name: 'Chicago Bears', league: 'NFL', city: 'Chicago', teamName: 'Bears' },
  { id: 'cincinnati-bengals', name: 'Cincinnati Bengals', league: 'NFL', city: 'Cincinnati', teamName: 'Bengals' },
  { id: 'cleveland-browns', name: 'Cleveland Browns', league: 'NFL', city: 'Cleveland', teamName: 'Browns' },
  { id: 'dallas-cowboys', name: 'Dallas Cowboys', league: 'NFL', city: 'Dallas', teamName: 'Cowboys' },
  { id: 'denver-broncos', name: 'Denver Broncos', league: 'NFL', city: 'Denver', teamName: 'Broncos' },
  { id: 'detroit-lions', name: 'Detroit Lions', league: 'NFL', city: 'Detroit', teamName: 'Lions' },
  { id: 'green-bay-packers', name: 'Green Bay Packers', league: 'NFL', city: 'Green Bay', teamName: 'Packers' },
  { id: 'houston-texans', name: 'Houston Texans', league: 'NFL', city: 'Houston', teamName: 'Texans' },
  { id: 'indianapolis-colts', name: 'Indianapolis Colts', league: 'NFL', city: 'Indianapolis', teamName: 'Colts' },
  { id: 'jacksonville-jaguars', name: 'Jacksonville Jaguars', league: 'NFL', city: 'Jacksonville', teamName: 'Jaguars' },
  { id: 'kansas-city-chiefs', name: 'Kansas City Chiefs', league: 'NFL', city: 'Kansas City', teamName: 'Chiefs' },
  { id: 'las-vegas-raiders', name: 'Las Vegas Raiders', league: 'NFL', city: 'Las Vegas', teamName: 'Raiders' },
  { id: 'los-angeles-chargers', name: 'Los Angeles Chargers', league: 'NFL', city: 'Los Angeles', teamName: 'Chargers' },
  { id: 'los-angeles-rams', name: 'Los Angeles Rams', league: 'NFL', city: 'Los Angeles', teamName: 'Rams' },
  { id: 'miami-dolphins', name: 'Miami Dolphins', league: 'NFL', city: 'Miami', teamName: 'Dolphins' },
  { id: 'minnesota-vikings', name: 'Minnesota Vikings', league: 'NFL', city: 'Minnesota', teamName: 'Vikings' },
  { id: 'new-england-patriots', name: 'New England Patriots', league: 'NFL', city: 'New England', teamName: 'Patriots' },
  { id: 'new-orleans-saints', name: 'New Orleans Saints', league: 'NFL', city: 'New Orleans', teamName: 'Saints' },
  { id: 'new-york-giants', name: 'New York Giants', league: 'NFL', city: 'New York', teamName: 'Giants' },
  { id: 'new-york-jets', name: 'New York Jets', league: 'NFL', city: 'New York', teamName: 'Jets' },
  { id: 'philadelphia-eagles', name: 'Philadelphia Eagles', league: 'NFL', city: 'Philadelphia', teamName: 'Eagles' },
  { id: 'pittsburgh-steelers', name: 'Pittsburgh Steelers', league: 'NFL', city: 'Pittsburgh', teamName: 'Steelers' },
  { id: 'san-francisco-49ers', name: 'San Francisco 49ers', league: 'NFL', city: 'San Francisco', teamName: '49ers' },
  { id: 'seattle-seahawks', name: 'Seattle Seahawks', league: 'NFL', city: 'Seattle', teamName: 'Seahawks' },
  { id: 'tampa-bay-buccaneers', name: 'Tampa Bay Buccaneers', league: 'NFL', city: 'Tampa Bay', teamName: 'Buccaneers' },
  { id: 'tennessee-titans', name: 'Tennessee Titans', league: 'NFL', city: 'Tennessee', teamName: 'Titans' },
  { id: 'washington-commanders', name: 'Washington Commanders', league: 'NFL', city: 'Washington', teamName: 'Commanders' },

  // MLS Teams (29)
  { id: 'atlanta-united-fc', name: 'Atlanta United FC', league: 'MLS', city: 'Atlanta', teamName: 'United FC' },
  { id: 'austin-fc', name: 'Austin FC', league: 'MLS', city: 'Austin', teamName: 'FC' },
  { id: 'cf-montreal', name: 'CF Montréal', league: 'MLS', city: 'Montréal', teamName: 'CF' },
  { id: 'chicago-fire-fc', name: 'Chicago Fire FC', league: 'MLS', city: 'Chicago', teamName: 'Fire FC' },
  { id: 'fc-cincinnati', name: 'FC Cincinnati', league: 'MLS', city: 'Cincinnati', teamName: 'FC' },
  { id: 'colorado-rapids', name: 'Colorado Rapids', league: 'MLS', city: 'Colorado', teamName: 'Rapids' },
  { id: 'columbus-crew', name: 'Columbus Crew', league: 'MLS', city: 'Columbus', teamName: 'Crew' },
  { id: 'dc-united', name: 'D.C. United', league: 'MLS', city: 'D.C.', teamName: 'United' },
  { id: 'fc-dallas', name: 'FC Dallas', league: 'MLS', city: 'Dallas', teamName: 'FC' },
  { id: 'houston-dynamo-fc', name: 'Houston Dynamo FC', league: 'MLS', city: 'Houston', teamName: 'Dynamo FC' },
  { id: 'inter-miami-cf', name: 'Inter Miami CF', league: 'MLS', city: 'Miami', teamName: 'Inter CF' },
  { id: 'la-galaxy', name: 'LA Galaxy', league: 'MLS', city: 'Los Angeles', teamName: 'Galaxy' },
  { id: 'los-angeles-fc', name: 'Los Angeles FC', league: 'MLS', city: 'Los Angeles', teamName: 'FC' },
  { id: 'minnesota-united-fc', name: 'Minnesota United FC', league: 'MLS', city: 'Minnesota', teamName: 'United FC' },
  { id: 'nashville-sc', name: 'Nashville SC', league: 'MLS', city: 'Nashville', teamName: 'SC' },
  { id: 'new-england-revolution', name: 'New England Revolution', league: 'MLS', city: 'New England', teamName: 'Revolution' },
  { id: 'new-york-city-fc', name: 'New York City FC', league: 'MLS', city: 'New York', teamName: 'City FC' },
  { id: 'new-york-red-bulls', name: 'New York Red Bulls', league: 'MLS', city: 'New York', teamName: 'Red Bulls' },
  { id: 'orlando-city-sc', name: 'Orlando City SC', league: 'MLS', city: 'Orlando', teamName: 'City SC' },
  { id: 'philadelphia-union', name: 'Philadelphia Union', league: 'MLS', city: 'Philadelphia', teamName: 'Union' },
  { id: 'portland-timbers', name: 'Portland Timbers', league: 'MLS', city: 'Portland', teamName: 'Timbers' },
  { id: 'real-salt-lake', name: 'Real Salt Lake', league: 'MLS', city: 'Salt Lake', teamName: 'Real' },
  { id: 'san-diego-fc', name: 'San Diego FC', league: 'MLS', city: 'San Diego', teamName: 'FC' },
  { id: 'san-jose-earthquakes', name: 'San Jose Earthquakes', league: 'MLS', city: 'San Jose', teamName: 'Earthquakes' },
  { id: 'seattle-sounders-fc', name: 'Seattle Sounders FC', league: 'MLS', city: 'Seattle', teamName: 'Sounders FC' },
  { id: 'sporting-kansas-city', name: 'Sporting Kansas City', league: 'MLS', city: 'Kansas City', teamName: 'Sporting' },
  { id: 'st-louis-city-sc', name: 'St. Louis City SC', league: 'MLS', city: 'St. Louis', teamName: 'City SC' },
  { id: 'toronto-fc', name: 'Toronto FC', league: 'MLS', city: 'Toronto', teamName: 'FC' },
  { id: 'vancouver-whitecaps-fc', name: 'Vancouver Whitecaps FC', league: 'MLS', city: 'Vancouver', teamName: 'Whitecaps FC' }
];

// Comprehensive configurations for all teams
export const rightsholderPlacementConfigs: RightsholderPlacementConfig[] = [
  // MLB Teams with Uniform and Field placements
  
  // Arizona Diamondbacks
  { rightsholderId: 'arizona-diamondbacks', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'arizona-diamondbacks', placementId: 'field', placementTypeIds: ['outfield-wall-ad', 'infield-grass-stencil', 'mound-logo'] },
  
  // Atlanta Braves
  { rightsholderId: 'atlanta-braves', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'atlanta-braves', placementId: 'field', placementTypeIds: ['bullpen-fence-ad', 'outfield-sign', 'dugout-logo'] },
  
  // Baltimore Orioles
  { rightsholderId: 'baltimore-orioles', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'baltimore-orioles', placementId: 'field', placementTypeIds: ['scoreboard-logo', 'fence-signage', 'home-plate-decal'] },
  
  // Boston Red Sox
  { rightsholderId: 'boston-red-sox', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'boston-red-sox', placementId: 'field', placementTypeIds: ['green-monster-ad', 'infield-paint', 'dugout-decal'] },
  
  // Chicago Cubs
  { rightsholderId: 'chicago-cubs', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'chicago-cubs', placementId: 'field', placementTypeIds: ['bleacher-signage', 'ivy-wall-ad', 'mound-logo'] },
  
  // Chicago White Sox
  { rightsholderId: 'chicago-white-sox', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'chicago-white-sox', placementId: 'field', placementTypeIds: ['outfield-sign', 'scoreboard-decal', 'dugout-ad'] },
  
  // Cincinnati Reds
  { rightsholderId: 'cincinnati-reds', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'cincinnati-reds', placementId: 'field', placementTypeIds: ['wall-ad', 'grass-stencil', 'mound-logo'] },
  
  // Cleveland Guardians
  { rightsholderId: 'cleveland-guardians', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'cleveland-guardians', placementId: 'field', placementTypeIds: ['scoreboard-ad', 'bullpen-sign', 'infield-logo'] },
  
  // Colorado Rockies
  { rightsholderId: 'colorado-rockies', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'colorado-rockies', placementId: 'field', placementTypeIds: ['rockies-sign', 'wall-ad', 'mound-logo'] },
  
  // Detroit Tigers
  { rightsholderId: 'detroit-tigers', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'detroit-tigers', placementId: 'field', placementTypeIds: ['outfield-board-ad', 'infield-stencil', 'scoreboard-logo'] },
  
  // Houston Astros
  { rightsholderId: 'houston-astros', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'houston-astros', placementId: 'field', placementTypeIds: ['outfield-sign', 'mound-logo', 'dugout-ad'] },
  
  // Kansas City Royals
  { rightsholderId: 'kansas-city-royals', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'kansas-city-royals', placementId: 'field', placementTypeIds: ['wall-ad', 'infield-logo', 'bullpen-sign'] },
  
  // Los Angeles Angels
  { rightsholderId: 'los-angeles-angels', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'los-angeles-angels', placementId: 'field', placementTypeIds: ['outfield-signage', 'scoreboard-decal', 'mound-logo'] },
  
  // Los Angeles Dodgers
  { rightsholderId: 'los-angeles-dodgers', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'los-angeles-dodgers', placementId: 'field', placementTypeIds: ['outfield-logo', 'wall-ad', 'infield-autograph-surface'] },
  
  // Miami Marlins
  { rightsholderId: 'miami-marlins', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'miami-marlins', placementId: 'field', placementTypeIds: ['fence-ad', 'mound-logo', 'scoreboard-decal'] },
  
  // Milwaukee Brewers
  { rightsholderId: 'milwaukee-brewers', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'milwaukee-brewers', placementId: 'field', placementTypeIds: ['wall-ad', 'infield-stencil', 'bullpen-fence-logo'] },
  
  // Minnesota Twins
  { rightsholderId: 'minnesota-twins', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'minnesota-twins', placementId: 'field', placementTypeIds: ['outfield-sign', 'mound-logo', 'scoreboard-decal'] },
  
  // New York Mets
  { rightsholderId: 'new-york-mets', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'new-york-mets', placementId: 'field', placementTypeIds: ['willets-point-ad', 'infield-stencil', 'scoreboard-logo'] },
  
  // New York Yankees
  { rightsholderId: 'new-york-yankees', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cleats', 'gloves', 'baseball-cap', 'hard-baseball-cap', 'jacket'] },
  { rightsholderId: 'new-york-yankees', placementId: 'field', placementTypeIds: ['yankee-stadium-ad', 'infield-logo', 'mound-stencil'] },
  
  // Oakland Athletics
  { rightsholderId: 'oakland-athletics', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'oakland-athletics', placementId: 'field', placementTypeIds: ['wall-signage', 'scoreboard-ad', 'mound-logo'] },
  
  // Philadelphia Phillies
  { rightsholderId: 'philadelphia-phillies', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'philadelphia-phillies', placementId: 'field', placementTypeIds: ['citizens-bank-signage', 'infield-stencil', 'bullpen-ad'] },
  
  // Pittsburgh Pirates
  { rightsholderId: 'pittsburgh-pirates', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'pittsburgh-pirates', placementId: 'field', placementTypeIds: ['outfield-ad', 'mound-sticker', 'scoreboard-logo'] },
  
  // San Diego Padres
  { rightsholderId: 'san-diego-padres', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'san-diego-padres', placementId: 'field', placementTypeIds: ['wall-ad', 'infield-stencil', 'scoreboard-sign'] },
  
  // San Francisco Giants
  { rightsholderId: 'san-francisco-giants', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'san-francisco-giants', placementId: 'field', placementTypeIds: ['outfield-logo', 'mound-decal', 'scoreboard-ad'] },
  
  // Seattle Mariners
  { rightsholderId: 'seattle-mariners', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'seattle-mariners', placementId: 'field', placementTypeIds: ['wall-signage', 'grass-stencil', 'mound-logo'] },
  
  // St. Louis Cardinals
  { rightsholderId: 'st-louis-cardinals', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'st-louis-cardinals', placementId: 'field', placementTypeIds: ['outfield-board-ad', 'infield-stencil', 'mound-logo'] },
  
  // Tampa Bay Rays
  { rightsholderId: 'tampa-bay-rays', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'tampa-bay-rays', placementId: 'field', placementTypeIds: ['wall-signage', 'scoreboard-logo', 'mound-decal'] },
  
  // Texas Rangers
  { rightsholderId: 'texas-rangers', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'texas-rangers', placementId: 'field', placementTypeIds: ['outfield-ad', 'infield-stencil', 'mound-logo'] },
  
  // Toronto Blue Jays
  { rightsholderId: 'toronto-blue-jays', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'batting-gloves'] },
  { rightsholderId: 'toronto-blue-jays', placementId: 'field', placementTypeIds: ['wall-logo', 'scoreboard-ad', 'mound-stencil'] },
  
  // Washington Nationals
  { rightsholderId: 'washington-nationals', placementId: 'uniform', placementTypeIds: ['jersey', 'pants', 'cap', 'cleats', 'jacket'] },
  { rightsholderId: 'washington-nationals', placementId: 'field', placementTypeIds: ['outfield-signage', 'infield-logo', 'mound-ad'] },

  // NBA Teams with Uniform and Court placements
  
  // Atlanta Hawks
  { rightsholderId: 'atlanta-hawks', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'atlanta-hawks', placementId: 'court', placementTypeIds: ['baseline-signage', 'center-court-logo', 'sideline-led'] },
  
  // Boston Celtics
  { rightsholderId: 'boston-celtics', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'compression-sleeves'] },
  { rightsholderId: 'boston-celtics', placementId: 'court', placementTypeIds: ['parquet-logo', 'sideline-ad', 'baseline-digital'] },
  
  // Brooklyn Nets
  { rightsholderId: 'brooklyn-nets', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'brooklyn-nets', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-sign', 'baseline-led'] },
  
  // Charlotte Hornets
  { rightsholderId: 'charlotte-hornets', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'charlotte-hornets', placementId: 'court', placementTypeIds: ['baseline-ad', 'center-logo', 'sideline-signage'] },
  
  // Chicago Bulls
  { rightsholderId: 'chicago-bulls', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'chicago-bulls', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-ad', 'baseline-digital'] },
  
  // Cleveland Cavaliers
  { rightsholderId: 'cleveland-cavaliers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'cleveland-cavaliers', placementId: 'court', placementTypeIds: ['center-court-decal', 'sideline-board', 'baseline-signage'] },
  
  // Dallas Mavericks
  { rightsholderId: 'dallas-mavericks', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'dallas-mavericks', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-led', 'baseline-signage'] },
  
  // Denver Nuggets
  { rightsholderId: 'denver-nuggets', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'denver-nuggets', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-ad', 'baseline-digital'] },
  
  // Detroit Pistons
  { rightsholderId: 'detroit-pistons', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'detroit-pistons', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-signage', 'baseline-ad'] },
  
  // Golden State Warriors
  { rightsholderId: 'golden-state-warriors', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'golden-state-warriors', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-digital', 'baseline-signage'] },
  
  // Houston Rockets
  { rightsholderId: 'houston-rockets', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'houston-rockets', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-ad', 'baseline-led'] },
  
  // Indiana Pacers
  { rightsholderId: 'indiana-pacers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'indiana-pacers', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-board', 'baseline-signage'] },
  
  // LA Clippers
  { rightsholderId: 'la-clippers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'la-clippers', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-digital', 'baseline-ad'] },
  
  // Los Angeles Lakers
  { rightsholderId: 'los-angeles-lakers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'los-angeles-lakers', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-signage', 'baseline-led'] },
  
  // Memphis Grizzlies
  { rightsholderId: 'memphis-grizzlies', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'memphis-grizzlies', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-ad', 'baseline-digital'] },
  
  // Miami Heat
  { rightsholderId: 'miami-heat', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'miami-heat', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-signage', 'baseline-digital'] },
  
  // Milwaukee Bucks
  { rightsholderId: 'milwaukee-bucks', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'milwaukee-bucks', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-ad', 'baseline-led'] },
  
  // Minnesota Timberwolves
  { rightsholderId: 'minnesota-timberwolves', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'minnesota-timberwolves', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-digital', 'baseline-signage'] },
  
  // New Orleans Pelicans
  { rightsholderId: 'new-orleans-pelicans', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'new-orleans-pelicans', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-ad', 'baseline-signage'] },
  
  // New York Knicks
  { rightsholderId: 'new-york-knicks', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'new-york-knicks', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-signage', 'baseline-digital'] },
  
  // Oklahoma City Thunder
  { rightsholderId: 'oklahoma-city-thunder', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'oklahoma-city-thunder', placementId: 'court', placementTypeIds: ['court-logo', 'baseline-signage', 'sideline-board'] },
  
  // Orlando Magic
  { rightsholderId: 'orlando-magic', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'orlando-magic', placementId: 'court', placementTypeIds: ['center-logo-2', 'sideline-ad', 'baseline-digital'] },
  
  // Philadelphia 76ers
  { rightsholderId: 'philadelphia-76ers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'philadelphia-76ers', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-signage', 'baseline-led'] },
  
  // Phoenix Suns
  { rightsholderId: 'phoenix-suns', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'phoenix-suns', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-board', 'baseline-signage'] },
  
  // Portland Trail Blazers
  { rightsholderId: 'portland-trail-blazers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'portland-trail-blazers', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-signage', 'baseline-digital'] },
  
  // Sacramento Kings
  { rightsholderId: 'sacramento-kings', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'sacramento-kings', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-ad', 'baseline-signage'] },
  
  // San Antonio Spurs
  { rightsholderId: 'san-antonio-spurs', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'san-antonio-spurs', placementId: 'court', placementTypeIds: ['court-logo', 'sideline-signage', 'baseline-digital'] },
  
  // Toronto Raptors
  { rightsholderId: 'toronto-raptors', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'toronto-raptors', placementId: 'court', placementTypeIds: ['center-court-logo', 'sideline-ad', 'baseline-signage'] },
  
  // Utah Jazz
  { rightsholderId: 'utah-jazz', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'utah-jazz', placementId: 'court', placementTypeIds: ['center-logo', 'baseline-signage', 'sideline-board'] },
  
  // Washington Wizards
  { rightsholderId: 'washington-wizards', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'headband'] },
  { rightsholderId: 'washington-wizards', placementId: 'court', placementTypeIds: ['center-logo', 'sideline-signage', 'baseline-led'] },

  // NFL Teams with Uniform and Field placements
  
  // Arizona Cardinals
  { rightsholderId: 'arizona-cardinals', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'arizona-cardinals', placementId: 'field', placementTypeIds: ['endzone-logo', '50-yard-hash-branding'] },
  
  // Atlanta Falcons
  { rightsholderId: 'atlanta-falcons', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'atlanta-falcons', placementId: 'field', placementTypeIds: ['endzone-decal', 'sideline-board'] },
  
  // Baltimore Ravens
  { rightsholderId: 'baltimore-ravens', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'baltimore-ravens', placementId: 'field', placementTypeIds: ['line-of-scrimmage-ad', 'endzone-logo'] },
  
  // Buffalo Bills
  { rightsholderId: 'buffalo-bills', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'buffalo-bills', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-logo'] },
  
  // Carolina Panthers
  { rightsholderId: 'carolina-panthers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'carolina-panthers', placementId: 'field', placementTypeIds: ['endzone-stencil', 'midfield-logo'] },
  
  // Chicago Bears
  { rightsholderId: 'chicago-bears', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'chicago-bears', placementId: 'field', placementTypeIds: ['endzone-ad', 'sideline-board'] },
  
  // Cincinnati Bengals
  { rightsholderId: 'cincinnati-bengals', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'cincinnati-bengals', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-decal'] },
  
  // Cleveland Browns
  { rightsholderId: 'cleveland-browns', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'cleveland-browns', placementId: 'field', placementTypeIds: ['endzone-ad', 'midfield-brand'] },
  
  // Dallas Cowboys
  { rightsholderId: 'dallas-cowboys', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'dallas-cowboys', placementId: 'field', placementTypeIds: ['star-logo', 'endzone-branding'] },
  
  // Denver Broncos
  { rightsholderId: 'denver-broncos', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'denver-broncos', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-sign'] },
  
  // Detroit Lions
  { rightsholderId: 'detroit-lions', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'detroit-lions', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-branding'] },
  
  // Green Bay Packers
  { rightsholderId: 'green-bay-packers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'green-bay-packers', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-ad'] },
  
  // Houston Texans
  { rightsholderId: 'houston-texans', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'houston-texans', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-logo'] },
  
  // Indianapolis Colts
  { rightsholderId: 'indianapolis-colts', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'indianapolis-colts', placementId: 'field', placementTypeIds: ['endzone-logo', 'line-of-scrimmage-board'] },
  
  // Jacksonville Jaguars
  { rightsholderId: 'jacksonville-jaguars', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'jacksonville-jaguars', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-logo'] },
  
  // Kansas City Chiefs
  { rightsholderId: 'kansas-city-chiefs', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'kansas-city-chiefs', placementId: 'field', placementTypeIds: ['endzone-arrowhead-logo', 'midfield-brand'] },
  
  // Las Vegas Raiders
  { rightsholderId: 'las-vegas-raiders', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'las-vegas-raiders', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-ad'] },
  
  // Los Angeles Chargers
  { rightsholderId: 'los-angeles-chargers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'los-angeles-chargers', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-logo'] },
  
  // Los Angeles Rams
  { rightsholderId: 'los-angeles-rams', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'los-angeles-rams', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-branding'] },
  
  // Miami Dolphins
  { rightsholderId: 'miami-dolphins', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'miami-dolphins', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-decal'] },
  
  // Minnesota Vikings
  { rightsholderId: 'minnesota-vikings', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'minnesota-vikings', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-board'] },
  
  // New England Patriots
  { rightsholderId: 'new-england-patriots', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'new-england-patriots', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-logo'] },
  
  // New Orleans Saints
  { rightsholderId: 'new-orleans-saints', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'new-orleans-saints', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-logo'] },
  
  // New York Giants
  { rightsholderId: 'new-york-giants', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'new-york-giants', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-board'] },
  
  // New York Jets
  { rightsholderId: 'new-york-jets', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'new-york-jets', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-branding'] },
  
  // Philadelphia Eagles
  { rightsholderId: 'philadelphia-eagles', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'philadelphia-eagles', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-signage'] },
  
  // Pittsburgh Steelers
  { rightsholderId: 'pittsburgh-steelers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'pittsburgh-steelers', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-ad'] },
  
  // San Francisco 49ers
  { rightsholderId: 'san-francisco-49ers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'san-francisco-49ers', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-sticker'] },
  
  // Seattle Seahawks
  { rightsholderId: 'seattle-seahawks', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'seattle-seahawks', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-logo'] },
  
  // Tampa Bay Buccaneers
  { rightsholderId: 'tampa-bay-buccaneers', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'tampa-bay-buccaneers', placementId: 'field', placementTypeIds: ['endzone-decal', 'midfield-ad'] },
  
  // Tennessee Titans
  { rightsholderId: 'tennessee-titans', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'tennessee-titans', placementId: 'field', placementTypeIds: ['endzone-logo', 'midfield-branding'] },
  
  // Washington Commanders
  { rightsholderId: 'washington-commanders', placementId: 'uniform', placementTypeIds: ['jersey', 'helmet-nfl', 'pants', 'cleats', 'gloves'] },
  { rightsholderId: 'washington-commanders', placementId: 'field', placementTypeIds: ['endzone-branding', 'midfield-sign-2'] },

  // MLS Teams with Uniform and Pitch placements
  
  // Atlanta United FC
  { rightsholderId: 'atlanta-united-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'atlanta-united-fc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-board-ad', 'goal-net-signage'] },
  
  // Austin FC
  { rightsholderId: 'austin-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'austin-fc', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-ads', 'goal-signage'] },
  
  // CF Montréal
  { rightsholderId: 'cf-montreal', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'cf-montreal', placementId: 'pitch', placementTypeIds: ['center-circle-ad', 'sideline-board', 'goal-net-sign'] },
  
  // Chicago Fire FC
  { rightsholderId: 'chicago-fire-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'chicago-fire-fc', placementId: 'pitch', placementTypeIds: ['sideline-board', 'center-logo', 'goal-sponsorship'] },
  
  // FC Cincinnati
  { rightsholderId: 'fc-cincinnati', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'fc-cincinnati', placementId: 'pitch', placementTypeIds: ['sideline-ad', 'center-circle-logo', 'goal-net-sign'] },
  
  // Colorado Rapids
  { rightsholderId: 'colorado-rapids', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'colorado-rapids', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-signage', 'goal-net-ad'] },
  
  // Columbus Crew
  { rightsholderId: 'columbus-crew', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'columbus-crew', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-boards', 'goal-signage'] },
  
  // D.C. United
  { rightsholderId: 'dc-united', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'dc-united', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-ads', 'goal-signage'] },
  
  // FC Dallas
  { rightsholderId: 'fc-dallas', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'fc-dallas', placementId: 'pitch', placementTypeIds: ['sideline-board', 'center-logo', 'goal-net-sign'] },
  
  // Houston Dynamo FC
  { rightsholderId: 'houston-dynamo-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'houston-dynamo-fc', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-ad', 'goal-signage'] },
  
  // Inter Miami CF
  { rightsholderId: 'inter-miami-cf', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'inter-miami-cf', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-board', 'goal-net-signage'] },
  
  // LA Galaxy
  { rightsholderId: 'la-galaxy', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'la-galaxy', placementId: 'pitch', placementTypeIds: ['sideline-branding', 'center-logo', 'goal-signage'] },
  
  // Los Angeles FC
  { rightsholderId: 'los-angeles-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'los-angeles-fc', placementId: 'pitch', placementTypeIds: ['center-circle-ad', 'sideline-board', 'goal-net-branding'] },
  
  // Minnesota United FC
  { rightsholderId: 'minnesota-united-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'minnesota-united-fc', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-signage', 'goal-signage'] },
  
  // Nashville SC
  { rightsholderId: 'nashville-sc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'nashville-sc', placementId: 'pitch', placementTypeIds: ['sideline-ad', 'center-circle-logo', 'goal-net-sign'] },
  
  // New England Revolution
  { rightsholderId: 'new-england-revolution', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'new-england-revolution', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-board', 'goal-signage'] },
  
  // New York City FC
  { rightsholderId: 'new-york-city-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'new-york-city-fc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-signage', 'goal-net-ad'] },
  
  // New York Red Bulls
  { rightsholderId: 'new-york-red-bulls', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'new-york-red-bulls', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-advertising', 'goal-net-sign'] },
  
  // Orlando City SC
  { rightsholderId: 'orlando-city-sc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'orlando-city-sc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-board', 'goal-signage'] },
  
  // Philadelphia Union
  { rightsholderId: 'philadelphia-union', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'philadelphia-union', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-ad', 'goal-net-signage'] },
  
  // Portland Timbers
  { rightsholderId: 'portland-timbers', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'portland-timbers', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-signage', 'goal-signage'] },
  
  // Real Salt Lake
  { rightsholderId: 'real-salt-lake', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'real-salt-lake', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-board', 'goal-net-ad'] },
  
  // San Diego FC
  { rightsholderId: 'san-diego-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'san-diego-fc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-signage', 'goal-signage'] },
  
  // San Jose Earthquakes
  { rightsholderId: 'san-jose-earthquakes', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'san-jose-earthquakes', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-board', 'goal-net-branding'] },
  
  // Seattle Sounders FC
  { rightsholderId: 'seattle-sounders-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'seattle-sounders-fc', placementId: 'pitch', placementTypeIds: ['center-circle-ad', 'sideline-signage', 'goal-signage'] },
  
  // Sporting Kansas City
  { rightsholderId: 'sporting-kansas-city', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'sporting-kansas-city', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-ad', 'goal-net-sign'] },
  
  // St. Louis City SC
  { rightsholderId: 'st-louis-city-sc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'st-louis-city-sc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-board', 'goal-net-signage'] },
  
  // Toronto FC
  { rightsholderId: 'toronto-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'toronto-fc', placementId: 'pitch', placementTypeIds: ['center-logo', 'sideline-signage', 'goal-net-ad'] },
  
  // Vancouver Whitecaps FC
  { rightsholderId: 'vancouver-whitecaps-fc', placementId: 'uniform', placementTypeIds: ['jersey', 'shorts', 'socks', 'jacket'] },
  { rightsholderId: 'vancouver-whitecaps-fc', placementId: 'pitch', placementTypeIds: ['center-circle-logo', 'sideline-signage', 'goal-net-branding'] }
];

// Helper functions
export function getRightsholdersByLeague(league: 'MLB' | 'NBA' | 'NFL' | 'MLS'): Rightsholder[] {
  return rightsholders.filter(r => r.league === league);
}

export function getPlacementsForRightsholder(rightsholderId: string): { placement: Placement; placementTypes: PlacementType[] }[] {
  const configs = rightsholderPlacementConfigs.filter(config => config.rightsholderId === rightsholderId);
  
  return configs.map(config => {
    const placement = basePlacements.find(p => p.id === config.placementId)!;
    const placementTypes = config.placementTypeIds.map(id => 
      allPlacementTypes.find(pt => pt.id === id)!
    ).filter(Boolean);
    
    return { placement, placementTypes };
  });
}

export function getPlacementTypesForRightsholderPlacement(rightsholderName: string, placementName: string): PlacementType[] {
  const rightsholder = rightsholders.find(r => r.name === rightsholderName);
  if (!rightsholder) return [];
  
  const placement = basePlacements.find(p => p.name === placementName);
  if (!placement) return [];
  
  const config = rightsholderPlacementConfigs.find(
    c => c.rightsholderId === rightsholder.id && c.placementId === placement.id
  );
  
  if (!config) return [];
  
  return config.placementTypeIds.map(id => 
    allPlacementTypes.find(pt => pt.id === id)!
  ).filter(Boolean);
}

export function getAllPlacementTypes(): PlacementType[] {
  return allPlacementTypes;
}

export function getAllRightsholderPlacementCombinations(): { rightsholder: Rightsholder; placement: Placement; displayName: string }[] {
  return rightsholderPlacementConfigs.map(config => {
    const rightsholder = rightsholders.find(r => r.id === config.rightsholderId)!;
    const placement = basePlacements.find(p => p.id === config.placementId)!;
    
    return {
      rightsholder,
      placement,
      displayName: `${rightsholder.name} - ${placement.name}`
    };
  });
} 