import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusState } from "@/types/main";

// Initial state definition
let initialState: StatusState = {
  menuCollapsed: false,
  searchFocus: false,
  searchInputValue: "",
  showPlayBar: true,
  playStatus: false,
  playLoading: false,
  playUblock: false,
  playListShow: false,
  showFullPlayer: false,
  fullPlayerActive: false,
  playerMetaShow: true,
  currentTime: 0,
  duration: 0,
  progress: 0,
  chorus: 0,
  currentTimeOffset: 0,
  songCoverTheme: {},
  pureLyricMode: false,
  spectrumsData: [],
  playIndex: -1,
  lyricIndex: -1,
  playRate: 1,
  playVolume: 0.7,
  playVolumeMute: 0,
  playSongMode: "repeat",
  playHeartbeatMode: false,
  personalFmMode: false,
  mainContentHeight: 0,
  listSort: "default",
  showDesktopLyric: false,
  showPlayerComment: false,
  updateCheck: false,
  showSongInfo: false,
  currentSongId: 0,
};

// Create the slice
const status = createSlice({
  name: "status", // Name of the slice
  initialState,
  reducers: {
    // Generic method to update the state
    setStatus: (state, action: PayloadAction<Partial<StatusState>>) => {
      return { ...state, ...action.payload };
    },
    // Toggle menuCollapsed
    toggleMenu: (state) => {
      state.menuCollapsed = !state.menuCollapsed;
    },
    // Update playback status
    updatePlayStatus: (state, action: PayloadAction<boolean>) => {
      state.playStatus = action.payload;
    },
    // Set playback progress
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    // Set current playback time
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    // Update play volume
    setPlayVolume: (state, action: PayloadAction<number>) => {
      state.playVolume = action.payload;
    },
    // Toggle pure lyric mode
    togglePureLyricMode: (state) => {
      state.pureLyricMode = !state.pureLyricMode;
    },
    // Update showing song card or not
    setSongCardVisible: (state,  action: PayloadAction<boolean>) => {
      state.showSongInfo = action.payload;
    }
  },
});

// Export actions
export const {
  setStatus,
  toggleMenu,
  updatePlayStatus,
  setProgress,
  setCurrentTime,
  setPlayVolume,
  togglePureLyricMode,
  setSongCardVisible
} = status.actions;

// Export the reducer
export default status.reducer;
