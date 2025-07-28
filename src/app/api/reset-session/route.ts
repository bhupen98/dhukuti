import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userType } = await request.json();
    
    let credentials;
    if (userType === 'demo') {
      credentials = {
        email: 'demo@example.com',
        password: 'demo123'
      };
    } else if (userType === 'admin') {
      credentials = {
        email: 'admin@dhukuti.com',
        password: 'admin123'
      };
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Session reset to ${userType} user`,
      credentials 
    });
  } catch (error) {
    console.error('Error resetting session:', error);
    return NextResponse.json({ error: 'Failed to reset session' }, { status: 500 });
  }
} 