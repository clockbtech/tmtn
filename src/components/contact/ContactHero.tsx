import React from 'react';
const ContactHero = () => {
  return <div className="relative py-[150px] bg-cover bg-center flex items-center justify-center" style={{
    backgroundImage: `linear-gradient(135deg, rgba(18, 104, 148, 0.8) 0%, rgba(255, 125, 51, 0.6) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=800&fit=crop')`,
    backgroundColor: '#19202f'
  }}>
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-tm-sans uppercase mb-4 font-extrabold">
          Contact Us
        </h1>
        <p className="text-xl md:text-2xl font-poppins max-w-2xl mx-auto">
          Get in Touch - We're Here to Help Plan Your Perfect Nepal Adventure
        </p>
      </div>
    </div>;
};
export default ContactHero;