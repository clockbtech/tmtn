
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
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
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  useEffect(() => {
    gsap.fromTo('.testimonial-content',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  }, [currentIndex]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-nepal-primary mb-4">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-content bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-16 h-16 bg-nepal-orange rounded-full flex items-center justify-center"
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
                  <p className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full object-cover"
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
                  index === currentIndex ? 'bg-nepal-orange scale-125' : 'bg-gray-300'
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
