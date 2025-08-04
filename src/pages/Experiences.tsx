
import React, { useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Search, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
gsap.registerPlugin(ScrollTrigger);

const Experiences = () => {
  const { t, formatPrice } = useTranslation();

  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    ScrollTrigger.refresh();

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const experiences = [{
    id: 1,
    name: 'Everest Base Camp Trek',
    description: 'The ultimate Himalayan adventure to the base of the world\'s highest peak',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '14 days',
    groupSize: '8-12 people',
    difficulty: 'Extreme',
    price: 1299,
    location: 'Khumbu Region',
    rating: 4.9,
    reviews: 234
  }, {
    id: 2,
    name: 'Annapurna Circuit Trek',
    description: 'Classic trek through diverse landscapes and traditional villages',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '16 days',
    groupSize: '6-10 people',
    difficulty: 'Moderate',
    price: 899,
    location: 'Annapurna Region',
    rating: 4.8,
    reviews: 187
  }, {
    id: 3,
    name: 'Chitwan Safari Experience',
    description: 'Wildlife adventure in Nepal\'s premier national park',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '3 days',
    groupSize: '4-8 people',
    difficulty: 'Easy',
    price: 299,
    location: 'Chitwan National Park',
    rating: 4.7,
    reviews: 156
  }, {
    id: 4,
    name: 'Kathmandu Cultural Tour',
    description: 'Explore ancient temples and UNESCO World Heritage sites',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '5 days',
    groupSize: '2-15 people',
    difficulty: 'Easy',
    price: 399,
    location: 'Kathmandu Valley',
    rating: 4.6,
    reviews: 203
  }, {
    id: 5,
    name: 'Pokhara Adventure Package',
    description: 'Paragliding, boating, and mountain views in Nepal\'s adventure capital',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '4 days',
    groupSize: '2-6 people',
    difficulty: 'Moderate',
    price: 499,
    location: 'Pokhara',
    rating: 4.5,
    reviews: 128
  }, {
    id: 6,
    name: 'Langtang Valley Trek',
    description: 'Trek through the beautiful valley of glaciers and friendly locals',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '9 days',
    groupSize: '6-10 people',
    difficulty: 'Moderate',
    price: 699,
    location: 'Langtang Region',
    rating: 4.8,
    reviews: 165
  }];

  // Filter and sort experiences
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = experiences.filter(experience => {
      const matchesSearch = experience.name.toLowerCase().includes(searchTerm.toLowerCase()) || experience.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || experience.difficulty === selectedDifficulty;
      const matchesLocation = selectedLocation === 'all' || experience.location.includes(selectedLocation);
      return matchesSearch && matchesDifficulty && matchesLocation;
    });

    // Sort experiences
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [experiences, searchTerm, selectedDifficulty, selectedLocation, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedExperiences.length / itemsPerPage);
  const paginatedExperiences = isMobile ? filteredAndSortedExperiences.slice(0, currentPage * itemsPerPage) : filteredAndSortedExperiences.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const loadMore = () => {
    if (currentPage * itemsPerPage < filteredAndSortedExperiences.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/90';
      case 'Moderate':
        return 'bg-yellow-500/90';
      case 'Extreme':
        return 'bg-red-500/90';
      default:
        return 'bg-gray-500/90';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedLocation('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  return <div className="min-h-screen bg-white font-poppins">
      <Header />
      
      {/* Enhanced Hero Section with Background Image and Gradient */}
      <section className="relative py-[150px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
      }}></div>
        
        {/* Semi-transparent gradient overlay using current blue color scheme */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80 z-10"></div>
        <div className="absolute inset-0 bg-black/20 z-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
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
              {t('nav.experiences')}
            </h1>
            <p className="text-xl max-w-4xl mx-auto lg:text-xl">
              Unforgettable adventures and cultural experiences in the heart of the Himalayas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="text" placeholder="Search experiences..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Khumbu">Khumbu Region</SelectItem>
                  <SelectItem value="Annapurna">Annapurna Region</SelectItem>
                  <SelectItem value="Chitwan">Chitwan</SelectItem>
                  <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="Pokhara">Pokhara</SelectItem>
                  <SelectItem value="Langtang">Langtang</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedDifficulty !== 'all' || selectedLocation !== 'all') && <div className="flex flex-wrap gap-2 mt-4">
              {searchTerm && <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                </Badge>}
              {selectedDifficulty !== 'all' && <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty('all')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                </Badge>}
              {selectedLocation !== 'all' && <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('all')} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                </Badge>}
            </div>}
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            Showing {paginatedExperiences.length} of {filteredAndSortedExperiences.length} experiences
          </p>
        </div>
      </section>

      {/* Experiences Grid with TrendingExperiences style */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedExperiences.length === 0 ? <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No experiences found matching your criteria.</p>
              <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div> : <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedExperiences.map((experience, index) => <motion.div key={experience.id} initial={{
              opacity: 0,
              y: 60
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              y: -5
            }} className="group cursor-pointer">
                    <Link to={`/experiences/${experience.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="relative overflow-hidden">
                          <img src={experience.image} alt={experience.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className={`absolute top-4 right-4 ${getDifficultyColor(experience.difficulty)} backdrop-blur-sm rounded-full px-3 py-1`}>
                            <span className="text-sm font-semibold text-white">
                              {experience.difficulty}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>Nepal</span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                            {experience.name}
                          </h3>

                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(experience.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">
                              ({experience.reviews} Review{experience.reviews !== 1 ? 's' : ''})
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{experience.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              <span>12 Person</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">From </span>
                              <span className="text-xl font-bold text-green-600">
                                {formatPrice(experience.price)}
                              </span>
                              <span className="text-sm text-gray-400 line-through ml-2">
                                {formatPrice(Math.round(experience.price * 1.2))}
                              </span>
                            </div>
                            <div className="w-6 h-6 border-2 border-green-600 rounded flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>)}
              </div>

              {/* Pagination (Desktop) / Load More (Mobile) */}
              {!isMobile ? totalPages > 1 && <div className="flex justify-center mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" onClick={e => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                        </PaginationItem>
                        
                        {Array.from({
                  length: totalPages
                }, (_, i) => i + 1).map(page => <PaginationItem key={page}>
                            <PaginationLink href="#" onClick={e => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }} isActive={page === currentPage}>
                              {page}
                            </PaginationLink>
                          </PaginationItem>)}
                        
                        <PaginationItem>
                          <PaginationNext href="#" onClick={e => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div> : currentPage * itemsPerPage < filteredAndSortedExperiences.length && <div className="flex justify-center mt-8">
                    <Button onClick={loadMore} variant="outline" size="lg">
                      Load More Experiences
                    </Button>
                  </div>}
            </>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Experiences;
