import {
  setPlaySong, 
  setPlayState,
  setHistoryIndex,
  setPlayIndex,
  setChorusDots,
  setPlayList,
  addPlayHistory,
  setPlayMode,
} from "@/stores/slices/stateSlice";
import { SongType } from "@/types/main";
import { Howl, Howler } from "howler";
import { personalFm } from "@/api/rec";
import store from "@/stores";
import { message } from "antd"; // Import for error messages
import { songChorus, songLyric, songUrl, unlockSongUrl } from "@/api/song"; // APIs to fetch song URLs
import { isElectron } from "@/utils/platformDetector"; // Check for Electron environment
import { parsedLyricsData, resetSongLyric } from "./lyric";
import { setCurrentState } from "@/stores/slices/stateSlice";

class NewPlayer {
  private player: Howl | null = null;

  private isPaused: boolean = false;

  private volume: number = store.getState().state.playVolume;

  private lyricsInterval: NodeJS.Timeout | null = null;

  constructor() {
    Howler.unload(); // Ensure the previous player instance is unloaded

    store.subscribe(() => {
      const newVolume = store.getState().state.playVolume;
      if (newVolume !== this.volume) {
        this.setVolume(newVolume);
      }
    });
  }

    /**
   * Set player volume in real-time.
   * @param volume The new volume level (0.0 - 1.0)
   */
    setVolume(volume: number) {
      this.volume = volume;
      if (this.player) {
        this.player.volume(volume);
      }
    }

  async doPlay (autoPlay: boolean = false) {
    let { playMode, playList, playIndex } = store.getState().state;
    if (playMode === 0) {
      if (playList.length === 0 || playIndex >= playList.length - 1) {
        await this.loadPersonalFm();
      }
    }
    playList = store.getState().state.playList;
    playIndex = store.getState().state.playIndex;
    const song = playList[playIndex];
    const url = await this.getPlayableUrl(song);
    if (!url) {
      message.error(`该歌曲暂无音源，跳至下一首`);
      return this.nextSong();
    }

    store.dispatch(setPlaySong(song));  
    
    await this.playSong(url, song, autoPlay);
  }
  
  async playSong(url: string, song: SongType, autoPlay: boolean) {
    await this.getLyricData(song.id);

    await this.getChorus(song.id);

    store.dispatch(addPlayHistory(song));

    // Create the Howl player and start playback
    await this.createPlayer(url, autoPlay);
  }

  /**
   * Start playing the FM list.
   */
  async playFm(autoPlay: boolean = true) {
    const state = store.getState().state; // Access the Redux state
    let { playList, playIndex } = state;

    // If playFmList is empty, fetch a new FM list first
    if (playList.length === 0) {
      await this.loadPersonalFm();
      playList = store.getState().state.playList; // Refresh the list
      playIndex = 0; // Reset index after fetching new songs
    }

    // Ensure index is valid
    if (playIndex >= playList.length) {
      console.error("Invalid playFmIndex. Resetting to 0.");
      store.dispatch(setPlayIndex(0));
    }

    const song = playList[playIndex];

    // Fetch the correct playable URL
    const url = await this.getPlayableUrl(song);
    if (!url) {
      message.error(`该歌曲暂无音源，跳至下一首`);
      return this.nextSong(); // Skip to the next song
    }

    // Set the current FM song in the state
    store.dispatch(setPlaySong(song));  
    
    await this.playSong(url, song, autoPlay);
  }

  

  /**
   * Move to the next song.
   */
  async nextSong() {
    const state = store.getState().state;
    let { playList, playIndex, playMode } = state;

    if (playIndex < playList.length - 1) {
      store.dispatch(setPlayIndex(playIndex + 1));
    } else {
      if (playMode === 1) {
        store.dispatch(setPlayIndex(0));
      }
      if (playMode === 2) {
        store.dispatch(setPlayMode(0))
      }
    }
    await this.doPlay(true);
  }

  /**
   * Fetches a playable URL for a song.
   * @param song The song to fetch URL for
   * @returns The URL string or null if unavailable
   */
  private async getPlayableUrl(song: SongType): Promise<string | null> {
    try {
      if (!song.id) return null;

      // Fetch the song URL from the API
      const res = await songUrl(song.id);
      const songData = res.data?.[0];

      if (songData && songData.url) {
        return songData.url;
      }

      // Try unlocking the song if necessary
      if (isElectron) {
        const artist = Array.isArray(songData.artists) ? songData.artists[0].name : songData.artists;
        const keyWord = songData.name + "-" + artist;
        const [neteaseUrl, kuwoUrl] = await Promise.all([
          unlockSongUrl(song.id, keyWord, "netease"),
          unlockSongUrl(song.id, keyWord, "kuwo"),
        ]);
        if (neteaseUrl.code === 200 && neteaseUrl.url !== "") return neteaseUrl.url;
        if (kuwoUrl.code === 200 && kuwoUrl.url !== "") return kuwoUrl.url;
        return null;
      }

      return null;
    } catch (error) {
      console.error("Error fetching song URL:", error);
      return null;
    }
  }

  async playPrev() {
    const state = store.getState().state;
    let { playHistory, playMode, playList, playIndex, playSong } = state;
    if (playMode === 0 && playHistory.length > 1) {
      store.dispatch(setPlayList(playHistory))
      if (playSong.id === playHistory[playHistory.length -1].id) {
        store.dispatch(setPlayIndex(playHistory.length - 2))
      } else {
        store.dispatch(setPlayIndex(playHistory.length - 1))
      }
      store.dispatch(setPlayMode(2))
    }
    else {
      if (playList.length - 1 > playIndex) {
        store.dispatch(setPlayIndex(playIndex - 1))
      } else {
        store.dispatch(setPlayIndex(0))
      }
    }

    this.doPlay(true);
    // if (playMode === 1) {
    //   // **Case 1: Playlist Mode - Play Previous Song in Playlist**
    //   if (playIndex > 0) {
    //     store.dispatch(setPlayIndex(playIndex - 1));
    //     return this.playFromPlaylist(playList[playIndex - 1]);
    //   } else {
    //     console.log("Already at the first song in the playlist");
    //     return;
    //   }
    // }
  
    // if (playMode === 0) {
    //   // **Case 2: Personal FM Mode - Play from History**
    //   if (historyIndex > 0) {
    //     // Move back in history
    //     const prevSong = playHistory[historyIndex - 1];
    //     store.dispatch(setHistoryIndex(historyIndex - 1));
    //     store.dispatch(setPlaySong(prevSong));
  
    //     const url = await this.getPlayableUrl(prevSong);
    //     if (!url) {
    //       this.playPrev(); 
    //       return;
    //     }  
    //     await this.createPlayer(url, true);
    //   } else {
    //     // **Case 3: History Ended - Restart Personal FM**
    //     console.log("History ended, restarting Personal FM");
    //     store.dispatch(setHistoryIndex(-1));
    //     await this.playFm();
    //   }
    // }
  
    console.log("No previous song available");
  }
  

  /**
   * Create a Howl player for the given song URL.
   * @param url The song URL to play
   * @param autoPlay Whether to automatically start playback
   */
  private async createPlayer(url: string, autoPlay: boolean) {
    if (this.player) {
      this.player.unload();
    }
    console.log('[CREATE PLAYER]')
    Howler.unload();
    this.player = new Howl({
      src: [url], // Use the fetched URL instead of `song.cover`
      autoplay: autoPlay,
      volume: this.volume,
      format: ["mp3", "flac"], // Adjust formats as needed
      html5: true, // Ensures proper playback on mobile and web
      onend: () => {
        // Automatically move to the next song when the current one ends
        this.stopLyricsUpdate();
        this.nextSong();
      },
      onplay: () => {
        console.log("▶️ Playing:", url);
        store.dispatch(setPlayState(1)); // Set play state to "playing"
        this.startLyricsUpdate();
      },
      onpause: () => {
        console.log("⏸️ Paused:", url);
        store.dispatch(setPlayState(2)); // Set play state to "paused"
        this.stopLyricsUpdate();
      },
      onload: () => {
        console.log("🔄 Song loaded:", url);
      },
      onloaderror: (id, err) => {
        console.error("❌ Load error:", err);
        this.stopLyricsUpdate();
        this.nextSong(); // Move to the next song on error
      },
    });
  }

  /**
   * Start real-time lyrics update.
   */
  private startLyricsUpdate() {
    console.log('[UPDATING]');
    this.stopLyricsUpdate(); // Ensure no duplicate intervals

    this.lyricsInterval = setInterval(() => {
      if (!this.player) return;

      this.updateLyrics(); // Update lyrics based on time
    }, 250); // Update every 250ms
  }

  /**
   * Update lyrics based on the current time.
   */
  private updateLyrics() {
    const { songLyric, currentTimeOffset } = store.getState().state;
    const { showYrc } = store.getState().setting;

    if (songLyric.lrcAMData.length === 0 && songLyric.lrcData.length===0 && songLyric.yrcAMData.length === 0 && songLyric.yrcData.length === 0) return;

    const hasYrc = !songLyric.yrcData.length || !showYrc;
    const lyrics = hasYrc ? songLyric.lrcData : songLyric.yrcData;

    if (!this.player) return;

    const currentTime = this.player.seek();
    const duration = this.player.duration();
    const progress = calculateProgress(currentTime, duration);
    const index = lyrics?.findIndex((v) => v?.time >= currentTime + currentTimeOffset);
    const lyricIndex = index === -1 ? lyrics.length - 1 : index - 1;
    store.dispatch(setCurrentState({currentSeek: currentTime, progress: progress,lyricIndex, duration: duration}));
  }

  private async getChorus(id: number) {
    var res = await songChorus(id);
    var chorus:number[] = [];
    res.data.map((c: any) => chorus.push(c.startTime/1000));
    store.dispatch(setChorusDots(chorus));
  }


  private async getLyricData(id: number) {
    if (!id) {
      resetSongLyric();
      return;
    }
    const lyricRes = await songLyric(id);
    parsedLyricsData(lyricRes);
  }

  async playFromPlaylist(song: SongType) {
    if (!song) return;
  
    store.dispatch(setPlaySong(song));
  
    const url = await this.getPlayableUrl(song);
    if (!url) {
      this.playNext();
      return;
    }
    await this.createPlayer(url, true);
  }

  /**
   * Stop real-time lyrics update.
   */
  private stopLyricsUpdate() {
    if (this.lyricsInterval) {
      clearInterval(this.lyricsInterval);
      this.lyricsInterval = null;
    }
  }

  /**
   * Load personal FM songs and update the Redux state.
   */
  private async loadPersonalFm() {
    try {
      console.log('[CALL PERSONAL FM API]')
      const res = await personalFm();
      if (res.data?.length > 0) {
        store.dispatch(setPlayList(res.data));
        store.dispatch(setPlayIndex(0));
        console.log("🌐 Loaded new FM list:", res.data);
      } else {
        message.warning("Personal FM list is empty. Try again later.");
      }
    } catch (error) {
      console.error("Failed to load personal FM:", error);
      message.error("Failed to load FM songs.");
    }
  }

  async initPersonnalFm() {
    try {
      const res = await personalFm();
      if (res.data?.length > 0) {
        store.dispatch(setPlayList(res.data));
        store.dispatch(setPlaySong(res.data[0]))
        store.dispatch(setPlayIndex(0));
        this.doPlay();
      } else {
        message.warning("Personal FM list is empty. Try again later.");
      }
    } catch (error) {
      console.error("Failed to load personal FM:", error);
      message.error("Failed to load FM songs.");
    }
  }

  /**
   * Check if the player is currently playing.
   * Accurately differentiates between playing, paused, and stopped states.
   */
  isPlaying(): boolean | undefined {
    const playState = store.getState().state.playState; // Get Redux state
    return playState === 1 && this.isPaused;
  }

  isPuasing(): boolean {
    return this.isPaused;
  }

  /**
   * Start playing or resume playback.
   */
  play() {
    if (!this.player) return;

    if (this.isPaused) {
      this.isPaused = false;
    }

    this.player.volume(this.volume);    
    this.player.play();
    store.dispatch(setPlayState(1));
  }

  getSeek() {
    if (!this.player) return 0;

    return this.player.seek();
  }


  playNext() {
    this.nextSong();
    // const state = store.getState().state;
    // let { playMode, playList, playIndex } = state;

    // if (playMode === 1) {
    //   // **Case 1: Playlist Mode - Play Next Song in Playlist**
    //   if (playIndex < playList.length - 1) {
    //     store.dispatch(setPlayIndex(playIndex + 1));
    //     return this.playFromPlaylist(playList[playIndex + 1]);
    //   } else {
    //     console.log("Reached end of playlist");
    //     return;
    //   }
    // }

    // if (playMode === 0) {
    //   // **Case 2: Personal FM Mode - Play Next FM Song**
    //   return this.nextSong();
    // }
  }

  setSeek(time: number) {
    if (!this.player) return;

    this.player.seek(time);
  }
  /**
   * Pause playback while keeping the current song.
   */
  pause() {
    if (!this.player || !this.player.playing()) return;
    
    this.isPaused = true; // Mark as paused
    this.player.pause();
    store.dispatch(setPlayState(2)); // Set Redux state to "paused"

    this.stopLyricsUpdate();

  }

  /**
   * Stop playback completely and reset the state.
   */
  stop() {
    if (!this.player) return;

    this.isPaused = false; // Reset paused state
    this.player.stop();
    store.dispatch(setPlayState(0)); // Set Redux state to "stopped"
    
    this.stopLyricsUpdate();
  }
  
}

/**
 * 计算进度条移动的距离
 * @param {number} currentTime
 * @param {number} duration
 * @returns {number} 进度条移动的距离，精确到 0.01，最大为 100
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (duration === 0) return 0;

  const progress = (currentTime / duration) * 100;
  return Math.min(Math.round(progress * 100) / 100, 100);
};

export default new NewPlayer();
