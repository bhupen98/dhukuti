import { User } from './auth'

export interface Group {
  id: string
  name: string
  description?: string
  ownerId: string
  maxMembers: number
  contributionAmount: number
  cycleDuration: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export type GroupMember = {
  id: string
  userId: string
  groupId: string
  joinedAt: Date
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  role: 'OWNER' | 'ADMIN' | 'MEMBER'
  user: User
  group: Group
}

export type GroupWithMembers = Group & {
  owner: User
  members: GroupMember[]
  contributions: Contribution[]
}

// Form types
export interface CreateGroupForm {
  name: string
  description?: string
  maxMembers: number
  contributionAmount: number
  cycleDuration: number
}
