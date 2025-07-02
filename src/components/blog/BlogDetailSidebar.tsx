
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';

interface BlogDetailSidebarProps {
  currentBlog: {
    id: number;
    tags: string[];
  };
}

const relatedArticles = [
  {
    title: "Annapurna Circuit: Complete Trekking Guide",
    slug: "annapurna-circuit-guide",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop",
    category: "Adventure"
  },
  {
    title: "Nepal's Sacred Temples and Monasteries",
    slug: "nepal-temples-monasteries",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=200&fit=crop",
    category: "Culture"
  },
  {
    title: "Pokhara: Gateway to the Himalayas",
    slug: "pokhara-travel-guide",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop",
    category: "Destinations"
  }
];

const relatedExperiences = [
  {
    title: "Helicopter Tour to Everest Base Camp",
    slug: "helicopter-everest-tour",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
    price: "NPR 125,000"
  },
  {
    title: "15-Day Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop",
    price: "NPR 45,000"
  },
  {
    title: "Sherpa Culture Experience",
    slug: "sherpa-culture-experience",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=200&fit=crop",
    price: "NPR 12,000"
  }
];

const relatedDestinations = [
  {
    title: "Sagarmatha National Park",
    slug: "sagarmatha-national-park",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=150&fit=crop"
  },
  {
    title: "Namche Bazaar",
    slug: "namche-bazaar",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=200&h=150&fit=crop"
  },
  {
    title: "Kala Patthar",
    slug: "kala-patthar",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=150&fit=crop"
  }
];

const BlogDetailSidebar = ({ currentBlog }: BlogDetailSidebarProps) => {
  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      {/* Related Articles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block group"
            >
              <div className="flex space-x-3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-nepal-primary transition-colors line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <span className="text-xs text-gray-500">{article.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Related Experiences - Now with images */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Experiences</h3>
        <div className="space-y-4">
          {relatedExperiences.map((experience) => (
            <Link
              key={experience.slug}
              to={`/experiences/${experience.slug}`}
              className="block group"
            >
              <div className="flex space-x-3">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-nepal-primary transition-colors mb-1">
                    {experience.title}
                  </h4>
                  <p className="text-sm text-nepal-primary font-semibold">{experience.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Related Destinations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Destinations</h3>
        <div className="space-y-4">
          {relatedDestinations.map((destination) => (
            <Link
              key={destination.slug}
              to={`/destinations/${destination.slug}`}
              className="flex items-center space-x-3 group"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-20 h-16 rounded-lg object-cover"
              />
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-nepal-primary transition-colors">
                {destination.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {currentBlog.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-nepal-primary hover:text-white transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSidebar;
