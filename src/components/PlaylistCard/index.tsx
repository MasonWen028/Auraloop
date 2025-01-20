import React from "react";
import "./index.css";
import { Card } from "antd";

const { Meta } = Card;

interface PlaylistCardProps {
  imageSrc: string; // URL of the playlist image
  playlistId: number;
  title: string; // Title of the playlist
  description?: string; // Optional description of the playlist
  onClick: () => void; // Action when the card is clicked
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  imageSrc,
  title,
  onClick,
}) => {
  return (
    <>
      <div className="playlist-card" onClick={onClick}>
        <div className="playlist-image">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="playlist-info">
          <h3 className="playlist-title">{title}</h3>
        </div>
      </div>
     
    </>
  );
};

export default PlaylistCard;
