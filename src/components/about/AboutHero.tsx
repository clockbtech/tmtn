import React from 'react';

const AboutHero = () => {
  return (
    <div 
      className="relative h-80 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(18, 104, 148, 0.8) 0%, rgba(255, 125, 51, 0.6) 100%), url('/lovable-uploads/091d2c82-75c2-41de-baab-57d959b9cdb4.png')`
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-tm-sans uppercase mb-4 font-extrabold">
          About Us
        </h1>
        <p className="text-xl md:text-2xl font-poppins max-w-2xl mx-auto">
          Discover Our Story and Journey in Nepal Adventure Tourism
        </p>
      </div>
    </div>
  );
};

export default AboutHero;