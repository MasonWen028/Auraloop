import React from "react";
import ControlBar from "@/components/Layout/ControlBar";
import ProfileDropdown from "../ProfileDropdown";
import { Divider } from "antd";
import SearchBar from "../SearchBar";
import './index.css';
import NavigationControl from "../NavigationControl";

const TitleBar : React.FC = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'absolute' as const,
      right: 0,
      left: 200,      
      top: 0,
      width: 'calc(100% - 200px)',
      alignItems: 'center',
      userSelect: 'none',
      WebkitAppRegion: 'drag',
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
    <div className={'back-drop'} style={styles.container}>
      <NavigationControl />
      <SearchBar />
      <ProfileDropdown/>
      <Divider type="vertical" style={styles.divider}/>
      <ControlBar/>
    </div>
  );
};

export default TitleBar;