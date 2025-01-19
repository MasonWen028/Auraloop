import { useNavigate } from 'react-router-dom';
import '@/components/PlaylistCard/index.css'; // Add styling here or use inline styles

export interface DailyFreshCardProps {
  imageSrc: string;       // URL or path to the image
  title: string;          // Title text displayed on the card
  subtitle: string;       // Subtitle text displayed on the card
  playlistId: string | number; // Unique ID for the playlist, can be string or number
}


const DailyFreshCard = ({ imageSrc, title, subtitle, playlistId }: DailyFreshCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/playlist/${playlistId}`);
  };
  
  return (
    <div className="daily-fresh-card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={imageSrc} alt={title} />
        <div className="card-overlay">
          <span className="card-title">{title}</span>
          <span className="card-subtitle">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default DailyFreshCard;
