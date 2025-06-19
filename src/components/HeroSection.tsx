
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Ancient Temples & Culture',
      subtitle: 'Discover Nepal\'s spiritual heritage'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Pristine Mountain Lakes',
      subtitle: 'Serenity in the Himalayas'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Mount Everest Base Camp',
      subtitle: 'Experience the world\'s highest peak'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Himalayan Adventure',
      subtitle: 'Immerse yourself in Nepal\'s majesty'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Wildlife Safari',
      subtitle: 'Experience Nepal\'s diverse wildlife'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroContent.length]);

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
        '.hero-media',
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
      {/* Background Media */}
      <div className="absolute inset-0">
        {heroContent.map((content, index) => (
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
              className="hero-media w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${content.src})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        ))}
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="hero-content max-w-4xl mx-auto">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas uppercase text-white mb-6 leading-tight">
                  TAKEMETONEPAL.COM
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-roboto text-white/90 mb-12 font-light max-w-2xl mx-auto">
                  Your trusted gateway to exploring<br />
                  the wonders of Nepal
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 30px rgba(255, 125, 51, 0.4)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-nepal-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-bebas uppercase tracking-wider transition-all duration-300 shadow-lg"
                >
                  DISCOVER NEPAL
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Centered */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroContent.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-nepal-orange scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
