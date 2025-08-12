
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InclusionsSectionProps {
  includedItems: string[];
  notIncludedItems: string[];
  onIncludedItemsChange: (items: string[]) => void;
  onNotIncludedItemsChange: (items: string[]) => void;
}

export const InclusionsSection = ({
  includedItems,
  notIncludedItems,
  onIncludedItemsChange,
  onNotIncludedItemsChange
}: InclusionsSectionProps) => {
  const addIncludedItem = () => {
    onIncludedItemsChange([...includedItems, '']);
  };

  const addNotIncludedItem = () => {
    onNotIncludedItemsChange([...notIncludedItems, '']);
  };

  const removeIncludedItem = (index: number) => {
    onIncludedItemsChange(includedItems.filter((_, i) => i !== index));
  };

  const removeNotIncludedItem = (index: number) => {
    onNotIncludedItemsChange(notIncludedItems.filter((_, i) => i !== index));
  };

  const updateIncludedItem = (index: number, value: string) => {
    const updated = includedItems.map((item, i) => i === index ? value : item);
    onIncludedItemsChange(updated);
  };

  const updateNotIncludedItem = (index: number, value: string) => {
    const updated = notIncludedItems.map((item, i) => i === index ? value : item);
    onNotIncludedItemsChange(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">What's Included</CardTitle>
            <Button type="button" onClick={addIncludedItem} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {includedItems.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => updateIncludedItem(index, e.target.value)}
                placeholder="Enter what's included"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeIncludedItem(index)}
                disabled={includedItems.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">What's Not Included</CardTitle>
            <Button type="button" onClick={addNotIncludedItem} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notIncludedItems.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => updateNotIncludedItem(index, e.target.value)}
                placeholder="Enter what's not included"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeNotIncludedItem(index)}
                disabled={notIncludedItems.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
