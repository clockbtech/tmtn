
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, Star, Calendar, Users, CreditCard, Receipt, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingCompleteHero from '@/components/checkout/BookingCompleteHero';
import { generateInvoice } from '@/utils/invoiceGenerator';

const BookingComplete = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    title: "Mediterranean Cruise Voyage",
    rating: 4.9,
    reviews: "9k reviews",
    guide: "Chase Day",
    departureDay: "18 Jul 2025",
    guests: "2 guest",
    bookingCode: "KU_HBSDM",
    bookingDay: "18 Jul 2025",
    total: "$1,112",
    paymentMethod: "Paypal"
  };

  const handleDownloadInvoice = () => {
    generateInvoice(bookingDetails);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingCompleteHero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Nepal Adventure" 
                className="w-full h-[600px] object-cover rounded-2xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>

            {/* Right Column - Booking Details */}
            <div className="space-y-6">
              {/* Experience Title and Rating */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {bookingDetails.title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{bookingDetails.rating}</span>
                    <span className="text-muted-foreground">({bookingDetails.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="text-muted-foreground">Guide by {bookingDetails.guide}</span>
                </div>
              </div>

              {/* Booking Details Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Booking details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Departure day</span>
                      </div>
                      <span className="font-medium">{bookingDetails.departureDay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Guests</span>
                      </div>
                      <span className="font-medium">{bookingDetails.guests}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Receipt className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Booking code</span>
                      </div>
                      <span className="font-medium">{bookingDetails.bookingCode}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Booking day</span>
                      </div>
                      <span className="font-medium">{bookingDetails.bookingDay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Receipt className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Total</span>
                      </div>
                      <span className="font-medium">{bookingDetails.total}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Payment method</span>
                      </div>
                      <span className="font-medium">{bookingDetails.paymentMethod}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1 py-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back home
                </Button>
                <Button
                  onClick={handleDownloadInvoice}
                  className="flex-1 py-3 bg-nepal-orange hover:bg-orange-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingComplete;
