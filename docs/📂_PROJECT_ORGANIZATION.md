# 📁 Dhukuti Project Organization

This document provides a comprehensive overview of the Dhukuti project structure, organization principles, and development workflow. It serves as a guide for understanding how the project is organized and how to navigate the codebase effectively.

## 📋 **Table of Contents**
- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Code Organization](#code-organization)
- [Development Workflow](#development-workflow)
- [Best Practices](#best-practices)

---

## 🎯 **Project Overview**

### **Project Goals**
- **Modularity**: Well-organized, maintainable codebase
- **Scalability**: Structure that supports growth and new features
- **Collaboration**: Clear organization for team development
- **Quality**: Consistent patterns and standards

### **Technology Stack**
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library

---

## 📁 **Directory Structure**

```
dhukuti/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication routes
│   │   ├── admin/               # Admin routes
│   │   ├── api/                 # API routes
│   │   ├── dashboard/           # Dashboard routes
│   │   ├── groups/              # Group management routes
│   │   ├── events/              # Event management routes
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # React components
│   │   ├── layout/              # Layout components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── forms/               # Form components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── groups/              # Group components
│   │   ├── events/              # Event components
│   │   ├── admin/               # Admin components
│   │   └── providers/           # Context providers
│   ├── lib/                     # Utility libraries
│   │   ├── prisma.ts            # Prisma client
│   │   ├── auth.ts              # Authentication utilities
│   │   ├── utils.ts             # General utilities
│   │   └── validations.ts       # Validation schemas
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAdminGuard.ts     # Admin access guard
│   │   ├── useLocalStorage.ts   # Local storage hook
│   │   └── useDebounce.ts       # Debounce hook
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts              # Authentication types
│   │   ├── api.ts               # API types
│   │   └── common.ts            # Common types
│   └── styles/                  # Additional styles
│       └── components.css       # Component-specific styles
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
├── public/                      # Static assets
│   ├── images/                  # Image assets
│   ├── icons/                   # Icon assets
│   └── favicon.ico              # Favicon
├── docs/                        # Documentation
│   ├── README.md                # Main documentation
│   ├── GETTING_STARTED.md       # Setup guide
│   ├── USER_GUIDE.md            # User documentation
│   ├── API_REFERENCE.md         # API documentation
│   ├── TODO/                    # Development roadmap
│   ├── COMPONENT_STRUCTURE.md   # Component architecture
│   ├── PROJECT_ORGANIZATION.md  # This file
│   ├── REFACTORING.md           # Refactoring guidelines
│   ├── IDEA_REQUESTS_BRAINSTORM.md # Feature ideas
│   └── WOW_FACTS_DOCUMENTATION.md # Project achievements
├── tests/                       # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
├── scripts/                     # Build and deployment scripts
│   ├── build.sh                 # Build script
│   ├── deploy.sh                # Deployment script
│   └── seed.sh                  # Database seeding script
├── .github/                     # GitHub configuration
│   ├── workflows/               # CI/CD workflows
│   └── ISSUE_TEMPLATE/          # Issue templates
├── .vscode/                     # VS Code configuration
│   ├── settings.json            # Editor settings
│   └── extensions.json          # Recommended extensions
├── package.json                 # Node.js dependencies
├── package-lock.json            # Dependency lock file
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
├── jest.config.js               # Jest configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── README.md                    # Project overview
└── LICENSE                      # Project license
```

---

## 📄 **File Organization**

### **1. Source Code Organization**

#### **App Router Structure (src/app/)**
```
app/
├── (auth)/                      # Authentication route group
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   └── layout.tsx               # Auth layout
├── admin/                       # Admin routes
│   ├── page.tsx                 # Admin dashboard
│   ├── users/                   # User management
│   ├── settings/                # Admin settings
│   └── layout.tsx               # Admin layout
├── api/                         # API routes
│   ├── auth/                    # Authentication API
│   ├── groups/                  # Groups API
│   ├── events/                  # Events API
│   └── admin/                   # Admin API
├── dashboard/                   # Dashboard routes
│   ├── page.tsx                 # Main dashboard
│   ├── analytics/               # Analytics page
│   └── settings/                # User settings
├── groups/                      # Group management
│   ├── page.tsx                 # Groups list
│   ├── [id]/                    # Group details
│   └── create/                  # Create group
├── events/                      # Event management
│   ├── page.tsx                 # Events list
│   ├── [id]/                    # Event details
│   └── create/                  # Create event
├── globals.css                  # Global styles
├── layout.tsx                   # Root layout
└── page.tsx                     # Home page
```

#### **Component Organization (src/components/)**
```
components/
├── layout/                      # Layout components
│   ├── Navigation.tsx           # Main navigation
│   ├── Footer.tsx               # Site footer
│   ├── Sidebar.tsx              # Mobile sidebar
│   └── Layout.tsx               # Page layout wrapper
├── ui/                          # Reusable UI components
│   ├── Button.tsx               # Button component
│   ├── Input.tsx                # Input component
│   ├── Modal.tsx                # Modal component
│   ├── Card.tsx                 # Card component
│   └── index.ts                 # Component exports
├── forms/                       # Form components
│   ├── FormField.tsx            # Form field wrapper
│   ├── FormValidation.tsx       # Form validation
│   └── FormWizard.tsx           # Multi-step forms
├── dashboard/                   # Dashboard components
│   ├── DashboardCard.tsx        # Dashboard metric card
│   ├── Chart.tsx                # Data visualization
│   ├── Stats.tsx                # Statistics display
│   └── ActivityFeed.tsx         # Activity feed
├── groups/                      # Group components
│   ├── GroupCard.tsx            # Group information card
│   ├── GroupForm.tsx            # Group creation/editing
│   ├── MemberList.tsx           # Group members list
│   └── GroupSettings.tsx        # Group settings
├── events/                      # Event components
│   ├── EventCard.tsx            # Event information card
│   ├── EventForm.tsx            # Event creation/editing
│   ├── EventCalendar.tsx        # Event calendar view
│   └── EventDetails.tsx         # Event details
├── admin/                       # Admin components
│   ├── AdminDashboard.tsx       # Admin dashboard
│   ├── UserManagement.tsx       # User management
│   ├── SystemStats.tsx          # System statistics
│   └── AdminSettings.tsx        # Admin settings
└── providers/                   # Context providers
    ├── SessionProvider.tsx      # Authentication provider
    ├── AdminNavigationProvider.tsx # Admin navigation
    └── ThemeProvider.tsx        # Theme provider
```

### **2. Utility Organization (src/lib/)**
```
lib/
├── prisma.ts                    # Prisma client configuration
├── auth.ts                      # Authentication utilities
├── utils.ts                     # General utility functions
├── validations.ts               # Validation schemas
├── constants.ts                 # Application constants
├── api.ts                       # API utility functions
└── helpers.ts                   # Helper functions
```

### **3. Type Definitions (src/types/)**
```
types/
├── auth.ts                      # Authentication types
├── api.ts                       # API request/response types
├── common.ts                    # Common type definitions
├── database.ts                  # Database model types
├── forms.ts                     # Form data types
└── ui.ts                        # UI component types
```

---

## 🏷️ **Naming Conventions**

### **1. File Naming**
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: kebab-case (e.g., `user-profile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: camelCase (e.g., `userTypes.ts`)

### **2. Component Naming**
```typescript
// Component file: UserProfile.tsx
export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Component implementation
};

// Interface: UserProfileProps
interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}
```

### **3. Function Naming**
```typescript
// Event handlers: handle + action
const handleSubmit = () => {};

// API functions: verb + noun
const fetchUserData = async () => {};

// Utility functions: descriptive action
const formatCurrency = (amount: number) => {};
```

### **4. Variable Naming**
```typescript
// Boolean: is/has/can prefix
const isLoading = true;
const hasPermission = false;
const canEdit = true;

// Arrays: plural nouns
const users = [];
const eventList = [];

// Objects: descriptive nouns
const userProfile = {};
const eventDetails = {};
```

---

## 💻 **Code Organization**

### **1. Component Structure**
```typescript
// 1. Imports
import React from 'react';
import { useSession } from 'next-auth/react';

// 2. Types
interface ComponentProps {
  // Props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const { data: session } = useSession();
  
  // 5. State
  const [state, setState] = useState();
  
  // 6. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 7. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 8. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### **2. API Route Structure**
```typescript
// 1. Imports
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 2. Types
interface RequestBody {
  // Request body type
}

// 3. Handler
export async function POST(request: NextRequest) {
  try {
    // 4. Validation
    const body: RequestBody = await request.json();
    
    // 5. Business logic
    const result = await prisma.model.create({
      data: body
    });
    
    // 6. Response
    return NextResponse.json(result);
  } catch (error) {
    // 7. Error handling
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **3. Database Schema Organization**
```prisma
// 1. Data sources
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 2. Generator
generator client {
  provider = "prisma-client-js"
}

// 3. Models (alphabetical order)
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  groups    GroupMember[]
  events    EventParticipant[]
}
```

---

## 🔄 **Development Workflow**

### **1. Feature Development**
```
1. Create feature branch
   git checkout -b feature/feature-name

2. Implement feature
   - Add components
   - Update types
   - Add tests
   - Update documentation

3. Test changes
   npm run test
   npm run lint
   npm run type-check

4. Commit changes
   git add .
   git commit -m "feat: add feature description"

5. Push and create PR
   git push origin feature/feature-name
```

### **2. Code Review Process**
```
1. Create pull request
2. Add description and screenshots
3. Request review from team members
4. Address feedback and make changes
5. Get approval and merge
```

### **3. Release Process**
```
1. Create release branch
   git checkout -b release/v1.0.0

2. Update version numbers
   - package.json
   - CHANGELOG.md

3. Test release
   npm run test
   npm run build

4. Create release tag
   git tag v1.0.0
   git push origin v1.0.0

5. Deploy to production
```

---

## ✅ **Best Practices**

### **1. Code Organization**
- **Single Responsibility**: Each file/component has one clear purpose
- **Separation of Concerns**: UI, logic, and data are separated
- **DRY Principle**: Don't repeat yourself - reuse code
- **KISS Principle**: Keep it simple, stupid

### **2. File Structure**
- **Group Related Files**: Keep related files together
- **Consistent Naming**: Follow established naming conventions
- **Clear Hierarchy**: Use clear directory structure
- **Index Files**: Use index files for clean imports

### **3. Component Design**
- **Composable**: Components should be easily composable
- **Reusable**: Design components for reuse
- **Testable**: Components should be easy to test
- **Accessible**: Follow accessibility guidelines

### **4. Performance**
- **Lazy Loading**: Load components and data on demand
- **Memoization**: Use React.memo and useMemo appropriately
- **Bundle Size**: Keep bundle size minimal
- **Caching**: Implement proper caching strategies

### **5. Security**
- **Input Validation**: Validate all user inputs
- **Authentication**: Implement proper authentication
- **Authorization**: Check permissions before actions
- **Data Protection**: Protect sensitive data

---

## 📚 **Documentation Standards**

### **1. Code Documentation**
```typescript
/**
 * User profile component for displaying user information
 * @param user - User object containing profile data
 * @param onEdit - Callback function for edit action
 * @returns JSX element
 */
export const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  // Implementation
};
```

### **2. README Files**
- **Project Overview**: Clear description of the project
- **Setup Instructions**: Step-by-step setup guide
- **Usage Examples**: How to use the project
- **Contributing Guidelines**: How to contribute

### **3. API Documentation**
- **Endpoint Descriptions**: Clear description of each endpoint
- **Request/Response Examples**: Example requests and responses
- **Error Codes**: Documentation of error responses
- **Authentication**: Authentication requirements

---

**📅 Last Updated**: December 2024  
**🏗️ Architecture**: Next.js App Router + React + TypeScript  
**📁 Organization**: Feature-based with clear separation of concerns  
**🔧 Workflow**: Git flow with code review and testing  
**📚 Documentation**: Comprehensive with examples and guidelines 