
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      type: 'image',
      src: 'https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg',
      title: 'Ancient Temples & Culture',
      subtitle: 'Discover Nepal\'s Serenity in the Himalayas'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1731052368947-9f262c4e9f4c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Pristine Mountain Lakes',
      subtitle: 'Spiritual heritage'
    },
    {
      type: 'image',
      src: 'https://www.rhinolandchitwan.com/images/2nights/1.jpg',
      title: 'Mount Everest Base Camp',
      subtitle: 'Experience the world\'s highest peak'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1540961018629-a53dfce2fb66?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Himalayan Adventure',
      subtitle: 'Immerse yourself in Nepal\'s majesty'
    },
    {
      type: 'image',
      src: 'https://cdn.pixabay.com/photo/2020/10/23/09/02/mountain-5678172_1280.jpg',
      title: 'Wildlife Safari',
      subtitle: 'Experience Nepal\'s diverse wildlife'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroContent.length]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo('.hero-content', {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.fromTo('.hero-media', {
        scale: 1.2
      }, {
        scale: 1,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
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
          </motion.div>
        ))}
      </div>

      {/* Full Left-Side Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111827e6]/90 via-[#111827e6]/70 to-transparent"></div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="hero-content">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 text-left"
              >
                <h1 className="text-5xl md:text-6xl font-tm-sans normal-case font-bold text-white mb-6 leading-tight lg:text-7xl">
                  TAKEMETONEPAL.COM
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-roboto text-white/90 mb-12 font-light max-w-2xl">
                  Your trusted gateway to exploring<br />
                  the wonders of Nepal
                </p>
                
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(255, 125, 51, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gradient text-white px-8 py-3 rounded-full text-lg font-tm-sans tracking-wider"
                >
                  <Link to="/Destinations" className="block w-full h-full">
                    Discover Nepal
                  </Link>
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
              index === currentSlide ? 'bg-tmtn-red scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
