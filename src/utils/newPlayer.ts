import { 
  setPlayFmIndex, 
  setPlaySong, 
  setPlayState, 
  setPlayFmList,
} from "@/stores/slices/stateSlice";
import { SongType } from "@/types/main";
import { Howl, Howler } from "howler";
import { personalFm } from "@/api/rec";
import store from "@/stores";
import { message } from "antd"; // Import for error messages
import { songUrl, unlockSongUrl } from "@/api/song"; // APIs to fetch song URLs
import { isElectron } from "@/utils/platformDetector"; // Check for Electron environment

class NewPlayer {
  private player: Howl | null = null;

  private isPaused: boolean = false;

  private volume: number = store.getState().state.playVolume;

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

  /**
   * Start playing the FM list.
   */
  async playFm(autoPlay: boolean = true) {
    const state = store.getState().state; // Access the Redux state
    let { playFmList, playFmIndex } = state;

    // If playFmList is empty, fetch a new FM list first
    if (playFmList.length === 0) {
      await this.loadPersonalFm();
      playFmList = store.getState().state.playFmList; // Refresh the list
      playFmIndex = 0; // Reset index after fetching new songs
    }

    // Ensure index is valid
    if (playFmIndex >= playFmList.length) {
      console.error("Invalid playFmIndex. Resetting to 0.");
      store.dispatch(setPlayFmIndex(0));
    }

    const song = playFmList[playFmIndex];

    // Fetch the correct playable URL
    const url = await this.getPlayableUrl(song);
    if (!url) {
      message.error(`该歌曲暂无音源，跳至下一首`);
      return this.nextFmSong(); // Skip to the next song
    }

    // Set the current FM song in the state
    store.dispatch(setPlaySong(song));

    // Create the Howl player and start playback
    await this.createPlayer(url, autoPlay);
  }

  /**
   * Move to the next FM song.
   */
  async nextFmSong() {
    const state = store.getState().state;
    const { playFmList, playFmIndex } = state;

    if (playFmIndex < playFmList.length - 1) {
      store.dispatch(setPlayFmIndex(playFmIndex + 1));
    } else {
      // Fetch more FM songs when the list is exhausted
      await this.loadPersonalFm();
      store.dispatch(setPlayFmIndex(0));
    }

    // Play the next song
    await this.playFm();
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

  /**
   * Create a Howl player for the given song URL.
   * @param url The song URL to play
   * @param autoPlay Whether to automatically start playback
   */
  private async createPlayer(url: string, autoPlay: boolean) {
    if (this.player) {
      this.player.unload(); // Unload the previous instance
    }

    this.player = new Howl({
      src: [url], // Use the fetched URL instead of `song.cover`
      autoplay: autoPlay,
      volume: this.volume,
      format: ["mp3", "flac"], // Adjust formats as needed
      html5: true, // Ensures proper playback on mobile and web
      onend: () => {
        // Automatically move to the next song when the current one ends
        this.nextFmSong();
      },
      onplay: () => {
        console.log("▶️ Playing:", url);
        store.dispatch(setPlayState(1)); // Set play state to "playing"
      },
      onpause: () => {
        console.log("⏸️ Paused:", url);
        store.dispatch(setPlayState(2)); // Set play state to "paused"
      },
      onload: () => {
        console.log("🔄 Song loaded:", url);
      },
      onloaderror: (id, err) => {
        console.error("❌ Load error:", err);
        this.nextFmSong(); // Move to the next song on error
      },
    });
  }

  /**
   * Load personal FM songs and update the Redux state.
   */
  private async loadPersonalFm() {
    try {
      const res = await personalFm(); // Call your personal FM API
      if (res.data?.length > 0) {
        store.dispatch(setPlayFmList(res.data));
        console.log("🌐 Loaded new FM list:", res.data);
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
    store.dispatch(setPlayState(1)); // Set Redux state to "playing"
  }

  /**
   * Pause playback while keeping the current song.
   */
  pause() {
    if (!this.player || !this.player.playing()) return;
    
    this.isPaused = true; // Mark as paused
    this.player.pause();
    store.dispatch(setPlayState(2)); // Set Redux state to "paused"
  }

  /**
   * Stop playback completely and reset the state.
   */
  stop() {
    if (!this.player) return;

    this.isPaused = false; // Reset paused state
    this.player.stop();
    store.dispatch(setPlayState(0)); // Set Redux state to "stopped"
  }
  
}

export default new NewPlayer();
