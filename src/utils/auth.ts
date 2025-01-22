import { userAccount, userDetail, userSubcount } from "@/api/user";
import store from "@/stores";
import { setUserData } from "@/stores/slices/dataSlicce";

/**
 * 用户是否登录
 * @returns 0 - 未登录 / 1 - 正常登录 / 2 - UID 登录
 */
export const isLogin = (): 0 | 1 | 2 => {
  const { userData } = store.getState().data;

  return userData.loginType ?? 0;
};

export const updateUserData = async (loginType: 0 | 1 | 2) => {
  try {
    if (!loginType) return;
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
    
    // 获取用户喜欢数据
    const allUserLikeResult: PromiseSettledResult<void>[] = await Promise.allSettled([
      // updateUserLikeSongs(),
      // updateUserLikePlaylist(),
      // updateUserLikeArtists(),
      // updateUserLikeAlbums(),
      // updateUserLikeMvs(),
      // updateUserLikeDjs(),
      // // 每日推荐
      // updateDailySongsData(),
    ]);
    // 若部分失败
    const hasFailed = allUserLikeResult.some((result) => result.status === "rejected");
    if (hasFailed) throw new Error("Failed to update some user data");
  } catch (error) {
    console.error("❌ Error updating user data:", error);
    throw error;
  }
};