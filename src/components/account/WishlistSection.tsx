
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ExperienceCard from '../shared/ExperienceCard';

const WishlistSection = () => {
  const wishlistItems = [
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      location: 'Nepal',
      rating: 4.8,
      reviews: 234,
      price: 2499,
      duration: '14 days',
      difficulty: 'Extreme',
      image: '/placeholder-experience.jpg'
    },
    {
      id: 2,
      title: 'Annapurna Circuit',
      location: 'Nepal',
      rating: 4.7,
      reviews: 187,
      price: 1899,
      duration: '16 days',
      difficulty: 'Moderate',
      image: '/placeholder-experience.jpg'
    }
  ];

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  const handleHeartClick = (id: number) => {
    console.log('Remove from wishlist:', id);
    // Add logic to remove from wishlist
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-500">{wishlistItems.length} saved experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.map((item, index) => (
          <ExperienceCard
            key={item.id}
            experience={item}
            index={index}
            formatPrice={formatPrice}
            showWishlistHeart={true}
            onHeartClick={handleHeartClick}
          />
        ))}
      </div>
    </div>
  );
};

export { WishlistSection };
