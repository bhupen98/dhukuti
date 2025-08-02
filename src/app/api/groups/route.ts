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
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (userId) {
      where.OR = [
        { ownerId: userId },
        { members: { some: { userId } } }
      ]
    } else {
      // Default to user's groups
      where.OR = [
        { ownerId: session.user.id },
        { members: { some: { userId: session.user.id } } }
      ]
    }

    const groups = await prisma.group.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            contributions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: groups,
    })
  } catch (error) {
    console.error('Error fetching groups:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch groups',
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, maxMembers, contributionAmount, cycleDuration, startDate, metadata } = body

    if (!name || !maxMembers || !contributionAmount || !cycleDuration) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 })
    }

    const group = await prisma.group.create({
      data: {
        name,
        description,
        maxMembers: parseInt(maxMembers),
        contributionAmount: parseFloat(contributionAmount),
        cycleDuration: parseInt(cycleDuration),
        startDate: startDate ? new Date(startDate) : null,
        metadata,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER',
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'GROUP_CREATED',
        title: `New group "${name}" created`,
        description: `Group created by ${session.user.name}`,
        userId: session.user.id,
        groupId: group.id,
        metadata: {
          groupName: name,
          maxMembers,
          contributionAmount,
        },
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: group,
      message: 'Group created successfully',
    })
  } catch (error) {
    console.error('Error creating group:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create group',
    }, { status: 500 })
  }
} 