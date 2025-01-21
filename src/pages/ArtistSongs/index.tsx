import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { AlbumType, ArtistType } from '@/types/main';

const Artist = () => {
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

  return (
    <div className="artist-container">
      <div className="artist-songs" style={{marginTop: 0}}>
        <div className='text'>Hot Hits</div>
        <PlayAllButton text={`Play All`} count={20} />        
      </div>
      <SongTable songs={songs}/>
    </div>
  );
};

export default Artist;
