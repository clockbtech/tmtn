import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Camera, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DestinationFormProps {
  destination?: any;
  onClose: () => void;
}

export const DestinationForm = ({ destination, onClose }: DestinationFormProps) => {
  const [formData, setFormData] = useState({
    name: destination?.name || '',
    description: destination?.description || '',
    fullDescription: destination?.fullDescription || '',
    region: destination?.region || '',
    location: destination?.location || '',
    altitude: destination?.altitude || '',
    tags: destination?.tags?.join(', ') || '',
    status: destination?.status || 'Active',
    highlights: destination?.highlights || [''],
    seasons: destination?.seasons || [{ icon: '', months: '', description: '' }],
    safetyNotes: destination?.safetyNotes || [''],
    quickFacts: destination?.quickFacts || [{ label: '', value: '' }],
    proTips: destination?.proTips || [''],
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
    <div className="h-[80vh] flex flex-col">
      <ScrollArea className="flex-1 px-4">
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="seasons">Seasons</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="facts">Quick Facts</TabsTrigger>
              <TabsTrigger value="tips">Pro Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Destination Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter destination name"
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
                  placeholder="Enter short destination description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                  placeholder="Describe the destination in detail..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="City">Himalayan</SelectItem>
                    <SelectItem value="Beach">Hilly</SelectItem>
                    <SelectItem value="Mountain">Terai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (Coordinates)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., 48.8566° N, 2.3522° E"
                />
              </div>
 
              <div className="space-y-2">
                <Label htmlFor="altitude">Altitude</Label>
                <Input
                  id="altitude"
                  value={formData.altitude}
                  onChange={(e) => setFormData(prev => ({ ...prev, altitude: e.target.value }))}
                  placeholder="Enter altitude"
                />
              </div>
        
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Romance, Culture, History"
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
                  <CardDescription>Add the main attractions and features of this destination</CardDescription>
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

            <TabsContent value="seasons" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Seasons to Visit</CardTitle>
                  <CardDescription>Define the optimal seasons for visiting this destination</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.seasons.map((season, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label>Season Icon/Emoji</Label>
                        <Input
                          value={season.icon}
                          onChange={(e) => updateArrayItem('seasons', index, { ...season, icon: e.target.value })}
                          placeholder="🌸"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Months</Label>
                        <Input
                          value={season.months}
                          onChange={(e) => updateArrayItem('seasons', index, { ...season, months: e.target.value })}
                          placeholder="March - May"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={season.description}
                          onChange={(e) => updateArrayItem('seasons', index, { ...season, description: e.target.value })}
                          placeholder="Spring season description"
                        />
                      </div>
                      {formData.seasons.length > 1 && (
                        <div className="md:col-span-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('seasons', index)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove Season
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('seasons', { icon: '', months: '', description: '' })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Season
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Notes</CardTitle>
                  <CardDescription>Important safety information for travelers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facts" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                  <CardDescription>Key information about the destination</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.quickFacts.map((fact, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={fact.label}
                          onChange={(e) => updateArrayItem('quickFacts', index, { ...fact, label: e.target.value })}
                          placeholder="Max Altitude"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={fact.value}
                          onChange={(e) => updateArrayItem('quickFacts', index, { ...fact, value: e.target.value })}
                          placeholder="5,364m"
                        />
                      </div>
                      {formData.quickFacts.length > 1 && (
                        <div className="col-span-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('quickFacts', index)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove Fact
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('quickFacts', { label: '', value: '' })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Quick Fact
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pro Tips</CardTitle>
                  <CardDescription>Expert advice and insider tips for travelers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.proTips.map((tip, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={tip}
                        onChange={(e) => updateArrayItem('proTips', index, e.target.value)}
                        placeholder="Enter a pro tip"
                        className="flex-1"
                        rows={2}
                      />
                      {formData.proTips.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('proTips', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('proTips', '')}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pro Tip
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </ScrollArea>
      
      <div className="px-4 py-4 border-t">
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="destination-form">
            {destination ? 'Update Destination' : 'Add Destination'}
          </Button>
        </DialogFooter>
      </div>
    </div>
  );
};
