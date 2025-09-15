import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Expand, Image as ImageIcon, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type GalleryImage } from "@shared/schema";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { data: galleryImages = [], isLoading, error, refetch } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
  });

  // Handle loading state
  if (isLoading) {
    return (
      <section id="gallery" className="py-20" data-testid="gallery-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">Performance Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Moments captured from live performances and musical journeys
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section id="gallery" className="py-20" data-testid="gallery-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">Performance Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Moments captured from live performances and musical journeys
            </p>
          </div>
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <p className="text-muted-foreground mb-4">
                Failed to load gallery images. Please try again.
              </p>
              <Button variant="outline" onClick={() => refetch()} data-testid="button-retry-gallery">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20" data-testid="gallery-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">Performance Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Moments captured from live performances and musical journeys
          </p>
        </div>
        
        {galleryImages.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Gallery images will be available soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item cursor-pointer"
                onClick={() => setSelectedImage(image.imageUrl)}
                data-testid={`gallery-item-${image.id}`}
              >
                <img src={image.imageUrl} alt={image.alt || 'Gallery image'} />
                <div className="gallery-overlay">
                  <Expand className="text-accent text-2xl w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          data-testid="gallery-modal"
        >
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </Modal>
      )}
    </section>
  );
}