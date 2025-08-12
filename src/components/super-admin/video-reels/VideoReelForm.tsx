
import React, { useState, useRef } from 'react';
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
import { Upload, Link, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

interface VideoReelFormProps {
  videoReel?: VideoReel;
  onSave: (videoReel: any) => void;
  onCancel: () => void;
}

// Mock data for destinations and packages
const mockDestinations = [
  'Everest Region',
  'Annapurna Region',
  'Kathmandu Valley',
  'Langtang Region',
  'Manaslu Region',
  'Dolpo Region',
];

const mockPackages = [
  'Everest Base Camp Trek',
  'Annapurna Circuit Trek',
  'Cultural Heritage Tour',
  'Kathmandu Day Tour',
  'Langtang Valley Trek',
  'Manaslu Circuit Trek',
];

export const VideoReelForm: React.FC<VideoReelFormProps> = ({
  videoReel,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: videoReel?.title || '',
    videoUrl: videoReel?.videoUrl || '',
    thumbnailUrl: videoReel?.thumbnailUrl || '',
    destinationTag: videoReel?.destinationTag || '',
    relatedPackage: videoReel?.relatedPackage || '',
    status: videoReel?.status || 'active',
  });
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to your storage service
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, videoUrl: url }));
    }
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to your storage service
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnailUrl: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoReel) {
      onSave({ ...videoReel, ...formData });
    } else {
      onSave(formData);
    }
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, videoUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnailUrl: '' }));
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Video Upload / URL */}
      <div className="space-y-4">
        <Label>Video Upload / URL</Label>
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={uploadMethod === 'upload' ? 'default' : 'outline'}
            onClick={() => setUploadMethod('upload')}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button
            type="button"
            variant={uploadMethod === 'url' ? 'default' : 'outline'}
            onClick={() => setUploadMethod('url')}
            size="sm"
          >
            <Link className="h-4 w-4 mr-2" />
            Video URL
          </Button>
        </div>

        {uploadMethod === 'upload' ? (
          <div className="space-y-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.mov,.webm"
              onChange={handleVideoUpload}
            />
            <p className="text-sm text-gray-500">
              Accepted formats: .mp4, .mov, .webm
            </p>
          </div>
        ) : (
          <Input
            placeholder="Enter video URL"
            value={formData.videoUrl}
            onChange={(e) => handleInputChange('videoUrl', e.target.value)}
          />
        )}

        {formData.videoUrl && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 flex-1">
              {formData.videoUrl}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Short Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Short Title *</Label>
        <Input
          id="title"
          placeholder="Enter video title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>

      {/* Destination Tag */}
      <div className="space-y-2">
        <Label>Destination Tag *</Label>
        <Select
          value={formData.destinationTag}
          onValueChange={(value) => handleInputChange('destinationTag', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select destination" />
          </SelectTrigger>
          <SelectContent>
            {mockDestinations.map((destination) => (
              <SelectItem key={destination} value={destination}>
                {destination}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Related Travel Package */}
      <div className="space-y-2">
        <Label>Related Travel Package</Label>
        <Select
          value={formData.relatedPackage}
          onValueChange={(value) => handleInputChange('relatedPackage', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select related package (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {mockPackages.map((pkg) => (
              <SelectItem key={pkg} value={pkg}>
                {pkg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Thumbnail Upload */}
      <div className="space-y-2">
        <Label>Custom Thumbnail (Optional)</Label>
        <Input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
        />
        <p className="text-sm text-gray-500">
          If not uploaded, auto-generated frame from video will be used
        </p>
        
        {formData.thumbnailUrl && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <img
              src={formData.thumbnailUrl}
              alt="Thumbnail preview"
              className="w-16 h-12 object-cover rounded"
            />
            <span className="text-sm text-gray-600 flex-1">Custom thumbnail uploaded</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeThumbnail}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div>
          <Label>Status</Label>
          <p className="text-sm text-gray-500">
            Control visibility on the website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label>Inactive</Label>
          <Switch
            checked={formData.status === 'active'}
            onCheckedChange={(checked) =>
              handleInputChange('status', checked ? 'active' : 'inactive')
            }
          />
          <Label>Active</Label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {videoReel ? 'Update Video Reel' : 'Add Video Reel'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
