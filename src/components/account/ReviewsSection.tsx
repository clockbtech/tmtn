
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      experience: 'Everest Base Camp Trek',
      rating: 5,
      date: '2024-03-20',
      comment: 'Amazing experience! The trek was challenging but absolutely worth it. The guides were professional and the scenery was breathtaking.',
      helpful: 12
    },
    {
      id: 2,
      experience: 'Annapurna Circuit',
      rating: 4,
      date: '2024-04-15',
      comment: 'Great trek with beautiful mountain views. The accommodation was decent and the food was good.',
      helpful: 8
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-500">{reviews.length} reviews written</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{review.experience}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.helpful} people found this helpful</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { ReviewsSection };
