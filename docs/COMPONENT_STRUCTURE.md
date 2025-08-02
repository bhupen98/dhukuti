# 🏗️ Component Structure

## Overview

This document outlines the component architecture of the Dhukuti platform, providing a clear understanding of how components are organized and interact with each other.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin-specific pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── events/            # Event management pages
│   ├── groups/            # Group management pages
│   ├── profile/           # User profile pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   ├── charts/           # Data visualization components
│   ├── chat/             # Messaging components
│   ├── common/           # Shared/common components
│   ├── events/           # Event-related components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components
│   ├── notifications/    # Notification components
│   └── payments/         # Payment-related components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## Component Categories

### 1. Layout Components (`components/layout/`)

Components responsible for the overall page structure and navigation.

#### Navigation.tsx
- **Purpose**: Main navigation bar with user menu, search, and notifications
- **Props**: None (uses session data internally)
- **Features**:
  - User authentication status
  - Search functionality
  - Quick actions dropdown
  - Notifications panel
  - User profile menu

#### SessionProvider.tsx
- **Purpose**: Wraps the app with NextAuth session provider
- **Props**: `children: React.ReactNode`
- **Features**:
  - Session management
  - Authentication state

### 2. Common Components (`components/common/`)

Reusable components used throughout the application.

#### Button.tsx
- **Purpose**: Standardized button component
- **Props**:
  ```typescript
  interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
  }
  ```

#### Notifications.tsx
- **Purpose**: Toast notification system
- **Props**: Uses react-toastify internally
- **Features**:
  - Success notifications
  - Error notifications
  - Loading states
  - Auto-dismiss

### 3. Feature Components (`components/features/`)

Components specific to major features of the application.

#### Dashboard Components (`components/features/dashboard/`)

##### ActivityFeed.tsx
- **Purpose**: Displays recent user activity
- **Props**:
  ```typescript
  interface ActivityFeedProps {
    activities: Activity[];
    limit?: number;
  }
  ```

##### ProfileWidget.tsx
- **Purpose**: User profile summary widget
- **Props**:
  ```typescript
  interface ProfileWidgetProps {
    user: User;
    stats?: UserStats;
  }
  ```

##### SummaryCard.tsx
- **Purpose**: Dashboard summary statistics
- **Props**:
  ```typescript
  interface SummaryCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: string;
    color: string;
  }
  ```

#### Group Components (`components/features/groups/`)

##### GroupCard.tsx
- **Purpose**: Displays group information in card format
- **Props**:
  ```typescript
  interface GroupCardProps {
    group: Group;
    showActions?: boolean;
    onJoin?: (groupId: string) => void;
  }
  ```

### 4. Event Components (`components/events/`)

Components for event management functionality.

#### MarketingDashboard.tsx
- **Purpose**: Event marketing and analytics dashboard
- **Props**:
  ```typescript
  interface MarketingDashboardProps {
    event: Event;
    analytics: EventAnalytics;
  }
  ```

#### TeamCollaboration.tsx
- **Purpose**: Team collaboration tools for events
- **Props**:
  ```typescript
  interface TeamCollaborationProps {
    event: Event;
    team: TeamMember[];
  }
  ```

#### TicketManager.tsx
- **Purpose**: Ticket sales and management interface
- **Props**:
  ```typescript
  interface TicketManagerProps {
    event: Event;
    tickets: Ticket[];
  }
  ```

### 5. Chart Components (`components/charts/`)

Data visualization components.

#### AnalyticsCharts.tsx
- **Purpose**: Financial and activity analytics charts
- **Props**:
  ```typescript
  interface AnalyticsChartsProps {
    data: ChartData[];
    type: 'line' | 'bar' | 'pie';
    title: string;
  }
  ```

### 6. Chat Components (`components/chat/`)

Messaging and communication components.

#### GroupChat.tsx
- **Purpose**: Group messaging interface
- **Props**:
  ```typescript
  interface GroupChatProps {
    groupId: string;
    messages: Message[];
    onSendMessage: (message: string) => void;
  }
  ```

### 7. Notification Components (`components/notifications/`)

Real-time notification components.

#### RealTimeNotifications.tsx
- **Purpose**: Real-time notification system
- **Props**:
  ```typescript
  interface RealTimeNotificationsProps {
    notifications: Notification[];
    onMarkRead: (id: string) => void;
  }
  ```

### 8. Payment Components (`components/payments/`)

Payment and financial components.

#### PaymentModal.tsx
- **Purpose**: Payment processing modal
- **Props**:
  ```typescript
  interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onPaymentComplete: (payment: Payment) => void;
  }
  ```

### 9. Admin Components (`components/admin/`)

Administrative interface components.

#### AdminDashboard.tsx
- **Purpose**: Admin dashboard with platform statistics
- **Props**:
  ```typescript
  interface AdminDashboardProps {
    stats: PlatformStats;
    recentActivity: AdminActivity[];
  }
  ```

## Component Patterns

### 1. Container/Presentational Pattern

Components are split into container (logic) and presentational (UI) components:

```typescript
// Container component (handles logic)
const GroupListContainer = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups().then(setGroups).finally(() => setLoading(false));
  }, []);

  return <GroupList groups={groups} loading={loading} />;
};

// Presentational component (handles UI)
const GroupList = ({ groups, loading }: GroupListProps) => {
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="grid gap-4">
      {groups.map(group => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};
```

### 2. Compound Component Pattern

Complex components use compound component pattern for flexibility:

```typescript
const Card = ({ children, ...props }: CardProps) => (
  <div className="card" {...props}>{children}</div>
);

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

Card.Content = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Content</Card.Content>
</Card>
```

### 3. Render Props Pattern

For complex logic sharing:

```typescript
const WithAuth = ({ children }: { children: (user: User) => React.ReactNode }) => {
  const { data: session } = useSession();
  
  if (!session) return <LoginPrompt />;
  
  return <>{children(session.user)}</>;
};

// Usage
<WithAuth>
  {(user) => <Dashboard user={user} />}
</WithAuth>
```

## State Management

### 1. Local State
- Component-specific state using `useState`
- Form state management
- UI state (loading, error, etc.)

### 2. Global State
- User session via NextAuth
- Theme preferences
- Global notifications

### 3. Server State
- API data fetching with SWR or React Query
- Real-time updates via WebSocket
- Cache management

## Styling Approach

### 1. Tailwind CSS
- Utility-first CSS framework
- Consistent design system
- Responsive design utilities

### 2. Component Variants
```typescript
const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
};
```

### 3. Custom CSS Classes
- Global styles in `globals.css`
- Component-specific styles when needed
- CSS-in-JS for dynamic styles

## Performance Optimization

### 1. Code Splitting
- Dynamic imports for large components
- Route-based code splitting
- Component lazy loading

### 2. Memoization
```typescript
const ExpensiveComponent = React.memo(({ data }: Props) => {
  // Component logic
});
```

### 3. Virtual Scrolling
- For large lists (groups, events, etc.)
- Efficient rendering of many items

## Accessibility

### 1. ARIA Labels
- Proper labeling for screen readers
- Semantic HTML structure
- Keyboard navigation support

### 2. Color Contrast
- WCAG AA compliance
- High contrast mode support
- Color-blind friendly design

### 3. Focus Management
- Logical tab order
- Focus indicators
- Skip links for navigation

## Testing Strategy

### 1. Unit Tests
- Component logic testing
- Utility function testing
- Hook testing

### 2. Integration Tests
- Component interaction testing
- API integration testing
- User flow testing

### 3. E2E Tests
- Critical user journeys
- Cross-browser testing
- Mobile responsiveness testing

## Component Documentation

### 1. JSDoc Comments
```typescript
/**
 * Displays a group card with basic information and actions
 * @param group - The group data to display
 * @param showActions - Whether to show action buttons
 * @param onJoin - Callback when join button is clicked
 */
const GroupCard = ({ group, showActions, onJoin }: GroupCardProps) => {
  // Component implementation
};
```

### 2. Storybook Stories
- Component examples
- Different states and variants
- Interactive documentation

### 3. TypeScript Types
- Comprehensive type definitions
- Interface documentation
- Generic type constraints

## Best Practices

### 1. Component Design
- Single responsibility principle
- Props interface definition
- Default prop values
- Error boundaries

### 2. Performance
- Avoid unnecessary re-renders
- Optimize bundle size
- Lazy load components
- Use React.memo appropriately

### 3. Maintainability
- Consistent naming conventions
- Clear component structure
- Comprehensive documentation
- Regular refactoring

---

**Last Updated**: December 2024
**Version**: 1.0.0 