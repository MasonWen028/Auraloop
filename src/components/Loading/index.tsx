import { useSelector } from 'react-redux';
import './index.css'
import { CSSProperties, ReactNode } from 'react';

interface LoadingProps {
  loading: boolean;
  children: ReactNode;
  style?: CSSProperties 
}

const styleCalculator = (i: number): React.CSSProperties => {
  return {
    backgroundColor: 'white',
    width: 2,
    height: 25,
    margin: 2,
    borderRadius: 2,
    display: "inline-block",
    animation: `spinners-loader 1s cubic-bezier(0.2, 0.68, 0.18, 1.08) ${i * 0.1}s infinite`,
    animationFillMode: "both",
  };
};
//1s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.1s infinite normal both running react-spinners-ScaleLoader-scale



const Loading: React.FC<LoadingProps> = ({ loading, children, style }) => {
  const { content } = useSelector((state: any) => state.color.value);
  const spans = [];
  for (let i = 1; i <= 5; i++) {
    spans.push(<span key={i} style={styleCalculator(i)} />);
  }
  return (
    <div style={{ position: 'relative'}}>
      {
        loading && <div className="loading-overlay" style={{...style,
          backgroundColor: content,
          animation: "fade-in 0.5s ease-in-out",
          transition: "opacity 0.5s",
          opacity: 1,
        }}>
          <span>
            {spans}
          </span>
        </div>
      }
      {
        !loading && 
        <div style={{
            animation: "fade-in 0.5s ease-in-out",
            opacity: 1,
          }}>
          {children}
        </div>
      }
    </div>
  );
}

export default Loading;