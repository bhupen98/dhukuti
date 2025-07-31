"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { dhukutiToast } from "@/lib/toast";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      dhukutiToast.error("Please enter the admin key");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: adminKey }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setIsAuthenticated(true);
          dhukutiToast.adminAction("Admin access granted successfully");
        } else {
          dhukutiToast.error("Invalid admin key");
        }
      } else {
        dhukutiToast.error("Authentication failed");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      dhukutiToast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: "/" });
      dhukutiToast.adminAction("Admin session ended successfully");
    } catch (error) {
      console.error("Error during admin sign out:", error);
      dhukutiToast.error("Failed to sign out. Please try again.");
      setIsSigningOut(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-clean">
        <div className="text-center">
          <div className="loading-spinner h-8 w-8 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-clean flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="card-header text-center">
              <div className="w-16 h-16 theme-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-clean">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="card-title">Admin Access</h1>
              <p className="card-description">Enter your admin key to access the dashboard</p>
            </div>
            <div className="card-content">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label htmlFor="adminKey" className="block text-xs font-medium text-slate-700 mb-1">
                    Admin Key
                  </label>
                  <input
                    id="adminKey"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="input w-full"
                    placeholder="Enter admin key"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? "Verifying..." : "Access Dashboard"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-clean">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 theme-blue rounded-xl flex items-center justify-center shadow-clean">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome, Dhukuti Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="btn btn-outline"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">1,247</div>
                <div className="metric-label">Total Users</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-emerald-600">+12%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">89</div>
                <div className="metric-label">Active Groups</div>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-emerald-600">+5%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">$2.4M</div>
                <div className="metric-label">Total Transactions</div>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-emerald-600">+18%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">99.9%</div>
                <div className="metric-label">Uptime</div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-emerald-600">+0.1%</span>
              <span className="text-slate-500 ml-1">from last month</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
                <p className="card-description">Latest system events and user actions</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">New user registration</p>
                      <p className="text-xs text-slate-600">john.doe@example.com joined the platform</p>
                      <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">New group created</p>
                      <p className="text-xs text-slate-600">"Sydney Nepalese Community" group was created</p>
                      <p className="text-xs text-slate-500 mt-1">15 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Large transaction</p>
                      <p className="text-xs text-slate-600">$5,000 contribution processed</p>
                      <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">System backup completed</p>
                      <p className="text-xs text-slate-600">Daily backup completed successfully</p>
                      <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Quick Actions</h3>
                <p className="card-description">Common administrative tasks</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Manage Users</p>
                      <p className="text-xs text-slate-600">View and manage user accounts</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Monitor Groups</p>
                      <p className="text-xs text-slate-600">Track group activities and health</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">View Reports</p>
                      <p className="text-xs text-slate-600">Access system analytics</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">System Settings</p>
                      <p className="text-xs text-slate-600">Configure platform settings</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">System Status</h3>
                <p className="card-description">Current platform health</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-emerald-800">Database</span>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-emerald-800">API Services</span>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-emerald-800">Payment Gateway</span>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-emerald-800">Email Service</span>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 