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

  // Prayer Flag Dots Animation
  const PrayerFlagDots = () => (
    <div className="absolute top-4 right-4 hidden lg:flex space-x-1 opacity-[0.08]">
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-tmtn-red"
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
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(/lovable-uploads/bg_map.png)'
      }}>
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-white/85"></div> */}
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
          <h2 className="text-4xl lg:text-4xl font-bebas uppercase font-extrabold text-tmtn-blue mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real people who've discovered the magic of Nepal with us
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Two Stacked Image Cards */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Two polaroid-style image cards stack */}
                <div className="relative w-80 h-96">
                  <AnimatePresence mode="wait">
                    {testimonials[currentIndex].imageCards.map((card, index) => (
                      <motion.div
                        key={`${currentIndex}-${index}`}
                        className={`absolute bg-white p-3 shadow-lg ${
                          index === 0 ? 'rotate-12 top-0 left-0 z-30' : '-rotate-6 top-8 left-8 z-20'
                        }`}
                        initial={{ opacity: 0, scale: 0.8, rotate: index === 0 ? 12 : -6 }}
                        animate={{ opacity: 1, scale: 1, rotate: index === 0 ? 12 : -6 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.1
                        }}
                        whileHover={{ scale: 1.05, zIndex: 40 }}
                      >
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-64 h-48 object-cover"
                        />
                        <div className="h-12 bg-white"></div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial Card */}
            <div 
              ref={carouselRef} 
              className="relative" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Prayer Flag Dots */}
              <PrayerFlagDots />

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
                  className="testimonial-content bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50 relative overflow-hidden"
                >
                  {/* Subtle Pattern Overlay on Card */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="card-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3" />
                          <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2" />
                          <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#card-pattern)" className="text-tmtn-blue" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-center gap-8 relative z-10">
                    {/* Quote Icon */}
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="w-16 h-16 bg-tmtn-red rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Quote className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center">
                      {/* Stars */}
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              scale: 0
                            }}
                            animate={{
                              scale: 1
                            }}
                            transition={{
                              delay: i * 0.1
                            }}
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
                      <div className="flex items-center justify-center gap-4">
                        <motion.img
                          whileHover={{
                            scale: 1.1
                          }}
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-tmtn-red/20"
                        />
                        <div>
                          <div className="font-semibold text-tmtn-blue">
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
                    whileHover={{
                      scale: 1.2
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-tmtn-red scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
