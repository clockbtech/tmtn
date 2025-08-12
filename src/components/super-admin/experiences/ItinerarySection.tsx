
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ItineraryItem {
  title: string;
  subtitle: string;
  hoursRange: string;
  distance: string;
  accommodationTypes: string[];
  meals: string[];
}

interface ItinerarySectionProps {
  itinerary: ItineraryItem[];
  onItineraryChange: (itinerary: ItineraryItem[]) => void;
}

const accommodationOptions = [
  'Tea House',
  'Homestay',
  'Lodge',
  'Tent Camping',
  'Hotel',
  'Guesthouse',
  'Resort'
];

const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];

export const ItinerarySection = ({ itinerary, onItineraryChange }: ItinerarySectionProps) => {
  const addItineraryItem = () => {
    const newItem: ItineraryItem = {
      title: '',
      subtitle: '',
      hoursRange: '',
      distance: '',
      accommodationTypes: [],
      meals: []
    };
    onItineraryChange([...itinerary, newItem]);
  };

  const removeItineraryItem = (index: number) => {
    onItineraryChange(itinerary.filter((_, i) => i !== index));
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: any) => {
    const updated = itinerary.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onItineraryChange(updated);
  };

  const toggleAccommodation = (itemIndex: number, accommodation: string) => {
    const item = itinerary[itemIndex];
    const updated = item.accommodationTypes.includes(accommodation)
      ? item.accommodationTypes.filter(a => a !== accommodation)
      : [...item.accommodationTypes, accommodation];
    updateItineraryItem(itemIndex, 'accommodationTypes', updated);
  };

  const toggleMeal = (itemIndex: number, meal: string) => {
    const item = itinerary[itemIndex];
    const updated = item.meals.includes(meal)
      ? item.meals.filter(m => m !== meal)
      : [...item.meals, meal];
    updateItineraryItem(itemIndex, 'meals', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Daily Itinerary</Label>
        <Button type="button" onClick={addItineraryItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </div>

      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Day {index + 1}</CardTitle>
                {itinerary.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItineraryItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                  placeholder="e.g., Fly to Lukla, trek to Phakding"
                />
              </div>

              <div className="space-y-2">
                <Label>Subtitle / Short Description</Label>
                <Textarea
                  value={item.subtitle}
                  onChange={(e) => updateItineraryItem(index, 'subtitle', e.target.value)}
                  placeholder="Brief description of the day's activities"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hours Range</Label>
                  <Input
                    value={item.hoursRange}
                    onChange={(e) => updateItineraryItem(index, 'hoursRange', e.target.value)}
                    placeholder="e.g., 4–5 hours"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <Input
                    value={item.distance}
                    onChange={(e) => updateItineraryItem(index, 'distance', e.target.value)}
                    placeholder="e.g., 5 km"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accommodation Types</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.accommodationTypes.map((acc, accIndex) => (
                    <Badge key={accIndex} variant="secondary" className="flex items-center gap-1">
                      {acc}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleAccommodation(index, acc)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(value) => toggleAccommodation(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationOptions
                      .filter(option => !item.accommodationTypes.includes(option))
                      .map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Meals</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.meals.map((meal, mealIndex) => (
                    <Badge key={mealIndex} variant="secondary" className="flex items-center gap-1">
                      {meal}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleMeal(index, meal)}
                      />
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(value) => toggleMeal(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealOptions
                      .filter(option => !item.meals.includes(option))
                      .map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
