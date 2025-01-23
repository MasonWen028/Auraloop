import './index.css'

interface LoadingProps {
  loading: boolean;
}

const style = (i: number): React.CSSProperties => {
  return {
    backgroundColor: 'white',
    width: 4,
    height: 35,
    margin: 2,
    borderRadius: 2,
    display: "inline-block",
    animation: `spinners-loader 1s cubic-bezier(0.2, 0.68, 0.18, 1.08) ${i * 0.1}s infinite`,
    animationFillMode: "both",
  };
};
//1s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.1s infinite normal both running react-spinners-ScaleLoader-scale

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <>
      {
        loading && <div className="loading-overlay">
          <span>
            <span style={style(1)} />
            <span style={style(2)} />
            <span style={style(3)} />
            <span style={style(4)} />
            <span style={style(5)} />
          </span>
        </div>
      }
    </>
  );
}

export default Loading;