import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { notifyFavoriteAdded, notifyFavoriteRemoved } from '../utils/notifyFavorite'

function FotoCard({ foto }) {
  const [favorites, setFavorites] = useLocalStorage('fav-movies', [])
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  
  const isFavorite = favorites.some(fav => fav.id === foto.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      // Remover de favoritos
      const newFavorites = favorites.filter(fav => fav.id !== foto.id)
      setFavorites(newFavorites)
      notifyFavoriteRemoved(foto.description)
    } else {
      // Agregar a favoritos
      const newFavorites = [...favorites, movie]
      setFavorites(newFavorites)
      notifyFavoriteAdded(movie.title)
    }
  }

  const formatShowtimes = (showtimes) => {
    return showtimes?.slice(0, 3).join(' • ') + (showtimes?.length > 3 ? ' • +' : '')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
      {/* Poster de la película */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}
        
        <img 
          src={movie.poster || 'https://via.placeholder.com/400x600?text=Sin+Poster'} 
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x600?text=Error+Cargando'
            setIsImageLoaded(true)
          }}
        />
        
        {/* Overlay con información rápida */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium mb-1">
              ⭐ {movie.rating} • 🕐 {movie.duration}
            </p>
            <p className="text-gray-300 text-xs line-clamp-2">
              {movie.genre}
            </p>
          </div>
        </div>
        
        {/* Botón de favorito */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
          }`}
          aria-label={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Badge de nuevo estreno */}
        {movie.isNewRelease && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            NUEVO
          </div>
        )}
      </div>

      {/* Información de la película */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {movie.title}
        </h3>
        
        {/* Precio */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-red-600">
            S/. {movie.price?.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {movie.language}
          </span>
        </div>
        
        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {movie.description}
        </p>
        
        {/* Horarios */}
        {movie.showtimes && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">HORARIOS:</p>
            <p className="text-sm text-gray-600">
              {formatShowtimes(movie.showtimes)}
            </p>
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="space-y-2">
          <button 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            onClick={() => {
              console.log('Comprar boletos para:', movie.title)
              // Aquí iría la lógica para comprar boletos
            }}
          >
            🎫 Comprar Boletos
          </button>
          
          <button 
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? '🔼 Menos detalles' : '🔽 Más detalles'}
          </button>
        </div>
        
        {/* Detalles expandibles */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm fade-in">
            <div className="space-y-2">
              <p><span className="font-semibold">Director:</span> {movie.director}</p>
              <p><span className="font-semibold">Reparto:</span> {movie.cast?.slice(0, 2).join(', ')}</p>
              <p><span className="font-semibold">Estreno:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              {movie.trailer && (
                <a 
                  href={movie.trailer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-red-600 hover:text-red-700 font-medium"
                >
                  🎬 Ver Trailer
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard