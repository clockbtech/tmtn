import React from 'react';
import { motion } from 'framer-motion';
const AboutStory = () => {
  return <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="lg:pr-8">
            <h1 className="text-4xl uppercase lg:text-5xl text-tmtn-blue mb-6 leading-tight font-extrabold xl:text-4xl">
              Our journey began with a passion 
              {/* <span className="text-tmtn-blue">passion</span> */}
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We believe in the transformative power of travel. 
              Our journey began with a passion for exploration and a vision to share the wonders of the world with fellow adventurers.
              Established in 2017, we've since dedicated ourselves to curating exceptional travel experiences that go beyond the ordinary..
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-center">
                <div className="text-4xl lg:text-4xl font-bold text-orange-500 mb-2">10,000+</div>
                <div className="text-sm lg:text-base font-semibold text-nepal-dark">Happy Travellers</div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="text-center">
                <div className="text-4xl lg:text-4xl font-bold text-orange-500 mb-2">500+</div>
                <div className="text-sm lg:text-base font-semibold text-nepal-dark">Tours Completed</div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.6
            }} className="text-center">
                <div className="text-4xl lg:text-4xl font-bold text-orange-500 mb-2">15+</div>
                <div className="text-sm lg:text-base font-semibold text-nepal-dark">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img src="https://themegavias.com/wp/travivu/wp-content/uploads/2024/12/image-19.png" alt="Adventure Sports" className="w-full h-[400px] lg:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default AboutStory;
