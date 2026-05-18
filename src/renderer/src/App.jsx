import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import AniListPage from './pages/AniListPage.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/anilist" element={<AniListPage/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
