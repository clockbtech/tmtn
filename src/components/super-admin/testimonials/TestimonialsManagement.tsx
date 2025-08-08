
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
  Search,
  Plus,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  MessageSquare,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TestimonialForm } from './TestimonialForm';

// Mock data for testimonials
const testimonials = [
  {
    id: 'TEST001',
    travelerName: 'Sarah Johnson',
    profilePicture: '/api/placeholder/40/40',
    country: 'United States',
    rating: 5,
    description: 'Amazing experience! The tour guide was knowledgeable and friendly. Highly recommend this service for anyone visiting the area.',
    tripImage: '/api/placeholder/100/80',
    createdAt: '2024-01-15',
    status: 'published',
    isVerified: true,
  },
  {
    id: 'TEST002',
    travelerName: 'Marco Rodriguez',
    profilePicture: '/api/placeholder/40/40',
    country: 'Spain',
    rating: 4,
    description: 'Great service and beautiful destinations. The organization was perfect and we had an unforgettable time.',
    tripImage: '/api/placeholder/100/80',
    createdAt: '2024-01-12',
    status: 'published',
    isVerified: true,
  },
  {
    id: 'TEST003',
    travelerName: 'Emily Chen',
    profilePicture: '/api/placeholder/40/40',
    country: 'Canada',
    rating: 5,
    description: 'Exceptional experience from start to finish. The attention to detail was remarkable.',
    tripImage: '/api/placeholder/100/80',
    createdAt: '2024-01-10',
    status: 'draft',
    isVerified: false,
  },
];

export const TestimonialsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.travelerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: 'default' as const, label: 'Published' },
      draft: { variant: 'secondary' as const, label: 'Draft' },
      pending: { variant: 'outline' as const, label: 'Pending' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    // In a real app, refresh the testimonials list
  };

  const handleEditSuccess = () => {
    setEditingTestimonial(null);
    // In a real app, refresh the testimonials list
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials Management</h2>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Create a new customer testimonial to showcase traveler feedback
              </DialogDescription>
            </DialogHeader>
            <TestimonialForm onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">70% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+25% increase</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials ({filteredTestimonials.length})</CardTitle>
          <CardDescription>
            Manage all customer testimonials and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Traveler</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.profilePicture} alt={testimonial.travelerName} />
                        <AvatarFallback>
                          {testimonial.travelerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.travelerName}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{renderStars(testimonial.rating)}</TableCell>
                  <TableCell>{testimonial.country}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate">{testimonial.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                  <TableCell>{testimonial.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog open={editingTestimonial?.id === testimonial.id} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingTestimonial(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>Edit Testimonial</DialogTitle>
                            <DialogDescription>
                              Update testimonial information
                            </DialogDescription>
                          </DialogHeader>
                          <TestimonialForm 
                            testimonial={editingTestimonial} 
                            onSuccess={handleEditSuccess} 
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
                            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this testimonial from "{testimonial.travelerName}"? This action cannot be undone.
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
