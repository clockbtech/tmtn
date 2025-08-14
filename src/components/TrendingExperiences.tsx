import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Star, ArrowLeft, ArrowRight, MapPin, Clock, Users, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TrendingExperiences = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const navigate = useNavigate();

  const experiences = [{
    id: 1,
    title: 'Everest Base Camp Trek',
    image: 'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '14-day adventure to the base of Mount Everest',
    rating: 4.9,
    reviews: 234,
    basePrice: 1299,
    duration: '14 days',
    difficulty: 'Extreme'
  }, {
    id: 2,
    title: 'Annapurna Helicopter Tour',
    image: 'https://images.unsplash.com/photo-1495554698253-681539e9ea84?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Aerial views of the Annapurna range',
    rating: 4.8,
    reviews: 187,
    basePrice: 899,
    duration: '4 hours',
    difficulty: 'Easy'
  }, {
    id: 3,
    title: 'Cultural Heritage Tour',
    image: 'https://images.unsplash.com/photo-1728145993747-e7b51192076d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx4fA%3D%3D',
    description: 'Explore ancient temples and traditions',
    rating: 4.7,
    reviews: 156,
    basePrice: 299,
    duration: '3 days',
    difficulty: 'Easy'
  }, {
    id: 4,
    title: 'Pokhara Lake Adventure',
    image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Kayaking and paragliding in Pokhara',
    rating: 4.6,
    reviews: 203,
    basePrice: 199,
    duration: '2 days',
    difficulty: 'Moderate'
  }, {
    id: 5,
    title: 'Wildlife Safari',
    image: 'https://images.unsplash.com/photo-1710077539513-6d0b9cf273e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx4fA%3D%3D',
    description: 'Chitwan National Park expedition',
    rating: 4.5,
    reviews: 128,
    basePrice: 399,
    duration: '3 days',
    difficulty: 'Easy'
  }, {
    id: 6,
    title: 'Langtang Valley Trek',
    image: 'https://images.unsplash.com/photo-1701012563262-5c0cfb7d1f1d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D',
    description: 'Trek through pristine mountain valleys',
    rating: 4.8,
    reviews: 165,
    basePrice: 799,
    duration: '8 days',
    difficulty: 'Moderate'
  }, {
    id: 7,
    title: 'Meditation Retreat',
    image: 'https://images.unsplash.com/photo-1582053403072-ca114ba69a42?q=80&w=1305&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D',
    description: 'Spiritual journey in monastery settings',
    rating: 4.9,
    reviews: 89,
    basePrice: 499,
    duration: '5 days',
    difficulty: 'Easy'
  }, {
    id: 8,
    title: 'Mountain Biking Adventure',
    image: 'https://images.unsplash.com/photo-1629056125090-215baa911b9a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Thrilling rides through mountain trails',
    rating: 4.4,
    reviews: 142,
    basePrice: 349,
    duration: '4 days',
    difficulty: 'Moderate'
  }, {
    id: 9,
    title: 'Photography Workshop',
    image: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Capture stunning Himalayan landscapes',
    rating: 4.7,
    reviews: 76,
    basePrice: 599,
    duration: '6 days',
    difficulty: 'Easy'
  }, {
    id: 10,
    title: 'Cooking Experience',
    image: 'https://plus.unsplash.com/premium_photo-1724260602450-a4e66a03ae06?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx4fA%3D%3D',
    description: 'Learn traditional Nepali cuisine',
    rating: 4.6,
    reviews: 95,
    basePrice: 99,
    duration: '1 day',
    difficulty: 'Easy'
  }];

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // In a real implementation, you would use ipapi.co or similar service
        // For demo purposes, we'll simulate different currencies
        const currencies = ['USD', 'EUR', 'GBP', 'AUD'];
        const rates = {
          USD: 1,
          EUR: 0.85,
          GBP: 0.73,
          AUD: 1.35
        };
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
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      AUD: 'A$'
    };
    return `${symbols[currency as keyof typeof symbols]}${convertedPrice}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/90';
      case 'Moderate':
        return 'bg-yellow-500/90';
      case 'Extreme':
        return 'bg-red-500/90';
      default:
        return 'bg-gray-500/90';
    }
  };

  const handleBookNow = (experienceId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/experiences/${experienceId}/checkout`);
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
          <h2 className="text-4xl lg:text-4xl font-bebas uppercase font-extrabold text-tmtn-blue mb-4">
            Trending Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked adventures that showcase the very best of Nepal's natural beauty and culture
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-tmtn-blue text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 -ml-6"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-tmtn-blue text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 -mr-6"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {experiences.map((experience, index) => (
                <div key={experience.id} className="flex-shrink-0 w-80">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <Link to={`/experiences/${experience.id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={experience.image}
                          alt={experience.title}
                          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute top-4 right-4 ${getDifficultyColor(experience.difficulty)} backdrop-blur-sm rounded-full px-3 py-1`}>
                          <span className="text-sm font-semibold text-white">
                            {experience.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Nepal</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                          {experience.title}
                        </h3>

                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(experience.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            ({experience.reviews} Review{experience.reviews !== 1 ? 's' : ''})
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>12 Person</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-500">From </span>
                            <span className="text-lg font-bold text-green-600">
                              {formatPrice(experience.basePrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {formatPrice(Math.round(experience.basePrice * 1.2))}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => handleBookNow(experience.id, e)}
                            className="bg-tmtn-blue hover:bg-tmtn-blue/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingExperiences;
