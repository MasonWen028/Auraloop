import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import localforage from "localforage";
import { AlbumType, ArtistType, CoverType, ListState, PlaylistType, SongItem, UserDataType } from '@/types/main'
import cloneDeep from "lodash-es/cloneDeep";

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
let initialState: ListState = {
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
    songs: [] as number[],
    playlists: [] as PlaylistType[],
    artists: [] as ArtistType[],
    albums: [] as AlbumType[],
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
    const userDataList: Record<string, UserDataType> = {};

    await Promise.all(
      userDataKeys.map(async (key) => {
        const data = await userDB.getItem<UserDataType>(key);
        if (data) {
          userDataList[key] = data;
        }
      })
    );
    if (userDataList.userData) {
      initialState = {...initialState, userData: userDataList.userData,userLoginStatus: true }
    }

    if (userDataList.userLikeData) {
      initialState = {...initialState, userLikeData: userDataList.userLikeData as any}
    }
  } catch (error) {
    console.error("Error loading data from userDB:", error);
  }
} 

await loadUserData();

// Create the dataSlice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDataType>) {
      state.userData =  {...state.userData, ...action.payload};
      userDB.setItem("userData", state.userData);
    },
    setCookies(state, action: PayloadAction<string>) {
      state.userData = {...state.userData, cookies: action.payload};
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
    setLikeSongsList(state, action: PayloadAction<number[]>) {
      state.userLikeData.songs = action.payload;
      userDB.setItem("userLikeData", JSON.parse(JSON.stringify(state.userLikeData)));
    },

    // Set "liked" playlists
    setLikePlaylist(state, action: PayloadAction<PlaylistType[]>) {
      state.userLikeData.playlists = action.payload;
      userDB.setItem("userLikeData", JSON.parse(JSON.stringify(state.userLikeData)));
    },

    // Set "liked" artists
    setLikeArtistList(state, action: PayloadAction<ArtistType[]>) {
      state.userLikeData.artists = action.payload;
      userDB.setItem("userLikeData", JSON.parse(JSON.stringify(state.userLikeData)));
    },

    // Set "liked" album
    setLikeAlbumList(state, action: PayloadAction<AlbumType[]>) {
      state.userLikeData.albums = action.payload;
      userDB.setItem("userLikeData", JSON.parse(JSON.stringify(state.userLikeData)));
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
  setLikePlaylist,
  setLikeAlbumList,
  setLikeArtistList,
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
  setCookies
} = dataSlice.actions;

export default dataSlice.reducer;
