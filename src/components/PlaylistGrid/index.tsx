import React, { CSSProperties } from "react";
import PlaylistCard from "@/components/PlaylistCard"; // Import your PlaylistCard component
import "./index.css";

interface Playlist {
  coverImgUrl: string;
  blurPicUrl: string;
  name: string;
  id: number;
}

interface PlaylistGridProps {
  playlists: Playlist[]; // Array of playlists to display
  onCardClick: (name: string) => void; // Callback for card clicks
  style?: CSSProperties
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists, onCardClick, style}) => {
  return (
    <div className="playlist-grid" style={style}>
      {playlists.map((playlist, index) => (
        <PlaylistCard
          key={index}
          imageSrc={playlist.coverImgUrl || playlist.blurPicUrl}
          title={playlist.name}
          onClick={() => onCardClick(playlist.name)} playlistId={playlist.id}/>
      ))}
    </div>
  );
};

export default PlaylistGrid;
