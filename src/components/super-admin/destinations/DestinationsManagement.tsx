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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Camera,
  Filter,
  Download,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    description: 'The City of Light with iconic landmarks',
    category: 'City',
    status: 'Active',
    attractions: 12,
    bookings: 245,
    revenue: '$45,000',
    image: '/api/placeholder/300/200',
    tags: ['Romance', 'Culture', 'History'],
    location: '48.8566° N, 2.3522° E',
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beautiful beaches',
    category: 'Beach',
    status: 'Active',
    attractions: 8,
    bookings: 189,
    revenue: '$32,000',
    image: '/api/placeholder/300/200',
    tags: ['Beach', 'Relaxation', 'Culture'],
    location: '8.3405° S, 115.0920° E',
  },
  {
    id: 3,
    name: 'Swiss Alps',
    description: 'Majestic mountains and pristine nature',
    category: 'Mountain',
    status: 'Seasonal',
    attractions: 15,
    bookings: 156,
    revenue: '$28,500',
    image: '/api/placeholder/300/200',
    tags: ['Adventure', 'Nature', 'Skiing'],
    location: '46.0207° N, 7.7491° E',
  },
];

const categories = ['All', 'City', 'Beach', 'Mountain', 'Desert', 'Forest'];

export const DestinationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || destination.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const DestinationForm = ({ destination, onClose }: { destination?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: destination?.name || '',
      description: destination?.description || '',
      category: destination?.category || '',
      location: destination?.location || '',
      tags: destination?.tags?.join(', ') || '',
      status: destination?.status || 'Active',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted:', formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter destination description"
            rows={3}
          />
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

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload images</p>
            <Button type="button" variant="outline" size="sm">
              Choose Files
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {destination ? 'Update Destination' : 'Add Destination'}
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
          <h2 className="text-2xl font-bold tracking-tight">Destinations Management</h2>
          <p className="text-muted-foreground">Manage your travel destinations and attractions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Destination</DialogTitle>
              <DialogDescription>
                Create a new travel destination for your platform
              </DialogDescription>
            </DialogHeader>
            <DestinationForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Seasonal">Seasonal</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Destinations ({filteredDestinations.length})</CardTitle>
          <CardDescription>
            Manage your travel destinations and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attractions</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{destination.name}</div>
                        <div className="text-sm text-muted-foreground">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {destination.location}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {destination.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{destination.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        destination.status === 'Active' ? 'default' :
                        destination.status === 'Seasonal' ? 'secondary' :
                        'outline'
                      }
                    >
                      {destination.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{destination.attractions}</TableCell>
                  <TableCell>{destination.bookings}</TableCell>
                  <TableCell className="font-medium">{destination.revenue}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Destination</DialogTitle>
                            <DialogDescription>
                              Update destination information
                            </DialogDescription>
                          </DialogHeader>
                          <DestinationForm
                            destination={destination}
                            onClose={() => {}}
                          />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Destination</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{destination.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
