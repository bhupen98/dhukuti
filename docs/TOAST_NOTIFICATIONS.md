# Toast Notifications System

## Overview

Dhukuti uses **React Hot Toast** for beautiful, accessible toast notifications that match our glass morphism design theme.

## Features

- ✅ **Glass Morphism Design**: Matches Dhukuti's aesthetic
- ✅ **Custom Dhukuti Branding**: Specialized notifications for community features
- ✅ **Accessible**: Built-in ARIA support
- ✅ **Lightweight**: Only ~5KB gzipped
- ✅ **TypeScript Support**: Full type safety
- ✅ **Customizable**: Easy to extend and modify

## Quick Start

### Basic Usage

```typescript
import { dhukutiToast } from "@/lib/toast.tsx";

// Success notification
dhukutiToast.success("Operation completed!");

// Error notification
dhukutiToast.error("Something went wrong!");

// Info notification
dhukutiToast.info("Here's some information");

// Warning notification
dhukutiToast.warning("Please be careful");
```

### Loading States

```typescript
// Show loading toast
const loadingToast = dhukutiToast.loading("Processing...");

// Update to success
dhukutiToast.success("Completed!");

// Or update to error
dhukutiToast.error("Failed!");
```

## Dhukuti-Specific Notifications

### Payment Notifications

```typescript
// Payment success
dhukutiToast.paymentSuccess("$500", "Sydney Nepalese Group");
// Shows: "Payment of $500 received for Sydney Nepalese Group! 💰"
```

### Group Management

```typescript
// Group creation
dhukutiToast.groupCreated("Melbourne Community");
// Shows: "Group "Melbourne Community" created successfully! 👥"
```

### Authentication

```typescript
// Login success
dhukutiToast.loginSuccess("Ram Sharma");
// Shows: "Welcome back, Ram Sharma! 🎉"

// Logout success
dhukutiToast.logoutSuccess();
// Shows: "Successfully signed out! 👋"
```

### Admin Actions

```typescript
// Admin operations
dhukutiToast.adminAction("User management updated");
// Shows: "Admin action: User management updated completed successfully! 🛡️"
```

## Error Handling

### Form Validation

```typescript
// Form field errors
dhukutiToast.formError("email");
// Shows: "Please check the email field."
```

### Network Errors

```typescript
// Network issues
dhukutiToast.networkError();
// Shows: "Network error. Please check your connection and try again."
```

### Error with Retry

```typescript
// Error with retry button
dhukutiToast.errorWithRetry("Failed to save data", () => {
  // Retry function
  dhukutiToast.success("Retry successful!");
});
```

## Configuration

### Global Settings

The toast system is configured in `src/app/layout.tsx`:

```typescript
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      color: '#1e293b',
      fontSize: '14px',
      fontWeight: '500',
    },
    // ... more options
  }}
/>
```

### Custom Styling

Each toast type has custom styling:

- **Success**: Green border and icon
- **Error**: Red border and icon  
- **Loading**: Blue border and icon
- **Info**: Blue background tint
- **Warning**: Yellow background tint

## Best Practices

### 1. Use Appropriate Toast Types

```typescript
// ✅ Good - Use specific toast types
dhukutiToast.paymentSuccess("$100", "Group Name");
dhukutiToast.loginSuccess("User Name");

// ❌ Avoid - Generic messages for specific actions
dhukutiToast.success("Payment successful");
```

### 2. Keep Messages Concise

```typescript
// ✅ Good - Clear and concise
dhukutiToast.success("Group created successfully!");

// ❌ Avoid - Too verbose
dhukutiToast.success("The group has been created successfully and is now ready for members to join!");
```

### 3. Use Loading States for Async Operations

```typescript
// ✅ Good - Show loading state
const loadingToast = dhukutiToast.loading("Processing payment...");
try {
  await processPayment();
  dhukutiToast.success("Payment processed!");
} catch (error) {
  dhukutiToast.error("Payment failed!");
}
```

### 4. Handle Errors Gracefully

```typescript
// ✅ Good - Provide helpful error messages
try {
  await saveData();
  dhukutiToast.success("Data saved!");
} catch (error) {
  dhukutiToast.errorWithRetry("Failed to save data", retryFunction);
}
```

## Demo Page

Visit `/toast-demo` to see all toast types in action and test the system.

## Extending the System

### Adding New Toast Types

1. Add to `src/lib/toast.ts`:

```typescript
// New toast type
eventCreated: (eventName: string) => {
  toast.success(`Event "${eventName}" created successfully! 📅`, {
    duration: 5000,
  });
},
```

2. Use in components:

```typescript
dhukutiToast.eventCreated("Nepalese New Year Celebration");
```

### Custom Styling

Modify the `toastOptions` in `src/app/layout.tsx` to change global styling, or add custom styles to individual toast calls.

## Accessibility

- All toasts include proper ARIA labels
- Screen readers announce toast messages
- Keyboard navigation support
- High contrast colors for visibility

## Performance

- Toasts are automatically removed after duration
- No memory leaks
- Optimized rendering
- Minimal bundle impact 