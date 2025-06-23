import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const Attractions = () => {
  const {
    t
  } = useTranslation();
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  const attractions = [{
    id: 1,
    name: 'Swayambhunath Stupa (Monkey Temple)',
    description: 'Ancient religious complex atop a hill in the Kathmandu Valley',
    image: 'https://images.unsplash.com/photo-1566552881925-ad7bbef8c6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '2-3 hours',
    rating: 4.5,
    type: 'Religious Site'
  }, {
    id: 2,
    name: 'Pashupatinath Temple',
    description: 'Sacred Hindu temple complex dedicated to Lord Shiva',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '2-4 hours',
    rating: 4.7,
    type: 'Religious Site'
  }, {
    id: 3,
    name: 'Boudhanath Stupa',
    description: 'One of the largest Buddhist stupas in the world',
    image: 'https://images.unsplash.com/photo-1605640558353-ded4b4eb3871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '1-2 hours',
    rating: 4.6,
    type: 'Religious Site'
  }, {
    id: 4,
    name: 'Durbar Square',
    description: 'Historic plaza facing old royal palaces',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Kathmandu',
    duration: '3-4 hours',
    rating: 4.4,
    type: 'Historical Site'
  }, {
    id: 5,
    name: 'Sarangkot Viewpoint',
    description: 'Famous viewpoint for sunrise over the Himalayas',
    image: 'https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Pokhara',
    duration: 'Half day',
    rating: 4.8,
    type: 'Viewpoint'
  }, {
    id: 6,
    name: 'Phewa Lake',
    description: 'Serene lake with mountain reflections and boating',
    image: 'https://images.unsplash.com/photo-1605640558353-ded4b4eb3871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Pokhara',
    duration: '2-3 hours',
    rating: 4.5,
    type: 'Natural Beauty'
  }];
  return <div className="min-h-screen bg-white font-poppins">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nepal-orange to-red-500 py-[150px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Attractions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => <motion.div key={attraction.id} initial={{
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
                    <h3 className="text-xl font-bebas uppercase font-semibold text-nepal-primary mb-2">
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
                    
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="w-full bg-nepal-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                      Explore Attraction
                    </motion.button>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Attractions;