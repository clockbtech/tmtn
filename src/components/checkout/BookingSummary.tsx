
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Star, Calendar as CalendarIcon, Users, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingSummaryProps {
  experience: {
    title: string;
    image: string;
    rating: number;
    reviews: string;
    guide: string;
    price: number;
  };
  onCompleteBooking: () => void;
}

const BookingSummary = ({ experience, onCompleteBooking }: BookingSummaryProps) => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [guests, setGuests] = useState(3);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);

  const serviceCharge = experience.price;
  const taxesAndFees = serviceCharge * 0.12; // 12% taxes
  const total = serviceCharge + taxesAndFees;

  return (
    <Card className="sticky top-8">
      <CardContent className="p-6">
        <div className="flex gap-4 mb-6">
          <img 
            src={experience.image} 
            alt={experience.title} 
            className="w-20 h-20 rounded-lg object-cover" 
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{experience.title}</h3>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{experience.rating}</span>
              <span className="text-sm text-muted-foreground">({experience.reviews})</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-gray-200"></div>
              <span>Guide by {experience.guide}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Departure Date */}
          <div className="flex items-center gap-3 text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-muted-foreground">Departure day</span>
            <div className="ml-auto flex items-center gap-2">
              {!isEditingDate ? (
                <>
                  <span>{departureDate ? format(departureDate, 'MM/dd/yyyy') : 'MM/DD/YYYY'}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingDate(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </>
              ) : (
                <Popover open={isEditingDate} onOpenChange={setIsEditingDate}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[120px] h-8 text-xs justify-start"
                    >
                      {departureDate ? format(departureDate, 'MM/dd/yyyy') : 'Pick date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={(date) => {
                        setDepartureDate(date);
                        setIsEditingDate(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4" />
            <span className="text-muted-foreground">Guests</span>
            <div className="ml-auto flex items-center gap-2">
              {!isEditingGuests ? (
                <>
                  <span>{guests} Guests</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingGuests(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="h-6 w-6 p-0"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center text-xs">{guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(guests + 1)}
                    className="h-6 w-6 p-0"
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingGuests(false)}
                    className="h-6 w-6 p-0 ml-1"
                  >
                    ✓
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Service charge ({guests} guests)</span>
            <span>${(serviceCharge * guests).toFixed(2)}</span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            className="w-full justify-between p-0 h-auto text-sm font-normal hover:bg-transparent"
          >
            <span>Price breakdown</span>
            {showPriceBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {showPriceBreakdown && (
            <div className="space-y-2 text-sm border-l-2 border-gray-200 pl-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base price per person</span>
                <span>${serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number of guests</span>
                <span>×{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${(serviceCharge * guests).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & fees</span>
                <span>${(taxesAndFees * guests).toFixed(2)}</span>
              </div>
            </div>
          )}

          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${(total * guests).toFixed(2)}</span>
          </div>
        </div>

        <Button 
          onClick={onCompleteBooking} 
          className="w-full text-white py-3 bg-orange-500 hover:bg-orange-400"
        >
          Complete Booking
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
