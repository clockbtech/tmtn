
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from '../ui/button';

const WishlistSection = () => {
  const wishlistItems = [
    {
      id: 1,
      title: 'Everest Base Camp Trek',
      location: 'Nepal',
      rating: 4.8,
      price: 2499,
      image: '/placeholder-experience.jpg'
    },
    {
      id: 2,
      title: 'Annapurna Circuit',
      location: 'Nepal',
      rating: 4.7,
      price: 1899,
      image: '/placeholder-experience.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-500">{wishlistItems.length} saved experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{item.location}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${item.price}</span>
                <Button size="sm">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { WishlistSection };
