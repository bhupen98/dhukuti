import { NextRequest, NextResponse } from 'next/server';

// In production, this should be stored in environment variables
const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN || "DHUKUTI_ADMIN_2024";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    if (token !== ADMIN_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: "Invalid access token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Token verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 