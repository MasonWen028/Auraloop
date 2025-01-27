import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { SongItem } from '@/types/main';
import LikeIt from '@/components/LikeIt';
import HoverImage from '@/components/HoverImage';

interface MusicItemProps {
  song: SongItem;
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ song, isFavorite, onFavoriteToggle }) => {
  const { id, name, artists, album, cover } = song;
  const [isScrollable, setIsScrollable] = useState(false);
  const songNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the song name overflows the container
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  }, [name]); // Recheck when `name` changes

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLikeToggle = (isLiked: boolean) => {
    onFavoriteToggle(id);
  };

  return (
    <div className="music-item">
      <HoverImage imageSrc={cover} route='' className='album-cover'/>
      {/* <img src={cover} alt={album} className="album-cover" /> */}
      <div className="song-info">
        <div
          className={`song-name ${isScrollable ? '' : 'no-scroll'}`}
          ref={songNameRef}
        >
          {/* Render a single span or scrolling spans based on the overflow state */}
          {isScrollable ? (
            <>
              <span>{name}</span>
              <span>{name}</span>
            </>
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="artist-name">{artists[0].name}</div>
      </div>

      <div className="favorite-icon">
        <LikeIt isLiked={isFavorite} style={{ fontSize: 24 }} />
      </div>
    </div>
  );
};

export default MusicItem;
