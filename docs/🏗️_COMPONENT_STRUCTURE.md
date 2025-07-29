# 🧩 Dhukuti Component Structure

This document outlines the frontend component architecture of the Dhukuti platform, providing a comprehensive guide to the component hierarchy, organization, and design patterns used throughout the application.

## 📋 **Table of Contents**
- [Component Overview](#component-overview)
- [Directory Structure](#directory-structure)
- [Component Categories](#component-categories)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Styling Guidelines](#styling-guidelines)
- [Component Documentation](#component-documentation)

---

## 🏗️ **Component Overview**

### **Architecture Principles**
- **Component-Based**: Modular, reusable components
- **Type Safety**: Full TypeScript integration
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized rendering and loading

### **Technology Stack**
- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Testing**: Jest + React Testing Library

---

## 📁 **Directory Structure**

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── forms/               # Form components
│   │   ├── FormField.tsx
│   │   ├── FormValidation.tsx
│   │   └── FormWizard.tsx
│   ├── dashboard/           # Dashboard components
│   │   ├── DashboardCard.tsx
│   │   ├── Chart.tsx
│   │   ├── Stats.tsx
│   │   └── ActivityFeed.tsx
│   ├── groups/              # Group management components
│   │   ├── GroupCard.tsx
│   │   ├── GroupForm.tsx
│   │   ├── MemberList.tsx
│   │   └── GroupSettings.tsx
│   ├── events/              # Event management components
│   │   ├── EventCard.tsx
│   │   ├── EventForm.tsx
│   │   ├── EventCalendar.tsx
│   │   └── EventDetails.tsx
│   ├── admin/               # Admin components
│   │   ├── AdminDashboard.tsx
│   │   ├── UserManagement.tsx
│   │   ├── SystemStats.tsx
│   │   └── AdminSettings.tsx
│   └── providers/           # Context providers
│       ├── SessionProvider.tsx
│       ├── AdminNavigationProvider.tsx
│       └── ThemeProvider.tsx
```

---

## 🎯 **Component Categories**

### **1. Layout Components**
Components responsible for the overall page structure and navigation.

#### **Navigation.tsx**
```typescript
interface NavigationProps {
  user?: User;
  notifications?: Notification[];
  onLogout?: () => void;
}
```
- **Purpose**: Main navigation bar with user menu and notifications
- **Features**: Responsive design, user authentication, notification system
- **Dependencies**: NextAuth session, notification context

#### **Footer.tsx**
```typescript
interface FooterProps {
  showAdminLink?: boolean;
  version?: string;
}
```
- **Purpose**: Site footer with links and information
- **Features**: Dynamic admin link, version display, social links
- **Dependencies**: Environment variables, admin access

#### **Sidebar.tsx**
```typescript
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}
```
- **Purpose**: Mobile sidebar navigation
- **Features**: Collapsible menu, user profile, quick actions
- **Dependencies**: User context, navigation state

### **2. UI Components**
Reusable UI components used throughout the application.

#### **Button.tsx**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```
- **Purpose**: Standardized button component
- **Features**: Multiple variants, loading states, accessibility
- **Usage**: Forms, actions, navigation

#### **Input.tsx**
```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}
```
- **Purpose**: Form input component
- **Features**: Validation, error handling, accessibility
- **Usage**: Forms, search, data entry

#### **Modal.tsx**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```
- **Purpose**: Modal dialog component
- **Features**: Backdrop, keyboard navigation, focus management
- **Usage**: Confirmations, forms, details

### **3. Form Components**
Specialized components for form handling and validation.

#### **FormField.tsx**
```typescript
interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea';
  validation?: ValidationRule[];
  children?: React.ReactNode;
}
```
- **Purpose**: Form field wrapper with validation
- **Features**: Error display, validation rules, accessibility
- **Usage**: All forms throughout the application

#### **FormWizard.tsx**
```typescript
interface FormWizardProps {
  steps: WizardStep[];
  onComplete: (data: any) => void;
  initialData?: any;
}
```
- **Purpose**: Multi-step form wizard
- **Features**: Progress tracking, step validation, data persistence
- **Usage**: Complex forms like event creation

### **4. Dashboard Components**
Components specific to the dashboard and analytics.

#### **DashboardCard.tsx**
```typescript
interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}
```
- **Purpose**: Dashboard metric card
- **Features**: Trend indicators, animations, responsive design
- **Usage**: Dashboard overview, analytics display

#### **Chart.tsx**
```typescript
interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: ChartData;
  options?: ChartOptions;
  height?: number;
}
```
- **Purpose**: Data visualization component
- **Features**: Multiple chart types, interactivity, responsiveness
- **Usage**: Analytics, reports, data visualization

### **5. Group Components**
Components for group management functionality.

#### **GroupCard.tsx**
```typescript
interface GroupCardProps {
  group: Group;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}
```
- **Purpose**: Group information display
- **Features**: Member count, status, quick actions
- **Usage**: Group listings, search results

#### **GroupForm.tsx**
```typescript
interface GroupFormProps {
  group?: Group;
  onSubmit: (data: GroupFormData) => void;
  onCancel?: () => void;
}
```
- **Purpose**: Group creation and editing
- **Features**: Validation, member management, settings
- **Usage**: Create/edit groups

### **6. Event Components**
Components for event management.

#### **EventCard.tsx**
```typescript
interface EventCardProps {
  event: Event;
  onRSVP?: (response: 'yes' | 'no' | 'maybe') => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
```
- **Purpose**: Event information display
- **Features**: RSVP functionality, date/time display, location
- **Usage**: Event listings, calendar views

#### **EventCalendar.tsx**
```typescript
interface EventCalendarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onDateClick?: (date: Date) => void;
}
```
- **Purpose**: Calendar view for events
- **Features**: Month/week/day views, event indicators
- **Usage**: Event management, scheduling

### **7. Admin Components**
Components for administrative functionality.

#### **AdminDashboard.tsx**
```typescript
interface AdminDashboardProps {
  stats: AdminStats;
  recentActivity: Activity[];
  systemHealth: SystemHealth;
}
```
- **Purpose**: Admin dashboard overview
- **Features**: System metrics, user activity, health monitoring
- **Usage**: System administration

#### **UserManagement.tsx**
```typescript
interface UserManagementProps {
  users: User[];
  onUpdateRole?: (userId: string, role: UserRole) => void;
  onDeleteUser?: (userId: string) => void;
}
```
- **Purpose**: User administration interface
- **Features**: Role management, user search, bulk actions
- **Usage**: User administration

---

## 🎨 **Design Patterns**

### **1. Compound Components**
Components that work together to provide complex functionality.

```typescript
// Example: Form with validation
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email" validation={[required, email]}>
    <Input type="email" />
  </FormField>
  <FormField name="password" label="Password" validation={[required, minLength(8)]}>
    <Input type="password" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

### **2. Render Props**
Components that accept functions as children for flexible rendering.

```typescript
// Example: Data fetching component
<DataFetcher url="/api/users">
  {({ data, loading, error }) => (
    loading ? <Spinner /> :
    error ? <ErrorMessage error={error} /> :
    <UserList users={data} />
  )}
</DataFetcher>
```

### **3. Higher-Order Components (HOCs)**
Functions that enhance components with additional functionality.

```typescript
// Example: Authentication wrapper
const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const { data: session } = useSession();
    
    if (!session) {
      return <LoginRequired />;
    }
    
    return <Component {...props} user={session.user} />;
  };
};
```

### **4. Custom Hooks**
Reusable logic encapsulated in hooks.

```typescript
// Example: Form validation hook
const useFormValidation = (initialData: any, validationRules: ValidationRule[]) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  
  const validate = useCallback(() => {
    // Validation logic
  }, [data, validationRules]);
  
  return { data, setData, errors, validate, isValid: Object.keys(errors).length === 0 };
};
```

---

## 🔄 **State Management**

### **1. Local State**
Component-level state using React hooks.

```typescript
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
```

### **2. Context State**
Global state shared across components.

```typescript
// Theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### **3. Server State**
Data fetched from APIs using SWR or React Query.

```typescript
const { data: users, error, mutate } = useSWR('/api/users', fetcher);
```

---

## 🎨 **Styling Guidelines**

### **1. Tailwind CSS Classes**
Use Tailwind utility classes for styling.

```typescript
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Avoid
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
```

### **2. Component Variants**
Use consistent variant patterns.

```typescript
const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};
```

### **3. Responsive Design**
Mobile-first responsive design.

```typescript
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  <Card className="h-full">
    {/* Content */}
  </Card>
</div>
```

---

## 📚 **Component Documentation**

### **Component Template**
Each component should follow this documentation structure:

```typescript
/**
 * @component Button
 * @description A reusable button component with multiple variants
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
interface ButtonProps {
  /** Button variant style */
  variant: 'primary' | 'secondary' | 'danger';
  /** Button size */
  size: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button content */
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  onClick,
  children,
  ...props
}) => {
  // Component implementation
};
```

### **Testing Guidelines**
- Write unit tests for all components
- Test user interactions and state changes
- Ensure accessibility compliance
- Test responsive behavior

### **Performance Considerations**
- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load components when appropriate
- Optimize re-renders with useCallback and useMemo

---

## 🔧 **Development Workflow**

### **1. Creating New Components**
1. Create component file in appropriate directory
2. Add TypeScript interfaces
3. Implement component logic
4. Add styling with Tailwind CSS
5. Write tests
6. Add documentation
7. Update component index file

### **2. Component Review Checklist**
- [ ] TypeScript interfaces defined
- [ ] Props properly typed
- [ ] Accessibility features implemented
- [ ] Responsive design applied
- [ ] Tests written and passing
- [ ] Documentation added
- [ ] Performance optimized

### **3. Component Standards**
- Follow naming conventions
- Use consistent prop patterns
- Implement proper error handling
- Ensure accessibility compliance
- Maintain consistent styling

---

**📅 Last Updated**: December 2024  
**🏗️ Architecture**: Component-based React with TypeScript  
**🎨 Styling**: Tailwind CSS  
**🧪 Testing**: Jest + React Testing Library  
**📚 Documentation**: JSDoc + Storybook 