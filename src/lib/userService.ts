import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from './firebase'
import { User as FirebaseUser } from 'firebase/auth'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  createdAt: Date
  updatedAt: Date
  phoneNumber?: string
  avatar?: string
  isActive: boolean
}

export interface CreateUserProfileData {
  phoneNumber?: string
  avatar?: string
}

export interface UpdateUserProfileData {
  displayName?: string
  phoneNumber?: string
  avatar?: string
  isActive?: boolean
}

export interface UserServiceResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Create user profile in Firestore when they sign up
export const createUserProfile = async (
  user: FirebaseUser, 
  additionalData?: CreateUserProfileData
): Promise<UserServiceResponse<UserProfile>> => {
  try {
    const userRef = doc(db, 'users', user.uid)
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      ...additionalData
    }

    await setDoc(userRef, userProfile)
    console.log('User profile created successfully in Firestore')
    return { success: true, data: userProfile, message: 'User profile created successfully' }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error creating user profile:', error)
    return { success: false, error: errorMessage }
  }
}

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserServiceResponse<UserProfile>> => {
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile
      return { success: true, data: userData }
    } else {
      return { success: false, error: 'User profile not found' }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error getting user profile:', error)
    return { success: false, error: errorMessage }
  }
}

// Update user profile in Firestore
export const updateUserProfile = async (
  uid: string, 
  updateData: UpdateUserProfileData
): Promise<UserServiceResponse<UserProfile>> => {
  try {
    const userRef = doc(db, 'users', uid)
    
    // Add updatedAt timestamp
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    }
    
    await updateDoc(userRef, updatePayload)
    
    // Get the updated profile
    const updatedProfile = await getUserProfile(uid)
    if (updatedProfile.success) {
      return { 
        success: true, 
        data: updatedProfile.data, 
        message: 'User profile updated successfully' 
      }
    } else {
      return { success: false, error: 'Failed to retrieve updated profile' }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error updating user profile:', error)
    return { success: false, error: errorMessage }
  }
}

// Delete user profile from Firestore
export const deleteUserProfile = async (uid: string): Promise<UserServiceResponse<void>> => {
  try {
    const userRef = doc(db, 'users', uid)
    await deleteDoc(userRef)
    
    console.log('User profile deleted successfully')
    return { success: true, message: 'User profile deleted successfully' }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error deleting user profile:', error)
    return { success: false, error: errorMessage }
  }
}

// Get all users (with pagination support)
export const getAllUsers = async (
  limitCount: number = 50
): Promise<UserServiceResponse<UserProfile[]>> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(
      usersRef, 
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const users: UserProfile[] = []
    
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile)
    })
    
    return { success: true, data: users }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error getting all users:', error)
    return { success: false, error: errorMessage }
  }
}

// Search users by display name or email
export const searchUsers = async (
  searchTerm: string,
  limitCount: number = 20
): Promise<UserServiceResponse<UserProfile[]>> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(
      usersRef,
      where('isActive', '==', true),
      orderBy('displayName'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const users: UserProfile[] = []
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as UserProfile
      if (
        userData.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userData.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        users.push(userData)
      }
    })
    
    return { success: true, data: users }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error searching users:', error)
    return { success: false, error: errorMessage }
  }
}

// Create profile for existing authenticated user
export const createProfileForExistingUser = async (
  user: FirebaseUser
): Promise<UserServiceResponse<UserProfile>> => {
  try {
    // Check if profile already exists
    const existingProfile = await getUserProfile(user.uid)
    if (existingProfile.success) {
      console.log('User profile already exists')
      return existingProfile
    }

    // Create new profile
    return await createUserProfile(user)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error creating profile for existing user:', error)
    return { success: false, error: errorMessage }
  }
}

// Initialize default collections structure
export const initializeCollections = async (): Promise<UserServiceResponse<void>> => {
  try {
    // Create a temporary document to ensure collections exist
    const tempRef = doc(db, '_system', 'collections')
    await setDoc(tempRef, {
      initialized: true,
      timestamp: new Date(),
      collections: ['users', 'groups', 'contributions', 'activities', 'events']
    })
    
    console.log('Firestore collections initialized successfully')
    return { success: true, message: 'Collections initialized successfully' }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error initializing collections:', error)
    return { success: false, error: errorMessage }
  }
}

// Check if user profile exists
export const userProfileExists = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    return userSnap.exists()
  } catch (error) {
    console.error('Error checking if user profile exists:', error)
    return false
  }
}

// Get user profile by email
export const getUserProfileByEmail = async (email: string): Promise<UserServiceResponse<UserProfile>> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email), limit(1))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data() as UserProfile
      return { success: true, data: userData }
    } else {
      return { success: false, error: 'User profile not found' }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error getting user profile by email:', error)
    return { success: false, error: errorMessage }
  }
}