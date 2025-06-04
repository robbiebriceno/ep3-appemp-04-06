import { useState, useEffect } from 'react'

/**
 * Hook personalizado para implementar debounce
 * @param {any} value - Valor a hacer debounce
 * @param {number} delay - Tiempo de delay en milisegundos
 * @returns {any} - Valor con debounce aplicado
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Crear un timer que actualizará debouncedValue después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Limpiar el timeout si value cambia antes de que expire el delay
    // Esto es crucial para el funcionamiento del debounce
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce