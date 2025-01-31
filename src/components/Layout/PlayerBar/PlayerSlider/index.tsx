import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import './index.css'
import newPlayer from '@/utils/newPlayer';
import { useSelector } from 'react-redux';

const msToMMSS = (ms: number): string => {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(ms);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format minutes and seconds as two-digit strings
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Return the result in MM:SS format
  return `${formattedMinutes}:${formattedSeconds}`;
}


const PlayerSlider: React.FC = () => {

  const { duration, currentSeek, chorusDot } = useSelector((state: any) => state.state);

  const [sliderValue, setSliderValue] = useState(currentSeek);
 
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [tooltipTime, setTooltipTime] = useState('00:00');

  const totalFormattedTime = msToMMSS(duration);

  const handleChangeCompleted = (value: number) => {
    newPlayer.setSeek(value);
    console.log('Track clicked at:', value);
  }

  const handleChange = (value: number) => {
    setSliderValue(value);
  }

  useEffect(() => {
    setSliderValue(currentSeek);
  }, [currentSeek]);

  const handleChorusClick = (c:number) => {
    newPlayer.setSeek(c);
    console.log(c)
  }

  const mouseIn = () => {
    setIsHovered(true);
  }

  const mouseOut = () => {
    setIsHovered(false);
  }


  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;

    // Calculate percentage of cursor position within the container
    const cursorPercent = offsetX / containerRect.width;

    // Calculate the accurate second
    const currentSecond = Math.round(cursorPercent * duration);
   
    const formattedTime =msToMMSS(currentSecond);

    // Update tooltip position and time
    let tooltipX = offsetX;
    if (tooltipX < 80) {
      tooltipX = 80; // Prevent surpassing the left edge
    }
    if (tooltipX > containerRect.width - 80) {
      tooltipX = containerRect.width - 80; // Prevent surpassing the right edge
    }

    setTooltipPosition(tooltipX);
    setTooltipTime(formattedTime);
  };

  return (
    <div
      className='player-slider-container' 
      onMouseEnter={mouseIn} 
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseOut} 
      style={{
        position: 'absolute',
        top: -5, 
        left: 0, 
        right: 0, 
        zIndex: 5
      }}>

      {isHovered && (
        <div
          className="player-tooltip"
          style={{
            position: 'absolute',
            top: -50,
            left: tooltipPosition,
            transform: 'translateX(-50%)',
            backgroundColor: 'tranparent',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            fontSize: '18px',
          }}
        >
          {`${tooltipTime} / ${totalFormattedTime}`}
        </div>
      )}
      {/* Slider */}
      <Slider
        className='player-slider'
        max={duration}
        value={sliderValue}
        onChange={handleChange}
        onChangeComplete={handleChangeCompleted}
        tooltip={{ open: false }}
      />
      {/* Chorus Dot */}
      {
        chorusDot.length > 0 && 
        chorusDot.map((c: any) => {
          return (
            <div key={c} className='chorus-dot' onClick={() => handleChorusClick(c)} style={{
              position: 'absolute',
              left: `${(c / duration) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: isHovered ? 6 : 4,
              height: isHovered ? 6 : 4,
              backgroundColor: 'white',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
            </div>
          );
        })
      }
    </div>
  );
};

export default PlayerSlider;
