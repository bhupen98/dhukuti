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

    // Fetch user's recent activities including contributions and transactions
    const activities = await prisma.activity.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        group: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    // Also fetch recent contributions
    const contributions = await prisma.contribution.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        group: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    })

    // Transform activities and contributions into a unified format
    const transformedActivities = [
      ...activities.map(activity => ({
        id: activity.id,
        type: activity.type,
        description: getActivityDescription(activity),
        amount: activity.metadata && typeof activity.metadata === 'object' && 'amount' in activity.metadata 
          ? Number(activity.metadata.amount) 
          : undefined,
        groupName: activity.group?.name,
        createdAt: activity.createdAt.toISOString(),
      })),
      ...contributions.map(contribution => ({
        id: contribution.id,
        type: 'CONTRIBUTION',
        description: `Contributed ${contribution.amount} to ${contribution.group.name}`,
        amount: Number(contribution.amount),
        groupName: contribution.group.name,
        createdAt: contribution.createdAt.toISOString(),
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

    return NextResponse.json<ApiResponse>({
      success: true,
      data: transformedActivities,
    })
  } catch (error) {
    console.error('Error fetching user activities:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch user activities',
    }, { status: 500 })
  }
}

function getActivityDescription(activity: any): string {
  const amount = activity.metadata && typeof activity.metadata === 'object' && 'amount' in activity.metadata 
    ? activity.metadata.amount 
    : undefined;
    
  switch (activity.type) {
    case 'GROUP_JOINED':
      return `Joined group ${activity.group?.name || 'Unknown'}`
    case 'GROUP_LEFT':
      return `Left group ${activity.group?.name || 'Unknown'}`
    case 'CONTRIBUTION_PAID':
      return `Paid contribution of ${amount} to ${activity.group?.name || 'Unknown'}`
    case 'CONTRIBUTION_DUE':
      return `Contribution due: ${amount} to ${activity.group?.name || 'Unknown'}`
    case 'GROUP_CREATED':
      return `Created group ${activity.group?.name || 'Unknown'}`
    case 'TRANSACTION_COMPLETED':
      return `Transaction completed: ${amount}`
    default:
      return activity.description || 'Activity recorded'
  }
} 