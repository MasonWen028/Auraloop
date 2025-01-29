import type { SongType, PlayModeType } from "@/types/main";
import { Howl, Howler } from "howler";
import { cloneDeep } from "lodash-es";
import { parsedLyricsData, resetSongLyric, parseLocalLyric } from "./lyric";
import { songUrl, unlockSongUrl, songLyric, songChorus } from "@/api/song";
import { calculateProgress } from "./time";
import { isElectron, isDev } from "./platformDetector";
import { heartRateList } from "@/api/playlist";
import { formatSongsList } from "./format";
import { isLogin } from "./auth";
import { scrobble } from "@/api/user";
import { personalFm, personalFmToTrash } from "@/api/rec";
import blob from "./blob";
import { eventBus } from "@/utils/eventBus";
import { message } from 'antd';
import store from "@/stores";
import { resetState, setChorus, setCurrentState, setCurrentTime, setLyricIndex, setPersonalFmMode, setPlayHeartbeatMode, setPlayIndex, setPlayLoading, setPlayRate, setPlaySongMode, setPlayStatus, setPlayUblock, setPlayVolume, setPlayVolumeMute, setShowDesktopLyric, setSpectrumsData } from "@/stores/slices/statusSlice";
import { resetMusicData, setPersonalFM, setPersonalFMIndex, setPlayPlaylistId, setPlaySong } from "@/stores/slices/musicSlice";
import { setHistory, setNextPlaySong, setPlayList } from "@/stores/slices/dataSlicce";


// 播放器核心
// Howler.js

// 允许播放格式
const allowPlayFormat = ["mp3", "flac", "webm", "ogg", "wav"];

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

class Player {
  // 播放器
  private player: Howl;
  // 定时器
  private playerInterval: ReturnType<typeof setInterval> | undefined;
  // 频谱数据
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  // 其他数据
  private testNumber: number = 0;
  constructor() {
    // 创建播放器实例
    this.player = new Howl({ src: [""], format: allowPlayFormat, autoplay: false });
    // 初始化媒体会话
    this.initMediaSession();
  }
  /**
   * 重置状态
   */
  resetStatus() {
    store.dispatch(resetState())
    store.dispatch(resetMusicData())
  }
  /**
   * 获取当前播放歌曲
   * @returns 当前播放歌曲
   */
  private getPlaySongData(): SongType | null {
    const { playList } = store.getState().data;
    const { personalFM } = store.getState().music;
    const { personalFmMode, playIndex} = store.getState().status;
    console.log("[PLAYMODE]", personalFmMode, playIndex);
    // 若为私人FM
    if (personalFmMode) {
      console.log("[PLAYINDEX]", personalFM.playIndex);
      return personalFM.list?.[personalFM.playIndex] || defaultMusicData;
    }


    // 播放列表
    if (!playList.length) return null;
    return playList[playIndex];
  }
  /**
   * 获取淡入淡出时间
   * @returns 播放音量
   */
  private getFadeTime(): number {
    const { songVolumeFade, songVolumeFadeTime } = store.getState().setting;
    return songVolumeFade ? songVolumeFadeTime : 0;
  }
  /**
   * 处理播放状态
   */
  private handlePlayStatus() {
    
    const { currentTimeOffset  }= store.getState().status;
    const { showYrc, showTaskbarProgress } = store.getState().setting;
    // 清理定时器
    clearInterval(this.playerInterval);
    // 更新播放状态
    this.playerInterval = setInterval(() => {
      if (!this.player.playing()) return;

      const { songLyric } = store.getState().music;
      
      const currentTime = this.getSeek();
      const duration = this.player.duration();
      // 计算进度条距离
      const progress = calculateProgress(currentTime, duration);
      // 计算歌词索引
      const hasYrc = !songLyric.yrcData.length || !showYrc;
      const lyrics = hasYrc ? songLyric.lrcData : songLyric.yrcData;
      // 歌词实时偏移量
      const index = lyrics?.findIndex((v: any) => v?.time >= currentTime + currentTimeOffset && v?.endTime > currentTime + currentTimeOffset);
      // 歌词跨界处理
      const lyricIndex = index === -1 ? lyrics.length - 1 : index - 1;
      // 更新状态
      store.dispatch(setCurrentState({currentTime, duration, progress, lyricIndex}));
      // todo statusStore.$patch({ currentTime, duration, progress, lyricIndex });
      // 客户端事件
      if (isElectron) {
        // 歌词变化
        window.electron.ipcRenderer.send("play-lyric-change", {
          index: lyricIndex,
          lyric: cloneDeep(
            showYrc && songLyric.yrcData?.length
              ? songLyric.yrcData
              : songLyric.lrcData,
          ),
        });
        // 进度条
        if (showTaskbarProgress) {
          window.electron.ipcRenderer.send("set-bar", progress);
        }
      }
    }, 250);
  }
  /**
   * 获取在线播放链接
   * @param id 歌曲id
   * @returns 播放链接
   */
  private async getOnlineUrl(id: number): Promise<string | null> {
    const { songLevel, playSongDemo } = store.getState().setting;
    const res = await songUrl(id, songLevel);
    console.log(`🌐 ${id} music data:`, res);
    const songData = res.data?.[0];
    // 是否有播放地址
    if (!songData || !songData?.url) return null;
    // 是否仅能试听
    if (songData?.freeTrialInfo !== null) {
      if (playSongDemo) {
        message.warning("当前歌曲仅可试听，请开通会员后重试");
      } else return null;
    }
    // 返回歌曲地址
    // 客户端直接返回，网页端转 https
    const url = isElectron ? songData.url : songData.url.replace(/^http:/, "https:");
    return url;
  }
  /**
   * 获取解锁播放链接
   * @param songData 歌曲数据
   * @returns
   */
  private async getUnlockSongUrl(songData: SongType): Promise<string | null> {
    try {
      const songId = songData.id;
      const artist = Array.isArray(songData.artists) ? songData.artists[0].name : songData.artists;
      const keyWord = songData.name + "-" + artist;
      if (!songId || !keyWord) return null;
      // 尝试解锁
      const [neteaseUrl, kuwoUrl] = await Promise.all([
        unlockSongUrl(songId, keyWord, "netease"),
        unlockSongUrl(songId, keyWord, "kuwo"),
      ]);
      if (neteaseUrl.code === 200 && neteaseUrl.url !== "") return neteaseUrl.url;
      if (kuwoUrl.code === 200 && kuwoUrl.url !== "") return kuwoUrl.url;
      return null;
    } catch (error) {
      console.error("Error in getUnlockSongUrl", error);
      return null;
    }
  }
  /**
   * 创建播放器
   * @param src 播放地址
   * @param autoPlay 是否自动播放
   * @param seek 播放位置
   */
  private async createPlayer(src: string, autoPlay: boolean = true, seek: number = 0) {
    // 获取数据
    const { playSong, songCover } = store.getState().music;

    const { playVolume, playRate } = store.getState().status;

    const { showSpectrums } = store.getState().setting;

    // 播放信息
    const { id, path, type } = playSong;
    // 清理播放器
    Howler.unload();
    // 创建播放器
    this.player = new Howl({
      src,
      format: allowPlayFormat,
      html5: true,
      autoplay: autoPlay,
      preload: "metadata",
      pool: 1,
      volume: playVolume,
      rate: playRate,
    });
    // 播放器事件
    this.playerEvent({ seek });
    // 播放设备
    if (!showSpectrums) this.toggleOutputDevice();
    // 自动播放
    if (autoPlay) this.play();
    // 获取歌曲附加信息 - 非电台和本地
    if (type !== "radio" && !path) {
      this.getLyricData(id);
      this.getChorus(id);
    } else resetSongLyric();
    // 定时获取状态
    if (!this.playerInterval) this.handlePlayStatus();
    // 新增播放历史
    if (type !== "radio") {
      store.dispatch(setHistory(playSong))
    }
    // 获取歌曲封面主色
    if (!path) this.getCoverColor(songCover);
    // 更新 MediaSession
    if (!path) this.updateMediaSession();
    // 开发模式
    if (isDev) window.player = this.player;
  }
  /**
   * 播放器事件
   */
  private playerEvent(
    options: {
      // 恢复进度
      seek?: number;
    } = { seek: 0 },
  ) {
    // 获取数据
   

    const { duration, currentTime, playStatus } = store.getState().status;

    const { showSpectrums } = store.getState().setting;

    const playSongData = this.getPlaySongData();
    // 获取配置
    const { seek } = options;
    // 初次加载
    this.player.once("load", () => {
      // 允许跨域
      if (showSpectrums) {
        const audioDom = this.getAudioDom();
        audioDom.crossOrigin = "anonymous";
      }
      // 恢复进度（ 需距离本曲结束大于 2 秒 ）
      if (seek && duration - currentTime > 2) this.setSeek(seek);
      // 更新状态
      
      eventBus.emit("player-status-changed", playStatus);
      // ipc
      if (isElectron) {
        window.electron.ipcRenderer.send("play-song-change", this.getPlayerInfo());
        // window.electron.ipcRenderer.send(
        //   "like-status-change",
        //   dataStore.isLikeSong(playSongData?.id || 0),
        // );
        //TODO dispatch isLikeSong or not
      }
    });
    // 播放
    this.player.on("play", () => {
      window.document.title = this.getPlayerInfo() || "SPlayer";
      // ipc
      if (isElectron) {
        window.electron.ipcRenderer.send("play-status-change", true);
        window.electron.ipcRenderer.send("play-song-change", this.getPlayerInfo());
      }

      eventBus.emit("player-status-changed", playStatus);
      console.log("▶️ song play:", playSongData);
    });
    // 暂停
    this.player.on("pause", () => {
      if (!isElectron) window.document.title = "SPlayer";
      // ipc
      if (isElectron) window.electron.ipcRenderer.send("play-status-change", false);
      console.log("⏸️ song pause:", playSongData);
      eventBus.emit("player-status-changed", playStatus);
    });
    // 结束
    this.player.on("end", () => {
      // statusStore.playStatus = false;
      console.log("⏹️ song end:", playSongData);
      eventBus.emit("player-status-changed", playStatus);
      this.nextOrPrev("next");
    });
    // 错误
    this.player.on("loaderror", (sourceid, err: any) => {
      this.errorNext(err);
      eventBus.emit("player-status-changed", playStatus);
      console.error("❌ song error:", sourceid, playSongData, err);
    });
  }
  /**
   * 初始化 MediaSession
   */
  private initMediaSession() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", () => this.play());
    navigator.mediaSession.setActionHandler("pause", () => this.pause());
    navigator.mediaSession.setActionHandler("previoustrack", () => this.nextOrPrev("prev"));
    navigator.mediaSession.setActionHandler("nexttrack", () => this.nextOrPrev("next"));
    // 跳转进度
    navigator.mediaSession.setActionHandler("seekto", (event) => {
      if (event.seekTime) this.setSeek(event.seekTime);
    });
  }

  private getSongCover = (size: "s" | "m" | "l" | "xl" | "cover" = "s") => {
    const { playSong  } = store.getState().music;

    return playSong.path
      ? playSong.cover
      : size === "cover"
      ? playSong.cover
      : playSong.coverSize?.[size] || playSong.cover;
  }


  /**
   * 更新 MediaSession
   */
  private updateMediaSession() {
    if (!("mediaSession" in navigator)) return;

    const { smtcOutputHighQualityCover } = store.getState().setting;
    // 获取播放数据
    const playSongData = this.getPlaySongData();
    if (!playSongData) return;
    // 播放状态
    const isRadio = playSongData.type === "radio";
    // 获取数据
    const metaData: MediaMetadataInit = {
      title: playSongData.name,
      artist: isRadio
        ? "播客电台"
        : // 非本地歌曲且歌手列表为数组
          Array.isArray(playSongData.artists)
          ? playSongData.artists.map((item) => item.name).join(" / ")
          : String(playSongData.artists),
      album: isRadio
        ? "播客电台"
        : // 是否为对象
          typeof playSongData.album === "object"
          ? playSongData.album.name
          : String(playSongData.album),
      // artwork: smtcOutputHighQualityCover
      //   ? [
      //       {
      //         src: this.getSongCover("xl"),
      //         sizes: "1920x1920",
      //         type: "image/jpeg",
      //       },
      //     ]
      //   : [
      //       {
      //         src: this.getSongCover("cover"),
      //         sizes: "512x512",
      //         type: "image/jpeg",
      //       },
      //       {
      //         src: this.getSongCover("s"),
      //         sizes: "100x100",
      //         type: "image/jpeg",
      //       },
      //       {
      //         src: this.getSongCover("m"),
      //         sizes: "300x300",
      //         type: "image/jpeg",
      //       },
      //       {
      //         src: this.getSongCover("l"),
      //         sizes: "1024x1024",
      //         type: "image/jpeg",
      //       },
      //       {
      //         src: this.getSongCover("xl"),
      //         sizes: "1920x1920",
      //         type: "image/jpeg",
      //       },
      //     ],
    };
    // 更新数据
    navigator.mediaSession.metadata = new window.MediaMetadata(metaData);
  }
  // 生成频谱数据
  private generateSpectrumData() {
    if (!this.analyser || !this.dataArray) {
      this.initSpectrumData();
    }
    // 更新频谱数据
    const updateSpectrumData = () => {
      if (this.analyser && this.dataArray) {
        this.analyser.getByteFrequencyData(this.dataArray);
        // 保存数据
        //TODO dispatch
        store.dispatch(setSpectrumsData(Array.from(this.dataArray)))
      }
      requestAnimationFrame(updateSpectrumData);
    };
    updateSpectrumData();
  }
  /**
   * 获取歌词
   * @param id 歌曲id
   */
  private async getLyricData(id: number) {
    if (!id) {
      resetSongLyric();
      return;
    }
    const lyricRes = await songLyric(id);
    parsedLyricsData(lyricRes);
  }
  /**
   * 获取副歌时间
   * @param id 歌曲id
   */
  private async getChorus(id: number) {
    const { duration } = store.getState().status;
    const result = await songChorus(id);
    if (result?.code !== 200 || result?.chorus?.length === 0) {
      store.dispatch(setChorus(0))
      return;
    }
    // 计算并保存
    const chorus = result?.chorus?.[0]?.startTime;
    const time = ((chorus / 1000 / duration) * 100).toFixed(2);
    store.dispatch(setChorus(Number(time)));
  }
  /**
   * 播放错误
   * 在播放错误时，播放下一首
   */
  private async errorNext(errCode?: number) {
    const { playList } = store.getState().data;
    // 次数加一
    this.testNumber++;
    if (this.testNumber > 5) {
      this.testNumber = 0;
      this.resetStatus();
      message.error("当前重试次数过多，请稍后再试");
      return;
    }
    // 错误 2 通常为网络地址过期
    if (errCode === 2) {
      // 重载播放器
      await this.initPlayer(true, this.getSeek());
      return;
    }
    // 播放下一曲
    if (playList.length > 1) {
      await this.nextOrPrev("next");
    } else {
      message.error("当前列表暂无可播放歌曲");
      this.cleanPlayList();
    }
  }
  /**
   * 获取 Audio Dom
   */
  private getAudioDom() {
    const audioDom = (this.player as any)._sounds[0]._node;
    if (!audioDom) {
      throw new Error("Audio Dom is null");
    }
    return audioDom;
  }
  /**
   * 获取本地歌曲元信息
   * @param path 歌曲路径
   */
  private async parseLocalMusicInfo(path: string) {
    try {
      const { playSong } = store.getState().music;
      // 获取封面数据
      const coverData = await window.electron.ipcRenderer.invoke("get-music-cover", path);
      if (coverData) {
        const { data, format } = coverData;
        const blobURL = blob.createBlobURL(data, format, path);
        if (blobURL) {
          playSong.cover = blobURL;
        }
      } else {
        playSong.cover = "/images/song.jpg?assest";
      }
      // 获取主色
      this.getCoverColor(playSong.cover);
      // 获取歌词数据
      const lrcData = await window.electron.ipcRenderer.invoke("get-music-lyric", path);
      parseLocalLyric(lrcData);
      // 更新媒体会话
      this.updateMediaSession();
    } catch (error) {
      message.error("获取本地歌曲元信息失败");
      console.error("Failed to parse local music info:", error);
    }
  }
  /**
   * 获取播放信息
   * @param song 歌曲
   * @param sep 分隔符
   * @returns 播放信息
   */
  getPlayerInfo(song?: SongType, sep: string = "/"): string | null {
    const playSongData = song || this.getPlaySongData();
    if (!playSongData) return null;
    // 标题
    const title = `${playSongData.name || "未知歌曲"}`;
    // 歌手
    const artist =
      playSongData.type === "radio"
        ? "播客电台"
        : Array.isArray(playSongData.artists)
          ? playSongData.artists.map((artists: { name: string }) => artists.name).join(sep)
          : String(playSongData?.artists || "未知歌手");
    return `${title} - ${artist}`;
  }
  /**
   * 初始化播放器
   * 核心外部调用
   * @param autoPlay 是否自动播放
   * @param seek 播放位置
   */
  async initPlayer(autoPlay: boolean = true, seek: number = 0) {
    const { playList } = store.getState().data;
    const { playIndex } = store.getState().status;
    const { useSongUnlock } = store.getState().setting;
    try {
      // 获取播放数据
      const playSongData = this.getPlaySongData();
      if (!playSongData) return;
      const { id, dj, path, type } = playSongData;
      // 更改当前播放歌曲
      //playSong = playSongData;
      store.dispatch(setPlaySong(playSongData))
      // 更改状态
      store.dispatch(setPlayLoading(true))
      // 本地歌曲
      if (path) {
        await this.createPlayer(path, autoPlay, seek);
        // 获取歌曲元信息
        await this.parseLocalMusicInfo(path);
      }
      // 在线歌曲
      else if (id && playList.length) {
        const songId = type === "radio" ? 0 : id; //todo dj?.id
        if (!songId) throw new Error("Get song id error");
        const url = await this.getOnlineUrl(songId);
        // 正常播放地址
        if (url) {
          store.dispatch(setPlayUblock(false));
          await this.createPlayer(url, autoPlay, seek);
        }
        // 尝试解灰
        else if (isElectron && type !== "radio" && useSongUnlock) {
          const unlockUrl = await this.getUnlockSongUrl(playSongData);
          if (unlockUrl) {
            store.dispatch(setPlayUblock(true));
            console.log("🎼 Song unlock successfully:", unlockUrl);
            await this.createPlayer(unlockUrl, autoPlay, seek);
          } else {
            store.dispatch(setPlayUblock(false));
            // 是否为最后一首
            if (playIndex === playList.length - 1) {
              store.dispatch(setPlayStatus(false))
              store.dispatch(setPlayLoading(false))
              message.warning("当前列表歌曲无法播放，请更换歌曲");
            } else {
              message.error("该歌曲暂无音源，跳至下一首");
              this.nextOrPrev("next");
            }
          }
        } else {
          if (playList.length === 1) {
            this.resetStatus();
            message.warning("当前播放列表已无可播放歌曲，请更换");
            return;
          } else {
            message.error("该歌曲无法播放，跳至下一首");
            this.nextOrPrev();
            return;
          }
        }
      }
    } catch (error) {
      console.error("❌ 初始化音乐播放器出错：", error);
      message.error("播放器遇到错误，请尝试软件热重载");
      // this.errorNext();
    }
  }
  /**
   * 播放
   */
  async play() {
    const { playVolume } = store.getState().status;
    // 已在播放
    if (this.player.playing()) {
      store.dispatch(setPlayStatus(true))
      return;
    }
    this.player.play();
    store.dispatch(setPlayStatus(false))
    // 淡入
    await new Promise<void>((resolve) => {
      this.player.once("play", () => {
        this.player.fade(0, playVolume, this.getFadeTime());
        resolve();
      });
    });
  }
  /**
   * 暂停
   * @param changeStatus 是否更改播放状态
   */
  async pause(changeStatus: boolean = true) {
    const { playVolume } = store.getState().status;

    // 播放器未加载完成
    if (this.player.state() !== "loaded") {
      return;
    }

    // 淡出
    await new Promise<void>((resolve) => {
      this.player.fade(playVolume, 0, this.getFadeTime());
      this.player.once("fade", () => {
        this.player.pause();
        if (changeStatus) store.dispatch(setPlayStatus(false))
        resolve();
      });
    });
  }
  /**
   * 播放或暂停
   */
  async playOrPause() {
    const { playStatus } = store.getState().status;
    if (playStatus) await this.pause();
    else await this.play();
  }
  /**
   * 下一首或上一首
   * @param type 切换类别 next 下一首 prev 上一首
   * @param play 是否立即播放
   */
  async nextOrPrev(type: "next" | "prev" = "next", play: boolean = true) {
    try {
      const { personalFmMode, playIndex, playSongMode, playHeartbeatMode } = store.getState().status;
      // 获取数据
      const { playList } = store.getState().data;
      const { playSong } = store.getState().music;
      // 列表长度
      const playListLength = playList.length;
      // 播放列表是否为空
      if (playListLength === 0) throw new Error("Play list is empty");
      // 打卡
      this.scrobbleSong();
      // 若为私人FM
      if (personalFmMode) {
        await this.initPersonalFM(true);
        return;
      }
      // 只有一首歌的特殊处理
      if (playListLength === 1) {
        store.dispatch(setLyricIndex(-1))
        this.setSeek(0);
        await this.play();
      }
      // 列表循环或处于心动模式
      if (playSongMode === "repeat" || playHeartbeatMode || playSong.type === "radio") {
        store.dispatch(setPlayIndex(playIndex + (type === "next" ? 1 : -1)))
      }
      // 随机播放
      else if (playSongMode === "shuffle") {
        let newIndex: number;
        // 确保不会随机到同一首
        do {
          newIndex = Math.floor(Math.random() * playListLength);
        } while (newIndex === playIndex);
        store.dispatch(setPlayIndex(newIndex))
      }
      // 单曲循环
      else if (playSongMode === "repeat-once") {
        store.dispatch(setLyricIndex(-1))
        this.setSeek(0);
        await this.play();
        return;
      } else {
        throw new Error("The play mode is not supported");
      }
      // 索引是否越界
      if (playIndex < 0) {
        store.dispatch(setPlayIndex(playListLength - 1))
      } else if (playIndex >= playListLength) {
        store.dispatch(setPlayIndex(0))
      }
      // 暂停
      await this.pause(false);
      // 初始化播放器
      await this.initPlayer(play);
    } catch (error) {
      console.error("Error in nextOrPrev:", error);
      throw error;
    }
  }
  /**
   * 切换播放模式
   * @param mode 播放模式 repeat / repeat-once / shuffle
   */
  togglePlayMode(mode: PlayModeType | false) {
    const { playHeartbeatMode, playSongMode } = store.getState().status;
    // 退出心动模式
    if (playHeartbeatMode) this.toggleHeartMode(false);
    // 若传入了指定模式
    if (mode) {
      store.dispatch(setPlaySongMode(mode))
    } else {
      let modeName = "repeat";
      switch (playSongMode) {
        case "repeat":
          modeName = "repeat-once";
          break;
        case "shuffle":
          modeName = "repeat";
          break;
        case "repeat-once":
          modeName = "shuffle";
          break;
        default:
          modeName = "repeat";
      }
      store.dispatch(setPlaySongMode(modeName as PlayModeType))
    }
    this.playModeSyncIpc();
  }
  /**
   * 播放模式同步 ipc
   */
  playModeSyncIpc() {
    const { playSongMode } = store.getState().status;
    if (isElectron) {
      window.electron.ipcRenderer.send("play-mode-change", playSongMode);
    }
  }
  /**
   * 设置播放进度
   * @param time 播放进度
   */
  setSeek(time: number) {
    this.player.seek(time);
    store.dispatch(setCurrentTime(time));
  }
  /**
   * 获取播放进度
   * @returns 播放进度
   */
  getSeek(): number {
    return this.player.seek();
  }
  /**
   * 设置播放速率
   * @param rate 播放速率
   */
  setRate(rate: number) {
    this.player.rate(rate);
    store.dispatch(setPlayRate(rate))
  }
  /**
   * 设置播放音量
   * @param actions 音量
   */
  setVolume(actions: number | "up" | "down" | WheelEvent) {
    const { playVolume } = store.getState().status;
    const increment = 0.05;
    // 直接设置
    if (typeof actions === "number") {
      actions = Math.max(0, Math.min(actions, 1));
    }
    // 分类调节
    else if (actions === "up" || actions === "down") {
      store.dispatch(setPlayVolume(Math.max(
        0,
        Math.min(playVolume + (actions === "up" ? increment : -increment), 1),
      )));
    }
    // 鼠标滚轮
    else {
      const deltaY = actions.deltaY;
      const volumeChange = deltaY > 0 ? -increment : increment;
      store.dispatch(setPlayVolume( Math.max(0, Math.min(playVolume + volumeChange, 1))));
    }
    // 调整音量
    this.player.volume(playVolume);
  }
  /**
   * 切换静音
   */
  toggleMute() {
    const { playVolume,playVolumeMute } = store.getState().status;
    // 是否静音
    const isMuted = playVolume === 0;
    // 恢复音量
    if (isMuted) {
      store.dispatch(setPlayVolume(playVolumeMute));
    }
    // 保存当前音量并静音
    else {
      store.dispatch(setPlayVolumeMute(this.player.volume()))
      store.dispatch(setPlayVolume(0));
    }
    this.player.volume(playVolume);
  }
  /**
   * 获取歌曲封面颜色数据
   * @param coverUrl 歌曲封面地址
   */
  async getCoverColor(coverUrl: string) {
    if (!coverUrl) return;
    // 创建图像元素
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = coverUrl;
  }
  /**
   * 更新播放列表
   * @param data 播放列表
   * @param song 当前播放歌曲
   * @param pid 播放列表id
   * @param options 配置
   * @param options.showTip 是否显示提示
   * @param options.scrobble 是否打卡
   * @param options.play 是否直接播放
   */
  async updatePlayList(
    data: SongType[],
    song?: SongType,
    pid?: number,
    options: {
      showTip?: boolean;
      scrobble?: boolean;
      play?: boolean;
    } = {
      showTip: true,
      scrobble: true,
      play: true,
    },
  ) {
    if (!data || !data.length) return;
    const { playSong } = store.getState().music;
    // 获取配置
    const { showTip, scrobble, play } = options;
    const { playHeartbeatMode, personalFmMode, playSongMode } = store.getState().status;
    // 打卡
    if (scrobble) this.scrobbleSong();
    // 更新列表
    store.dispatch(setPlayList(cloneDeep(data)))
    // 关闭特殊模式
    if (playHeartbeatMode) this.toggleHeartMode(false);
    if (personalFmMode) store.dispatch(setPersonalFmMode(false));
    // 是否直接播放
    if (song && typeof song === "object" && "id" in song) {
      // 是否为当前播放歌曲
      if (playSong.id === song.id) {
        if (play) await this.play();
      } else {
        // 查找索引
        store.dispatch(setPlayIndex(data.findIndex((item) => item.id === song.id)));
        // 播放
        await this.pause(false);
        await this.initPlayer();
      }
    } else {
      store.dispatch(setPlayIndex(playSongMode === "shuffle" ? Math.floor(Math.random() * data.length) : 0));
      // 播放
      await this.pause(false);
      await this.initPlayer();
    }
    // 更改播放歌单
    store.dispatch(setPlayPlaylistId(pid ?? 0));
    if (showTip) message.success("已开始播放");
  }
  /**
   * 添加下一首歌曲
   * @param song 歌曲
   * @param play 是否立即播放
   */
  async addNextSong(song: SongType, play: boolean = false) {
    const { playSong } = store.getState().music;
    const { playList } = store.getState().data;
    const { personalFmMode, playIndex } = store.getState().status;
    // 关闭特殊模式
    if (personalFmMode) store.dispatch(setPersonalFmMode(false));
    // 是否为当前播放歌曲
    if (playSong.id === song.id) {
      this.play();
      message.success("已开始播放");
      return;
    }
    // 尝试添加
    store.dispatch(setNextPlaySong({song, index: playIndex}))
    const songIndex = playList.findIndex((item: SongType) => item.id === song.id);
    // 播放歌曲
    if (songIndex < 0) return;
    if (play) this.togglePlayIndex(songIndex, true);
    else message.success("已添加至下一首播放");
  }
  /**
   * 切换播放索引
   * @param index 播放索引
   * @param play 是否立即播放
   */
  async togglePlayIndex(index: number, play: boolean = false) {   
    const { playIndex } = store.getState().status;
    // 获取数据
    const { playList } = store.getState().data;
    // 若超出播放列表
    if (index >= playList.length) return;
    // 相同
    if (!play && playIndex === index) {
      this.play();
      return;
    }
    // 更改状态
    store.dispatch(setPlayIndex(index))
    // 清理并播放
    this.resetStatus();
    await this.initPlayer();
  }
  /**
   * 移除指定歌曲
   * @param index 歌曲索引
   */
  removeSongIndex(index: number) {
    const { playStatus, playIndex } = store.getState().status;
    // 获取数据
    const { playList } = store.getState().data;
    // 若超出播放列表
    if (index >= playList.length) return;
    // 仅剩一首
    if (playList.length === 1) {
      this.cleanPlayList();
      return;
    }
    // 是否为当前播放歌曲
    const isCurrentPlay = playIndex === index;
    // 深拷贝，防止影响原数据
    const newPlaylist = cloneDeep(playList);
    // 若将移除最后一首
    if (index === playList.length - 1) {
      store.dispatch(setPlayIndex(0))
    }
    // 若为当前播放之后
    else if (playIndex > index) {
      store.dispatch(setPlayIndex(playIndex - 1));
    }
    // 移除指定歌曲
    newPlaylist.splice(index, 1);
    store.dispatch(setPlayList(newPlaylist));
    // 若为当前播放
    if (isCurrentPlay) {
      this.initPlayer(playStatus);
    }
  }
  /**
   * 清空播放列表
   */
  async cleanPlayList() {
    // 停止播放
    Howler.unload();
    // 清空数据
    this.resetStatus();
    
    store.dispatch(resetState())
    store.dispatch(resetMusicData());
    store.dispatch(setPlayList([]))
    message.success("已清空播放列表");
  }
  /**
   * 切换输出设备
   * @param deviceId 输出设备
   */
  toggleOutputDevice(deviceId?: string) {
    try {
      const { playDevice } = store.getState().setting;
      // 输出设备
      const devices = deviceId ?? playDevice;
      if (!(this.player as any)?._sounds.length) return;
      // 获取音频元素
      const audioDom = this.getAudioDom();
      // 设置输出设备
      if (devices && audioDom?.setSinkId) {
        audioDom.setSinkId(devices);
      }
    } catch (error) {
      console.error("Failed to change audio output device:", error);
    }
  }
  /**
   * 初始化音频可视化
   */
  initSpectrumData() {
    try {
      if (this.audioContext) return;
      // AudioContext
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // 获取音频元素
      const audioDom = this.getAudioDom();
      // 媒体元素源
      this.source = this.audioContext.createMediaElementSource(audioDom);
      // AnalyserNode
      this.analyser = this.audioContext.createAnalyser();
      // 频谱分析器 FFT
      this.analyser.fftSize = 512;
      // 连接源和分析节点
      this.source.connect(this.analyser);
      // 连接分析节点到 AudioContext
      this.analyser.connect(this.audioContext.destination);
      // 配置 AnalyserNode
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      // 更新频谱数据
      this.generateSpectrumData();
      console.log("🎼 Initialize music spectrum successfully");
    } catch (error) {
      console.error("🎼 Initialize music spectrum failed:", error);
    }
  }
  /**
   * 切换桌面歌词
   */
  toggleDesktopLyric() {
    const { showDesktopLyric } = store.getState().status;
    const show = !showDesktopLyric;
    store.dispatch(setShowDesktopLyric(show))
    window.electron.ipcRenderer.send("change-desktop-lyric", show);
    message.success(`${show ? "已开启" : "已关闭"}桌面歌词`);
  }
  /**
   * 切换心动模式
   * @param open 是否开启
   */
  async toggleHeartMode(open: boolean = true) {
    try {
      const { playPlaylistId } = store.getState().music;
      const { playHeartbeatMode } = store.getState().status;
      if (!open && playHeartbeatMode) {
        store.dispatch(setPlayHeartbeatMode(false))
        message.success("已退出心动模式");
        return;
      }
      if (isLogin() !== 1) {
        if (isLogin() === 0) {
          eventBus.emit("need-login");
        } else {
          message.warning("该登录模式暂不支持该操作");
        }
        return;
      }
      if (playHeartbeatMode) {
        message.warning("已处于心动模式");
        this.play();
        return;
      }
      message?.destroy();
      message.loading("心动模式开启中", 0);
      // 获取所需数据
      const playSongData = this.getPlaySongData();
      // if (!playSongData || !likeSongsList) {
      //   throw new Error("获取播放数据或喜欢列表失败");
      // }
      const pid = playPlaylistId;
      // 开启心动模式
      const result = await heartRateList(playSongData?.id || 0, pid);
      if (result.code === 200) {
        message?.destroy();
        const heartRatelists = formatSongsList(result.data);
        // 更新播放列表
        await this.updatePlayList(heartRatelists, heartRatelists[0]);
        // 更改模式
        store.dispatch(setPlayHeartbeatMode(true))
      } else {
        message?.destroy();
        message.error(result.message || "心动模式开启出错，请重试");
      }
    } catch (error) {
      console.error("Failed to toggle heart mode:", error);
      message?.destroy();
      message.error("心动模式开启出错，请重试");
    } finally {
      message?.destroy();
    }
  }
  /**
   * 听歌打卡
   */
  async scrobbleSong() {
    const { playPlaylistId } = store.getState().music;
    const { duration } = store.getState().status;
    const { scrobbleSong } = store.getState().setting;
    try {
      if (!isLogin()) return;
      if (!scrobbleSong) return;
      // 获取所需数据
      const playSongData = this.getPlaySongData();
      if (!playSongData) return;
      const { id, name } = playSongData;
      const sourceid = playPlaylistId;
      const time = duration;
      // 网易云打卡
      console.log("打卡：", id, name, sourceid, time);
      await scrobble(id, sourceid, time);
    } catch (error) {
      console.error("Failed to scrobble song:", error);
    }
  }
  /**
   * 初始化私人FM
   * @param playNext 是否播放下一首
   */
  async initPersonalFM(playNext: boolean = false) {
    let { personalFM } = store.getState().music;
    try {
      // 获取并重置
      const getPersonalFmData = async () => {
        const result = await personalFm();
        const songData = formatSongsList(result.data);
        console.log(`🌐 personal FM:`, songData);
        store.dispatch(setPersonalFM({list: songData, playIndex: 0}))

        personalFM = store.getState().music.personalFM;
      };
      store.dispatch(setPersonalFmMode(true));
      
      // 若为空
      if (personalFM.list.length === 0 || personalFM.list.length >= personalFM.playIndex + 1) await getPersonalFmData();
      // 若需播放下一首
      if (playNext) {
        // 更改索引
        if (personalFM.playIndex < personalFM.list.length - 1) {
          store.dispatch(setPersonalFMIndex(personalFM.playIndex + 1))
        } else {
          await getPersonalFmData();
        }
        // 清理并播放
        this.resetStatus();
        await this.initPlayer();
      } else {
        if (personalFM.playIndex < personalFM.list.length - 1) {
          store.dispatch(setPersonalFMIndex(personalFM.playIndex))
        } else {
          await getPersonalFmData();
        }
        // 清理并播放
        this.resetStatus();
        await this.initPlayer();
      }
    } catch (error) {
      console.error("Failed to initialize personal FM:", error);
    }
  }
  /**
   * 私人FM - 垃圾桶
   * @param id 歌曲id
   */
  async personalFMTrash(id: number) {
    try {
      if (!isLogin()) {
        eventBus.emit("need-login");
        return;
      }
      // 更改模式
      store.dispatch(setPersonalFmMode(true))
      store.dispatch(setPlayHeartbeatMode(false))
      // 加入回收站
      const result = await personalFmToTrash(id);
      if (result.code === 200) {
        message.success("已移至垃圾桶");
        this.nextOrPrev("next");
      }
    } catch (error) {
      console.error("Error adding to trash:", error);
      message.error("移至垃圾桶失败，请重试");
    }
  }
}

export default new Player();
