import React, { useState, useRef, useEffect, ReactNode } from "react";
import "./index.css";

interface TabProps {
  tabs: string[]; // Array of tab labels
  onTabChange?: (selectedIndex: number) => void;
  children?: ReactNode
}

const Tabs: React.FC<TabProps> = ({ tabs, onTabChange, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null); // Ref to the tabs container
  const [indicatorPosition, setIndicatorPosition] = useState({
    left: 0,
    width: 16, // Fixed indicator width
  });

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    if (tabsRef.current) {
      const selectedTabElement = tabsRef.current.children[selectedTab] as HTMLElement;
      const tabCenter = selectedTabElement.offsetLeft + selectedTabElement.offsetWidth / 2;
      const indicatorLeft = tabCenter - indicatorPosition.width / 2;

      setIndicatorPosition({
        left: indicatorLeft,
        width: indicatorPosition.width, // Keep the fixed width
      });
    }
  }, [selectedTab]);

  return (
    <>
      <div className="tabs-container">
        <div className="tabs" ref={tabsRef}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${selectedTab === index ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </div>
          ))}
          <div
            className="tab-indicator"
            style={{
              left: `${indicatorPosition.left}px`,
              width: `${indicatorPosition.width}px`,
            }}
          />
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default Tabs;
