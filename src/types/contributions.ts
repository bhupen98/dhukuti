import { User } from './auth'
import { Group } from './groups'

export interface Contribution {
  id: string
  userId: string
  groupId: string
  amount: number
  cycleNumber: number
  dueDate: Date
  paidAt?: Date
  status: 'PENDING' | 'PAID' | 'OVERDUE'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  groupId: string
  amount: number
  type: 'CONTRIBUTION' | 'WITHDRAWAL' | 'PENALTY'
  description?: string
  createdAt: Date
}

export type ContributionWithUser = Contribution & {
  user: User
  group: Group
}

export type TransactionWithUser = Transaction & {
  user: User
  group: Group
}

// Form types
export interface CreateContributionForm {
  amount: number
  dueDate: string
  cycleNumber: number
  notes?: string
}
