import React from "react";
import ControlBar from "@/components/Layout/ControlBar";
import ProfileDropdown from "../ProfileDropdown";
import { Divider } from "antd";
import SearchBar from "../SearchBar";

const TitleBar : React.FC = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'absolute' as const,
      right: 0,
      top: 0,
      width: '100%',
      alignItems: 'center',
      userSelect: 'none',
      WebkitAppRegion: 'drag', // Enables dragging the window
    },
    noDrag: {
      WebkitAppRegion: 'no-drag', // Excludes this area from dragging
    },
    divider: {
      height: '1.6rem',
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  };

  return (
    <div style={styles.container}>
      <SearchBar />
      <ProfileDropdown/>
      <Divider type="vertical" style={styles.divider}/>
      <ControlBar/>
    </div>
  );
};

export default TitleBar;