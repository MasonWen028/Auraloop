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
import Loading from "@/components/Loading";

const Discover: React.FC = () => {
  const [playlist, setPlaylist] = useState([]);

  const [songs, setSongs] = useState([]);

  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [songLoading, setSongLoading] = useState(true);

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
    setPlaylistLoading(true);
    const result = await allCatlistPlaylist("全部歌单", 10, 0, false, 0);
    setPlaylist(result.playlists);
    setPlaylistLoading(false);
  }

  const GetTopSongs = async (type: 0 | 7 | 96 | 16 | 8 = 0) => {
    setSongLoading(true);
    const result = await newSongs(type);
    setSongs(result.data);
    setSongLoading(false);
  }

  const GetPersibalizedSongs = async () => {
    setSongLoading(true);
    const result = await personalized("newsong");
    const songsArray = result.result
    .filter((item: any) => item.song) // Ensure the `song` field exists
    .map((item: any) => item.song);
    setSongs(songsArray);
    setSongLoading(false);
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
      <Loading style={{minHeight: 420, marginTop: 20}} loading={playlistLoading}>
        <PlaylistGrid playlists={playlist} />
      </Loading>
      <Tabs
        tabs={["Top Hits", "New Releases", "Western Hits"]}
        onTabChange={handleTabChange}
      />
      <Loading style={{minHeight: 250, marginTop: 20}} loading={songLoading}>
        <PlayAllButton style={{marginTop: 8}} text="Play All" count={songs.length} onClick={handlePlayAllClick}/>
        <SongTable songs={songs}/>
      </Loading>
      
    </>
  );
};

export default Discover;
