import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript interfaces
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorScheme {
  hex: string;
  rgb: RGB;
}

type PlayModeType = "repeat" | "repeat-once" | "shuffle";
type SortType = "default" | "name" | "date";

interface StatusState {
  showSongCard: boolean;
  menuCollapsed: boolean;
  searchFocus: boolean;
  searchInputValue: string;
  showPlayBar: boolean;
  showFullPlayer: boolean;
  fullPlayerActive: boolean;
  playerMetaShow: boolean;
  playListShow: boolean;
  playStatus: boolean;
  playLoading: boolean;
  playRate: number;
  playVolume: number;
  playVolumeMute: number;
  playSongMode: PlayModeType;
  playHeartbeatMode: boolean;
  songCoverTheme: {
    main?: RGB;
    light?: ColorScheme;
    dark?: ColorScheme;
  };
  spectrumsData: number[];
  pureLyricMode: boolean;
  playIndex: number;
  lyricIndex: number;
  currentTime: number;
  duration: number;
  chorus: number;
  progress: number;
  currentTimeOffset: number;
  playUblock: boolean;
  mainContentHeight: number;
  listSort: SortType;
  showDesktopLyric: boolean;
  showPlayerComment: boolean;
  personalFmMode: boolean;
  updateCheck: boolean;
}

// Initial state
const initialState: StatusState = {
  showSongCard: true,
  menuCollapsed: false,
  searchFocus: false,
  searchInputValue: "",
  showPlayBar: true,
  showFullPlayer: false,
  fullPlayerActive: false,
  playerMetaShow: true,
  playListShow: false,
  playStatus: false,
  playLoading: false,
  playRate: 1,
  playVolume: 0.7,
  playVolumeMute: 0,
  playSongMode: "repeat",
  playHeartbeatMode: false,
  songCoverTheme: {},
  spectrumsData: [],
  pureLyricMode: false,
  playIndex: -1,
  lyricIndex: -1,
  currentTime: 0,
  duration: 0,
  chorus: 0,
  progress: 0,
  currentTimeOffset: 0,
  playUblock: false,
  mainContentHeight: 0,
  listSort: "default",
  showDesktopLyric: false,
  showPlayerComment: false,
  personalFmMode: false,
  updateCheck: false,
};

// Redux slice
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    // Toggle menu collapsed state
    toggleMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },
    setSpectrumsData(state, action: PayloadAction<number[]>) {
      state.spectrumsData = action.payload;
    },
    // Set search focus
    setSearchFocus(state, action: PayloadAction<boolean>) {
      state.searchFocus = action.payload;
    },
    // Set search input value
    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    // Set play status
    setPlayStatus(state, action: PayloadAction<boolean>) {
      state.playStatus = action.payload;
    },
    // Set current time
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    // Set play volume
    setPlayVolume(state, action: PayloadAction<number>) {
      state.playVolume = action.payload;
    },
    // Reset state to initial
    resetState() {
      return initialState;
    },
    setCurrentState(state, action: PayloadAction<{ currentTime: number, duration: number, progress: number, lyricIndex:number }>) {
      state = {...state, ...action.payload}
    },
    setSongCardVisible(state, action: PayloadAction<boolean>) {
      state.showSongCard = action.payload;
    }
  },
});

// Export actions
export const {
  toggleMenuCollapsed,
  setSearchFocus,
  setSearchInputValue,
  setPlayStatus,
  setCurrentTime,
  setPlayVolume,
  resetState,
  setCurrentState,
  setSongCardVisible,
  setSpectrumsData,
} = statusSlice.actions;

// Selectors
export const selectPlayVolumeIcon = (state: { status: StatusState }) => {
  const volume = state.status.playVolume;
  return volume === 0
    ? "VolumeOff"
    : volume < 0.4
    ? "VolumeMute"
    : volume < 0.7
    ? "VolumeDown"
    : "VolumeUp";
};

export const selectPlayModeIcon = (state: { status: StatusState }) => {
  const mode = state.status.playSongMode;
  return state.status.playHeartbeatMode
    ? "HeartBit"
    : mode === "repeat"
    ? "Repeat"
    : mode === "repeat-once"
    ? "RepeatSong"
    : "Shuffle";
};

export const selectPlayVolumePercent = (state: { status: StatusState }) =>
  Math.round(state.status.playVolume * 100);

export const selectMainColor = (state: { status: StatusState }) => {
  const mainColor = state.status.songCoverTheme?.main;
  return mainColor ? `${mainColor.r}, ${mainColor.g}, ${mainColor.b}` : "239, 239, 239";
};

export default statusSlice.reducer;
