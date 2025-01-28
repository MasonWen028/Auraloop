import { createSelector } from 'reselect';

// Base selectors for slices of state
const selectMusic = (state: any) => state.music;
const selectStatus = (state: any) => state.status;
const selectSetting = (state: any) => state.setting;

// Specific field selectors
const selectSongLyric = createSelector(selectMusic, (music) => music.songLyric);
const selectPlaySong = createSelector(selectMusic, (music) => music.playSong);
const selectCurrentTimeOffset = createSelector(selectMusic, (music) => music.currentTimeOffset);
const selectPureLyricMode = createSelector(selectMusic, (music) => music.pureLyricMode);

const selectLyricIndex = createSelector(selectStatus, (status) => status.lyricIndex);
const selectPlayLoading = createSelector(selectStatus, (status) => status.playLoading);
const selectPlayerMetaShow = createSelector(selectStatus, (status) => status.playerMetaShow);

const selectLyricsScrollPosition = createSelector(selectSetting, (setting) => setting.lyricsScrollPosition);
const selectLyricFontSize = createSelector(selectSetting, (setting) => setting.lyricFontSize);
const selectLyricTranFontSize = createSelector(selectSetting, (setting) => setting.lyricTranFontSize);
const selectLyricFontBold = createSelector(selectSetting, (setting) => setting.lyricFontBold);
const selectLyricBlur = createSelector(selectSetting, (setting) => setting.lyricsBlur);

const selectShowYrcAnimation = createSelector(selectSetting, (setting) => setting.showYrcAnimation);

const selectLrcMousePause = createSelector(selectSetting, (setting) => setting.lrcMousePause);
const selectLyricRomaFontSize = createSelector(selectSetting, (setting) => setting.lyricRomaFontSize);
const selectLyricFont= createSelector(selectSetting, (setting) => setting.lyricFont);
const selectPlayerType= createSelector(selectSetting, (setting) => setting.playerType);
const selectLyricsPosition = createSelector(selectSetting, (setting) => setting.lyricsPosition);
const selectShowYrc = createSelector(selectSetting, (setting) => setting.showYrc);
const selectShowTran = createSelector(selectSetting, (setting) => setting.sowTran);
const selectShowRoma = createSelector(selectSetting, (setting) => setting.sowRoma);

export const selectLyricSettings = createSelector(
  [
    selectSongLyric,
    selectPlaySong,
    selectCurrentTimeOffset,
    selectPureLyricMode,
    selectLyricIndex,
    selectPlayLoading,
    selectPlayerMetaShow,
    selectLyricsScrollPosition,
    selectLyricFontSize,
    selectLyricTranFontSize,
    selectLyricFontBold,
    selectLyricBlur,
    selectShowYrcAnimation,
    selectLrcMousePause,
    selectLyricRomaFontSize,
    selectLyricFont,
    selectPlayerType,
    selectLyricsPosition,
    selectShowYrc,
    selectShowTran, // Fixed incorrect field name
    selectShowRoma, // Fixed incorrect field name
  ],
  (
    songLyric,
    playSong,
    currentTimeOffset,
    pureLyricMode,
    lyricIndex,
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
    showRoma
  ) => ({
    songLyric,
    playSong,
    currentTimeOffset,
    pureLyricMode,
    lyricIndex,
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
  })
);

