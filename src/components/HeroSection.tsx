
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Mount Everest Base Camp',
      subtitle: 'Experience the world\'s highest peak'
    },
    {
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Ancient Temples & Culture',
      subtitle: 'Discover Nepal\'s spiritual heritage'
    },
    {
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Pristine Mountain Lakes',
      subtitle: 'Serenity in the Himalayas'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        '.hero-content',
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero-image',
        {
          scale: 1.2,
        },
        {
          scale: 1,
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, [currentSlide]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1 
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div
              className="hero-image w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-hero-gradient" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="hero-content text-right max-w-2xl">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 leading-tight">
                  takemetonepal.com
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 font-light">
                  Your trusted gateway to exploring<br />
                  the wonders of Nepal
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 30px rgba(255, 125, 51, 0.4)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-nepal-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
                >
                  Discover Nepal
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-nepal-orange' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-px h-8 bg-white/50"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
