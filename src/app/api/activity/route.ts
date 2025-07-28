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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const groupId = searchParams.get('groupId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    
    if (type && type !== 'All') {
      where.type = type
    }
    
    if (groupId) {
      where.groupId = groupId
    } else {
      // Get activities from user's groups
      const userGroups = await prisma.group.findMany({
        where: {
          OR: [
            { ownerId: session.user.id },
            { members: { some: { userId: session.user.id } } }
          ]
        },
        select: { id: true }
      })
      
      where.groupId = {
        in: userGroups.map(g => g.id)
      }
    }

    const activities = await prisma.activity.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    // Transform activities to match frontend expectations
    const transformedActivities = activities.map((activity) => ({
      id: activity.id,
      type: activity.type,
      title: activity.title,
      subtitle: activity.description || '',
      timestamp: activity.createdAt.toISOString(),
      img: activity.user?.avatar || generateAvatarUrl(activity.user?.name || 'User'),
      href: activity.groupId ? `/dashboard/groups/${activity.groupId}` : '/dashboard',
      user: activity.user,
      group: activity.group,
    }))

    return NextResponse.json<ApiResponse>({
      success: true,
      data: transformedActivities,
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch activities',
    }, { status: 500 })
  }
}

function generateAvatarUrl(name: string): string {
  return `https://source.boringavatars.com/beam/120/${encodeURIComponent(name)}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`
} 