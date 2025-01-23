// src/types/MusicItem.ts

export interface SongItem {
  id: number;
  name: string;
  artists: ArtistType[];
  album: AlbumType;
  dj?: object;
  cover: string;
  coverSize?: CoverSize;
  duration: number;
  // 0: Unknown | 1: Original song | 2: Cover
  originCoverType?: number;
  alia?: string;
 // 0: Free or copyright-free | 1: VIP songs | 4: Purchase albums | 8: Non-members can play low-quality songs for free, members can play high-quality songs and download them
  free: 0 | 1 | 4 | 8;
  mv: number | null;
  path?: string;
  pc?: boolean;
  size?: number;
  quality?: "Hi-Res" | "HQ" | "SQ";
  createTime?: number;
  updateTime?: number;
  playCount?: number;
  ar: ArtistType[];
  al: AlbumType;
  type: "song" | "radio";
};

// Cover
export type CoverType = {
  id: number;
  name: string;
  cover: string;
  coverSize?: CoverSize;
  description?: string;
  creator?: UserType;
  artists?: string;
  tags?: string[];
  userId?: number | null;
  count?: number;
  privacy?: number;
  liked?: boolean;
  likedCount?: number;
  commentCount?: number;
  shareCount?: number;
  subCount?: number;
  playCount?: number;
  createTime?: number;
  updateTime?: number;
  loading?: boolean;
  updateTip?: string;
  tracks?: {
    first: string;
    second: string;
  }[];
};

export type ArtistType = {
  id: number;
  name: string;
  avatar: string;
  cover: string;
  coverSize?: CoverSize;
  alia?: string;
  identify?: string;
  description?: string;
  albumSize?: number;
  musicSize?: number;
  mvSize?: number;
  fansSize?: number;
  briefDesc: string;
};

export type CommentType = {
  id: number;
  content: string;
  beReplied?: {
    content: string;
    user: UserType;
  };
  time: number;
  user: UserType;
  ip?: {
    ip: string;
    location: string;
  };
  liked?: boolean;
  likedCount?: number;
};

export type CoverSize = {
  s: string;
  m: string;
  l: string;
  xl: string;
};

export type UserType = {
  id: number;
  name: string;
  avatarUrl: string | undefined;
  vipType?: number;
  vipLevel?: number;
  vipIconUrl?: string;
  isAnnualCount?: boolean;
};

export type PlayModeType = "repeat" | "repeat-once" | "shuffle";

export type LyricContentType = {
  time: number;
  endTime: number;
  duration: number;
  content: string;
  endsWithSpace: boolean;
};

export type LyricType = {
  time: number;
  endTime: number;
  tran?: string;
  roma?: string;
  content: string;
  contents: LyricContentType[];
};

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorScheme {
  [key: string]: RGB;
}

export interface CoverColors {
  main?: RGB;
  light?: ColorScheme;
  dark?: ColorScheme;
}

export interface CatType {
  name: string;
  category: number;
  hot?: boolean;
  count?: number;
}

// userData
export interface UserDataType {
  userId: number;
  userType: number;
  vipType: number;
  name: string;
  level?: number;
  avatarUrl?: string;
  backgroundUrl?: string;
  createTime?: number;
  createDays?: number;
  artistCount?: number;
  djRadioCount?: number;
  mvCount?: number;
  subPlaylistCount?: number;
  createdPlaylistCount?: number;
  cookies?: string;
  loginType?: 0 | 1 | 2;
}

export interface UserLikeDataType {
  songs: number[];
  playlists: PlaylistType[];
  artists: ArtistType[];
  albums: CoverType[];
  mvs: CoverType[];
  djs: CoverType[];
}

// sort
export type SortType = keyof typeof sortOptions;

// songLevel
export type SongLevelType = keyof typeof songLevelData;
export type SongLevelDataType = {
  name: string;
  level: string;
  value: SongLevelType;
  size?: number;
  br?: number;
};

export type AlbumType = {
  id: number;
  name: string;
  cover: string;
  artist?: ArtistType;
  description?: string;
  releaseDate?: string;
  songCount?: number;
};


// setting
export type SettingType = "general" | "play" | "lyrics" | "keyboard" | "local" | "other" | "about";

// UpdateLog
export type UpdateLogType = {
  version: string;
  changelog: string;
  time: number;
  url: string;
  prerelease: boolean;
  force?: boolean;
};

interface FileInfoType {
  url: string;
  sha512: string;
  size: number;
}

interface UpdateInfoType {
  tag: string;
  version: string;
  files: FileInfoType[];
  path: string;
  sha512: string;
  releaseDate: string;
  releaseName: string;
  releaseNotes: string;
  prerelease: boolean;
}

// login method
export type LoginType = "qr" | "phone" | "cookie" | "uid";

// player state
export interface StatusState {
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
  showSongInfo: boolean;
  currentSongId: number;
}

interface SettingState {
  themeMode: "light" | "dark" | "auto";
  themeColorType:
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
  themeCustomColor: string;
  themeGlobalColor: boolean;
  themeFollowCover: boolean;
  globalFont: "default" | string;
  LyricFont: "follow" | string;
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
  proxyProtocol: "off" | "http" | "https";
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
  playDevice: "default" | string;
  autoPlay: boolean;
  songVolumeFade: boolean;
  songVolumeFadeTime: number;
  useSongUnlock: boolean;
  countDownShow: boolean;
  barLyricShow: boolean;
  playerType: "cover" | "record";
  playerBackgroundType: "none" | "animation" | "blur" | "color";
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
  routeAnimation: "none" | "fade" | "zoom" | "slide" | "up";
  useRealIP: boolean;
  realIP: string;
  fullPlayerCache: boolean;
  scrobbleSong: boolean;
  dynamicCover: boolean;
  useKeepAlive: boolean;
  excludeKeywords: string[];
  showDefaultLocalPath: boolean;
}

interface ListState {
  playList: SongType[];
  historyList: SongType[];
  cloudPlayList: SongType[];
  searchHistory: string[];
  localPlayList: CoverType[];
  userLoginStatus: boolean;
  loginType: LoginType;
  userData: UserDataType;
  userLikeData: UserLikeDataType;
  likeSongsList: {
    detail: CoverType;
    data: SongType[];
  };
  catData: {
    type: Record<number, string>;
    cats: CatType[];
    hqCats: CatType[];
  };
}

// Type for a single country
interface Country {
  zh: string;      // Chinese name of the country
  en: string;      // English name of the country
  locale: string;  // Locale code (e.g., "CN" for China)
  code: string;    // Country code (e.g., "86" for China)
}

// Type for a group of countries
interface CountryGroup {
  label: string;         // Group label (e.g., "常用", "A", "B")
  countryList: Country[]; // List of countries within the group
}

export interface Creator {
  avatarUrl: string;
  id: number;
  name: string;
}

export interface CoverSize {
  l: string;
  m: string;
  s: string;
  xl: string;
}

export interface PlaylistType {
  artists: string; // Assuming it's a string; adjust if it should be an array or object
  commentCount?: number; // Optional because it's shown as undefined
  count: number;
  cover: string;
  coverSize: CoverSize;
  createTime: number; // Assuming it's a timestamp
  creator: Creator;
  description?: string; // Optional because it's shown as undefined
  duration?: string; // Optional because of NaN:NaN:NaN
  id: number;
  liked?: boolean; // Optional because it's shown as undefined
  likedCount?: number; // Optional because it's shown as undefined
  name: string;
  playCount: number;
  privacy: number;
  shareCount?: number; // Optional because it's shown as undefined
  subCount?: number; // Optional because it's shown as undefined
  tags: string[]; // Assuming it's an array of strings
  tracks?: any[]; // Tracks is shown as empty; type `any[]` for now, adjust if more details are available
  updateTime?: number | null; // Optional and can be null
  updateTip?: string | null; // Optional and can be null
  userId: number;
}

export interface AlbumType {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  followed: boolean;
  id: number;
  img1v1Id: number | string; // The string value might be needed in some cases
  img1v1Id_str?: string; // Optional as it may not always exist
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: string | number; // The type can vary based on backend structure
  picUrl: string;
  topicPerson: number;
  trans: string;
}

export interface Msg {
  name: string;
  picId: number;
  picUrl: string;
  size: number;
  subTime: number;
}

export interface AlbumType {
  alias: string[];
  artists: Artist[];
  id: number;
  msg: Msg[];
  transNames: string[]; // Array of translated names
}


