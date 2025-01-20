import PlaylistGrid from "@/components/PlaylistGrid";
import React from "react";
import './index.css';
import { RightOutlined } from "@ant-design/icons";
import Tabs from "@/components/Layout/Tabs";
import PlayAllButton from "@/components/PlayAllButton";
import SongTable from "@/components/SongTable";

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
  { index: 1, title: "天亮以前说再见", artist: "四喜丸子", album: "天亮以前说再见", duration: "03:53" },
  { index: 2, title: "只为你着迷", artist: "李秉成", album: "只为你着迷", duration: "03:53" },
  { index: 3, title: "一点", artist: "Muyoi, Pezzi", album: "一点", duration: "03:20" },
  { index: 4, title: "消散对白", artist: "丁雪吟", album: "消散对白", duration: "03:31" },
  { index: 5, title: "我的楼兰", artist: "云朵", album: "倔强", duration: "05:27" },
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
      <SongTable style={{marginTop: 20}} songs={songs} columns={columns} />
    </>
  );
};

export default Discover;
