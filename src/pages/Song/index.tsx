
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import LikeIt from "@/components/LikeIt";
import { Link } from "react-router-dom";
import { MetaData } from "@/types/main";
import player from "@/utils/player";
import Lyric from "@/components/Lyric";

interface SongProps {
  type: 0 | 1;
}


const Song: React.FC<SongProps> = ({type}) => {
  const dispatch = useDispatch();

  
  

  const { playSong } = useSelector((state: any) => state.music);

  const { personalFmMode } = useSelector((state: any) => state.status);

  console.log(playSong);

  const [isScrollable, setIsScrollable] = useState(false);
  

  const getSongs = () => {
    if (type === 0) {
      player.initPersonalFM();
      player.initPlayer();
    }
  }

  const songNameRef = useRef<HTMLDivElement>(null);   

  const artists: MetaData[] = []

  // useEffect(()=> {
  //   if (songNameRef.current) {
  //     const isOverflowing =
  //       songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
  //     setIsScrollable(isOverflowing);
  //   }
  // },[title]);

  useEffect(() => {
    getSongs();
  },[]);

  
  return (
    <div className="full-player">
      <div  className="overlay blur">
        <img  src={playSong.cover}  style={{objectFit: 'cover'}} className="overlay-img" alt="cover"/>
      </div>
      <div className="player-content">
      {/* Left Part: Cover and Info */}
      <div className="content-left">
        <div className="player-cover cover">
          <div className="s-image cover-img">
            <img src={playSong.cover} alt="image" style={{objectFit: 'cover'}} className="cover loaded"/>
          </div>
        </div>
        <div className="player-data cover">
        <div
          className="name"
          ref={songNameRef}
        >
          <span className={`name-text text-hidden ${isScrollable ? '' : 'no-scroll'}`}>{playSong.name}</span>
          <div>
            {
              Array.isArray(playSong.artists) ? playSong.artists.map((artist: MetaData, index: number) => (
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
              )):<span>{playSong.artists}</span>
            }
          </div>
        </div>
          <div className="like">
            <LikeIt tipStyle={{fontSize: 10}} isLiked={false}>
              1W+
            </LikeIt>
          </div>
        </div>
      </div>
      {/* Right Part: Lyrics */}
      <div className="content-right">
        <Lyric></Lyric>
      </div>
      </div>
    </div>
  );
};

export default Song;
