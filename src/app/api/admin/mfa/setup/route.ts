import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In production, install: npm install speakeasy qrcode
// For now, we'll create a simple MFA setup structure

export async function POST(request: NextRequest) {
  try {
    const { adminToken } = await request.json();
    
    // Verify admin token first
    const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN || "DHUKUTI_ADMIN_2024";
    if (adminToken !== ADMIN_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: "Invalid admin token" },
        { status: 401 }
      );
    }

    // Generate a simple MFA secret (in production, use speakeasy.generateSecret())
    const mfaSecret = generateMFASecret();
    const issuer = process.env.MFA_ISSUER || "Dhukuti Admin";
    const accountName = "admin@dhukuti.com";

    // Create QR code URL for authenticator apps
    const qrCodeUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${mfaSecret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

    // Store MFA secret (in production, encrypt this)
    // For now, we'll store in environment variable
    process.env.ADMIN_MFA_SECRET = mfaSecret;

    return NextResponse.json({
      success: true,
      mfaSecret,
      qrCodeUrl,
      issuer,
      accountName,
      instructions: [
        "1. Install Google Authenticator or Authy on your phone",
        "2. Scan the QR code or manually enter the secret",
        "3. Enter the 6-digit code when prompted for admin access",
        "4. Keep your backup codes safe for account recovery"
      ],
      backupCodes: generateBackupCodes()
    });

  } catch (error) {
    console.error('MFA setup error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to setup MFA" },
      { status: 500 }
    );
  }
}

function generateMFASecret(): string {
  // Generate a 32-character base32 secret
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

function generateBackupCodes(): string[] {
  // Generate 10 backup codes for account recovery
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    codes.push(code);
  }
  return codes;
} 