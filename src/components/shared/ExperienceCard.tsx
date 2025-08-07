
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Experience {
  id: number;
  title?: string;
  name?: string;
  location?: string;
  rating: number;
  reviews: number;
  price?: number;
  basePrice?: number;
  duration: string;
  difficulty: string;
  image: string;
}

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  formatPrice: (price: number) => string;
  showWishlistHeart?: boolean;
  onHeartClick?: (id: number) => void;
}

const ExperienceCard = ({ 
  experience, 
  index = 0, 
  formatPrice, 
  showWishlistHeart = false,
  onHeartClick 
}: ExperienceCardProps) => {
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

  const title = experience.title || experience.name || '';
  const price = experience.price || experience.basePrice || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Link to={`/experiences/${experience.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="relative overflow-hidden">
            <img 
              src={experience.image} 
              alt={title} 
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className={`absolute top-4 right-4 ${getDifficultyColor(experience.difficulty)} backdrop-blur-sm rounded-full px-3 py-1`}>
              <span className="text-sm font-semibold text-white">
                {experience.difficulty}
              </span>
            </div>
            {showWishlistHeart && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onHeartClick?.(experience.id);
                }}
                className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </button>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-4">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{experience.location || 'Nepal'}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
              {title}
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
                <span className="text-xl font-bold text-green-600">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(Math.round(price * 1.2))}
                </span>
              </div>
              {!showWishlistHeart ? (
                <button className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200">
                  <Heart className="w-4 h-4" />
                </button>
              ) : (
                <button className="bg-tmtn-blue hover:bg-tmtn-blue/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExperienceCard;
