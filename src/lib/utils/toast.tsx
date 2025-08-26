import { toast, ToastOptions } from 'react-toastify';

// Custom toast functions with Dhukuti branding
export const dhukutiToast = {
  // Success notifications
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      icon: '✅',
      ...options,
    });
  },

  // Error notifications
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      icon: '❌',
      ...options,
    });
  },

  // Loading notifications
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      icon: '⏳',
      ...options,
    });
  },

  // Info notifications
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      icon: 'ℹ️',
      ...options,
    });
  },

  // Warning notifications
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      icon: '⚠️',
      ...options,
    });
  },

  // Payment success
  paymentSuccess: (amount: string, groupName: string) => {
    toast.success(`Payment of ${amount} received for ${groupName}! 💰`, {
      autoClose: 5000,
    });
  },

  // Group creation success
  groupCreated: (groupName: string) => {
    toast.success(`Group "${groupName}" created successfully! 👥`, {
      autoClose: 5000,
    });
  },

  // Authentication
  loginSuccess: (userName: string) => {
    toast.success(`Welcome back, ${userName}! 🎉`, {
      autoClose: 3000,
    });
  },

  logoutSuccess: () => {
    toast.success('Successfully signed out! 👋', {
      autoClose: 2000,
    });
  },

  // Form validation
  formError: (field: string) => {
    toast.error(`Please check the ${field} field.`, {
      autoClose: 4000,
    });
  },

  // Network errors
  networkError: () => {
    toast.error('Network error. Please check your connection and try again.', {
      autoClose: 5000,
    });
  },

  // Generic error with retry
  errorWithRetry: (message: string, retryFn?: () => void) => {
    toast.error(
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        {retryFn && (
          <button
            onClick={() => {
              retryFn();
            }}
            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        )}
      </div>,
      {
        autoClose: 6000,
      }
    );
  },
};

// Export the default toast for direct use
export { toast }; 