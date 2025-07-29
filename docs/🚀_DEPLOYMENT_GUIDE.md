# 🚀 Deployment Guide - Dhukuti Platform

## 📋 **Overview**

This guide covers deploying the Dhukuti platform to various environments, from development to production. The platform is designed to be deployed on modern cloud platforms with PostgreSQL database support.

## 🎯 **Supported Platforms**

### **🌐 Cloud Platforms**
- **Vercel** (Recommended) - Optimized for Next.js
- **Netlify** - Alternative hosting with good Next.js support
- **Railway** - Full-stack deployment with database
- **Heroku** - Traditional platform with PostgreSQL support
- **AWS** - Enterprise-grade deployment options

### **🏠 Self-Hosting**
- **Docker** - Containerized deployment
- **VPS** - Virtual private server deployment
- **Local Server** - On-premises deployment

---

## 🚀 **Quick Deployment (Vercel - Recommended)**

### **Prerequisites**
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, or external)
- GitHub repository with your code

### **Step 1: Database Setup**
```bash
# Option 1: Vercel Postgres (Recommended)
# Create in Vercel dashboard under Storage tab

# Option 2: Supabase
# Create at https://supabase.com
# Get connection string from Settings > Database

# Option 3: External PostgreSQL
# Use any PostgreSQL provider (Railway, PlanetScale, etc.)
```

### **Step 2: Environment Variables**
Set these in your Vercel project settings:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_APP_NAME="Dhukuti"

# Admin Access
ADMIN_ACCESS_TOKEN="your-admin-token"

# Optional: Google OAuth (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### **Step 3: Deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to connect to your Vercel account
# Select your project or create a new one
```

### **Step 4: Database Migration**
```bash
# Run database migrations
vercel env pull .env.local
npx prisma db push
npx prisma generate

# Seed the database (optional)
npm run seed
```

---

## 🐳 **Docker Deployment**

### **Dockerfile**
```dockerfile
# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### **Docker Compose**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/dhukuti
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
      - NEXT_PUBLIC_APP_NAME=Dhukuti
      - ADMIN_ACCESS_TOKEN=your-admin-token
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=dhukuti
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### **Deploy with Docker**
```bash
# Build and run with Docker Compose
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma db push
docker-compose exec app npx prisma generate

# Seed database (optional)
docker-compose exec app npm run seed
```

---

## 🌐 **Production Deployment Checklist**

### **✅ Pre-Deployment**
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] SSL certificates configured
- [ ] Domain DNS configured
- [ ] Backup strategy implemented

### **✅ Security**
- [ ] Strong NEXTAUTH_SECRET generated
- [ ] Admin access token secured
- [ ] Database credentials protected
- [ ] HTTPS enforced
- [ ] Security headers configured

### **✅ Performance**
- [ ] Database indexes optimized
- [ ] Image optimization enabled
- [ ] CDN configured (if applicable)
- [ ] Caching strategy implemented
- [ ] Monitoring tools set up

### **✅ Monitoring**
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Performance monitoring
- [ ] Database monitoring
- [ ] Uptime monitoring
- [ ] Log aggregation

---

## 🔧 **Environment-Specific Configurations**

### **Development Environment**
```env
NODE_ENV=development
DATABASE_URL="postgresql://localhost:5432/dhukuti_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dhukuti Dev"
ADMIN_ACCESS_TOKEN="dev-admin-token"
```

### **Staging Environment**
```env
NODE_ENV=staging
DATABASE_URL="postgresql://staging-db-url"
NEXTAUTH_URL="https://staging.dhukuti.com"
NEXTAUTH_SECRET="staging-secret-key"
NEXT_PUBLIC_APP_URL="https://staging.dhukuti.com"
NEXT_PUBLIC_APP_NAME="Dhukuti Staging"
ADMIN_ACCESS_TOKEN="staging-admin-token"
```

### **Production Environment**
```env
NODE_ENV=production
DATABASE_URL="postgresql://production-db-url"
NEXTAUTH_URL="https://dhukuti.com"
NEXTAUTH_SECRET="production-secret-key"
NEXT_PUBLIC_APP_URL="https://dhukuti.com"
NEXT_PUBLIC_APP_NAME="Dhukuti"
ADMIN_ACCESS_TOKEN="production-admin-token"
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Database Connection Errors**
```bash
# Check database connectivity
npx prisma db pull

# Verify environment variables
echo $DATABASE_URL

# Test connection
npx prisma studio
```

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### **Environment Variable Issues**
```bash
# Verify all required variables are set
npm run env:check

# Test environment loading
node -e "console.log(process.env.DATABASE_URL)"
```

### **Performance Issues**
- Check database query performance
- Monitor memory usage
- Review image optimization settings
- Verify CDN configuration

### **Security Issues**
- Rotate secrets regularly
- Monitor for suspicious activity
- Keep dependencies updated
- Review access logs

---

## 📊 **Post-Deployment Verification**

### **✅ Functionality Tests**
- [ ] User registration and login
- [ ] Dashboard loading
- [ ] Group creation and management
- [ ] Event management
- [ ] Admin dashboard access
- [ ] File uploads (if applicable)

### **✅ Performance Tests**
- [ ] Page load times
- [ ] Database query performance
- [ ] API response times
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### **✅ Security Tests**
- [ ] Authentication flow
- [ ] Authorization checks
- [ ] Data validation
- [ ] XSS protection
- [ ] CSRF protection

---

## 🔄 **Continuous Deployment**

### **GitHub Actions Workflow**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📞 **Support & Resources**

### **🔗 Useful Links**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [PostgreSQL Hosting Options](https://www.postgresql.org/support/professional_hosting/)

### **📧 Contact**
- **Deployment Issues**: deployment@dhukuti.com
- **Technical Support**: support@dhukuti.com
- **Documentation**: docs@dhukuti.com

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Platform**: Dhukuti Financial Management System