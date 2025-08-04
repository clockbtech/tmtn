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
  category: string;
}

interface RecommendedExperiencesProps {
  currentVideoId: string;
}

const RecommendedExperiences: React.FC<RecommendedExperiencesProps> = ({ currentVideoId }) => {
  // All experiences data organized by category
  const allExperiences: Experience[] = [
    // Mountain/Trekking experiences
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      image: 'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '14-day adventure to the base of Mount Everest',
      rating: 4.9,
      reviews: 234,
      basePrice: 1299,
      duration: '14 days',
      difficulty: 'Extreme',
      category: 'mountain'
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
      difficulty: 'Easy',
      category: 'mountain'
    },
    {
      id: 3,
      title: 'Manaslu Circuit Trek',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Off-the-beaten-path mountain adventure',
      rating: 4.7,
      reviews: 156,
      basePrice: 1199,
      duration: '12 days',
      difficulty: 'Extreme',
      category: 'mountain'
    },
    {
      id: 4,
      title: 'Gokyo Lakes Trek',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Beautiful alpine lakes and mountain views',
      rating: 4.6,
      reviews: 203,
      basePrice: 999,
      duration: '10 days',
      difficulty: 'Moderate',
      category: 'mountain'
    },
    // Cultural experiences
    {
      id: 5,
      title: 'Cultural Heritage Tour',
      image: 'https://images.unsplash.com/photo-1728145993747-e7b51192076d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Explore ancient temples and traditions',
      rating: 4.7,
      reviews: 156,
      basePrice: 299,
      duration: '3 days',
      difficulty: 'Easy',
      category: 'cultural'
    },
    {
      id: 6,
      title: 'Newari Cooking Class',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Learn traditional Nepali cuisine',
      rating: 4.8,
      reviews: 89,
      basePrice: 79,
      duration: '4 hours',
      difficulty: 'Easy',
      category: 'cultural'
    },
    {
      id: 7,
      title: 'Buddhist Monastery Stay',
      image: 'https://images.unsplash.com/photo-1728145993747-e7b51192076d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Spiritual retreat in mountain monastery',
      rating: 4.9,
      reviews: 67,
      basePrice: 199,
      duration: '2 days',
      difficulty: 'Easy',
      category: 'cultural'
    },
    {
      id: 8,
      title: 'Traditional Dance Workshop',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Learn authentic Nepali folk dances',
      rating: 4.6,
      reviews: 123,
      basePrice: 89,
      duration: '3 hours',
      difficulty: 'Easy',
      category: 'cultural'
    },
    // Wildlife experiences
    {
      id: 9,
      title: 'Red Panda Safari',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Spot endangered red pandas in their habitat',
      rating: 4.8,
      reviews: 145,
      basePrice: 399,
      duration: '2 days',
      difficulty: 'Easy',
      category: 'wildlife'
    },
    {
      id: 10,
      title: 'Chitwan National Park',
      image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Jungle safari and wildlife photography',
      rating: 4.7,
      reviews: 234,
      basePrice: 499,
      duration: '3 days',
      difficulty: 'Easy',
      category: 'wildlife'
    },
    {
      id: 11,
      title: 'Bird Watching Tour',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Discover Nepal\'s diverse bird species',
      rating: 4.5,
      reviews: 78,
      basePrice: 199,
      duration: '1 day',
      difficulty: 'Easy',
      category: 'wildlife'
    },
    {
      id: 12,
      title: 'Bardia National Park',
      image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Remote wilderness and tiger tracking',
      rating: 4.6,
      reviews: 92,
      basePrice: 599,
      duration: '4 days',
      difficulty: 'Moderate',
      category: 'wildlife'
    },
    // Adventure experiences
    {
      id: 13,
      title: 'Pokhara Lake Adventure',
      image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Kayaking and paragliding in Pokhara',
      rating: 4.6,
      reviews: 203,
      basePrice: 199,
      duration: '2 days',
      difficulty: 'Moderate',
      category: 'adventure'
    },
    {
      id: 14,
      title: 'White Water Rafting',
      image: 'https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Thrilling rapids on Nepal\'s rivers',
      rating: 4.7,
      reviews: 167,
      basePrice: 149,
      duration: '1 day',
      difficulty: 'Moderate',
      category: 'adventure'
    }
  ];

  // Map video IDs to categories
  const getVideoCategory = (videoId: string): string => {
    switch (videoId) {
      case '1': // Mount Everest
      case '3': // Himalayan Mountain Range View
      case '5': // Annapurna Circuit Mountain Trail
        return 'mountain';
      case '2': // Traditional Nepali Cultural Dance
      case '6': // Nepali Buddhist Prayer Flags
        return 'cultural';
      case '4': // Nepal Wildlife - Red Panda
        return 'wildlife';
      default:
        return 'adventure';
    }
  };

  const getRecommendedExperiences = (): Experience[] => {
    const category = getVideoCategory(currentVideoId);
    const categoryExperiences = allExperiences.filter(exp => exp.category === category);
    
    // If we have enough experiences in the category, return them
    if (categoryExperiences.length >= 6) {
      return categoryExperiences.slice(0, 6);
    }
    
    // Otherwise, fill with other experiences
    const otherExperiences = allExperiences.filter(exp => exp.category !== category);
    return [...categoryExperiences, ...otherExperiences].slice(0, 6);
  };

  const experiences = getRecommendedExperiences();

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
    <div className="h-full max-h-[90vh] overflow-y-auto">
      <div className="mb-6 lg:mb-8">
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Recommended Experiences</h3>
        <p className="text-sm lg:text-base text-gray-300">Discover more adventures in Nepal</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 pb-4">
        {experiences.map((experience, index) => (
          <Link
            key={experience.id}
            to={`/experiences/${experience.id}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full sm:w-80 lg:w-[22rem] mx-auto"
            >
              <div className="relative overflow-hidden h-36 lg:h-40">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-2 right-2 ${getDifficultyColor(experience.difficulty)} backdrop-blur-sm rounded-full px-3 py-1`}>
                  <span className="text-xs font-semibold text-white">
                    {experience.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-4 lg:p-5">
                <div className="flex items-center text-gray-500 text-xs mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Nepal</span>
                </div>

                <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {experience.title}
                </h4>

                <div className="flex items-center mb-3">
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

                <div className="flex items-center text-gray-600 text-xs mb-4 space-x-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>12 Max</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From </span>
                    <span className="text-base lg:text-lg font-bold text-green-600">
                      {formatPrice(experience.basePrice)}
                    </span>
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatPrice(Math.round(experience.basePrice * 1.2))}
                    </span>
                  </div>
                  <div className="w-5 h-5 border-2 border-green-600 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
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
