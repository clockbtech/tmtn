
import React, { useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollTrigger);

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
}

const Attractions = () => {
  const { t, formatPrice } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);

  //const [a, setA]= useState(0);

  //useEffect(() => {
  //timer  once complete then setA(1);
//})

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Swayambhunath (Monkey Temple)',
      description: 'Ancient Buddhist stupa with panoramic views of Kathmandu Valley',
      image: 'https://images.unsplash.com/photo-1552353338-0944fa7abdcd?w=500&auto=format&fit=crop&q=60',
      type: 'Temple',
      location: 'Kathmandu',
      rating: 4.7,
      reviews: 324,
      price: 25,
      duration: '2-3 hours'
    },
    {
      id: 2,
      name: 'Boudhanath Stupa',
      description: 'One of the largest Buddhist stupas in the world',
      image: 'https://images.unsplash.com/photo-1558005530-a7958896e18c?w=500&auto=format&fit=crop&q=60',
      type: 'Temple',
      location: 'Kathmandu',
      rating: 4.8,
      reviews: 456,
      price: 30,
      duration: '2-4 hours'
    },
    {
      id: 3,
      name: 'Pashupatinath Temple',
      description: 'Sacred Hindu temple dedicated to Lord Shiva',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&auto=format&fit=crop&q=60',
      type: 'Temple',
      location: 'Kathmandu',
      rating: 4.6,
      reviews: 389,
      price: 35,
      duration: '2-3 hours'
    },
    {
      id: 4,
      name: 'Durbar Square Kathmandu',
      description: 'Historic palace complex with ancient architecture',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=60',
      type: 'Historical Site',
      location: 'Kathmandu',
      rating: 4.5,
      reviews: 278,
      price: 40,
      duration: '3-4 hours'
    },
    {
      id: 5,
      name: 'Phewa Lake',
      description: 'Serene lake with mountain reflections and boating',
      image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=500&auto=format&fit=crop&q=60',
      type: 'Natural',
      location: 'Pokhara',
      rating: 4.9,
      reviews: 512,
      price: 20,
      duration: 'Half day'
    },
    {
      id: 6,
      name: 'World Peace Pagoda',
      description: 'Buddhist monument overlooking Pokhara valley',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500&auto=format&fit=crop&q=60',
      type: 'Temple',
      location: 'Pokhara',
      rating: 4.7,
      reviews: 298,
      price: 15,
      duration: '2-3 hours'
    }
  ];

  const types = ['Temple', 'Historical Site', 'Natural', 'Museum', 'Adventure'];
  const locations = ['Kathmandu', 'Pokhara', 'Bhaktapur', 'Lalitpur', 'Chitwan'];

  const filteredAndSortedAttractions = useMemo(() => {
    let filtered = attractions.filter(attraction => {
      const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) || attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || attraction.type === selectedType;
      const matchesLocation = selectedLocation === 'all' || attraction.location === selectedLocation;
      return matchesSearch && matchesType && matchesLocation;
    });

    // Sort attractions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    return filtered;
  }, [attractions, searchTerm, selectedType, selectedLocation, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedAttractions.length / itemsPerPage);
  const currentAttractions = filteredAndSortedAttractions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedLocation('all');
    setSortBy('name');
    setCurrentPage(1);
  };

     useEffect(() => {
        // Simulate loading (replace this with your actual loading logic)
        const timer = setTimeout(() => {
          setIsLoading(false);
          ScrollTrigger.refresh();
        }, 4000); // Adjust time as needed
    
  
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <DotLottieReact
          src="src/assets/Airplane_Lottie_Animation.lottie" // Update this path to your actual lottie file
          loop
          autoplay
          style={{ width: '800px', height: '800px' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="relative bg-cover bg-center bg-no-repeat py-[150px]" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1552353338-0944fa7abdcd?w=1920&auto=format&fit=crop&q=80)',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-center text-white"
          >
            <h1 className="text-5xl font-tm-sans uppercase mb-6 lg:text-6xl font-extrabold">
              Attractions
            </h1>
            <p className="text-xl max-w-4xl mx-auto lg:text-xl">
              Discover Nepal's most captivating temples, historic sites, and natural wonders
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Filter Section */}
      <section className="py-8 -mt-16 relative z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              {/* Type Filter */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-green-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">Type</label>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">Location</label>
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Field */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">Search</label>
                </div>
                <Input
                  type="text"
                  placeholder="Search attractions..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-12 border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                />
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedType !== 'all' || selectedLocation !== 'all') && (
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                )}
                {selectedType !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedType}
                    <button onClick={() => setSelectedType('all')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                )}
                {selectedLocation !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation('all')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                )}
                <Button variant="ghost" onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 h-auto p-0">
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            Showing {currentAttractions.length} of {filteredAndSortedAttractions.length} attractions
          </p>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentAttractions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 font-inter">No attractions found matching your criteria.</p>
              <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {currentAttractions.map((attraction, index) => (
                  <motion.div 
                    key={attraction.id} 
                    initial={{ opacity: 0, y: 60 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: index * 0.1 }} 
                    whileHover={{ y: -10 }} 
                    className="group cursor-pointer"
                  >
                    <Link to={`/attractions/${attraction.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div className="relative overflow-hidden">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-semibold text-green-600">
                              {attraction.type}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{attraction.location}</span>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {attraction.name}
                          </h3>

                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {attraction.description}
                          </p>

                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(attraction.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">
                              ({attraction.reviews} reviews)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{attraction.duration}</span>
                            </div>
                            <div>
                              <span className="text-lg font-bold text-green-600">
                                {formatPrice(attraction.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage - 1);
                            }} 
                          />
                        </PaginationItem>
                      )}
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === i + 1} 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage + 1);
                            }} 
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Attractions;
