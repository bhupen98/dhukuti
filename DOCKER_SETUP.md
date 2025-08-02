# Docker Setup for Dhukuti

This guide will help you set up and run the Dhukuti application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed
- At least 4GB of available RAM

## Quick Start

### Development Environment

1. **Start the development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432

3. **Run database migrations:**
   ```bash
   # In a new terminal
   docker-compose -f docker-compose.dev.yml exec app-dev npm run db:push
   docker-compose -f docker-compose.dev.yml exec app-dev npm run db:seed
   ```

### Production Environment

1. **Start the production environment:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432

3. **Run database migrations:**
   ```bash
   # In a new terminal
   docker-compose exec app npm run db:push
   docker-compose exec app npm run db:seed
   ```

## Available Services

### Development Stack (`docker-compose.dev.yml`)
- **app-dev**: Next.js development server with hot reloading
- **postgres**: PostgreSQL 15 database

### Production Stack (`docker-compose.yml`)
- **app**: Optimized Next.js production build
- **postgres**: PostgreSQL 15 database
- **prisma-studio**: Database management interface (optional)

## Environment Variables

The following environment variables are automatically set in the Docker containers:

```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/dhukuti
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dhukuti
```

## Useful Commands

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f app-dev

# Run commands in the app container
docker-compose -f docker-compose.dev.yml exec app-dev npm run lint
docker-compose -f docker-compose.dev.yml exec app-dev npm run db:studio
```

### Production

```bash
# Start production environment
docker-compose up --build

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f app

# Run commands in the app container
docker-compose exec app npm run db:push
docker-compose exec app npm run db:seed
```

### Database Management

```bash
# Access Prisma Studio (development)
docker-compose -f docker-compose.dev.yml exec app-dev npm run db:studio

# Access Prisma Studio (production)
docker-compose --profile tools up prisma-studio

# Run database migrations
docker-compose exec app npm run db:push

# Seed the database
docker-compose exec app npm run db:seed

# Reset the database
docker-compose exec app npm run db:reset
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :3000
   
   # Kill the process or change the port in docker-compose files
   ```

2. **Database connection issues:**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps
   
   # Check database logs
   docker-compose logs postgres
   ```

3. **Build failures:**
   ```bash
   # Clean up and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

4. **Permission issues:**
   ```bash
   # On Linux/Mac, you might need to fix permissions
   sudo chown -R $USER:$USER .
   ```

### Performance Optimization

1. **Increase Docker resources:**
   - Open Docker Desktop
   - Go to Settings > Resources
   - Increase memory to at least 4GB
   - Increase CPU to at least 2 cores

2. **Use Docker volumes for better performance:**
   ```bash
   # The docker-compose files already include optimized volumes
   ```

## Security Considerations

1. **Change default passwords:**
   - Update `POSTGRES_PASSWORD` in docker-compose files
   - Update `NEXTAUTH_SECRET` with a secure random string

2. **Use environment files:**
   ```bash
   # Create .env file for sensitive data
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Network security:**
   - The containers are isolated in their own network
   - Only necessary ports are exposed

## Deployment

### Local Production Testing

```bash
# Build and run production version locally
docker-compose up --build

# Test the application
curl http://localhost:3000
```

### Cloud Deployment

1. **Build the production image:**
   ```bash
   docker build -t dhukuti:latest .
   ```

2. **Push to registry:**
   ```bash
   docker tag dhukuti:latest your-registry/dhukuti:latest
   docker push your-registry/dhukuti:latest
   ```

3. **Deploy using your preferred platform:**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## Monitoring

### Health Checks

The PostgreSQL service includes health checks to ensure the database is ready before starting the application.

### Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
```

## Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Remove images
docker rmi dhukuti-app

# Clean up everything
docker system prune -a
```

## Support

If you encounter any issues:

1. Check the logs: `docker-compose logs`
2. Verify Docker is running: `docker --version`
3. Check available resources in Docker Desktop
4. Review the troubleshooting section above 