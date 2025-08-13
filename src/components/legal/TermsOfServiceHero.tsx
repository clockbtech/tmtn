
import { motion } from 'framer-motion';
import React from 'react';

const TermsOfServiceHero = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-[150px]" 
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1738566061710-5325658ebfe7?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center text-white"
        >
          <h1 className="text-5xl font-tm-sans uppercase mb-6 lg:text-6xl font-extrabold">
            Terms of Service
          </h1>
          <p className="text-xl max-w-4xl mx-auto lg:text-xl">
            Please read these terms carefully before using our services.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfServiceHero;
