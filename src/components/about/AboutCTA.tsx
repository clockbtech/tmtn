
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Plane } from 'lucide-react';
import { Button } from '../ui/button';

const AboutCTA = () => {
  return (
    <section className="pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-green-600 to-green-500 rounded-2xl px-8 py-4 lg:py-6 lg:px-12 overflow-hidden"
        >
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
                variant="gradient-orange"
                size="lg"
                className="font-semibold px-8 py-4 text-lg rounded-full shadow-xl"
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
