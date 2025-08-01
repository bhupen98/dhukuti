import { User, Group, Contribution, Transaction, Activity, Message, Comment } from '@prisma/client'
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
  }
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