import { useEffect, useMemo, useState } from "react";
import './index.css';
import Previous from "@/components/SvgIcon/Previous";
import Pause from "@/components/SvgIcon/Pause";
import Play from "@/components/SvgIcon/Play";
import Next from "@/components/SvgIcon/Next";
import player from "@/utils/player";

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

  useEffect(()=> {
    player.initPlayer();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayState = () => {
    player.playOrPause();
    setIsPlaying(!isPlaying);
  }

  const handlePlayerNext = () => {
    player.nextOrPrev("next");
  }



  return (
    <div style={styles.playActionContainer}>
      <Previous className="forward-back-icon"/>
      { isPlaying && 
        <Pause className="play-pause-icon" onClick={handlePlayState}/>
      }
      {
        !isPlaying && 
        <Play className="play-pause-icon" onClick={handlePlayState}/>
      }
      <Next className="forward-back-icon" onClick={handlePlayerNext}/>
    </div>
  )
}

export default PlayActions;