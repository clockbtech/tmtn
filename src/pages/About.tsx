import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrendingExperiences from '../components/TrendingExperiences';
import Testimonials from '../components/Testimonials';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        {/* About Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:pr-8"
              >
                {/* Decorative line */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-nepal-primary to-nepal-secondary rounded-full mr-4"></div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-nepal-dark mb-6 leading-tight">
                  Some Incredible Facts
                  <br />
                  <span className="text-nepal-primary">About Our Company</span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  The 3 hour beginner group lesson starts in our classroom located in the centre. 
                  We chose to have a maximum ratio of 6 students to 1 instructor, this means 
                  we're able to offer you plenty of personalised tips. Our theory session starts in 
                  our Surf Shed. Here you'll learn the basics of surfing.
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">120</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Happy Clients</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">35+</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Awards Winning</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">75+</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Skilled Instructors</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/lovable-uploads/091d2c82-75c2-41de-baab-57d959b9cdb4.png"
                    alt="Adventure Sports"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/lovable-uploads/ddc3747c-a8f5-4c25-a089-0b698516a18a.png"
                  alt="Watch Video"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Watch Video</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending Experiences Section */}
        <TrendingExperiences />

        {/* Testimonials Section */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default About;