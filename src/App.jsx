import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { SideBar } from './components/SideBar'
import Home from './components/pages/Home'
import Artist from './components/pages/Artist'
import Album from './components/pages/Album'
import Track from './components/pages/Track'
import SearchResults from './components/pages/SearchResults'
import Playlist from './components/pages/Playlist'
import AddArtist from './components/pages/AddArtist'
import AddAlbum from './components/pages/AddAlbum'
import AddTrack from './components/pages/AddTrack'
import AddPlaylist from './components/pages/AddPlaylist'
import EditArtist from './components/pages/EditArtist'
import EditAlbum from './components/pages/EditAlbum'
import EditTrack from './components/pages/EditTrack'
import EditPlaylist from './components/pages/EditPlaylist'

import './App.css'

function App() {
  return (
    <Router>
      <div className='grid-container relative h-screen p-2 gap-2'>
        <nav className='nav min-h-[48px] justify-center flex flex-row gap-x-4'>
          <Navbar />
        </nav>

        <aside className='aside flex-col flex overflow-y-auto gap-2'>
          <SideBar />
        </aside>

        <main className='main rounded-lg overflow-y-auto'>
          <Routes>
            <Route path="/music" element={<Home />} />
            <Route path="music/artist/:id" element={<Artist />} />
            <Route path="music/album/:id" element={<Album />} />
            <Route path="music/track/:id" element={<Track />} />
            <Route path="music/search" element={<SearchResults />} />
            <Route path="music/playlist/:id" element={<Playlist />} />
            <Route path="music/add-artist" element={<AddArtist />} />
            <Route path="music/add-album" element={<AddAlbum />} />
            <Route path="music/add-track" element={<AddTrack />} />
            <Route path="music/add-playlist" element={<AddPlaylist />} />
            <Route path="music/edit/artist/:id" element={<EditArtist />} />
            <Route path="music/edit/album/:id" element={<EditAlbum />} />
            <Route path="music/edit/track/:id" element={<EditTrack />} />
            <Route path="music/edit/playlist/:id" element={<EditPlaylist />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
