import PlaylistGrid from "@/components/PlaylistGrid";
import React, { useEffect, useState } from "react";
import './index.css';
import { RightOutlined } from "@ant-design/icons";
import Tabs from "@/components/Layout/Tabs";
import PlayAllButton from "@/components/PlayAllButton";
import SongTable from "@/components/SongTable";
import { AlbumType, ArtistType } from "@/types/main";
import { allCatlistPlaylist } from "@/api/playlist";
import { newSongs, personalized } from "@/api/rec";

const Discover: React.FC = () => {
  const [playlist, setPlaylist] = useState([]);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        GetAllPlaylist();
        GetTopSongs(0);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };  
    fetchData();
  }, []);

  const GetAllPlaylist = async () => {
    const result = await allCatlistPlaylist("全部歌单", 10, 0, false, 0);
    setPlaylist(result.playlists);
  }

  const GetTopSongs = async (type: 0 | 7 | 96 | 16 | 8 = 0) => {
    const result = await newSongs(type);
    setSongs(result.data);
  }

  const GetPersibalizedSongs = async () => {
    const result = await personalized("newsong");
    const songsArray = result.result
    .filter((item: any) => item.song) // Ensure the `song` field exists
    .map((item: any) => item.song);
    setSongs(songsArray);
  }

  const handleCardClick = (title: string) => {
    console.log(`You clicked on playlist: ${title}`);
  };

  const handleTabChange = (index: number) => {
    switch(index) {
      case 0:
        GetTopSongs(0);
        break;
      case 1:
        GetPersibalizedSongs();
        break;
      case 2:
        GetTopSongs(96);
        break;
    }
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
      <PlaylistGrid style={{marginTop: 20}} playlists={playlist} onCardClick={handleCardClick} />
      <Tabs
        tabs={["Top Hits", "New Releases", "Western Hits"]}
        onTabChange={handleTabChange}
      />
      <PlayAllButton style={{marginTop: 8}} text="Play All" count={songs.length} onClick={handlePlayAllClick}/>
      <SongTable style={{marginTop: 20}} songs={songs}/>
    </>
  );
};

export default Discover;
