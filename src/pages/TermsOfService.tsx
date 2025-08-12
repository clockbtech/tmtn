
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using our website, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: <strong>January 15, 2024</strong>
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using Take Me To Nepal's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services Description</h2>
                <p className="text-gray-700 mb-4">
                  Take Me To Nepal provides travel and tourism services including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Tour package bookings and arrangements</li>
                  <li>Travel consultation and planning</li>
                  <li>Accommodation and transportation bookings</li>
                  <li>Local guide services</li>
                  <li>Travel insurance assistance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking and Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  When you make a booking with us:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>A deposit may be required to confirm your booking</li>
                  <li>Full payment is typically due 30 days before departure</li>
                  <li>Prices are subject to change until full payment is received</li>
                  <li>All payments are processed securely through our payment partners</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
                <p className="text-gray-700 mb-4">
                  Cancellation charges may apply based on the timing of your cancellation:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>More than 60 days: 10% of total cost</li>
                  <li>30-60 days: 25% of total cost</li>
                  <li>15-30 days: 50% of total cost</li>
                  <li>Less than 15 days: 75% of total cost</li>
                  <li>No-show: 100% of total cost</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Travel Insurance</h2>
                <p className="text-gray-700">
                  We strongly recommend that all travelers purchase comprehensive travel insurance. Take Me To Nepal is not responsible for any losses, injuries, or damages that occur during your trip that could have been covered by travel insurance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700">
                  Take Me To Nepal acts as an intermediary between travelers and service providers. While we strive to provide accurate information and quality services, we cannot be held liable for acts, errors, omissions, representations, warranties, or negligence of third-party suppliers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Force Majeure</h2>
                <p className="text-gray-700">
                  We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, strikes, or other unforeseen events.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-700">
                  These terms and conditions are governed by and construed in accordance with the laws of Nepal, and you irrevocably submit to the exclusive jurisdiction of the courts in Kathmandu, Nepal.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@takemetonepal.com<br />
                    <strong>Phone:</strong> +977-1-4441234<br />
                    <strong>Address:</strong> Thamel, Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
