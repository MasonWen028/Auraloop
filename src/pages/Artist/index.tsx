import './index.css';
import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { AlbumType, ArtistType, SongItem } from '@/types/main';
import { RightOutlined } from '@ant-design/icons';
import PlaylistGrid from '@/components/PlaylistGrid';
import { Link } from 'react-router-dom';
import Brief from '@/components/Brief';
import { useParams } from "react-router-dom";
import { artistAblums, artistDetail, artistHotSongs } from '@/api/artist';
import { useEffect, useState } from 'react';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import Loading from '@/components/Loading';

const Artist = () => {
  const [artist, setArtist] = useState<ArtistType>();

  const [playlist, setPlaylist] =  useState([]);

  const [songs, setSongs] = useState<SongItem[]>([]);

  const [songLoading, setSongLoading] = useState(true);
  const [albumLoading, setAlbumLoading] = useState(true);

  const handleCardClick = (title: string) => {
    console.log(`You clicked on playlist: ${title}`);
  };
  const { artistId } = useParams(); 
  const numericId = Number(artistId);

  if (isNaN(numericId)) {
    console.error("Invalid ID format");
    return <div>Invalid Artist ID</div>;
  }

  const getArtistDetail = async () => {
    const result = await artistDetail(numericId);
    setArtist(result.data.artist);
  }

  const getArtistFanCnt = async () => {
    //const result = await artistDetail(numericId);
  }

  const getAritstHotSongs = async () => {
    setSongLoading(true);
    const result = await artistHotSongs(numericId);
    setSongs(result.songs.slice(0, 5));
    setSongLoading(false);
  };

  const getAritstHotAlbums = async () => {
    setAlbumLoading(true);
    const result = await artistAblums(numericId);
    setPlaylist(result.hotAlbums);
    setAlbumLoading(false);
  }

  useEffect(() => {
    getArtistDetail();

    getArtistFanCnt();

    getAritstHotSongs();

    getAritstHotAlbums();

    const container = document.querySelector(".page-content");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [artistId]);
  

  return (
    <div className="artist-container">
      <div className="artist-header">
        {/* <img
          className="artist-image"
          src={artist?.avatar}
          alt="Artist"
        /> */}
        <ImageWithSkeleton
          className="artist-image"
          src={artist?.avatar}
          alt="Artist"></ImageWithSkeleton>
        <div className="artist-info">
          <h2>{artist?.name}</h2>
          <div className="count">580 关注 · 300w+ 粉丝</div>
          <div className='follow'>
            <button className="follow-button">关注</button>
          </div>
          <Brief style={{marginTop: 20}}> 
           {artist?.briefDesc}
          </Brief>
        </div>
      </div>
      <div className="artist-songs">
        <div className='text'>Hot Hits</div>
        <PlayAllButton text={`Play All`} count={songs.length} disabled={songLoading}/>        
      </div>
      <Loading style={{height: 500}} loading={songLoading && albumLoading}>
        <SongTable songs={songs}/>
        <Link to={`/artist/${artistId}/songs`}>
        <div className="show-all-hits">
          Show All
          <RightOutlined style={{color: 'rgb(93,93,93)'}}/>
        </div>
        </Link>
        <div className="artist-songs">
            <div className='text'>Hot Albums</div>      
        </div>
        <PlaylistGrid playlists={playlist} />
      </Loading>
    </div>
  );
};

export default Artist;
