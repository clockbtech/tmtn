
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';

interface ImageUploadSectionProps {
  coverImage: string;
  galleryImages: string[];
  onCoverImageChange: (image: string) => void;
  onGalleryImagesChange: (images: string[]) => void;
}

export const ImageUploadSection = ({
  coverImage,
  galleryImages,
  onCoverImageChange,
  onGalleryImagesChange
}: ImageUploadSectionProps) => {
  const handleCoverImageUpload = () => {
    // Placeholder for file upload logic
    console.log('Cover image upload triggered');
  };

  const handleGalleryImageUpload = () => {
    // Placeholder for multiple file upload logic
    console.log('Gallery images upload triggered');
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          {coverImage ? (
            <div className="relative">
              <img src={coverImage} alt="Cover" className="max-h-48 mx-auto rounded" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => onCoverImageChange('')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Upload cover image</p>
              <Button type="button" variant="outline" size="sm" onClick={handleCoverImageUpload}>
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gallery Images</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Upload gallery images</p>
            </>
          )}
          <Button type="button" variant="outline" size="sm" onClick={handleGalleryImageUpload}>
            Add Images
          </Button>
        </div>
      </div>
    </div>
  );
};
