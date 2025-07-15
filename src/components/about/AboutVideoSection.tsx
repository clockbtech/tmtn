
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
              
              {/* Continuous Ripple Effects Container */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Inner ripples - smaller and more frequent */}
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={`inner-${index}`}
                    className="absolute w-20 h-20 border-2 border-white/50 rounded-full animate-ping"
                    style={{
                      animationDuration: '2s',
                      animationDelay: `${index * 0.4}s`,
                      animationIterationCount: 'infinite',
                    }}
                  />
                ))}
                
                {/* Middle ripples */}
                {[0, 1, 2].map((index) => (
                  <div
                    key={`middle-${index}`}
                    className="absolute w-32 h-32 border border-white/35 rounded-full animate-ping"
                    style={{
                      animationDuration: '3s',
                      animationDelay: `${index * 1}s`,
                      animationIterationCount: 'infinite',
                    }}
                  />
                ))}
                
                {/* Outer ripples - larger and slower */}
                {[0, 1].map((index) => (
                  <div
                    key={`outer-${index}`}
                    className="absolute w-48 h-48 border border-white/20 rounded-full animate-ping"
                    style={{
                      animationDuration: '4s',
                      animationDelay: `${index * 2}s`,
                      animationIterationCount: 'infinite',
                    }}
                  />
                ))}
              </div>
              
              {/* Play Button */}
              <div 
                className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-hidden z-10 border-2 border-white/30"
                onClick={onVideoClick}
              >
                <div className="w-0 h-0 border-l-[14px] sm:border-l-[16px] border-l-white border-y-[10px] sm:border-y-[12px] border-y-transparent ml-1 relative z-10"></div>
                
                {/* Click Ripple Effects */}
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    className="absolute rounded-full bg-white/40"
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
                      scale: 3,
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
