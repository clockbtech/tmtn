import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const ExperienceDetail = () => {
  const { id } = useParams();
  const { t, formatPrice } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const mockExperience = {
    id: '1',
    title: "Majestic Mountain Adventures",
    description: "Embark on an unforgettable journey through the towering peaks and serene valleys. Our expert guides will lead you through hidden trails and breathtaking vistas, ensuring an experience of a lifetime.",
    images: [
      "/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png",
      "/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png",
    ],
    price: 83.74,
    duration: "3 days",
    difficulty: "Moderate",
    rating: 4.2,
    reviews: "9.91k reviews",
    guide: "Jayvion Simon",
    spotsLeft: 5,
    location: "Banff National Park, Canada",
    highlights: [
      "Guided hiking tours",
      "Wildlife spotting",
      "Campfire stories",
      "Gourmet meals included"
    ],
    itinerary: [
      { day: 1, description: "Arrival and introduction to the park." },
      { day: 2, description: "Full day of hiking and exploration." },
      { day: 3, description: "Departure after a sunrise breakfast." }
    ]
  };

  useEffect(() => {
    // Simulate fetching experience data
    setTimeout(() => {
      setExperience(mockExperience);
      setLoading(false);
    }, 500);
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBookNow = () => {
    navigate(`/experiences/${id}/checkout`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      {experience && (
        <Card>
          <CardHeader>
            <CardTitle>{experience.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={experience.images[0]} alt={experience.title} className="w-full rounded-md mb-4" />
            <p>{experience.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <Badge>{t('rating')}: {experience.rating} ({experience.reviews})</Badge>
              </div>
              <div>
                {t('price')}: {formatPrice(experience.price)}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="quantity">{t('quantity')}</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" size="sm" onClick={decrementQuantity}>-</Button>
                <Input type="number" id="quantity" value={quantity} className="w-20 text-center" readOnly />
                <Button variant="outline" size="sm" onClick={incrementQuantity}>+</Button>
              </div>
            </div>
            <Button className="mt-4" onClick={handleBookNow}>{t('bookNow')}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExperienceDetail;
