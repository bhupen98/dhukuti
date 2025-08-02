# 💰 Dhukuti - Traditional Nepali Rotating Savings Platform

**Modernize traditional Dhukuti groups with digital automation for the Nepalese community in Australia.**

A comprehensive platform for managing traditional Nepali rotating savings and credit associations (Dhukuti) with modern digital tools, secure transactions, and community features.

## 🚀 Key Features

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

### 👥 **User Management**
- **Member Profiles**: Detailed user profiles with reputation tracking
- **Group Membership**: Easy group joining and management
- **Reputation System**: Track member reliability and payment history
- **Verification System**: User verification for trust building
- **Profile Management**: Edit profile, change password, upload avatar

### 📊 **Advanced Analytics**
- **Group Performance**: Track group health and member participation
- **Financial Reports**: Detailed contribution and payout reports
- **Member Statistics**: Individual member performance metrics
- **Activity Feed**: Real-time updates on group activities
- **Dashboard Insights**: Comprehensive overview of all groups

### 🎫 **Event Management**
- **Event Creation**: Create and manage events with ticket sales
- **Ticket Management**: Handle ticket purchases and distribution
- **Event Analytics**: Track event performance and attendance
- **Marketing Tools**: Promote events with built-in marketing features
- **Event Details**: Comprehensive event pages with full information
- **Payment Integration**: Ready for Stripe payment processing

### 🛡️ **Admin Dashboard**
- **Admin Authentication**: Secure token-based admin access
- **User Management**: Manage all platform users
- **Event Oversight**: Monitor and manage all events
- **Analytics Dashboard**: Platform-wide performance metrics
- **System Settings**: Configure platform settings

### 🎨 **Modern UI/UX**
- **HubSpot-Inspired Design**: Clean, professional interface
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Toast Notifications**: User-friendly feedback system
- **Consistent Styling**: Unified design language throughout

## 🏗️ Architecture

### **Full-Stack Next.js Application**

```
src/
├── app/                    # App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── groups/           # Group management
│   ├── contributions/    # Contribution tracking
│   ├── events/          # Event management
│   │   └── [id]/        # Dynamic event pages
│   ├── profile/          # User profile
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── features/         # Feature-specific components
│   ├── common/           # Reusable UI components
│   ├── layout/           # Navigation components
│   └── providers/        # Context providers
├── lib/                  # Utilities, auth, config
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **NextAuth.js** - Authentication
- **Boring Avatars** - User avatar generation
- **Recharts** - Data visualization

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

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### **Installation**
```bash
# Clone repository
git clone <repository-url>
cd dhukuti

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local

# Configure database credentials in .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/dhukuti"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_ACCESS_TOKEN="your-admin-token"

# Set up database
npx prisma db push

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

### **Docker Setup**
```bash
# Using Docker Compose
docker-compose up -d

# Or for development
docker-compose -f docker-compose.dev.yml up -d
```

## 👥 Test Data

### **Admin User**
- **Email**: `admin@dhukuti.com`
- **Password**: `admin123`

### **Regular Users**
- **Ramesh Thapa**: `ramesh.thapa@email.com` / `password123`
- **Sita Gurung**: `sita.gurung@email.com` / `password123`
- **Bhupen Rai**: `bhupen.rai@email.com` / `password123`
- **Anjali Shrestha**: `anjali.shrestha@email.com` / `password123`

## 📊 Database Schema

### **Core Models**
- **User** - Authentication, profiles, roles, reputation
- **Group** - Dhukuti group management with metadata support
- **GroupMember** - Member relationships and roles
- **Contribution** - Payment tracking and scheduling
- **Transaction** - Financial records and audit trail
- **Activity** - Comprehensive activity logging
- **Message** - Group communication
- **Event** - Event management system
- **Ticket** - Ticket sales and management

## 🎯 Recent Updates

### **UI/UX Enhancements**
- ✅ Complete HubSpot-inspired redesign
- ✅ Compact dashboard layout
- ✅ Curved button styling throughout
- ✅ Professional homepage with conditional rendering
- ✅ Responsive design improvements
- ✅ Toast notification system migration to React Toastify

### **Event System**
- ✅ Event creation interface with multi-step form
- ✅ Event listing with images and ticket purchasing
- ✅ Dynamic event detail pages
- ✅ Ticket type management
- ✅ Payment modal integration (ready for Stripe)

### **Group Management**
- ✅ Modern group creation interface
- ✅ Group listing with compact design
- ✅ Group API integration with metadata support

### **Profile & Settings**
- ✅ Compact profile page design
- ✅ Inline profile editing
- ✅ Streamlined navigation

## 🚀 Deployment

### **Vercel (Recommended)**
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Built-in environment variable management
- ✅ Free tier available

### **Other Options**
- **Railway** - Good for full-stack apps
- **Render** - Free PostgreSQL hosting
- **Supabase** - Database + hosting solution
- **Docker** - Containerized deployment

## 📝 Documentation

For detailed documentation, see the [docs/](docs/) folder:

- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[User Guide](docs/USER_GUIDE.md)** - How to use the platform
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Deployment instructions
- **[Component Structure](docs/COMPONENT_STRUCTURE.md)** - Architecture overview
- **[TODO](docs/TODO.md)** - Development roadmap and current status

## 🔄 Development Status

### **✅ Completed**
- User authentication and authorization
- Database schema and migrations
- Group creation and management
- Event system with ticket purchasing
- Modern UI/UX design
- Responsive layout
- Toast notifications
- Profile management

### **🔄 In Progress**
- Event creation API integration
- Group details view implementation
- Stripe payment system setup

### **📋 Planned**
- Advanced group features
- Mobile application
- Real-time communication
- Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Documentation**: Check `docs/` folder
- **Issues**: Create GitHub issues
- **Email**: support@dhukuti.com

---

**Last Updated**: December 2024
**Status**: ✅ Ready for testing and deployment
**Version**: 1.0.0
**Next Milestone**: Payment system integration
