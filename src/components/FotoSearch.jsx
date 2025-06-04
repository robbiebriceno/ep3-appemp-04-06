import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'

function FotoSearch({ onSearch, placeholder = "Buscar imagenes..." }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFilter, setSearchFilter] = useState('all') // all, title, genre, director
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Ejecutar búsqueda cuando el término debounced cambie
  useState(() => {
    onSearch(debouncedSearchTerm, searchFilter)
  }, [debouncedSearchTerm, searchFilter, onSearch])

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      {/* Barra de búsqueda principal */}
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
          />
          
          {/* Icono de búsqueda */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Botón para limpiar */}
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors duration-200 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Filtros de búsqueda */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSearchFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            searchFilter === 'all'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎬 Todos
        </button>
        <button
          onClick={() => setSearchFilter('title')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            searchFilter === 'title'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📝 Título
        </button>
        <button
          onClick={() => setSearchFilter('genre')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            searchFilter === 'genre'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎭 Género
        </button>
        <button
          onClick={() => setSearchFilter('director')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            searchFilter === 'director'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎥 Director
        </button>
      </div>
      
      {/* Indicador de búsqueda activa */}
      {debouncedSearchTerm && (
        <div className="mt-4 text-center">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm">
            🔍 Buscando: "<span className="font-semibold">{debouncedSearchTerm}</span>"
            {searchFilter !== 'all' && ` en ${searchFilter === 'title' ? 'títulos' : searchFilter === 'genre' ? 'géneros' : 'directores'}`}
          </span>
        </div>
      )}
    </div>
  )
}

export default MovieSearch