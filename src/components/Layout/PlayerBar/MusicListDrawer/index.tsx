import { Button, Drawer, Space } from "antd"
import React, { useEffect, useRef, useState } from "react";
import './index.css'
import Right from "@/components/SvgIcon/Right";
import MusicDrawerItem from "../MusicDrawerItem";
import { shallowEqual, useSelector } from "react-redux";
import { SongType } from "@/types/main";
import newPlayer from "@/utils/newPlayer";
import Scrollbars from "react-custom-scrollbars-2";


interface MusicListDrawerProps {
  musciListVisible: boolean;
  onClose: () => void;
}

const MusicListDrawer: React.FC<MusicListDrawerProps> = ({musciListVisible, onClose}) => {

  const playList = useSelector((state: any) => state.state.playList);

  const playSong = useSelector((state: any) => state.state.playSong);

  const playState = useSelector((state: any) => state.state.playState);

  const drawerScrollRef = useRef<Scrollbars | null>(null);

  const handleItemClick = (id: number) => {
    if (playSong.id === id) {
      if (playState === 1) {
        newPlayer.pause();
      } else {
        newPlayer.play();
      }
    } else {
      newPlayer.playSpecificSong(id);
    }
  }

  const itemsScroll = (id: number) => {
    requestAnimationFrame(()=> {
      const musicItem = document.getElementById(`music-drawer-item-${id}`);
      if  (musicItem && drawerScrollRef.current) {
        const container = musicItem.parentElement;
        if (container) {
          const scrollDistance = musicItem.offsetTop - container.offsetTop - 80;
  
          drawerScrollRef.current.scrollTop(scrollDistance);
        }
      }
    })
  };

  useEffect(()=> {
    if (musciListVisible) {
      itemsScroll(playSong.id);
    }
  },[musciListVisible, playSong.id])



  const getPlayState = (id: number) => {
    if (playState === 0)
    return 0;

    if (playSong.id === id) {
      return playState;
    } else {
      return 0;
    }
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      title=""
      placement={'right'}
      className="music-drawer"
      width={420}
      onClose={handleClose}
      closeIcon={<Right style={{color: 'white'}}></Right>}
      open={musciListVisible}
    >
      <Scrollbars
        className="none-bar-music-drawer-scroller"
        autoHide
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, display: "none" }} />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div {...props} style={{ ...style, display: "none" }} />
        )}
        ref={drawerScrollRef}>
        {
          playList && playList.map((song: SongType) => {
            return <MusicDrawerItem key={song.id} playState={getPlayState(song.id)} onClick={handleItemClick} song={song}></MusicDrawerItem>
          })
        }
      </Scrollbars>
    </Drawer>
  )
}

export default MusicListDrawer;