// src/types/MusicItem.ts

export interface SongItem {
  id: number;
  name: string;
  artists: string;
  album: string;
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
  cover: string;
  coverSize?: CoverSize;
  alia?: string;
  identify?: string;
  description?: string;
  albumSize?: number;
  musicSize?: number;
  mvSize?: number;
  fansSize?: number;
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
}

export interface UserLikeDataType {
  songs: number[];
  playlists: CoverType[];
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