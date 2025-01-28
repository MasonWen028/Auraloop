import { useRef, useEffect, useMemo, useState } from "react";
import { LyricPlayer } from "@applemusic-like-lyrics/react";
import { msToS } from "@/utils/time";
import player from "@/utils/player";
import { useSelector } from "react-redux";

const LyricAM = () => {
  const { songLyric } = useSelector((state: any) => state.music);
  const { pureLyricMode, playStatus } = useSelector((state: any) => state.status);
  const { useAMSpring, lyricsScrollPosition, lyricsBlur, lyricFontBold, LyricFont } = useSelector((state: any) => state.setting);
 
  const lyricPlayerRef = useRef(null);

  // Realtime playback progress
  const [playSeek, setPlaySeek] = useState(player.getSeek() * 1000);

  // Periodically update playback progress using requestAnimationFrame
  useEffect(() => {
    let animationFrame: number;
    const updateSeek = () => {
      setPlaySeek(Math.floor(player.getSeek() * 1000));
      animationFrame = requestAnimationFrame(updateSeek);
    };

    updateSeek();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Current lyrics
  const amLyricsData = useMemo(() => {
    const isYrc =
      songLyric.yrcData?.length;
    return isYrc
      ? songLyric.yrcAMData
      : songLyric.lrcAMData;
  }, [
    songLyric.yrcData,
    songLyric.yrcAMData,
    songLyric.lrcAMData,
  ]);

  // Seek jump
  const jumpSeek = (line: any) => {
    console.log(line);
    if (!line?.line?.startTime) return;
    const time = msToS(line.line.lyricLine.startTime);
    player.setSeek(time);
    player.play();
  };

  console.log(amLyricsData)

  return (
    <div
      key={amLyricsData?.[0]?.startTime}
      className={`lyric-am ${pureLyricMode ? "pure" : ""}`}
    >
      <LyricPlayer
        className="am-lyric"
        ref={lyricPlayerRef}
        lyricLines={amLyricsData}
        currentTime={playSeek}
        playing={playStatus}
        enableSpring={useAMSpring}
        enableScale={useAMSpring}
        alignPosition={
          lyricsScrollPosition === "center" ? 0.5 : 0.2
        }
        enableBlur={lyricsBlur}
        style={{
          fontWeight: lyricFontBold ? "bold" : "normal",
          fontFamily:
            LyricFont !== "follow" ? LyricFont : "",
        }}
        onLyricLineClick={jumpSeek}
      />
    </div>
  );
};

export default LyricAM;
