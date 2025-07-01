
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Star, Quote, Mountain, Plane, Church } from 'lucide-react';

const Testimonials = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      image: 'https://images.unsplash.com/photo-1512288094938-363287817259?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
      rating: 5,
      text: 'The Everest Base Camp trek with Take Me To Nepal was absolutely incredible. Our guide was knowledgeable, the accommodations were perfect, and the views were breathtaking. This trip exceeded all my expectations!'
    },
    {
      name: 'Marcus Weber',
      location: 'Germany',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'What an amazing cultural experience! The temple tours and traditional cooking classes gave us deep insights into Nepalese culture. The team was professional and made everything seamless.'
    },
    {
      name: 'Emma Thompson',
      location: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The Annapurna circuit was the adventure of a lifetime. Every day brought new stunning landscapes and wonderful people. Take Me To Nepal made sure every detail was perfect.'
    },
    {
      name: 'James Mitchell',
      location: 'Australia',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'From the moment we landed to our departure, everything was perfectly organized. The wildlife safari in Chitwan was unforgettable, and our guide\'s passion for Nepal was infectious.'
    },
    {
      name: 'Lisa Chen',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The helicopter tour of the Himalayas was absolutely spectacular. Seeing Mount Everest up close was a dream come true. The team\'s attention to safety and comfort was impressive.'
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  useEffect(() => {
    gsap.fromTo('.testimonial-content', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [currentIndex]);

  // Prayer Flag Dots Animation
  const PrayerFlagDots = () => (
    <div className="absolute top-4 right-4 hidden lg:flex space-x-1 opacity-[0.08]">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-nepal-orange"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/cd69aa7a-1ff4-42aa-b8fa-d8ee8cdf17c4.png)'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      {/* Scattered Travel Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mountain Icon - Top Left */}
        <motion.div 
          className="absolute top-16 left-12 text-nepal-primary opacity-[0.07] hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mountain size={120} strokeWidth={1} />
        </motion.div>

        {/* Plane Icon - Top Right */}
        <motion.div 
          className="absolute top-32 right-24 text-nepal-orange opacity-[0.06] hidden lg:block"
          animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane size={80} strokeWidth={1} />
        </motion.div>

        {/* Temple Icon - Bottom Left */}
        <motion.div 
          className="absolute bottom-24 left-16 text-nepal-primary opacity-[0.08] hidden lg:block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Church size={100} strokeWidth={1} />
        </motion.div>

        {/* Mobile - Single Mountain Icon */}
        <motion.div 
          className="absolute top-1/4 right-8 text-nepal-primary opacity-[0.05] lg:hidden"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mountain size={60} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-4xl font-bebas uppercase font-extrabold text-nepal-primary mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real people who've discovered the magic of Nepal with us
          </p>
        </motion.div>

        <div 
          ref={carouselRef} 
          className="relative max-w-4xl mx-auto" 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Prayer Flag Dots */}
          <PrayerFlagDots />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-content bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50 relative overflow-hidden"
            >
              {/* Subtle Pattern Overlay on Card */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="card-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                      <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                      <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#card-pattern)" className="text-nepal-primary"/>
                </svg>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-16 h-16 bg-nepal-orange rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed italic font-medium">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-nepal-orange/20"
                    />
                    <div>
                      <div className="font-semibold text-nepal-primary">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonials[currentIndex].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-nepal-orange scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
