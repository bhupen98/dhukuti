'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { initializeCollections, createProfileForExistingUser } from '@/lib/services/auth/userService'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Firestore collections when the app starts
    const initCollections = async () => {
      try {
        await initializeCollections()
      } catch (error) {
        console.error('Failed to initialize collections:', error)
      }
    }
    
    initCollections()

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // Check if user profile exists, if not create one
          try {
            await createProfileForExistingUser(user)
          } catch (error) {
            console.error('Failed to create profile for existing user:', error)
          }
        }
        
        setUser(user)
        setLoading(false)
        setError(null)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    error,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
