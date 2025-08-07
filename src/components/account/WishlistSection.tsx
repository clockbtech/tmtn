
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Heart, MapPin, Star, Clock, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WishlistSection = () => {
  const wishlistItems = [
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      location: 'Nepal',
      rating: 4.8,
      reviews: 234,
      price: 2499,
      duration: '14 days',
      difficulty: 'Extreme',
      image: '/placeholder-experience.jpg'
    },
    {
      id: 2,
      title: 'Annapurna Circuit',
      location: 'Nepal',
      rating: 4.7,
      reviews: 187,
      price: 1899,
      duration: '16 days',
      difficulty: 'Moderate',
      image: '/placeholder-experience.jpg'
    }
  ];

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

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-500">{wishlistItems.length} saved experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <Link to={`/experiences/${item.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className={`absolute top-4 right-4 ${getDifficultyColor(item.difficulty)} backdrop-blur-sm rounded-full px-3 py-1`}>
                    <span className="text-sm font-semibold text-white">
                      {item.difficulty}
                    </span>
                  </div>
                  <button className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({item.reviews} Review{item.reviews !== 1 ? 's' : ''})
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>12 Person</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">From </span>
                      <span className="text-xl font-bold text-green-600">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {formatPrice(Math.round(item.price * 1.2))}
                      </span>
                    </div>
                    <Button size="sm" className="bg-tmtn-blue hover:bg-tmtn-blue/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { WishlistSection };
