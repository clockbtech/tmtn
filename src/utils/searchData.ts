
interface SearchResult {
  id: string;
  title: string;
  type: 'destination' | 'experience' | 'blog';
  image: string;
  href: string;
  keywords: string[];
}

const searchData: SearchResult[] = [
  // Destinations
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    type: 'destination',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    href: '/destinations/everest-base-camp',
    keywords: ['everest', 'base camp', 'trek', 'himalaya', 'mountain', 'nepal', 'hiking']
  },
  {
    id: '2',
    title: 'Annapurna Circuit',
    type: 'destination',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop',
    href: '/destinations/annapurna-circuit',
    keywords: ['annapurna', 'circuit', 'trek', 'himalaya', 'mountain', 'nepal', 'hiking']
  },
  {
    id: '3',
    title: 'Kathmandu Valley',
    type: 'destination',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=200&fit=crop',
    href: '/destinations/kathmandu-valley',
    keywords: ['kathmandu', 'valley', 'culture', 'temple', 'heritage', 'nepal', 'city']
  },
  {
    id: '4',
    title: 'Pokhara Lake District',
    type: 'destination',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop',
    href: '/destinations/pokhara',
    keywords: ['pokhara', 'lake', 'phewa', 'nepal', 'peaceful', 'reflection', 'mountains']
  },

  // Experiences
  {
    id: '5',
    title: 'Helicopter Tour to Everest',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad444286666?w=300&h=200&fit=crop',
    href: '/experiences/helicopter-everest',
    keywords: ['helicopter', 'everest', 'tour', 'aerial', 'mountain', 'view', 'luxury']
  },
  {
    id: '6',
    title: 'Cultural Heritage Walk',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    href: '/experiences/heritage-walk',
    keywords: ['culture', 'heritage', 'walk', 'temple', 'history', 'kathmandu', 'guide']
  },
  {
    id: '7',
    title: 'White Water Rafting',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=200&fit=crop',
    href: '/experiences/white-water-rafting',
    keywords: ['rafting', 'white water', 'river', 'adventure', 'rapids', 'nepal', 'thrill']
  },

  // Blog Posts
  {
    id: '8',
    title: 'Ultimate Guide to Everest Base Camp Trek',
    type: 'blog',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop',
    href: '/blog/everest-base-camp-guide',
    keywords: ['everest', 'base camp', 'guide', 'trek', 'tips', 'preparation', 'altitude']
  },
  {
    id: '9',
    title: 'Hidden Gems of Kathmandu Valley',
    type: 'blog',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop',
    href: '/blog/kathmandu-hidden-gems',
    keywords: ['kathmandu', 'hidden', 'gems', 'secret', 'places', 'culture', 'temples']
  },
  {
    id: '10',
    title: 'Best Time to Visit Nepal',
    type: 'blog',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad444286666?w=300&h=200&fit=crop',
    href: '/blog/best-time-visit-nepal',
    keywords: ['nepal', 'best time', 'visit', 'weather', 'season', 'travel', 'planning']
  }
];

export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return searchData
    .filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
    )
    .slice(0, 6); // Limit to 6 results for better UX
};

export type { SearchResult };
