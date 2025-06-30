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
    image: 'https://th.bing.com/th/id/R.34473dbb198fe12d841a25f710ab79f6?rik=o4bJt8X5xPLRJg&pid=ImgRaw&r=0'
  }, {
    id: 2,
    nameKey: 'destinations.annapurna',
    descKey: 'destinations.annapurna.desc',
    image: 'https://th.bing.com/th/id/R.961a120f44d7bfad36cac131dc90a11c?rik=JHq%2bNzIjK5TFyg&riu=http%3a%2f%2fwww.gtreview.com%2fwp-content%2fuploads%2f2014%2f11%2fNepal-Annapurna-Base-Camp.jpg&ehk=hWKVJuFF2tBCklm4pGQKA0olC4rTUvUjUqyaGcPrjks%3d&risl=1&pid=ImgRaw&r=0'
  }, {
    id: 3,
    nameKey: 'destinations.pokhara',
    descKey: 'destinations.pokhara.desc',
    image: 'https://images.unsplash.com/photo-1610997686651-98492fd08108?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }, {
    id: 4,
    nameKey: 'destinations.kathmandu',
    descKey: 'destinations.kathmandu.desc',
    image: 'https://images.unsplash.com/photo-1653104626949-bc7f6413a5b7?q=80&w=1437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }, {
    id: 5,
    nameKey: 'destinations.chitwan',
    descKey: 'destinations.chitwan.desc',
    image: 'https://images.unsplash.com/photo-1549888668-19281758dfbe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }, {
    id: 6,
    nameKey: 'destinations.langtang',
    descKey: 'destinations.langtang.desc',
    image: 'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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