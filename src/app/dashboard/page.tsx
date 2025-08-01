"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ProfileWidget } from "@/components/features/dashboard/ProfileWidget";

export default function DashboardPage() {
  const { session, status } = useAuthGuard();

  if (status === "loading") {
    return (
      <div className="max-w-5xl mx-auto px-2 py-2">
        <div className="animate-pulse space-y-2">
          <div className="h-5 bg-slate-200 rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <div className="lg:col-span-3 space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
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
    <div className="max-w-5xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-2 fade-in">
        <h1 className="text-lg font-bold text-gradient-blue mb-1">Dashboard</h1>
        <p className="text-xs text-slate-600">
          Welcome back, <span className="font-semibold text-slate-800">
                            {session.user?.name}
          </span>! Here's your financial overview.
        </p>
      </div>

      {/* Demo User Notice */}
      {isDemoUser && (
        <div className="mb-2 glass-card rounded-xl p-3 border-l-4 border-blue-500 bg-blue-50/80 slide-up">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 theme-blue rounded-lg flex items-center justify-center shadow-clean">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-blue-800 mb-1">Demo Mode Active</h3>
              <p className="text-xs text-blue-700">
                You're viewing sample data. Create a real account to start managing your own Dhukuti groups.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        <div className="metric-card slide-up" style={{ animationDelay: '0.1s' }}>
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
              <div className="text-xs text-slate-500">
                {isDemoUser ? "+7.6%" : "+0%"}
              </div>
            </div>
          </div>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1 rounded-full shadow-green" style={{ width: isDemoUser ? '76%' : '0%' }}></div>
          </div>
        </div>
        
        <div className="metric-card slide-up" style={{ animationDelay: '0.2s' }}>
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
              <div className="text-xs text-slate-500">This month</div>
            </div>
          </div>
          <div className="mt-2 flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="metric-card slide-up" style={{ animationDelay: '0.3s' }}>
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
              <div className="text-xs text-slate-500">This month</div>
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 bg-slate-200 rounded-full h-1">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full shadow-blue" style={{ width: isDemoUser ? '75%' : '0%' }}></div>
            </div>
            <span className="text-xs text-slate-500">75%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-3 space-y-2">
          {isDemoUser ? (
            // Demo User Content
            <>
              {/* Financial Overview */}
              <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="card-header">
                  <h2 className="card-title">Financial Overview</h2>
                  <p className="card-description">Your Dhukuti savings summary</p>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 mb-1">3</div>
                      <div className="text-xs text-slate-600 font-medium">Total Groups</div>
                      <div className="mt-1">
                        <span className="badge badge-success text-xs">+1 this month</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-600 mb-1">12</div>
                      <div className="text-xs text-slate-600 font-medium">Contributions</div>
                      <div className="mt-1">
                        <span className="badge badge-success text-xs">+3 this month</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600 mb-1">$34,000</div>
                      <div className="text-xs text-slate-600 font-medium">Total Balance</div>
                      <div className="mt-1">
                        <span className="badge badge-success text-xs">+7.6% this month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="card slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="card-header">
                  <h3 className="card-title">Recent Activity</h3>
                  <p className="card-description">Latest updates from your community groups</p>
                </div>
                <div className="card-content">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-5 h-5 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800">Bhupen paid contribution for Sydney Nepalese Savers group</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">2 hours ago</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="badge badge-primary text-xs">
                            Sydney Nepalese Savers
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800">New group 'Melbourne Nepalese Community' created</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">1 day ago</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="badge badge-primary text-xs">
                            Melbourne Nepalese Community
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800">Ramesh joined Brisbane Nepalese Buddies group</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">2 days ago</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="badge badge-primary text-xs">
                            Brisbane Nepalese Buddies
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
              <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="card-header">
                  <h2 className="card-title">Welcome to Dhukuti</h2>
                  <p className="card-description">Get started with your first community savings group</p>
                </div>
                <div className="card-content">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-blue">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Groups Yet</h3>
                    <p className="text-slate-600 mb-4 max-w-md mx-auto text-xs">
                      Create your first Dhukuti group to start building financial security with your Nepalese community in Australia.
                    </p>
                    <button className="btn btn-primary btn-sm">
                      Create Your First Group
                    </button>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="card slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="card-header">
                  <h3 className="card-title">Getting Started</h3>
                  <p className="card-description">Learn how traditional Nepalese Dhukuti works</p>
                </div>
                <div className="card-content">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1 text-xs">Create a Group</h4>
                        <p className="text-slate-600 text-xs">Start a new Dhukuti group with your Nepalese friends, family, or community members in Australia.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1 text-xs">Set Contribution Amount</h4>
                        <p className="text-slate-600 text-xs">Decide on a regular contribution amount that works for everyone in your Nepalese community.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-bold text-xs">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1 text-xs">Track & Rotate</h4>
                        <p className="text-slate-600 text-xs">Monitor contributions and rotate payouts among your Nepalese community group members.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="space-y-2">
          {/* Profile Widget */}
          <div className="slide-up" style={{ animationDelay: '0.6s' }}>
            <ProfileWidget />
          </div>

          {/* Quick Actions */}
          <div className="card slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span>Create New Group</span>
                </button>
                <button className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center space-x-2">
                  <div className="w-5 h-5 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span>Find Groups</span>
                </button>
                <button className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center space-x-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span>View Tutorial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 