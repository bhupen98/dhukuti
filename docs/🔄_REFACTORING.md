# 🔧 Dhukuti Refactoring Guidelines

This document provides comprehensive guidelines for refactoring code in the Dhukuti project. It covers when to refactor, how to approach refactoring, and best practices to ensure code quality and maintainability.

## 📋 **Table of Contents**
- [Refactoring Overview](#refactoring-overview)
- [When to Refactor](#when-to-refactor)
- [Refactoring Principles](#refactoring-principles)
- [Code Smells](#code-smells)
- [Refactoring Techniques](#refactoring-techniques)
- [Component Refactoring](#component-refactoring)
- [API Refactoring](#api-refactoring)
- [Database Refactoring](#database-refactoring)
- [Testing During Refactoring](#testing-during-refactoring)
- [Refactoring Checklist](#refactoring-checklist)

---

## 🎯 **Refactoring Overview**

### **What is Refactoring?**
Refactoring is the process of restructuring existing code without changing its external behavior. The goal is to improve code quality, readability, maintainability, and performance.

### **Benefits of Refactoring**
- **Improved Readability**: Code becomes easier to understand
- **Better Maintainability**: Easier to modify and extend
- **Reduced Bugs**: Cleaner code has fewer bugs
- **Enhanced Performance**: Optimized code runs faster
- **Easier Testing**: Well-structured code is easier to test

### **Refactoring Goals**
- **Clean Code**: Follow clean code principles
- **Single Responsibility**: Each function/component has one purpose
- **DRY Principle**: Don't repeat yourself
- **SOLID Principles**: Follow object-oriented design principles
- **Performance**: Optimize for speed and efficiency

---

## ⏰ **When to Refactor**

### **1. Code Smells Detected**
- **Long Functions**: Functions with too many lines
- **Large Classes**: Classes with too many responsibilities
- **Duplicate Code**: Repeated code patterns
- **Complex Conditionals**: Nested if statements
- **Poor Naming**: Unclear variable/function names

### **2. Technical Debt**
- **Outdated Dependencies**: Using old library versions
- **Performance Issues**: Slow loading or execution
- **Security Vulnerabilities**: Known security issues
- **Maintenance Problems**: Difficult to maintain code

### **3. Feature Development**
- **Before Adding Features**: Clean up existing code
- **After Bug Fixes**: Improve the fixed code
- **During Code Reviews**: Address review feedback
- **Before Releases**: Final cleanup before release

### **4. Architecture Changes**
- **Technology Updates**: Updating frameworks or libraries
- **Pattern Changes**: Adopting new design patterns
- **Structure Improvements**: Better file organization
- **Integration Changes**: Updating external integrations

---

## 🏗️ **Refactoring Principles**

### **1. Safety First**
```typescript
// Always maintain existing functionality
// Before refactoring
const calculateTotal = (items: Item[]) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
};

// After refactoring (same functionality, cleaner code)
const calculateTotal = (items: Item[]) => {
  return items.reduce((total, item) => total + item.price, 0);
};
```

### **2. Small Steps**
```typescript
// Break down large refactoring into small steps
// Step 1: Extract helper function
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Step 2: Use the helper function
const displayPrice = (item: Item) => {
  return formatCurrency(item.price);
};
```

### **3. Test-Driven Refactoring**
```typescript
// Write tests before refactoring
describe('UserService', () => {
  it('should create user with valid data', () => {
    const userData = { name: 'John', email: 'john@example.com' };
    const result = createUser(userData);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(userData.name);
  });
});

// Refactor with confidence knowing tests will catch issues
```

### **4. Preserve Behavior**
```typescript
// Ensure external API remains the same
// Before: Component with mixed concerns
const UserProfile = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

// After: Same external behavior, cleaner internal structure
const UserProfile = ({ user, onEdit }) => {
  return (
    <div>
      <UserInfo user={user} />
      <EditButton onEdit={onEdit} />
    </div>
  );
};
```

---

## 👃 **Code Smells**

### **1. Long Functions**
```typescript
// ❌ Bad: Long function with multiple responsibilities
const processUserData = (userData) => {
  // 50+ lines of mixed logic
  const validatedData = validateUserData(userData);
  const formattedData = formatUserData(validatedData);
  const enrichedData = enrichUserData(formattedData);
  const savedData = saveUserData(enrichedData);
  const notification = sendNotification(savedData);
  return notification;
};

// ✅ Good: Break into smaller, focused functions
const processUserData = (userData) => {
  const validatedData = validateUserData(userData);
  const processedData = processValidatedData(validatedData);
  return saveAndNotify(processedData);
};
```

### **2. Large Components**
```typescript
// ❌ Bad: Component doing too much
const UserDashboard = ({ user }) => {
  // 200+ lines of mixed UI and logic
  return (
    <div>
      {/* Too many responsibilities */}
    </div>
  );
};

// ✅ Good: Break into smaller components
const UserDashboard = ({ user }) => {
  return (
    <div>
      <UserProfile user={user} />
      <UserStats user={user} />
      <RecentActivity user={user} />
      <QuickActions user={user} />
    </div>
  );
};
```

### **3. Duplicate Code**
```typescript
// ❌ Bad: Repeated code patterns
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};

// ✅ Good: Reusable validation utility
const validators = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^\+?[\d\s-()]+$/.test(value),
  required: (value) => value && value.trim().length > 0
};
```

### **4. Complex Conditionals**
```typescript
// ❌ Bad: Nested conditionals
const getDiscount = (user, order) => {
  if (user.type === 'premium') {
    if (order.amount > 100) {
      if (order.category === 'electronics') {
        return 0.15;
      } else {
        return 0.10;
      }
    } else {
      return 0.05;
    }
  } else {
    if (order.amount > 200) {
      return 0.05;
    } else {
      return 0;
    }
  }
};

// ✅ Good: Simplified with early returns and helper functions
const getDiscount = (user, order) => {
  if (!isEligibleForDiscount(user, order)) {
    return 0;
  }
  
  return calculateDiscount(user, order);
};
```

---

## 🔧 **Refactoring Techniques**

### **1. Extract Function**
```typescript
// Before: Inline logic
const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span>{user.role}</span>
          <button onClick={() => handleEdit(user.id)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// After: Extracted components
const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

### **2. Extract Variable**
```typescript
// Before: Complex inline expressions
const isUserEligible = user.age >= 18 && user.verified && user.active && user.subscription.status === 'active';

// After: Clear variable names
const isAdult = user.age >= 18;
const isVerified = user.verified;
const isActive = user.active;
const hasActiveSubscription = user.subscription.status === 'active';
const isUserEligible = isAdult && isVerified && isActive && hasActiveSubscription;
```

### **3. Replace Magic Numbers**
```typescript
// Before: Magic numbers
const calculateTax = (amount) => {
  return amount * 0.15;
};

// After: Named constants
const TAX_RATE = 0.15;
const calculateTax = (amount) => {
  return amount * TAX_RATE;
};
```

### **4. Consolidate Conditional Expressions**
```typescript
// Before: Multiple conditions
const canEdit = user.role === 'admin' || user.role === 'moderator' || user.id === post.authorId;

// After: Simplified condition
const ADMIN_ROLES = ['admin', 'moderator'];
const canEdit = ADMIN_ROLES.includes(user.role) || user.id === post.authorId;
```

---

## 🧩 **Component Refactoring**

### **1. Split Large Components**
```typescript
// Before: Monolithic component
const GroupManagement = ({ group, onUpdate }) => {
  // 300+ lines of mixed logic
  return (
    <div>
      {/* Group info, members, settings, events, etc. */}
    </div>
  );
};

// After: Composed components
const GroupManagement = ({ group, onUpdate }) => {
  return (
    <div>
      <GroupInfo group={group} onUpdate={onUpdate} />
      <GroupMembers group={group} onUpdate={onUpdate} />
      <GroupSettings group={group} onUpdate={onUpdate} />
      <GroupEvents group={group} />
    </div>
  );
};
```

### **2. Extract Custom Hooks**
```typescript
// Before: Logic mixed in component
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  // Component logic...
};

// After: Extracted custom hook
const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
};

const UserProfile = ({ userId }) => {
  const { user, loading, error } = useUser(userId);
  // Clean component logic...
};
```

### **3. Optimize Re-renders**
```typescript
// Before: Unnecessary re-renders
const UserList = ({ users, onUserClick }) => {
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onClick={() => onUserClick(user.id)} // New function on every render
        />
      ))}
    </div>
  );
};

// After: Optimized with useCallback
const UserList = ({ users, onUserClick }) => {
  const handleUserClick = useCallback((userId) => {
    onUserClick(userId);
  }, [onUserClick]);

  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onClick={handleUserClick}
        />
      ))}
    </div>
  );
};
```

---

## 🌐 **API Refactoring**

### **1. Standardize Response Format**
```typescript
// Before: Inconsistent responses
// GET /api/users/1
{ id: 1, name: "John", email: "john@example.com" }

// GET /api/groups/1
{ group: { id: 1, name: "Group A" }, members: [...] }

// After: Consistent response format
// GET /api/users/1
{
  success: true,
  data: { id: 1, name: "John", email: "john@example.com" },
  message: "User retrieved successfully"
}

// GET /api/groups/1
{
  success: true,
  data: { id: 1, name: "Group A", members: [...] },
  message: "Group retrieved successfully"
}
```

### **2. Extract Common Middleware**
```typescript
// Before: Repeated middleware logic
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // API logic...
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// After: Extracted middleware
const withAuth = (handler: Function) => {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return handler(request, session);
    } catch (error) {
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  };
};

export const GET = withAuth(async (request: NextRequest, session: Session) => {
  // Clean API logic...
});
```

### **3. Centralize Error Handling**
```typescript
// Before: Scattered error handling
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createUser(data);
    return NextResponse.json(result);
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// After: Centralized error handling
const handleApiError = (error: any) => {
  if (error.code === 'P2002') {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  if (error.code === 'P2025') {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }
  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createUser(data);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

## 🗄️ **Database Refactoring**

### **1. Schema Migrations**
```sql
-- Before: Inconsistent naming
CREATE TABLE user (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_email VARCHAR(255)
);

-- After: Consistent naming
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
```

### **2. Index Optimization**
```sql
-- Before: Missing indexes
SELECT * FROM users WHERE email = 'user@example.com';

-- After: Added indexes
CREATE INDEX idx_users_email ON users(email);
```

### **3. Query Optimization**
```typescript
// Before: N+1 query problem
const users = await prisma.user.findMany();
const usersWithGroups = await Promise.all(
  users.map(user => prisma.group.findMany({ where: { members: { some: { userId: user.id } } } }))
);

// After: Optimized with include
const usersWithGroups = await prisma.user.findMany({
  include: {
    groups: true
  }
});
```

---

## 🧪 **Testing During Refactoring**

### **1. Test Coverage**
```typescript
// Ensure tests cover all functionality
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {
      // Test implementation
    });
    
    it('should throw error with invalid data', () => {
      // Test error handling
    });
    
    it('should handle duplicate email', () => {
      // Test edge cases
    });
  });
});
```

### **2. Integration Tests**
```typescript
// Test component integration
describe('UserProfile Integration', () => {
  it('should display user data and handle edit', async () => {
    render(<UserProfile user={mockUser} onEdit={mockOnEdit} />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
```

### **3. Performance Tests**
```typescript
// Test performance improvements
describe('UserList Performance', () => {
  it('should render 1000 users efficiently', () => {
    const startTime = performance.now();
    render(<UserList users={largeUserList} />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(100); // Should render in <100ms
  });
});
```

---

## ✅ **Refactoring Checklist**

### **Before Refactoring**
- [ ] **Identify the Problem**: What needs to be refactored?
- [ ] **Write Tests**: Ensure existing functionality is covered
- [ ] **Create Backup**: Commit current state
- [ ] **Plan the Refactoring**: Break down into small steps
- [ ] **Set Success Criteria**: Define what success looks like

### **During Refactoring**
- [ ] **Make Small Changes**: One change at a time
- [ ] **Run Tests**: After each change
- [ ] **Commit Frequently**: Small, incremental commits
- [ ] **Maintain Functionality**: Ensure behavior doesn't change
- [ ] **Document Changes**: Update documentation as needed

### **After Refactoring**
- [ ] **Run Full Test Suite**: Ensure all tests pass
- [ ] **Performance Check**: Verify performance improvements
- [ ] **Code Review**: Get feedback from team
- [ ] **Update Documentation**: Reflect changes in docs
- [ ] **Deploy Safely**: Use feature flags if needed

### **Quality Checks**
- [ ] **Code Coverage**: Maintain or improve test coverage
- [ ] **Performance**: No performance regressions
- [ ] **Readability**: Code is easier to understand
- [ ] **Maintainability**: Easier to modify and extend
- [ ] **Documentation**: Updated and accurate

---

## 🚀 **Refactoring Tools**

### **1. Code Analysis Tools**
- **ESLint**: Code quality and style
- **SonarQube**: Code quality analysis
- **TypeScript**: Type checking and refactoring
- **Prettier**: Code formatting

### **2. IDE Features**
- **VS Code**: Built-in refactoring tools
- **WebStorm**: Advanced refactoring features
- **Git**: Version control for safe refactoring

### **3. Testing Tools**
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **Lighthouse**: Performance testing

---

**📅 Last Updated**: December 2024  
**🔧 Focus**: Code quality and maintainability  
**🧪 Testing**: Comprehensive test coverage  
**📚 Documentation**: Clear guidelines and examples  
**🎯 Goal**: Clean, maintainable, and performant code 