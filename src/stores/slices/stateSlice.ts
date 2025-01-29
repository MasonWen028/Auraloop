import { SongType } from "@/types/main";
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
  playerMuted: false
}

async function loadDefaultState() {
  try {
    const stateDataKeys = await stateDB.keys();
    const stateDataList: Record<string, any> = {};

    await Promise.all(
      stateDataKeys.map(async (key) => {
        const data = await stateDB.getItem(key);
        if (data) {
          stateDataList[key] = data;
        }
      })
    );

    if (stateDataList.playSong) {
      initialState.playSong = stateDataList.playSong;
    }

    if (stateDataList.repeatModel) {
      initialState.repeatModel = stateDataList.repeatModel;
    }
  } catch (error) {
    console.error("Error loading data from userDB:", error);
  }
} 

await loadDefaultState();

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setPlayState(state, action:PayloadAction<PlayStateType>) {
      state.playState = action.payload;
    },
    setPlaySong(state, action: PayloadAction<SongType>) {
      state.playSong = {...action.payload, cover: GetCover(action.payload)};
      stateDB.setItem("playSong", action.payload);
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
    },
    setPlayList(state, action: PayloadAction<SongType[]>) {
      action.payload.map((song: SongType) => {
        song.cover = GetCover(song);
      })
      state.playList = action.payload;
    },
    setPlayIndex(state, action: PayloadAction<number>) {
      if(action.payload > state.playList?.length - 1) {
        action.payload = 0;
      }
      state.playIndex = action.payload;
    },
    setPlayFmIndex(state, action: PayloadAction<number>) {
      if(action.payload > state.playFmList?.length - 1) {
        action.payload = 0;
      }
      state.playFmIndex = action.payload;
    },
    setPlayVolume(state, action: PayloadAction<number>) {
      state.playVolume = action.payload;
      stateDB.setItem("playVolume", action.payload);
    },
    setPlayerMuted(state, action: PayloadAction<boolean>) {
      state.playerMuted = action.payload;
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
  setPlayerMuted
} = stateSlice.actions;

export default stateSlice.reducer;
