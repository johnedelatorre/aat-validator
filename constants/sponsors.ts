import { Sponsor } from '../types';

export const mockSponsors: Sponsor[] = [
  // Existing sponsors with updated taglines from the provided list
  { id: 'nike', name: 'Nike', category: 'Apparel', tagline: 'Just Do It', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  { id: 'coca-cola', name: 'Coca-Cola', category: 'Beverages', tagline: 'Open Happiness', logoUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=64&h=64&fit=crop&crop=center' },
  { id: 'mcdonalds', name: "McDonald's", category: 'Food & Dining', tagline: "I'm Lovin' It", logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'adidas', name: 'Adidas', category: 'Apparel', tagline: 'Impossible is Nothing', logoUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=64&h=64&fit=crop&crop=center' },
  { id: 'toyota', name: 'Toyota', category: 'Automotive', tagline: "Let's Go Places", logoUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=64&h=64&fit=crop&crop=center' },
  { id: 'mastercard', name: 'Mastercard', category: 'Financial Services', tagline: "There are some things money can't buy. For everything else, there's MasterCard.", logoUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop&crop=center' },
  { id: 'pepsi', name: 'Pepsi', category: 'Beverages', tagline: "That's What I Like", logoUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=64&h=64&fit=crop&crop=center' },
  { id: 'subway', name: 'Subway', category: 'Food & Dining', tagline: 'Eat Fresh', logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=64&h=64&fit=crop&crop=center' },
  { id: 'budweiser', name: 'Budweiser', category: 'Beverages', tagline: 'King of Beers', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'visa', name: 'Visa', category: 'Financial Services', tagline: 'Everywhere You Want to Be', logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop&crop=center' },
  { id: 'ford', name: 'Ford', category: 'Automotive', tagline: 'Built Ford Tough', logoUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=64&h=64&fit=crop&crop=center' },
  { id: 'chevrolet', name: 'Chevrolet', category: 'Automotive', tagline: 'Find New Roads', logoUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=64&h=64&fit=crop&crop=center' },
  { id: 'bmw', name: 'BMW', category: 'Automotive', tagline: 'The Ultimate Driving Machine', logoUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=64&h=64&fit=crop&crop=center' },
  { id: 'burger-king', name: 'Burger King', category: 'Food & Dining', tagline: 'Have It Your Way', logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'taco-bell', name: 'Taco Bell', category: 'Food & Dining', tagline: 'Live Mas', logoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=64&h=64&fit=crop&crop=center' },
  { id: 'starbucks', name: 'Starbucks', category: 'Food & Dining', tagline: 'To Inspire and Nurture the Human Spirit', logoUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=64&h=64&fit=crop&crop=center' },
  { id: 'apple', name: 'Apple', category: 'Technology', tagline: 'Think Different', logoUrl: 'https://images.unsplash.com/photo-1611532736946-de6ca9d25b52?w=64&h=64&fit=crop&crop=center' },
  { id: 'microsoft', name: 'Microsoft', category: 'Technology', tagline: "Be What's Next", logoUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=64&h=64&fit=crop&crop=center' },
  { id: 'google', name: 'Google', category: 'Technology', tagline: 'Do the Right Thing', logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center' },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', tagline: "See What's Next", logoUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=64&h=64&fit=crop&crop=center' },
  { id: 'spotify', name: 'Spotify', category: 'Entertainment', tagline: 'Music for Every Moment', logoUrl: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=64&h=64&fit=crop&crop=center' },
  { id: 'amazon', name: 'Amazon', category: 'E-commerce', tagline: 'Work Hard. Have Fun. Make History.', logoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=64&h=64&fit=crop&crop=center' },
  { id: 'walmart', name: 'Walmart', category: 'Retail', tagline: 'Save Money. Live Better.', logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center' },
  { id: 'target', name: 'Target', category: 'Retail', tagline: 'Expect More. Pay Less.', logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center' },
  
  // Additional brands from the provided list with taglines
  { id: 'loreal', name: "L'Oréal", category: 'Beauty', tagline: "Because You're Worth It", logoUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=64&h=64&fit=crop&crop=center' },
  { id: 'kfc', name: 'KFC', category: 'Food & Dining', tagline: "It's Finger Lickin' Good", logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'dunkin', name: 'Dunkin\' Donuts', category: 'Food & Dining', tagline: 'America Runs on Dunkin\'', logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'lays', name: "Lay's", category: 'Food & Dining', tagline: "Betcha Can't Eat Just One", logoUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=64&h=64&fit=crop&crop=center' },
  { id: 'de-beers', name: 'De Beers', category: 'Jewelry', tagline: 'A Diamond is Forever', logoUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=64&h=64&fit=crop&crop=center' },
  { id: 'allstate', name: 'Allstate', category: 'Insurance', tagline: 'Are You in Good Hands?', logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center' },
  { id: 'gillette', name: 'Gillette', category: 'Personal Care', tagline: 'The Best a Man Can Get', logoUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=64&h=64&fit=crop&crop=center' },
  { id: 'red-bull', name: 'Red Bull', category: 'Beverages', tagline: 'Red Bull gives you wings', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'airbnb', name: 'Airbnb', category: 'Travel', tagline: 'Belong Anywhere', logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center' },
  { id: 'levis', name: "Levi's", category: 'Apparel', tagline: 'Quality Never Goes Out of Style', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  { id: 'samsung', name: 'Samsung', category: 'Technology', tagline: "Do What You Can't", logoUrl: 'https://images.unsplash.com/photo-1610792516307-4e73d5ba0e27?w=64&h=64&fit=crop&crop=center' },
  { id: 'kit-kat', name: 'Kit Kat', category: 'Food & Dining', tagline: 'Have a break. Have a Kit Kat.', logoUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=64&h=64&fit=crop&crop=center' },
  { id: 'playstation', name: 'PlayStation', category: 'Gaming', tagline: 'Live in your world. Play in ours.', logoUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=64&h=64&fit=crop&crop=center' },
  { id: 'maybelline', name: 'Maybelline', category: 'Beauty', tagline: "Maybe she's born with it. Maybe it's Maybelline.", logoUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=64&h=64&fit=crop&crop=center' },
  { id: 'pizza-hut', name: 'Pizza Hut', category: 'Food & Dining', tagline: 'No one out pizzas the hut', logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'volkswagen', name: 'Volkswagen', category: 'Automotive', tagline: 'Think Small', logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=64&h=64&fit=crop&crop=center' },
  { id: 'dominos', name: "Domino's", category: 'Food & Dining', tagline: 'Oh Yes We Did', logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'wendys', name: "Wendy's", category: 'Food & Dining', tagline: "Where's the Beef?", logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'mms', name: "M&M's", category: 'Food & Dining', tagline: 'Melts in Your Mouth, Not in Your Hands', logoUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=64&h=64&fit=crop&crop=center' },
  { id: 'snickers', name: 'Snickers', category: 'Food & Dining', tagline: "You're Not You When You're Hungry", logoUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=64&h=64&fit=crop&crop=center' },
  { id: 'heineken', name: 'Heineken', category: 'Beverages', tagline: 'Open Your World', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'corona', name: 'Corona', category: 'Beverages', tagline: 'Find Your Beach', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'absolut', name: 'Absolut', category: 'Beverages', tagline: 'Absolut Perfection', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'johnnie-walker', name: 'Johnnie Walker', category: 'Beverages', tagline: 'Keep Walking', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'bacardi', name: 'Bacardi', category: 'Beverages', tagline: 'Do What Moves You', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'monster-energy', name: 'Monster Energy', category: 'Beverages', tagline: 'Unleash the Beast', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', category: 'Automotive', tagline: 'The Best or Nothing', logoUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=64&h=64&fit=crop&crop=center' },
  { id: 'audi', name: 'Audi', category: 'Automotive', tagline: 'Vorsprung durch Technik', logoUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=64&h=64&fit=crop&crop=center' },
  { id: 'honda', name: 'Honda', category: 'Automotive', tagline: 'The Power of Dreams', logoUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=64&h=64&fit=crop&crop=center' },
  { id: 'hyundai', name: 'Hyundai', category: 'Automotive', tagline: 'New Thinking. New Possibilities.', logoUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=64&h=64&fit=crop&crop=center' },
  { id: 'jeep', name: 'Jeep', category: 'Automotive', tagline: 'Go Anywhere. Do Anything', logoUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=64&h=64&fit=crop&crop=center' },
  { id: 'porsche', name: 'Porsche', category: 'Automotive', tagline: 'There is No Substitute', logoUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=64&h=64&fit=crop&crop=center' },
  { id: 'lexus', name: 'Lexus', category: 'Automotive', tagline: 'Experience Amazing', logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=64&h=64&fit=crop&crop=center' },
  { id: 'nissan', name: 'Nissan', category: 'Automotive', tagline: 'Innovation That Excites', logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=64&h=64&fit=crop&crop=center' },
  { id: 'under-armour', name: 'Under Armour', category: 'Apparel', tagline: 'Protect This House', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  { id: 'puma', name: 'Puma', category: 'Apparel', tagline: 'Forever Faster', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  { id: 'the-north-face', name: 'The North Face', category: 'Apparel', tagline: 'Never Stop Exploring', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  { id: 'reebok', name: 'Reebok', category: 'Apparel', tagline: 'Be More Human', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&h=64&fit=crop&crop=center' },
  
  // Adding some existing brands that were in the original list but missing taglines
  { id: 'chick-fil-a', name: 'Chick-fil-A', category: 'Food & Dining', tagline: 'Eat Mor Chikin', logoUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=64&h=64&fit=crop&crop=center' },
  { id: 'coors-light', name: 'Coors Light', category: 'Beverages', tagline: 'The World\'s Most Refreshing Beer', logoUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=64&h=64&fit=crop&crop=center' },
  { id: 'dignity-health', name: 'Dignity Health', category: 'Healthcare', tagline: 'Hello humankindness', logoUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center' },
  { id: 'chase', name: 'Chase', category: 'Financial Services', tagline: 'The Right Relationship is Everything', logoUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop&crop=center' },
  { id: 'banner-health', name: 'Banner Health', category: 'Healthcare', tagline: 'It\'s about how you live', logoUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center' },
  { id: 'cox', name: 'Cox', category: 'Telecommunications', tagline: 'Your friend in the digital age', logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center' },
  { id: 'state-farm', name: 'State Farm', category: 'Insurance', tagline: 'Like a Good Neighbor, State Farm is There', logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center' },
  { id: 'geico', name: 'GEICO', category: 'Insurance', tagline: '15 Minutes Could Save You 15% or More on Car Insurance', logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center' },
  { id: 'progressive', name: 'Progressive', category: 'Insurance', tagline: 'Name Your Price', logoUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=64&h-64&fit=crop&crop=center' },
];