import { dailyRecommend, personalFm } from "@/api/rec";
import { setPlaylistType } from "@/stores/slices/dataSlicce";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import LikeIt from "@/components/LikeIt";
import { Link } from "react-router-dom";

interface SongProps {
  type: 0 | 1;
}


const Song: React.FC<SongProps> = ({type}) => {
  const {playlistType} = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  const [isScrollable, setIsScrollable] = useState(false);
  
  console.log(playlistType);

  const getSongs = async () => {
    
    if (type === 0) {
      var res = await personalFm();
      console.log(res);
    }
  }

  const songNameRef = useRef<HTMLDivElement>(null);

  

  const cover = "http://p2.music.126.net/ELGjJ9NSncvWjLlXl3OEZg==/109951168500844175.jpg?param=140y140";
  
  const title = "Soviet March", artist = "James Hannigan", likes = undefined;
  const lyrics = undefined;
  const artists = [{
    name: "James Hannigan",
    id: 1,
  },{
    name: 'Jam',
    id: 2
  }]


  useEffect(()=> {
    if (songNameRef.current) {
      const isOverflowing =
        songNameRef.current.scrollWidth > songNameRef.current.offsetWidth;
      setIsScrollable(isOverflowing);
    }
  },[title]);


  useEffect(() => {
    if (type && type !== playlistType) {
      dispatch(setPlaylistType(type));
    }
    getSongs();    
  }, [type, playlistType, dispatch]);

  
  return (
    <div className="full-player">
      <div  className="overlay blur">
        <img  src={cover} className="overlay-img" alt="cover"/>
      </div>
      <div className="player-content">
      {/* Left Part: Cover and Info */}
      <div className="content-left">
        <div className="player-cover cover">
          <div className="s-image cover-img">
            <img src="https://p2.music.126.net/9989DWE1MdbpzxSbGX0RaQ==/650910883689775.jpg?param=1024y1024" alt="image" className="cover loaded"/>
          </div>
          <video 
            src="http://dcover.music.126.net/fdcc/eab3/8ceb/8bd304fb35ce438631730725a0272782.mp4?wsSecret=ae6f5c850800d0216548b436b5cabf7f&amp;wsTime=1737957443" 
            className="dynamic-cover loaded" 
            autoPlay={true}>
          </video>
        </div>
        <div className="player-data cover">
        <div
          className="name"
          ref={songNameRef}
        >
          <span className={`name-text text-hidden ${isScrollable ? '' : 'no-scroll'}`}>{title}</span>
          <div>
            {
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
              ))}
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
        <p>{lyrics || "No lyrics available."}</p>
      </div>
      </div>
    </div>
  );
};

export default Song;
