import { toast } from 'react-toastify'

// Configuración base para todas las notificaciones
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const notifyFavoriteAdded = (movieTitle) => {
  toast.success(`🎬 "${movieTitle}" agregada a favoritos`, {
    ...toastConfig,
    autoClose: 2000,
  })
}

export const notifyFavoriteRemoved = (movieTitle) => {
  toast.info(`📝 "${movieTitle}" removida de favoritos`, {
    ...toastConfig,
    autoClose: 2000,
  })
}

export const notifyError = (message) => {
  toast.error(`❌ ${message}`, {
    ...toastConfig,
    autoClose: 4000,
  })
}

export const notifySuccess = (message) => {
  toast.success(`✅ ${message}`, {
    ...toastConfig,
  })
}

export const notifyInfo = (message) => {
  toast.info(`ℹ️ ${message}`, {
    ...toastConfig,
  })
}

export const notifyWarning = (message) => {
  toast.warning(`⚠️ ${message}`, {
    ...toastConfig,
  })
}