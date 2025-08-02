import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Data Management Utilities for Real-World Dhukuti Operations

export class DhukutiDataManager {
  
  // User Management
  async createUser(userData: {
    email: string
    name: string
    password: string
    phoneNumber?: string
    address?: string
    emergencyContact?: string
  }) {
    return await prisma.user.create({
      data: {
        ...userData,
        isVerified: false,
        reputation: 0,
        totalEarnings: 0,
        totalContributions: 0
      }
    })
  }

  async updateUserReputation(userId: string, newReputation: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: { reputation: newReputation }
    })
  }

  // Group Management
  async createGroup(groupData: {
    name: string
    description?: string
    maxMembers: number
    contributionAmount: number
    cycleDuration: number
    ownerId: string
  }) {
    return await prisma.group.create({
      data: {
        ...groupData,
        status: 'ACTIVE',
        startDate: new Date()
      }
    })
  }

  async addMemberToGroup(userId: string, groupId: string, role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'MEMBER') {
    return await prisma.groupMember.create({
      data: {
        userId,
        groupId,
        role,
        status: 'ACTIVE'
      }
    })
  }

  // Contribution Management
  async createContribution(contributionData: {
    userId: string
    groupId: string
    amount: number
    dueDate: Date
    cycleNumber: number
    notes?: string
  }) {
    return await prisma.contribution.create({
      data: {
        ...contributionData,
        status: 'PENDING'
      }
    })
  }

  async markContributionAsPaid(contributionId: string, paidDate: Date = new Date()) {
    return await prisma.contribution.update({
      where: { id: contributionId },
      data: {
        status: 'PAID',
        paidDate
      }
    })
  }

  // Transaction Management
  async createTransaction(transactionData: {
    userId: string
    groupId: string
    amount: number
    type: 'CONTRIBUTION' | 'PAYOUT' | 'FEE' | 'REFUND'
    description?: string
  }) {
    return await prisma.transaction.create({
      data: {
        ...transactionData,
        status: 'COMPLETED'
      }
    })
  }

  // Activity Logging
  async logActivity(activityData: {
    type: 'GROUP_CREATED' | 'MEMBER_JOINED' | 'MEMBER_LEFT' | 'CONTRIBUTION_PAID' | 'CONTRIBUTION_OVERDUE' | 'PAYOUT_DISTRIBUTED' | 'MESSAGE_SENT'
    title: string
    description?: string
    userId?: string
    groupId?: string
    metadata?: any
  }) {
    return await prisma.activity.create({
      data: activityData
    })
  }

  // Message Management
  async sendMessage(messageData: {
    userId: string
    groupId: string
    content: string
    messageType?: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM'
  }) {
    return await prisma.message.create({
      data: {
        ...messageData,
        messageType: messageData.messageType || 'TEXT'
      }
    })
  }

  // Analytics and Reporting
  async getGroupAnalytics(groupId: string) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: { user: true }
        },
        contributions: true,
        transactions: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!group) return null

    const totalContributions = group.contributions.reduce((sum, c) => sum + Number(c.amount), 0)
    const paidContributions = group.contributions.filter(c => c.status === 'PAID').length
    const pendingContributions = group.contributions.filter(c => c.status === 'PENDING').length

    return {
      group,
      analytics: {
        totalContributions,
        paidContributions,
        pendingContributions,
        memberCount: group.members.length,
        completionRate: (paidContributions / group.contributions.length) * 100
      }
    }
  }

  async getUserAnalytics(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ownedGroups: true,
        memberships: {
          include: { group: true }
        },
        contributions: true,
        transactions: true
      }
    })

    if (!user) return null

    const totalGroups = user.ownedGroups.length + user.memberships.length
    const totalContributions = user.contributions.reduce((sum, c) => sum + Number(c.amount), 0)
    const onTimePayments = user.contributions.filter(c => c.status === 'PAID' && c.paidDate && c.paidDate <= c.dueDate).length

    return {
      user,
      analytics: {
        totalGroups,
        totalContributions,
        onTimePayments,
        paymentReliability: (onTimePayments / user.contributions.length) * 100
      }
    }
  }

  // Data Cleanup and Maintenance
  async cleanupOverdueContributions() {
    const overdueContributions = await prisma.contribution.findMany({
      where: {
        status: 'PENDING',
        dueDate: {
          lt: new Date()
        }
      }
    })

    for (const contribution of overdueContributions) {
      await prisma.contribution.update({
        where: { id: contribution.id },
        data: { status: 'OVERDUE' }
      })

      await this.logActivity({
        type: 'CONTRIBUTION_OVERDUE',
        title: 'Contribution Overdue',
        description: `Contribution of Rs. ${contribution.amount} is overdue`,
        userId: contribution.userId,
        groupId: contribution.groupId
      })
    }

    return overdueContributions.length
  }

  async generateMonthlyReport(groupId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const contributions = await prisma.contribution.findMany({
      where: {
        groupId,
        dueDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        user: true
      }
    })

    const transactions = await prisma.transaction.findMany({
      where: {
        groupId,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    })

    const totalAmount = contributions.reduce((sum, c) => sum + Number(c.amount), 0)
    const paidAmount = contributions
      .filter(c => c.status === 'PAID')
      .reduce((sum, c) => sum + Number(c.amount), 0)

    return {
      period: `${month}/${year}`,
      totalContributions: contributions.length,
      paidContributions: contributions.filter(c => c.status === 'PAID').length,
      totalAmount,
      paidAmount,
      collectionRate: (paidAmount / totalAmount) * 100,
      contributions,
      transactions
    }
  }
}

// Export singleton instance
export const dataManager = new DhukutiDataManager()

// Example usage functions
export async function initializeNewDhukutiGroup(
  groupName: string,
  ownerEmail: string,
  contributionAmount: number,
  cycleDuration: number
) {
  // Find or create owner
  let owner = await prisma.user.findUnique({
    where: { email: ownerEmail }
  })

  if (!owner) {
    owner = await dataManager.createUser({
      email: ownerEmail,
      name: ownerEmail.split('@')[0], // Simple name from email
      password: 'defaultPassword123' // This should be changed in production
    })
  }

  // Create group
  const group = await dataManager.createGroup({
    name: groupName,
    maxMembers: 10,
    contributionAmount,
    cycleDuration,
    ownerId: owner.id
  })

  // Add owner as member
  await dataManager.addMemberToGroup(owner.id, group.id, 'OWNER')

  // Log activity
  await dataManager.logActivity({
    type: 'GROUP_CREATED',
    title: `${groupName} created`,
    description: `New Dhukuti group created with Rs. ${contributionAmount} contributions`,
    userId: owner.id,
    groupId: group.id,
    metadata: { contributionAmount, cycleDuration }
  })

  return { group, owner }
}

export async function processContributionPayment(
  contributionId: string,
  paidAmount: number,
  paymentMethod: string = 'cash'
) {
  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: { user: true, group: true }
  })

  if (!contribution) throw new Error('Contribution not found')

  // Mark contribution as paid
  await dataManager.markContributionAsPaid(contributionId)

  // Create transaction record
  await dataManager.createTransaction({
    userId: contribution.userId,
    groupId: contribution.groupId,
    amount: paidAmount,
    type: 'CONTRIBUTION',
    description: `Contribution payment via ${paymentMethod}`
  })

  // Update user stats
  await prisma.user.update({
    where: { id: contribution.userId },
    data: {
      totalContributions: { increment: 1 }
    }
  })

  // Log activity
  await dataManager.logActivity({
    type: 'CONTRIBUTION_PAID',
    title: 'Contribution Paid',
    description: `${contribution.user.name} paid Rs. ${paidAmount}`,
    userId: contribution.userId,
    groupId: contribution.groupId
  })

  return { contribution, transaction: true }
} 