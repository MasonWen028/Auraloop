import React, { useRef, useEffect, useMemo, useState } from "react";
import { LyricPlayer } from "@applemusic-like-lyrics/react";
import { msToS } from "@/utils/time";
import player from "@/utils/player";

const LyricAM = () => {
  const musicStore = useMusicStore();
  const statusStore = useStatusStore();
  const settingStore = useSettingStore();

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

  // Main lyric color
  const mainColor = useMemo(() => {
    if (!statusStore.mainColor) return "rgb(239, 239, 239)";
    return `rgb(${statusStore.mainColor})`;
  }, [statusStore.mainColor]);

  // Current lyrics
  const amLyricsData = useMemo(() => {
    const isYrc =
      musicStore.songLyric.yrcData?.length;
    return isYrc
      ? musicStore.songLyric.yrcAMData
      : musicStore.songLyric.lrcAMData;
  }, [
    musicStore.songLyric.yrcData,
    musicStore.songLyric.yrcAMData,
    musicStore.songLyric.lrcAMData,
  ]);

  // Seek jump
  const jumpSeek = (line: any) => {
    if (!line?.line?.lyricLine?.startTime) return;
    const time = msToS(line.line.lyricLine.startTime);
    player.setSeek(time);
    player.play();
  };

  return (
    <div
      key={amLyricsData?.[0]?.startTime}
      className={`lyric-am ${statusStore.pureLyricMode ? "pure" : ""}`}
    >
      <LyricPlayer
        className="am-lyric"
        ref={lyricPlayerRef}
        lyricLines={amLyricsData}
        currentTime={playSeek}
        playing={statusStore.playStatus}
        enableSpring={settingStore.useAMSpring}
        enableScale={settingStore.useAMSpring}
        alignPosition={
          settingStore.lyricsScrollPosition === "center" ? 0.5 : 0.2
        }
        enableBlur={settingStore.lyricsBlur}
        style={{
          fontWeight: settingStore.lyricFontBold ? "bold" : "normal",
          fontFamily:
            settingStore.LyricFont !== "follow" ? settingStore.LyricFont : "",
        }}
        onLineClick={jumpSeek}
      />
    </div>
  );
};

export default LyricAM;
