import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth'
import { auth } from './firebase'
import { createUserProfile } from './userService'

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Sign up with email, password, and name
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update display name
    await updateProfile(userCredential.user, { displayName: name })
    
    // Create user profile in Firestore
    const profileResult = await createUserProfile(userCredential.user)
    
    if (!profileResult.success) {
      console.error('Failed to create user profile:', profileResult.error)
      // Note: User is still created in Auth, but profile creation failed
    }
    
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser
} 