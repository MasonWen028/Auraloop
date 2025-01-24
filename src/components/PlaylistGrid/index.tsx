import React, { CSSProperties } from "react";
import PlaylistCard from "@/components/PlaylistCard"; // Import your PlaylistCard component
import "./index.css";
import { useNavigate } from "react-router-dom";

interface Playlist {
  coverImgUrl: string;
  blurPicUrl: string;
  name: string;
  id: number;
}

interface PlaylistGridProps {
  playlists: Playlist[]; // Array of playlists to display
  style?: CSSProperties
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists, style}) => {
  
  const navigate = useNavigate();

  const showAlbum = (id: number) => {
    navigate("/album/" + id);
  }
  
  return (
    <div className="playlist-grid" style={style}>
      {playlists.map((playlist, index) => (
        <PlaylistCard
          key={index}
          imageSrc={playlist.coverImgUrl || playlist.blurPicUrl}
          title={playlist.name}
          onClick={() => showAlbum(playlist.id)} playlistId={playlist.id}/>
      ))}
    </div>
  );
};

export default PlaylistGrid;
