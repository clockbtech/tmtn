
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Mount Everest Base Camp',
      subtitle: 'Experience the world\'s highest peak'
    },
    {
      type: 'video',
      src: 'https://player.vimeo.com/external/342333493.sd.mp4?s=e90dcaba73c02b95a5996b86b65c668b1b8cc1a9&profile_id=164&oauth2_token_id=57447761',
      title: 'Himalayan Adventure',
      subtitle: 'Immerse yourself in Nepal\'s majesty'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      title: 'Ancient Temples & Culture',
      subtitle: 'Discover Nepal\'s spiritual heritage'
    },
    {
      type: 'video',
      src: 'https://player.vimeo.com/external/370467553.sd.mp4?s=1b0c0b8d0d0e0f1a1b1c1d1e1f20212223242526&profile_id=164',
      title: 'Cultural Journey',
      subtitle: 'Experience authentic Nepalese culture'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Pristine Mountain Lakes',
      subtitle: 'Serenity in the Himalayas'
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
            {content.type === 'video' ? (
              <video
                className="hero-media w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={content.src} type="video/mp4" />
              </video>
            ) : (
              <div
                className="hero-media w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${content.src})` }}
              />
            )}
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
                <h1 className="text-heading font-bebas uppercase text-white mb-6 leading-tight">
                  TAKEMETONEPAL.COM
                </h1>
                <p className="text-body font-roboto text-white/90 mb-12 font-light max-w-2xl mx-auto">
                  Your trusted gateway to exploring<br />
                  the wonders of Nepal
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 30px rgba(255, 125, 51, 0.4)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-nepal-orange hover:bg-orange-600 text-white px-12 py-6 rounded-full text-xl font-bebas uppercase tracking-wider transition-all duration-300 shadow-lg"
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
