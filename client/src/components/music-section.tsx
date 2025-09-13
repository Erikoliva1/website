import { useQuery } from "@tanstack/react-query";
import { Music, Video, AlertCircle } from "lucide-react";
import YouTubePlayer from "@/components/youtube-player";
import SpotifyPlayer from "@/components/spotify-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type MusicTrack, type YoutubeVideo } from "@shared/schema";

export default function MusicSection() {
  const { data: musicTracks = [], isLoading: tracksLoading, error: tracksError, refetch: refetchTracks } = useQuery<MusicTrack[]>({
    queryKey: ["/api/music-tracks"],
  });

  const { data: youtubeVideos = [], isLoading: videosLoading, error: videosError, refetch: refetchVideos } = useQuery<YoutubeVideo[]>({
    queryKey: ["/api/youtube-videos"],
  });

  // Group tracks by language (normalized to lowercase)
  const tracksByLanguage = musicTracks.reduce((acc: Record<string, MusicTrack[]>, track: MusicTrack) => {
    const language = track.language.toLowerCase().trim();
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(track);
    return acc;
  }, {});

  const renderMusicCollection = (language: string, tracks: MusicTrack[]) => (
    <div className="space-y-6" data-testid={`music-collection-${language.toLowerCase()}`}>
      <div className="flex items-center mb-4">
        <Music className="text-accent text-xl mr-3 w-6 h-6" />
        <h3 className="font-display text-xl font-semibold">{language} Collection</h3>
        <Badge variant="secondary" className="ml-2">
          {tracks.length} tracks
        </Badge>
      </div>
      
      <div className="grid gap-6">
        {tracks.map((track) => (
          <Card key={track.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>{track.title}</span>
                <div className="flex gap-2">
                  {track.spotifyId && (
                    <Badge variant="outline" className="text-green-600">
                      <Music className="h-3 w-3 mr-1" />
                      Spotify
                    </Badge>
                  )}
                  {track.youtubeId && (
                    <Badge variant="outline" className="text-red-600">
                      <Video className="h-3 w-3 mr-1" />
                      YouTube
                    </Badge>
                  )}
                </div>
              </CardTitle>
              <p className="text-sm text-muted-foreground">by {track.artist}</p>
              {track.description && (
                <p className="text-sm text-muted-foreground">{track.description}</p>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4">
              {track.spotifyId && (
                <SpotifyPlayer
                  trackId={track.spotifyId}
                  title={track.title}
                  artist={track.artist}
                />
              )}
              
              {track.youtubeId && (
                <YouTubePlayer
                  videoId={track.youtubeId}
                  title={track.title}
                />
              )}
              
              {!track.spotifyId && !track.youtubeId && (
                <div className="text-center py-8 text-muted-foreground">
                  <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Audio coming soon</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderYouTubeVideos = () => (
    <div className="space-y-6" data-testid="youtube-videos-section">
      <div className="flex items-center mb-4">
        <Video className="text-accent text-xl mr-3 w-6 h-6" />
        <h3 className="font-display text-xl font-semibold">Music Videos</h3>
        <Badge variant="secondary" className="ml-2">
          {youtubeVideos.length} videos
        </Badge>
      </div>
      
      {youtubeVideos.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-muted-foreground">
              No music videos available yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {youtubeVideos.map((video: YoutubeVideo) => (
            <Card key={video.id} className="overflow-hidden">
              <CardContent className="p-0">
                <YouTubePlayer
                  videoId={video.youtubeId}
                  title={video.title}
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  {video.description && (
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // Handle loading state
  if (tracksLoading || videosLoading) {
    return (
      <section id="music" className="py-20" data-testid="music-section">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading music content...</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (tracksError || videosError) {
    return (
      <section id="music" className="py-20" data-testid="music-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">My Music</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the melodic journey across Hindi, Bhojpuri, and Nepali musical traditions
            </p>
          </div>
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <p className="text-muted-foreground mb-4">
                Failed to load music content. Please try again.
              </p>
              <div className="flex gap-2 justify-center">
                {tracksError && (
                  <Button variant="outline" onClick={() => refetchTracks()}>
                    Retry Music
                  </Button>
                )}
                {videosError && (
                  <Button variant="outline" onClick={() => refetchVideos()}>
                    Retry Videos
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const languages = Object.keys(tracksByLanguage);
  const hasContent = musicTracks.length > 0 || youtubeVideos.length > 0;

  return (
    <section id="music" className="py-20" data-testid="music-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">My Music</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the melodic journey across Hindi, Bhojpuri, and Nepali musical traditions
          </p>
        </div>
        
        {!hasContent ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-muted-foreground">
                Music content will be available soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={languages[0] || "videos"} className="w-full">
            <TabsList className="grid w-full grid-cols-auto justify-center mb-8">
              {languages.map((language) => (
                <TabsTrigger key={language} value={language} className="capitalize">
                  {language}
                </TabsTrigger>
              ))}
              {youtubeVideos.length > 0 && (
                <TabsTrigger value="videos">
                  Music Videos
                </TabsTrigger>
              )}
            </TabsList>
            
            {languages.map((language) => (
              <TabsContent key={language} value={language} className="mt-6">
                {renderMusicCollection(language, tracksByLanguage[language])}
              </TabsContent>
            ))}
            
            {youtubeVideos.length > 0 && (
              <TabsContent value="videos" className="mt-6">
                {renderYouTubeVideos()}
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </section>
  );
}