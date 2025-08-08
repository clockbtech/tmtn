
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Camera,
  Download,
  Eye,
  UserCheck,
  Star,
  MapPin,
  Languages,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Mock data
const tourGuides = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    profilePicture: '/api/placeholder/64/64',
    yearsOfExperience: 8,
    shortDescription: 'Experienced mountain guide specializing in alpine adventures and cultural tours.',
    tags: ['Mountain Guide License', 'First Aid Certified', 'English Speaking', 'Spanish Speaking'],
    status: 'Active',
    rating: 4.9,
    totalTours: 245,
    location: 'Swiss Alps',
  },
  {
    id: 2,
    name: 'James Thompson',
    profilePicture: '/api/placeholder/64/64',
    yearsOfExperience: 12,
    shortDescription: 'Wildlife expert and nature photographer with extensive knowledge of African safaris.',
    tags: ['Wildlife Expert', 'Photography Guide', 'English Speaking', 'Swahili Speaking'],
    status: 'Active',
    rating: 4.8,
    totalTours: 389,
    location: 'Kenya',
  },
  {
    id: 3,
    name: 'Chen Wei',
    profilePicture: '/api/placeholder/64/64',
    yearsOfExperience: 6,
    shortDescription: 'Cultural heritage specialist focusing on historical sites and traditional crafts.',
    tags: ['Cultural Heritage', 'History Expert', 'Mandarin Speaking', 'English Speaking'],
    status: 'Active',
    rating: 4.7,
    totalTours: 156,
    location: 'Beijing, China',
  },
];

export const TourGuidesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredGuides = tourGuides.filter((guide) => {
    const matchesSearch = 
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || guide.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const TourGuideForm = ({ guide, onClose }: { guide?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: guide?.name || '',
      yearsOfExperience: guide?.yearsOfExperience || 0,
      shortDescription: guide?.shortDescription || '',
      tags: guide?.tags?.join(', ') || '',
      status: guide?.status || 'Active',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter guide's full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload profile picture</p>
            <Button type="button" variant="outline" size="sm">
              Choose Image
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={formData.shortDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Brief bio or summary about the guide"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Mountain Guide License, First Aid Certified"
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
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {guide ? 'Update Guide' : 'Add Guide'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const GuideDetail = ({ guide }: { guide: any }) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={guide.profilePicture} alt={guide.name} />
          <AvatarFallback>{guide.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{guide.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{guide.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{guide.rating}</span>
            <span className="text-muted-foreground">• {guide.totalTours} tours</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Experience</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Years:</span> {guide.yearsOfExperience}</p>
            <p><span className="font-medium">Total Tours:</span> {guide.totalTours}</p>
            <p><span className="font-medium">Rating:</span> {guide.rating}/5</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Status</h4>
          <Badge variant={guide.status === 'Active' ? 'default' : 'secondary'}>
            {guide.status}
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">{guide.shortDescription}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Specializations & Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {guide.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tour Guides Management</h2>
          <p className="text-muted-foreground">Manage tour guide profiles and certifications</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tour Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tour Guide</DialogTitle>
              <DialogDescription>
                Create a new tour guide profile for your platform
              </DialogDescription>
            </DialogHeader>
            <TourGuideForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Guides</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">85.7% availability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">years average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">out of 5 stars</p>
          </CardContent>
        </Card>
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
                placeholder="Search guides..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
            <div></div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tour Guides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Guides ({filteredGuides.length})</CardTitle>
          <CardDescription>
            Manage tour guide profiles and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guide</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Total Tours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Specializations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuides.map((guide) => (
                <TableRow key={guide.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={guide.profilePicture} alt={guide.name} />
                        <AvatarFallback>{guide.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{guide.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {guide.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{guide.yearsOfExperience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{guide.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{guide.totalTours}</TableCell>
                  <TableCell>
                    <Badge variant={guide.status === 'Active' ? 'default' : 'secondary'}>
                      {guide.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {guide.tags.slice(0, 2).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {guide.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{guide.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Guide Details - {guide.name}</DialogTitle>
                            <DialogDescription>
                              Complete tour guide profile information
                            </DialogDescription>
                          </DialogHeader>
                          <GuideDetail guide={guide} />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Tour Guide</DialogTitle>
                            <DialogDescription>
                              Update guide profile information
                            </DialogDescription>
                          </DialogHeader>
                          <TourGuideForm
                            guide={guide}
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
                            <AlertDialogTitle>Delete Tour Guide</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{guide.name}"? This action cannot be undone.
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
