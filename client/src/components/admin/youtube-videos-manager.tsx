import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Video } from "lucide-react";

export default function YoutubeVideosManager() {
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["/api/youtube-videos"],
  });

  if (isLoading) {
    return <div>Loading videos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">YouTube Videos</h3>
        <Button data-testid="button-add-video">
          <Plus className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>

      <div className="grid gap-4">
        {videos.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No YouTube videos yet. Add your first video to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}