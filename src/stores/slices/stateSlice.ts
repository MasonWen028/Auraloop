import { LyricType, SongType } from "@/types/main";
import type { LyricLine } from "@applemusic-like-lyrics/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { isString } from "lodash";

type PlayStateType = 0 | 1 | 2 | 3; // 0 for stopping 1 for playing 2 for pause 3 for loading
type PlayModeType = 0 | 1 | 2; // 0 for personalFM 1 for playlist 
type RepeatType = "repeat" | "repeat-once" | "shuffle";
type SortType = "default" | "name" | "date";

interface State {
  playState: PlayStateType; 
  playSong: SongType;
  repeatModel: RepeatType;
  nextSong: SongType;
  playMode: PlayModeType;
  playFmList: SongType[];
  playList: SongType[];
  playIndex: number;
  playFmIndex: number;
  playVolume: number;
  playerMuted: boolean;
  songLyric: {
    lrcData: LyricType[];
    yrcData: LyricType[];
    lrcAMData: LyricLine[];
    yrcAMData: LyricLine[];
  };
  currentTimeOffset: number;
  lyricIndex: number;
  currentSeek: number;
  propgress: number;
  duration: number;
  chorusDot: number[];
  playHistory: SongType[];
  historyIndex: number
}

const stateDB = localforage.createInstance({
  name: "state",
  description: "state manager repo",
  storeName: "state",
});

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

let initialState:State = {
  playState: 0,
  playSong: defaultMusicData,
  repeatModel: "repeat",
  nextSong: defaultMusicData,
  playMode: 0,
  playFmList: [],
  playList: [],
  playFmIndex: 0,
  playIndex: 0,
  playVolume: 0.7,
  playerMuted: false,
  songLyric: {
    lrcData: [],
    yrcData: [],
    lrcAMData: [],
    yrcAMData: [],
  },
  currentTimeOffset: 0,
  lyricIndex: 0,
  currentSeek: 0,
  propgress: 0,
  duration: 0,
  chorusDot: [],
  playHistory: [],
  historyIndex: 0
}

async function loadDefaultState() {
  try {
    const stateDataKeys = await stateDB.keys();
    const stateDataList: Partial<State> = {};

    await Promise.all(
      stateDataKeys.map(async (key) => {
        const data = await stateDB.getItem(key);
        if (data) {
          (stateDataList as any)[key] = data;
        }
      })
    );

    initialState = {...initialState, ...stateDataList}
  } catch (error) {
    console.error("Error loading data from userDB:", error);
  }
} 

await loadDefaultState();

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setPlayHistory(state, action: PayloadAction<SongType[]>) {
      state.playHistory = action.payload;
      stateDB.setItem("playHistory", action.payload);
    },
    setHistoryIndex(state, action: PayloadAction<number>) {
      state.historyIndex = action.payload;
      stateDB.setItem("historyIndex", action.payload);
    },
    setPlayState(state, action:PayloadAction<PlayStateType>) {
      state.playState = action.payload;
    },
    setPlaySong(state, action: PayloadAction<SongType>) {
      state.playSong = {...action.payload, cover: GetCover(action.payload)};
      state.duration = action.payload.duration / 1000;
      state.currentSeek = 0;
      state.lyricIndex = 0;
    },
    setNextSong(state, action: PayloadAction<SongType>) {
      state.nextSong = action.payload;
      stateDB.setItem("nextSong", action.payload);
    },
    setRepeatModel(state, action: PayloadAction<RepeatType>) {
      state.repeatModel = action.payload;
      stateDB.setItem("repeatModel", action.payload);
    },
    setPlayMode(state, action: PayloadAction<PlayModeType>) {
      state.playMode = action.payload;
      stateDB.setItem("playMode", action.payload);
    },
    setPlayFmList(state, action: PayloadAction<SongType[]>) {
      action.payload.map((song: SongType) => {
        song.cover = GetCover(song);
      })
      state.playFmList = action.payload;
      stateDB.setItem("playFmList", action.payload);
    },
    setPlayList(state, action: PayloadAction<SongType[]>) {
      action.payload.map((song: SongType) => {
        song.cover = GetCover(song);
      })
      state.playList = action.payload;
      stateDB.setItem("playList", action.payload);
    },
    setPlayIndex(state, action: PayloadAction<number>) {
      if(action.payload > state.playList?.length - 1) {
        action.payload = 0;
      }
      state.playIndex = action.payload;
      stateDB.setItem("playIndex", action.payload);
    },
    setPlayFmIndex(state, action: PayloadAction<number>) {
      if(action.payload > state.playFmList?.length - 1) {
        action.payload = 0;
      }
      state.playFmIndex = action.payload;
      stateDB.setItem("playFmIndex", action.payload);
    },
    setPlayVolume(state, action: PayloadAction<number>) {
      state.playVolume = action.payload;
      stateDB.setItem("playVolume", action.payload);
    },
    setPlayerMuted(state, action: PayloadAction<boolean>) {
      state.playerMuted = action.payload;
      stateDB.setItem("playerMuted", action.payload);
    },
    setSongLyric(state, action: PayloadAction<{
      lrcData: LyricType[];
      yrcData: LyricType[];
      lrcAMData: LyricLine[];
      yrcAMData: LyricLine[];
    }>) {
      state.songLyric = action.payload;
      stateDB.setItem("songLyric", action.payload);
    },
    setLyricIndex(state, action: PayloadAction<number>) {
      state.lyricIndex = action.payload;
    },
    setCurrentTimeOffset(state, action: PayloadAction<number>) {
      state.currentTimeOffset = action.payload;
    },
    setCurrentSeek(state, action: PayloadAction<number>) {
      state.currentSeek = action.payload;
    },
    setCurrentState(state, action: PayloadAction<{currentSeek: number, progress: number, lyricIndex: number, duration: number}>) {
      state.currentSeek = action.payload.currentSeek;
      state.lyricIndex = action.payload.lyricIndex;
      state.propgress = action.payload.progress;
      state.duration = action.payload.duration;
    },
    setChorusDots(state, action: PayloadAction<number[]>) {
      state.chorusDot = action.payload;
    },
    resetLyricState(state) {
      state.currentSeek = 0;
      state.lyricIndex = 0;
      state.propgress = 0;
      state.duration = 0;
      state.chorusDot = [];
      state.songLyric = {
        lrcData: [],
        yrcData: [],
        lrcAMData: [],
        yrcAMData: [],
      }
    }
  }
})

const GetCover = (song: SongType) => {
  let tempCover = song?.cover;
  if (!tempCover) {
    if (!isString(song?.album)) {
      tempCover = song?.album?.picUrl + '';
    }
  }
  if (!tempCover) {
    if (Array.isArray(song?.artists)) {
      tempCover = song?.artists[0].picUrl + '';
    }
  }
  if (!tempCover) {
    tempCover = "/assets/images/song.jpg"
  }
  return tempCover;
}

export const {
  setChorusDots,
  setPlayHistory,
  setHistoryIndex,
  resetLyricState,
  setCurrentState,
  setCurrentSeek,
  setLyricIndex,
  setCurrentTimeOffset,
  setPlayFmList,
  setPlayList,
  setPlayIndex,
  setPlayFmIndex,
  setPlayState,
  setPlaySong,
  setNextSong,
  setRepeatModel,
  setPlayMode,
  setPlayVolume,
  setPlayerMuted,
  setSongLyric
} = stateSlice.actions;

export default stateSlice.reducer;
