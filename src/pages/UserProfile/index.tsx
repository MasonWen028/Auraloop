import PlaylistGrid from "@/components/PlaylistGrid";
import "./index.css";

const UserProfile = () => {
  const playlists = [
    { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
    { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
    { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
    { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
    { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
    { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
    { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
    { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
    { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
    { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
  ];

  const handleCardClick = (title: string) => {
    console.log(`You clicked on playlist: ${title}`);
  };

  return (
    <div className="artist-container">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src="http://p1.music.126.net/AWiaSRiMztcJt7Y6_Hi25A==/7874702278826849.jpg?param=180y180"
          alt="Profile Avatar"
        />
        <div className="profile-info">
          <h2>荒唐的老文</h2>
          <p>172 关注 · 96 粉丝 · 0 获赞</p>
          <p>36岁 · 澳大利亚 · Flinders University</p>
        </div>
      </div>

      <div className="playlists-section">
        <div style={{fontSize: 12}}>创建的歌单</div>
        <PlaylistGrid style={{marginTop: 20}} playlists={playlists} onCardClick={handleCardClick} />
      </div>
    </div>
  );
};

export default UserProfile;
