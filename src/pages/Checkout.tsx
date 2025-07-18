import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutHero from '@/components/checkout/CheckoutHero';
import BookingSummary from '@/components/checkout/BookingSummary';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [countryCode, setCountryCode] = useState('+1');

  // Mock experience data - in real app, fetch based on id
  const experience = {
    title: "Majestic Mountain Adventures",
    image: "/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png",
    rating: 4.2,
    reviews: "9.91k reviews",
    guide: "Jayvion Simon",
    price: 83.74
  };

  const handleCompleteBooking = () => {
    // Handle booking completion logic here
    console.log('Booking completed');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CheckoutHero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-500">1</div>
                    Shipping information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-4">BILLING ADDRESS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Legal Name</Label>
                        <Input id="fullName" placeholder="Full Legal Name" />
                      </div>
                      <div>
                        <Label htmlFor="departure">Planned Departure (Approx.)</Label>
                        <Input id="departure" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="pax">Pax</Label>
                        <Input id="pax" type="number" placeholder="Number of passengers" min="1" />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail ID</Label>
                        <Input id="email" type="email" placeholder="E-mail ID" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="contact">Contact Number</Label>
                        <div className="flex gap-2">
                          <Select value={countryCode} onValueChange={setCountryCode}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                              <SelectItem value="+91">+91</SelectItem>
                              <SelectItem value="+86">+86</SelectItem>
                              <SelectItem value="+33">+33</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input id="contact" placeholder="Contact Number" className="flex-1" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-4">Passport Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="passportNumber">Number</Label>
                            <Input id="passportNumber" placeholder="Passport Number" />
                          </div>
                          <div>
                            <Label htmlFor="passportCountry">Country</Label>
                            <Input id="passportCountry" placeholder="Country of Issue" />
                          </div>
                          <div>
                            <Label htmlFor="passportIssueDate">Issue Date</Label>
                            <Input id="passportIssueDate" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="passportExpiryDate">Expiry Date</Label>
                            <Input id="passportExpiryDate" type="date" />
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="message">Message Box (for additional information or support)</Label>
                        <Textarea id="message" placeholder="Additional information or support requests" rows={3} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-600 mb-4">SHIPPING ADDRESS</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch id="same-address" checked={sameAsBilling} onCheckedChange={setSameAsBilling} />
                      <Label htmlFor="same-address">Same as billing address</Label>
                    </div>
                    
                    {!sameAsBilling && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="First name" />
                        <Input placeholder="Last name" />
                        <div className="md:col-span-2">
                          <Input placeholder="Full address 1" />
                        </div>
                        <div className="md:col-span-2">
                          <Input placeholder="Full address 2 (optional)" />
                        </div>
                      </div>}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-orange-500">2</div>
                    Payment methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="font-semibold">PayPal</Label>
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to PayPal website to complete your purchase securely.
                          </p>
                        </div>
                        <div className="text-blue-600 font-bold text-xl">PayPal</div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-semibold">Credit / debit</Label>
                          <p className="text-sm text-muted-foreground">
                            We support Mastercard, Visa, Discover and Stripe.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
                          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="apple-pay" id="apple-pay" />
                        <div className="flex-1">
                          <Label htmlFor="apple-pay" className="font-semibold">Apple Pay</Label>
                          <p className="text-sm text-muted-foreground">
                            Pay securely with Apple Pay using Touch ID or Face ID.
                          </p>
                        </div>
                        <div className="text-black font-bold">🍎 Pay</div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="callback" id="callback" />
                        <div className="flex-1">
                          <Label htmlFor="callback" className="font-semibold">Request a call back</Label>
                          <p className="text-sm text-muted-foreground">
                            Our support team will contact you for further assistance.
                          </p>
                        </div>
                        <div className="text-green-600">📞</div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <BookingSummary 
                experience={experience}
                onCompleteBooking={handleCompleteBooking}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
