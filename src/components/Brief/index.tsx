import { CSSProperties, ReactNode, useState } from "react";
import "./index.css"

interface BriefProps {
  children: ReactNode,
  style?: CSSProperties
}

const Brief: React.FC<BriefProps> = ({children, style}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <div className="brief-container" style={style}>
      <div className={`brief ${isExpanded ? "expanded" : ""}`}>{children}</div>
    </div>
  );
}

export default Brief;