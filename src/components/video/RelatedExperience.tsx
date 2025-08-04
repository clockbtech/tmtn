
import React from 'react';
import { Star, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RelatedExperienceProps {
  currentVideoId: string;
}

// Mock experience data - in a real app, this would come from an API
const experienceData = {
  id: 1,
  title: 'Everest Base Camp Trek - Ultimate Adventure',
  image: 'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  rating: 4.9,
  reviews: 234,
  price: 1299,
  duration: '14 days',
  difficulty: 'Extreme',
  overview: 'Experience the ultimate adventure with our 14-day Everest Base Camp trek. This life-changing journey takes you through breathtaking Himalayan landscapes, traditional Sherpa villages, and culminates at the base of the world\'s highest peak.',
  highlights: [
    'Stand at Everest Base Camp (5,364m)',
    'Visit Tengboche Monastery',
    'Experience Sherpa culture in Namche Bazaar',
    'Cross suspension bridges over deep valleys',
    'Witness stunning sunrise from Kala Patthar'
  ],
  itinerary: [
    'Day 1-2: Fly to Lukla and trek to Namche Bazaar',
    'Day 3-4: Acclimatization in Namche Bazaar',
    'Day 5-7: Trek to Tengboche and Dingboche',
    'Day 8-10: Continue to Lobuche via Thukla',
    'Day 11-12: Reach Everest Base Camp and Kala Patthar',
    'Day 13-14: Return journey to Lukla'
  ],
  inclusions: [
    'All meals during the trek',
    'Experienced English-speaking guide',
    'Porter service (2:1 ratio)',
    'All necessary permits and fees',
    'Accommodation in tea houses',
    'Airport transfers in Kathmandu'
  ]
};

const RelatedExperience: React.FC<RelatedExperienceProps> = ({ currentVideoId }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/experiences/${experienceData.id}/checkout`);
  };

  return (
    <div className="h-full overflow-y-auto w-full max-w-[500px]">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Related Experience</h3>
        <p className="text-gray-300">Perfect adventure based on your interests</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Package Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={experienceData.image}
            alt={experienceData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-white">
              {experienceData.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Title and Rating */}
          <div className="mb-4">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Nepal</span>
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {experienceData.title}
            </h4>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(experienceData.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {experienceData.rating} ({experienceData.reviews} reviews)
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  ${experienceData.price}
                </span>
                <p className="text-sm text-gray-500">per person</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 text-sm space-x-4 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{experienceData.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Max 12 people</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-2">Overview</h5>
            <p className="text-gray-700 text-sm leading-relaxed">
              {experienceData.overview}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-2">Highlights</h5>
            <ul className="space-y-1">
              {experienceData.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary Preview */}
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-2">Itinerary</h5>
            <ul className="space-y-1">
              {experienceData.itinerary.slice(0, 2).map((day, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {day}
                </li>
              ))}
              <li className="text-sm text-blue-600 font-medium">+ {experienceData.itinerary.length - 2} more days...</li>
            </ul>
          </div>

          {/* Inclusions Preview */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-2">What's Included</h5>
            <ul className="space-y-1">
              {experienceData.inclusions.slice(0, 3).map((inclusion, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{inclusion}</span>
                </li>
              ))}
              <li className="text-sm text-blue-600 font-medium ml-6">+ {experienceData.inclusions.length - 3} more inclusions...</li>
            </ul>
          </div>

          {/* Book Now Button */}
          <Button 
            onClick={handleBookNow}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedExperience;
