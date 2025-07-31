import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Ensure admin user exists with correct role
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@dhukuti.com' },
      update: {
        role: 'ADMIN', // Use the correct enum value
        password: hashedPassword, // Update password if needed
      },
      create: {
        email: 'admin@dhukuti.com',
        name: 'Dhukuti Administrator',
        password: hashedPassword, // Include hashed password
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        phoneNumber: '+61412345678',
        address: 'Sydney, NSW',
        emergencyContact: '+61412345679',
        isVerified: true,
        reputation: 100,
        totalEarnings: 0,
        totalContributions: 0,
        role: 'ADMIN', // Use the correct enum value
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Admin user ensured",
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error ensuring admin user:', error);
    return NextResponse.json(
      { success: false, error: "Failed to ensure admin user" },
      { status: 500 }
    );
  }
} 