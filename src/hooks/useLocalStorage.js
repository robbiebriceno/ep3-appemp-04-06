import { useState, useEffect } from 'react'

/**
 * Hook personalizado para manejar localStorage de forma reactiva
 * @param {string} key - Clave del localStorage
 * @param {any} initialValue - Valor inicial si no existe en localStorage
 * @returns {[any, function]} - [valor, setValue]
 */
function useLocalStorage(key, initialValue) {
  // Obtener valor inicial del localStorage o usar el valor por defecto
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Función para actualizar tanto el state como localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para API similar a useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage