import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types'
import bcrypt from 'bcryptjs'

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
    const { currentPassword, newPassword, confirmPassword } = body

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'All fields are required',
      }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'New passwords do not match',
      }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'New password must be at least 6 characters long',
      }, { status: 400 })
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true }
    })

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found',
      }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Current password is incorrect',
      }, { status: 400 })
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedNewPassword }
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to change password',
    }, { status: 500 })
  }
} 