import { LyricType, SongType } from "@/types/main";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { isString } from "lodash";

// Define TypeScript interfaces
interface LyricLine {
  // Define properties for LyricLine
}


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
  songCover: string
}

// Default music data
const defaultMusicData: SongType = {
  id: 0,
  name: "未播放歌曲",
  artists: "未知歌手",
  album: "未知专辑",
  cover: "/images/song.jpg?assest",
  duration: 0,
  free: 0,
  mv: null,
  type: "song",
};

// Initial state
const initialState: MusicState = {
  playSong: JSON.parse(localStorage.getItem("playSong") + '') || { ...defaultMusicData },
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
  songCover: ''
};

// Redux slice
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
    // Set the current song
    setPlaySong(state, action: PayloadAction<SongType>) {
      let tempCover = action.payload?.cover;
      if (!tempCover) {
        if (!isString(action.payload?.album)) {
          tempCover = action.payload?.album?.picUrl + '';
        }
      }
      if (!tempCover) {
        if (Array.isArray(action.payload?.artists)) {
          tempCover = action.payload?.artists[0].picUrl + '';
        }
      }
      if (!tempCover) {
        tempCover = "/assets/images/song.jpg"
      }

      state.playSong = {...action.payload, cover: tempCover};

      localStorage.setItem("playSong", JSON.stringify(state.playSong));
    },
    // Set the playlist ID
    setPlayPlaylistId(state, action: PayloadAction<number>) {
      state.playPlaylistId = action.payload;
    },
    // Set song lyrics
    setSongLyric(state, action: PayloadAction<MusicState["songLyric"]>) {
      state.songLyric = action.payload;
    },
    // Set personal FM data
    setPersonalFM(state, action: PayloadAction<MusicState["personalFM"]>) {
      state.personalFM = action.payload;
    },
    // Set daily songs data
    setDailySongsData(state, action: PayloadAction<MusicState["dailySongsData"]>) {
      state.dailySongsData = action.payload;
    },    
    setPersonalFMIndex(state, action: PayloadAction<number>) {
      state.personalFM.playIndex = action.payload;
    }
  },
});

// Export actions
export const {
  setPersonalFMIndex,
  resetMusicData,
  setPlaySong,
  setPlayPlaylistId,
  setSongLyric,
  setPersonalFM,
  setDailySongsData,
} = musicSlice.actions;

// Selectors
export const selectPlaySong = (state: { music: MusicState }) => state.music.playSong;
export const selectPlayPlaylistId = (state: { music: MusicState }) => state.music.playPlaylistId;
export const selectSongLyric = (state: { music: MusicState }) => state.music.songLyric;
export const selectPersonalFM = (state: { music: MusicState }) => state.music.personalFM;
export const selectDailySongsData = (state: { music: MusicState }) =>
  state.music.dailySongsData;

export default musicSlice.reducer;
