import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Mountain, Clock, Users, Camera, X, ChevronLeft, ChevronRight, Play, Pause, Shield, Zap, Lightbulb } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
const DestinationDetail = () => {
  const {
    id
  } = useParams();
  const {
    t,
    formatPrice
  } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Mock data - in real app this would come from API
  const destination = {
    id: parseInt(id || '1'),
    name: 'Everest Base Camp',
    subtitle: 'Trek to the Foot of the World\'s Highest Peak',
    heroImage: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: `The Everest Base Camp trek is one of the most iconic adventures in the world, taking you through the heart of the Khumbu region to the base of Mount Everest. This incredible journey offers breathtaking mountain views, rich Sherpa culture, and the chance to stand at the foot of the world's highest peak.

    The trek passes through traditional Sherpa villages, ancient monasteries, and some of the most spectacular mountain scenery on Earth. You'll experience the unique culture of the Himalayas while challenging yourself physically and mentally on this unforgettable adventure.

    Along the way, you'll encounter fellow trekkers from around the world, creating lasting friendships and memories that will stay with you forever. The sense of achievement upon reaching Everest Base Camp is truly indescribable.`,
    highlights: ['Stand at Everest Base Camp (5,364m)', 'Visit ancient Tengboche Monastery', 'Experience authentic Sherpa culture', 'Breathtaking views of Everest, Lhotse, and Nuptse', 'Trek through Sagarmatha National Park', 'Cross the famous Hillary Suspension Bridge'],
    bestSeasons: [{
      icon: '🌸',
      months: 'March - May',
      description: 'Spring season with blooming rhododendrons'
    }, {
      icon: '🍂',
      months: 'September - November',
      description: 'Clear mountain views and stable weather'
    }],
    gallery: ['https://images.unsplash.com/photo-1513614835783-51537729c8ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1529556253689-cf147e0fb3d9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1571330177234-54304dac2beb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1745059177820-ddca8ef74f41?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1551932733-09ad7c5b2bc5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    attractions: [{
      id: 1,
      name: 'Tengboche Monastery',
      description: 'Ancient Buddhist monastery with stunning mountain views',
      image: 'https://images.unsplash.com/photo-1693039201083-2bf80bfe200c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Tengboche, Khumbu'
    }, {
      id: 2,
      name: 'Namche Bazaar',
      description: 'Gateway to Everest and vibrant Sherpa trading hub',
      image: 'https://images.unsplash.com/photo-1511215579272-6192432f83bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Namche, Khumbu'
    }, {
      id: 3,
      name: 'Kala Patthar',
      description: 'Best viewpoint for Everest panoramic views',
      image: 'https://images.unsplash.com/photo-1669873904455-d2a5f0e2c9da?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Gorak Shep, Khumbu'
    }],
    experiences: [{
      id: 1,
      name: 'Everest Base Camp Trek - 14 Days',
      description: 'Complete guided trek to Everest Base Camp',
      image: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: '14 days',
      difficulty: 'Challenging',
      price: 2500,
      includes: ['All meals', 'Accommodation', 'Guide', 'Permits']
    }, {
      id: 2,
      name: 'Helicopter Tour to Base Camp',
      description: 'Quick helicopter flight to Everest Base Camp',
      image: 'https://images.unsplash.com/flagged/photo-1571470690590-2080c1276242?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: '1 day',
      difficulty: 'Easy',
      price: 1200,
      includes: ['Helicopter flight', 'Landing at base camp', 'Breakfast']
    }],
    travelTips: {
      safety: ['Acclimatize properly to prevent altitude sickness', 'Carry altitude sickness medication', 'Stay hydrated and avoid alcohol', 'Follow your guide\'s advice at all times'],
      quickFacts: ['Max Altitude: 5,364m', 'Total Distance: 130km', 'Best Months: Mar-May, Sep-Nov', 'Difficulty: Challenging', 'Duration: 14-16 days'],
      proTips: ['Pack layers for changing weather conditions', 'Bring extra batteries as they drain faster in cold', 'Book teahouses in advance during peak season', 'Carry cash as ATMs are limited']
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => prev === destination.gallery.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, destination.gallery.length]);
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[70vh] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${destination.heroImage})`
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
              <Link to="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Destinations
              </Link>
              <h1 className="text-5xl font-bebas uppercase text-white mb-4 lg:text-6xl font-bold">
                {destination.name}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl lg:text-xl">
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
            <motion.section initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-bebas uppercase text-tmtn-blue mb-6 text-2xl font-extrabold">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                {destination.description.split('\n\n').map((paragraph, index) => <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>)}
              </div>

              {/* Key Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-tmtn-red rounded-full mr-3"></div>
                      {highlight}
                    </div>)}
                </div>
              </div>

              {/* Best Seasons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best Seasons to Visit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.bestSeasons.map((season, index) => <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-3xl mr-4">{season.icon}</span>
                      <div>
                        <div className="font-semibold text-tmtn-blue">{season.months}</div>
                        <div className="text-sm text-gray-600">{season.description}</div>
                      </div>
                    </div>)}
                </div>
              </div>
            </motion.section>

            {/* Photo Gallery */}
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
                <h2 className="font-bebas uppercase text-tmtn-blue font-extrabold text-2xl">
                  Photo Gallery
                </h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => setAutoPlay(!autoPlay)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-tmtn-blue">
                    {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoPlay ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              {/* Main Gallery Image */}
              <div className="relative mb-4">
                <img src={destination.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="w-full h-96 object-cover rounded-lg cursor-pointer" onClick={() => openModal(selectedImageIndex)} />
                <button onClick={() => openModal(selectedImageIndex)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-2">
                {destination.gallery.map((image, index) => <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${selectedImageIndex === index ? 'opacity-100 ring-2 ring-tmtn-blue' : 'opacity-70 hover:opacity-100'}`} onClick={() => setSelectedImageIndex(index)} />)}
              </div>
            </motion.section>

            {/* Linked Attractions */}
            <motion.section initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-bebas uppercase text-tmtn-blue mb-6 font-extrabold text-2xl">
                Nearby Attractions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destination.attractions.map(attraction => <Card key={attraction.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden">
                      <img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-tmtn-blue mb-2">{attraction.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {attraction.location}
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </motion.section>

            {/* Linked Experiences */}
            <motion.section initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-bebas uppercase text-tmtn-blue mb-6 font-extrabold text-2xl">
                Available Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.experiences.map(experience => <Card key={experience.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden">
                      <img src={experience.image} alt={experience.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-tmtn-blue">
                          {experience.difficulty}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-tmtn-blue mb-2 text-xl">{experience.name}</h3>
                      <p className="text-gray-600 mb-4">{experience.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {experience.duration}
                        </div>
                        <div className="text-2xl font-bold text-tmtn-blue">
                          {formatPrice(experience.price)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Includes:</div>
                        <div className="flex flex-wrap gap-1">
                          {experience.includes.map((item, index) => <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {item}
                            </span>)}
                        </div>
                      </div>

                      <button className="w-full btn-gradient text-white py-3 rounded-lg font-semibold">
                        Book Now
                      </button>
                    </CardContent>
                  </Card>)}
              </div>
            </motion.section>
          </div>

          {/* Travel Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Safety Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-tmtn-blue">
                    <Shield className="w-5 h-5 mr-2" />
                    Safety Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.safety.map((tip, index) => <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>)}
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-tmtn-blue">
                    <Zap className="w-5 h-5 mr-2" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.quickFacts.map((fact, index) => <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{fact.split(':')[0]}:</span>
                      <span className="text-sm font-semibold text-tmtn-blue">{fact.split(':')[1]}</span>
                    </div>)}
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-tmtn-blue">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {destination.travelTips.proTips.map((tip, index) => <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
              <X className="w-8 h-8" />
            </button>
            
            <img src={destination.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="max-w-full max-h-full object-contain" />
            
            <button onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? destination.gallery.length - 1 : selectedImageIndex - 1)} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button onClick={() => setSelectedImageIndex(selectedImageIndex === destination.gallery.length - 1 ? 0 : selectedImageIndex + 1)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {destination.gallery.length}
            </div>
          </div>
        </div>}

      <Footer />
    </div>;
};
export default DestinationDetail;
