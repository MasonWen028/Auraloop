
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import LikeIt from "@/components/LikeIt";
import { Link } from "react-router-dom";
import { MetaData } from "@/types/main";
import player from "@/utils/player";
import Lyric from "@/components/Lyric";
import { isString } from "lodash";
import { setPersonalFmMode } from "@/stores/slices/statusSlice";
import { setPlayMode } from "@/stores/slices/stateSlice";
import newPlayer from "@/utils/newPlayer";

interface SongProps {
  type: 0 | 1;
}


const Song: React.FC<SongProps> = ({type}) => {
  const dispatch = useDispatch();  

  const { playSong } = useSelector((state: any) => state.state);

  const GetCover = () => {
    let tempCover = playSong?.cover;
    if (!tempCover) {
      if (!isString(playSong?.album)) {
        tempCover = playSong?.album?.blurPicUrl;
      }
    }
    return tempCover;
  }

  const [isScrollable, setIsScrollable] = useState(false);
  

  const getSongs = () => {
    if (type === 0) {
      dispatch(setPlayMode(0));
      newPlayer.playFm(false);
    }
  }

  const songNameRef = useRef<HTMLDivElement>(null);  
  
  
  useEffect(() => {
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  }, [playSong]);

  const artists: MetaData[] = []

  useEffect(() => {
    getSongs();
  },[]);

  
  return (
    <div className="full-player">
      {/* <div  className="overlay blur">
        <img  src={GetCover()}  style={{objectFit: 'cover'}} className="overlay-img" alt="cover"/>
      </div> */}
      <div className="player-content">
      {/* Left Part: Cover and Info */}
      <div className="content-left">
        <div className="song-artist">
        <div className="player-cover cover">
          <div className="s-image cover-img">
            <img src={GetCover()} alt="image" style={{objectFit: 'cover'}} className="cover loaded"/>
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
