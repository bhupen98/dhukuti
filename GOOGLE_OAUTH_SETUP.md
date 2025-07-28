# 🔐 Google OAuth Setup Guide for Dhukuti

This guide will help you set up Google OAuth authentication for your Dhukuti application.

## 📋 Prerequisites

- Google Cloud Console account
- PostgreSQL database running
- Next.js application ready

## 🚀 Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## 🔧 Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - **App name**: Dhukuti
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email addresses for testing)

## 🔑 Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Set the following:
   - **Name**: Dhukuti Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Click **Create**
6. **Save the Client ID and Client Secret** - you'll need these for the environment variables

## ⚙️ Step 4: Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dhukuti"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dhukuti"
```

### 🔐 Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## 🗄️ Step 5: Database Setup

1. Make sure your PostgreSQL database is running
2. Run the database migrations:

```bash
npm run db:push
```

3. Generate Prisma client:

```bash
npm run db:generate
```

## 🧪 Step 6: Test the Setup

1. Start your development server:

```bash
npm run dev
```

2. Navigate to `http://localhost:3000/login`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your dashboard

## 🔍 Troubleshooting

### Common Issues:

1. **"client_id is required" error**
   - Check that `GOOGLE_CLIENT_ID` is set correctly in your `.env` file
   - Restart your development server after changing environment variables

2. **"redirect_uri_mismatch" error**
   - Verify that the redirect URI in Google Cloud Console matches exactly
   - Make sure there are no trailing slashes or extra spaces

3. **"invalid_client" error**
   - Check that `GOOGLE_CLIENT_SECRET` is set correctly
   - Ensure the client ID and secret match

4. **Database connection issues**
   - Verify your `DATABASE_URL` is correct
   - Make sure PostgreSQL is running
   - Check that the database exists

### Debug Steps:

1. Check browser console for errors
2. Check server logs for authentication errors
3. Verify all environment variables are loaded correctly
4. Test database connection separately

## 🚀 Production Deployment

For production deployment:

1. Update the OAuth consent screen to **Production**
2. Add your production domain to authorized origins and redirect URIs
3. Update environment variables with production URLs
4. Use a strong, unique `NEXTAUTH_SECRET`
5. Ensure HTTPS is enabled

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Prisma Documentation](https://www.prisma.io/docs/)

## ✅ Verification Checklist

- [ ] Google Cloud Project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Environment variables set correctly
- [ ] Database migrations run
- [ ] Application starts without errors
- [ ] Google OAuth login works
- [ ] User data is saved to database
- [ ] Dashboard loads after authentication

---

**Note**: Keep your Google OAuth credentials secure and never commit them to version control. Use environment variables and `.env` files (which should be in `.gitignore`). 