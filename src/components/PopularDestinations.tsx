import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../contexts/TranslationContext';
gsap.registerPlugin(ScrollTrigger);
const PopularDestinations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    t
  } = useTranslation();
  const destinations = [{
    id: 1,
    nameKey: 'destinations.everest',
    descKey: 'destinations.everest.desc',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 2,
    nameKey: 'destinations.annapurna',
    descKey: 'destinations.annapurna.desc',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 3,
    nameKey: 'destinations.pokhara',
    descKey: 'destinations.pokhara.desc',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 4,
    nameKey: 'destinations.kathmandu',
    descKey: 'destinations.kathmandu.desc',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 5,
    nameKey: 'destinations.chitwan',
    descKey: 'destinations.chitwan.desc',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 6,
    nameKey: 'destinations.langtang',
    descKey: 'destinations.langtang.desc',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }];
  useEffect(() => {
    const cards = gsap.utils.toArray('.destination-card');
    gsap.fromTo(cards, {
      opacity: 0,
      y: 60,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);
  return <section ref={sectionRef} className="py-20 bg-gray-50" id="destinations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-4xl font-tm-sans uppercase font-extrabold text-nepal-primary mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => <motion.div key={destination.id} className="destination-card group cursor-pointer" whileHover={{
          y: -10
        }} transition={{
          duration: 0.3
        }}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
                {/* Full-bleed image */}
                <img src={destination.image} alt={t(destination.nameKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300"></div>
                
                {/* Text overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-plus-jakarta font-bold mb-2 drop-shadow-lg">
                    {t(destination.nameKey)}
                  </h3>
                  <p className="font-inter text-gray-200 mb-4 line-clamp-2 drop-shadow-md">
                    {t(destination.descKey)}
                  </p>
                  
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="text-nepal-orange hover:text-orange-400 font-plus-jakarta font-semibold transition-colors duration-200 flex items-center drop-shadow-lg">
                    {t('destinations.viewMore')}
                    <motion.span animate={{
                  x: [0, 5, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }} className="ml-2">
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default PopularDestinations;