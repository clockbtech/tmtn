import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import TrendingExperiences from '../components/TrendingExperiences';
import Testimonials from '../components/Testimonials';
import FullscreenModal from '../components/video/FullscreenModal';

const About = () => {
  const [fullscreenVideo, setFullscreenVideo] = useState<{ url: string; title: string } | null>(null);

  const openFullscreen = () => {
    const videoData = {
      url: "/Videos/Video1.mp4", // Using actual video file
      title: "Watch Our Story"
    };
    setFullscreenVideo(videoData);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <AboutHero />
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
          <div className="w-full px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div 
                className="relative overflow-hidden cursor-pointer w-full h-[400px] lg:h-[500px]"
                onClick={openFullscreen}
              >
                <img
                  src="/lovable-uploads/ddc3747c-a8f5-4c25-a089-0b698516a18a.png"
                  alt="Watch Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold">Watch Our Story</h3>
                  <p className="text-lg mt-2 opacity-90">Discover Our Journey</p>
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

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <FullscreenModal
            video={{
              id: 'about-video',
              title: fullscreenVideo.title,
              url: fullscreenVideo.url,
              thumbnail: fullscreenVideo.url
            }}
            currentIndex={0}
            totalVideos={1}
            onClose={closeFullscreen}
            onNavigate={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;