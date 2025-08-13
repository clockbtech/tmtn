
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AttractionFormProps {
  attraction?: any;
  onClose: () => void;
}

export const AttractionForm = ({ attraction, onClose }: AttractionFormProps) => {
  const [formData, setFormData] = useState({
    name: attraction?.name || '',
    description: attraction?.description || '',
    fullDescription: attraction?.fullDescription || '',
    category: attraction?.category || '',
    location: attraction?.location || '',
    duration: attraction?.duration || '',
    difficulty: attraction?.difficulty || 'Easy',
    price: attraction?.price || '',
    groupSize: attraction?.groupSize || '',
    tags: attraction?.tags?.join(', ') || '',
    status: attraction?.status || 'Active',
    highlights: attraction?.highlights || [''],
    inclusions: attraction?.inclusions || [''],
    exclusions: attraction?.exclusions || [''],
    requirements: attraction?.requirements || [''],
    itinerary: attraction?.itinerary || [{ day: '', title: '', description: '' }],
    safetyNotes: attraction?.safetyNotes || [''],
    bookingNotes: attraction?.bookingNotes || [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const addArrayItem = (field: string, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: string, index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Attraction Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter attraction name"
              required
            />
          </div>
         
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload cover image</p>
              <Button type="button" variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Other Images</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload images</p>
              <Button type="button" variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter short attraction description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Describe the attraction in detail..."
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trekking">Trekking</SelectItem>
                  <SelectItem value="Wildlife">Wildlife</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                  <SelectItem value="Extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 14 days"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupSize">Group Size</Label>
              <Input
                id="groupSize"
                value={formData.groupSize}
                onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                placeholder="e.g., 2-12 people"
              />
            </div>
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Adventure, Mountain, Trekking"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Seasonal">Seasonal</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="highlights" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
              <CardDescription>Add the main attractions and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                    placeholder="Enter a key highlight"
                    className="flex-1"
                  />
                  {formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('highlights', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('highlights', '')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inclusions" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inclusions</CardTitle>
                <CardDescription>What's included in the package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={inclusion}
                      onChange={(e) => updateArrayItem('inclusions', index, e.target.value)}
                      placeholder="Enter inclusion"
                      className="flex-1"
                    />
                    {formData.inclusions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('inclusions', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('inclusions', '')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Inclusion
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exclusions</CardTitle>
                <CardDescription>What's not included</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={exclusion}
                      onChange={(e) => updateArrayItem('exclusions', index, e.target.value)}
                      placeholder="Enter exclusion"
                      className="flex-1"
                    />
                    {formData.exclusions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('exclusions', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('exclusions', '')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exclusion
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
              <CardDescription>Day-by-day schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Day</Label>
                      <Input
                        value={day.day}
                        onChange={(e) => updateArrayItem('itinerary', index, { ...day, day: e.target.value })}
                        placeholder="Day 1"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) => updateArrayItem('itinerary', index, { ...day, title: e.target.value })}
                        placeholder="Day title"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => updateArrayItem('itinerary', index, { ...day, description: e.target.value })}
                      placeholder="Day description"
                      rows={3}
                    />
                  </div>
                  {formData.itinerary.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('itinerary', index)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Day
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('itinerary', { day: '', title: '', description: '' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Day
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Notes & Requirements</CardTitle>
              <CardDescription>Important safety information and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Safety Notes</h4>
                {formData.safetyNotes.map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={note}
                      onChange={(e) => updateArrayItem('safetyNotes', index, e.target.value)}
                      placeholder="Enter a safety note"
                      className="flex-1"
                      rows={2}
                    />
                    {formData.safetyNotes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('safetyNotes', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('safetyNotes', '')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Safety Note
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Requirements</h4>
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                      placeholder="Enter a requirement"
                      className="flex-1"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('requirements', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('requirements', '')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Notes</CardTitle>
              <CardDescription>Important booking information and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.bookingNotes.map((note, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={note}
                    onChange={(e) => updateArrayItem('bookingNotes', index, e.target.value)}
                    placeholder="Enter booking note"
                    className="flex-1"
                    rows={2}
                  />
                  {formData.bookingNotes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('bookingNotes', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('bookingNotes', '')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Booking Note
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {attraction ? 'Update Attraction' : 'Add Attraction'}
        </Button>
      </DialogFooter>
    </form>
  );
};
