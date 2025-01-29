import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ArrowsAltOutlined } from "@ant-design/icons";

interface HoverImageProps {
  imageSrc: string; // Source of the image
  route: string; // Route to navigate to
  className?: string;
}

const HoverImage: React.FC<HoverImageProps> = ({ imageSrc, route, className }) => {
  const [isHovered, setIsHovered] = useState(true);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(route, { replace: true });
  };

  return (
    <div
      className={`hover-image-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img style={{width: '100%', height: '100%'}} src={imageSrc} alt="Hoverable"/>
      {isHovered && (
        <div className="hover-icon" onClick={handleClick}>
          <ArrowsAltOutlined style={{fontSize: 30}}/>
        </div>
      )}
    </div>
  );
};

export default HoverImage;
