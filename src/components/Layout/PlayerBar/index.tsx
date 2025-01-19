import React, { useState } from "react";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  RetweetOutlined,
  AppstoreOutlined,
  MoreOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { Slider } from "antd";
import { useSelector } from "react-redux";
import PlayerActions from "./PlayerActions";

const PlayerBar: React.FC = () => {
  const { playBar } = useSelector((state: any) => state.color.value)

  console.log(playBar);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(69);
  const duration = 282;

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
  };

  const styles = {
    container: {
      height: '80px',
      display: "flex",
      justifyContent: 'center',
      flexDirection: "column" as const,
      alignItems: "center",
      backgroundColor: playBar,
      padding: "10px 20px",
      color: "white",
      position: 'absolute' as const,
      bottom: 0,
      width: '100%',
      left: 0
    },
    progressBar: {
      width: "100%",
      marginBottom: "10px",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    controlButton: {
      fontSize: "20px",
      cursor: "pointer",
      margin: "0 10px",
    },
    extraControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Time and Progress Bar */}
      {/* <div style={styles.progressBar}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          tooltipVisible={false}
          trackStyle={{ backgroundColor: "white" }}
          handleStyle={{ borderColor: "white", backgroundColor: "white" }}
        />
      </div> */}

      {/* Playback Controls */}
      <div style={styles.controls}>
        {/* Left Controls */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <StepBackwardOutlined style={styles.controlButton} />
          {isPlaying ? (
            <PauseCircleOutlined
              style={styles.controlButton}
              onClick={togglePlayPause}
            /> 
          ) : (
            <PlayCircleOutlined
              style={styles.controlButton}
              onClick={togglePlayPause}
            />
          )}
          <StepForwardOutlined style={styles.controlButton} />
        </div>

        {/* Right Controls */}
        <PlayerActions id={'testId'}/>
      </div>
    </div>
  );
};

export default PlayerBar;
