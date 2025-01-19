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

function App() {
  return (
    <>
      <div>
        <LeftMenu/>
        <PlayerBar/>
        <Content>
              <Routes>
                <Route path="/" element={<Song />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
              </Routes>
            </Content>
        <TitleBar/>
      </div>
    </>
  )
}

export default App
