import Playing from "../SvgIcon/Playing";
import Pausing from "../SvgIcon/Pausing";
import './index.css';

interface PlayingImageProps {
  imageSrc: string; // Source of the image
  playState: 0| 1 | 2; // 0 for no state, 1 for playing 2 for pausing
  className?: string;
  onClick?: () => void;
}

const PlayingImage: React.FC<PlayingImageProps> = ({ imageSrc, playState, className,onClick }) => {
  
  return (
    <div onClick={onClick}
      className={`playing-image-container ${className}`}
    >
      <img style={{width: '100%', height: '100%'}} src={imageSrc} alt="playingable"/>
      {playState === 1 && (
        <div className="playing-icon">
          <Playing style={{fontSize: 30}}/>
        </div>
      )}
      {playState === 2 && (
        <div className="playing-icon">
          <Pausing style={{fontSize: 30}}/>
        </div>
      )}
    </div>
  );
};

export default PlayingImage;
