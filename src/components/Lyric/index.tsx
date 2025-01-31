import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import './index.css';
import { selectLyricSettings } from "@/stores/selector";
import newPlayer from "@/utils/newPlayer";


interface CustomCSSProperties extends React.CSSProperties {
  "--lrc-size"?: string;
  "--lrc-tran-size"?: string;
  "--lrc-roma-size"?: string;
  "--lrc-bold"?: string;
}
const Lyric = () => {
  const {
    pureLyricMode,
    playLoading,
    playerMetaShow,
    lyricsScrollPosition,
    lyricFontSize,
    lyricTranFontSize,
    lyricFontBold,
    lyricsBlur,
    showYrcAnimation,
    lrcMousePause,
    lyricRomaFontSize,
    LyricFont,
    playerType,
    lyricsPosition,
    showYrc,
    showTran,
    showRoma,
  } = useSelector(selectLyricSettings);

  const {songLyric,  playSong, lyricIndex, currentSeek} = useSelector((state: any) => state.state);
 
  const isHasYrc = songLyric.yrcData.length > 0;

  const isHasLrc = songLyric.lrcData.length > 0 && playSong.type !== "radio";

  const [lrcMouseStatus, setLrcMouseStatus] = useState(false);

  const lyricScrollRef = useRef<Scrollbars | null>(null);

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
        wordData.time + wordData.duration - currentSeek > 0
      ) {
        return {
          transitionDuration: `0s, 0s, 0.35s`,
          transitionDelay: `0ms`,
          WebkitMaskPositionX: `${100 - Math.max(((currentSeek - wordData.time) / wordData.duration) * 100, 0)}%`,
        };
      }
      return {
        transitionDuration: `${wordData.duration}ms, ${wordData.duration * 0.8}ms, 0.35s`,
        transitionDelay: `${wordData.time - currentSeek}ms, ${
          wordData.time - currentSeek + wordData.duration * 0.5
        }ms, 0ms`,
      };
    } else {
      if (lyricIndex !== lyricIndex || (!playLoading && wordData.time >= currentSeek)) {
        return { opacity: 0 };
      }
      return { opacity: 1 };
    }
  };

  const jumpSeek = (time: number) => {
    if (!time) return;
    setLrcMouseStatus(false);
    newPlayer.setSeek(time);
    newPlayer.play();
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
      <Scrollbars
        className="none-bar-scroller"
        autoHide
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, display: "none" }} />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div {...props} style={{ ...style, display: "none" }} />
        )}
        renderView={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
            }}
          />
        )}
        ref={lyricScrollRef}>
        {showYrc && isHasYrc ? (
          songLyric.yrcData.map((item: any, index: number) => (
            <div 
              key={index}
              id={`lrc-${index}`} 
              className="lyric-container">
                <div
                className={`lrc-line is-yrc ${lyricIndex === index ? "on" : ""}`}
                style={{
                  filter: lyricsBlur
                    ? `blur(${Math.min(Math.abs(lyricIndex - index) * 1.8, 10)}px)`
                    : "blur(0)",
                }}
                onClick={() => jumpSeek(item.time)}
                >
                  <div className="content">
                    {item.contents.map((text: any, textIndex: number) => (
                      <span
                        key={textIndex}
                        className={`content-text ${
                          text.duration >= 1.5 && currentSeek <= text.endTime ? "content-long" : ""} 
                          ${text.endsWithSpace && 'end-with-space'}
                          `}
                      >
                        <span className="word">{text.content}</span>
                        <span className="filler" style={getYrcStyle(text, index)}>
                          {text.content}
                        </span>

                      </span>
                    ))}
                  </div>
                  {item.tran && showTran && <span className="tran">{item.tran}</span>}
                  {item.roma && showRoma && <span className="roma">{item.roma}</span>}
                </div>
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
