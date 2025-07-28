import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse, DashboardStats } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    // Get user's groups
    const userGroups = await prisma.group.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } }
        ]
      },
      select: { id: true }
    })

    const groupIds = userGroups.map(g => g.id)

    // Calculate stats
    const [
      totalGroups,
      totalContributions,
      activeGroups,
      pendingContributions,
      totalBalance
    ] = await Promise.all([
      // Total groups
      prisma.group.count({
        where: {
          OR: [
            { ownerId: session.user.id },
            { members: { some: { userId: session.user.id } } }
          ]
        }
      }),
      // Total contributions
      prisma.contribution.count({
        where: {
          userId: session.user.id,
          status: 'PAID'
        }
      }),
      // Active groups
      prisma.group.count({
        where: {
          OR: [
            { ownerId: session.user.id },
            { members: { some: { userId: session.user.id } } }
          ],
          status: 'ACTIVE'
        }
      }),
      // Pending contributions
      prisma.contribution.count({
        where: {
          userId: session.user.id,
          status: 'PENDING'
        }
      }),
      // Total balance (sum of all contributions)
      prisma.contribution.aggregate({
        where: {
          userId: session.user.id,
          status: 'PAID'
        },
        _sum: {
          amount: true
        }
      })
    ])

    const stats: DashboardStats = {
      totalGroups,
      totalContributions,
      balance: totalBalance._sum.amount?.toNumber() || 0,
      activeGroups,
      pendingContributions,
    }

    return NextResponse.json<ApiResponse<DashboardStats>>({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch dashboard stats',
    }, { status: 500 })
  }
} 