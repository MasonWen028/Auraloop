import PlaylistGrid from "@/components/PlaylistGrid";
import React from "react";
import './index.css';
import { RightOutlined } from "@ant-design/icons";
import Tabs from "@/components/Layout/Tabs";
import PlayAllButton from "@/components/PlayAllButton";
import SongTable from "@/components/SongTable";
import { AlbumType, ArtistType } from "@/types/main";

const playlists = [
  { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
  { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
  { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
  { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
  { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
  { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
  { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
  { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
  { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
  { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
];

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


const columns = [
  { key: "title", label: "title" },
  { key: "artist", label: "artist" },
  { key: "album", label: "album" },
  { key: "duration", label: "duration" },
];

const Discover: React.FC = () => {
  const handleCardClick = (title: string) => {
    console.log(`You clicked on playlist: ${title}`);
  };

  const handleTabChange = (index: number) => {
    console.log(`Selected Tab: ${index}`);
  };

  const handlePlayAllClick = () => {
    console.log("Play All button clicked!");
  };

  return (
    <>
      <div className="page-title">Discovery</div>
      <div className="recommend-playlist">
        Recommended Playlist
        <RightOutlined style={{color: 'rgb(93,93,93)'}}/>
      </div>
      <PlaylistGrid style={{marginTop: 20}} playlists={playlists} onCardClick={handleCardClick} />
      <Tabs
        tabs={["Top Hits", "New Releases", "Western Hits"]}
        onTabChange={handleTabChange}
      />
      <PlayAllButton style={{marginTop: 8}} text="Play All" count={45} onClick={handlePlayAllClick}/>
      <SongTable style={{marginTop: 20}} songs={songs}/>
    </>
  );
};

export default Discover;
