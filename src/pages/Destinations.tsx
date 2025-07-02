import React, { useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
gsap.registerPlugin(ScrollTrigger);
interface Destination {
  id: number;
  nameKey: string;
  descKey: string;
  image: string;
  difficulty: string;
  duration: string;
  altitude: string;
  region: 'Himalayan Region' | 'Hills' | 'Kathmandu Valley' | 'Terai';
  popularity: number;
  price: number;
}
const Destinations = () => {
  const {
    t
  } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('A-Z');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  const destinations: Destination[] = [{
    id: 1,
    nameKey: 'destinations.everest',
    descKey: 'destinations.everest.desc',
    image: 'https://th.bing.com/th/id/R.34473dbb198fe12d841a25f710ab79f6?rik=o4bJt8X5xPLRJg&pid=ImgRaw&r=0',
    difficulty: 'Extreme',
    duration: '14-16 days',
    altitude: '5,364m',
    region: 'Himalayan Region',
    popularity: 95,
    price: 2500
  }, {
    id: 2,
    nameKey: 'destinations.annapurna',
    descKey: 'destinations.annapurna.desc',
    image: 'https://images.unsplash.com/photo-1549926506-afba2eb9fb6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulty: 'Moderate',
    duration: '12-20 days',
    altitude: '5,416m',
    region: 'Himalayan Region',
    popularity: 90,
    price: 2200
  }, {
    id: 3,
    nameKey: 'destinations.pokhara',
    descKey: 'destinations.pokhara.desc',
    image: 'https://images.unsplash.com/photo-1718180555560-0c5f890f8098?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fFBva2hhcmF8ZW58MHwwfDB8fHww',
    difficulty: 'Easy',
    duration: '2-5 days',
    altitude: '822m',
    region: 'Hills',
    popularity: 85,
    price: 300
  },{
    id: 4,
    nameKey: 'destinations.pokhara',
    descKey: 'destinations.pokhara.desc',
    image: 'https://images.unsplash.com/photo-1718180555560-0c5f890f8098?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fFBva2hhcmF8ZW58MHwwfDB8fHww',
    difficulty: 'Easy',
    duration: '2-5 days',
    altitude: '822m',
    region: 'Hills',
    popularity: 85,
    price: 300
  }, {
    id: 5,
    nameKey: 'destinations.kathmandu',
    descKey: 'destinations.kathmandu.desc',
    image: 'https://images.unsplash.com/photo-1552353338-0944fa7abdcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEthdGhtYW5kdXxlbnwwfDB8MHx8fDA%3D',
    difficulty: 'Easy',
    duration: '3-7 days',
    altitude: '1,400m',
    region: 'Kathmandu Valley',
    popularity: 80,
    price: 400
  }, {
    id: 6,
    nameKey: 'destinations.chitwan',
    descKey: 'destinations.chitwan.desc',
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lsZGxpZmV8ZW58MHwwfDB8fHww',
    difficulty: 'Easy',
    duration: '2-4 days',
    altitude: '415m',
    region: 'Terai',
    popularity: 75,
    price: 250
  }, {
    id: 7,
    nameKey: 'destinations.everest',
    descKey: 'destinations.everest.desc',
    image: 'https://th.bing.com/th/id/R.34473dbb198fe12d841a25f710ab79f6?rik=o4bJt8X5xPLRJg&pid=ImgRaw&r=0',
    difficulty: 'Extreme',
    duration: '14-16 days',
    altitude: '5,364m',
    region: 'Himalayan Region',
    popularity: 95,
    price: 2500
  },{
    id: 8,
    nameKey: 'destinations.langtang',
    descKey: 'destinations.langtang.desc',
    image: 'https://images.unsplash.com/photo-1657857051629-dac459639676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
    difficulty: 'Moderate',
    duration: '7-12 days',
    altitude: '4,984m',
    region: 'Himalayan Region',
    popularity: 70,
    price: 1800
  }];
  const regions = ['Himalayan Region', 'Hills', 'Kathmandu Valley', 'Terai'];
  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = destinations.filter(destination => {
      const matchesSearch = t(destination.nameKey).toLowerCase().includes(searchTerm.toLowerCase()) || t(destination.descKey).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(destination.region);
      return matchesSearch && matchesRegion;
    });

    // Sort destinations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'A-Z':
          return t(a.nameKey).localeCompare(t(b.nameKey));
        case 'Popularity':
          return b.popularity - a.popularity;
        case 'Price (Low to High)':
          return a.price - b.price;
        default:
          return 0;
      }
    });
    return filtered;
  }, [destinations, searchTerm, selectedRegions, sortBy, t]);
  const totalPages = Math.ceil(filteredAndSortedDestinations.length / itemsPerPage);
  const currentDestinations = filteredAndSortedDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions([...selectedRegions, region]);
    } else {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    }
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-[150px]" style={{
      backgroundImage: 'https://images.unsplash.com/photo-1740066361389-90bb4444c43e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-nepal-primary/80 to-blue-600/80 my-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center text-white">
            <h1 className="text-5xl font-tm-sans uppercase mb-6 lg:text-6xl font-extrabold">
              {t('destinations.title')}
            </h1>
            <p className="text-xl max-w-4xl mx-auto lg:text-xl">
              {t('destinations.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder={t('search.placeholder')} value={searchTerm} onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }} className="pl-10 w-full" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A-Z">A-Z</SelectItem>
                  <SelectItem value="Popularity">Popularity</SelectItem>
                  <SelectItem value="Price (Low to High)">Price (Low to High)</SelectItem>
                </SelectContent>
              </Select>

              {/* Region Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Region
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  {regions.map(region => <DropdownMenuCheckboxItem key={region} checked={selectedRegions.includes(region)} onCheckedChange={checked => handleRegionChange(region, checked)}>
                      {region}
                    </DropdownMenuCheckboxItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter Summary */}
          {(selectedRegions.length > 0 || searchTerm) && <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && <span className="bg-nepal-orange text-white px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                </span>}
              {selectedRegions.map(region => <span key={region} className="bg-nepal-primary text-white px-3 py-1 rounded-full text-sm">
                  {region}
                </span>)}
              <button onClick={() => {
            setSearchTerm('');
            setSelectedRegions([]);
            setCurrentPage(1);
          }} className="text-sm text-gray-500 hover:text-gray-700 underline">
                Clear all
              </button>
            </div>}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentDestinations.length === 0 ? <div className="text-center py-20">
              <p className="text-xl text-gray-600 font-inter">No destinations found matching your criteria.</p>
            </div> : <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentDestinations.map((destination, index) => <motion.div key={destination.id} initial={{
              opacity: 0,
              y: 60
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              y: -10
            }} className="group cursor-pointer">
                    <Link to={`/destinations/${destination.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div className="relative overflow-hidden">
                          <img src={destination.image} alt={t(destination.nameKey)} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-semibold text-nepal-primary font-plus-jakarta">
                              {destination.difficulty}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-2xl font-plus-jakarta font-semibold text-nepal-primary mb-2">
                            {t(destination.nameKey)}
                          </h3>
                          <p className="text-gray-600 font-inter mb-4">
                            {t(destination.descKey)}
                          </p>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500 font-inter mb-4">
                            <span><strong>Duration:</strong> {destination.duration}</span>
                            <span><strong>Altitude:</strong> {destination.altitude}</span>
                          </div>
                          
                          <motion.button whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }} className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-lg font-plus-jakarta font-semibold transition-colors duration-200">
                            Explore
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && <PaginationItem>
                          <PaginationPrevious href="#" onClick={e => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }} />
                        </PaginationItem>}
                      
                      {[...Array(totalPages)].map((_, i) => <PaginationItem key={i + 1}>
                          <PaginationLink href="#" isActive={currentPage === i + 1} onClick={e => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>)}
                      
                      {currentPage < totalPages && <PaginationItem>
                          <PaginationNext href="#" onClick={e => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }} />
                        </PaginationItem>}
                    </PaginationContent>
                  </Pagination>
                </div>}
            </>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Destinations;