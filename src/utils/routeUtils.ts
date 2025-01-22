import { Dispatch } from "@reduxjs/toolkit";
import { setColor } from "@/stores/slices/colorSlice";
import { setSongCardVisible } from "@/stores/slices/statusSlice";

export const generateRandomColors = () => {
  const colors = [
    "#6B705C", // Soft green
    "#B7B7A4", // Warm beige
    "#CB997E", // Peach
    "#DDBEA9", // Light pink
    "#FFB4A2", // Pastel red
    "#A5A58D", // Olive green
    "#3A5A40", // Dark green
    "#264653", // Muted blue
    "#2A9D8F", // Aqua
    "#E9C46A", // Warm yellow
    "#F4A261", // Soft orange
    "#E76F51", // Coral
    "#8E9AAF", // Gray-blue
    "#CBC0D3", // Lavender
    "#EFD3D7", // Blush pink
    "#FFE5D9", // Pale peach
    "#D6E2E9", // Pale blue
    "#B8E1DD", // Light aqua
    "#B1A7A6", // Taupe
    "#F2E9E4", // Cream
    "#C9ADA7", // Light mauve
    "#9A8C98", // Soft purple
    "#4A4E69", // Deep blue-gray
    "#22223B", // Dark navy
    "#1A535C", // Teal
    "#4ECDC4", // Mint green
    "#FF6B6B", // Salmon red
    "#FFE66D", // Pastel yellow
    "#D8C3A5", // Beige
    "#E0A899", // Rose gold
    "#DFD3C3", // Sand
    "#C8D5B9", // Sage green
    "#A4C3B2", // Pastel teal
    "#656D4A", // Olive drab
    "#FFE0AC", // Light apricot
    "#FFBA08", // Mustard
    "#8D99AE", // Slate blue
    "#EDF2F4", // Pale gray
  ];

  // Randomize the colors and return an array
  return colors.sort(() => Math.random() - 0.5);
};


const hexToRgb = (hex: string) => {
  // Remove the hash at the start if it's there
  hex = hex.replace("#", "");
  
  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};


const nonRecommendPageColor = "#121212";
const nonRecommendMenuColor = '#262626';

// Function to handle route-based color change
export const handleRouteColorChange = (pathname: string, dispatch: Dispatch, current: string) => {
  const rgbColor = hexToRgb(current);
  const backgroundGradient = `linear-gradient(to top, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 1), rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.8))`;

  if (pathname === "/recommended") {   
    dispatch(setColor({ sideBar: current, content: backgroundGradient}));
    dispatch(setSongCardVisible(false));
  } else {    
    dispatch(setColor({ sideBar: nonRecommendMenuColor, content: nonRecommendPageColor}));
    dispatch(setSongCardVisible(true));
  }
};
