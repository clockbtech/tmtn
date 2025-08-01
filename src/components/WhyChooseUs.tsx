
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Users, MapPin, Star, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      icon: MapPin,
      title: 'Localized Experiences',
      description: 'Authentic adventures curated by local experts who know Nepal\'s hidden gems and cultural nuances.',
      position: 'top-left'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our priority with experienced guides, proper equipment, and comprehensive insurance coverage.',
      position: 'top-right'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Professional, certified guides with deep knowledge of Nepal\'s mountains, culture, and wildlife.',
      position: 'bottom-left'
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized excellence in customer service and sustainable tourism practices in Nepal.',
      position: 'bottom-right'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Top-notch accommodations and services ensuring comfort throughout your journey.',
      position: 'left'
    },
    {
      icon: Camera,
      title: 'Memorable Moments',
      description: 'Capture breathtaking landscapes and create unforgettable memories that last a lifetime.',
      position: 'right'
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card');
    const centerImage = gsap.utils.toArray('.center-image');
    
    gsap.fromTo(cards, {
      opacity: 0,
      scale: 0.8,
      y: 50
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.fromTo(centerImage, {
      opacity: 0,
      scale: 0.9,
      rotate: -5
    }, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  const getPositionStyles = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-0 left-0 lg:top-8 lg:left-8';
      case 'top-right':
        return 'absolute top-0 right-0 lg:top-8 lg:right-8';
      case 'bottom-left':
        return 'absolute bottom-0 left-0 lg:bottom-8 lg:left-8';
      case 'bottom-right':
        return 'absolute bottom-0 right-0 lg:bottom-8 lg:right-8';
      case 'left':
        return 'absolute left-0 top-1/2 transform -translate-y-1/2 lg:left-8';
      case 'right':
        return 'absolute right-0 top-1/2 transform -translate-y-1/2 lg:right-8';
      default:
        return '';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-tmtn-blue text-white overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-tm-sans uppercase font-extrabold mb-4">
            Why Choose Take Me To Nepal?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the Ultimate Nepal Adventure
          </p>
        </motion.div>

        {/* Desktop Layout - Features around central image */}
        <div className="hidden lg:block relative">
          <div className="relative w-full max-w-6xl mx-auto" style={{ height: '600px' }}>
            {/* Central Travel Image */}
            <motion.div 
              className="center-image absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                  alt="Nepal Adventure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Nepal Adventures</h3>
                  <p className="text-sm text-white/90">Unforgettable Experiences</p>
                </div>
              </div>
            </motion.div>

            {/* Positioned Feature Cards */}
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className={`feature-card w-72 ${getPositionStyles(feature.position)}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 border border-white/10 shadow-lg">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-14 h-14 bg-tmtn-red rounded-full mb-4"
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <h3 className="text-lg font-tm-sans font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>
                    
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout - Grid */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.slice(0, 4).map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="feature-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 h-full hover:bg-white/25 transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-14 h-14 bg-tmtn-red rounded-full mb-4"
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <h3 className="text-lg font-tm-sans font-semibold mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Central Image */}
          <motion.div 
            className="center-image flex justify-center mb-12"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                alt="Nepal Adventure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <h3 className="text-xl font-bold text-white mb-1">Nepal Adventures</h3>
                <p className="text-sm text-white/90">Unforgettable Experiences</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '10,000+', label: 'Happy Travelers' },
            { number: '500+', label: 'Tours Completed' },
            { number: '15+', label: 'Years Experience' },
            { number: '98%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl lg:text-4xl font-tm-sans uppercase font-bold text-tmtn-red mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
