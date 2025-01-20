import React, { ReactNode } from "react";
import { useSelector } from "react-redux"; // Assuming Redux Toolkit is used
import './index.css'
interface ContentProps {
  children: ReactNode; // Define children prop
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const { content } = useSelector((state: any) => state.color.value);
  const styles = {
    container: {
      display: "flex",
      position: "absolute" as const,
      alignItems: "center",
      justifyContent: 'center' as const,
      top: 0,
      left: "200px",
      bottom: "80px",
      right: 0,
      background: content,
      flexWrap: "nowrap" as const,
      paddingTop: 50
    },
  };

  return <div style={styles.container}>
    <div className="page-content">{children}</div>
  </div>;
};

export default Content;
