
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/TranslationContext';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experiences = () => {
  const { t, formatPrice } = useTranslation();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const experiences = [
    {
      id: 1,
      name: 'Everest Base Camp Trek',
      description: 'The ultimate Himalayan adventure to the base of the world\'s highest peak',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '14 days',
      groupSize: '8-12 people',
      difficulty: 'Extreme',
      price: 1299,
      location: 'Khumbu Region'
    },
    {
      id: 2,
      name: 'Annapurna Circuit Trek',
      description: 'Classic trek through diverse landscapes and traditional villages',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '16 days',
      groupSize: '6-10 people',
      difficulty: 'Moderate',
      price: 899,
      location: 'Annapurna Region'
    },
    {
      id: 3,
      name: 'Chitwan Safari Experience',
      description: 'Wildlife adventure in Nepal\'s premier national park',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3 days',
      groupSize: '4-8 people',
      difficulty: 'Easy',
      price: 299,
      location: 'Chitwan National Park'
    },
    {
      id: 4,
      name: 'Kathmandu Cultural Tour',
      description: 'Explore ancient temples and UNESCO World Heritage sites',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '5 days',
      groupSize: '2-15 people',
      difficulty: 'Easy',
      price: 399,
      location: 'Kathmandu Valley'
    },
    {
      id: 5,
      name: 'Pokhara Adventure Package',
      description: 'Paragliding, boating, and mountain views in Nepal\'s adventure capital',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '4 days',
      groupSize: '2-6 people',
      difficulty: 'Moderate',
      price: 499,
      location: 'Pokhara'
    },
    {
      id: 6,
      name: 'Langtang Valley Trek',
      description: 'Trek through the beautiful valley of glaciers and friendly locals',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '9 days',
      groupSize: '6-10 people',
      difficulty: 'Moderate',
      price: 699,
      location: 'Langtang Region'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Extreme': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-7xl font-bebas uppercase font-bold mb-6">
              {t('nav.experiences')}
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto">
              Unforgettable adventures and cultural experiences in the heart of the Himalayas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                      {experience.difficulty}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-nepal-primary">
                        {formatPrice(experience.price)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bebas uppercase font-semibold text-nepal-primary mb-2">
                      {experience.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {experience.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{experience.groupSize}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-nepal-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Book Experience
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
