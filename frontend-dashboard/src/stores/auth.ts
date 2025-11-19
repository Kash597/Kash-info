import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { AuthState } from '@/types/auth'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Login failed:', error)
      set({ isLoading: false })
      throw error
    }
  },

  signup: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Signup failed:', error)
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  },
}))

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    useAuthStore.setState({
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata?.name,
      },
      isAuthenticated: true,
      isLoading: false,
    })
  } else {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }
})
