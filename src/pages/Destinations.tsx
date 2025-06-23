import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);
const Destinations = () => {
  const {
    t
  } = useTranslation();
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  const destinations = [{
    id: 1,
    nameKey: 'destinations.everest',
    descKey: 'destinations.everest.desc',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Extreme',
    duration: '14-16 days',
    altitude: '5,364m'
  }, {
    id: 2,
    nameKey: 'destinations.annapurna',
    descKey: 'destinations.annapurna.desc',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    duration: '12-20 days',
    altitude: '5,416m'
  }, {
    id: 3,
    nameKey: 'destinations.pokhara',
    descKey: 'destinations.pokhara.desc',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    duration: '2-5 days',
    altitude: '822m'
  }, {
    id: 4,
    nameKey: 'destinations.kathmandu',
    descKey: 'destinations.kathmandu.desc',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    duration: '3-7 days',
    altitude: '1,400m'
  }, {
    id: 5,
    nameKey: 'destinations.chitwan',
    descKey: 'destinations.chitwan.desc',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    duration: '2-4 days',
    altitude: '415m'
  }, {
    id: 6,
    nameKey: 'destinations.langtang',
    descKey: 'destinations.langtang.desc',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    duration: '7-12 days',
    altitude: '4,984m'
  }];
  return <div className="min-h-screen bg-white font-poppins">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-nepal-primary to-blue-600 py-[130px]">
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
              {t('destinations.title')}
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto">
              {t('destinations.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => <motion.div key={destination.id} initial={{
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
                    <img src={destination.image} alt={t(destination.nameKey)} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-nepal-primary">
                        {destination.difficulty}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bebas uppercase font-semibold text-nepal-primary mb-2">
                      {t(destination.nameKey)}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t(destination.descKey)}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span><strong>Duration:</strong> {destination.duration}</span>
                      <span><strong>Altitude:</strong> {destination.altitude}</span>
                    </div>
                    
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                      Learn More
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
export default Destinations;