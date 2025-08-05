
import { motion } from 'framer-motion';
import React from 'react';
const AboutHero = () => {
  return (
    <section className="relative py-[150px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/5192552/pexels-photo-5192552.jpeg)'
      }}></div>
            
            {/* Semi-transparent gradient overlay using current blue color scheme */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80 z-10"></div>
            <div className="absolute inset-0 bg-black/20 z-20"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
              <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center text-white">
                <h1 className="text-5xl font-tm-sans mb-6 lg:text-6xl font-extrabold">
                   About Us
                </h1>
                <p className="text-xl max-w-4xl mx-auto lg:text-xl">
                 Discover Our Story and Journey in Nepal Adventure Tourism
                </p>
              </motion.div>
            </div>
          </section>
  );
};
export default AboutHero;
