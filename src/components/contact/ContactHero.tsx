import React from 'react';

const ContactHero = () => {
  return (
    <div 
      className="relative h-[150px] md:h-[250px] bg-cover bg-center flex items-center justify-center" 
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(18, 104, 148, 0.8) 0%, rgba(255, 125, 51, 0.6) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=800&fit=crop')`
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-tm-sans uppercase mb-2 md:mb-4 font-extrabold">
          Contact Us
        </h1>
        <p className="text-base md:text-xl font-poppins max-w-2xl mx-auto">
          Get in Touch - We're Here to Help Plan Your Perfect Nepal Adventure
        </p>
      </div>
    </div>
  );
};

export default ContactHero;