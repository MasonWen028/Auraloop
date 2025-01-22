import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import localforage from "localforage";
import { ListState, SongItem, UserDataType } from '@/types/main'

// Initialize localForage instances
const musicDB = localforage.createInstance({
  name: "music-data",
  description: "List data of the application",
  storeName: "music",
});

const userDB = localforage.createInstance({
  name: "user-data",
  description: "User data of the application",
  storeName: "user",
});

// Define the initial state
const initialState: ListState = {
  playList: [] as SongItem[],
  historyList: [] as SongItem[],
  searchHistory: [],
  localPlayList: [],
  cloudPlayList: [] as SongItem[],
  userLoginStatus: false,
  loginType: "qr",
  userData: {
    userId: 0,
    userType: 0,
    vipType: 0,
    name: "",
    cookies: "",
    loginType: 0
  },
  userLikeData: {
    songs: [],
    playlists: [],
    artists: [],
    albums: [],
    mvs: [],
    djs: [],
  },
  likeSongsList: {
    detail: {
      id: 0,
      name: "My favorite",
      cover: "/images/album.jpg?assest",
    },
    data: [] as SongItem[],
  },
  catData: {
    type: {},
    cats: [],
    hqCats: [],
  },
};

async function loadUserData() {
  try {
    const userDataKeys = await userDB.keys();
    const userLikeData: Record<string, UserDataType> = {};

    await Promise.all(
      userDataKeys.map(async (key) => {
        const data = await userDB.getItem<UserDataType>(key);
        if (data) {
          userLikeData[key] = data;
        }
      })
    );

    console.log("Loaded user data:", userLikeData);
  } catch (error) {
    console.error("Error loading data from userDB:", error);
  }
} 

loadUserData();

// Create the dataSlice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDataType>) {
      state.userData = action.payload;
      userDB.setItem("userData", action.payload); // Persist in localForage
    },
    // Set the playlist
    setPlayList(state, action: PayloadAction<any[]>) {
      state.playList = action.payload;
      musicDB.setItem("playList", action.payload); // Persist in localForage
    },

    // Add a song to the playlist
    addSongToPlayList(state, action: PayloadAction<SongItem>) {
      const song = action.payload;
      const updatedPlayList = [...state.playList.filter((s) => s.id !== song.id), song];
      state.playList = updatedPlayList;
      musicDB.setItem("playList", updatedPlayList); // Persist in localForage
    },

    // Set history list
    setHistory(state, action: PayloadAction<SongItem>) {
      const song = action.payload;
      const updatedHistoryList = [song, ...state.historyList.filter((s) => s.id !== song.id)];
      state.historyList = updatedHistoryList.slice(0, 500); // Keep max 500 entries
      musicDB.setItem("historyList", updatedHistoryList); // Persist in localForage
    },

    // Clear history
    clearHistory(state) {
      state.historyList = [];
      musicDB.setItem("historyList", []); // Persist in localForage
    },

    // Set "liked" songs
    setLikeSongsList(state, action: PayloadAction<{ detail: any; data: any[] }>) {
      state.likeSongsList = action.payload;
      musicDB.setItem("likeSongsList", action.payload); // Persist in localForage
    },

    // Set cloud playlist
    setCloudPlayList(state, action: PayloadAction<any[]>) {
      state.cloudPlayList = action.payload;
      musicDB.setItem("cloudPlayList", action.payload); // Persist in localForage
    },

    // Set user login status
    setUserLoginStatus(state, action: PayloadAction<boolean>) {
      state.userLoginStatus = action.payload;
    },
    // Set user liked data
    setUserLikeData(state, action: PayloadAction<any>) {
      state.userLikeData = action.payload;
      userDB.setItem("userLikeData", action.payload); // Persist in localForage
    },

    // Clear user data
    clearUserData(state) {
      state.userLoginStatus = false;
      state.loginType = "qr";
      state.userData = {
        userId: 0,
        userType: 0,
        vipType: 0,
        name: "",
      };
      state.userLikeData = {
        songs: [],
        playlists: [],
        artists: [],
        albums: [],
        mvs: [],
        djs: [],
      };
      userDB.clear(); // Clear all user-related data from localForage
    },

    // Set category data
    setCatData(state, action: PayloadAction<any>) {
      state.catData = action.payload;
    },
  },
});

export const {
  setPlayList,
  addSongToPlayList,
  setHistory,
  clearHistory,
  setLikeSongsList,
  setCloudPlayList,
  setUserLoginStatus,
  setUserData,
  setUserLikeData,
  clearUserData,
  setCatData,
} = dataSlice.actions;

export default dataSlice.reducer;
