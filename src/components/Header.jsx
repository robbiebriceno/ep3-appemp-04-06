import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-red-600 font-semibold border-b-2 border-red-600' 
      : 'text-gray-700 hover:text-red-600 transition-colors duration-200'
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo de Cineplanet */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-red-600">
              🎬
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Dribble
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`pb-2 transition-all duration-200 ${isActive('/')}`}
            >
              Inicio
            </Link>
            <Link 
              to="/items" 
              className={`pb-2 transition-all duration-200 ${isActive('/items')}`}
            >
              Buscador
            </Link>
            <Link 
              to="/contact" 
              className={`pb-2 transition-all duration-200 ${isActive('/contact')}`}
            >
              Contacto
            </Link>
          </div>
          
          {/* Botón de búsqueda rápida */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-red-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header