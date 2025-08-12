
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { VideoReelForm } from './VideoReelForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VideoReel {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  destinationTag: string;
  relatedPackage?: string;
  status: 'active' | 'inactive';
  dateAdded: string;
}

// Mock data for demonstration
const mockVideoReels: VideoReel[] = [
  {
    id: '1',
    title: 'Mount Everest - World\'s Highest Peak',
    videoUrl: '/Videos/Video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
    destinationTag: 'Everest Region',
    relatedPackage: 'Everest Base Camp Trek',
    status: 'active',
    dateAdded: '2024-01-15',
  },
  {
    id: '2',
    title: 'Traditional Nepali Cultural Dance',
    videoUrl: '/Videos/Video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=800&fit=crop',
    destinationTag: 'Kathmandu Valley',
    relatedPackage: 'Cultural Heritage Tour',
    status: 'active',
    dateAdded: '2024-01-14',
  },
  {
    id: '3',
    title: 'Himalayan Mountain Range View',
    videoUrl: '/Videos/Video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=800&fit=crop',
    destinationTag: 'Annapurna Region',
    relatedPackage: 'Annapurna Circuit Trek',
    status: 'inactive',
    dateAdded: '2024-01-13',
  },
];

export const VideoReelsManagement = () => {
  const [videoReels, setVideoReels] = useState<VideoReel[]>(mockVideoReels);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVideoReel, setEditingVideoReel] = useState<VideoReel | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dateAdded');

  const handleAddVideoReel = (newVideoReel: Omit<VideoReel, 'id' | 'dateAdded'>) => {
    const videoReel: VideoReel = {
      ...newVideoReel,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setVideoReels([videoReel, ...videoReels]);
    setIsFormOpen(false);
  };

  const handleEditVideoReel = (updatedVideoReel: VideoReel) => {
    setVideoReels(videoReels.map(vr => vr.id === updatedVideoReel.id ? updatedVideoReel : vr));
    setIsFormOpen(false);
    setEditingVideoReel(undefined);
  };

  const handleDeleteVideoReel = (id: string) => {
    setVideoReels(videoReels.filter(vr => vr.id !== id));
  };

  const openEditForm = (videoReel: VideoReel) => {
    setEditingVideoReel(videoReel);
    setIsFormOpen(true);
  };

  const filteredAndSortedVideoReels = videoReels
    .filter(vr => {
      const matchesSearch = vr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vr.destinationTag.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || vr.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'dateAdded') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Video Reels Management</h1>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Video Reel
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by title or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateAdded">Date Added</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Video Reels Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Related Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedVideoReels.map((videoReel) => (
              <TableRow key={videoReel.id}>
                <TableCell>
                  <img
                    src={videoReel.thumbnailUrl}
                    alt={videoReel.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{videoReel.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{videoReel.destinationTag}</Badge>
                </TableCell>
                <TableCell>{videoReel.relatedPackage || 'None'}</TableCell>
                <TableCell>
                  <Badge variant={videoReel.status === 'active' ? 'default' : 'secondary'}>
                    {videoReel.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(videoReel.dateAdded).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(videoReel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteVideoReel(videoReel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Video Reel Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVideoReel ? 'Edit Video Reel' : 'Add New Video Reel'}
            </DialogTitle>
          </DialogHeader>
          <VideoReelForm
            videoReel={editingVideoReel}
            onSave={editingVideoReel ? handleEditVideoReel : handleAddVideoReel}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingVideoReel(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
