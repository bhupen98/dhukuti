import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In production, this should be stored in environment variables
const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN || "DHUKUTI_ADMIN_2024";
const MAX_ATTEMPTS = parseInt(process.env.ADMIN_MAX_LOGIN_ATTEMPTS || "5");
const LOCKOUT_DURATION = parseInt(process.env.ADMIN_LOCKOUT_DURATION || "900"); // 15 minutes

// Simple in-memory store for rate limiting (use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!token) {
      await logAdminAttempt(clientIP, userAgent, 'MISSING_TOKEN', false);
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // Check rate limiting
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      await logAdminAttempt(clientIP, userAgent, 'RATE_LIMITED', false);
      return NextResponse.json(
        { 
          success: false, 
          error: "Too many attempts. Please try again later.",
          retryAfter: rateLimitResult.retryAfter 
        },
        { status: 429 }
      );
    }

    if (token !== ADMIN_ACCESS_TOKEN) {
      // Increment failed attempts
      incrementFailedAttempts(clientIP);
      await logAdminAttempt(clientIP, userAgent, 'INVALID_TOKEN', false);
      
      return NextResponse.json(
        { success: false, error: "Invalid access token" },
        { status: 401 }
      );
    }

    // Successful login - reset attempts
    loginAttempts.delete(clientIP);
    await logAdminAttempt(clientIP, userAgent, 'SUCCESS', true);

    return NextResponse.json(
      { 
        success: true, 
        message: "Token verified successfully",
        sessionTimeout: parseInt(process.env.ADMIN_SESSION_TIMEOUT || "7200") // 2 hours
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin token verification error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const attempts = loginAttempts.get(clientIP);
  
  if (!attempts) {
    return { allowed: true };
  }

  // Check if account is locked
  if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
    const retryAfter = Math.ceil((attempts.lockedUntil - Date.now()) / 1000);
    return { allowed: false, retryAfter };
  }

  // Reset if lockout period has passed
  if (attempts.lockedUntil && Date.now() >= attempts.lockedUntil) {
    loginAttempts.delete(clientIP);
    return { allowed: true };
  }

  // Check if max attempts reached
  if (attempts.count >= MAX_ATTEMPTS) {
    const lockedUntil = Date.now() + (LOCKOUT_DURATION * 1000);
    attempts.lockedUntil = lockedUntil;
    loginAttempts.set(clientIP, attempts);
    
    const retryAfter = LOCKOUT_DURATION;
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

function incrementFailedAttempts(clientIP: string) {
  const attempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: Date.now() };
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  loginAttempts.set(clientIP, attempts);
}

async function logAdminAttempt(clientIP: string, userAgent: string, action: string, success: boolean) {
  try {
    // In production, you'd want to store this in a proper audit log table
    console.log(`[ADMIN_AUDIT] ${new Date().toISOString()} - IP: ${clientIP}, Action: ${action}, Success: ${success}, UA: ${userAgent}`);
    
    // You could also store in database for proper audit trails
    // await prisma.adminAuditLog.create({
    //   data: {
    //     ipAddress: clientIP,
    //     userAgent,
    //     action,
    //     success,
    //     timestamp: new Date(),
    //   }
    // });
  } catch (error) {
    console.error('Failed to log admin attempt:', error);
  }
} 