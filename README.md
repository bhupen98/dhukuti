# 💰 Dhukuti - Traditional Nepali Rotating Savings Platform

**Modernize traditional Dhukuti groups with digital automation.**

A comprehensive platform for managing traditional Nepali rotating savings and credit associations (Dhukuti) with modern digital tools, secure transactions, and community features.

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

### 👥 **User Management**

- **Member Profiles**: Detailed user profiles with reputation tracking
- **Group Membership**: Easy group joining and management
- **Reputation System**: Track member reliability and payment history
- **Emergency Contacts**: Safety features for group members
- **Verification System**: User verification for trust building

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
│       └── reset-session/ # Session management
├── components/
│   ├── features/         # Feature-specific components
│   │   ├── groups/       # Group management
│   │   ├── contributions/ # Contribution tracking
│   │   ├── events/       # Event management
│   │   ├── chat/         # Messaging system
│   │   └── analytics/    # Analytics components
│   ├── common/           # Reusable UI components
│   ├── layout/           # Navigation components
│   └── providers/        # Context providers
├── lib/                  # Utilities, auth, config
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
└── types/                # TypeScript definitions
```

### **Database Schema (Prisma + PostgreSQL)**

```
prisma/
└── schema.prisma         # Complete data model

Key Models:
- User (authentication, profile, reputation, role)
- Group (Dhukuti group management)
- GroupMember (member relationships)
- Contribution (payment tracking)
- Transaction (financial records)
- Activity (audit logging)
- Message (group communication)
- Event (event management)
- Ticket (ticket management)
```

### **Database Schema Highlights**

- **10+ Core Models** with full relationships and indexes
- **Financial Tracking**: Contributions, transactions with Decimal precision
- **Member Management**: Roles, status, reputation tracking
- **Activity System**: Comprehensive audit logging
- **Communication**: Built-in messaging system
- **Event Management**: Complete event and ticket system
- **Security**: Authentication and role-based authorization

## 🎯 User Workflows

### **👥 Group Owner Journey**

1. **Create Group** → Set contribution amount and cycle duration
2. **Invite Members** → Add trusted community members
3. **Manage Cycles** → Track contributions and distribute payouts
4. **Monitor Health** → View analytics and member performance
5. **Communicate** → Use built-in messaging for updates

### **💸 Member Journey**

1. **Join Group** → Accept invitation to trusted Dhukuti group
2. **Make Contributions** → Pay scheduled contributions on time
3. **Track Progress** → Monitor personal balance and group status
4. **Receive Payout** → Get payout when cycle completes
5. **Build Reputation** → Maintain good standing for future groups

### **🎫 Event Organizer Journey**

1. **Create Event** → Set up event details and ticket pricing
2. **Manage Tickets** → Handle ticket sales and distribution
3. **Track Sales** → Monitor ticket sales and revenue
4. **Promote Event** → Use built-in marketing tools
5. **Host Event** → Manage event day operations

### **📊 Admin Journey**

1. **Secure Access** → Use token-based admin authentication
2. **Monitor Platform** → Oversee all Dhukuti groups and events
3. **User Management** → Manage user accounts and verification
4. **Analytics Review** → Review platform performance metrics
5. **System Maintenance** → Ensure platform stability

## 💎 Premium Features

### **🏪 Group Management**

- **Flexible Cycles**: Customizable contribution schedules
- **Member Roles**: Owner, Admin, and Member permissions
- **Group Analytics**: Performance metrics and health indicators
- **Document Storage**: Share important group documents
- **Event Scheduling**: Plan and manage group meetings

### **💰 Financial Tracking**

- **Contribution Scheduling**: Automated due date tracking
- **Payment Status**: Real-time payment status updates
- **Balance Tracking**: Individual and group balance management
- **Transaction History**: Complete financial audit trail
- **Payout Automation**: Automated payout distribution

### **💬 Communication Hub**

- **Group Chat**: Real-time messaging for members
- **Activity Feed**: Live updates on group activities
- **Notifications**: Automated reminders and alerts
- **File Sharing**: Share documents and images
- **Event Management**: Schedule and track group events

### **🎫 Event Management**

- **Event Creation**: Multi-step event creation wizard
- **Ticket Sales**: Secure payment processing
- **Marketing Tools**: Built-in promotion features
- **Analytics**: Event performance tracking
- **Team Collaboration**: Multi-organizer support

### **📈 Business Intelligence**

- **Group Analytics**: Performance metrics and trends
- **Member Insights**: Individual participation tracking
- **Financial Reports**: Detailed contribution analysis
- **Health Monitoring**: Group sustainability indicators
- **Predictive Analytics**: Future performance forecasting

## 🛠️ Technical Stack

| **Technology**   | **Purpose**       | **Version** |
| ---------------- | ----------------- | ----------- |
| **Next.js**      | Full-stack framework | 15.3.5      |
| **React**        | UI library        | 19.x        |
| **TypeScript**   | Type safety       | Latest      |
| **Tailwind CSS** | Styling framework | Latest      |
| **Prisma**       | Database ORM      | Latest      |
| **PostgreSQL**   | Database          | Latest      |
| **NextAuth.js**  | Authentication    | Latest      |
| **Vercel**       | Hosting platform  | Latest      |

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm
- PostgreSQL database
- Git

### **Installation**

```bash
# Clone repository
git clone https://github.com/yourusername/dhukuti.git
cd dhukuti

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your credentials

# Set up database
npx prisma db push
npm run db:seed

# Start development server
npm run dev
```

### **Environment Variables**

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Admin Access
ADMIN_ACCESS_TOKEN="your-admin-token"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dhukuti"
```

## 📊 Data Overview

### **Test Data Included**

- **Demo User**: `demo@example.com` / `demo123` (Regular user)
- **Admin User**: `admin@dhukuti.com` / `admin123` (Admin access)
- **Sample Groups** with different contribution amounts and cycles
- **Sample Events** with ticket sales and management
- **Complete Relationships** between all entities

### **Sample Groups**

- **Sydney Nepali Community**: $1,000 contributions, 30-day cycles
- **Melbourne Students Group**: $500 contributions, 15-day cycles
- **Brisbane Business Network**: $2,000 contributions, 45-day cycles

### **Sample Events**

- **Community Concert**: Music event with ticket sales
- **Business Workshop**: Educational event with registration
- **Cultural Festival**: Multi-day event with various ticket types

## 🔒 Security Features

### **Authentication & Authorization**

- NextAuth.js with credentials provider
- Session-based authentication
- Role-based access control (USER, ADMIN, MODERATOR)
- Admin token-based authentication
- Account verification system

### **Data Protection**

- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection with CSP headers
- CSRF protection
- Rate limiting on sensitive endpoints
- Security headers implementation

### **Financial Security**

- Transaction audit logging
- Payment status tracking
- Balance verification
- Fraud detection measures
- Secure data encryption

### **Admin Security**

- Token-based admin authentication
- Separate admin layout without navigation
- Role-based admin access control
- Secure admin API routes

## 💰 Revenue Model

### **Platform Features**

- **Free Tier**: Basic group management and tracking
- **Premium Features**: Advanced analytics and automation
- **Event Management**: Ticket sales and event hosting
- **Enterprise**: Custom solutions for large organizations

### **Value Proposition**

1. **Traditional Trust**: Maintains traditional Dhukuti principles
2. **Digital Efficiency**: Automates manual processes
3. **Transparency**: Complete audit trail and reporting
4. **Community**: Built-in communication and collaboration
5. **Security**: Modern security for traditional practices
6. **Event Management**: Integrated event hosting and ticketing

## 📈 Analytics & Monitoring

### **Key Metrics Tracked**

- **Group Performance**: Success rates and member participation
- **Financial Health**: Contribution compliance and payout efficiency
- **User Engagement**: Platform usage and feature adoption
- **Community Growth**: New groups and member acquisition
- **Event Performance**: Ticket sales and event success metrics
- **System Performance**: Platform stability and response times

### **Dashboard Features**

- Real-time group statistics
- Member performance tracking
- Financial health indicators
- Activity monitoring
- Event analytics
- System health metrics

## 🛣️ Roadmap

### **Phase 1: Core Platform** ✅

- [x] User authentication and profiles
- [x] Group creation and management
- [x] Basic contribution tracking
- [x] Member management system

### **Phase 2: Advanced Features** ✅

- [x] Activity feed and notifications
- [x] Group chat and messaging
- [x] Financial analytics dashboard
- [x] Automated payment reminders
- [x] Document sharing system

### **Phase 3: Event Management** ✅

- [x] Event creation and management
- [x] Ticket sales and distribution
- [x] Payment processing
- [x] Event analytics
- [x] Marketing tools

### **Phase 4: Admin System** ✅

- [x] Admin authentication system
- [x] Admin dashboard
- [x] User management
- [x] Platform analytics
- [x] System settings

### **Phase 5: Growth Features** 📋

- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with payment gateways
- [ ] Multi-language support
- [ ] API for third-party integrations

### **Phase 6: Scale Features** 📋

- [ ] Enterprise features
- [ ] Advanced security features
- [ ] Machine learning insights
- [ ] International expansion
- [ ] White-label solutions

## 🐛 Recent Fixes & Improvements

### **Performance & Security**

- ✅ Implemented comprehensive security headers
- ✅ Added proper error handling and validation
- ✅ Fixed API response structure consistency
- ✅ Enhanced database schema with proper indexes
- ✅ Improved authentication flow
- ✅ Added admin token-based authentication

### **User Experience**

- ✅ Enhanced dashboard with real-time data
- ✅ Improved activity feed with filtering
- ✅ Added loading states and error boundaries
- ✅ Enhanced responsive design
- ✅ Improved navigation and layout
- ✅ Clean admin interface without navigation

### **Data & Analytics**

- ✅ Comprehensive database seeding
- ✅ Enhanced analytics with real-time metrics
- ✅ Improved data relationships and queries
- ✅ Added activity logging system
- ✅ Enhanced user statistics tracking
- ✅ Event management and analytics

### **Admin System**

- ✅ Secure admin authentication
- ✅ Clean admin dashboard
- ✅ User management features
- ✅ Platform analytics
- ✅ Separate admin layout

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Style**

- TypeScript for type safety
- ESLint + Prettier for formatting
- Conventional commits
- Component-driven development

## 📧 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/dhukuti/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/dhukuti/discussions)
- **Email**: support@dhukuti.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Mission

**Dhukuti** exists to preserve and modernize the traditional Nepali rotating savings system by providing secure, transparent, and efficient digital tools that maintain the community trust and financial cooperation that makes Dhukuti so valuable.

---

**Built with 💜 by the Dhukuti team**

_Preserving tradition through modern technology, one group at a time._
