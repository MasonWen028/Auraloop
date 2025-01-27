import { dailyRecommend, personalFm } from "@/api/rec";
import { userAccount, userAlbum, userArtist, userDetail, userLike, userPlaylist, userSubcount } from "@/api/user";
import store from "@/stores";
import { setUserData, setCookies, setLikeAlbumList, setLikeSongsList, setLikePlaylist, setLikeArtistList, setPlayList, setPlaylistType } from "@/stores/slices/dataSlicce";
import { setDailySongsData } from "@/stores/slices/musicSlice";

/**
 * 用户是否登录
 * @returns 0 - 未登录 / 1 - 正常登录 / 2 - UID 登录
 */
export const isLogin = (): 0 | 1 | 2 => {
  const { userData } = store.getState().data;

  return userData.loginType ?? 0;
};

export const updateCookie = async (cookie: string) => {
  if (!cookie) return;
  store.dispatch(setCookies(cookie));
  await updateUserData();
}

export const updateUserData = async () => {
  try {
    // userId
    const { profile } = await userAccount();
    const userId = profile.userId;
    // 获取用户信息
    const userDetailData = await userDetail(userId);
    const userData = Object.assign(profile, userDetailData);
    // 获取用户订阅信息
    const subcountData = await userSubcount();
    store.dispatch(setUserData({
      userId,
      userType: userData.userType,
      vipType: userData.vipType,
      name: userData.nickname,
      level: userData.level,
      avatarUrl: userData.avatarUrl,
      backgroundUrl: userData.backgroundUrl,
      createTime: userData.createTime,
      createDays: userData.createDays,
      artistCount: subcountData.artistCount,
      djRadioCount: subcountData.djRadioCount,
      mvCount: subcountData.mvCount,
      subPlaylistCount: subcountData.subPlaylistCount,
      createdPlaylistCount: subcountData.createdPlaylistCount,
    }));
    await updateUserDataWithoutDetails();
  } catch (error) {
    console.error("❌ Error updating user data:", error);
    throw error;
  }
};

export const updateUserDataWithoutDetails = async () => {
  try {
    // 获取用户喜欢数据
    const allUserLikeResult: PromiseSettledResult<void>[] = await Promise.allSettled([
      updatePersonalizedFm(),
      updateUserLikeSongs(),
      updateUserLikePlaylist(),
      updateUserLikeArtists(),
      updateUserLikeAlbums(),
    ]);
    // 若部分失败
    const hasFailed = allUserLikeResult.some((result) => result.status === "rejected");
    if (hasFailed) throw new Error("Failed to update some user data");
  } catch (error) {
    console.error("❌ Error updating user data:", error);
    throw error;
  }
}


const updatePersonalizedFm = async () => {
  const { userData, userLoginStatus } = store.getState().data;

  if (!userLoginStatus || !userData.userId) return; 
  
  const result = await personalFm();

  store.dispatch(setPlaylistType(0));

  store.dispatch(setPlayList(result.data));

}

  // 更新用户喜欢歌曲
  export const updateUserLikeSongs = async () => {
    const { userData, userLoginStatus } = store.getState().data;

    if (!userLoginStatus || !userData.userId) return;
    
    const result = await userLike(userData.userId);
    store.dispatch(setLikeSongsList(result.ids));
  };

  // 更新用户喜欢歌单
export const updateUserLikePlaylist = async () => {
  const { userData, userLoginStatus } = store.getState().data;

    if (!userLoginStatus || !userData.userId) return;

    const result = await userPlaylist(30, 0, userData.userId);

    store.dispatch(setLikePlaylist(result.playlist))
}

export const updateUserLikeArtists = async () => {
  const { userData, userLoginStatus } = store.getState().data;

    if (!userLoginStatus || !userData.userId) return;

    const result = await userArtist();

    store.dispatch(setLikeArtistList(result.data));
}

export const updateUserLikeAlbums = async () => {
  const { userData, userLoginStatus } = store.getState().data;

    if (!userLoginStatus || !userData.userId) return;

    const result = await userAlbum();

    store.dispatch(setLikeAlbumList(result.data));
}

export const updateDailySongsData = async () => {
  const { userData, userLoginStatus } = store.getState().data;

  if (!userLoginStatus || !userData.userId) return;

  const result = await dailyRecommend("songs");
  store.dispatch(setDailySongsData(result.data.dailySongs));
}
