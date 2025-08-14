import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Upload, X, Image as ImageIcon } from 'lucide-react';

interface TestimonialFormProps {
  testimonial?: any;
  onSuccess: () => void;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  testimonial,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    travelerName: testimonial?.travelerName || '',
    country: testimonial?.country || '',
    rating: testimonial?.rating || 0,
    description: testimonial?.description || '',
    status: testimonial?.status || 'draft',
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [tripImage, setTripImage] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(testimonial?.profilePicture || '');
  const [tripImagePreview, setTripImagePreview] = useState(testimonial?.tripImage || '');
  const [hoveredStar, setHoveredStar] = useState(0);

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Spain', 'Italy', 'Japan', 'South Korea', 'China', 'India',
    'Brazil', 'Mexico', 'Argentina', 'Netherlands', 'Sweden', 'Norway',
    'Denmark', 'Switzerland', 'Austria', 'Belgium', 'Portugal', 'Ireland',
    'New Zealand', 'South Africa', 'Thailand', 'Singapore', 'Malaysia',
    'Indonesia', 'Philippines', 'Vietnam', 'Turkey', 'Greece', 'Russia'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'trip') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'profile') {
          setProfilePicture(file);
          setProfilePicturePreview(result);
        } else {
          setTripImage(file);
          setTripImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: 'profile' | 'trip') => {
    if (type === 'profile') {
      setProfilePicture(null);
      setProfilePicturePreview('');
    } else {
      setTripImage(null);
      setTripImagePreview('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically upload the images and save the testimonial
    console.log('Form data:', formData);
    console.log('Profile picture:', profilePicture);
    console.log('Trip image:', tripImage);
    
    // Simulate success
    onSuccess();
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => handleStarClick(star)}
            className="transition-colors hover:scale-110 transform"
          >
            <Star
              className={`h-8 w-8 ${
                star <= (hoveredStar || formData.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const ImageUploadCard = ({ 
    type, 
    preview, 
    onChange, 
    onRemove, 
    title, 
    description 
  }: {
    type: 'profile' | 'trip';
    preview: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    title: string;
    description: string;
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium mb-2">{title}</div>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className={`${type === 'profile' ? 'w-24 h-24 rounded-full' : 'w-full h-32'} object-cover border border-border`}
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onChange}
            />
          </label>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="h-[80vh] flex flex-col">
      <ScrollArea className="flex-1 px-4">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="travelerName">Traveler Name *</Label>
              <Input
                id="travelerName"
                value={formData.travelerName}
                onChange={(e) => handleInputChange('travelerName', e.target.value)}
                placeholder="Enter traveler's full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Star Rating *</Label>
              <div className="mt-2">
                {renderStarRating()}
                <p className="text-sm text-muted-foreground mt-1">
                  Click on stars to rate (Currently: {formData.rating}/5)
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <ImageUploadCard
              type="profile"
              preview={profilePicturePreview}
              onChange={(e) => handleFileChange(e, 'profile')}
              onRemove={() => removeImage('profile')}
              title="Profile Picture"
              description="Upload traveler's profile image"
            />

            <ImageUploadCard
              type="trip"
              preview={tripImagePreview}
              onChange={(e) => handleFileChange(e, 'trip')}
              onRemove={() => removeImage('trip')}
              title="Trip Photo"
              description="Upload photo from the traveler's trip"
            />
          </div>
        </div>

        {/* Description - Full Width */}
        <div>
          <Label htmlFor="description">Testimonial Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter the traveler's detailed feedback about their experience..."
            className="min-h-[120px]"
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>
      </form>
      </ScrollArea>
      
      <div className="px-4 py-4 border-t">
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" form="testimonial-form">
            {testimonial ? 'Update Testimonial' : 'Create Testimonial'}
          </Button>
        </div>
      </div>
    </div>
  );
};
