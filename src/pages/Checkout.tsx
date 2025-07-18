import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  fullAddress1: z.string().min(1, "Address is required"),
  fullAddress2: z.string().optional(),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportCountry: z.string().min(1, "Passport country is required"),
  passportIssueDate: z.string().min(1, "Issue date is required"),
  passportExpiryDate: z.string().min(1, "Expiry date is required"),
  plannedDeparture: z.string().min(1, "Planned departure is required"),
  email: z.string().email("Invalid email address"),
  pax: z.string().min(1, "Number of passengers is required"),
  countryCode: z.string().min(1, "Country code is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  message: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  // Get experience data from navigation state
  const experience = location.state?.experience || {
    title: "Majestic Mountain Adventures",
    image: "/lovable-uploads/56628e38-93c6-4daf-bc37-68b2e759d39e.png",
    rating: 4.2,
    reviewCount: 991,
    guide: "Jayvion Simon",
    price: 83.74
  };

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      fullAddress1: '',
      fullAddress2: '',
      passportNumber: '',
      passportCountry: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      plannedDeparture: '',
      email: '',
      pax: '3',
      countryCode: '+1',
      contactNumber: '',
      message: '',
      paymentMethod: 'paypal',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Checkout form submitted:', data);
    // Handle form submission here
  };

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+86', country: 'CN' },
    { code: '+81', country: 'JP' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Confirm and pay</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <h2 className="text-lg font-semibold">Shipping information</h2>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">BILLING ADDRESS</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="fullAddress1"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Full address 1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullAddress2"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Full address 2 (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Passport Information */}
                    <div className="pt-4">
                      <p className="text-sm font-medium text-gray-600 mb-4">PASSPORT INFORMATION</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="passportNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Passport number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="passportCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Passport country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="passportIssueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="date" placeholder="Issue date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="passportExpiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="date" placeholder="Expiry date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Other Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="plannedDeparture"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="date" placeholder="Planned departure (Approx.)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="email" placeholder="E-mail ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pax"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Number of passengers (Pax)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="w-24">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countryCodes.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Contact number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Message box (for additional information or support)" 
                              rows={4} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <h2 className="text-lg font-semibold">Payment methods</h2>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-3">
                            <div 
                              className={`border rounded-lg p-4 cursor-pointer ${
                                field.value === 'paypal' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                              }`}
                              onClick={() => field.onChange('paypal')}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <input 
                                    type="radio" 
                                    checked={field.value === 'paypal'} 
                                    onChange={() => field.onChange('paypal')}
                                    className="text-orange-500"
                                  />
                                  <div>
                                    <p className="font-medium">Paypal</p>
                                    <p className="text-sm text-gray-500">You will be redirected to PayPal website to complete your purchase securely.</p>
                                  </div>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">PayPal</div>
                              </div>
                            </div>

                            <div 
                              className={`border rounded-lg p-4 cursor-pointer ${
                                field.value === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                              }`}
                              onClick={() => field.onChange('card')}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <input 
                                    type="radio" 
                                    checked={field.value === 'card'} 
                                    onChange={() => field.onChange('card')}
                                    className="text-orange-500"
                                  />
                                  <div>
                                    <p className="font-medium">Credit / debit</p>
                                    <p className="text-sm text-gray-500">We support Mastercard, Visa, Discover and Stripe.</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="w-8 h-5 bg-red-500 rounded"></div>
                                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                                </div>
                              </div>
                            </div>

                            <div 
                              className={`border rounded-lg p-4 cursor-pointer ${
                                field.value === 'callback' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                              }`}
                              onClick={() => field.onChange('callback')}
                            >
                              <div className="flex items-center gap-3">
                                <input 
                                  type="radio" 
                                  checked={field.value === 'callback'} 
                                  onChange={() => field.onChange('callback')}
                                  className="text-orange-500"
                                />
                                <div>
                                  <p className="font-medium">Request for a call back</p>
                                  <p className="text-sm text-gray-500">Our team will contact you for further support and payment assistance.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Right side - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{experience.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{experience.rating} ({experience.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Departure day</span>
                    <span className="ml-auto">MM/DD/YYYY</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Guests</span>
                    <span className="ml-auto">3 Guests</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service charge</span>
                    <span>${experience.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>-</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${experience.price}</span>
                  </div>
                </div>

                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg"
                >
                  Complete booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
