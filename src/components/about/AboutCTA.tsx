
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Plane } from 'lucide-react';
import { Button } from '../ui/button';

const AboutCTA = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-green-600 to-green-500 rounded-2xl px-8 py-4 lg:py-6 lg:px-12 overflow-hidden"
        >
          {/* Background decorative elements */}
          {/* <div className="absolute top-4 right-4 opacity-20">
            <motion.div
              animate={{
                rotate: [0, 360],
                x: [0, 20, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Plane className="w-12 h-12 text-white" />
            </motion.div>
          </div> */}
          
          {/* Dotted path decoration */}
          {/* <div className="absolute top-8 right-16 hidden lg:block">
            <svg width="100" height="60" viewBox="0 0 100 60" className="opacity-30">
              <path d="M10 50 Q30 10 50 30 T90 20" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4,4" />
            </svg>
          </div> */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left content */}
            <div className="flex items-center gap-6 flex-1">
              {/* Mountain Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Text content */}
              <div className="text-center lg:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3"
                >
                  Ready to Escape and Explore?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/90 text-lg"
                >
                  Experience the breathtaking beauty of Nepal with our expertly crafted adventures
                </motion.p>
              </div>
            </div>

            {/* Center Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-shrink-0"
            >
              <motion.img
                src="/lovable-uploads/b8be241b-a5f1-405b-850a-283612b2441f.png"
                alt="Adventure Illustration"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Right CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full"
              >
                LET'S GET STARTED
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
