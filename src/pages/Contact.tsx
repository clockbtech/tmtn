
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactMap from '../components/contact/ContactMap';
import ContactForm from '../components/contact/ContactForm';
import ContactFAQ from '../components/contact/ContactFAQ';
import EmergencyContact from '../components/contact/EmergencyContact';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        
        <div className="container mx-auto px-4 py-12">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Map and Company Info */}
            <div>
              <ContactMap />
            </div>
            
            {/* Right Column - Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <ContactFAQ />
          </div>
          
          {/* Emergency Contact CTA */}
          <div>
            <EmergencyContact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
