
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Mountain, 
  Clock, 
  Users, 
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shield,
  Zap,
  Lightbulb
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AttractionCard from '../components/AttractionCard';
import ExperienceCard from '../components/ExperienceCard';
import { useTranslation } from '../contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const DestinationDetail = () => {
  const { id } = useParams();
  const { t, formatPrice } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Mock data - in real app this would come from API
  const destination = {
    id: parseInt(id || '1'),
    name: 'Everest Base Camp',
    subtitle: 'Trek to the Foot of the World\'s Highest Peak',
    heroImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    description: `The Everest Base Camp trek is one of the most iconic adventures in the world, taking you through the heart of the Khumbu region to the base of Mount Everest. This incredible journey offers breathtaking mountain views, rich Sherpa culture, and the chance to stand at the foot of the world's highest peak.

    The trek passes through traditional Sherpa villages, ancient monasteries, and some of the most spectacular mountain scenery on Earth. You'll experience the unique culture of the Himalayas while challenging yourself physically and mentally on this unforgettable adventure.

    Along the way, you'll encounter fellow trekkers from around the world, creating lasting friendships and memories that will stay with you forever. The sense of achievement upon reaching Everest Base Camp is truly indescribable.`,
    highlights: [
      'Stand at Everest Base Camp (5,364m)',
      'Visit ancient Tengboche Monastery',
      'Experience authentic Sherpa culture',
      'Breathtaking views of Everest, Lhotse, and Nuptse',
      'Trek through Sagarmatha National Park',
      'Cross the famous Hillary Suspension Bridge'
    ],
    bestSeasons: [
      { icon: '🌸', months: 'March - May', description: 'Spring season with blooming rhododendrons' },
      { icon: '🍂', months: 'September - November', description: 'Clear mountain views and stable weather' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    attractions: [
      {
        id: 1,
        name: 'Tengboche Monastery',
        description: 'Ancient Buddhist monastery with stunning mountain views and rich spiritual heritage',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Tengboche, Khumbu',
        rating: 4.8,
        duration: '2-3 hours',
        price: 25
      },
      {
        id: 2,
        name: 'Namche Bazaar',
        description: 'Gateway to Everest and vibrant Sherpa trading hub with colorful markets',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Namche, Khumbu',
        rating: 4.6,
        duration: 'Full day',
        price: 15
      },
      {
        id: 3,
        name: 'Kala Patthar',
        description: 'Best viewpoint for Everest panoramic views and sunrise photography',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Gorak Shep, Khumbu',
        rating: 4.9,
        duration: '4-5 hours',
        price: 35
      },
      {
        id: 4,
        name: 'Sagarmatha National Park',
        description: 'UNESCO World Heritage site with diverse flora and fauna',
        image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Khumbu Region',
        rating: 4.7,
        duration: 'Multi-day',
        price: 50
      }
    ],
    experiences: [
      {
        id: 1,
        name: 'Everest Base Camp Trek - 14 Days',
        description: 'Complete guided trek to Everest Base Camp with expert Sherpa guides and full support',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '14 days',
        difficulty: 'Challenging',
        price: 2500,
        includes: ['All meals', 'Accommodation', 'Guide', 'Permits', 'Insurance'],
        rating: 4.8,
        groupSize: '8-12 people'
      },
      {
        id: 2,
        name: 'Helicopter Tour to Base Camp',
        description: 'Quick helicopter flight to Everest Base Camp with aerial mountain views',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '1 day',
        difficulty: 'Easy',
        price: 1200,
        includes: ['Helicopter flight', 'Landing at base camp', 'Breakfast', 'Guide'],
        rating: 4.9,
        groupSize: '4-6 people'
      },
      {
        id: 3,
        name: 'Everest View Trek - 5 Days',
        description: 'Shorter trek to Hotel Everest View with stunning mountain panoramas',
        image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '5 days',
        difficulty: 'Moderate',
        price: 850,
        includes: ['Meals', 'Lodge stay', 'Guide', 'Permits'],
        rating: 4.6,
        groupSize: '6-10 people'
      },
      {
        id: 4,
        name: 'Photography Workshop Trek',
        description: 'Specialized photography trek with professional mountain photography guidance',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '10 days',
        difficulty: 'Moderate',
        price: 1800,
        includes: ['Photography guide', 'Equipment', 'Meals', 'Accommodation'],
        rating: 4.7,
        groupSize: '4-8 people'
      }
    ],
    travelTips: {
      safety: [
        'Acclimatize properly to prevent altitude sickness',
        'Carry altitude sickness medication',
        'Stay hydrated and avoid alcohol',
        'Follow your guide\'s advice at all times'
      ],
      quickFacts: [
        'Max Altitude: 5,364m',
        'Total Distance: 130km',
        'Best Months: Mar-May, Sep-Nov',
        'Difficulty: Challenging',
        'Duration: 14-16 days'
      ],
      proTips: [
        'Pack layers for changing weather conditions',
        'Bring extra batteries as they drain faster in cold',
        'Book teahouses in advance during peak season',
        'Carry cash as ATMs are limited'
      ]
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => 
        prev === destination.gallery.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, destination.gallery.length]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${destination.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to="/destinations" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Destinations
              </Link>
              <h1 className="text-5xl lg:text-7xl font-bebas uppercase font-bold text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl">
                {destination.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                {destination.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Key Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-nepal-orange rounded-full mr-3"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Seasons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best Seasons to Visit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.bestSeasons.map((season, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-3xl mr-4">{season.icon}</span>
                      <div>
                        <div className="font-semibold text-nepal-primary">{season.months}</div>
                        <div className="text-sm text-gray-600">{season.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Photo Gallery */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary">
                  Photo Gallery
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-nepal-primary"
                  >
                    {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoPlay ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              {/* Main Gallery Image */}
              <div className="relative mb-4">
                <img
                  src={destination.gallery[selectedImageIndex]}
                  alt={`Gallery ${selectedImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg cursor-pointer"
                  onClick={() => openModal(selectedImageIndex)}
                />
                <button
                  onClick={() => openModal(selectedImageIndex)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-2">
                {destination.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                      selectedImageIndex === index ? 'opacity-100 ring-2 ring-nepal-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </motion.section>

            {/* Nearby Attractions Slider */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Nearby Attractions
              </h2>
              <div className="attractions-slider">
                <Swiper
                  modules={[Navigation, Pagination, Keyboard, A11y]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                  }}
                  navigation={{
                    nextEl: '.attractions-next',
                    prevEl: '.attractions-prev',
                  }}
                  pagination={{
                    el: '.attractions-pagination',
                    clickable: true,
                  }}
                  keyboard={{
                    enabled: true,
                  }}
                  a11y={{
                    prevSlideMessage: 'Previous attraction',
                    nextSlideMessage: 'Next attraction',
                  }}
                  className="pb-12"
                >
                  {destination.attractions.map((attraction) => (
                    <SwiperSlide key={attraction.id}>
                      <AttractionCard {...attraction} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Custom Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button className="attractions-prev flex items-center justify-center w-10 h-10 rounded-full bg-nepal-primary text-white hover:bg-nepal-orange transition-colors disabled:opacity-50">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="attractions-pagination flex gap-2"></div>
                  <button className="attractions-next flex items-center justify-center w-10 h-10 rounded-full bg-nepal-primary text-white hover:bg-nepal-orange transition-colors disabled:opacity-50">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Available Experiences Slider */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Available Experiences
              </h2>
              <div className="experiences-slider">
                <Swiper
                  modules={[Navigation, Pagination, Keyboard, A11y]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                  }}
                  navigation={{
                    nextEl: '.experiences-next',
                    prevEl: '.experiences-prev',
                  }}
                  pagination={{
                    el: '.experiences-pagination',
                    clickable: true,
                  }}
                  keyboard={{
                    enabled: true,
                  }}
                  a11y={{
                    prevSlideMessage: 'Previous experience',
                    nextSlideMessage: 'Next experience',
                  }}
                  className="pb-12"
                >
                  {destination.experiences.map((experience) => (
                    <SwiperSlide key={experience.id}>
                      <ExperienceCard {...experience} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Custom Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button className="experiences-prev flex items-center justify-center w-10 h-10 rounded-full bg-nepal-primary text-white hover:bg-nepal-orange transition-colors disabled:opacity-50">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="experiences-pagination flex gap-2"></div>
                  <button className="experiences-next flex items-center justify-center w-10 h-10 rounded-full bg-nepal-primary text-white hover:bg-nepal-orange transition-colors disabled:opacity-50">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Travel Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Safety Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-nepal-primary">
                    <Shield className="w-5 h-5 mr-2" />
                    Safety Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.safety.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-nepal-primary">
                    <Zap className="w-5 h-5 mr-2" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.quickFacts.map((fact, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{fact.split(':')[0]}:</span>
                      <span className="text-sm font-semibold text-nepal-primary">{fact.split(':')[1]}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-nepal-primary">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.proTips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={destination.gallery[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={() => setSelectedImageIndex(
                selectedImageIndex === 0 ? destination.gallery.length - 1 : selectedImageIndex - 1
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => setSelectedImageIndex(
                selectedImageIndex === destination.gallery.length - 1 ? 0 : selectedImageIndex + 1
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {destination.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DestinationDetail;
