import React from "react";
import { useState, useEffect } from "react";
import { PlayCircleOutlined, HeartOutlined, ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface LeftMenuProps {
  backgroundColor: string; // Background color passed as a prop
}

const LeftMenu: React.FC<LeftMenuProps> = ({ backgroundColor }) => {
  const [bgColor, setBgColor] = useState(backgroundColor);

  useEffect(() => {
    setBgColor(backgroundColor); // Update the background dynamically when prop changes
  }, [backgroundColor]);

  const styles = {
    menuContainer: {
      width: 250,
      height: "100vh",
      backgroundColor: bgColor,
      color: "white",
      display: "flex",
      flexDirection: "column" as const,
      padding: "20px",
      position: "absolute" as const,
      top: 0,
      left: 0,
      userSelect: 'none'
    },
    logo: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    sectionTitle: {
      margin: "20px 0 10px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "rgba(255, 255, 255, 0.7)",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "10px 15px",
      borderRadius: "8px",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    menuItemHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    addPlaylist: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  const menuItems = [
    { icon: <PlayCircleOutlined />, label: "Recommended" },
    { icon: <PlayCircleOutlined />, label: "Discover" },
    { section: "My Music" },
    { icon: <HeartOutlined />, label: "Liked Songs" },
    { icon: <PlayCircleOutlined />, label: "TikTok Favorites" },
    { icon: <ClockCircleOutlined />, label: "History" },
  ];

  return (
    <div style={styles.menuContainer}>
      <div style={styles.logo}>Music App</div>
      {menuItems.map((item, index) =>
        item.section ? (
          <div key={index} style={styles.sectionTitle}>
            {item.section}
          </div>
        ) : (
          <div
            key={index}
            style={styles.menuItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = styles.menuItemHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {item.icon}
            <span style={{ marginLeft: "10px" }}>{item.label}</span>
          </div>
        )
      )}
      <div style={styles.addPlaylist}>
        <PlusOutlined />
        <span style={{ marginLeft: "10px" }}>Create Playlist</span>
      </div>
    </div>
  );
};

export default LeftMenu;
