
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
  Plus,
  Search,
  Edit,
  Trash2,
  Play,
  Eye,
  Video,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VideoReelForm } from './VideoReelForm';

// Mock data for video reels
const videoReels = [
  {
    id: 1,
    title: 'Kathmandu Valley Adventure',
    thumbnail: '/lovable-uploads/3909d361-7017-4536-b256-c31d70c7e5b0.png',
    destination: 'Kathmandu',
    linkedPackage: 'Heritage Walk Tour',
    status: 'Active',
    views: 15420,
    duration: '2:45',
    dateAdded: '2024-01-15',
    uploadFormat: 'MP4',
  },
  {
    id: 2,
    title: 'Pokhara Lake Serenity',
    thumbnail: '/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png',
    destination: 'Pokhara',
    linkedPackage: 'Annapurna Base Camp Trek',
    status: 'Active',
    views: 8930,
    duration: '1:58',
    dateAdded: '2024-01-10',
    uploadFormat: 'MOV',
  },
  {
    id: 3,
    title: 'Everest Base Camp Journey',
    thumbnail: '/lovable-uploads/b8be241b-a5f1-405b-850a-283612b2441f.png',
    destination: 'Solukhumbu',
    linkedPackage: 'Everest Base Camp Trek',
    status: 'Inactive',
    views: 22150,
    duration: '3:12',
    dateAdded: '2024-01-08',
    uploadFormat: 'WebM',
  },
];

export const VideoReelsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredReels = videoReels.filter(reel => {
    const matchesSearch = reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reel.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || reel.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalViews = videoReels.reduce((sum, reel) => sum + reel.views, 0);
  const activeReels = videoReels.filter(reel => reel.status === 'Active').length;
  const averageViews = Math.round(totalViews / videoReels.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Video Reels Management</h2>
          <p className="text-muted-foreground">Manage video reels for the Experience Nepal section</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Video Reel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Video Reel</DialogTitle>
              <DialogDescription>
                Upload a new video reel for the Experience Nepal section
              </DialogDescription>
            </DialogHeader>
            <VideoReelForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Video Reels</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoReels.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reels</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeReels}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeReels / videoReels.length) * 100)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">per video reel</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search video reels..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Video Reels Table */}
      <Card>
        <CardHeader>
          <CardTitle>Video Reels ({filteredReels.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title & Details</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Linked Package</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReels.map((reel) => (
                <TableRow key={reel.id}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-muted">
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{reel.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {reel.duration}
                        <span className="text-xs px-1.5 py-0.5 bg-muted rounded">
                          {reel.uploadFormat}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{reel.destination}</Badge>
                  </TableCell>
                  <TableCell>{reel.linkedPackage}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {reel.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={reel.status === 'Active' ? 'default' : 'secondary'}
                    >
                      {reel.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(reel.dateAdded).toLocaleDateString()}
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
                            <DialogTitle>Edit Video Reel</DialogTitle>
                            <DialogDescription>
                              Update video reel details and settings
                            </DialogDescription>
                          </DialogHeader>
                          <VideoReelForm
                            videoReel={reel}
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
