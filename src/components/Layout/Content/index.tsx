import React, { ReactNode } from "react";
import { useSelector } from "react-redux"; // Assuming Redux Toolkit is used

interface ContentProps {
  children: ReactNode; // Define children prop
}

const hexToRgb = (hex: string) => {
  // Remove the hash at the start if it's there
  hex = hex.replace("#", "");
  
  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

const Content: React.FC<ContentProps> = ({ children }) => {
  const { content } = useSelector((state: any) => state.color.value);
  const styles = {
    container: {
      display: "flex",
      position: "absolute",
      alignItems: "center",
      justifyContent: 'center',
      top: 0,
      left: "200px",
      bottom: "80px",
      right: 0,
      background: content,
      flexWrap: "nowrap",
    } as React.CSSProperties,
  };

  return <div style={styles.container}>{children}</div>;
};

export default Content;
