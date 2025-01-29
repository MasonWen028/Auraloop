import { useEffect, useMemo, useState } from "react";
import './index.css';
import Previous from "@/components/SvgIcon/Previous";
import Pause from "@/components/SvgIcon/Pause";
import Play from "@/components/SvgIcon/Play";
import Next from "@/components/SvgIcon/Next";
import player from "@/utils/player";
import { useDispatch, useSelector } from "react-redux";
import { setPlaySong, setPlayState } from "@/stores/slices/stateSlice";
import { personalFm } from "@/api/rec";
import newPlayer from "@/utils/newPlayer";

const PlayActions: React.FC =() => {
  const styles = {
    playActionContainer: {
      width: 240,
      display: 'flex',
      alignItems: 'center',
      columnGap: 12,
      flex: 1,
      justifyContent: 'center'
    }
  }

  const dispatch = useDispatch();

  const { playState, playMode } = useSelector((state: any) => state.state);

  console.log(playState)

  const handlePlayState = (state: 0 | 1 | 2 | 3) => {
    dispatch(setPlayState(state))
    if (state === 1) {
      if (playMode === 0) {
        if (newPlayer.isPuasing()) {
          newPlayer.play(); // Resume playback instead of restarting
        } else {
          newPlayer.playFm(); // Start FM if nothing is playing
        }
      }
    } else {
      newPlayer.pause();
    }
  }

  const handlePlayerNext = () => {
    //player.nextOrPrev("next", true);
  }


  return (
    <div style={styles.playActionContainer}>
      <Previous className="forward-back-icon"/>
      { playState === 1 && 
        <Pause className="play-pause-icon" onClick={() => handlePlayState(2)}/>
      }
      {
        playState !== 1 && 
        <Play className="play-pause-icon" onClick={() => handlePlayState(1)}/>
      }
      <Next className="forward-back-icon" onClick={handlePlayerNext}/>
    </div>
  )
}

export default PlayActions;