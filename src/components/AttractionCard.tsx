
import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AttractionCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  rating?: number;
  duration?: string;
  price?: number;
  onClick?: () => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({
  name,
  description,
  image,
  location,
  rating,
  duration,
  price,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-nepal-primary mb-2 group-hover:text-nepal-orange transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
          {duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
          )}
        </div>

        {price && (
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-nepal-primary">
              ${price}
            </span>
            <button className="bg-nepal-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
              Explore
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AttractionCard;
