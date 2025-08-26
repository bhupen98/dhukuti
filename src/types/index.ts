// Firebase Auth types
export interface FirebaseSession {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
  expires: string;
}

export interface FirebaseJWT {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Firebase-compatible types
export interface User {
  uid: string
  email: string
  displayName: string
  createdAt: Date
  updatedAt: Date
  phoneNumber?: string
  avatar?: string
  isActive: boolean
}

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

export interface Activity {
  id: string
  userId?: string
  groupId?: string
  type: string
  title: string
  description?: string
  metadata?: Record<string, any>
  createdAt: Date
}

export interface Message {
  id: string
  userId: string
  groupId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export interface Comment {
  id: string
  messageId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

// Extended types with relations
export type UserWithGroups = User & {
  ownedGroups: Group[]
  memberships: GroupMember[]
}

export type GroupWithMembers = Group & {
  owner: User
  members: GroupMember[]
  contributions: Contribution[]
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

export type ContributionWithUser = Contribution & {
  user: User
  group: Group
}

export type TransactionWithUser = Transaction & {
  user: User
  group: Group
}

export type ActivityWithUser = Activity & {
  user?: User
  group?: Group
}

export type MessageWithUser = Message & {
  user: User
  group: Group
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Dashboard types
export interface DashboardStats {
  totalGroups: number
  totalContributions: number
  balance: number
  activeGroups: number
  pendingContributions: number
}

// Form types
export interface CreateGroupForm {
  name: string
  description?: string
  maxMembers: number
  contributionAmount: number
  cycleDuration: number
}

export interface CreateContributionForm {
  amount: number
  dueDate: string
  cycleNumber: number
  notes?: string
}

// Auth types
export interface SessionUser {
  id: string
  email: string
  name: string
  avatar?: string
}

// Activity types
export interface ActivityItem {
  id: string
  type: string
  title: string
  description?: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
  group?: {
    name: string
  }
} 