"use client";

import { dhukutiToast } from "@/lib/toast.tsx";

export default function ToastDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Toast Notification Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Notifications</h2>
            <div className="space-y-3">
              <button
                onClick={() => dhukutiToast.success("Operation completed successfully!")}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Success Toast
              </button>
              <button
                onClick={() => dhukutiToast.error("Something went wrong!")}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Error Toast
              </button>
              <button
                onClick={() => dhukutiToast.info("Here's some information for you.")}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Info Toast
              </button>
              <button
                onClick={() => dhukutiToast.warning("Please be careful with this action.")}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Warning Toast
              </button>
            </div>
          </div>

          {/* Loading Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Notifications</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const loadingToast = dhukutiToast.loading("Processing your request...");
                  setTimeout(() => {
                    dhukutiToast.success("Request completed!");
                  }, 3000);
                }}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Loading with Success
              </button>
              <button
                onClick={() => {
                  const loadingToast = dhukutiToast.loading("Uploading file...");
                  setTimeout(() => {
                    dhukutiToast.error("Upload failed!");
                  }, 3000);
                }}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
                Loading with Error
              </button>
            </div>
          </div>

          {/* Dhukuti-Specific Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Dhukuti Notifications</h2>
            <div className="space-y-3">
              <button
                onClick={() => dhukutiToast.paymentSuccess("$500", "Sydney Nepalese Group")}
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Payment Success
              </button>
              <button
                onClick={() => dhukutiToast.groupCreated("Melbourne Community")}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Group Created
              </button>
              <button
                onClick={() => dhukutiToast.loginSuccess("Ram Sharma")}
                className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Login Success
              </button>
              <button
                onClick={() => dhukutiToast.logoutSuccess()}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Logout Success
              </button>
            </div>
          </div>

          {/* Error Handling */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Error Handling</h2>
            <div className="space-y-3">
              <button
                onClick={() => dhukutiToast.formError("email")}
                className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Form Error
              </button>
              <button
                onClick={() => dhukutiToast.networkError()}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Network Error
              </button>
              <button
                onClick={() => dhukutiToast.errorWithRetry("Failed to save data", () => {
                  dhukutiToast.success("Retry successful!");
                })}
                className="w-full bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
              >
                Error with Retry
              </button>
            </div>
          </div>
        </div>

        {/* Admin Notifications */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Notifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => dhukutiToast.adminAction("User management updated")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              User Management
            </button>
            <button
              onClick={() => dhukutiToast.adminAction("System backup completed")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              System Backup
            </button>
            <button
              onClick={() => dhukutiToast.adminAction("Security audit passed")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Security Audit
            </button>
            <button
              onClick={() => dhukutiToast.adminAction("Database optimized")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Database Optimized
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            All toasts are positioned in the top-right corner with glass morphism styling.
          </p>
        </div>
      </div>
    </div>
  );
} 