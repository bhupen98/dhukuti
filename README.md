# 💰 Dhukuti - Traditional Nepali Rotating Savings Platform

**Modernize traditional Dhukuti groups with digital automation for the Nepalese community in Australia.**

A comprehensive platform for managing traditional Nepali rotating savings and credit associations (Dhukuti) with modern digital tools, secure transactions, and community features specifically designed for the Nepalese community in Australia.

## 🚀 Live Features

### 🎯 **Core Dhukuti Management**

- **👥 Group Management**: Create and manage Dhukuti groups with member roles
- **💸 Contribution Tracking**: Automated contribution scheduling and payment tracking
- **📊 Financial Analytics**: Real-time balance tracking and financial insights
- **🔄 Cycle Management**: Automated rotation cycles with payout distribution
- **📱 Member Communication**: Built-in messaging and activity notifications

### 🛡️ **Security & Trust**

- **NextAuth.js Authentication**: Secure user authentication with credentials
- **Role-based Access Control**: User, Admin, and Moderator roles
- **Transaction History**: Complete audit trail for all financial activities
- **Data Protection**: Secure data handling with Prisma ORM
- **Activity Logging**: Comprehensive activity tracking for transparency
- **Admin Security**: Token-based admin access with rate limiting and audit logging

### 👥 **User Management**

- **Member Profiles**: Detailed user profiles with reputation tracking
- **Group Membership**: Easy group joining and management
- **Reputation System**: Track member reliability and payment history
- **Emergency Contacts**: Safety features for group members
- **Verification System**: User verification for trust building
- **Profile Management**: Edit profile, change password, upload avatar

### 📊 **Advanced Analytics**

- **Group Performance**: Track group health and member participation
- **Financial Reports**: Detailed contribution and payout reports
- **Member Statistics**: Individual member performance metrics
- **Activity Feed**: Real-time updates on group activities
- **Dashboard Insights**: Comprehensive overview of all groups

### 💬 **Community Features**

- **Group Chat**: Built-in messaging for group communication
- **Activity Feed**: Real-time updates on contributions and activities
- **Notifications**: Automated reminders for due payments
- **Event Management**: Schedule and manage group meetings
- **Document Sharing**: Share important group documents

### 🎫 **Event Management**

- **Event Creation**: Create and manage events with ticket sales
- **Ticket Management**: Handle ticket purchases and distribution
- **Event Analytics**: Track event performance and attendance
- **Payment Integration**: Secure payment processing for tickets
- **Marketing Tools**: Promote events with built-in marketing features

### 🛡️ **Admin Dashboard**

- **Admin Authentication**: Secure token-based admin access
- **User Management**: Manage all platform users
- **Event Oversight**: Monitor and manage all events
- **Analytics Dashboard**: Platform-wide performance metrics
- **System Settings**: Configure platform settings
- **Security Overview**: Monitor login attempts and system health

## 🏗️ Architecture

### **Full-Stack Next.js Application**

```
src/
├── app/                    # App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── groups/           # Group management
│   ├── contributions/    # Contribution tracking
│   ├── events/          # Event management
│   ├── profile/          # User profile
│   ├── admin/            # Admin dashboard
│   ├── debug/            # Debug utilities
│   └── api/              # API routes
│       ├── auth/         # Authentication routes
│       ├── admin/        # Admin API routes
│       ├── groups/       # Group management
│       ├── events/       # Event management
│       └── user/         # User profile & activities
├── components/
│   ├── features/         # Feature-specific components
│   │   ├── groups/       # Group management
│   │   ├── contributions/ # Contribution tracking
│   │   ├── events/       # Event management
│   │   ├── chat/         # Messaging system
│   │   ├── analytics/    # Analytics components
│   │   └── profile/      # Profile management
│   ├── common/           # Reusable UI components
│   ├── layout/           # Navigation components
│   ├── admin/            # Admin-specific components
│   └── providers/        # Context providers
├── lib/                  # Utilities, auth, config
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
└── types/                # TypeScript definitions
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker Desktop installed and running
- At least 4GB of available RAM

#### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhukuti
   ```

2. **Start the development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

3. **Access the application**
   - Application: http://localhost:3000
   - Database: localhost:5432

4. **Run database migrations (in a new terminal)**
   ```bash
   docker-compose -f docker-compose.dev.yml exec app-dev npm run db:push
   docker-compose -f docker-compose.dev.yml exec app-dev npm run db:seed
   ```

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

#### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhukuti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dhukuti"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Test Accounts

### Admin User
- **Email**: `admin@dhukuti.com`
- **Password**: `admin123`

### Regular Users
- **Email**: `ramesh.thapa@email.com`
- **Password**: `password123`
- **Email**: `sita.gurung@email.com`
- **Password**: `password123`
- **Email**: `bhupen.rai@email.com`
- **Password**: `password123`
- **Email**: `anjali.shrestha@email.com`
- **Password**: `password123`

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **NextAuth.js** - Authentication

### **Backend**
- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **bcryptjs** - Password hashing

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
dhukuti/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and configurations
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── docs/                # Documentation
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db push` - Push schema to database
- `npx prisma db seed` - Seed database with test data

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

## 🐳 Docker

### Development Environment

The project includes a complete Docker setup for easy development:

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

### Production Environment

```bash
# Start production environment
docker-compose up --build

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f app

# Run database migrations
docker-compose exec app npm run db:push
docker-compose exec app npm run db:seed
```

### Docker Services

- **PostgreSQL Database** (port 5432)
- **Next.js Application** (port 3000)
- **Prisma Studio** (port 5555, optional)

For detailed Docker documentation, see [DOCKER_SETUP.md](DOCKER_SETUP.md).

## 🚀 Deployment

### Docker Deployment

1. **Build the production image**
   ```bash
   docker build -t dhukuti:latest .
   ```

2. **Run with docker-compose**
   ```bash
   docker-compose up --build
   ```

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_ACCESS_TOKEN="your-admin-token"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nepalese Community in Australia** - For inspiration and cultural context
- **Next.js Team** - For the amazing framework
- **Prisma Team** - For the excellent ORM
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

For support, email support@dhukuti.com or create an issue in this repository.

---

**Built with ❤️ for the Nepalese community in Australia**
