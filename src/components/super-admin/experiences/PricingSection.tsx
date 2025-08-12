
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingSectionProps {
  basePrice: string;
  discountedPrice: string;
  currency: string;
  onBasePriceChange: (price: string) => void;
  onDiscountedPriceChange: (price: string) => void;
  onCurrencyChange: (currency: string) => void;
}

export const PricingSection = ({
  basePrice,
  discountedPrice,
  currency,
  onBasePriceChange,
  onDiscountedPriceChange,
  onCurrencyChange
}: PricingSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="NPR">NPR (₨)</SelectItem>
            <SelectItem value="AUD">AUD (A$)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="basePrice">Base Price</Label>
          <Input
            id="basePrice"
            type="number"
            value={basePrice}
            onChange={(e) => onBasePriceChange(e.target.value)}
            placeholder="Enter base price"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discountedPrice">Discounted Price (Optional)</Label>
          <Input
            id="discountedPrice"
            type="number"
            value={discountedPrice}
            onChange={(e) => onDiscountedPriceChange(e.target.value)}
            placeholder="Enter discounted price"
          />
        </div>
      </div>
    </div>
  );
};
