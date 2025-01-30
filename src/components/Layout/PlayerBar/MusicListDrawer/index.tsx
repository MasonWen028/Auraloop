import { Button, Drawer, Space } from "antd"
import { useState } from "react";
import './index.css'
import Right from "@/components/SvgIcon/Right";
import MusicDrawerItem from "../MusicDrawerItem";


const MusicListDrawer = () => {

  const [musciListVisible, setMusicListVisible] = useState(true);

  const handleMusicList = () => {
    setMusicListVisible(!musciListVisible);
  };

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
      <MusicDrawerItem></MusicDrawerItem>
    </Drawer>
  )
}

export default MusicListDrawer;