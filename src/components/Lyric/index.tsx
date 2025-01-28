import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import SvgIcon from "@/components/SvgIcon";
import { useSelector } from "react-redux";
import player from "@/utils/player";
import './index.css';
import { selectLyricSettings } from "@/stores/selector";


interface CustomCSSProperties extends React.CSSProperties {
  "--lrc-size"?: string;
  "--lrc-tran-size"?: string;
  "--lrc-roma-size"?: string;
  "--lrc-bold"?: string;
}
const Lyric = () => {
  const {
    songLyric,
    playSong,
    currentTimeOffset,
    pureLyricMode,
    lyricIndex,
    playLoading,
    playerMetaShow,
    lyricsScrollPosition,
    showYrcAnimation,
    lrcMousePause,
    lyricFontSize,
    lyricTranFontSize,
    lyricRomaFontSize,
    lyricFontBold,
    LyricFont,
    playerType,
    lyricsPosition,
    showYrc,
    lyricsBlur,
    showTran,
    showRoma,
  } = useSelector(selectLyricSettings);

  const isHasYrc = songLyric.yrcData.length > 0;

  const isHasLrc = songLyric.lrcData.length > 0 && playSong.type !== "radio";

  console.log("[LYRIC]", songLyric, isHasYrc, isHasLrc);

  const [lrcMouseStatus, setLrcMouseStatus] = useState(false);
  const [playSeek, setPlaySeek] = useState(0);
  const lyricScrollRef = useRef<Scrollbars | null>(null);

  const currentTimeOffsetValue = currentTimeOffset > 0
    ? `+${currentTimeOffset}`
    : currentTimeOffset;

  const updatePlaySeek = () => {
    setPlaySeek(player.getSeek() + currentTimeOffset);
  };

  useEffect(() => {
    const interval = setInterval(updatePlaySeek, 1000); // Update seek every second
    return () => clearInterval(interval);
  }, []);

  const lyricsScroll = (index: number) => {
    const lrcItem = document.getElementById(index >= 0 ? `lrc-${index}` : "lrc-placeholder");
    if (lrcItem && (!lrcMouseStatus || pureLyricMode)) {
      const container = lrcItem.parentElement;
      if (!container) return;

      const scrollDistance = lrcItem.offsetTop - container.offsetTop - 80;

      if (lyricsScrollPosition === "center") {
        lrcItem.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (lyricScrollRef.current) {
        lyricScrollRef.current.scrollTop(scrollDistance);
      }
    }
  };

  const getYrcStyle = (wordData: any, lyricIndex: number) => {
    if (showYrcAnimation) {
      if (lyricIndex !== lyricIndex) {
        return {
          transitionDuration: `0ms, 0ms, 0.35s`,
          transitionDelay: `0ms`,
        };
      }
      if (
        !playLoading &&
        wordData.time + wordData.duration - playSeek > 0
      ) {
        return {
          transitionDuration: `0s, 0s, 0.35s`,
          transitionDelay: `0ms`,
          WebkitMaskPositionX: `${100 - Math.max(((playSeek - wordData.time) / wordData.duration) * 100, 0)}%`,
        };
      }
      return {
        transitionDuration: `${wordData.duration}ms, ${wordData.duration * 0.8}ms, 0.35s`,
        transitionDelay: `${wordData.time - playSeek}ms, ${
          wordData.time - playSeek + wordData.duration * 0.5
        }ms, 0ms`,
      };
    } else {
      if (lyricIndex !== lyricIndex || (!playLoading && wordData.time >= playSeek)) {
        return { opacity: 0 };
      }
      return { opacity: 1 };
    }
  };

  const jumpSeek = (time: number) => {
    if (!time) return;
    setLrcMouseStatus(false);
    player.setSeek(time);
    player.play();
  };

  const handleMouseEnter = () => {
    if (lrcMousePause) setLrcMouseStatus(true);
  };

  const handleMouseLeave = () => {
    setLrcMouseStatus(false);
    lyricsScroll(lyricIndex);
  };

  useEffect(() => {
    lyricsScroll(lyricIndex);
  }, [lyricIndex]);

  return (
    <div
      style={{
        "--lrc-size": `${lyricFontSize}px`,
        "--lrc-tran-size": `${lyricTranFontSize}px`,
        "--lrc-roma-size": `${lyricRomaFontSize}px`,
        "--lrc-bold": lyricFontBold ? "bold" : "normal",
        fontFamily: LyricFont !== "follow" ? LyricFont : undefined,
        cursor: playerMetaShow ? "auto" : "none",
      } as CustomCSSProperties}
      className={`lyric ${playerType} ${lyricsPosition} ${pureLyricMode ? "pure" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Scrollbars ref={lyricScrollRef} style={{ height: "100%" }}>
        {showYrc && isHasYrc ? (
          songLyric.yrcData.map((item: any, index: number) => (
            <div
              key={index}
              id={`lrc-${index}`}
              className={`lrc-line is-yrc ${lyricIndex === index ? "on" : ""}`}
              style={{
                filter: lyricsBlur
                  ? `blur(${Math.min(Math.abs(lyricIndex - index) * 1.8, 10)}px)`
                  : "blur(0)",
              }}
              onClick={() => jumpSeek(item.time)}
            >
              <div className="content">
                {
                  <span className="word">{item.content}</span>
                // item.contents.map((text: any, textIndex: number) => (
                //   <span
                //     key={textIndex}
                //     className={`content-text ${
                //       text.duration >= 1.5 && playSeek <= text.endTime ? "content-long" : ""
                //     }`}
                //   >
                //     <span className="word">{text.content}</span>
                //     <span className="filler" style={getYrcStyle(text, index)}>
                //       {text.content}
                //     </span>
                //   </span>
                // ))
                }
              </div>
              {item.tran && showTran && <span className="tran">{item.tran}</span>}
              {item.roma && showRoma && <span className="roma">{item.roma}</span>}
            </div>
          ))
        ) : isHasLrc ? (
          songLyric.lrcData.map((item: any, index: number) => (
            <div
              key={index}
              id={`lrc-${index}`}
              className={`lrc-line is-lrc ${lyricIndex === index ? "on" : ""}`}
              style={{
                filter: lyricsBlur
                  ? `blur(${Math.min(Math.abs(lyricIndex - index) * 1.8, 10)}px)`
                  : "blur(0)",
              }}
              onClick={() => jumpSeek(item.time)}
            >
              <span className="content">{item.content}</span>
              {item.tran && showTran && <span className="tran">{item.tran}</span>}
              {item.roma && showRoma && <span className="roma">{item.roma}</span>}
            </div>
          ))
        ) : null}
      </Scrollbars>
      <div className="menu">
        {/* <div className="menu-icon" onClick={() => (currentTimeOffset -= 0.5)}>
          <SvgIcon name="Replay5" />
        </div>
        <span className="time" onClick={() => (currentTimeOffset = 0)}>
          {currentTimeOffsetValue}
        </span>
        <div className="menu-icon" onClick={() => (currentTimeOffset += 0.5)}>
          <SvgIcon name="Forward5" />
        </div> */}
        <div className="divider" />
        {/* <div className="menu-icon" onClick={() => openSetting("lyrics")}>
          <SvgIcon name="Settings" />
        </div> */}
      </div>
    </div>
  );
};

export default Lyric;
