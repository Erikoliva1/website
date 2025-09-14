import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubePlayer({ videoId, title, className = "" }: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden bg-muted ${className}`}>
      {!isLoaded ? (
        // Thumbnail with play button
        <div className="relative w-full h-full group cursor-pointer" onClick={handlePlay}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to default YouTube thumbnail if maxres fails
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
            <div className="bg-destructive rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-destructive-foreground fill-destructive-foreground ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-lg drop-shadow-lg">{title}</h3>
          </div>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
            data-testid={`youtube-external-link-${videoId}`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      ) : (
        // Embedded iframe
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          data-testid={`youtube-iframe-${videoId}`}
        />
      )}
    </div>
  );
}