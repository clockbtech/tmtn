import React from 'react';
const BlogHero = () => {
  return <div style={{
    backgroundImage: `linear-gradient(135deg, rgba(18, 104, 148, 0.8) 0%, rgba(255, 125, 51, 0.6) 100%), url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=800&fit=crop')`
  }} className="relative h-150 bg-cover bg-center flex items-center justify-center py-[150px]">
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-plus-jakarta font-bold mb-4">
          Blog
        </h1>
        <p className="text-xl md:text-2xl font-inter max-w-2xl mx-auto">
          Stories & Travel Guides from the Heart of Nepal
        </p>
      </div>
    </div>;
};
export default BlogHero;