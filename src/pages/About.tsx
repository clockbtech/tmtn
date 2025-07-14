
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutCTA from '../components/about/AboutCTA';
import TrendingExperiences from '../components/TrendingExperiences';
import Testimonials from '../components/Testimonials';
import FullscreenModal from '../components/video/FullscreenModal';

const About = () => {
  const [fullscreenVideo, setFullscreenVideo] = useState<{ url: string; title: string } | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

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

  const handlePlayButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    openFullscreen();
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
                {/* <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-nepal-primary to-nepal-secondary rounded-full mr-4"></div>
                </div> */}
                
                <h1 className="text-4xl uppercase lg:text-5xl xl:text-6xl font-bold text-nepal-dark mb-6 leading-tight">
                  Our journey began with a 
                  <span className="text-nepal-primary">passion</span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  we believe in the transformative power of travel. 
                  Our journey began with a passion for exploration and a vision to share the wonders of the world with fellow adventurers.
                  Established in 2017, we’ve since dedicated ourselves to curating exceptional travel experiences that go beyond the ordinary..
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">10,000+</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Happy Travellers</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">500+</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Tours Completed</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">15+</div>
                    <div className="text-sm lg:text-base font-semibold text-nepal-dark">Years Experience</div>
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
                    src="https://themegavias.com/wp/travivu/wp-content/uploads/2024/12/image-19.png"
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
        <section className=" bg-gray-50">
          <div className="w-full px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div 
                className="relative overflow-hidden cursor-pointer w-full h-[500px] lg:h-[600px]"
                onClick={openFullscreen}
              >
                <img
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                  alt="Watch Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300">
                  <div 
                    className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-hidden"
                    onClick={handlePlayButtonClick}
                  >
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1 relative z-10"></div>
                    
                    {/* Ripple Effects */}
                    {ripples.map((ripple) => (
                      <motion.div
                        key={ripple.id}
                        className="absolute rounded-full bg-white/30"
                        style={{
                          left: ripple.x - 50,
                          top: ripple.y - 50,
                          width: 100,
                          height: 100,
                        }}
                        initial={{
                          scale: 0,
                          opacity: 0.6,
                        }}
                        animate={{
                          scale: 4,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
           <div className="absolute bottom-8 left-0 right-0 mx-auto text-white text-center w-max">

                  <h3 className="text-3xl font-bold">Watch Our Story</h3>
                  <p className="text-lg mt-2 opacity-90">Discover Our Journey</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending Experiences Section */}
        <TrendingExperiences />

        {/* CTA Section */}
        <AboutCTA />

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
