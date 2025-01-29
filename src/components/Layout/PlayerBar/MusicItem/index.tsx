import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { SongType } from '@/types/main';
import LikeIt from '@/components/LikeIt';
import HoverImage from '@/components/HoverImage';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface MusicItemProps {
  song: SongType;
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ song, isFavorite, onFavoriteToggle }) => {
  
  const { playSong } = useSelector((state: any) => state.state);
  const { id, name, artists, album, cover } = playSong;


  const [isScrollable, setIsScrollable] = useState(false);
  const songNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  }, [name]);

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
      <HoverImage imageSrc={cover} route={`/`} className='album-cover'/>
      <div className="song-info">
        <div
          className={`song-name ${isScrollable ? '' : 'no-scroll'}`}
          ref={songNameRef}
        >
          {isScrollable ? (
            <>
              <span>{name}</span>
              <span>{name}</span>
            </>
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="artist-name">
        <div>
            { Array.isArray(artists) ?
              artists.map((artist, index) => (
                <React.Fragment key={artist.id}>
                  <Link
                    className="artist-name"
                    style={{ color: 'inherit' }}
                    to={`/artist/${artist.id}`}
                  >
                    {artist.name}
                  </Link>
                  {index < artists.length - 1 && ', '}
                </React.Fragment>
              )): <span>{artists}</span>
            }
          </div>
        </div>
      </div>

      <div className="favorite-icon">
        <LikeIt isLiked={isFavorite} style={{ fontSize: 24 }} />
      </div>
    </div>
  );
};

export default MusicItem;
