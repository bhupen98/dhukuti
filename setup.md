# 🚀 Dhukuti Migration Setup Guide

This guide will help you migrate from the old Django + Next.js structure to the new unified Next.js + Prisma architecture.

## 📋 Prerequisites

1. **Node.js 18+** installed
2. **PostgreSQL** database set up
3. **Git** for version control

## 🔄 Migration Steps

### 1. Backup Current Data (Optional)

If you have important data in your current Django database:

```bash
# Export Django data (if needed)
cd backend
python manage.py dumpdata > backup.json
```

### 2. Set Up New Project Structure

The new project is now unified in a single Next.js application with Prisma:

```bash
# Install dependencies
npm install

# Install additional dependencies
npm install clsx tailwind-merge @auth/prisma-adapter
```

### 3. Configure Environment Variables

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your settings:
DATABASE_URL="postgresql://username:password@localhost:5432/dhukuti"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

## 🏗️ New Architecture Overview

### **Before (Django + Next.js)**
```
dhukuti/
├── backend/          # Django API
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
├── frontend/         # Next.js Frontend
│   ├── src/
│   ├── package.json
│   └── next.config.ts
└── README.md
```

### **After (Unified Next.js + Prisma)**
```
dhukuti/
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React Components
│   ├── lib/          # Utilities & Config
│   └── types/        # TypeScript Types
├── prisma/
│   ├── schema.prisma # Database Schema
│   └── seed.ts       # Sample Data
├── package.json      # Unified Dependencies
└── README.md
```

## 🔧 Key Changes

### **Database**
- **Before**: Django ORM with PostgreSQL
- **After**: Prisma ORM with PostgreSQL
- **Benefits**: Type-safe queries, better performance, modern tooling

### **Authentication**
- **Before**: Django JWT authentication
- **After**: NextAuth.js with Google OAuth
- **Benefits**: Easier setup, better security, social login

### **API Routes**
- **Before**: Django REST Framework endpoints
- **After**: Next.js API routes
- **Benefits**: Unified codebase, better TypeScript support

### **Frontend**
- **Before**: Separate Next.js frontend
- **After**: Integrated with API routes
- **Benefits**: Single codebase, better performance, easier deployment

## 📊 Database Schema

The new Prisma schema includes:

- **User**: Authentication, profile, reputation
- **Group**: Dhukuti group management
- **GroupMember**: Member relationships and roles
- **Contribution**: Payment tracking
- **Transaction**: Financial records
- **Activity**: Audit logging
- **Message**: Group communication

## 🚀 Deployment

### **Local Development**
```bash
npm run dev
```

### **Production (Vercel)**
```bash
npm run build
npm start
```

### **Database Management**
```bash
# View database in Prisma Studio
npm run db:studio

# Reset database
npm run db:reset

# Generate new migration
npm run db:migrate
```

## 🔍 Testing the Migration

1. **Visit**: http://localhost:3000
2. **Login**: Use Google OAuth
3. **Dashboard**: Should show sample data
4. **Groups**: Create and manage Dhukuti groups
5. **Activity**: View activity feed

## 🐛 Troubleshooting

### **Database Connection Issues**
```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### **Authentication Issues**
- Verify Google OAuth credentials
- Check NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set

### **Build Issues**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📈 Benefits of New Architecture

1. **Unified Codebase**: Single repository, easier maintenance
2. **Type Safety**: Full TypeScript support with Prisma
3. **Better Performance**: Server-side rendering with Next.js
4. **Modern Tooling**: Latest Next.js, React, and Prisma
5. **Easier Deployment**: Single application to deploy
6. **Better Developer Experience**: Hot reloading, better debugging

## 🎯 Next Steps

1. **Customize**: Modify the schema for your specific needs
2. **Add Features**: Implement additional Dhukuti features
3. **Deploy**: Deploy to Vercel or your preferred platform
4. **Monitor**: Set up analytics and monitoring

## 📞 Support

If you encounter issues during migration:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database is accessible
4. Review the Prisma schema for any issues

---

**Happy coding! 🚀** 