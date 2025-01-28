import { Dropdown, MenuProps } from "antd";
import More from "../SvgIcon/More";
import './index.css'
import { HeartFilled, LikeFilled, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface SongActionsProps {
  artistId?: number,
  albumId?: number
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: "Play Next", // English
  },
  {
    key: '2',
    label: "Add to Playlist", // English
    children: [
      { key: '21', label: 'Create New Playlist', icon: <PlusOutlined/>,className: 'song-actions-sub' },
      { key: '22', label: 'Favorite Songs', icon: <HeartFilled/>, className: 'song-actions-sub' }
      //TODO loading created playlist her
    ]
  },
  {
    key: '3',
    label: "View Artist", // English
  },
  {
    key: '4',
    label: "View Album", // English
  },
  {
    key: '5',
    label: "Share", // English
  },
];

const SongActions: React.FC<SongActionsProps> = ({artistId, albumId}) => {
  const navigate = useNavigate();
  const onClick = ({ key }: any) => {
    if (key === '3' && artistId) {
      navigate(`/artist/${artistId}`);
    } else if (key === '4' && albumId) {
      navigate(`/album/${albumId}`);
    }
  };
  return (
    <Dropdown overlayClassName="song-actions" menu={{items, onClick}} trigger={['click']} placement="bottomRight">
      <More className="action-btn"/>
    </Dropdown>
  );
}

export default SongActions;