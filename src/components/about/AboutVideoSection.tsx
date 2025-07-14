
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
            className="relative overflow-visible cursor-pointer w-full h-[500px] lg:h-[600px]"
          >
            <img
              src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
              alt="Watch Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300">
              {/* Continuous Ripple Effects - Responsive sizing */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                {/* Main ripples - responsive sizing */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-white/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                    style={{
                      animation: `ping 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${index * 0.75}s`,
                    }}
                  />
                ))}
                
                {/* Outer ripples - responsive sizing */}
                {[0, 1].map((index) => (
                  <div
                    key={`outer-${index}`}
                    className="absolute border border-white/15 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                    style={{
                      animation: `ping 4s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${index * 2}s`,
                    }}
                  />
                ))}
                
                {/* Additional large ripples for bigger screens */}
                <div className="hidden lg:block">
                  {[0, 1].map((index) => (
                    <div
                      key={`large-${index}`}
                      className="absolute border border-white/10 rounded-full w-40 h-40"
                      style={{
                        animation: `ping 5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                        animationDelay: `${index * 2.5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Play Button - Responsive sizing */}
              <div 
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-visible z-10"
                onClick={onVideoClick}
              >
                <div className="w-0 h-0 border-l-[12px] sm:border-l-[14px] md:border-l-[16px] border-l-white border-y-[8px] sm:border-y-[10px] md:border-y-[12px] border-y-transparent ml-1 relative z-10"></div>
                
                {/* Click Ripple Effects - Responsive sizing */}
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{
                      width: '20px',
                      height: '20px',
                      scale: 0,
                      opacity: 0.6,
                    }}
                    animate={{
                      width: ['20px', '60px', '120px'],
                      height: ['20px', '60px', '120px'],
                      scale: [0, 1, 2.5],
                      opacity: [0.6, 0.3, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      times: [0, 0.4, 1],
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 mx-auto text-white text-center w-max px-4">
              <h3 className="text-2xl sm:text-3xl font-bold">Watch Our Story</h3>
              <p className="text-base sm:text-lg mt-2 opacity-90">Discover Our Journey</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutVideoSection;
