"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // If user is admin, show dashboard
  if (status === "authenticated" && session?.user) {
    const userRole = (session.user as any).role;
    const userEmail = session.user.email;
    
    if (userEmail === "admin@dhukuti.com" || userRole === "ADMIN") {
      return <AdminDashboard />;
    }
  }

  // Show login form for everyone else
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Verify token with server-side API
      const tokenResponse = await fetch("/api/admin/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: accessToken }),
      });

      const tokenResult = await tokenResponse.json();

      if (!tokenResult.success) {
        setError(tokenResult.error || "Invalid access token. Please try again.");
        setIsLoading(false);
        return;
      }

      // Ensure admin user exists with correct role
      await fetch("/api/admin/ensure-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Auto-login as admin with proper role
      const result = await signIn("credentials", {
        email: "admin@dhukuti.com",
        password: "admin123",
        redirect: false,
      });

      if (result?.error) {
        setError("Authentication failed. Please try again.");
      } else if (result?.ok) {
        // Force a page reload to ensure session is updated
        window.location.reload();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🛡️</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your admin access token to continue
          </p>
        </div>

        {/* Demo Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-lg">💡</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Demo Access Token</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p><strong>Token:</strong> DHUKUTI_ADMIN_2024</p>
                <p className="text-xs text-blue-600 mt-1">Contact your administrator for production tokens</p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Token Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700">
              Admin Access Token
            </label>
            <input
              id="accessToken"
              name="accessToken"
              type="password"
              autoComplete="off"
              required
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Enter admin access token"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>🛡️</span>
                  <span>Access Admin Dashboard</span>
                </div>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-gray-600 text-lg">🔒</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">Security Notice</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This is a secure admin portal. Access tokens are single-use and time-limited.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Back to Regular Login */}
        <div className="text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "users" | "analytics" | "settings">("overview");

  const handleSignOut = async () => {
    await signIn("credentials", {
      email: "demo@example.com",
      password: "demo123",
      redirect: false,
    });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Simple Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {session?.user?.name || "Admin User"}</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {/* Simple Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              {[
                { id: "overview", name: "Overview", icon: "📊" },
                { id: "events", name: "Events", icon: "📅" },
                { id: "users", name: "Users", icon: "👥" },
                { id: "analytics", name: "Analytics", icon: "📈" },
                { id: "settings", name: "Settings", icon: "⚙️" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1 ${
                    activeTab === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Total Users</h4>
                    <p className="text-2xl font-bold text-blue-600">2,847</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Active Events</h4>
                    <p className="text-2xl font-bold text-green-600">23</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Total Revenue</h4>
                    <p className="text-2xl font-bold text-purple-600">$125,430</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "events" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Events Management</h3>
                <p className="text-gray-600">Event management features coming soon...</p>
              </div>
            )}
            
            {activeTab === "users" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
                <p className="text-gray-600">User management features coming soon...</p>
              </div>
            )}
            
            {activeTab === "analytics" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
                <p className="text-gray-600">Analytics features coming soon...</p>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                <p className="text-gray-600">Settings features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 