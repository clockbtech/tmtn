
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AboutVideoSectionProps {
  onVideoClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  ripples: Array<{ id: number; x: number; y: number }>;
}

const AboutVideoSection: React.FC<AboutVideoSectionProps> = ({ onVideoClick, ripples }) => {
  return (
    <section className="bg-gray-50">
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
          >
            <img
              src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
              alt="Watch Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300">
              
              {/* Continuous Ripple Effects - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Inner ripples */}
                {[0, 1, 2].map((index) => (
                  <div
                    key={`inner-${index}`}
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 border-2 border-white/40 rounded-full animate-ping"
                    style={{
                      animationDuration: '2.5s',
                      animationDelay: `${index * 0.8}s`,
                    }}
                  />
                ))}
                
                {/* Outer ripples */}
                {[0, 1].map((index) => (
                  <div
                    key={`outer-${index}`}
                    className="absolute w-32 h-32 sm:w-40 sm:h-40 border border-white/25 rounded-full animate-ping"
                    style={{
                      animationDuration: '3.5s',
                      animationDelay: `${index * 1.5}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Play Button */}
              <div 
                className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-hidden z-10"
                onClick={onVideoClick}
              >
                <div className="w-0 h-0 border-l-[14px] sm:border-l-[16px] border-l-white border-y-[10px] sm:border-y-[12px] border-y-transparent ml-1 relative z-10"></div>
                
                {/* Click Ripple Effects */}
                {ripples.map((ripple) => (
                <motion.div
                  key={ripple.id}
                  className="absolute rounded-full bg-white/30 pointer-events-none"
                  style={{
                    left: ripple.x - 50,
                    top: ripple.y - 50,
                    width: 100,
                    height: 100,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0.8,
                  }}
                  animate={{
                    scale: 3,  // Reduced from 4 to make it less aggressive
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1,  // Increased from 0.6 to make it slower
                    ease: [0.22, 1, 0.36, 1],  // Smoother easing function
                  }}
                  exit={{ opacity: 0 }}  // For clean removal if using AnimatePresence
                />
              ))}
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 mx-auto text-white text-center w-max">
              <h3 className="text-3xl font-bold">Discover Nepal in Motion</h3>
              <p className="text-lg mt-2 opacity-90">Let the sights and sounds of Nepal inspire your next trip</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutVideoSection;
