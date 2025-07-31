
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import SearchSuggestions from './SearchSuggestions';
import { searchContent, SearchResult } from '../utils/searchData';

interface CollapsibleSearchProps {
  textColor: string;
}

const CollapsibleSearch = ({ textColor }: CollapsibleSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue.length >= 2) {
        setIsSearching(true);
        const results = searchContent(searchValue);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // Handle clicks outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchValue('');
      setSearchResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
    setSearchValue('');
    setSearchResults([]);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2 relative"
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder={t('search.placeholder')}
                className="w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tmtn-red focus:border-transparent"
                aria-label="Search"
              />
              
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-tmtn-red"></div>
                </div>
              )}
              
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <SearchSuggestions 
                    results={searchResults} 
                    onItemClick={handleSuggestionClick}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`${textColor} hover:text-tmtn-red transition-colors p-2 rounded-full hover:bg-white/10`}
        aria-label={isOpen ? "Close search" : "Open search"}
        aria-expanded={isOpen}
      >
        {isOpen && searchValue ? (
          <X className="w-5 h-5" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
};

export default CollapsibleSearch;
