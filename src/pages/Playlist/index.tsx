import { useParams } from 'react-router-dom';
import './index.css'; // Create a CSS file for styling

const PlaylistPage = () => {
  const { playlistId } = useParams();

  // Sample data - Replace with API call or props
  const playlistData = {
    id: playlistId,
    title: '每日尝鲜 30首',
    date: '2025-01-19',
    songs: [
      { id: 1, title: 'S.T.A.Y (SugarPro Remix)', artist: 'SugarPro', album: 'S.T.A.Y', duration: '06:06' },
      { id: 2, title: 'MAKE (PHONK)', artist: '意情', album: 'The Dark Knight', duration: '03:22' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      { id: 1, title: 'S.T.A.Y (SugarPro Remix)', artist: 'SugarPro', album: 'S.T.A.Y', duration: '06:06' },
      { id: 2, title: 'MAKE (PHONK)', artist: '意情', album: 'The Dark Knight', duration: '03:22' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      { id: 1, title: 'S.T.A.Y (SugarPro Remix)', artist: 'SugarPro', album: 'S.T.A.Y', duration: '06:06' },
      { id: 2, title: 'MAKE (PHONK)', artist: '意情', album: 'The Dark Knight', duration: '03:22' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      { id: 1, title: 'S.T.A.Y (SugarPro Remix)', artist: 'SugarPro', album: 'S.T.A.Y', duration: '06:06' },
      { id: 2, title: 'MAKE (PHONK)', artist: '意情', album: 'The Dark Knight', duration: '03:22' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      { id: 1, title: 'S.T.A.Y (SugarPro Remix)', artist: 'SugarPro', album: 'S.T.A.Y', duration: '06:06' },
      { id: 2, title: 'MAKE (PHONK)', artist: '意情', album: 'The Dark Knight', duration: '03:22' },
      { id: 3, title: 'Salute Regards (Phonk Remix)', artist: 'Markorve', album: 'Gone Bad', duration: '03:26' },
      // Add more songs here
    ],
  };

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <img
          className="playlist-cover"
          src="http://p1.music.126.net/-4Ygb5Z9XfLOQFeldQlY2A==/1389782698058443.jpg?param=140y140"
          alt={playlistData.title}
        />
        <div className="playlist-info">
          <h1>{playlistData.title}</h1>
          <p>{playlistData.date}</p>
          <button className="play-all-button">播放全部</button>
        </div>
      </div>
      <table className="song-table">
        <thead>
          <tr>
            <th>#</th>
            <th>歌曲</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
        </thead>
        <tbody>
          {playlistData.songs.map((song, index) => (
            <tr key={song.id}>
              <td>{index + 1}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistPage;
