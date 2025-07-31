
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import CollapsibleSearch from './CollapsibleSearch';
import LoginButton from './LoginButton';
import SearchSuggestions from './SearchSuggestions';
import { useTranslation } from '../contexts/TranslationContext';
import { searchContent, SearchResult } from '../utils/searchData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  const [mobileSearchResults, setMobileSearchResults] = useState<SearchResult[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (mobileSearchValue.length >= 2) {
        const results = searchContent(mobileSearchValue);
        setMobileSearchResults(results);
      } else {
        setMobileSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mobileSearchValue]);

  // Primary navigation items only
  const primaryNavItems = [
    { name: t('nav.destinations'), href: '/destinations' },
    { name: t('nav.attractions'), href: '/attractions' },
    { name: t('nav.experiences'), href: '/experiences' },
    { name: t('nav.about'), href: '/about' }
  ];

  // Dynamic text color based on background
  const textColor = isScrolled ? 'text-white' : 'text-white';

  const handleMobileSearchClick = () => {
    setIsMenuOpen(false);
    setMobileSearchValue('');
    setMobileSearchResults([]);
  };

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#126894] backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/dbe53354-4e12-429d-96e9-f53b18d9b259.png" 
                alt="tmtn logo"
                className="h-8 lg:h-10 w-auto" 
              />
            </Link>
          </motion.div>

          {/* Right-aligned Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 ml-auto">
            {/* Primary Navigation Items */}
            {primaryNavItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2 }}>
                <Link 
                  to={item.href}
                  className={`${textColor} font-tm-sans uppercase font-semibold transition-colors duration-200 px-4 py-2 text-base hover:text-tmtn-red relative group`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-tmtn-red scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              </motion.div>
            ))}
            
            {/* Collapsible Search */}
            <CollapsibleSearch textColor={textColor} />
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Login Button - Moved to far right */}
            <LoginButton textColor={textColor} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${textColor} hover:text-tmtn-red transition-colors`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={mobileSearchValue}
                    onChange={(e) => setMobileSearchValue(e.target.value)}
                    placeholder={t('search.mobile.placeholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-tmtn-red text-gray-700"
                  />
                  
                  <AnimatePresence>
                    {mobileSearchResults.length > 0 && (
                      <SearchSuggestions 
                        results={mobileSearchResults} 
                        onItemClick={handleMobileSearchClick}
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Mobile Navigation */}
                {primaryNavItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ x: 5 }}>
                    <Link 
                      to={item.href}
                      className="block text-sm font-tm-sans text-gray-700 hover:text-tmtn-red font-medium py-3 px-4 uppercase transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Login */}
                <div className="pt-4 border-t border-gray-200">
                  <LoginButton textColor="text-gray-700" />
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
