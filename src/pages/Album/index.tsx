import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { AlbumType, ArtistType } from '@/types/main';
import LikeIt from '@/components/LikeIt';

interface AlbumProps {
  type: 1 | 2 | 3; // 1 for favorites 2 for album 3 userown
}

const Album: React.FC<AlbumProps> = ({type}) => {
  const songs = [
    {
      id: 1,
      title: "天亮以前说再见",
      artist: {
        id: 1,
        name: "四喜丸子",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 5,
        musicSize: 20,
        fansSize: 2000,
      } as ArtistType,
      album: {
        id: 101,
        name: "天亮以前说再见",
        cover: "/images/albums/101.jpg",
        songCount: 10,
        releaseDate: "2020-01-01",
      } as AlbumType,
      duration: "03:53",
    },
    {
      id: 2,
      title: "只为你着迷",
      artist: {
        id: 2,
        name: "李秉成",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 3,
        musicSize: 15,
        fansSize: 1500,
      } as ArtistType,
      album: {
        id: 102,
        name: "只为你着迷",
        cover: "/images/albums/102.jpg",
        songCount: 12,
        releaseDate: "2021-05-01",
      } as AlbumType,
      duration: "03:53",
    },
    {
      id: 3,
      title: "一点",
      artist: {
        id: 3,
        name: "Muyoi, Pezzi",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 2,
        musicSize: 8,
        fansSize: 500,
      } as ArtistType,
      album: {
        id: 103,
        name: "一点",
        cover: "/images/albums/103.jpg",
        songCount: 8,
        releaseDate: "2022-03-15",
      } as AlbumType,
      duration: "03:20",
    },
    {
      id: 4,
      title: "消散对白",
      artist: {
        id: 4,
        name: "丁雪吟",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 1,
        musicSize: 5,
        fansSize: 800,
      } as ArtistType,
      album: {
        id: 104,
        name: "消散对白",
        cover: "/images/albums/104.jpg",
        songCount: 7,
        releaseDate: "2020-11-20",
      } as AlbumType,
      duration: "03:31",
    },
    {
      id: 5,
      title: "我的楼兰",
      artist: {
        id: 5,
        name: "云朵",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 10,
        musicSize: 50,
        fansSize: 10000,
      } as ArtistType,
      album: {
        id: 105,
        name: "倔强",
        cover: "/images/albums/105.jpg",
        songCount: 15,
        releaseDate: "2018-08-08",
      } as AlbumType,
      duration: "05:27",
    },
  ];
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
      <div className="artist-header">
        <img
          className="artist-image"
          src="http://p2.music.126.net/oJorrgJ3IotZUAbZkBMuFw==/109951167771736533.jpg?param=130y130"
          alt="Artist"
        />
        <div className="artist-info">
          <h2>新的心跳</h2>
          <div className="count">G.E.M 邓紫棋</div>
          <div className='follow' style={styles.playAll}>
            <PlayAllButton text={`Play All`} count={20} />
            <div style={{display: 'flex', alignItems: 'center',gap: 10}}>
              <LikeIt style={{ fontSize: 24 }} isLiked={false}></LikeIt>
              <span style={{color: '#656565'}}>1616</span>
            </div>
          </div>
        </div>
      </div>
      <SongTable songs={songs} inAlbum={true}/>
      <div style={styles.publishedDate}>Published Date: {'2023-03-17'}</div>
      <div style={styles.publishedBy}>Epidemic Sound</div>
    </div>
  );
};

export default Album;
