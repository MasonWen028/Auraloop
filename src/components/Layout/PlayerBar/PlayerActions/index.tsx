import { AppstoreOutlined, DislikeOutlined, LikeOutlined, MoreOutlined, RetweetOutlined, ShareAltOutlined, SoundOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Space } from "antd";
import './index.css';
import Lyric from "@/components/SvgIcon/Lyric";
import Cycle from "@/components/SvgIcon/Cycle";
import VolumeSlider from "../VolumeSlider";
import MusicList from "@/components/SvgIcon/MusicList";
import MoreAction from "../MoreAction";
import Share from "@/components/SvgIcon/Share";
import Dislike from "@/components/SvgIcon/Dislike";

interface OptionsProps {
  id: string
}

const SongActions = ({ id }: OptionsProps) => {
  console.log(id);
  return <>
    <Space style={{flex: 1, justifyContent: 'end', justifyItems: 'end'}} size={"middle"} className="small-gap">
      <Share className="action-btn"/>
      <Dislike className="action-btn"/>
      <Lyric className="action-btn"/>
      <Cycle className="action-btn"/>
      <VolumeSlider/>
      <MusicList className="action-btn"/>
      <MoreAction/>
    </Space>
  </>
}

export default SongActions;