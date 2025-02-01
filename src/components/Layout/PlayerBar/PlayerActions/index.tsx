import { AppstoreOutlined, DislikeOutlined, LikeOutlined, MoreOutlined, RetweetOutlined, ShareAltOutlined, SoundOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Button, Drawer, Space } from "antd";
import './index.css';
import Lyric from "@/components/SvgIcon/Lyric";
import Cycle from "@/components/SvgIcon/Cycle";
import VolumeSlider from "../VolumeSlider";
import MusicList from "@/components/SvgIcon/MusicList";
import MoreAction from "../MoreAction";
import Share from "@/components/SvgIcon/Share";
import Dislike from "@/components/SvgIcon/Dislike";
import { useState } from "react";
import MusicListDrawer from "../MusicListDrawer";

const SongActions = () => {
 const [musicListVisible, setMusicVisible] = useState(false);
  const handleMusicListClose = () => {
    setMusicVisible(false);
  }

  const handleMusicListVisible = () => {
    setMusicVisible(!musicListVisible);
  }

  return <>
    <MusicListDrawer musciListVisible={musicListVisible} onClose={handleMusicListClose}/>
    <Space style={{flex: 1, justifyContent: 'end', justifyItems: 'end'}} size={"middle"} className="small-gap">
      <Share className="action-btn"/>
      <Dislike className="action-btn"/>
      <Lyric className="action-btn"/>
      <Cycle className="action-btn"/>
      <VolumeSlider/>
      <MusicList className="action-btn" onClick={handleMusicListVisible}/>
      <MoreAction/>
    </Space>
  </>
}

export default SongActions;