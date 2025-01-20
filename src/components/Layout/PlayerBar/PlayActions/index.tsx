import { useState } from "react";
import './index.css';
import Previous from "@/components/SvgIcon/Previous";
import Pause from "@/components/SvgIcon/Pause";
import Play from "@/components/SvgIcon/Play";
import Next from "@/components/SvgIcon/Next";

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

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayState = () => {
    setIsPlaying(!isPlaying);
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
      <Next className="forward-back-icon"/>
    </div>
  )
}

export default PlayActions;