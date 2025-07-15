
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
              {/* Continuous Ripple Effects - Outside the button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="absolute w-24 h-24 border-2 border-white/30 rounded-full"
                    style={{
                      animation: `ping 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${index * 0.75}s`,
                    }}
                  />
                ))}
                
                {/* Additional larger outer ripples */}
                {[0, 1].map((index) => (
                  <div
                    key={`outer-${index}`}
                    className="absolute w-32 h-32 border border-white/15 rounded-full"
                    style={{
                      animation: `ping 4s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${index * 2}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Play Button */}
              <div 
                className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-hidden z-10"
                onClick={onVideoClick}
              >
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1 relative z-10"></div>
                
                {/* Click Ripple Effects */}
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
