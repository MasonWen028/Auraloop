import React, { CSSProperties } from "react";
import "./index.css";
import Play from "../SvgIcon/Play";
import RoundPlay from "../SvgIcon/RoundPlay";

interface PlayAllButtonProps {
  text: string; // Text to display (e.g., "播放全部")
  count: number; // Count to display (e.g., 45)
  onClick?: () => void; // Optional click handler
  style?: CSSProperties
}

const PlayAllButton: React.FC<PlayAllButtonProps> = ({ text, count, onClick, style }) => {
  return (
    <button style={style} className="play-all-button" onClick={onClick}>
      <span className="play-icon">
        <RoundPlay style={{fontSize: 12}}/>
      </span>
      <span className="play-text">{text}</span>
      <span className="play-count">{count}</span>
    </button>
  );
};

export default PlayAllButton;
