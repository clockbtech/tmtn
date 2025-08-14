import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link, MapPin, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VideoReelFormProps {
  videoReel?: any;
  onClose: () => void;
}

// Mock data for destinations and packages
const destinations = [
  { id: 'kathmandu', name: 'Kathmandu' },
  { id: 'pokhara', name: 'Pokhara' },
  { id: 'chitwan', name: 'Chitwan' },
  { id: 'solukhumbu', name: 'Solukhumbu' },
  { id: 'annapurna', name: 'Annapurna Region' },
];

const travelPackages = [
  { id: 'heritage-walk', name: 'Heritage Walk Tour' },
  { id: 'abc-trek', name: 'Annapurna Base Camp Trek' },
  { id: 'ebc-trek', name: 'Everest Base Camp Trek' },
  { id: 'chitwan-safari', name: 'Chitwan Safari Adventure' },
  { id: 'langtang-trek', name: 'Langtang Valley Trek' },
];

export const VideoReelForm: React.FC<VideoReelFormProps> = ({ videoReel, onClose }) => {
  const [formData, setFormData] = useState({
    title: videoReel?.title || '',
    description: videoReel?.description || '',
    uploadType: 'file', // 'file' or 'url'
    videoFile: null as File | null,
    videoUrl: videoReel?.videoUrl || '',
    thumbnailFile: null as File | null,
    destination: videoReel?.destination || '',
    linkedPackage: videoReel?.linkedPackage || '',
    status: videoReel?.status === 'Active' || false,
    tags: videoReel?.tags || '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'video') {
        setFormData(prev => ({ ...prev, videoFile: file }));
      } else {
        setFormData(prev => ({ ...prev, thumbnailFile: file }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Video reel form submitted:', formData);
    
    // Simulate upload progress
    if (formData.videoFile) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }, 200);
    } else {
      onClose();
    }
  };

  const supportedFormats = ['MP4', 'MOV', 'WebM'];

  return (
    <div className="h-[80vh] flex flex-col">
      <ScrollArea className="flex-1 px-4">
        <form onSubmit={handleSubmit} className="space-y-6 py-4" id="video-reel-form">
          {/* Video Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={formData.uploadType === 'file' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, uploadType: 'file' }))}
                  className="h-auto p-4"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <Button
                  type="button"
                  variant={formData.uploadType === 'url' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, uploadType: 'url' }))}
                  className="h-auto p-4"
                >
                  <Link className="h-4 w-4 mr-2" />
                  Video URL
                </Button>
              </div>

              {formData.uploadType === 'file' ? (
                <div className="space-y-2">
                  <Label htmlFor="videoFile">Video File</Label>
                  <Input
                    id="videoFile"
                    type="file"
                    accept=".mp4,.mov,.webm"
                    onChange={(e) => handleFileChange(e, 'video')}
                    required={!videoReel}
                  />
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Supported formats:</span>
                    {supportedFormats.map(format => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://example.com/video.mp4"
                    required={formData.uploadType === 'url' && !videoReel}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="thumbnailFile">Custom Thumbnail (Optional)</Label>
                <Input
                  id="thumbnailFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                />
                <p className="text-xs text-muted-foreground">
                  If not provided, a thumbnail will be auto-generated from the video
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Video Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Short Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a short, engaging title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the video content..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Tag *</Label>
                  <Select 
                    value={formData.destination} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.id} value={dest.name}>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {dest.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Will appear as a badge on the video card
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedPackage">Related Travel Package</Label>
                  <Select 
                    value={formData.linkedPackage} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, linkedPackage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {travelPackages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.name}>
                          <div className="flex items-center gap-2">
                            <Package className="h-3 w-3" />
                            {pkg.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Will display when video is opened
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="adventure, trekking, culture, nature"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Video Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Control visibility on the website
                  </p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </ScrollArea>
      
      <div className="px-4 py-4 border-t">
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="video-reel-form" disabled={uploadProgress > 0 && uploadProgress < 100}>
            {uploadProgress > 0 && uploadProgress < 100 
              ? `Uploading... ${uploadProgress}%` 
              : videoReel 
                ? 'Update Video Reel' 
                : 'Create Video Reel'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};
