import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'No file uploaded',
      }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid file type. Please upload JPEG, PNG, or WebP images only.',
      }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'File too large. Please upload an image smaller than 5MB.',
      }, { status: 400 })
    }

    // For now, we'll use a placeholder URL
    // In production, you'd upload to a service like AWS S3, Cloudinary, etc.
    const avatarUrl = `https://source.boringavatars.com/beam/120/${session.user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`

    // Update user's avatar in database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        avatar: avatarUrl,
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
      message: 'Avatar updated successfully',
    })
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to upload avatar',
    }, { status: 500 })
  }
} 