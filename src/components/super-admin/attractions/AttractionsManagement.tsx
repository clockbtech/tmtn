
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Download,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AttractionForm } from '../attractions/AttractionForm';

// Mock data
const attractions = [
  {
    id: 1,
    name: 'Eiffel Tower',
    description: 'Iconic symbol of Paris',
    category: 'Landmark',
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

export const AttractionsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState(null);

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || attraction.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || attraction.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attractions Management</h2>
          <p className="text-muted-foreground">Manage your travel attractions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Attraction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Attraction</DialogTitle>
              <DialogDescription>
                Create a new travel attraction for your platform
              </DialogDescription>
            </DialogHeader>
            <AttractionForm onClose={() => setIsAddDialogOpen(false)} />
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
                placeholder="Search attractions..."
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

      {/* Attractions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attractions ({filteredAttractions.length})</CardTitle>
          <CardDescription>
            Manage your travel attractions and their details
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
              {filteredAttractions.map((attraction) => (
                <TableRow key={attraction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{attraction.name}</div>
                        <div className="text-sm text-muted-foreground">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {attraction.location}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {attraction.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{attraction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        attraction.status === 'Active' ? 'default' :
                        attraction.status === 'Seasonal' ? 'secondary' :
                        'outline'
                      }
                    >
                      {attraction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{attraction.attractions}</TableCell>
                  <TableCell>{attraction.bookings}</TableCell>
                  <TableCell className="font-medium">{attraction.revenue}</TableCell>
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
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Attraction</DialogTitle>
                            <DialogDescription>
                              Update attraction information
                            </DialogDescription>
                          </DialogHeader>
                          <AttractionForm
                            attraction={attraction}
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
                            <AlertDialogTitle>Delete Attraction</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{attraction.name}"? This action cannot be undone.
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
