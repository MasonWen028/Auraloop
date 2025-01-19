import React from "react";

interface ToggleProps {
  toggled: boolean;
  onChange: (value: boolean) => void;
  children?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ toggled, onChange, children }) => {
  const handleClick = () => {
    onChange(!toggled); // Toggle the state and pass the new value to the parent
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // Align toggle and label in the same line
        cursor: "pointer",
      }}
      onClick={handleClick} // Handle click to toggle state
    >
      <div
        onClick={handleClick}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: toggled ? "2px solid #e3e3e3" : "2px solid #5a5a5a", // Border color changes
          backgroundColor: toggled ? "#e3e3e3" : "transparent", // Background color changes
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {toggled && (
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#000000", // Checkmark color
              mask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>')`,
              WebkitMask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>')`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        )}
      </div>
      {children && (
        <span style={{ color: "#e3e3e3", fontSize: "14px", marginLeft: 10, userSelect: 'none' }}>{children}</span>
      )}
    </div>
  );
};

export default Toggle;
