import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../contexts/TranslationContext';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    name: t('nav.destinations'),
    href: '/destinations'
  }, {
    name: t('nav.attractions'),
    href: '/attractions'
  }, {
    name: t('nav.experiences'),
    href: '/experiences'
  }, {
    name: t('nav.about'),
    href: '#about'
  }, {
    name: t('nav.blog'),
    href: '/blog'
  }, {
    name: t('nav.contact'),
    href: '/contact'
  }];

  // Dynamic text color based on background
  const textColor = isScrolled ? 'text-black' : 'text-white';
  const logoFilter = isScrolled ? 'brightness(0)' : 'brightness(0)';
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div whileHover={{
          scale: 1.05
        }} className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/dbe53354-4e12-429d-96e9-f53b18d9b259.png" alt="tmtn logo" className="h-8 lg:h-10 w-auto" style={{
              filter: logoFilter
            }} />
            </Link>
          </motion.div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <motion.div animate={{
              scale: isSearchFocused ? 1.05 : 1
            }} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder={t('search.placeholder')} onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-nepal-orange focus:border-transparent px-[130px]" />
              </motion.div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(item => <motion.div key={item.name} whileHover={{
            y: -2
          }}>
                {item.href.startsWith('#') ? <a href={item.href} style={{
              fontSize: '23px',
              fontWeight: 500,
              lineHeight: '20.7px',
              padding: '15px'
            }} className={`${textColor} font-bebas uppercase font-medium transition-colors duration-200 px-4 py-4`}>
                    {item.name}
                  </a> : <Link to={item.href} style={{
              fontSize: '23px',
              fontWeight: 500,
              lineHeight: '20.7px',
              padding: '15px'
            }} className={`${textColor} font-bebas uppercase font-medium transition-colors duration-200 px-4 py-4`}>
                    {item.name}
                  </Link>}
              </motion.div>)}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button whileTap={{
            scale: 0.95
          }} onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${textColor} hover:text-nepal-primary`}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="lg:hidden bg-white border-t border-gray-200">
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder={t('search.mobile.placeholder')} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-nepal-orange" />
                </div>
                
                {/* Mobile Navigation */}
                {navItems.map(item => <motion.div key={item.name} whileHover={{
              x: 5
            }}>
                    {item.href.startsWith('#') ? <a href={item.href} className="block text-sm font-bebas text-gray-700 hover:text-nepal-primary font-medium py-2 px-4 uppercase" onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                      </a> : <Link to={item.href} className="block text-sm font-bebas text-gray-700 hover:text-nepal-primary font-medium py-2 px-4 uppercase" onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                      </Link>}
                  </motion.div>)}
                
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.header>;
};
export default Header;