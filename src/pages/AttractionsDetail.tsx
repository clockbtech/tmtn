import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Mountain, Clock, Users, Camera, X, ChevronLeft, ChevronRight, Play, Pause, Shield, Zap, Lightbulb, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
const AttractionsDetail = () => {
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

  // Mock data - in real app this would come from API/JSON
  const attraction = {
    id: parseInt(id || '1'),
    name: 'Swayambhunath Stupa',
    subtitle: 'Ancient Buddhist Temple with Panoramic Valley Views',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    description: `Swayambhunath Stupa, also known as the Monkey Temple, is an ancient religious complex perched atop a hill in the Kathmandu Valley. This sacred Buddhist site dates back over 2,000 years and offers breathtaking panoramic views of the entire Kathmandu Valley.

    The temple complex features a magnificent white dome stupa crowned with a golden spire, adorned with the famous Buddha eyes looking out in all four directions. The site is renowned for its resident monkey population, which gives the temple its popular nickname.

    Visitors can explore the rich spiritual atmosphere while enjoying stunning sunrise and sunset views over the valley. The climb up the 365 stone steps is considered a pilgrimage in itself, leading to one of Nepal's most photographed landmarks.`,
    highlights: ['Ancient Buddhist stupa dating back 2,000 years', 'Panoramic views of Kathmandu Valley', 'Famous Buddha eyes on the golden spire', 'Sacred pilgrimage site for Buddhists', 'Home to hundreds of holy monkeys', 'UNESCO World Heritage Site component'],
    bestSeasons: [{
      icon: '🌸',
      months: 'March - May',
      description: 'Clear skies and comfortable temperatures'
    }, {
      icon: '🍂',
      months: 'October - December',
      description: 'Excellent visibility and mild weather'
    }],
    gallery: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    linkedAttractions: [{
      id: 2,
      name: 'Pashupatinath Temple',
      description: 'Sacred Hindu temple complex dedicated to Lord Shiva',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Kathmandu',
      duration: '2-4 hours',
      rating: 4.7,
      type: 'Cultural'
    }, {
      id: 3,
      name: 'Boudhanath Stupa',
      description: 'One of the largest Buddhist stupas in the world',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Kathmandu',
      duration: '1-2 hours',
      rating: 4.6,
      type: 'UNESCO'
    }],
    linkedExperiences: [{
      id: 1,
      name: 'Sunrise Photography Tour',
      description: 'Capture the golden hour at Swayambhunath with professional guidance',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3 hours',
      difficulty: 'Easy',
      price: 75,
      includes: ['Professional guide', 'Photography tips', 'Light breakfast']
    }, {
      id: 2,
      name: 'Buddhist Meditation Experience',
      description: 'Learn meditation techniques with local monks',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 hours',
      difficulty: 'Easy',
      price: 50,
      includes: ['Monk guidance', 'Meditation session', 'Cultural insights']
    }],
    travelTips: {
      safety: ['Be cautious of monkeys - do not feed or provoke them', 'Climb the stairs slowly and take breaks if needed', 'Respect religious customs and dress modestly', 'Keep belongings secure from curious monkeys'],
      quickFacts: ['Height: 77m above valley', 'Steps to climb: 365', 'Best time: Early morning', 'Entry fee: NPR 200', 'Duration: 2-3 hours'],
      proTips: ['Visit early morning for best light and fewer crowds', 'Bring water and comfortable walking shoes', 'Respect photography restrictions in certain areas', 'Combine with nearby Durbar Square visit']
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => prev === attraction.gallery.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, attraction.gallery.length]);
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[70vh] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${attraction.heroImage})`
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
              <Link to="/attractions" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Attractions
              </Link>
              <h1 className="text-5xl lg:text-7xl font-bebas uppercase font-bold text-white mb-4">
                {attraction.name}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl">
                {attraction.subtitle}
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
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                {attraction.description.split('\n\n').map((paragraph, index) => <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>)}
              </div>

              {/* Key Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attraction.highlights.map((highlight, index) => <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-nepal-orange rounded-full mr-3"></div>
                      {highlight}
                    </div>)}
                </div>
              </div>

              {/* Best Seasons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best Seasons to Visit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attraction.bestSeasons.map((season, index) => <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-3xl mr-4">{season.icon}</span>
                      <div>
                        <div className="font-semibold text-nepal-primary">{season.months}</div>
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
                <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary">
                  Photo Gallery
                </h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => setAutoPlay(!autoPlay)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-nepal-primary">
                    {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoPlay ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              {/* Main Gallery Image */}
              <div className="relative mb-4">
                <img src={attraction.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="w-full h-96 object-cover rounded-lg cursor-pointer" onClick={() => openModal(selectedImageIndex)} />
                <button onClick={() => openModal(selectedImageIndex)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-2">
                {attraction.gallery.map((image, index) => <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${selectedImageIndex === index ? 'opacity-100 ring-2 ring-nepal-primary' : 'opacity-70 hover:opacity-100'}`} onClick={() => setSelectedImageIndex(index)} />)}
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
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Nearby Attractions
              </h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {attraction.linkedAttractions.map(linkedAttraction => <CarouselItem key={linkedAttraction.id} className="pl-4 md:basis-1/2">
                      <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="relative overflow-hidden">
                          <img src={linkedAttraction.image} alt={linkedAttraction.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {linkedAttraction.type}
                          </div>
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-semibold">{linkedAttraction.rating}</span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-nepal-primary mb-2">{linkedAttraction.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{linkedAttraction.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {linkedAttraction.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {linkedAttraction.duration}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="mx-[34px]" />
                <CarouselNext className="bg-slate-50 mx-[34px]" />
              </Carousel>
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
              <h2 className="text-3xl font-bebas uppercase font-bold text-nepal-primary mb-6">
                Available Experiences
              </h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {attraction.linkedExperiences.map(experience => <CarouselItem key={experience.id} className="pl-4 md:basis-1/2">
                      <Card className="group hover:shadow-lg transition-shadow">
                        <div className="relative overflow-hidden">
                          <img src={experience.image} alt={experience.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-semibold text-nepal-primary">
                              {experience.difficulty}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-nepal-primary mb-2">{experience.name}</h3>
                          <p className="text-gray-600 mb-4">{experience.description}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {experience.duration}
                            </div>
                            <div className="text-2xl font-bold text-nepal-primary">
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

                          <button className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                            Book Now
                          </button>
                        </CardContent>
                      </Card>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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
                  {attraction.travelTips.safety.map((tip, index) => <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>)}
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
                  {attraction.travelTips.quickFacts.map((fact, index) => <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{fact.split(':')[0]}:</span>
                      <span className="text-sm font-semibold text-nepal-primary">{fact.split(':')[1]}</span>
                    </div>)}
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
                  {attraction.travelTips.proTips.map((tip, index) => <div key={index} className="flex items-start">
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
            
            <img src={attraction.gallery[selectedImageIndex]} alt={`Gallery ${selectedImageIndex + 1}`} className="max-w-full max-h-full object-contain" />
            
            <button onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? attraction.gallery.length - 1 : selectedImageIndex - 1)} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button onClick={() => setSelectedImageIndex(selectedImageIndex === attraction.gallery.length - 1 ? 0 : selectedImageIndex + 1)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {attraction.gallery.length}
            </div>
          </div>
        </div>}

      <Footer />
    </div>;
};
export default AttractionsDetail;