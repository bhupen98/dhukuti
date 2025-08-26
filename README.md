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
- **Consistent Design System**: Professional gray-based color scheme with blue accents
- **Compact Layout**: Clean, space-efficient, and user-friendly interface
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Toast Notifications**: User-friendly feedback system
- **Unified Styling**: Consistent design language across all pages

## 🏗️ Architecture

### **Full-Stack Next.js Application with Firebase**

```
src/
├── app/                    # App Router pages
│   ├── dashboard/         # Main dashboard with consistent styling
│   ├── groups/           # Group management with compact design
│   ├── contributions/    # Contribution tracking system
│   │   └── new/         # New contribution form
│   ├── events/          # Event management
│   │   └── [id]/        # Dynamic event pages
│   ├── profile/          # User profile
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── features/         # Feature-specific components
│   │   ├── dashboard/    # Dashboard components
│   │   └── groups/       # Group management components
│   ├── homepage/         # Homepage components
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
- **Consistent Design System** - Professional styling throughout

### **Backend & Database**
- **Next.js API Routes** - Server-side API endpoints
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File storage

### **Development Tools**
- **ESLint** - Code linting
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

### **Consistent Professional Design**
- **Gray-Based Color Scheme**: Professional `bg-gray-50` backgrounds with `border-gray-200` borders
- **Blue Accents**: `hover:border-blue-300` for interactive elements
- **Compact Layout**: Reduced spacing and padding for efficient use of space
- **Hover Effects**: Interactive elements with smooth transitions
- **Professional Typography**: Clean, readable text hierarchy

### **Color Palette**
- **Primary Gray**: `#F9FAFB` - Main background color
- **Border Gray**: `#E5E7EB` - Consistent border styling
- **Blue Accents**: `#3B82F6` - Interactive elements and highlights
- **Text Colors**: Professional gray scale for readability
- **Status Colors**: Green, red, amber for different states

## 📊 Page Features

### **Dashboard**
- **Compact Metrics**: 4 key metrics with professional styling
- **Activity Feed**: Real-time updates with consistent design
- **Quick Actions**: Interactive buttons with unified styling
- **Profile Widget**: User stats with professional appearance
- **Responsive Layout**: Works perfectly on all screen sizes

### **Groups Page**
- **Quick Overview**: Statistics cards with consistent styling
- **Group Cards**: Professional card design with hover effects
- **Recent Activity**: Activity feed with unified design
- **Upcoming Events**: Event cards with consistent styling
- **Empty State**: Helpful information with professional appearance

### **Contributions Page**
- **Quick Stats**: Overview of contribution status
- **Contribution Cards**: Professional card design
- **Payment Tracking**: Status indicators with consistent colors
- **New Contribution Form**: Clean, user-friendly interface
- **Demo Data**: Sample data for demonstration

### **Events Page**
- **Event Cards**: Professional design with images
- **Ticket Information**: Clear ticket type display
- **Status Indicators**: Consistent status styling
- **Action Buttons**: Unified button design
- **Empty State**: Helpful guidance for users

### **Navigation System**
- **Sticky Navigation**: Always-accessible top navigation bar
- **Search Functionality**: Full-width search with focus effects
- **Quick Actions Menu**: Dropdown for common tasks
- **Notifications**: Real-time notification system
- **User Menu**: Profile management and sign out

## 👥 Test Data

### **Demo User**
- **Email**: `demo@example.com`
- **Features**: Sample data for testing all page functionality

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

### **Consistent Styling Across All Pages** ✨
- ✅ **Unified Design System**: Applied consistent gray-based color scheme across all pages
- ✅ **Compact Layout**: Reduced spacing and padding for professional appearance
- ✅ **Professional Borders**: Consistent `border-gray-200` with `hover:border-blue-300`
- ✅ **Button Styling**: Unified button design throughout the application
- ✅ **Card Design**: Professional card styling with consistent hover effects

### **Contributions Page Enhancement** 💸
- ✅ **Main Contributions Page**: Complete redesign with consistent styling
- ✅ **New Contribution Form**: Professional form with group selection and payment methods
- ✅ **Quick Stats**: Overview cards showing contribution status
- ✅ **Demo Data**: Sample contributions for demonstration
- ✅ **Payment Tracking**: Status indicators and payment history

### **Page Consistency** 🎨
- ✅ **Dashboard**: Updated with consistent styling and compact design
- ✅ **Groups Page**: Applied unified design system with professional appearance
- ✅ **Events Page**: Maintained original content while applying consistent styling
- ✅ **Navigation**: Professional navigation with consistent button styling

### **Firebase Migration** 🔥
- ✅ **Authentication**: Migrated from NextAuth to Firebase Auth
- ✅ **Database**: Migrated from PostgreSQL to Firebase Firestore
- ✅ **User Management**: Complete user profile system with Firestore
- ✅ **Data Integration**: Real-time data synchronization

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
- **[Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md)** - Development timeline and responsive design plan
- **[Firebase Migration Plan](docs/FIREBASE_MIGRATION_PLAN.md)** - Complete Firebase migration guide

## 🔄 Development Status

### **✅ Completed**
- Complete Firebase migration (Auth + Firestore)
- Consistent design system across all pages
- Enhanced dashboard with professional UI
- Navigation system with search and user management
- Responsive design for all devices
- User authentication and profile management
- Groups page with comprehensive features
- Contributions page with payment tracking
- Events page with professional styling
- Modern UI/UX with consistent styling

### **🔄 In Progress**
- Firebase schema design and local storage strategy
- Real-time data synchronization
- Advanced analytics implementation

### **📋 Planned**
- Payment system integration
- Real-time communication features
- Mobile application
- Advanced reporting and analytics

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
**Status**: ✅ Ready for Firebase schema design and local storage implementation
**Version**: 2.1.0 - Consistent Design Edition
**Next Milestone**: Firebase schema design and local storage strategy
