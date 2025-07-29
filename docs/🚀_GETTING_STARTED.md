# 🚀 Getting Started with Dhukuti

Welcome to the Dhukuti development environment setup guide. This document will help you get up and running with the project quickly and efficiently.

## 📋 **Table of Contents**
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Project Installation](#project-installation)
- [Database Setup](#database-setup)
- [Development Server](#development-server)
- [Testing Setup](#testing-setup)
- [Common Issues](#common-issues)
- [Next Steps](#next-steps)

---

## ✅ **Prerequisites**

### **System Requirements**
| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Node.js** | 18.0.0+ | JavaScript runtime |
| **npm** | 9.0.0+ | Package manager |
| **Git** | 2.0.0+ | Version control |
| **PostgreSQL** | 13.0+ | Database |
| **Code Editor** | VS Code recommended | Development environment |

### **Required Software**
- **Node.js & npm**: [Download here](https://nodejs.org/)
- **Git**: [Download here](https://git-scm.com/)
- **PostgreSQL**: [Download here](https://www.postgresql.org/download/)
- **VS Code**: [Download here](https://code.visualstudio.com/)

### **Optional Tools**
- **Docker**: For containerized development
- **Postman**: For API testing
- **pgAdmin**: For database management

---

## 🛠️ **Environment Setup**

### **1. Clone the Repository**
```bash
# Clone the repository
git clone https://github.com/your-org/dhukuti.git

# Navigate to project directory
cd dhukuti

# Check current branch
git branch
```

### **2. Install Dependencies**
```bash
# Install Node.js dependencies
npm install

# Verify installation
npm list --depth=0
```

### **3. Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### **Required Environment Variables**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dhukuti"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin Access
ADMIN_ACCESS_TOKEN="DHUKUTI_ADMIN_2024"

# Optional: Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🗄️ **Database Setup**

### **1. PostgreSQL Installation**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Download and install from https://www.postgresql.org/download/windows/
```

### **2. Database Creation**
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE dhukuti;
CREATE USER dhukuti_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dhukuti TO dhukuti_user;
\q
```

### **3. Prisma Setup**
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with initial data
npx prisma db seed
```

### **4. Verify Database Connection**
```bash
# Open Prisma Studio
npx prisma studio

# Or check connection via CLI
npx prisma db pull
```

---

## 🚀 **Development Server**

### **1. Start Development Server**
```bash
# Start the development server
npm run dev

# Server will be available at http://localhost:3000
```

### **2. Verify Installation**
- Open [http://localhost:3000](http://localhost:3000)
- You should see the Dhukuti homepage
- Check that all features are working

### **3. Admin Access**
- Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
- Use the admin access token: `DHUKUTI_ADMIN_2024`
- You should have full admin access

---

## 🧪 **Testing Setup**

### **1. Install Testing Dependencies**
```bash
# Install testing libraries
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Install Playwright for E2E testing
npm install --save-dev @playwright/test
```

### **2. Configure Testing**
```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

### **3. Testing Guidelines**
- Write tests for all new features
- Maintain 90%+ code coverage
- Test both happy path and error scenarios
- Use descriptive test names

---

## 🔧 **Development Workflow**

### **1. Git Workflow**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create pull request
# Merge after review
```

### **2. Code Quality**
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### **3. Database Changes**
```bash
# Make schema changes in prisma/schema.prisma
# Generate migration
npx prisma migrate dev --name your-migration-name

# Apply to database
npx prisma db push

# Update Prisma client
npx prisma generate
```

---

## 🚨 **Common Issues**

### **Database Connection Issues**
```bash
# Check PostgreSQL service
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Check connection string
echo $DATABASE_URL
```

### **Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### **Prisma Issues**
```bash
# Reset Prisma
npx prisma migrate reset

# Regenerate client
npx prisma generate

# Check schema
npx prisma validate
```

### **Node Modules Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 **Next Steps**

### **1. Explore the Codebase**
- Review [COMPONENT_STRUCTURE.md](COMPONENT_STRUCTURE.md)
- Check [PROJECT_ORGANIZATION.md](PROJECT_ORGANIZATION.md)
- Read [API_REFERENCE.md](API_REFERENCE.md)

### **2. Start Development**
- Check [TODO/README.md](TODO/README.md) for current tasks
- Pick a phase from [TODO/](TODO/) directory
- Follow development guidelines

### **3. Learn the Platform**
- Read [USER_GUIDE.md](USER_GUIDE.md) to understand features
- Test all functionality as a user
- Explore admin features

### **4. Contribute**
- Review [REFACTORING.md](REFACTORING.md) for code standards
- Check [IDEA_REQUESTS_BRAINSTORM.md](IDEA_REQUESTS_BRAINSTORM.md) for ideas
- Follow team guidelines

---

## 🆘 **Getting Help**

### **📧 Support Channels**
- **Development Issues**: dev@dhukuti.com
- **Documentation Issues**: docs@dhukuti.com
- **General Support**: support@dhukuti.com

### **📖 Resources**
- **Project Documentation**: [docs/](docs/)
- **API Reference**: [API_REFERENCE.md](API_REFERENCE.md)
- **Architecture Guide**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

### **🐛 Bug Reports**
- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide error logs and screenshots
- Specify environment details

---

**🎯 Ready to start developing?** Check out the [TODO/](TODO/) directory for current development tasks!

**📅 Last Updated**: December 2024  
**🔄 Version**: 2.0.0  
**👥 Maintained By**: Dhukuti Development Team 