import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // Import for routing
import { PlayCircleOutlined, HeartOutlined, ClockCircleOutlined, PlusOutlined, TikTokOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Music from "@/components/SvgIcon/Music";
import Earphone from "@/components/SvgIcon/Earphone";
import CreatePlaylistModal from "@/components/CreatePlaylist";
import { handleRouteColorChange } from '@/utils/routeUtils';

const LeftMenu: React.FC = () => {
  const { playBar, sideBar } = useSelector((state: any) => state.color.value);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    handleRouteColorChange(location.pathname, dispatch, playBar);
  }, [location.pathname, dispatch, playBar]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreatePlaylist = (playlistName: string, isPrivate: boolean) => {
    console.log(`Creating playlist: ${playlistName}, Private: ${isPrivate}`);
    setIsModalVisible(false);
    // Add API call here to save the playlist to the backend
  };

  const [playlists, setPlaylists] = useState<Array<{ id: string; name: string }>>([
    {
      id: '233',
      name: '测试一下看看'
    }
  ]);

  useEffect(() => {
    // Fetch playlists from the backend
    const fetchPlaylists = async () => {
      try {
        //setPlaylists([]);
        //todo replace it with real interface
      } catch (error) {
        console.error("Failed to fetch playlists", error);
      }
    };

    fetchPlaylists();
  }, []);
  
  const styles = {
    menuContainer: {
      width: 200,
      backgroundColor: sideBar,
      color: "white",
      display: "flex",
      flexDirection: "column" as const,
      padding: "20px 16px 20px 16px",
      position: "absolute" as const,
      top: 0,
      left: 0,
      bottom: '80px',
      userSelect: "none",
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    logo: {
      marginTop: '40px',
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    sectionTitle: {
      margin: "30px 0 10px",
      fontSize: "14px",
      fontWeight: "bold",
      color: '#909398',
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      textDecoration: "none", // Removes underline from links
      color: "white", // Ensures text color matches the menu style
      marginTop: 6,
    },
    activeMenuItem: {
      backgroundColor: "rgba(170, 170, 170, 0.3)", // Active background color
    },
    hoverMenuItem: {
      backgroundColor: "rgba(170, 170, 170, 0.2)", // Slightly lighter for hover
    },
    addPlaylist: {
      marginTop: '30px',
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      color: '#909398',
      justifyContent: 'space-between'
    },
  };

  const menuItems = [
    { path: "/recommended", icon: <PlayCircleOutlined />, label: "Recommended" },
    { path: "/discover", icon: <Earphone />, label: "Discover" },
    { section: "My Music" },
    { path: "/album/favorites", icon: <HeartOutlined />, label: "Liked Songs" },
    { path: "/tiktok-favorites", icon: <TikTokOutlined />, label: "TikTok Favor" },
    { path: "/history", icon: <ClockCircleOutlined />, label: "History" },
  ];

  return (
    <div style={styles.menuContainer}>
      <div style={styles.logo}>
        <Music style={{width: 32, height: 32}}></Music>AuraLoop
      </div>
      {menuItems.map((item, index) =>
        item.section ? (
          <div key={index} style={styles.sectionTitle}>
            {item.section}
          </div>
        ) : (
          <Link
            key={index}
            to={item.path as string} // Navigate to the target path
            style={{
              ...styles.menuItem,
              ...(location.pathname === item.path ? styles.activeMenuItem : {}),
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = location.pathname === item.path
                ? styles.activeMenuItem.backgroundColor
                : styles.hoverMenuItem.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                location.pathname === item.path ? styles.activeMenuItem.backgroundColor : "transparent")
            }
          >
            {item.icon}
            <span style={{ marginLeft: "10px" }}>{item.label}</span>
          </Link>
        )
      )}
      <div style={styles.addPlaylist}>
        <span style={{ marginLeft: "10px" }}>Create Playlist</span>
        <PlusOutlined onClick={handleOpenModal}/>
      </div>
      <div>
          {/* Render playlists */}
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              style={{
                ...styles.menuItem,
                ...(location.pathname === `/playlist/${playlist.id}` ? styles.activeMenuItem : {}),
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.hoverMenuItem.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <UnorderedListOutlined style={{ marginRight: "10px" }} />
              {playlist.name}
            </Link>
          ))}
      </div>

      <CreatePlaylistModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
};

export default LeftMenu;
