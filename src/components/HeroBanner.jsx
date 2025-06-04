import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HeroBanner({ 
  title = "Dribble", 
  subtitle = "dribble es una plataforma de diseño y creatividad",
  backgroundImage = "https://images.unsplash.com/photo-1489599833603-9c2b1e87e793?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay con patrón de puntos */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Contenido principal */}
      <div className={`relative text-center max-w-5xl px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/items"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            🎬 Ver Cartelera
          </Link>
          <Link 
            to="/contact"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl"
          >
            📞 Contáctanos
          </Link>
        </div>
        
        {/* Indicadores de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🍿</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-pulse">🎭</div>
    </section>
  )
}

export default HeroBanner