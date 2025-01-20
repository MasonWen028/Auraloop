import { useRef, useState, useEffect, useMemo, CSSProperties } from 'react';
import mojs from '@mojs/core';
import './index.css';

interface HeartRefElement extends HTMLDivElement {
  aperture?: any;
  burst?: any;
  bounce?: any;
}

interface LikeItProps {
  isLiked: boolean; // Initial liked state
  onLikeToggle?: (liked: boolean) => void; // Callback to handle like/unlike
  style?: CSSProperties;
}

const LikeIt: React.FC<LikeItProps> = ({ isLiked, onLikeToggle, style }) => {
  const [hearted, setHearted] = useState(isLiked);
  const [heartP, setHeartP] = useState(1);

  const heartRef = useRef<HeartRefElement>(null);
  const heartIconRef = useRef<SVGSVGElement>(null);

  // Heart style computed dynamically
  const heartStyle = useMemo(() => ({
    fill: hearted ? '#E05B5B' : '',
    stroke: hearted ? '#E05B5B' : '',
    transform: `scale3d(${heartP}, ${heartP}, 1)`,
    zIndex: 999
  }), [hearted, heartP]);

  useEffect(() => {
    let aperture, burst, bounce;
    if (heartRef.current) {
      aperture = new mojs.Transit({
        parent: heartRef.current,
        duration: 750,
        type: 'circle',
        radius: { 0: 20 },
        fill: 'transparent',
        stroke: '#E05B5B',
        strokeWidth: { 20: 0 },
        opacity: 0.6,
        isRunLess: true,
        easing: mojs.easing.bezier(0, 1, 0.5, 1),
      });

      burst = new mojs.Burst({
        radius: { 0: 50 },
        parent: heartRef.current,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        children: {
          duration: 750,
          radius: { 0: 'rand(5, 25)' },
          shape: ['circle', 'rect', 'polygon'],
          fill: ['#1abc9c', '#2ecc71', '#00cec9', '#3498db', '#9b59b6', '#fdcb6e', '#f1c40f', '#e67e22', '#e74c3c', '#e84393'],
          degreeShift: 'rand(-90, 90)',
          delay: 'stagger(0, 40)',
        },
        opacity: 0.6,
        count: 10,
        zIndex: 999
      });

      bounce = new mojs.Tween({
        duration: 1200,
        onUpdate: function (progress: number) {
          if (progress > 0.3) {
            setHeartP(mojs.easing.elastic.out(1.43 * progress - 0.43));
          } else {
            setHeartP(0);
          }
        },
      });

      heartRef.current.aperture = aperture;
      heartRef.current.burst = burst;
      heartRef.current.bounce = bounce;
    }
  }, []);

  const thumbsUp = () => {
    if (!hearted) {
      // Trigger animations
      const timeline = new mojs.Timeline().add(
        heartRef.current?.burst,
        heartRef.current?.aperture,
        heartRef.current?.bounce
      );
      timeline.play();
    }

    // Toggle hearted state
    setHearted(!hearted);
    if  (onLikeToggle != undefined)
    onLikeToggle(!hearted); // Notify parent component
  };

  return (
    <div className="oper-item" style={style} onClick={thumbsUp}>
      <div className="heart" ref={heartRef}>
        <svg
          ref={heartIconRef}
          style={heartStyle}
          viewBox="-50 0 1150 1100"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
        >
          <path d="M0 0h1024v1024H0z" opacity=".01"/><path d="M281.6 51.2C126.0544 51.2 0 183.4496 0 346.5216 0 641.8432 332.8 910.336 512 972.8c179.2-62.464 512-330.9568 512-626.2784C1024 183.4496 897.9456 51.2 742.4 51.2c-95.232 0-179.456 49.5616-230.4 125.44C461.056 100.8128 376.832 51.2 281.6 51.2z"/>
        </svg>
      </div>
    </div>
  );
};

export default LikeIt;
