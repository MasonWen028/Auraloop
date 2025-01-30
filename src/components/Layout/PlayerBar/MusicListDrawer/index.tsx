import { Button, Drawer, Space } from "antd"
import { useState } from "react";
import './index.css'
import Right from "@/components/SvgIcon/Right";


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
      title="Drawer with extra actions"
      placement={'right'}
      className="music-drawer"
      width={420}
      onClose={onClose}
      closeIcon={<Right style={{color: 'white', fontSize: 18}}></Right>}
      open={musciListVisible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}

export default MusicListDrawer;