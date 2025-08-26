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
- **Firebase Authentication**: Secure user authentication with email/password
- **Role-based Access Control**: User, Admin, and Moderator roles
- **Transaction History**: Complete audit trail for all financial activities
- **Data Protection**: Secure data handling with Firebase Firestore
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
- **Logo-Inspired Design System**: Beautiful red border styling throughout
- **Notion-Inspired Layout**: Clean, compact, and professional interface
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Toast Notifications**: User-friendly feedback system
- **Consistent Styling**: Unified design language throughout

## 🏗️ Architecture

### **Full-Stack Next.js Application with Firebase**

```
src/
├── app/                    # App Router pages
│   ├── dashboard/         # Main dashboard with logo-inspired design
│   ├── groups/           # Group management
│   ├── contributions/    # Contribution tracking
│   ├── events/          # Event management
│   │   └── [id]/        # Dynamic event pages
│   ├── profile/          # User profile
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── features/         # Feature-specific components
│   │   └── dashboard/    # Dashboard components
│   ├── homepage/         # Homepage components with logo design
│   ├── layout/           # Navigation components
│   └── providers/        # Context providers
├── lib/                  # Utilities, auth, Firebase config
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **Custom Design System** - Logo-inspired styling

### **Backend & Database**
- **Next.js API Routes** - Server-side API endpoints
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File storage

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- Firebase project
- npm or yarn

### **Installation**
```bash
# Clone repository
git clone <repository-url>
cd dhukuti

# Install dependencies
npm install

# Set up environment variables
node setup-env.js

# Configure Firebase credentials in .env.local
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Start development server
npm run dev
```

## 🎨 Design System

### **Logo-Inspired Design**
- **Red Border Theme**: Consistent red borders throughout the interface
- **Rounded Corners**: Modern `rounded-xl` styling for all components
- **Gradient Accents**: Subtle gradients for visual depth
- **Hover Effects**: Interactive elements with smooth transitions
- **Professional Typography**: Clean, readable text hierarchy

### **Color Palette**
- **Primary Red**: `#DC2626` - Main brand color
- **Secondary Colors**: Blue, green, purple, orange for different sections
- **Neutral Grays**: Professional gray scale for text and backgrounds
- **Accent Colors**: Yellow and blue for highlights and indicators

## 📊 Dashboard Features

### **Enhanced User Experience**
- **Beautiful Metrics Cards**: 4 key metrics with hover effects
- **Activity Feed**: Real-time updates with gradient backgrounds
- **Quick Actions**: Interactive buttons with logo-inspired styling
- **Profile Widget**: User stats with custom avatar system
- **Responsive Layout**: Works perfectly on all screen sizes

### **Navigation System**
- **Sticky Navigation**: Always-accessible top navigation bar
- **Search Functionality**: Full-width search with focus effects
- **Quick Actions Menu**: Dropdown for common tasks
- **Notifications**: Real-time notification system
- **User Menu**: Profile management and sign out

## 👥 Test Data

### **Demo User**
- **Email**: `demo@example.com`
- **Features**: Sample data for testing dashboard functionality

### **Regular Users**
- Create new accounts through the signup process
- All user data stored securely in Firebase

## 📊 Database Schema

### **Firebase Collections**
- **users** - User profiles and authentication data
- **groups** - Dhukuti group management
- **contributions** - Payment tracking and scheduling
- **events** - Event management system
- **activities** - Comprehensive activity logging

## 🎯 Recent Updates

### **Major UI/UX Redesign** ✨
- ✅ **Complete Logo-Inspired Design System**: Red borders, rounded corners, consistent styling
- ✅ **Notion-Inspired Layout**: Clean, compact, and professional interface
- ✅ **Enhanced Dashboard**: Beautiful metrics, activity feed, and quick actions
- ✅ **Navigation System**: Sticky navigation bar with search and user management
- ✅ **Responsive Design**: Perfect on all devices and screen sizes

### **Firebase Migration** 🔥
- ✅ **Authentication**: Migrated from NextAuth to Firebase Auth
- ✅ **Database**: Migrated from PostgreSQL to Firebase Firestore
- ✅ **User Management**: Complete user profile system with Firestore
- ✅ **Data Integration**: Real-time data synchronization

### **Component Improvements** 🧩
- ✅ **Profile Widget**: Custom avatar system with user initials
- ✅ **Activity Feed**: Gradient backgrounds and interactive elements
- ✅ **Quick Actions**: Logo-inspired button styling
- ✅ **Metrics Cards**: Hover effects and smooth transitions

## 🚀 Deployment

### **Vercel (Recommended)**
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Built-in environment variable management
- ✅ Free tier available

### **Other Options**
- **Railway** - Good for full-stack apps
- **Firebase Hosting** - Integrated with Firebase backend
- **Netlify** - Great for static sites with serverless functions

## 📝 Documentation

For detailed documentation, see the [docs/](docs/) folder:

- **[UI Design Plan](docs/DHUKUTI_UI_DESIGN_PLAN.md)** - Complete design system documentation
- **[Design System](docs/DESIGN_SYSTEM.md)** - Implementation guide for styling
- **[Homepage Design](docs/HOMEPAGE_DESIGN.md)** - Homepage component specifications
- **[Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md)** - Development timeline
- **[Firebase Migration Plan](docs/FIREBASE_MIGRATION_PLAN.md)** - Complete Firebase migration guide

## 🔄 Development Status

### **✅ Completed**
- Complete Firebase migration (Auth + Firestore)
- Logo-inspired design system implementation
- Enhanced dashboard with beautiful UI
- Navigation system with search and user management
- Responsive design for all devices
- User authentication and profile management
- Modern UI/UX with consistent styling

### **🔄 In Progress**
- Group management system
- Event system integration
- Contribution tracking

### **📋 Planned**
- Advanced analytics dashboard
- Real-time communication
- Mobile application
- Payment system integration

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
**Version**: 2.0.0 - Firebase Edition
**Next Milestone**: Group management system
