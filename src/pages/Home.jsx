import { useState, useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import FotoCard from '../components/FotoCard'
import { fotosData, upcomingMovies } from '../data/items'

function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos destacados
    const loadFeaturedContent = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Obtener las primeras 6 películas como destacadas
      setFeaturedMovies(fotosData.slice(0, 6))
      setIsLoading(false)
    }

    loadFeaturedContent()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner 
        title="Vive la Magia del Cine"
        subtitle="Las mejores películas, los mejores momentos. Descubre nuestra cartelera."
        backgroundImage="https://images.unsplash.com/photo-1489599833603-9c2b1e87e793?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      {/* Sección de películas destacadas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎬 En Cartelera Ahora
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las películas más emocionantes que están en nuestras salas. 
              Desde acción hasta drama, tenemos algo para todos los gustos.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Sección de próximos estrenos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🔜 Próximos Estrenos
            </h2>
            <p className="text-xl text-gray-600">
              ¡Prepárate para estas increíbles películas que llegan pronto!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingMovies.map(movie => (
              <div key={movie.id} className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-600">
                <div className="flex items-start space-x-4">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h3>
                    <p className="text-gray-700 mb-2">{movie.genre}</p>
                    <p className="text-sm text-gray-600 mb-3">{movie.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-red-600">
                        Estreno: {new Date(movie.releaseDate).toLocaleDateString()}
                      </span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        PRÓXIMAMENTE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de beneficios */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              ¿Por qué elegir Cineplanet? 🌟
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-2">Últimas Tecnologías</h3>
              <p className="text-gray-300">
                Salas con sonido Dolby Digital y proyección 4K para la mejor experiencia cinematográfica.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🍿</div>
              <h3 className="text-xl font-bold mb-2">Snacks Deliciosos</h3>
              <p className="text-gray-300">
                Palomitas recién hechas, nachos, bebidas y mucho más para acompañar tu película.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🛋️</div>
              <h3 className="text-xl font-bold mb-2">Comodidad Total</h3>
              <p className="text-gray-300">
                Asientos reclinables y espaciosos para que disfrutes al máximo de cada función.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home