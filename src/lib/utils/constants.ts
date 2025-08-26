// Application constants
export const APP_NAME = 'Dhukuti'
export const APP_DESCRIPTION = 'Traditional Nepali Rotating Savings and Credit Association Platform'

// API constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
export const API_TIMEOUT = 30000 // 30 seconds

// Firebase constants
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// Validation constants
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128
export const MIN_GROUP_NAME_LENGTH = 3
export const MAX_GROUP_NAME_LENGTH = 100
export const MIN_CONTRIBUTION_AMOUNT = 1
export const MAX_CONTRIBUTION_AMOUNT = 100000

// Status constants
export const STATUS_ACTIVE = 'ACTIVE'
export const STATUS_INACTIVE = 'INACTIVE'
export const STATUS_SUSPENDED = 'SUSPENDED'

// Role constants
export const ROLE_OWNER = 'OWNER'
export const ROLE_ADMIN = 'ADMIN'
export const ROLE_MEMBER = 'MEMBER'

// Payment status constants
export const PAYMENT_STATUS_PENDING = 'PENDING'
export const PAYMENT_STATUS_PAID = 'PAID'
export const PAYMENT_STATUS_OVERDUE = 'OVERDUE'

// Transaction type constants
export const TRANSACTION_TYPE_CONTRIBUTION = 'CONTRIBUTION'
export const TRANSACTION_TYPE_WITHDRAWAL = 'WITHDRAWAL'
export const TRANSACTION_TYPE_PENALTY = 'PENALTY'

// Date formats
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY'
export const DISPLAY_DATETIME_FORMAT = 'MMM DD, YYYY HH:mm'

// Currency
export const DEFAULT_CURRENCY = 'AUD'
export const CURRENCY_SYMBOL = '$'

// File upload constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

// Notification constants
export const NOTIFICATION_TYPES = {
  CONTRIBUTION_DUE: 'CONTRIBUTION_DUE',
  PAYOUT_RECEIVED: 'PAYOUT_RECEIVED',
  GROUP_UPDATE: 'GROUP_UPDATE',
  EVENT_REMINDER: 'EVENT_REMINDER',
  MEMBER_JOINED: 'MEMBER_JOINED',
  PAYMENT_LATE: 'PAYMENT_LATE',
  TURN_APPROACHING: 'TURN_APPROACHING',
  SYSTEM_MESSAGE: 'SYSTEM_MESSAGE',
} as const

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  GROUP_CREATED: 'Group created successfully.',
  GROUP_UPDATED: 'Group updated successfully.',
  CONTRIBUTION_ADDED: 'Contribution added successfully.',
  CONTRIBUTION_UPDATED: 'Contribution updated successfully.',
  MEMBER_ADDED: 'Member added successfully.',
  MEMBER_REMOVED: 'Member removed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
} as const
