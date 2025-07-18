
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AccountSidebar } from '../components/account/AccountSidebar';
import { ProfileSection } from '../components/account/ProfileSection';
import { BookingsSection } from '../components/account/BookingsSection';
import { WishlistSection } from '../components/account/WishlistSection';
import { ReviewsSection } from '../components/account/ReviewsSection';
import { PaymentSection } from '../components/account/PaymentSection';
import { SettingsSection } from '../components/account/SettingsSection';

type ActiveSection = 'profile' | 'bookings' | 'wishlist' | 'reviews' | 'payment' | 'settings';

const Account = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'bookings':
        return <BookingsSection />;
      case 'wishlist':
        return <WishlistSection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'payment':
        return <PaymentSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <AccountSidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveSection()}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
