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
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our priority with experienced guides, proper equipment, and comprehensive insurance coverage.',
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Professional, certified guides with deep knowledge of Nepal\'s mountains, culture, and wildlife.',
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized excellence in customer service and sustainable tourism practices in Nepal.',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Top-notch accommodations and services ensuring comfort throughout your journey.',
    },
    {
      icon: Camera,
      title: 'Memorable Moments',
      description: 'Capture breathtaking landscapes and create unforgettable memories that last a lifetime.',
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card');
    const centerImage = gsap.utils.toArray('.center-image');
    
    gsap.fromTo(cards, {
      opacity: 0,
      scale: 0.9,
      y: 30
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.fromTo(centerImage, {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-tmtn-blue text-white overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 uppercase">
            Why Choose Take Me To Nepal?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the Ultimate Nepal Adventure
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop and Tablet Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-8 items-center">
              {/* Left Column - 3 Features */}
              <div className="space-y-6">
                {features.slice(0, 3).map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isMiddleCard = index === 1;
                  return (
                    <motion.div
                      key={index}
                      className={`feature-card ${isMiddleCard ? 'transform -translate-x-4' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors duration-300 border border-white/10">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex-shrink-0 w-12 h-12 bg-tmtn-red rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Column - Oval Hero Image */}
              <div className="flex justify-center">
                <motion.div 
                  className="center-image"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-80 h-[500px] rounded-full overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                      alt="Nepal Adventure"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Right Column - 3 Features */}
              <div className="space-y-6">
                {features.slice(3, 6).map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isMiddleCard = index === 1;
                  return (
                    <motion.div
                      key={index + 3}
                      className={`feature-card ${isMiddleCard ? 'transform translate-x-4' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors duration-300 border border-white/10">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex-shrink-0 w-12 h-12 bg-tmtn-red rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden space-y-6">
            {/* Mobile Oval Hero Image */}
            <motion.div 
              className="center-image flex justify-center mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-72 h-[400px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                  alt="Nepal Adventure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Mobile Feature Grid */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="feature-card"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/15 transition-colors duration-300 border border-white/10">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-tmtn-red rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section - Text Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {[
            { number: '10,000+', label: 'Happy Travelers' },
            { number: '500+', label: 'Tours Completed' },
            { number: '15+', label: 'Years Experience' },
            { number: '98%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="p-5"
            >
              <div className="text-2xl lg:text-3xl font-bold text-tmtn-red mb-1">
                {stat.number}
              </div>
              <div className="text-blue-100 text-sm">
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
