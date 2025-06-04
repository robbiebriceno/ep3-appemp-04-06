import { useState } from 'react'
import { notifySuccess, notifyError } from '../utils/notifyFavorite'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    preferredContact: 'email'
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Opciones para el asunto
  const subjectOptions = [
    { value: 'general', label: 'Consulta General' },
    { value: 'tickets', label: 'Problemas con Boletos' },
    { value: 'showtimes', label: 'Horarios de Funciones' },
    { value: 'group', label: 'Reservas Grupales' },
    { value: 'complaint', label: 'Reclamos' },
    { value: 'suggestion', label: 'Sugerencias' }
  ]

  // Validaciones específicas para cine
  const validateForm = () => {
    const newErrors = {}
    
    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido'
    }
    
    // Validar teléfono (opcional pero si se proporciona debe ser válido)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'El número de teléfono no es válido'
      }
    }
    
    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'El mensaje no puede exceder 500 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      notifyError('Por favor corrige los errores en el formulario')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simular envío del formulario a un servicio de cine
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Éxito
      notifySuccess('¡Mensaje enviado correctamente! Te contactaremos pronto.')
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        preferredContact: 'email'
      })
      setErrors({})
      
    } catch (error) {
      notifyError('Error al enviar el mensaje. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🎬 Contáctanos
        </h2>
        <p className="text-gray-600">
          ¿Tienes alguna consulta sobre nuestras películas o servicios?
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre y Email en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Teléfono y Asunto en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono (Opcional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="+51 987 654 321"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Campo Asunto */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Asunto
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              {subjectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Método de contacto preferido */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Método de contacto preferido
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleChange}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="ml-2">📧 Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleChange}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="ml-2">📞 Teléfono</span>
            </label>
          </div>
        </div>

        {/* Campo Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            maxLength={500}
            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition-all ${
              errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Describe tu consulta, problema o sugerencia..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="text-red-500 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.message}
              </p>
            ) : (
              <span></span>
            )}
            <span className="text-sm text-gray-500">
              {formData.message.length}/500
            </span>
          </div>
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando mensaje...</span>
            </>
          ) : (
            <>
              <span>📧</span>
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm