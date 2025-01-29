import React, { useState, useEffect } from "react";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Mute from "@/components/SvgIcon/Mute";
import Volume from "@/components/SvgIcon/Volume";
import newPlayer from "@/utils/newPlayer";
import { setPlayVolume, setPlayerMuted } from "@/stores/slices/stateSlice";
const VolumeSlider: React.FC = () => {
  const dispatch = useDispatch();
  const playVolume = useSelector((state: any) => state.state.playVolume);
  const { playBar } = useSelector((state: any) => state.color.value);

  const [isSliderVisible, setIsSliderVisible] = useState(false); // Toggle slider visibility
  const [muted, setMuted] = useState(playVolume === 0);
  const [lastVolume, setLastVolume] = useState(playVolume); // Store last volume before mute

  let hideTimer: NodeJS.Timeout | null = null;

  // Sync volume with Redux state changes
  useEffect(() => {
    newPlayer.setVolume(playVolume); // Update Howler player volume
    setMuted(playVolume === 0); // Auto-mute when volume is 0
  }, [playVolume]);

  // Handle volume change
  const handleVolumeChange = (value: number) => {
    dispatch(setPlayVolume(value)); // Update Redux state
    if (muted && value > 0) {
      setMuted(false); // Unmute if volume is adjusted above 0
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (muted) {
      dispatch(setPlayVolume(lastVolume > 0 ? lastVolume : 0.5));
    } else {
      setLastVolume(playVolume); // Store current volume before muting
      dispatch(setPlayVolume(0)); // Mute
    }
    setMuted(!muted);
  };

  // Show slider on hover
  const handleMouseEnter = () => {
    if (hideTimer) clearTimeout(hideTimer); // Clear existing hide timer
    setIsSliderVisible(true);
  };

  // Hide slider after a delay when the mouse leaves
  const handleMouseLeave = () => {
    hideTimer = setTimeout(() => {
      setIsSliderVisible(false);
    }, 300);
  };

  // Styling for the container and slider
  const styles = {
    container: {
      position: "relative" as const,
      display: "inline-block",
      cursor: "pointer",
    },
    sliderContainer: {
      position: "absolute" as const,
      bottom: "40px",
      left: "50%",
      zIndex: 999,
      transform: "translateX(-50%)",
      display: isSliderVisible ? "block" : "none", // Toggle visibility
      padding: "10px 2.5px",
      background: playBar,
      borderRadius: "8px",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px 2px",
      cursor: "pointer",
    },
    slider: {
      height: "130px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Mute and Volume Icons */}
      {muted ? (
        <Mute className="action-btn" onClick={toggleMute} />
      ) : (
        <Volume
          className="action-btn"
          onClick={toggleMute}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Slider */}
      <div
        style={styles.sliderContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Slider
          className="transparent-track-slide"
          tooltip={{ open: false }}
          vertical
          value={playVolume}
          onChange={handleVolumeChange}
          style={styles.slider}
          min={0}
          step={0.01}
          max={1}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
