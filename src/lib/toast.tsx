import toast from 'react-hot-toast';

// Custom toast functions with Dhukuti branding
export const dhukutiToast = {
  // Success notifications
  success: (message: string) => {
    toast.success(message, {
      icon: '✅',
    });
  },

  // Error notifications
  error: (message: string) => {
    toast.error(message, {
      icon: '❌',
    });
  },

  // Loading notifications
  loading: (message: string) => {
    return toast.loading(message, {
      icon: '⏳',
    });
  },

  // Info notifications
  info: (message: string) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
      },
    });
  },

  // Warning notifications
  warning: (message: string) => {
    toast(message, {
      icon: '⚠️',
      style: {
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
      },
    });
  },

  // Payment success
  paymentSuccess: (amount: string, groupName: string) => {
    toast.success(`Payment of ${amount} received for ${groupName}! 💰`, {
      duration: 5000,
    });
  },

  // Group creation success
  groupCreated: (groupName: string) => {
    toast.success(`Group "${groupName}" created successfully! 👥`, {
      duration: 5000,
    });
  },

  // Admin actions
  adminAction: (action: string) => {
    toast.success(`Admin action: ${action} completed successfully! 🛡️`, {
      duration: 4000,
    });
  },

  // Authentication
  loginSuccess: (userName: string) => {
    toast.success(`Welcome back, ${userName}! 🎉`, {
      duration: 3000,
    });
  },

  logoutSuccess: () => {
    toast.success('Successfully signed out! 👋', {
      duration: 2000,
    });
  },

  // Form validation
  formError: (field: string) => {
    toast.error(`Please check the ${field} field.`, {
      duration: 4000,
    });
  },

  // Network errors
  networkError: () => {
    toast.error('Network error. Please check your connection and try again.', {
      duration: 5000,
    });
  },

  // Generic error with retry
  errorWithRetry: (message: string, retryFn?: () => void) => {
    toast.error(
      (t) => (
        <div className="flex items-center space-x-2">
          <span>{message}</span>
          {retryFn && (
            <button
              onClick={() => {
                retryFn();
                toast.dismiss(t.id);
              }}
              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      ),
      {
        duration: 6000,
      }
    );
  },
};

// Export the default toast for direct use
export { toast }; 