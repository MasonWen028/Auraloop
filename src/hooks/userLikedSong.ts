import { useSelector } from "react-redux";

/**
 * Custom hook to determine if a song is liked
 * @param id - ID of the song
 * @returns boolean indicating whether the song is liked
 */
export const isFavoritedSong = (id: number): boolean => {
  const { songs } = useSelector((state: any) => state.data.userLikeData);
  return songs.includes(id);
};
