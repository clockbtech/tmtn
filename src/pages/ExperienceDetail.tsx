
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Camera, X, ChevronLeft, ChevronRight, Play, Pause, Shield, Zap, Lightbulb, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ExperienceDetail = () => {
  const { id } = useParams();
  const { t, formatPrice } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Mock data - in real app this would come from API/JSON
  const experience = {
    id: parseInt(id || '1'),
    name: 'Everest Base Camp Trek',
    subtitle: 'The Ultimate Himalayan Adventure to the Base of the World\'s Highest Peak',
    heroImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    description: `The Everest Base Camp Trek is one of the most iconic and challenging adventures in the world. This legendary journey takes you through the heart of the Khumbu region, following in the footsteps of famous mountaineers to reach the base camp of Mount Everest at 5,364 meters.

    The trek offers an incredible combination of natural beauty, cultural immersion, and personal achievement. You'll traverse through traditional Sherpa villages, ancient Buddhist monasteries, and dramatic mountain landscapes while acclimatizing to the high altitude.

    Experience the warm hospitality of the Sherpa people, witness stunning sunrise views over the world's highest peaks, and stand at the foot of Mount Everest. This life-changing adventure requires good physical fitness and mental determination, but rewards you with memories that will last a lifetime.`,
    highlights: ['Trek to Mount Everest Base Camp at 5,364m', 'Experience Sherpa culture and traditions', 'Visit Tengboche Monastery', 'Stunning views of Everest, Lhotse, and Ama Dablam', 'Cross suspension bridges over deep gorges', 'Acclimatization in Namche Bazaar'],
    duration: '14 days',
    groupSize: '8-12 people',
    difficulty: 'Extreme',
    price: 1299,
    location: 'Khumbu Region',
    includes: ['Professional guide', 'Porter service', 'Accommodation in teahouses', 'All meals during trek', 'Flight tickets (Kathmandu-Lukla-Kathmandu)', 'Permits and entrance fees'],
    itinerary: [
      { day: 1, title: 'Fly to Lukla, trek to Phakding', description: 'Scenic flight to Lukla, begin trek to Phakding (2,651m)' },
      { day: 2, title: 'Trek to Namche Bazaar', description: 'Cross suspension bridges, first glimpse of Everest' },
      { day: 3, title: 'Acclimatization day in Namche', description: 'Rest day with optional hike to Everest View Hotel' },
      { day: 4, title: 'Trek to Tengboche', description: 'Visit famous monastery with Everest views' },
      { day: 5, title: 'Trek to Dingboche', description: 'Enter the alpine zone, spectacular mountain views' }
    ],
    bestSeasons: [
      { icon: '🌸', months: 'March - May', description: 'Clear skies and warmer temperatures' },
      { icon: '🍂', months: 'September - November', description: 'Excellent visibility and stable weather' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486022830324-0541c3b6f36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    relatedExperiences: [
      {
        id: 2,
        name: 'Annapurna Circuit Trek',
        description: 'Classic trek through diverse landscapes and traditional villages',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '16 days',
        groupSize: '6-10 people',
        difficulty: 'Moderate',
        price: 899,
        location: 'Annapurna Region'
      },
      {
        id: 3,
        name: 'Langtang Valley Trek',
        description: 'Trek through the beautiful valley of glaciers and friendly locals',
        image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '9 days',
        groupSize: '6-10 people',
        difficulty: 'Moderate',
        price: 699,
        location: 'Langtang Region'
      }
    ],
    nearbyAttractions: [
      {
        id: 1,
        name: 'Swayambhunath Stupa',
        description: 'Ancient Buddhist temple with panoramic valley views',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Kathmandu',
        duration: '2-3 hours',
        rating: 4.8,
        type: 'UNESCO'
      },
      {
        id: 2,
        name: 'Tengboche Monastery',
        description: 'Famous monastery with stunning Everest views',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Khumbu',
        duration: '1-2 hours',
        rating: 4.9,
        type: 'Cultural'
      }
    ],
    travelTips: {
      safety: ['Acclimatize properly to avoid altitude sickness', 'Carry comprehensive travel insurance', 'Follow your guide\'s instructions at all times', 'Stay hydrated and avoid alcohol at high altitude'],
      quickFacts: ['Max altitude: 5,364m', 'Best months: Mar-May, Sep-Nov', 'Fitness level: High', 'Group size: 8-12 people', 'Duration: 14 days'],
      proTips: ['Book flights early as weather can cause delays', 'Pack layers for varying temperatures', 'Bring high-quality trekking boots', 'Consider hiring additional porter for comfort']
    }
  };

  // Helper function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Extreme': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => prev === experience.gallery.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, experience.gallery.length]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[70vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${experience.heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/experiences" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Experiences
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                  {experience.difficulty}
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-nepal-primary">
                    {formatPrice(experience.price)}
                  </span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bebas uppercase font-bold text-white mb-4">
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
                {experience.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Key Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experience.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-nepal-orange rounded-full mr-3"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experience.includes.map((item, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Seasons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best Seasons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.bestSeasons.map((season, index) => (
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
                  src={experience.gallery[selectedImageIndex]}
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
                {experience.gallery.map((image, index) => (
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

            {/* Related Experiences */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Related Experiences
              </h2>
              <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-4">
                  {experience.relatedExperiences.map((relatedExp) => (
                    <CarouselItem key={relatedExp.id} className="pl-4 md:basis-1/2">
                      <Link to={`/experiences/${relatedExp.id}`}>
                        <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="relative overflow-hidden">
                              <img
                                src={relatedExp.image}
                                alt={relatedExp.name}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
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
                                  <Users className="w-4 h-4 mr-2" />
                                  <span>{relatedExp.groupSize}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <span>{relatedExp.location}</span>
                                </div>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                              >
                                Book Experience
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white shadow-lg border-0 hover:bg-gray-50" />
                <CarouselNext className="bg-white shadow-lg border-0 hover:bg-gray-50" />
              </Carousel>
            </motion.section>

            {/* Nearby Attractions */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Nearby Attractions
              </h2>
              <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-4">
                  {experience.nearbyAttractions.map((attraction) => (
                    <CarouselItem key={attraction.id} className="pl-4 md:basis-1/2">
                      <Link to={`/attractions/${attraction.id}`}>
                        <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="relative overflow-hidden">
                              <img
                                src={attraction.image}
                                alt={attraction.name}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {attraction.type}
                              </div>
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-semibold">{attraction.rating}</span>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <h3 className="text-xl font-semibold text-nepal-primary mb-2">
                                {attraction.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
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
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-nepal-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                              >
                                Explore Attraction
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white shadow-lg border-0 hover:bg-gray-50" />
                <CarouselNext className="bg-white shadow-lg border-0 hover:bg-gray-50" />
              </Carousel>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Experience Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-nepal-primary">
                    <Calendar className="w-5 h-5 mr-2" />
                    Experience Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Duration:</span>
                    <span className="text-sm font-semibold text-nepal-primary">{experience.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Group Size:</span>
                    <span className="text-sm font-semibold text-nepal-primary">{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Difficulty:</span>
                    <span className={`text-sm font-semibold text-white px-2 py-1 rounded ${getDifficultyColor(experience.difficulty)}`}>
                      {experience.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Location:</span>
                    <span className="text-sm font-semibold text-nepal-primary">{experience.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-nepal-primary">
                    <Shield className="w-5 h-5 mr-2" />
                    Safety Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {experience.travelTips.safety.map((tip, index) => (
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
                  {experience.travelTips.quickFacts.map((fact, index) => (
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
                  {experience.travelTips.proTips.map((tip, index) => (
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
              src={experience.gallery[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? experience.gallery.length - 1 : selectedImageIndex - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex === experience.gallery.length - 1 ? 0 : selectedImageIndex + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {experience.gallery.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
