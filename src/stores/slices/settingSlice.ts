import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript interfaces
type ThemeMode = "light" | "dark" | "auto";
type ThemeColorType =
  | "default"
  | "orange"
  | "blue"
  | "pink"
  | "brown"
  | "indigo"
  | "green"
  | "purple"
  | "yellow"
  | "teal"
  | "custom";
type PlayDevice = "default" | string;
type ProxyProtocol = "off" | "http" | "https";
type PlayerType = "cover" | "record";
type PlayerBackgroundType = "none" | "animation" | "blur" | "color";
type RouteAnimation = "none" | "fade" | "zoom" | "slide" | "up";

interface SettingState {
  themeMode: ThemeMode;
  themeColorType: ThemeColorType;
  themeCustomColor: string;
  themeGlobalColor: boolean;
  themeFollowCover: boolean;
  globalFont: string;
  LyricFont: string;
  showCloseAppTip: boolean;
  closeAppMethod: "exit" | "hide";
  showTaskbarProgress: boolean;
  useOnlineService: boolean;
  checkUpdateOnStart: boolean;
  hideVipTag: boolean;
  lyricFontSize: number;
  lyricTranFontSize: number;
  lyricRomaFontSize: number;
  lyricFontBold: boolean;
  showYrc: boolean;
  showYrcAnimation: boolean;
  showTran: boolean;
  showRoma: boolean;
  lyricsPosition: "flex-start" | "center" | "flex-end";
  lyricsScrollPosition: "start" | "center";
  downloadPath: string;
  downloadMeta: boolean;
  downloadCover: boolean;
  downloadLyric: boolean;
  saveMetaFile: boolean;
  proxyProtocol: ProxyProtocol;
  proxyServe: string;
  proxyPort: number;
  songLevel:
    | "standard"
    | "higher"
    | "exhigh"
    | "lossless"
    | "hires"
    | "jyeffect"
    | "sky"
    | "jymaster";
  playDevice: PlayDevice;
  autoPlay: boolean;
  songVolumeFade: boolean;
  songVolumeFadeTime: number;
  useSongUnlock: boolean;
  countDownShow: boolean;
  barLyricShow: boolean;
  playerType: PlayerType;
  playerBackgroundType: PlayerBackgroundType;
  memoryLastSeek: boolean;
  showPlaylistCount: boolean;
  showSpectrums: boolean;
  smtcOpen: boolean;
  smtcOutputHighQualityCover: boolean;
  lyricsBlur: boolean;
  lrcMousePause: boolean;
  playSongDemo: boolean;
  showSearchHistory: boolean;
  useAMLyrics: boolean;
  useAMSpring: boolean;
  menuShowCover: boolean;
  preventSleep: boolean;
  localFilesPath: string[];
  localSeparators: string[];
  showLocalCover: boolean;
  routeAnimation: RouteAnimation;
  useRealIP: boolean;
  realIP: string;
  fullPlayerCache: boolean;
  scrobbleSong: boolean;
  dynamicCover: boolean;
  useKeepAlive: boolean;
  excludeKeywords: string[];
  showDefaultLocalPath: boolean;
}

// Initial state
const initialState: SettingState = {
  themeMode: "auto",
  themeColorType: "default",
  themeCustomColor: "#fe7971",
  themeFollowCover: false,
  themeGlobalColor: false,
  globalFont: "default",
  LyricFont: "follow",
  hideVipTag: false,
  showSearchHistory: true,
  menuShowCover: true,
  routeAnimation: "slide",
  useOnlineService: true,
  showCloseAppTip: true,
  closeAppMethod: "hide",
  showTaskbarProgress: false,
  checkUpdateOnStart: true,
  preventSleep: false,
  fullPlayerCache: false,
  useKeepAlive: true,
  songLevel: "exhigh",
  playDevice: "default",
  autoPlay: false,
  songVolumeFade: true,
  songVolumeFadeTime: 300,
  useSongUnlock: true,
  countDownShow: true,
  barLyricShow: true,
  playerType: "cover",
  playerBackgroundType: "blur",
  memoryLastSeek: true,
  showPlaylistCount: true,
  showSpectrums: true,
  smtcOpen: true,
  smtcOutputHighQualityCover: false,
  playSongDemo: false,
  scrobbleSong: false,
  dynamicCover: true,
  lyricFontSize: 46,
  lyricTranFontSize: 22,
  lyricRomaFontSize: 18,
  lyricFontBold: true,
  useAMLyrics: false,
  useAMSpring: false,
  showYrc: true,
  showYrcAnimation: true,
  showTran: true,
  showRoma: true,
  lyricsPosition: "flex-start",
  lyricsBlur: false,
  lyricsScrollPosition: "start",
  lrcMousePause: false,
  excludeKeywords: [],
  localFilesPath: [],
  showDefaultLocalPath: true,
  localSeparators: ["/", "&"],
  showLocalCover: true,
  downloadPath: "",
  downloadMeta: true,
  downloadCover: true,
  downloadLyric: true,
  saveMetaFile: false,
  proxyProtocol: "off",
  proxyServe: "127.0.0.1",
  proxyPort: 80,
  useRealIP: false,
  realIP: "116.25.146.177",
};

// Redux slice
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    // Set theme mode
    setThemeMode(state, action: PayloadAction<ThemeMode | undefined>) {
      if (action.payload === undefined) {
        state.themeMode =
          state.themeMode === "auto"
            ? "light"
            : state.themeMode === "light"
            ? "dark"
            : "auto";
      } else {
        state.themeMode = action.payload;
      }
    },
    // Other actions can be added here for further customization
  },
});

// Export actions
export const { setThemeMode } = settingSlice.actions;


// Export store
export default settingSlice.reducer;
