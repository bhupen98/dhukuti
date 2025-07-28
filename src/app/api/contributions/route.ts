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
    const groupId = searchParams.get('groupId')

    const where: any = {
      userId: session.user.id,
    }
    
    if (status) {
      where.status = status
    }
    
    if (groupId) {
      where.groupId = groupId
    }

    const contributions = await prisma.contribution.findMany({
      where,
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: contributions,
    })
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch contributions',
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
    const { groupId, amount, dueDate, cycleNumber, notes } = body

    if (!groupId || !amount || !dueDate || !cycleNumber) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 })
    }

    const contribution = await prisma.contribution.create({
      data: {
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        cycleNumber: parseInt(cycleNumber),
        notes,
        userId: session.user.id,
        groupId,
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'CONTRIBUTION_PAID',
        title: `Contribution created for ${contribution.group.name}`,
        description: `Cycle ${cycleNumber} contribution of ${amount}`,
        userId: session.user.id,
        groupId,
        metadata: {
          amount,
          cycleNumber,
          contributionId: contribution.id,
        },
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: contribution,
      message: 'Contribution created successfully',
    })
  } catch (error) {
    console.error('Error creating contribution:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create contribution',
    }, { status: 500 })
  }
} 