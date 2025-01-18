import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { MinusOutlined, CloseOutlined } from "@ant-design/icons";
import MaxSvg from "@/components/SvgIcon/Max";
import RestoreSvg from "@/components/SvgIcon/Restore"; // Custom Restore Icon

const ControlBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (!window.electron || !window.electron.ipcRenderer) {
      console.error("Electron API is not available.");
      return;
    }

    const handleWindowState = (_event: any, state: string) => {
      setIsMaximized(state === "maximized");
    };

    window.electron.ipcRenderer.on("window-state", handleWindowState);

    return () => {
      window.electron.ipcRenderer.removeListener(
        "window-state",
        handleWindowState
      );
    };
  }, []);

  const buttons = [
    {
      onClick: () =>
        window.electron.ipcRenderer.send("window-control", "minimize"),
      icon: <MinusOutlined style={{ fontSize: 12 }} />,
      hoverStyle: { backgroundColor: "rgba(255, 255, 255, 0.2)" },
    },
    {
      onClick: () =>
        window.electron.ipcRenderer.send("window-control", isMaximized ? "unmaximize" : "maximize"),
      icon: isMaximized ? <RestoreSvg style={{ fontSize: 12 }} /> : <MaxSvg style={{ fontSize: 12 }} />,
      hoverStyle: { backgroundColor: "rgba(255, 255, 255, 0.2)" },
    },
    {
      onClick: () =>
        window.electron.ipcRenderer.send("window-control", "close"),
      icon: <CloseOutlined style={{ fontSize: 12 }} />,
      hoverStyle: { backgroundColor: "rgba(255, 0, 0, 0.6)" },
    },
  ];

  const styles = {
    container: {
      display: 'flex',
    },
    button: {
      WebkitAppRegion: "no-drag",
      border: "none",
      outline: "none",
      color: "white",
      width: 50,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "transparent",
      borderRadius: 0,
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          style={styles.button}
          onClick={btn.onClick}
          size="large"
          type="text"
          icon={btn.icon}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, btn.hoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, { backgroundColor: "transparent" })
          }
        />
      ))}
    </div>
  );
};

export default ControlBar;
