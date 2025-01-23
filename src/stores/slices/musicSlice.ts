import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LyricLine } from "@applemusic-like-lyrics/core";
import type { SongItem as SongType, LyricType } from "@/types/main";

// Default music data
const defaultMusicData: SongType = {
  id: 0,
  name: "未播放歌曲",
  artists: [],
  album: {} as any,
  cover: "/images/song.jpg?assest",
  duration: 0,
  free: 0,
  mv: null,
  type: "song",
  ar: [],
  al: {} as any,
};

// Define initial state
interface MusicState {
  playSong: SongType;
  playPlaylistId: number;
  songLyric: {
    lrcData: LyricType[];
    yrcData: LyricType[];
    lrcAMData: LyricLine[];
    yrcAMData: LyricLine[];
  };
  personalFM: {
    playIndex: number;
    list: SongType[];
  };
  dailySongsData: {
    timestamp: number | null;
    list: SongType[];
  };
}

const initialState: MusicState = {
  playSong: { ...defaultMusicData },
  playPlaylistId: 0,
  songLyric: {
    lrcData: [],
    yrcData: [],
    lrcAMData: [],
    yrcAMData: [],
  },
  personalFM: {
    playIndex: 0,
    list: [],
  },
  dailySongsData: {
    timestamp: null,
    list: [],
  },
};

// Create slice
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // Reset music data to defaults
    resetMusicData(state) {
      state.playSong = { ...defaultMusicData };
      state.songLyric = {
        lrcData: [],
        yrcData: [],
        lrcAMData: [],
        yrcAMData: [],
      };
    },

    // Update playSong
    updatePlaySong(state, action: PayloadAction<SongType>) {
      state.playSong = action.payload;
    },

    // Update playPlaylistId
    updatePlayPlaylistId(state, action: PayloadAction<number>) {
      state.playPlaylistId = action.payload;
    },

    // Update personal FM data
    updatePersonalFM(state, action: PayloadAction<{ playIndex: number; list: SongType[] }>) {
      state.personalFM = action.payload;
    },

    // Update daily songs data
    updateDailySongsData(state, action: PayloadAction<{ timestamp: number | null; list: SongType[] }>) {
      state.dailySongsData = action.payload;
    },
  },
});

// Selectors (equivalent to getters in Pinia)
export const selectPlaySong = (state: { music: MusicState }) => state.music.playSong;
export const selectSongLyric = (state: { music: MusicState }) => state.music.songLyric;
export const selectPersonalFM = (state: { music: MusicState }) => state.music.personalFM;
export const selectDailySongsData = (state: { music: MusicState }) => state.music.dailySongsData;
export const selectPlayPlaylistId = (state: { music: MusicState }) => state.music.playPlaylistId;

// Derived selectors (computed properties)
export const selectIsHasLrc = (state: { music: MusicState }) =>
  state.music.songLyric.lrcData.length > 0 && state.music.playSong.type !== "radio";

export const selectIsHasYrc = (state: { music: MusicState }) =>
  state.music.songLyric.yrcData.length > 0;

export const selectIsHasPlayer = (state: { music: MusicState }) =>
  state.music.playSong.id !== 0;

export const selectSongCover = (state: { music: MusicState }, size: "s" | "m" | "l" | "xl" | "cover" = "s") =>
  state.music.playSong.path
    ? state.music.playSong.cover
    : size === "cover"
    ? state.music.playSong.cover
    : state.music.playSong.coverSize?.[size] || state.music.playSong.cover;

export const selectPersonalFMSong = (state: { music: MusicState }) =>
  state.music.personalFM.list?.[state.music.personalFM.playIndex] || defaultMusicData;

// Export actions and reducer
export const {
  resetMusicData,
  updatePlaySong,
  updatePlayPlaylistId,
  updatePersonalFM,
  updateDailySongsData,
} = musicSlice.actions;

export default musicSlice.reducer;
