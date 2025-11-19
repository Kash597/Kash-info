import apiClient from '@/lib/api-client'

// API Response types
export interface HealthResponse {
  status: string
  version: string
}

export interface ApiError {
  message: string
  detail?: string
}

// Health check
export const healthCheck = async (): Promise<HealthResponse> => {
  const { data } = await apiClient.get('/health')
  return data
}

// Example: Get current user profile
export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/api/v1/users/me')
  return data
}

// Example: Update user profile
export const updateUserProfile = async (profileData: any) => {
  const { data } = await apiClient.put('/api/v1/users/me', profileData)
  return data
}

// Add more API functions as needed...
