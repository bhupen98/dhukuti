import { 
  MIN_PASSWORD_LENGTH, 
  MAX_PASSWORD_LENGTH,
  MIN_GROUP_NAME_LENGTH,
  MAX_GROUP_NAME_LENGTH,
  MIN_CONTRIBUTION_AMOUNT,
  MAX_CONTRIBUTION_AMOUNT,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE
} from './constants'

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`)
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    errors.push(`Password must be no more than ${MAX_PASSWORD_LENGTH} characters long`)
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Australian phone number formats
  const patterns = [
    /^0[2-9]\d{8}$/, // 0X XXXX XXXX
    /^04\d{8}$/,     // 04XX XXX XXX
    /^\+61[2-9]\d{8}$/, // +61 X XXXX XXXX
    /^\+614\d{8}$/,  // +61 4XX XXX XXX
  ]
  
  return patterns.some(pattern => pattern.test(cleaned))
}

/**
 * Validate group name
 */
export function isValidGroupName(name: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (name.length < MIN_GROUP_NAME_LENGTH) {
    errors.push(`Group name must be at least ${MIN_GROUP_NAME_LENGTH} characters long`)
  }

  if (name.length > MAX_GROUP_NAME_LENGTH) {
    errors.push(`Group name must be no more than ${MAX_GROUP_NAME_LENGTH} characters long`)
  }

  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    errors.push('Group name can only contain letters, numbers, spaces, hyphens, and underscores')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate contribution amount
 */
export function isValidContributionAmount(amount: number): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (amount < MIN_CONTRIBUTION_AMOUNT) {
    errors.push(`Contribution amount must be at least ${MIN_CONTRIBUTION_AMOUNT}`)
  }

  if (amount > MAX_CONTRIBUTION_AMOUNT) {
    errors.push(`Contribution amount must be no more than ${MAX_CONTRIBUTION_AMOUNT}`)
  }

  if (!Number.isInteger(amount)) {
    errors.push('Contribution amount must be a whole number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate file upload
 */
export function isValidFile(file: File, allowedTypes: string[] = ALLOWED_IMAGE_TYPES): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size must be no more than ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj > new Date()
}

/**
 * Validate date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate required field
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength
}

/**
 * Validate numeric range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0
}

/**
 * Validate non-negative number
 */
export function isNonNegativeNumber(value: number): boolean {
  return typeof value === 'number' && value >= 0
}

/**
 * Validate integer
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value)
}

/**
 * Validate Australian postcode
 */
export function isValidAustralianPostcode(postcode: string): boolean {
  const postcodeRegex = /^[0-9]{4}$/
  return postcodeRegex.test(postcode)
}

/**
 * Validate Australian ABN (Australian Business Number)
 */
export function isValidABN(abn: string): boolean {
  // Remove spaces and dashes
  const cleaned = abn.replace(/[\s-]/g, '')
  
  // Must be 11 digits
  if (!/^\d{11}$/.test(cleaned)) {
    return false
  }
  
  // ABN validation algorithm
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  let sum = 0
  
  for (let i = 0; i < 11; i++) {
    const digit = parseInt(cleaned[i])
    sum += digit * weights[i]
  }
  
  return sum % 89 === 0
}
