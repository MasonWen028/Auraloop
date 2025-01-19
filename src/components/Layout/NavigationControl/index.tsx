import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const NavigationControl = () => {
  const navigate = useNavigate();

  // State to track navigation availability
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    // Check if navigation backward and forward is possible
    const updateNavigationState = () => {
      const history = window.history;

      setCanGoBack(history.state && history.state.idx > 0); // Back is available if history has previous entries
      setCanGoForward(history.state && history.state.idx < history.length - 1); // Forward is available if history isn't at the last entry
    };

    updateNavigationState(); // Initialize state

    // Listen for navigation events to update state dynamically
    window.addEventListener('popstate', updateNavigationState);
    return () => {
      window.removeEventListener('popstate', updateNavigationState);
    };
  }, []);

  const styles = {
    noDrag: {
      WebkitAppRegion: "no-drag",
    }
  }

  return (
    <div className="navigation-control">
      {/* Back Button */}
      <LeftOutlined 
        style={styles.noDrag}
        className={`nav-btn ${canGoBack ? 'enabled' : 'disabled'}`}
        onClick={() => canGoBack && navigate(-1)}
        disabled={!canGoBack}/>
      <RightOutlined
        style={{...styles.noDrag, marginLeft: 30}}
        className={`nav-btn ${canGoForward ? 'enabled' : 'disabled'}`}
        onClick={() => canGoForward && navigate(1)}
        disabled={!canGoForward}/>
    </div>
  );
};

export default NavigationControl;
