
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
      text: 'The Everest Base Camp trek with Take Me To Nepal was absolutely incredible. Our guide was knowledgeable, the accommodations were perfect, and the views were breathtaking. This trip exceeded all my expectations!',
      imageCards: [
        {
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
          alt: 'Everest Base Camp Trek'
        },
        {
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1169&auto=format&fit=crop',
          alt: 'Mountain Views'
        }
      ]
    },
    {
      name: 'Marcus Weber',
      location: 'Germany',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'What an amazing cultural experience! The temple tours and traditional cooking classes gave us deep insights into Nepalese culture. The team was professional and made everything seamless.',
      imageCards: [
        {
          image: 'https://images.unsplash.com/photo-1728145993747-e7b51192076d?q=80&w=1169&auto=format&fit=crop',
          alt: 'Temple Tours'
        },
        {
          image: 'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop',
          alt: 'Cultural Experience'
        }
      ]
    },
    {
      name: 'Emma Thompson',
      location: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The Annapurna circuit was the adventure of a lifetime. Every day brought new stunning landscapes and wonderful people. Take Me To Nepal made sure every detail was perfect.',
      imageCards: [
        {
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
          alt: 'Annapurna Circuit'
        },
        {
          image: 'https://images.unsplash.com/photo-1495554698253-681539e9ea84?q=80&w=1170&auto=format&fit=crop',
          alt: 'Mountain Landscapes'
        }
      ]
    },
    {
      name: 'James Mitchell',
      location: 'Australia',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'From the moment we landed to our departure, everything was perfectly organized. The wildlife safari in Chitwan was unforgettable, and our guide\'s passion for Nepal was infectious.',
      imageCards: [
        {
          image: 'https://images.unsplash.com/photo-1710077539513-6d0b9cf273e2?q=80&w=1074&auto=format&fit=crop',
          alt: 'Wildlife Safari'
        },
        {
          image: 'https://images.unsplash.com/photo-1566133852095-11fabe8b2735?q=80&w=1170&auto=format&fit=crop',
          alt: 'Chitwan National Park'
        }
      ]
    },
    {
      name: 'Lisa Chen',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The helicopter tour of the Himalayas was absolutely spectacular. Seeing Mount Everest up close was a dream come true. The team\'s attention to safety and comfort was impressive.',
      imageCards: [
        {
          image: 'https://images.unsplash.com/photo-1495554698253-681539e9ea84?q=80&w=1170&auto=format&fit=crop',
          alt: 'Helicopter Tour'
        },
        {
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
          alt: 'Mount Everest View'
        }
      ]
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

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(/lovable-uploads/bg_map.png)'
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bebas uppercase font-extrabold text-tmtn-blue mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real people who've discovered the magic of Nepal with us
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Polaroid Images */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-96 h-96">
                <AnimatePresence mode="wait">
                  {testimonials[currentIndex].imageCards.map((card, index) => (
                    <motion.div
                      key={`${currentIndex}-${index}`}
                      className={`absolute bg-white shadow-xl ${
                        index === 0 
                          ? 'rotate-12 top-0 left-4 z-20 w-72 h-80' 
                          : '-rotate-6 top-12 left-0 z-10 w-72 h-80'
                      }`}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        rotate: index === 0 ? 12 : -6,
                        y: 20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: index === 0 ? 12 : -6,
                        y: 0
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8,
                        y: -20
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        zIndex: 30,
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="p-4">
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-52 object-cover rounded-sm"
                        />
                        <div className="h-16 bg-white flex items-center justify-center">
                          <p className="text-sm text-gray-600 font-medium text-center">
                            {card.alt}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Testimonial Content */}
            <div 
              ref={carouselRef} 
              className="relative"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    x: 50
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -50
                  }}
                  transition={{
                    duration: 0.5
                  }}
                  className="testimonial-content"
                >
                  {/* Author Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-lg text-gray-600 font-medium">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>

                  {/* Quote and Text */}
                  <div className="mb-8">
                    <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed font-medium mb-6">
                      {testimonials[currentIndex].text}
                    </p>
                    
                    {/* Green accent line */}
                    <div className="w-16 h-1 bg-green-500 mb-8"></div>
                  </div>

                  {/* Rating and Author Info Row */}
                  <div className="flex items-center justify-between">
                    {/* Traveler Image Indicators */}
                    <div className="flex items-center space-x-4">
                      {testimonials.map((testimonial, index) => (
                        <motion.button
                          key={index}
                          className={`relative ${
                            index === currentIndex 
                              ? 'ring-4 ring-tmtn-red ring-opacity-80 shadow-lg' 
                              : 'hover:ring-2 hover:ring-gray-300'
                          } rounded-full transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentIndex(index)}
                        >
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className={`w-14 h-14 rounded-full object-cover transition-all duration-300 ${
                              index === currentIndex 
                                ? 'brightness-110 contrast-110' 
                                : 'brightness-90 hover:brightness-100'
                            }`}
                          />
                          {index === currentIndex && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -inset-1 rounded-full bg-tmtn-red opacity-20"
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Large Quote Icon */}
                    <div className="text-8xl text-green-500 font-bold leading-none">
                      "
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
