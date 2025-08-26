// Common utility types
export type Status = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
export type Role = 'OWNER' | 'ADMIN' | 'MEMBER'
export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE'
export type TransactionType = 'CONTRIBUTION' | 'WITHDRAWAL' | 'PENALTY'

// Generic types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form validation types
export interface FormError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: FormError[]
  isValid: boolean
  isSubmitting: boolean
}
