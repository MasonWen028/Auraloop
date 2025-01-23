import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const isFavoritedSong = (id: number, likedSongs: number[]): boolean => {
  return likedSongs.includes(id);
};

const SongTableRow = ({ song }: { song: { id: number } }) => {
  // Use useSelector to get the list of liked songs from Redux
  const likedSongs = useSelector((state: any) => state.data.userLikeData.songs);

  // Memoize the result of the isFavoritedSong check
  const isLiked = useMemo(() => isFavoritedSong(song.id, likedSongs), [song.id, likedSongs]);

  return (
    <div>
      <span>{isLiked ? "Liked" : "Not Liked"}</span>
      {/* Render other row content */}
    </div>
  );
};

export default SongTableRow;
