import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Camera, X, ChevronLeft, ChevronRight, Play, Pause, Shield, Zap, Lightbulb, Star, Phone, Mail, User, Check, Minus, MessageCircle, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
const ExperienceDetail = () => {
  const {
    id
  } = useParams();
  const {
    t,
    formatPrice
  } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [relatedExperiencesIndex, setRelatedExperiencesIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Gallery auto-scroll state
  const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const reviewsPerPage = 5;

  // Booking form state
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    flexibleDate: false
  });

  // Mock data - enhanced with high-quality working images
  const experience = {
    id: parseInt(id || '1'),
    name: 'Everest Base Camp Trek',
    subtitle: 'The Ultimate Himalayan Adventure to the Base of the World\'s Highest Peak',
    rating: 4.5,
    reviewCount: 127,
    heroImage: 'https://images.prismic.io/elite-exped/b6a9c98d-e381-49a2-bfef-b685b78508af_Nimsdai-Elite-Exped-Everest-Edits-Guy-Bolton003.jpg?auto=compress,format&rect=0,0,2048,1273&w=2400&h=1492',
    description: `The Everest Base Camp Trek is one of the most iconic and challenging adventures in the world. This legendary journey takes you through the heart of the Khumbu region, following in the footsteps of famous mountaineers to reach the base camp of Mount Everest at 5,364 meters.

    The trek offers an incredible combination of natural beauty, cultural immersion, and personal achievement. You'll traverse through traditional Sherpa villages, ancient Buddhist monasteries, and dramatic mountain landscapes while acclimatizing to the high altitude.`,
    highlights: ['Trek to Mount Everest Base Camp at 5,364m', 'Experience Sherpa culture and traditions', 'Visit Tengboche Monastery', 'Stunning views of Everest, Lhotse, and Ama Dablam'],
    duration: '14 days',
    groupSize: '8-12 people',
    difficulty: 'Extreme',
    price: 1299,
    location: 'Khumbu Region',
    includes: ['Professional guide', 'Porter service', 'Accommodation in teahouses', 'All meals during trek', 'Flight tickets (Kathmandu-Lukla-Kathmandu)', 'Permits and entrance fees'],
    excludes: ['International flights', 'Travel insurance', 'Personal equipment', 'Tips for guides and porters', 'Alcoholic beverages', 'Emergency evacuation'],
    itinerary: [{
      day: 1,
      title: 'Fly to Lukla, trek to Phakding',
      description: 'Scenic flight to Lukla, begin trek to Phakding (2,651m)',
      time: '4-5 hours',
      distance: '8 km',
      accommodation: 'Tea House',
      meals: 'Lunch, Dinner'
    }, {
      day: 2,
      title: 'Trek to Namche Bazaar',
      description: 'Cross suspension bridges, first glimpse of Everest',
      time: '6-7 hours',
      distance: '11 km',
      accommodation: 'Tea House',
      meals: 'Breakfast, Lunch, Dinner'
    }, {
      day: 3,
      title: 'Acclimatization day in Namche',
      description: 'Rest day with optional hike to Everest View Hotel',
      time: '3-4 hours (optional)',
      distance: '5 km (optional)',
      accommodation: 'Tea House',
      meals: 'Breakfast, Lunch, Dinner'
    }, {
      day: 4,
      title: 'Trek to Tengboche',
      description: 'Visit famous monastery with Everest views',
      time: '5-6 hours',
      distance: '10 km',
      accommodation: 'Tea House',
      meals: 'Breakfast, Lunch, Dinner'
    }, {
      day: 5,
      title: 'Trek to Dingboche',
      description: 'Enter the alpine zone, spectacular mountain views',
      time: '5-6 hours',
      distance: '12 km',
      accommodation: 'Tea House',
      meals: 'Breakfast, Lunch, Dinner'
    }],
    reviews: [{
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-05-15',
      comment: 'Absolutely incredible experience! The views were breathtaking and our guide was fantastic.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fEdpcmx8ZW58MHx8MHx8fDA%3D',
      photos: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80']
    }, {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      date: '2024-04-22',
      comment: 'Great trek but physically demanding. Make sure you\'re well prepared!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      photos: []
    }, {
      id: 3,
      name: 'Emma Wilson',
      rating: 5,
      date: '2024-04-10',
      comment: 'Life-changing adventure. The Sherpa culture and hospitality were amazing.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      photos: ['https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80']
    }, {
      id: 4,
      name: 'David Rodriguez',
      rating: 4,
      date: '2024-03-28',
      comment: 'Amazing trek with stunning views. The accommodation was basic but adequate.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      photos: []
    }, {
      id: 5,
      name: 'Lisa Thompson',
      rating: 5,
      date: '2024-03-15',
      comment: 'Exceeded all expectations! Perfect organization and incredible experience.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      photos: ['https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80']
    }, {
      id: 6,
      name: 'James Park',
      rating: 4,
      date: '2024-02-20',
      comment: 'Great adventure but weather was challenging. Still worth every moment!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      photos: []
    }],
    guide: {
      name: 'Pemba Sherpa',
      experience: '15 years',
      certifications: ['Mountain Guide License', 'First Aid Certified', 'English Speaking'],
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'Pemba is an experienced mountain guide with over 15 years of trekking experience in the Himalayas.'
    },
    // Updated gallery with high-quality working images
    gallery: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    relatedExperiences: [{
      id: 2,
      name: 'Annapurna Circuit Trek',
      description: 'Classic trek through diverse landscapes and traditional villages',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '16 days',
      groupSize: '6-10 people',
      difficulty: 'Moderate',
      price: 899,
      location: 'Annapurna Region',
      rating: 4.3
    }, {
      id: 3,
      name: 'Langtang Valley Trek',
      description: 'Trek through the beautiful valley of glaciers and friendly locals',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '9 days',
      groupSize: '6-10 people',
      difficulty: 'Moderate',
      price: 699,
      location: 'Langtang Region',
      rating: 4.6
    }, {
      id: 4,
      name: 'Manaslu Circuit Trek',
      description: 'Off-the-beaten-path adventure around the eighth highest mountain',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '12 days',
      groupSize: '8-12 people',
      difficulty: 'Extreme',
      price: 1099,
      location: 'Manaslu Region',
      rating: 4.7
    }]
  };

  // Gallery auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGalleryPlaying) {
      interval = setInterval(() => {
        setSelectedImageIndex(prevIndex => prevIndex === experience.gallery.length - 1 ? 0 : prevIndex + 1);
      }, 5000); // Auto-scroll every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGalleryPlaying, experience.gallery.length]);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'Extreme':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return Array.from({
      length: 5
    }, (_, index) => <Star key={index} className={`${size} ${index < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : index < rating ? 'text-yellow-500 fill-yellow-500/50' : 'text-gray-300'}`} />);
  };
  const calculateTotal = () => {
    const basePrice = experience.price;
    const adultTotal = basePrice * bookingData.adults;
    const childrenTotal = basePrice * 0.5 * bookingData.children;
    return adultTotal + childrenTotal;
  };
  const totalReviews = experience.reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const currentReviews = experience.reviews.slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage);

  // Handle tab navigation from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['overview', 'itinerary', 'inclusions', 'reviews'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Handle tab change with URL update
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`#${value}`, {
      replace: true
    });

    // Smooth scroll to content
    setTimeout(() => {
      const element = document.getElementById('tab-content');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Related experiences carousel navigation
  const nextRelatedExperience = () => {
    if (relatedExperiencesIndex < experience.relatedExperiences.length - 2) {
      setRelatedExperiencesIndex(relatedExperiencesIndex + 1);
    }
  };
  const prevRelatedExperience = () => {
    if (relatedExperiencesIndex > 0) {
      setRelatedExperiencesIndex(relatedExperiencesIndex - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[70vh] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${experience.heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <Link to="/experiences" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Experiences
              </Link>
              
              {/* Star Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                  <div className="flex items-center">
                    {renderStars(experience.rating, 'w-5 h-5')}
                  </div>
                  <span className="text-lg font-bold text-nepal-primary">
                    {experience.rating}/5
                  </span>
                  <span className="text-sm text-gray-600">
                    ({experience.reviewCount} reviews)
                  </span>
                </div>
                <div className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                  {experience.difficulty}
                </div>
              </div>
              
              <h1 className="text-5xl font-bebas uppercase text-white mb-4 lg:text-6xl font-extrabold">
                {experience.name}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl">
                {experience.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <div id="tab-content">
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-12">
                  {/* Photo Gallery with Enhanced Controls */}
                  <motion.section initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-tm-sans uppercase text-nepal-primary text-2xl font-extrabold">
                        Photo Gallery
                      </h2>
                      
                      {/* Play/Pause Control */}
                      <Button variant="outline" size="sm" onClick={() => setIsGalleryPlaying(!isGalleryPlaying)} className="flex items-center gap-2">
                        {isGalleryPlaying ? <>
                            <Pause className="w-4 h-4" />
                            Pause
                          </> : <>
                            <Play className="w-4 h-4" />
                            Play
                          </>}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img src={experience.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="w-full h-full object-cover cursor-pointer" onClick={() => setIsModalOpen(true)} />
                        <button onClick={() => setIsModalOpen(true)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                          <Camera className="w-5 h-5" />
                        </button>
                        
                        {/* Navigation Arrows */}
                        <button onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? experience.gallery.length - 1 : selectedImageIndex - 1)} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <button onClick={() => setSelectedImageIndex(selectedImageIndex === experience.gallery.length - 1 ? 0 : selectedImageIndex + 1)} className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Thumbnail Grid */}
                      <div className="grid grid-cols-6 gap-2">
                        {experience.gallery.map((image, index) => <button key={index} onClick={() => {
                        setSelectedImageIndex(index);
                        setIsGalleryPlaying(false); // Pause auto-scroll when manually selecting
                      }} className={`relative h-20 rounded overflow-hidden ${selectedImageIndex === index ? 'ring-2 ring-nepal-orange' : ''}`}>
                            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
                          </button>)}
                      </div>
                    </div>
                  </motion.section>

                  {/* Description */}
                  <motion.section initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <h2 className="font-tm-sans uppercase text-nepal-primary mb-6 text-2xl font-extrabold ">
                      About This Experience
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                      {experience.description.split('\n\n').map((paragraph, index) => <p key={index} className="mb-4">
                          {paragraph.trim()}
                        </p>)}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {experience.highlights.map((highlight, index) => <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-nepal-orange rounded-full mr-3"></div>
                            {highlight}
                          </div>)}
                      </div>
                    </div>
                  </motion.section>

                  {/* Host Information */}
                  <motion.section initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <h2 className="font-tm-sans uppercase text-nepal-primary mb-6 text-2xl font-extrabold">
                      Your Guide
                    </h2>
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                      <img src={experience.guide.avatar} alt={experience.guide.name} className="w-16 h-16 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-nepal-primary mb-1">
                          {experience.guide.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {experience.guide.experience} of guiding experience
                        </p>
                        <p className="text-gray-700 mb-3">{experience.guide.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {experience.guide.certifications.map((cert, index) => <span key={index} className="px-2 py-1 bg-nepal-primary/10 text-nepal-primary text-xs rounded-full">
                              {cert}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </motion.section>
                </TabsContent>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary">
                  <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <h2 className="font-tm-sans uppercase text-nepal-primary text-2xl font-extrabold mb-6">
                      Detailed Itinerary
                    </h2>
                    <div className="space-y-8">
                      {experience.itinerary.map((day, index) => <div key={day.day} className="flex gap-6">
                          {/* Timeline */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-nepal-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {day.day}
                            </div>
                            {index < experience.itinerary.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-8">
                            <h3 className="text-xl font-bold text-nepal-primary mb-2">
                              Day {day.day}: {day.title}
                            </h3>
                            <p className="text-gray-700 mb-4">{day.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{day.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{day.distance}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span>{day.accommodation}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>{day.meals}</span>
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Inclusions Tab */}
                <TabsContent value="inclusions">
                  <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }} className="space-y-8">
                    <div>
                      <h2 className="font-tm-sans uppercase text-nepal-primary text-2xl font-extrabold mb-6">
                        What's Included
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {experience.includes.map((item, index) => <div key={index} className="flex items-center text-gray-700">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            {item}
                          </div>)}
                      </div>
                    </div>

                    <div>
                      <h2 className="font-tm-sans uppercase text-nepal-primary text-2xl font-extrabold mb-6">
                        What's Not Included
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {experience.excludes.map((item, index) => <div key={index} className="flex items-center text-gray-700">
                            <Minus className="w-5 h-5 text-red-500 mr-3" />
                            {item}
                          </div>)}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-tm-sans uppercase text-nepal-primary text-2xl font-extrabold">
                        Traveler Reviews
                      </h2>
                      <div className="text-sm text-gray-600">
                        Showing {(currentReviewPage - 1) * reviewsPerPage + 1}-{Math.min(currentReviewPage * reviewsPerPage, totalReviews)} of {totalReviews} reviews
                      </div>
                    </div>

                    <div className="space-y-6">
                      {currentReviews.map(review => <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-start gap-4">
                            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-600">({review.rating}/5)</span>
                              </div>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              {review.photos.length > 0 && <div className="flex gap-2">
                                  {review.photos.map((photo, index) => <img key={index} src={photo} alt={`Review photo ${index + 1}`} className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80" />)}
                                </div>}
                            </div>
                          </div>
                        </div>)}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && <div className="flex items-center justify-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={() => setCurrentReviewPage(Math.max(1, currentReviewPage - 1))} disabled={currentReviewPage === 1}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({
                      length: totalPages
                    }, (_, i) => i + 1).map(page => <Button key={page} variant={currentReviewPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentReviewPage(page)}>
                            {page}
                          </Button>)}
                        <Button variant="outline" size="sm" onClick={() => setCurrentReviewPage(Math.min(totalPages, currentReviewPage + 1))} disabled={currentReviewPage === totalPages}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>}
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>

            {/* Related Experiences */}
            <motion.section initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="mt-16">
              <h2 className="font-tm-sans uppercase text-nepal-primary mb-6 font-extrabold text-2xl">
                Related Experiences
              </h2>
              
              <div className="relative">
                {/* Navigation Arrows */}
                <Button variant="outline" size="icon" onClick={prevRelatedExperience} disabled={relatedExperiencesIndex === 0} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full mx-0 px-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Button variant="outline" size="icon" onClick={nextRelatedExperience} disabled={relatedExperiencesIndex >= experience.relatedExperiences.length - 2} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full">
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Cards Container */}
                <div className="overflow-hidden px-0">
                  <div className="flex transition-transform duration-300 ease-in-out gap-6" style={{
                  transform: `translateX(-${relatedExperiencesIndex * 50}%)`
                }}>
                    {experience.relatedExperiences.map(relatedExp => <div key={relatedExp.id} className="flex-shrink-0 w-1/2">
                        <Link to={`/experiences/${relatedExp.id}`}>
                          <motion.div whileHover={{
                        y: -10
                      }} className="group cursor-pointer">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                              <div className="relative overflow-hidden">
                                <img src={relatedExp.image} alt={relatedExp.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(relatedExp.difficulty)}`}>
                                  {relatedExp.difficulty}
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                  <span className="text-lg font-bold text-nepal-primary">
                                    {formatPrice(relatedExp.price)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                  {renderStars(relatedExp.rating)}
                                  <span className="text-sm text-gray-600">({relatedExp.rating})</span>
                                </div>
                                <h3 className="text-xl font-semibold text-nepal-primary mb-2">
                                  {relatedExp.name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {relatedExp.description}
                                </p>
                                
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{relatedExp.duration}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{relatedExp.location}</span>
                                  </div>
                                </div>
                                
                                <Button className="w-full bg-nepal-orange hover:bg-orange-600 text-white">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </div>)}
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Static Booking Panel (Desktop) - Removed sticky positioning */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-6">
              <Card className="shadow-xl border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl text-nepal-primary">Book This Experience</span>
                    <span className="text-2xl font-bold text-nepal-orange">
                      {formatPrice(experience.price)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Traveler Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Traveler Details
                    </h4>
                    <div className="space-y-2">
                      <Input placeholder="Full Name *" value={bookingData.fullName} onChange={e => setBookingData({
                      ...bookingData,
                      fullName: e.target.value
                    })} />
                      <Input type="email" placeholder="Email Address *" value={bookingData.email} onChange={e => setBookingData({
                      ...bookingData,
                      email: e.target.value
                    })} />
                      <Input type="tel" placeholder="Phone Number *" value={bookingData.phone} onChange={e => setBookingData({
                      ...bookingData,
                      phone: e.target.value
                    })} />
                    </div>
                  </div>

                  {/* Tour Date */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Tour Date & Duration
                    </h4>
                    <Input type="date" value={bookingData.startDate} onChange={e => setBookingData({
                    ...bookingData,
                    startDate: e.target.value
                  })} />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="flexible" checked={bookingData.flexibleDate} onChange={e => setBookingData({
                      ...bookingData,
                      flexibleDate: e.target.checked
                    })} />
                      <Label htmlFor="flexible" className="text-sm">Flexible dates</Label>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Guests
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Adults</Label>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          adults: Math.max(1, bookingData.adults - 1)
                        })}>
                            -
                          </Button>
                          <span className="w-8 text-center">{bookingData.adults}</span>
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          adults: bookingData.adults + 1
                        })}>
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Children</Label>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          children: Math.max(0, bookingData.children - 1)
                        })}>
                            -
                          </Button>
                          <span className="w-8 text-center">{bookingData.children}</span>
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          children: bookingData.children + 1
                        })}>
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Infants</Label>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          infants: Math.max(0, bookingData.infants - 1)
                        })}>
                            -
                          </Button>
                          <span className="w-8 text-center">{bookingData.infants}</span>
                          <Button size="sm" variant="outline" onClick={() => setBookingData({
                          ...bookingData,
                          infants: bookingData.infants + 1
                        })}>
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <button onClick={() => setPriceBreakdownOpen(!priceBreakdownOpen)} className="flex items-center justify-between w-full font-semibold">
                      <span>Price Breakdown</span>
                      {priceBreakdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {priceBreakdownOpen && <div className="space-y-2 text-sm border-t pt-3">
                        <div className="flex justify-between">
                          <span>Adults ({bookingData.adults})</span>
                          <span>{formatPrice(experience.price * bookingData.adults)}</span>
                        </div>
                        {bookingData.children > 0 && <div className="flex justify-between">
                            <span>Children ({bookingData.children})</span>
                            <span>{formatPrice(experience.price * 0.5 * bookingData.children)}</span>
                          </div>}
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatPrice(calculateTotal())}</span>
                        </div>
                      </div>}
                  </div>

                  <Button className="w-full bg-nepal-orange hover:bg-orange-600 text-white text-lg py-3">
                    Book Now - {formatPrice(calculateTotal())}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        {!showMobileBooking ? <div className="p-4">
            <Button onClick={() => setShowMobileBooking(true)} className="w-full bg-nepal-orange hover:bg-orange-600 text-white text-lg py-3">
              Book Now - {formatPrice(calculateTotal())}
            </Button>
          </div> : <div className="p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Book Experience</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileBooking(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input placeholder="Select Date" type="date" value={bookingData.startDate} onChange={e => setBookingData({
            ...bookingData,
            startDate: e.target.value
          })} />
              
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <Label className="text-xs">Adults</Label>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  adults: Math.max(1, bookingData.adults - 1)
                })}>
                      -
                    </Button>
                    <span className="text-sm w-6 text-center">{bookingData.adults}</span>
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  adults: bookingData.adults + 1
                })}>
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <Label className="text-xs">Children</Label>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  children: Math.max(0, bookingData.children - 1)
                })}>
                      -
                    </Button>
                    <span className="text-sm w-6 text-center">{bookingData.children}</span>
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  children: bookingData.children + 1
                })}>
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <Label className="text-xs">Infants</Label>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  infants: Math.max(0, bookingData.infants - 1)
                })}>
                      -
                    </Button>
                    <span className="text-sm w-6 text-center">{bookingData.infants}</span>
                    <Button size="sm" variant="outline" onClick={() => setBookingData({
                  ...bookingData,
                  infants: bookingData.infants + 1
                })}>
                      +
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-nepal-orange hover:bg-orange-600 text-white">
                Confirm Booking - {formatPrice(calculateTotal())}
              </Button>
            </div>
          </div>}
      </div>

      {/* Gallery Modal */}
      {isModalOpen && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <img src={experience.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="w-full h-auto max-h-[80vh] object-contain" />
              
              {selectedImageIndex > 0 && <button onClick={() => setSelectedImageIndex(selectedImageIndex - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                  <ChevronLeft className="w-8 h-8" />
                </button>}
              
              {selectedImageIndex < experience.gallery.length - 1 && <button onClick={() => setSelectedImageIndex(selectedImageIndex + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                  <ChevronRight className="w-8 h-8" />
                </button>}
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              {experience.gallery.map((_, index) => <button key={index} onClick={() => setSelectedImageIndex(index)} className={`w-3 h-3 rounded-full ${selectedImageIndex === index ? 'bg-white' : 'bg-white/50'}`} />)}
            </div>
          </div>
        </div>}

      {/* Add bottom padding for mobile to account for fixed CTA */}
      <div className="lg:hidden h-20"></div>

      <Footer />
    </div>;
};
export default ExperienceDetail;