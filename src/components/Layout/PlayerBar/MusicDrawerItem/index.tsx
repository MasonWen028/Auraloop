import HoverImage from '@/components/HoverImage';
import './index.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import PlayingImage from '@/components/PlayingImage';
import { SongType } from '@/types/main';

interface MusicDrawerItemPorps {
  song: SongType;
  onClick: (id: number) => void;
  playState: 0 | 1 | 2;
}

const MusicDrawerItem: React.FC<MusicDrawerItemPorps> = ({song, onClick, playState}) => {

  const { name, artists, cover } = song;

  const [isScrollable, setIsScrollable] = useState(false);
  const songNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  }, [name]);

  const handleClick = () => {
    onClick(song.id);
  }

  return (
    <div id={`music-drawer-item-${song.id}`} onClick={handleClick} className="music-item" style={{padding: '10px 24px'}}>
      <PlayingImage imageSrc={cover} playState={playState} className='album-cover'/>
      <div className="song-info" style={{flex: 1}}>
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
    </div>
  );
}

export default MusicDrawerItem;