"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function useAuthGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  return { session, status };
}

export default function DashboardPage() {
  const { session, status } = useAuthGuard();

  if (status === "loading") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Check if this is a demo user
  const isDemoUser = session.user?.email === 'demo@example.com';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Welcome back, {session.user?.name}! Here's your financial overview.
        </p>
      </div>

      {/* Demo User Notice */}
      {isDemoUser && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">Demo Mode Active</h3>
              <p className="text-xs text-blue-700 mt-1">
                You're viewing sample data. Create a real account to start managing your own Dhukuti groups.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value">
                {isDemoUser ? "$34,000" : "$0"}
              </div>
              <div className="metric-label">Total Balance</div>
            </div>
            <div className="text-right">
              <div className="metric-change positive">
                {isDemoUser ? "+$2,400" : "+$0"}
              </div>
              <div className="text-xs text-gray-500">
                {isDemoUser ? "+7.6%" : "+0%"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value">
                {isDemoUser ? "3" : "0"}
              </div>
              <div className="metric-label">Active Groups</div>
            </div>
            <div className="text-right">
              <div className="metric-change positive">
                {isDemoUser ? "+1" : "+0"}
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value">
                {isDemoUser ? "12" : "0"}
              </div>
              <div className="metric-label">Contributions</div>
            </div>
            <div className="text-right">
              <div className="metric-change positive">
                {isDemoUser ? "+3" : "+0"}
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {isDemoUser ? (
            // Demo User Content
            <>
              {/* Financial Overview */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Financial Overview</h2>
                  <p className="card-description">Your Dhukuti savings summary</p>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-blue-600">3</div>
                      <div className="text-xs text-gray-600">Total Groups</div>
                      <div className="mt-1">
                        <span className="text-xs text-green-600">+1 this month</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-semibold text-green-600">12</div>
                      <div className="text-xs text-gray-600">Contributions</div>
                      <div className="mt-1">
                        <span className="text-xs text-green-600">+3 this month</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-semibold text-orange-600">$34,000</div>
                      <div className="text-xs text-gray-600">Total Balance</div>
                      <div className="mt-1">
                        <span className="text-xs text-green-600">+7.6% this month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Activity</h3>
                  <p className="card-description">Latest updates from your groups</p>
                </div>
                <div className="card-content">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs text-green-600">
                        💰
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">Bhupen paid contribution for Sydney Savers group</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            Sydney Savers
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600">
                        🏗️
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">New group 'Melbourne Money' created</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            Melbourne Money
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs text-orange-600">
                        👋
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">Ramesh joined Brisbane Buddies group</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            Brisbane Buddies
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // New User Content
            <>
              {/* Welcome Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Welcome to Dhukuti</h2>
                  <p className="card-description">Get started with your first savings group</p>
                </div>
                <div className="card-content">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Groups Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Create your first Dhukuti group to start building financial security with your community.
                    </p>
                    <button className="btn btn-primary">
                      Create Your First Group
                    </button>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Getting Started</h3>
                  <p className="card-description">Learn how Dhukuti works</p>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Create a Group</h4>
                        <p className="text-sm text-gray-600">Start a new Dhukuti group with friends, family, or community members.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs text-green-600 font-medium">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Set Contribution Amount</h4>
                        <p className="text-sm text-gray-600">Decide on a regular contribution amount that works for everyone.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs text-orange-600 font-medium">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Track & Rotate</h4>
                        <p className="text-sm text-gray-600">Monitor contributions and rotate payouts among group members.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          {/* Profile Widget */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Profile</h3>
              <p className="card-description">Your account overview</p>
            </div>
            <div className="card-content">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {session.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {session.user?.name}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-xs">G</span>
                    </div>
                    <span className="text-xs text-gray-600">Groups</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">
                    {isDemoUser ? "3" : "0"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                      <span className="text-green-600 font-medium text-xs">C</span>
                    </div>
                    <span className="text-xs text-gray-600">Contributions</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">
                    {isDemoUser ? "12" : "0"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                      <span className="text-orange-600 font-medium text-xs">$</span>
                    </div>
                    <span className="text-xs text-gray-600">Balance</span>
                  </div>
                  <span className="font-medium text-blue-600 text-sm">
                    {isDemoUser ? "$34,000" : "$0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                  ➕ Create New Group
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                  🔍 Find Groups
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                  📚 View Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 