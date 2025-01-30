import React, { CSSProperties, useMemo, useState } from "react";
import "./index.css";
import RoundPlay from "../SvgIcon/RoundPlay";
import { useDispatch, useSelector } from "react-redux";
import Playing from "../SvgIcon/Playing";
import PlayPaused from "../SvgIcon/PlayPaused";
import Pause from "../SvgIcon/Pause";
import LikeIt from "../LikeIt";
import { Link } from "react-router-dom";
import SongActions from "../SongActions";
import { SongType } from "@/types/main";
import { isString } from "lodash";
interface SongTableProps {
  songs: SongType[];
  style?: CSSProperties;
  inAlbum?: boolean
}




const SongTable: React.FC<SongTableProps> = ({ songs, style, inAlbum }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { currentSongId, playStatus } = useSelector((state: any) => state.status);

  const likedSongs = useSelector((state: any) => state.data.userLikeData.songs);

  const dispatch = useDispatch();


  const handleRowClick = (index: number, playing: boolean) => {

    // TODO play this
    //dispatch(setCurrentSongId(index));
    //dispatch(setStatus(playing));
  };

  const isFavoritedSong = (id: number): boolean => {
    return likedSongs.includes(id);
  };


  // const isLiked = useMemo(() => isFavoritedSong(song.id), [song.id]);

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
      {songs.map((song, index) => (
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
              (hoveredRow === song.id ? (<RoundPlay onClick={() => handleRowClick(song.id, true)}/>) : (index + 1))
            }
          </div>
          <div className="song-option">
            <LikeIt isLiked={isFavoritedSong(song.id)} onLikeToggle={handleSongLiked}/>
             {/* isFavoritedSong(song.id) */}
          </div>
          <div className={`column title-column`}>
              { song.name }
          </div>
          <div className={`column artist-column`}>
            { 
              Array.isArray(song.artists) ?
              song.artists.map((artist, index) => {
                return (
                  <React.Fragment>
                    <Link key={artist.id} style={{color: 'inherit'}} to={`/artist/${artist.id}`}>
                      { artist.name }
                    </Link>
                  {index < song.artists.length - 1 && ', '}
                  </React.Fragment>
                )
              }): <span>{song.artists}</span>
            }
          </div>
          { !inAlbum && <div className={`column album-column`}>
            {
              !isString(song.album) ? 
              <Link style={{textDecoration: 'inherit', color: 'inherit'}} to={`/album/${song.album.id}`}>
                {song.album.name}
              </Link> : <span>{ song.album }</span>
            }
          </div>}
          <div className={`column duration-column`}>
              { song["duration"] }
          </div>
          <div className="song-option">
            <SongActions artistId={Array.isArray(song.artists) ? song.artists[0].id : 0} albumId={!isString(song.album) ? song.album?.id : 0}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongTable;
