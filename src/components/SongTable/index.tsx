import React, { CSSProperties, useState } from "react";
import "./index.css";
import RoundPlay from "../SvgIcon/RoundPlay";
import More from "../SvgIcon/More";
import { useDispatch, useSelector } from "react-redux";
import Playing from "../SvgIcon/Playing";
import PlayPaused from "../SvgIcon/PlayPaused";
import Pause from "../SvgIcon/Pause";
import { setCurrentSongId, setStatus } from "@/stores/slices/statusSlice";
import LikeIt from "../LikeIt";
import { isFavoritedSong } from "@/hooks/userLikedSong";
import { Link } from "react-router-dom";
import SongActions from "../SongActions";

interface Song {
  id: number;
  [key: string]: any; // Dynamically handle additional fields
}

interface SongTableProps {
  songs: Song[];
  style?: CSSProperties;
  inAlbum?: boolean
}

const SongTable: React.FC<SongTableProps> = ({ songs, style, inAlbum }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { currentSongId, playStatus } = useSelector((state: any) => state.status);
  const dispatch = useDispatch();

  const handleRowClick = (index: number, playing: boolean) => {
    dispatch(setCurrentSongId(index));
    dispatch(setStatus(playing));
  };

  const handleSongLiked = (liked: boolean) => {
    console.log(liked)
  }

  return (
    <div className={`song-table`} style={style}>
      {/* Render table header dynamically */}
      <div className="song-table-header">
        <div className="holder"></div>
        <div className="column index-column">#</div>
        <div className="song-option"></div>
         <div className={`column title-column`}>
            Title
          </div>
          <div className={`column artist-column-header`}>
            Artist
          </div>
          {!inAlbum && <div className={`column album-column-header`}>
            Album
          </div>}
          <div className={`column duration-column`}>
            Duration
          </div>
          <div className="song-option"></div>
      </div>
      {/* Render table rows dynamically */}
      {songs.map((song) => (
        <div
          key={song.id}
          className={`song-table-row ${hoveredRow === song.id ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredRow(song.id)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div className="holder"></div>
          <div className="column index-column">
            {
              currentSongId === song.id && 
              (playStatus ? 
                (hoveredRow !== song.id ? <Playing onClick={() => handleRowClick(song.id, false)}></Playing> : <Pause onClick={() => handleRowClick(song.id, false)}/>) : <PlayPaused  onClick={() => handleRowClick(song.id, true)}></PlayPaused>
              )}
            { currentSongId !== song.id && 
              (hoveredRow === song.id ? (<RoundPlay onClick={() => handleRowClick(song.id, true)}/>) : (song.id))
            }
          </div>
          <div className="song-option">
            <LikeIt isLiked={isFavoritedSong(song.id)} onLikeToggle={handleSongLiked}/>
          </div>
          <div className={`column title-column`}>
              { song["title"] }
          </div>
          <div className={`column artist-column`}>
          <Link style={{textDecoration: 'inherit', color: 'inherit'}} to={`/artist/${song["artist"].id}`}>
            { song["artist"].name }
          </Link>
          </div>
          { !inAlbum && <div className={`column album-column`}>
          <Link style={{textDecoration: 'inherit', color: 'inherit'}} to={`/album/${song["album"].id}`}>
            { song["album"].name }
          </Link>
          </div>}
          <div className={`column duration-column`}>
              { song["duration"] }
          </div>
          <div className="song-option">
            <SongActions artistId={song["artist"].id} albumId={song["album"].id}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongTable;
