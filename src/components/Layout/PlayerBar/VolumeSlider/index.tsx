import React, { useState } from "react";
import { Slider } from "antd";
import { useSelector } from "react-redux";
import Mute from "@/components/SvgIcon/Mute";
import Volume from "@/components/SvgIcon/Volume";

const VolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState(50); // Default volume level
  const [isSliderVisible, setIsSliderVisible] = useState(false); // Toggle slider visibility
  const [muted, setMuted] = useState(false);

  const { playBar } = useSelector((state: any) => state.color.value);
  let hideTimer: NodeJS.Timeout | null = null;

  // Handle volume change
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (muted && value > 0) {
      setMuted(false); // Unmute if volume is adjusted above 0
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const newMutedState = !muted;
    setMuted(newMutedState);

    if (newMutedState) {
      setVolume(0); // Mute the volume
    } else if (volume === 0) {
      setVolume(50); // Restore default volume if muted and unmuted
    }

    setIsSliderVisible(false); // Immediately hide the slider
  };

  // Show slider on hover
  const handleMouseEnter = () => {
    if (hideTimer) {
      clearTimeout(hideTimer); // Clear any existing hide timer
    }
    setIsSliderVisible(true); // Show slider
  };

  // Start timer to hide slider on mouse leave
  const handleMouseLeave = () => {
    hideTimer = setTimeout(() => {
      setIsSliderVisible(false); // Hide slider after 1 second
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
        <Mute
          className="action-btn"
          onClick={toggleMute} // Toggle mute
        />
      ) : (
        <Volume
          className="action-btn"
          onClick={toggleMute} // Toggle mute
          onMouseEnter={handleMouseEnter} // Show slider on hover
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Slider */}
      <div
        style={styles.sliderContainer}
        onMouseEnter={handleMouseEnter} // Prevent hiding when hovering over slider
        onMouseLeave={handleMouseLeave} // Start timer to hide slider
      >
        <Slider
          className="transparent-track-slide"
          tooltip={{open: false}}
          vertical
          value={volume}
          onChange={handleVolumeChange} // Adjust volume
          style={styles.slider}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
