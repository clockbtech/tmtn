
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Edit } from 'lucide-react';

interface GuestCount {
  adults: number;
  children: number;
  infants: number;
}

interface GuestSelectorProps {
  guests: GuestCount;
  onGuestsChange: (guests: GuestCount) => void;
}

const GuestSelector = ({ guests, onGuestsChange }: GuestSelectorProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateGuests = (type: keyof GuestCount, increment: boolean) => {
    const newGuests = { ...guests };
    if (increment) {
      newGuests[type]++;
    } else {
      newGuests[type] = Math.max(0, newGuests[type] - 1);
    }
    
    // Ensure at least 1 adult
    if (type === 'adults' && newGuests.adults < 1) {
      newGuests.adults = 1;
    }
    
    onGuestsChange(newGuests);
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  return (
    <div className="flex items-center gap-3 text-sm">
      <Users className="w-4 h-4" />
      <span className="text-muted-foreground">Guests</span>
      <div className="ml-auto flex items-center gap-2">
        {!isEditing ? (
          <>
            <span>{totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-6 w-6 p-0"
            >
              <Edit className="w-3 h-3" />
            </Button>
          </>
        ) : (
          <div className="space-y-2 min-w-[200px]">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <span className="text-xs">Adults</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('adults', false)}
                  className="h-6 w-6 p-0"
                  disabled={guests.adults <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center text-xs">{guests.adults}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('adults', true)}
                  className="h-6 w-6 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Children */}
            <div className="flex items-center justify-between">
              <span className="text-xs">Children</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('children', false)}
                  className="h-6 w-6 p-0"
                  disabled={guests.children <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center text-xs">{guests.children}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('children', true)}
                  className="h-6 w-6 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Infants */}
            <div className="flex items-center justify-between">
              <span className="text-xs">Infants</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('infants', false)}
                  className="h-6 w-6 p-0"
                  disabled={guests.infants <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center text-xs">{guests.infants}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateGuests('infants', true)}
                  className="h-6 w-6 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="w-full h-6 text-xs mt-2"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestSelector;
