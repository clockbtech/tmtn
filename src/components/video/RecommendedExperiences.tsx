
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Experience {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  basePrice: number;
  duration: string;
  difficulty: string;
}

interface RecommendedExperiencesProps {
  currentVideoId: string;
}

const RecommendedExperiences: React.FC<RecommendedExperiencesProps> = ({ currentVideoId }) => {
  // Sample experiences data - in real app, this would come from an API
  const experiences: Experience[] = [
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      image: 'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '14-day adventure to the base of Mount Everest',
      rating: 4.9,
      reviews: 234,
      basePrice: 1299,
      duration: '14 days',
      difficulty: 'Extreme'
    },
    {
      id: 2,
      title: 'Annapurna Helicopter Tour',
      image: 'https://images.unsplash.com/photo-1495554698253-681539e9ea84?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Aerial views of the Annapurna range',
      rating: 4.8,
      reviews: 187,
      basePrice: 899,
      duration: '4 hours',
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Cultural Heritage Tour',
      image: 'https://images.unsplash.com/photo-1728145993747-e7b51192076d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx4fA%3D%3D',
      description: 'Explore ancient temples and traditions',
      rating: 4.7,
      reviews: 156,
      basePrice: 299,
      duration: '3 days',
      difficulty: 'Easy'
    },
    {
      id: 4,
      title: 'Pokhara Lake Adventure',
      image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Kayaking and paragliding in Pokhara',
      rating: 4.6,
      reviews: 203,
      basePrice: 199,
      duration: '2 days',
      difficulty: 'Moderate'
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
    <div className="h-full overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Recommended Experiences</h3>
        <p className="text-gray-300">Discover more adventures in Nepal</p>
      </div>
      
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Link
            key={experience.id}
            to={`/experiences/${experience.id}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative overflow-hidden h-32">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-2 right-2 ${getDifficultyColor(experience.difficulty)} backdrop-blur-sm rounded-full px-2 py-1`}>
                  <span className="text-xs font-semibold text-white">
                    {experience.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center text-gray-500 text-xs mb-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Nepal</span>
                </div>

                <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
                  {experience.title}
                </h4>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(experience.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">
                    ({experience.reviews})
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-xs mb-3 space-x-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>12 Person</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From </span>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(experience.basePrice)}
                    </span>
                  </div>
                  <div className="w-4 h-4 border-2 border-green-600 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedExperiences;
