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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        phoneNumber: true,
        address: true,
        emergencyContact: true,
        isVerified: true,
        reputation: true,
        totalEarnings: true,
        totalContributions: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found',
      }, { status: 404 })
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch user profile',
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    const body = await request.json()
    const { name, phoneNumber, address, emergencyContact } = body

    // Validate input
    if (name && typeof name !== 'string') {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Name must be a string',
      }, { status: 400 })
    }

    if (phoneNumber && typeof phoneNumber !== 'string') {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Phone number must be a string',
      }, { status: 400 })
    }

    if (address && typeof address !== 'string') {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Address must be a string',
      }, { status: 400 })
    }

    if (emergencyContact && typeof emergencyContact !== 'string') {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Emergency contact must be a string',
      }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name || undefined,
        phoneNumber: phoneNumber || undefined,
        address: address || undefined,
        emergencyContact: emergencyContact || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        phoneNumber: true,
        address: true,
        emergencyContact: true,
        isVerified: true,
        reputation: true,
        totalEarnings: true,
        totalContributions: true,
        createdAt: true,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully',
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to update user profile',
    }, { status: 500 })
  }
} 