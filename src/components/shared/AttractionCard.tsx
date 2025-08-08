
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
}

interface AttractionCardProps {
  attraction: Attraction;
  index?: number;
  formatPrice: (price: number) => string;
}

const AttractionCard = ({ attraction, index = 0, formatPrice }: AttractionCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <Link to={`/attractions/${attraction.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="relative overflow-hidden">
            <img 
              src={attraction.image} 
              alt={attraction.name} 
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-green-600">
                {attraction.type}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{attraction.location}</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {attraction.name}
            </h3>

            <p className="text-gray-600 mb-3 line-clamp-2">
              {attraction.description}
            </p>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(attraction.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                ({attraction.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{attraction.duration}</span>
              </div>
              <div>
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(attraction.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AttractionCard;
