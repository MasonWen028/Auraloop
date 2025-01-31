import { Button, Drawer, Space } from "antd"
import { useState } from "react";
import './index.css'
import Right from "@/components/SvgIcon/Right";
import MusicDrawerItem from "../MusicDrawerItem";
import { shallowEqual, useSelector } from "react-redux";
import { SongType } from "@/types/main";
import newPlayer from "@/utils/newPlayer";


const MusicListDrawer = () => {

  const [musciListVisible, setMusicListVisible] = useState(true);

  const playList = useSelector((state: any) => state.state.playList);

  const playSong = useSelector((state: any) => state.state.playSong);

  const playState = useSelector((state: any) => state.state.playState);

  const handleMusicList = () => {
    setMusicListVisible(!musciListVisible);
  };

  const handleItemClick = (id: number) => {
    if (playSong.id === id) {
      if (playState === 1) {
        newPlayer.pause();
      } else {
        newPlayer.play();
      }
    } else {
      //TODO play specific song
    }
  }

  const getPlayState = (id: number) => {
    if (playState === 0)
    return 0;

    if (playSong.id === id) {
      return playState;
    } else {
      return 0;
    }
  }

  const onClose = () => {
    setMusicListVisible(false);
  };

  return (
    <Drawer
      title=""
      placement={'right'}
      className="music-drawer"
      width={420}
      onClose={onClose}
      closeIcon={<Right style={{color: 'white'}}></Right>}
      open={musciListVisible}
    >
      {
        playList && playList.map((song: SongType) => {
          return <MusicDrawerItem playState={getPlayState(song.id)} onClick={handleItemClick} song={song}></MusicDrawerItem>
        })
      }
    </Drawer>
  )
}

export default MusicListDrawer;