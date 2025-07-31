import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';

interface CollapsibleSearchProps {
  textColor: string;
}

const CollapsibleSearch = ({ textColor }: CollapsibleSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchValue('');
    }
  };

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2" // Changed from overflow-hidden to mr-2
          >
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tmtn-red focus:border-transparent"
              onBlur={() => {
                if (!searchValue) {
                  setIsOpen(false);
                }
              }}
              aria-label="Search"
            />
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
