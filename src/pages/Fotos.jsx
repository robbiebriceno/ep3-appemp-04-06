import { useState, useEffect } from 'react'
import MovieCard from '../components/FotoCard'
import MovieSearch from '../components/FotoSearch'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { fotosData } from '../data/items'
import { notifyInfo } from '../utils/notifyFavorite'

function Fotos() {
  const [fotos, setFotos] = useState([])
  const [filteredMovies, setFilteredFotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('title') // title, price, rating, duration

  // Simular carga de datos
  useEffect(() => {
    const loadFotos = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simular tiempo de carga de la API del cine
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Usar datos mock de películas
        setFotos(fotosData)
        setFilteredFotos(fotosData)
        
        notifyInfo(`Se cargaron ${fotosData.length} películas en cartelera`)
        
      } catch (err) {
        setError('Error al cargar la cartelera. Por favor intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  // Función de búsqueda avanzada
  const handleSearch = (searchTerm, filter) => {
    setCurrentFilter(filter)
    
    if (!searchTerm.trim()) {
      setFilteredMovies(fotos)
      return
    }

    const filtered = fotos.filter(foto => {
      const term = searchTerm.toLowerCase()
      
      switch (filter) {
        case 'title':
          return foto.title.toLowerCase().includes(term)
        case 'genre':
          return movie.genre.toLowerCase().includes(term)
        case 'director':
          return movie.director.toLowerCase().includes(term)
        case 'all':
        default:
          return (
            movie.title.toLowerCase().includes(term) ||
            movie.genre.toLowerCase().includes(term) ||
            movie.director.toLowerCase().includes(term) ||
            movie.cast.some(actor => actor.toLowerCase().includes(term))
          )
      }
    })
    
    setFilteredMovies(filtered)
  }

  // Función de ordenamiento
  const handleSort = (sortOption) => {
    setSortBy(sortOption)
    
    const sorted = [...filteredMovies].sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'price':
          return a.price - b.price
        case 'rating':
          return b.rating.localeCompare(a.rating) // Mayor rating primero
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration)
        case 'newest':
          return new Date(b.releaseDate) - new Date(a.releaseDate)
        default:
          return 0
      }
    })
    
    setFilteredMovies(sorted)
  }

  // Filtros rápidos por género
  const filterByGenre = (genre) => {
    if (genre === 'all') {
      setFilteredMovies(movies)
    } else {
      const filtered = movies.filter(movie => 
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      )
      setFilteredMovies(filtered)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="text-6xl mb-4">🎬💥</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🔄 Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header de la página */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎬 Cartelera Cineplanet
        </h1>
        <p className="text-xl text-gray-600">
          Descubre todas las películas disponibles y encuentra tu próxima aventura cinematográfica
        </p>
      </div>
      
      {/* Buscador principal */}
      <MovieSearch onSearch={handleSearch} />
      
      {/* Filtros y controles */}
      {!loading && (
        <div className="mb-8">
          {/* Filtros por género */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button
              onClick={() => filterByGenre('all')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              🎭 Todos los géneros
            </button>
            <button
              onClick={() => filterByGenre('acción')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              💥 Acción
            </button>
            <button
              onClick={() => filterByGenre('comedia')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              😄 Comedia
            </button>
            <button
              onClick={() => filterByGenre('drama')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              🎭 Drama
            </button>
            <button
              onClick={() => filterByGenre('animación')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              🦁 Animación
            </button>
            <button
              onClick={() => filterByGenre('ciencia ficción')}
              className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              🚀 Sci-Fi
            </button>
          </div>
          
          {/* Controles de ordenamiento */}
          <div className="flex flex-wrap items-center justify-between bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="title">📝 Título (A-Z)</option>
                <option value="price">💰 Precio (Menor a Mayor)</option>
                <option value="rating">⭐ Rating</option>
                <option value="duration">⏱️ Duración</option>
                <option value="newest">🆕 Más recientes</option>
              </select>
            </div>
            
            {/* Estadísticas */}
            <div className="text-gray-600 text-sm">
              Mostrando <span className="font-semibold text-red-600">{filteredMovies.length}</span> de <span className="font-semibold">{movies.length}</span> películas
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de películas */}
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : (
        <>
          {filteredMovies.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🎬🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                No se encontraron películas
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta con términos de búsqueda diferentes o revisa los filtros aplicados
              </p>
              <button
                onClick={() => {
                  setFilteredMovies(movies)
                  setCurrentFilter('all')
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔄 Ver todas las películas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Información adicional */}
      {!loading && filteredMovies.length > 0 && (
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            ℹ️ Información importante
          </h3>
          <ul className="text-red-700 space-y-1 text-sm">
            <li>• Los horarios pueden variar según la disponibilidad de salas</li>
            <li>• Recomendamos llegar 15 minutos antes de la función</li>
            <li>• Los precios incluyen la película, no snacks adicionales</li>
            <li>• Descuentos disponibles para estudiantes y adultos mayores</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Movies