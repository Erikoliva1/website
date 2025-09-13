import { useState } from "react";
import { Play, ExternalLink, Music } from "lucide-react";

interface SpotifyPlayerProps {
  trackId: string;
  title: string;
  artist: string;
  className?: string;
}

export default function SpotifyPlayer({ trackId, title, artist, className = "" }: SpotifyPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const spotifyUrl = `https://open.spotify.com/track/${trackId}`;
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative rounded-lg overflow-hidden bg-gradient-to-r from-green-400 to-green-600 ${className}`}>
      {!isLoaded ? (
        // Spotify-style preview card
        <div className="relative p-6 group cursor-pointer" onClick={handlePlay}>
          <div className="flex items-center space-x-4">
            <div className="bg-black bg-opacity-20 rounded-full p-3 group-hover:bg-opacity-30 transition-all duration-300">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-green-100">{artist}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePlay}
                className="bg-white text-green-600 rounded-full p-3 hover:scale-110 transition-transform duration-300"
                data-testid={`spotify-play-${trackId}`}
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-70 hover:opacity-100 transition-opacity p-3"
                onClick={(e) => e.stopPropagation()}
                data-testid={`spotify-external-link-${trackId}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        // Embedded Spotify player
        <iframe
          src={embedUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
          title={`${title} by ${artist}`}
          className="rounded-lg"
          data-testid={`spotify-iframe-${trackId}`}
        />
      )}
    </div>
  );
}