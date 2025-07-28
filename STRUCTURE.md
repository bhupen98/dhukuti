# 🏗️ Dhukuti Project Structure

This document outlines the organized structure of the Dhukuti project following the Ideaphobia pattern.

## 📁 Root Directory Structure

```
dhukuti/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   ├── components/               # React components
│   ├── lib/                      # Utilities and configuration
│   ├── types/                    # TypeScript type definitions
│   └── hooks/                    # Custom React hooks (future)
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets (future)
├── package.json                  # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── env.example                  # Environment variables template
├── README.md                    # Project documentation
├── setup.md                     # Migration setup guide
└── STRUCTURE.md                 # This file
```

## 🎯 App Router Structure (`src/app/`)

```
src/app/
├── page.tsx                     # Home page (redirects to dashboard)
├── layout.tsx                   # Root layout with navigation
├── globals.css                  # Global styles
├── login/                       # Authentication
│   └── page.tsx                # Login page
├── dashboard/                   # Main dashboard
│   └── page.tsx                # Dashboard page
├── groups/                      # Group management
│   └── page.tsx                # Groups listing page
├── contributions/               # Contribution tracking
│   └── page.tsx                # Contributions page
├── profile/                     # User profile
│   └── page.tsx                # Profile page
└── api/                         # API routes
    ├── auth/                    # Authentication API
    │   └── [...nextauth]/
    │       └── route.ts
    ├── groups/                  # Groups API
    │   └── route.ts
    ├── contributions/           # Contributions API
    │   └── route.ts
    ├── activity/                # Activity feed API
    │   └── route.ts
    ├── dashboard/               # Dashboard API
    │   └── stats/
    │       └── route.ts
    └── user/                    # User API
        ├── stats/
        │   └── route.ts
        └── profile/
            └── route.ts
```

## 🧩 Components Structure (`src/components/`)

```
src/components/
├── common/                      # Reusable UI components
│   └── Button.tsx              # Button component
├── features/                    # Feature-specific components
│   ├── dashboard/              # Dashboard components
│   │   ├── SummaryCard.tsx     # Dashboard summary card
│   │   ├── ActivityFeed.tsx    # Activity feed component
│   │   └── ProfileWidget.tsx   # Profile widget
│   └── groups/                 # Group components
│       └── GroupCard.tsx       # Group card component
├── layout/                      # Layout components
│   └── Navigation.tsx          # Navigation bar
└── providers/                   # Context providers
    └── SessionProvider.tsx     # NextAuth session provider
```

## 🔧 Library Structure (`src/lib/`)

```
src/lib/
├── prisma.ts                   # Prisma client configuration
├── auth.ts                     # NextAuth configuration
└── utils.ts                    # Utility functions
```

## 📊 Database Structure (`prisma/`)

```
prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # Database seeding script
```

## 🎨 Key Features Implemented

### ✅ **Core Pages**
- **Dashboard**: Main overview with stats and activity feed
- **Groups**: Group management and listing
- **Contributions**: Contribution tracking and management
- **Profile**: User profile and settings
- **Login**: Authentication page

### ✅ **API Routes**
- **Authentication**: NextAuth.js integration
- **Groups**: CRUD operations for Dhukuti groups
- **Contributions**: Payment tracking and management
- **Activity**: Real-time activity feed
- **User**: Profile and statistics management
- **Dashboard**: Analytics and statistics

### ✅ **Components**
- **Reusable UI**: Button, Navigation, etc.
- **Feature Components**: Dashboard widgets, Group cards
- **Layout Components**: Navigation bar, providers

### ✅ **Database Models**
- **User**: Authentication, profile, reputation
- **Group**: Dhukuti group management
- **GroupMember**: Member relationships and roles
- **Contribution**: Payment tracking
- **Transaction**: Financial records
- **Activity**: Audit logging
- **Message**: Group communication

## 🚀 Development Scripts

```bash
# Development
npm run dev                    # Start development server

# Database
npm run db:push               # Push schema to database
npm run db:generate           # Generate Prisma client
npm run db:seed               # Seed database with sample data
npm run db:studio             # Open Prisma Studio
npm run db:migrate            # Create new migration
npm run db:reset              # Reset database

# Build & Deploy
npm run build                 # Build for production
npm run start                 # Start production server
npm run lint                  # Run ESLint
```

## 🔒 Security Features

- **Authentication**: NextAuth.js with Google OAuth
- **Authorization**: Role-based access control
- **Data Protection**: Input validation and sanitization
- **Security Headers**: XSS protection, CSRF prevention
- **Rate Limiting**: API endpoint protection

## 📱 Responsive Design

- **Mobile-first**: Responsive design for all screen sizes
- **Tailwind CSS**: Utility-first styling framework
- **Modern UI**: Clean, professional interface
- **Accessibility**: ARIA labels and semantic HTML

## 🎯 Next Steps

### **Phase 1: Core Features** ✅
- [x] User authentication and profiles
- [x] Group creation and management
- [x] Basic contribution tracking
- [x] Activity feed and notifications
- [x] Dashboard with analytics

### **Phase 2: Advanced Features** 📋
- [ ] Group chat and messaging
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Mobile app development
- [ ] Real-time notifications

### **Phase 3: Scale Features** 📋
- [ ] Multi-language support
- [ ] Advanced security features
- [ ] API for third-party integrations
- [ ] Enterprise features
- [ ] White-label solutions

## 🛠️ Technology Stack

| **Technology**   | **Purpose**       | **Version** |
| ---------------- | ----------------- | ----------- |
| **Next.js**      | React framework   | 15.3.5      |
| **React**        | UI library        | 19.x        |
| **TypeScript**   | Type safety       | Latest      |
| **Tailwind CSS** | Styling framework | Latest      |
| **Prisma**       | Database ORM      | Latest      |
| **PostgreSQL**   | Database          | Latest      |
| **NextAuth.js**  | Authentication    | Latest      |

## 📈 Benefits of This Structure

1. **Modular Design**: Components are organized by feature and reusability
2. **Type Safety**: Full TypeScript support throughout the application
3. **Scalability**: Easy to add new features and components
4. **Maintainability**: Clear separation of concerns
5. **Developer Experience**: Hot reloading, better debugging
6. **Performance**: Optimized for production with Next.js

---

**This structure follows the Ideaphobia pattern and provides a solid foundation for the Dhukuti application.** 