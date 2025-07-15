
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
        setCurrentIndex(prev => (prev + 1) % Math.max(1, testimonials.length - 2));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  useEffect(() => {
    gsap.fromTo('.testimonial-card', 
      {
        opacity: 0,
        x: 50
      }, 
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
      }
    );
  }, [currentIndex]);

  return (
   <section className="py-20 overflow-hidden relative min-h-[600px]">
      {/* Background Image Layer */}
     <div className="absolute inset-0 -z-10">
      <img 
      src="/images/a26300b1-f01d-4f86-880d-99c4fc88d181.png" 
      alt="Background"
      className="w-full h-full object-cover"
    />
        {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-white/50"></div>
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

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 transition-transform duration-500 ease-in-out pb-10"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card flex-shrink-0 w-full lg:w-1/3 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-nepal-orange/10 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-nepal-orange" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
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
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-nepal-orange/20"
                    />
                    <div>
                      <div className="font-semibold text-nepal-primary text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-nepal-orange text-sm font-medium">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, index) => (
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
