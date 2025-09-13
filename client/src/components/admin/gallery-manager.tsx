import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Image } from "lucide-react";

export default function GalleryManager() {
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["/api/gallery-images"],
  });

  if (isLoading) {
    return <div>Loading gallery images...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gallery Images</h3>
        <Button data-testid="button-add-image">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      <div className="grid gap-4">
        {images.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No gallery images yet. Add your first image to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}