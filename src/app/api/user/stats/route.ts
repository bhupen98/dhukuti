import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    // Calculate user stats
    const [
      groups,
      contributions,
      totalBalance
    ] = await Promise.all([
      // User's groups (owned + member)
      prisma.group.count({
        where: {
          OR: [
            { ownerId: session.user.id },
            { members: { some: { userId: session.user.id } } }
          ]
        }
      }),
      // User's contributions
      prisma.contribution.count({
        where: {
          userId: session.user.id,
          status: 'PAID'
        }
      }),
      // User's total balance
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

    const stats = {
      groups,
      contributions,
      balance: totalBalance._sum.amount?.toNumber() || 0,
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch user stats',
    }, { status: 500 })
  }
} 