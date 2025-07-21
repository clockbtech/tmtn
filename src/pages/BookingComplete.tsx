import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingCompleteHero from '../components/checkout/BookingCompleteHero';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Calendar, Users, Download, Star, CheckCircle, Clock, Plane } from 'lucide-react';
import { generatePDFInvoice } from '../utils/pdfInvoiceGenerator';
import { toast } from 'sonner';
const BookingComplete = () => {
  const handleDownloadInvoice = async () => {
    try {
      const invoiceData = {
        bookingId: 'NPL-2024-001',
        experienceTitle: 'Everest Base Camp Helicopter Tour',
        experienceLocation: 'Kathmandu, Nepal',
        bookingDate: new Date().toLocaleDateString(),
        checkInDate: '2024-08-15',
        checkOutDate: '2024-08-15',
        guests: {
          adults: 2,
          children: 1,
          infants: 0
        },
        pricing: {
          basePrice: 1200,
          serviceFee: 150,
          tax: 138,
          total: 1488
        },
        customerInfo: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, New York, NY 10001'
        },
        passportInfo: {
          number: 'A12345678',
          country: 'United States',
          issueDate: '2020-01-15',
          expiryDate: '2030-01-15'
        }
      };
      await generatePDFInvoice(invoiceData);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Failed to download invoice. Please try again.');
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingCompleteHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Success Message and Next Steps */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} className="space-y-8">
              {/* Experience Image and Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Everest Base Camp Helicopter Tour" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Everest Base Camp Helicopter Tour
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <span className="text-sm text-gray-600">(4.9) • 2,847 reviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Message */}
              

              {/* Next Steps */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-nepal-orange rounded-full flex items-center justify-center text-white text-sm font-medium">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Check your email</p>
                        <p className="text-sm text-gray-600">We've sent your booking confirmation and e-tickets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-nepal-orange rounded-full flex items-center justify-center text-white text-sm font-medium">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Prepare for your trip</p>
                        <p className="text-sm text-gray-600">Review packing lists and travel requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-nepal-orange rounded-full flex items-center justify-center text-white text-sm font-medium">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Meet at pickup location</p>
                        <p className="text-sm text-gray-600">Arrive 30 minutes before departure time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleDownloadInvoice} className="flex items-center justify-center gap-2 bg-nepal-orange hover:bg-nepal-orange/90 text-white px-6 py-3">
                  <Download className="w-4 h-4" />
                  Download PDF Invoice
                </Button>
                <Button variant="outline" className="px-6 py-3">
                  View My Bookings
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Booking Details */}
            <div className="space-y-6">
              {/* Booking Summary Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Booking Reference</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      NPL-2024-001
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">Aug 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">6:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-medium">2 Adults, 1 Child</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium">Tribhuvan International Airport</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Price Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base price (3 guests)</span>
                      <span>$1,200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span>$150.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span>$138.00</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>$1,488.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Customer Support:</strong> +977 1-4441234
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Emergency Contact:</strong> +977 98-51234567
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> support@nepaltravel.com
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default BookingComplete;