import React, { useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';

gsap.registerPlugin(ScrollTrigger);

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  rating: number;
  type: 'Cultural' | 'Adventure' | 'Nature' | 'UNESCO';
  popularity: number;
}

const Attractions = () => {
  const {
    t
  } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('A-Z');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  const attractions: Attraction[] = [{
    id: 1,
    name: 'Swayambhunath Stupa (Monkey Temple)',
    description: 'Ancient religious complex atop a hill in the Kathmandu Valley',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '2-3 hours',
    rating: 4.5,
    type: 'Cultural',
    popularity: 95
  }, {
    id: 2,
    name: 'Pashupatinath Temple',
    description: 'Sacred Hindu temple complex dedicated to Lord Shiva',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '2-4 hours',
    rating: 4.7,
    type: 'Cultural',
    popularity: 90
  }, {
    id: 3,
    name: 'Boudhanath Stupa',
    description: 'One of the largest Buddhist stupas in the world',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '1-2 hours',
    rating: 4.6,
    type: 'UNESCO',
    popularity: 88
  }, {
    id: 4,
    name: 'Durbar Square',
    description: 'Historic plaza facing old royal palaces',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '3-4 hours',
    rating: 4.4,
    type: 'UNESCO',
    popularity: 85
  }, {
    id: 5,
    name: 'Sarangkot Viewpoint',
    description: 'Famous viewpoint for sunrise over the Himalayas',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Pokhara',
    duration: 'Half day',
    rating: 4.8,
    type: 'Nature',
    popularity: 92
  }, {
    id: 6,
    name: 'Phewa Lake',
    description: 'Serene lake with mountain reflections and boating',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Pokhara',
    duration: '2-3 hours',
    rating: 4.5,
    type: 'Nature',
    popularity: 80
  }, {
    id: 7,
    name: 'Annapurna Base Camp Trek',
    description: 'Epic trekking adventure to the base of Annapurna mountain',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Annapurna Region',
    duration: '10-14 days',
    rating: 4.9,
    type: 'Adventure',
    popularity: 95
  }, {
    id: 8,
    name: 'Chitwan National Park',
    description: 'Wildlife sanctuary with rare one-horned rhinoceros',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Chitwan',
    duration: '2-4 days',
    rating: 4.6,
    type: 'Nature',
    popularity: 75
  }, {
    id: 9,
    name: 'Langtang Valley Trek',
    description: 'Beautiful valley trek with Tamang culture experience',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Langtang Region',
    duration: '7-12 days',
    rating: 4.7,
    type: 'Adventure',
    popularity: 78
  }, {
    id: 10,
    name: 'Bandipur Historic Town',
    description: 'Preserved Newari town with stunning mountain views',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Bandipur',
    duration: '1-2 days',
    rating: 4.3,
    type: 'Cultural',
    popularity: 65
  }, {
    id: 11,
    name: 'Everest Base Camp Trek',
    description: 'Ultimate trekking challenge to the base of Mount Everest',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Everest Region',
    duration: '14-16 days',
    rating: 4.9,
    type: 'Adventure',
    popularity: 98
  }, {
    id: 12,
    name: 'Lumbini - Birthplace of Buddha',
    description: 'Sacred site where Lord Buddha was born',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Lumbini',
    duration: '1-2 days',
    rating: 4.4,
    type: 'UNESCO',
    popularity: 82
  }];
  const categories = ['Cultural', 'Adventure', 'Nature', 'UNESCO'];
  const filteredAndSortedAttractions = useMemo(() => {
    let filtered = attractions.filter(attraction => {
      const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(attraction.type);
      return matchesSearch && matchesCategory;
    });

    // Sort attractions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'A-Z':
          return a.name.localeCompare(b.name);
        case 'Popularity':
          return b.popularity - a.popularity;
        case 'Newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    return filtered;
  }, [attractions, searchTerm, selectedCategories, sortBy]);
  const totalPages = Math.ceil(filteredAndSortedAttractions.length / itemsPerPage);
  const currentAttractions = filteredAndSortedAttractions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
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
  return <div className="min-h-screen bg-white font-poppins">
      <Header />
      
      {/* Enhanced Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-[150px]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-nepal-orange/80 to-orange-600/80"></div>
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
            <h1 className="text-5xl lg:text-7xl font-bebas uppercase font-bold mb-6">
              {t('nav.attractions')}
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto">
              Discover Nepal's most captivating temples, viewpoints, and cultural landmarks
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
              <Input type="text" placeholder="Search attractions..." value={searchTerm} onChange={e => {
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
                  <SelectItem value="Newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Category
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  {categories.map(category => <DropdownMenuCheckboxItem key={category} checked={selectedCategories.includes(category)} onCheckedChange={checked => handleCategoryChange(category, checked)}>
                      {category}
                    </DropdownMenuCheckboxItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter Summary */}
          {(selectedCategories.length > 0 || searchTerm) && <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && <span className="bg-nepal-orange text-white px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                </span>}
              {selectedCategories.map(category => <span key={category} className="bg-nepal-primary text-white px-3 py-1 rounded-full text-sm">
                  {category}
                </span>)}
              <button onClick={() => {
            setSearchTerm('');
            setSelectedCategories([]);
            setCurrentPage(1);
          }} className="text-sm text-gray-500 hover:text-gray-700 underline">
                Clear all
              </button>
            </div>}
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentAttractions.length === 0 ? <div className="text-center py-20">
              <p className="text-xl text-gray-600">No attractions found matching your criteria.</p>
            </div> : <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentAttractions.map((attraction, index) => <motion.div key={attraction.id} initial={{
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
                    <Link to={`/attractions/${attraction.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div className="relative overflow-hidden">
                          <img src={attraction.image} alt={attraction.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {attraction.type}
                          </div>
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-semibold">{attraction.rating}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-normal font-semibold text-nepal-primary mb-2">
                            {attraction.name}
                          </h3>
                          <p className="text-gray-600 mb-4 text-base">
                            {attraction.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{attraction.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{attraction.duration}</span>
                            </div>
                          </div>
                          
                          <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} className="w-full bg-nepal-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 text-base">
                            Explore Attraction
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
export default Attractions;
