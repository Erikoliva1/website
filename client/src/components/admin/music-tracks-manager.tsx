import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Music } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { type MusicTrack } from "@shared/schema";

const musicTrackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  language: z.string().min(1, "Language is required"),
  spotifyId: z.string().optional(),
  youtubeId: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  releaseDate: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

type MusicTrackForm = z.infer<typeof musicTrackSchema>;

export default function MusicTracksManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: tracks = [], isLoading } = useQuery<MusicTrack[]>({
    queryKey: ["/api/music-tracks"],
  });

  const createMutation = useMutation({
    mutationFn: (data: MusicTrackForm) =>
      apiRequest("/api/admin/music-tracks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music-tracks"] });
      setIsDialogOpen(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MusicTrackForm> }) =>
      apiRequest(`/api/admin/music-tracks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music-tracks"] });
      setIsDialogOpen(false);
      setEditingTrack(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/admin/music-tracks/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music-tracks"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MusicTrackForm>({
    resolver: zodResolver(musicTrackSchema),
    defaultValues: {
      title: "",
      artist: "Prabhat Yadav",
      language: "",
      spotifyId: "",
      youtubeId: "",
      description: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const onSubmit = (data: MusicTrackForm) => {
    if (editingTrack) {
      updateMutation.mutate({ id: editingTrack.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (track: any) => {
    setEditingTrack(track);
    setValue("title", track.title);
    setValue("artist", track.artist);
    setValue("language", track.language);
    setValue("spotifyId", track.spotifyId || "");
    setValue("youtubeId", track.youtubeId || "");
    setValue("description", track.description || "");
    setValue("isActive", track.isActive);
    setValue("sortOrder", track.sortOrder);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this track?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTrack(null);
    reset();
  };

  if (isLoading) {
    return <div>Loading tracks...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Music Tracks</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-track">
              <Plus className="h-4 w-4 mr-2" />
              Add Track
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTrack ? "Edit Track" : "Add New Track"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  data-testid="input-track-title"
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  {...register("artist")}
                  data-testid="input-track-artist"
                />
                {errors.artist && (
                  <p className="text-sm text-red-600">{errors.artist.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={watch("language")}
                  onValueChange={(value) => setValue("language", value)}
                >
                  <SelectTrigger data-testid="select-track-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Bhojpuri">Bhojpuri</SelectItem>
                    <SelectItem value="Nepali">Nepali</SelectItem>
                  </SelectContent>
                </Select>
                {errors.language && (
                  <p className="text-sm text-red-600">{errors.language.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="spotifyId">Spotify Track ID (optional)</Label>
                <Input
                  id="spotifyId"
                  placeholder="e.g., 4uLU6hMCjMI75M1A2tKUQC"
                  {...register("spotifyId")}
                  data-testid="input-track-spotify"
                />
              </div>

              <div>
                <Label htmlFor="youtubeId">YouTube Video ID (optional)</Label>
                <Input
                  id="youtubeId"
                  placeholder="e.g., dQw4w9WgXcQ"
                  {...register("youtubeId")}
                  data-testid="input-track-youtube"
                />
              </div>

              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  data-testid="textarea-track-description"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-track"
                >
                  {editingTrack ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tracks.map((track) => (
          <Card key={track.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{track.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    by {track.artist}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(track)}
                    data-testid={`button-edit-track-${track.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(track.id)}
                    data-testid={`button-delete-track-${track.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{track.language}</Badge>
                {track.spotifyId && (
                  <Badge variant="outline" className="text-green-600">
                    <Music className="h-3 w-3 mr-1" />
                    Spotify
                  </Badge>
                )}
                {track.youtubeId && (
                  <Badge variant="outline" className="text-red-600">
                    YouTube
                  </Badge>
                )}
                {!track.isActive && <Badge variant="destructive">Inactive</Badge>}
              </div>
              {track.description && (
                <p className="text-sm text-muted-foreground">
                  {track.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
        {tracks.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No music tracks yet. Add your first track to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}