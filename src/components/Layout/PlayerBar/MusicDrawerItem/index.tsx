import HoverImage from '@/components/HoverImage';
import './index.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import PlayingImage from '@/components/PlayingImage';


const MusicDrawerItem = () => {

  const { playSong, playFmList, playList, playMode } = useSelector((state: any) => state.state);
  const { id, name, artists, album, cover } = playSong;

  const [musicItems] = useState(playMode===0? playFmList: playList);

  const [isScrollable, setIsScrollable] = useState(false);
  const songNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  }, [name]);

  return (
    <div className="music-item">
      <PlayingImage imageSrc={cover} playState={2} className='album-cover'/>
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
    </div>
  );
}

export default MusicDrawerItem;