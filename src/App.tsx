import './App.css'
import 'antd/dist/reset.css'
import TitleBar from '@/components/Layout/TitleBar'
import LeftMenu from './components/Layout/LeftMenu'
import PlayerBar from './components/Layout/PlayerBar'
import Content from './components/Layout/Content'
import { Routes, Route } from "react-router-dom";
import Song from './pages/Song'
import Discover from './pages/Discover'
import PlaylistPage from './pages/Playlist'
import Artist from './pages/Artist'
import ArtistSongs from './pages/ArtistSongs'
import Album from './pages/Album'
import UserProfile from './pages/UserProfile'
import { StrictMode, useEffect } from 'react'
import player from './utils/player'

function App() {
useEffect(() => {
  player.initPlayer();
}, []);

  return (
    <StrictMode>
      <div>
        <LeftMenu/>
        <PlayerBar/>
        <Content>
              <Routes>
                <Route path="/" element={<Song type={0}/>} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                <Route path="/artist/:artistId" element={<Artist />} />
                <Route path="/artist/:id/songs" element={<ArtistSongs />} />
                <Route path="/album/favorites" element={<Album type={1} />} />
                <Route path="/album/:albumId" element={<Album type={2} />} />
                <Route path="/album/user" element={<Album type={3} />} />
                <Route path="/user" element={<UserProfile />} />
              </Routes>
            </Content>
        <TitleBar/>
      </div>
    </StrictMode>
  )
}

export default App
