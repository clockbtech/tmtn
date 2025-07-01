import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = {
    destinations: ['Everest Base Camp', 'Annapurna Circuit', 'Pokhara Valley', 'Kathmandu Valley', 'Chitwan National Park', 'Langtang Valley'],
    experiences: ['Trekking Tours', 'Cultural Tours', 'Wildlife Safari', 'Helicopter Tours', 'Photography Tours', 'Spiritual Retreats'],
    company: ['About Us', 'Our Team', 'Careers', 'Contact', 'Travel Insurance', 'Terms & Conditions'],
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

  return (
    <footer className="text-white relative overflow-hidden" id="contact">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
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
              <h3 className="text-3xl font-bebas uppercase font-bold text-nepal-orange mb-4">
                Take Me To Nepal
              </h3>
              <p className="text-gray-300 mb-6 max-w-md font-normal">
                Your trusted gateway to exploring the wonders of Nepal. We create unforgettable experiences that connect you with the heart and soul of the Himalayas.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-nepal-orange flex-shrink-0" />
                  <span className="text-gray-300">Thamel, Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-nepal-orange flex-shrink-0" />
                  <span className="text-gray-300">+977-1-4441234</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-nepal-orange flex-shrink-0" />
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
                }} className="w-10 h-10 bg-nepal-primary hover:bg-nepal-orange rounded-full flex items-center justify-center transition-all duration-200" aria-label={social.label}>
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
              }} className="text-gray-300 hover:text-nepal-orange transition-colors duration-200 text-sm">
                    {link}
                  </motion.a>
                </li>)}
            </ul>
          </motion.div>

          {/* Footer Links - Experiences */}
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
              Experiences
            </h4>
            <ul className="space-y-2">
              {footerLinks.experiences.map((link, index) => <li key={index}>
                  <motion.a href="#" whileHover={{
                x: 5
              }} className="text-gray-300 hover:text-nepal-orange transition-colors duration-200 text-sm">
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
          delay: 0.3
        }}>
            <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => <li key={index}>
                  <motion.a href="#" whileHover={{
                x: 5
              }} className="text-gray-300 hover:text-nepal-orange transition-colors duration-200 text-sm">
                    {link}
                  </motion.a>
                </li>)}
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
          delay: 0.4
        }}>
            <h4 className="text-lg font-bebas uppercase font-semibold text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => <li key={index}>
                  <motion.a href="#" whileHover={{
                x: 5
              }} className="text-gray-300 hover:text-nepal-orange transition-colors duration-200 text-sm">
                    {link}
                  </motion.a>
                </li>)}
            </ul>
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
              © 2024 Take Me To Nepal. All rights reserved. | Privacy Policy | Terms of Service
            </motion.div>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-nepal-orange hover:bg-orange-600 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
