
import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TourGuide {
  id: string;
  name: string;
  profileImage?: string;
}

interface TourGuideMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  tourGuides: TourGuide[];
}

export const TourGuideMultiSelect = ({ value, onChange, tourGuides }: TourGuideMultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const selectedGuides = tourGuides.filter(guide => value.includes(guide.id));
  const availableGuides = tourGuides.filter(guide => !value.includes(guide.id));

  const handleSelect = (guideId: string) => {
    onChange([...value, guideId]);
  };

  const handleRemove = (guideId: string) => {
    onChange(value.filter(id => id !== guideId));
  };

  return (
    <div className="space-y-2">
      <Label>Tour Guides</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-[40px] p-2"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedGuides.length === 0 ? (
                <span className="text-muted-foreground">Select one or more guides</span>
              ) : (
                selectedGuides.map((guide) => (
                  <Badge
                    key={guide.id}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={guide.profileImage} alt={guide.name} />
                      <AvatarFallback className="text-xs">
                        {guide.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{guide.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(guide.id);
                      }}
                      className="ml-1 h-3 w-3 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 flex items-center justify-center"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="max-h-60 overflow-auto">
            {availableGuides.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                {tourGuides.length === 0 ? 'No tour guides available' : 'All guides selected'}
              </div>
            ) : (
              <div className="p-1">
                {availableGuides.map((guide) => (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => {
                      handleSelect(guide.id);
                    }}
                    className="relative flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={guide.profileImage} alt={guide.name} />
                      <AvatarFallback className="text-xs">
                        {guide.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-left">{guide.name}</span>
                    {value.includes(guide.id) && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
