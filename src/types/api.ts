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

// Activity types
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
