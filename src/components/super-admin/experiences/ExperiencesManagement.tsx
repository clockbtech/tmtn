import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const experiences = [
  {
    id: 1,
    name: 'Paris City Tour & Eiffel Tower',
    destination: 'Paris, France',
    type: 'Guided Tour',
    duration: '8 hours',
    price: 149,
    groupSize: '2-15 people',
    status: 'Active',
    bookings: 156,
    rating: 4.8,
    revenue: '$23,244',
    seasonalPricing: {
      peak: 179,
      regular: 149,
      off: 119,
    },
    inclusions: ['Professional guide', 'Skip-the-line tickets', 'Transportation', 'Light lunch'],
    itinerary: [
      { time: '09:00', activity: 'Hotel pickup' },
      { time: '10:00', activity: 'Visit Louvre Museum' },
      { time: '12:30', activity: 'Seine River cruise' },
      { time: '14:00', activity: 'Lunch at local bistro' },
      { time: '15:30', activity: 'Eiffel Tower visit' },
      { time: '17:00', activity: 'Return to hotel' },
    ],
  },
  {
    id: 2,
    name: 'Bali Rice Terrace Trek',
    destination: 'Bali, Indonesia',
    type: 'Adventure',
    duration: '6 hours',
    price: 89,
    groupSize: '4-12 people',
    status: 'Active',
    bookings: 203,
    rating: 4.9,
    revenue: '$18,067',
    seasonalPricing: {
      peak: 109,
      regular: 89,
      off: 69,
    },
    inclusions: ['Local guide', 'Traditional lunch', 'Transportation', 'Bottled water'],
    itinerary: [
      { time: '07:00', activity: 'Hotel pickup' },
      { time: '08:30', activity: 'Start trekking' },
      { time: '11:00', activity: 'Visit local village' },
      { time: '12:30', activity: 'Traditional lunch' },
      { time: '14:00', activity: 'Rice terrace exploration' },
      { time: '16:00', activity: 'Return journey' },
    ],
  },
];

export const ExperiencesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const ExperienceForm = ({ experience, onClose }: { experience?: any; onClose: () => void }) => {
    const [currentTab, setCurrentTab] = useState('basic');
    const [formData, setFormData] = useState({
      name: experience?.name || '',
      destination: experience?.destination || '',
      type: experience?.type || '',
      duration: experience?.duration || '',
      price: experience?.price || '',
      groupSize: experience?.groupSize || '',
      status: experience?.status || 'Draft',
      description: '',
      inclusions: experience?.inclusions?.join('\n') || '',
      exclusions: '',
      itinerary: experience?.itinerary || [{ time: '', activity: '' }],
      seasonalPricing: experience?.seasonalPricing || {
        peak: '',
        regular: '',
        off: '',
      },
    });

    const addItineraryItem = () => {
      setFormData(prev => ({
        ...prev,
        itinerary: [...prev.itinerary, { time: '', activity: '' }]
      }));
    };

    const removeItineraryItem = (index: number) => {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.filter((_, i) => i !== index)
      }));
    };

    const updateItineraryItem = (index: number, field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Experience form submitted:', formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Experience Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter experience name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paris, France">Kathmandu</SelectItem>
                    <SelectItem value="Bali, Indonesia">Chitwan</SelectItem>
                    <SelectItem value="Swiss Alps">Pokhara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Experience Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guided Tour">Guided Tour</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 8 hours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  value={formData.groupSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                  placeholder="e.g., 2-15 people"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the experience..."
                rows={4}
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
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Seasonal">Seasonal</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price ($)</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter base price"
              />
            </div>

            <div className="space-y-4">
              <Label>Seasonal Pricing</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="peakPrice">Peak Season ($)</Label>
                  <Input
                    id="peakPrice"
                    type="number"
                    value={formData.seasonalPricing.peak}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      seasonalPricing: { ...prev.seasonalPricing, peak: e.target.value }
                    }))}
                    placeholder="Peak price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regularPrice">Regular Season ($)</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    value={formData.seasonalPricing.regular}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      seasonalPricing: { ...prev.seasonalPricing, regular: e.target.value }
                    }))}
                    placeholder="Regular price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offPrice">Off Season ($)</Label>
                  <Input
                    id="offPrice"
                    type="number"
                    value={formData.seasonalPricing.off}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      seasonalPricing: { ...prev.seasonalPricing, off: e.target.value }
                    }))}
                    placeholder="Off season price"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Daily Itinerary</Label>
              <Button type="button" onClick={addItineraryItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {formData.itinerary.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Input
                    type="time"
                    value={item.time}
                    onChange={(e) => updateItineraryItem(index, 'time', e.target.value)}
                    className="w-32"
                  />
                  <Input
                    value={item.activity}
                    onChange={(e) => updateItineraryItem(index, 'activity', e.target.value)}
                    placeholder="Activity description"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItineraryItem(index)}
                    disabled={formData.itinerary.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inclusions">What's Included (one per line)</Label>
              <Textarea
                id="inclusions"
                value={formData.inclusions}
                onChange={(e) => setFormData(prev => ({ ...prev, inclusions: e.target.value }))}
                placeholder="Professional guide&#10;Transportation&#10;Lunch"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exclusions">What's Not Included (one per line)</Label>
              <Textarea
                id="exclusions"
                value={formData.exclusions}
                onChange={(e) => setFormData(prev => ({ ...prev, exclusions: e.target.value }))}
                placeholder="Personal expenses&#10;Tips&#10;Additional meals"
                rows={4}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {experience ? 'Update Experience' : 'Create Experience'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Experiences & Packages</h2>
          <p className="text-muted-foreground">Manage your travel experiences and tour packages</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Experience</DialogTitle>
              <DialogDescription>
                Add a new travel experience or tour package
              </DialogDescription>
            </DialogHeader>
            <ExperienceForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Experiences</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">67% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">★★★★★</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search experiences..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Guided Tour">Guided Tour</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Seasonal">Seasonal</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Experiences Table */}
      <Card>
        <CardHeader>
          <CardTitle>Experiences ({experiences.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Experience</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{experience.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experience.destination}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3" />
                        {experience.duration}
                        <Users className="h-3 w-3" />
                        {experience.groupSize}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{experience.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${experience.price}</div>
                    <div className="text-xs text-muted-foreground">
                      Peak: ${experience.seasonalPricing.peak}
                    </div>
                  </TableCell>
                  <TableCell>{experience.bookings}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{experience.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{experience.revenue}</TableCell>
                  <TableCell>
                    <Badge
                      variant={experience.status === 'Active' ? 'default' : 'secondary'}
                    >
                      {experience.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Experience</DialogTitle>
                            <DialogDescription>
                              Update experience details and pricing
                            </DialogDescription>
                          </DialogHeader>
                          <ExperienceForm
                            experience={experience}
                            onClose={() => {}}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
