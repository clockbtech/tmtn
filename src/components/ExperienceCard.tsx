
import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: string;
  difficulty: string;
  price: number;
  includes: string[];
  rating?: number;
  groupSize?: string;
  onClick?: () => void;
  hidePrice?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  name,
  description,
  image,
  duration,
  difficulty,
  includes,
  rating,
  groupSize,
  onClick,
  hidePrice = false
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'challenging':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className={`text-sm font-semibold px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        {rating && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-nepal-primary mb-2 group-hover:text-nepal-orange transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">
          {description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
            {groupSize && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{groupSize}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-3">
            <div className="text-sm text-gray-600 mb-2">Includes:</div>
            <div className="flex flex-wrap gap-1 mb-4">
              {includes.slice(0, 3).map((item, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {item}
                </span>
              ))}
              {includes.length > 3 && (
                <span className="text-xs text-gray-500">+{includes.length - 3} more</span>
              )}
            </div>
          </div>

          <div className={`pt-2 border-t ${hidePrice ? 'flex justify-center' : 'flex items-center justify-between'}`}>
            <button className="bg-nepal-orange hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 w-full">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
