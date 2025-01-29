import React, { useEffect, useState } from "react";
import { Flex, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import SongActions from "./PlayerActions";
import PlayActions from "./PlayActions";
import MusicItem from "./MusicItem";
import { SongType } from "@/types/main";
import { personalFm } from "@/api/rec";
import { setPlayFmIndex, setPlayFmList, setPlaySong } from "@/stores/slices/stateSlice";

const PlayerBar: React.FC = () => {
  const { playBar } = useSelector((state: any) => state.color.value)
  // const { showSongInfo } = useSelector((state: any) => state.status);
  const { playMode } = useSelector((state: any) => state.state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playMode === 0) {
      initialFm();
    }
  },[playMode]);

  const initialFm = async() => {
    var res = await personalFm();
    dispatch(setPlayFmList(res.data));
    dispatch(setPlayFmIndex(0));
    dispatch(setPlaySong(res.data[0]));

    console.log('[INITIALIZING]');
  };

  const [favoriteSongIds, setFavoriteSongIds] = useState<number[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(69);
  const duration = 282;

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
  };

  const styles = {
    container: {
      height: '80px',
      
      backgroundColor: playBar,
      padding: "10px 20px",
      color: "white",
      position: 'absolute' as const,
      bottom: 0,
      width: '100%',
      left: 0
    },
    progressBar: {
      width: "100%",
      marginBottom: "10px",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    controlButton: {
      fontSize: "20px",
      cursor: "pointer",
      margin: "0 10px",
    },
    extraControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  

  const mockSong: SongType = {
    id: 1,
    name: "爱就一个字",
    artists: [{
      id: 0,
      name: "张信哲",
      cover: 'https://p1.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=200y200',    }],
    album: {
      id: 1,
      name: '',
      cover: ''
    },
    cover: "https://p1.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=200y200",
    duration: 240,
    free: 0,
    mv: null,
    type: "song",
    quality: "Hi-Res",
  };

  const handleFavoriteToggle = (id: number) => {
    setFavoriteSongIds((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };

 console.log("[REREND]");

  return (
    <Row style={styles.container}>
      <MusicItem song={mockSong} isFavorite={favoriteSongIds.includes(mockSong.id)}
        onFavoriteToggle={handleFavoriteToggle}/>
      
      <PlayActions/>
      <SongActions id={'testId'}/>
    </Row>
  );
};

export default PlayerBar;
