
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, ArrowUp, CreditCard, Check, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import BackToTopButton from './BackToTopButton';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Newsletter state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreedToTerms) return;
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      setAgreedToTerms(false);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  // Secondary navigation items moved from header
  const secondaryNavItems = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' }
  ];

  const footerLinks = {
    destinations: ['Everest Base Camp', 'Annapurna Circuit', 'Pokhara Valley', 'Kathmandu Valley', 'Chitwan National Park', 'Langtang Valley'],
    company: ['About Us', 'Our Team', 'Careers', 'Travel Insurance', 'Terms & Conditions'],
    support: ['Help Center', 'Safety Guidelines', 'Packing Lists', 'Travel Tips', 'FAQs', 'Customer Reviews']
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram'
    },
    {
      icon: Mail,
      href: '#',
      label: 'Email'
    }
  ];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="text-white relative overflow-hidden" id="contact">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: 'url(/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png)'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gray-900/90"></div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }}>
                <h3 className="text-4xl font-bold text-tmtn-red mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                  tmtn.
                </h3>
                <p className="text-gray-300 mb-6 max-w-md font-normal">
                  Your trusted gateway to exploring the wonders of Nepal. We create unforgettable experiences that connect you with the heart and soul of the Himalayas.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-tmtn-red flex-shrink-0" />
                    <span className="text-gray-300">Thamel, Kathmandu, Nepal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-tmtn-red flex-shrink-0" />
                    <span className="text-gray-300">+977-1-4441234</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-tmtn-red flex-shrink-0" />
                    <span className="text-gray-300">info@takemetonepal.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return <motion.a key={index} href={social.href} whileHover={{
                    scale: 1.1,
                    y: -2
                  }} whileTap={{
                    scale: 0.95
                  }} className="w-10 h-10 bg-tmtn-blue hover:bg-tmtn-red rounded-full flex items-center justify-center transition-all duration-200" aria-label={social.label}>
                        <IconComponent className="w-5 h-5" />
                      </motion.a>;
                })}
                </div>
              </motion.div>
            </div>

            {/* Footer Links - Destinations */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }}>
              <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
                Destinations
              </h4>
              <ul className="space-y-2">
                {footerLinks.destinations.map((link, index) => <li key={index}>
                    <motion.a href="#" whileHover={{
                  x: 5
                }} className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm">
                      {link}
                    </motion.a>
                  </li>)}
              </ul>
            </motion.div>

            {/* Footer Links - Company */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {/* Secondary Navigation Items */}
                {secondaryNavItems.map((item, index) => (
                  <li key={`nav-${index}`}>
                    {item.href.startsWith('#') ? (
                      <motion.a 
                        href={item.href} 
                        whileHover={{ x: 5 }} 
                        className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </motion.a>
                    ) : (
                      <motion.div whileHover={{ x: 5 }}>
                        <Link 
                          to={item.href} 
                          className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )}
                  </li>
                ))}
                
                {/* Regular Company Links */}
                {footerLinks.company.map((link, index) => (
                  <li key={`company-${index}`}>
                    <motion.a href="#" whileHover={{ x: 5 }} className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm">
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Footer Links - Support */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }}>
              <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    {link === 'FAQs' ? (
                      <motion.div whileHover={{ x: 5 }}>
                        <Link 
                          to="/faq" 
                          className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm"
                        >
                          {link}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a href="#" whileHover={{ x: 5 }} className="text-gray-300 hover:text-tmtn-red transition-colors duration-200 text-sm">
                        {link}
                      </motion.a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div 
              initial={{
                opacity: 0,
                y: 20
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.4
              }}
              className="min-w-0"
            >
              <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
                Newsletter
              </h4>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onSubmit={handleNewsletterSubmit}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        className="w-full min-w-[280px] px-4 py-3 pr-12 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tmtn-red/50 transition-all duration-200 text-sm"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading || !agreedToTerms}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-1 top-1 bottom-1 bg-tmtn-red hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full px-4 flex items-center justify-center transition-colors duration-200"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <motion.button
                        type="button"
                        onClick={() => setAgreedToTerms(!agreedToTerms)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                          agreedToTerms 
                            ? 'bg-tmtn-red border-tmtn-red' 
                            : 'border-gray-400 hover:border-tmtn-red'
                        }`}
                      >
                        {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                      </motion.button>
                      <span className="text-gray-300 text-xs leading-tight">
                        I agree to all your terms and policies
                      </span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500 text-white px-4 py-3 rounded-full flex items-center justify-center space-x-2 min-w-[280px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-semibold">Subscribed!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.6 }} 
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                © {currentYear} Take Me To Nepal. All rights reserved. | Privacy Policy | Terms of Service
              </motion.div>
              
              {/* Payment Icons */}
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center space-x-4"
              >
                <span className="text-gray-400 text-sm">We accept:</span>
                <div className="flex items-center space-x-3">
                  {/* Visa */}
                  <div className="flex items-center justify-center w-10 h-6 bg-white rounded text-blue-600 text-xs font-bold">
                    VISA
                  </div>
                  
                  {/* Credit/Debit Card */}
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  
                  {/* Apple Pay */}
                  <div className="flex items-center justify-center w-12 h-6 bg-black rounded text-white text-xs font-semibold">
                    <svg className="w-6 h-4" viewBox="0 0 24 16" fill="currentColor">
                      <path d="M7.6 2.7c-.3.4-.9.7-1.4.6-.1-.5.1-1.1.4-1.4.3-.4.9-.7 1.3-.7.1.5 0 1.1-.3 1.5zm.4.8c-.8 0-1.4.4-1.8.4-.4 0-1-.4-1.7-.4-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.2.9 6.9.6.8 1.3 1.7 2.2 1.7.7 0 1-.4 1.8-.4.8 0 1.1.4 1.8.4.9 0 1.5-.8 2.1-1.6.7-.9 1-1.8 1-1.8s-1.9-.7-1.9-2.8c0-1.9 1.5-2.8 1.6-2.8-.9-1.3-2.3-1.4-2.7-1.4-.5 0-1.1.1-1.4.1zm7.1 3.7c-.4-.3-.9-.5-1.4-.5-.7 0-1.3.4-1.6 1-.3.5-.4 1.1-.4 1.7 0 .6.1 1.2.4 1.7.3.6.9 1 1.6 1 .5 0 1-.2 1.4-.5v.4h.7V6.8h-.7v.4zm-1.3 3.7c-.4 0-.7-.2-.9-.5-.2-.3-.3-.7-.3-1.1 0-.4.1-.8.3-1.1.2-.3.5-.5.9-.5.4 0 .7.2.9.5.2.3.3.7.3 1.1 0 .4-.1.8-.3 1.1-.2.3-.5.5-.9.5zm3.9-3.7c-.4-.3-.9-.5-1.4-.5-.7 0-1.3.4-1.6 1-.3.5-.4 1.1-.4 1.7 0 .6.1 1.2.4 1.7.3.6.9 1 1.6 1 .5 0 1-.2 1.4-.5v.4h.7V6.8h-.7v.4zm-1.3 3.7c-.4 0-.7-.2-.9-.5-.2-.3-.3-.7-.3-1.1 0-.4.1-.8.3-1.1.2-.3.5-.5.9-.5.4 0 .7.2.9.5.2.3.3.7.3 1.1 0 .4-.1.8-.3 1.1-.2.3-.5.5-.9.5z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button with Progress Indicator */}
      <BackToTopButton />
    </>
  );
};

export default Footer;
