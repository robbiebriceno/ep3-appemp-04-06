import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movies from './pages/Fotos'
import Contact from './pages/Contact'


function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-open-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Movies />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
