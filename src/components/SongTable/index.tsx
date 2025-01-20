import React, { CSSProperties, useState } from "react";
import "./index.css";
import Play from "../SvgIcon/Play";
import RoundPlay from "../SvgIcon/RoundPlay";
import More from "../SvgIcon/More";

interface Song {
  index: number;
  [key: string]: any; // Dynamically handle additional fields
}

interface SongTableProps {
  songs: Song[];
  columns: { key: string; label: string }[]; // Define which columns to display
  style?: CSSProperties;
}

const SongTable: React.FC<SongTableProps> = ({ songs, columns, style }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow(index);
  };

  return (
    <div className={`song-table`} style={style}>
      {/* Render table header dynamically */}
      <div className="song-table-header">
        <div className="holder"></div>
        <div className="column index-column">#</div>
        {columns.map((column) => (
          <div key={column.key} className={`column ${column.key}-column`}>
            {column.label}
          </div>
        ))}
        <div className="song-option"></div>
      </div>
      {/* Render table rows dynamically */}
      {songs.map((song) => (
        <div
          key={song.index}
          className={`song-table-row ${hoveredRow === song.index ? "hovered" : ""}`}
          onClick={() => handleRowClick(song.index)}
          onMouseEnter={() => setHoveredRow(song.index)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div className="holder"></div>
          <div className="column index-column">
            {hoveredRow === song.index ? (
              <RoundPlay/>
            ) : (
              song.index
            )}
          </div>
          {columns.map((column) => (
            <div
              key={column.key}
              className={`column ${column.key}-column`}
            >
              {song[column.key]}
            </div>
          ))}
          <div className="song-option">
            <More style={{fontSize: 24}}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongTable;
