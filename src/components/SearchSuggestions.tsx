
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'destination' | 'experience' | 'blog';
  image: string;
  href: string;
}

interface SearchSuggestionsProps {
  results: SearchResult[];
  onItemClick: () => void;
}

const SearchSuggestions = ({ results, onItemClick }: SearchSuggestionsProps) => {
  if (results.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'destination':
        return <MapPin className="w-4 h-4" />;
      case 'experience':
        return <Calendar className="w-4 h-4" />;
      case 'blog':
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'destination':
        return 'text-blue-600 bg-blue-100';
      case 'experience':
        return 'text-green-600 bg-green-100';
      case 'blog':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50"
    >
      <div className="p-2">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={result.href}
              onClick={onItemClick}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-3">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                    {getIcon(result.type)}
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-tmtn-red transition-colors">
                  {result.title}
                </h4>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchSuggestions;
