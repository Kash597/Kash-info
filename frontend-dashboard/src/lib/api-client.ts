import axios from 'axios'
import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession()

      if (refreshError || !session) {
        // Refresh failed, logout user
        await supabase.auth.signOut()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      // Retry original request with new token
      error.config.headers.Authorization = `Bearer ${session.access_token}`
      return apiClient.request(error.config)
    }

    return Promise.reject(error)
  }
)

export default apiClient
