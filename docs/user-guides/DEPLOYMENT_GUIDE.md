# 🚀 Deployment Guide

## Overview

This guide covers deploying the Dhukuti platform to various hosting platforms. The application is built with Next.js and can be deployed to any platform that supports Node.js applications.

## Prerequisites

Before deploying, ensure you have:

- ✅ **Database Setup**: PostgreSQL database (local or cloud)
- ✅ **Environment Variables**: All required environment variables configured
- ✅ **Domain/Subdomain**: (Optional) Custom domain for your application
- ✅ **SSL Certificate**: (Recommended) For secure HTTPS connections

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database_name"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Admin Access
ADMIN_ACCESS_TOKEN="your-admin-access-token"

# Optional: Google OAuth (if implemented)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications.

#### Setup Steps:

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Configure Environment Variables:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all environment variables under "Environment Variables"

5. **Database Setup:**
   - Use Vercel Postgres or external PostgreSQL service
   - Update `DATABASE_URL` in environment variables
   - Run database migrations: `npx prisma db push`

#### Vercel Configuration

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### 2. Railway

Railway provides easy deployment with built-in PostgreSQL support.

#### Setup Steps:

1. **Connect Repository:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the repository

2. **Add PostgreSQL:**
   - Click "New Service"
   - Select "PostgreSQL"
   - Copy the connection string

3. **Configure Environment Variables:**
   - Add all required environment variables
   - Set `DATABASE_URL` to the PostgreSQL connection string

4. **Deploy:**
   - Railway will automatically deploy on push to main branch
   - Monitor the deployment logs

### 3. Render

Render provides free hosting with PostgreSQL support.

#### Setup Steps:

1. **Create Account:**
   - Sign up at [Render.com](https://render.com)
   - Connect your GitHub account

2. **Create Web Service:**
   - Click "New Web Service"
   - Connect your repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

3. **Add PostgreSQL:**
   - Create a new PostgreSQL service
   - Copy the connection string
   - Add to environment variables

4. **Configure Environment Variables:**
   - Add all required environment variables
   - Set `DATABASE_URL` to the PostgreSQL connection string

### 4. DigitalOcean App Platform

DigitalOcean provides scalable hosting with managed databases.

#### Setup Steps:

1. **Create App:**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select the repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Run command: `npm start`
   - Output directory: `.next`

3. **Add Database:**
   - Create a managed PostgreSQL database
   - Copy the connection string
   - Add to environment variables

4. **Set Environment Variables:**
   - Add all required environment variables
   - Set `DATABASE_URL` to the PostgreSQL connection string

### 5. AWS (Advanced)

For production deployments on AWS.

#### Setup Steps:

1. **EC2 Instance:**

   ```bash
   # Install Node.js and PM2
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

2. **Clone and Setup:**

   ```bash
   git clone your-repository
   cd dhukuti
   npm install
   npm run build
   ```

3. **Environment Variables:**

   ```bash
   # Create .env.local file
   nano .env.local
   # Add all environment variables
   ```

4. **Start with PM2:**

   ```bash
   pm2 start npm --name "dhukuti" -- start
   pm2 startup
   pm2 save
   ```

5. **Nginx Configuration:**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Setup

### PostgreSQL Setup

1. **Create Database:**

   ```sql
   CREATE DATABASE dhukuti;
   CREATE USER dhukuti_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE dhukuti TO dhukuti_user;
   ```

2. **Run Migrations:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

### Database Providers

#### Vercel Postgres

- Built-in with Vercel
- Automatic backups
- Easy scaling

#### Supabase

- Free tier available
- Built-in authentication
- Real-time features

#### Railway Postgres

- Easy setup
- Automatic backups
- Good for development

#### PlanetScale

- MySQL compatible
- Serverless
- Branch-based development

## SSL/HTTPS Setup

### Vercel

- Automatic SSL certificates
- No additional configuration needed

### Railway

- Automatic SSL certificates
- Custom domains supported

### Render

- Automatic SSL certificates
- Custom domains supported

### Manual Setup (Nginx + Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logs

### Vercel

- Built-in analytics
- Function logs
- Performance monitoring

### Railway

- Real-time logs
- Resource monitoring
- Error tracking

### Render

- Log streaming
- Health checks
- Performance monitoring

### Custom Monitoring

```bash
# PM2 monitoring
pm2 monit

# Log monitoring
pm2 logs dhukuti

# Health check endpoint
curl https://your-domain.com/api/health
```

## Performance Optimization

### Build Optimization

```bash
# Optimize build
npm run build

# Analyze bundle
npm run analyze
```

### Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_contributions_user_id ON contributions(user_id);
CREATE INDEX idx_contributions_group_id ON contributions(group_id);
CREATE INDEX idx_activities_user_id ON activities(user_id);
```

### Caching

```javascript
// Add caching headers
export async function GET(request: NextRequest) {
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return response;
}
```

## Backup Strategy

### Database Backups

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
gzip backup_$DATE.sql
```

### File Backups

```bash
# Backup uploads and assets
tar -czf assets_backup_$DATE.tar.gz ./public/uploads
```

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### Database Connection Issues

```bash
# Test database connection
npx prisma db pull
npx prisma generate
```

#### Environment Variables

```bash
# Verify environment variables
echo $DATABASE_URL
echo $NEXTAUTH_SECRET
```

#### Port Issues

```bash
# Check if port is in use
lsof -i :3000
netstat -tulpn | grep :3000
```

### Log Analysis

```bash
# View application logs
pm2 logs dhukuti --lines 100

# View nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Security Checklist

- ✅ **Environment Variables**: All secrets properly configured
- ✅ **HTTPS**: SSL certificates installed
- ✅ **Database**: Strong passwords and limited access
- ✅ **Firewall**: Port 80/443 only open
- ✅ **Updates**: Regular security updates
- ✅ **Backups**: Automated backup strategy
- ✅ **Monitoring**: Error tracking and alerts

## Cost Optimization

### Vercel

- Free tier: 100GB bandwidth/month
- Pro: $20/month for unlimited bandwidth

### Railway

- Free tier: $5 credit/month
- Pay-as-you-go pricing

### Render

- Free tier: 750 hours/month
- Paid: $7/month for always-on

### AWS

- EC2: ~$10-20/month for t3.small
- RDS: ~$15/month for db.t3.micro

---

**Last Updated**: December 2024
**Version**: 1.0.0
