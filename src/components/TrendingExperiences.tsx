
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const TrendingExperiences = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);

  const experiences = [
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '14-day adventure to the base of Mount Everest',
      rating: 4.9,
      reviews: 234,
      basePrice: 1299,
      duration: '14 days'
    },
    {
      id: 2,
      title: 'Annapurna Helicopter Tour',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Aerial views of the Annapurna range',
      rating: 4.8,
      reviews: 187,
      basePrice: 899,
      duration: '4 hours'
    },
    {
      id: 3,
      title: 'Cultural Heritage Tour',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Explore ancient temples and traditions',
      rating: 4.7,
      reviews: 156,
      basePrice: 299,
      duration: '3 days'
    },
    {
      id: 4,
      title: 'Pokhara Lake Adventure',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Kayaking and paragliding in Pokhara',
      rating: 4.6,
      reviews: 203,
      basePrice: 199,
      duration: '2 days'
    },
    {
      id: 5,
      title: 'Wildlife Safari',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Chitwan National Park expedition',
      rating: 4.5,
      reviews: 128,
      basePrice: 399,
      duration: '3 days'
    },
    {
      id: 6,
      title: 'Langtang Valley Trek',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Trek through pristine mountain valleys',
      rating: 4.8,
      reviews: 165,
      basePrice: 799,
      duration: '8 days'
    },
    {
      id: 7,
      title: 'Meditation Retreat',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Spiritual journey in monastery settings',
      rating: 4.9,
      reviews: 89,
      basePrice: 499,
      duration: '5 days'
    },
    {
      id: 8,
      title: 'Mountain Biking Adventure',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Thrilling rides through mountain trails',
      rating: 4.4,
      reviews: 142,
      basePrice: 349,
      duration: '4 days'
    },
    {
      id: 9,
      title: 'Photography Workshop',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Capture stunning Himalayan landscapes',
      rating: 4.7,
      reviews: 76,
      basePrice: 599,
      duration: '6 days'
    },
    {
      id: 10,
      title: 'Cooking Experience',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Learn traditional Nepali cuisine',
      rating: 4.6,
      reviews: 95,
      basePrice: 99,
      duration: '1 day'
    }
  ];

  // Simulate currency detection
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // In a real implementation, you would use ipapi.co or similar service
        // For demo purposes, we'll simulate different currencies
        const currencies = ['USD', 'EUR', 'GBP', 'AUD'];
        const rates = { USD: 1, EUR: 0.85, GBP: 0.73, AUD: 1.35 };
        
        const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];
        setCurrency(randomCurrency);
        setExchangeRate(rates[randomCurrency as keyof typeof rates]);
      } catch (error) {
        console.log('Currency detection failed, using USD');
      }
    };

    detectCurrency();
  }, []);

  const formatPrice = (price: number) => {
    const convertedPrice = Math.round(price * exchangeRate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', AUD: 'A$' };
    return `${symbols[currency as keyof typeof symbols]}${convertedPrice}`;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-white" id="experiences">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bebas uppercase font-bold text-nepal-primary mb-4">
            Trending Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked adventures that showcase the very best of Nepal's natural beauty and culture
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className="p-3 bg-nepal-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className="p-3 bg-nepal-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="text-sm text-gray-500">
              Prices in {currency}
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-nepal-primary">
                      {experience.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bebas uppercase font-semibold text-nepal-primary mb-2">
                    {experience.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {experience.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {experience.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({experience.reviews})
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-nepal-orange">
                        {formatPrice(experience.basePrice)}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors duration-200"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingExperiences;
