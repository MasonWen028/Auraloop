import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { AlbumType, ArtistType, SongItem } from '@/types/main';
import LikeIt from '@/components/LikeIt';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { albumDetail } from '@/api/album';
import { useParams } from 'react-router-dom';
import { playlistDetail } from '@/api/playlist';
import { useSelector } from 'react-redux';
import { songDetail } from '@/api/song';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';

interface AlbumProps {
  type: 1 | 2 | 3; // 1 for favorites 2 for album 3 userown
}

const Album: React.FC<AlbumProps> = ({type}) => {  
  const [albumSongs, setAlbumSongs] = useState<SongItem[]>([]);
  const [songLoading, setSongLoading] = useState(true);
  const [albumDetails, setAlbumDetails] = useState<AlbumType>();

  const { userLikeData, userData } = useSelector((state: any) => state.data);

  const { songs } = userLikeData
  const { albumId } = useParams();

  const numericId = Number(albumId);

  if (isNaN(numericId) && type === 2) {
    console.error("Invalid ID format");
    return <div>Invalid Artist ID</div>;
  }

  const getAlbumDetails = async () => {
    setSongLoading(true);
    if(type === 2) {
      const res = await playlistDetail(numericId);
      setAlbumDetails(res.playlist);
      setAlbumSongs(res.playlist.tracks);
    } else {
      const res = await songDetail(songs);
      console.log(res);
      setAlbumSongs(res.songs);
    }
    
    setSongLoading(false);
  }

  useEffect(()=> {
    getAlbumDetails();
  }, []);

  const styles = {
    playAll: {
      flex: 1,
      alignItems: 'center',
      gap: 20
    },
    publishedDate: {
      marginTop: 10,
      color: '#5c5c5c',
      fontSize: 12
    },
    publishedBy: {
      color: '#5c5c5c',
      fontSize: 12
    }
  }

  return (
    <div className="artist-container">
      <Loading loading={songLoading} style={{height: 600}}>
        <div className="artist-header">
        {
            type === 1 && <ImageWithSkeleton className="artist-image" src={albumSongs[0]?.al.picUrl}
            alt="Artist"
          />
          }
          {
            type === 2 && <ImageWithSkeleton className="artist-image" src={albumDetails?.coverImgUrl}
            alt="Artist"
          />
          }
          <div className="artist-info">
            {
              type === 1 && <h2>{userData.name}</h2>
            }
            {
              type === 2 && <h2>{albumDetails?.name}</h2>
            }

            
            <div className="count">{albumDetails?.creator?.nickname}</div>
            <div className='follow' style={styles.playAll}>
              <PlayAllButton text={`Play All`} count={20} />
              <div style={{display: 'flex', alignItems: 'center',gap: 10}}>
                <LikeIt style={{ fontSize: 24 }} isLiked={false}></LikeIt>
                <span style={{color: '#656565'}}>{albumDetails?.subscribedCount}</span>
              </div>
            </div>
          </div>
        </div>
        
          <SongTable songs={albumSongs} inAlbum={true}/>
        
        <div style={styles.publishedDate}>Published Date: {'2023-03-17'}</div>
        <div style={styles.publishedBy}>Epidemic Sound</div>
      </Loading>
    </div>
  );
};

export default Album;
