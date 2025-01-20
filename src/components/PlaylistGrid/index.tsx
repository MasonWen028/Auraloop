import React, { CSSProperties } from "react";
import PlaylistCard from "@/components/PlaylistCard"; // Import your PlaylistCard component
import "./index.css";

interface Playlist {
  imageSrc: string;
  title: string;
}

interface PlaylistGridProps {
  playlists: Playlist[]; // Array of playlists to display
  onCardClick: (title: string) => void; // Callback for card clicks
  style?: CSSProperties
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists, onCardClick, style}) => {
  return (
    <div className="playlist-grid" style={style}>
      {playlists.map((playlist, index) => (
        <PlaylistCard
          key={index}
          imageSrc={playlist.imageSrc}
          title={playlist.title}
          onClick={() => onCardClick(playlist.title)} playlistId={0}/>
      ))}
    </div>
  );
};

export default PlaylistGrid;
