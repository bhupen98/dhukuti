"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { ProfileWidget } from "@/components/features/dashboard/ProfileWidget";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-56 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const isDemoUser = user.email === 'demo@example.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.displayName?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Here's your Dhukuti community overview and financial progress.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.push('/groups/create')}
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Group
              </button>
              <button 
                onClick={() => router.push('/groups')}
                className="btn btn-secondary btn-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                View Groups
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Demo Notice */}
        {isDemoUser && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Demo Mode:</span> You're viewing sample data. Create a real account to manage your own Dhukuti groups and track your actual financial progress.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-stats p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-bold text-2xl">
                  {isDemoUser ? "$2,400" : "$0"}
                </div>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Contributions</h3>
            <p className="text-sm text-gray-600">This month</p>
          </div>

          <div className="card-stats p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-bold text-2xl">
                  {isDemoUser ? "3" : "0"}
                </div>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Active Groups</h3>
            <p className="text-sm text-gray-600">You're part of</p>
          </div>

          <div className="card-stats p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-purple-600 font-bold text-2xl">
                  {isDemoUser ? "$8,500" : "$0"}
                </div>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Total Savings</h3>
            <p className="text-sm text-gray-600">Accumulated</p>
          </div>

          <div className="card-stats p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-orange-600 font-bold text-2xl">
                  {isDemoUser ? "2" : "0"}
                </div>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Events</h3>
            <p className="text-sm text-gray-600">This week</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <button 
                    onClick={() => router.push('/contributions')}
                    className="btn btn-ghost btn-sm"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {isDemoUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-200">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Contribution received</p>
                        <p className="text-sm text-gray-600">Sydney Nepali Community • 2 hours ago</p>
                      </div>
                      <div className="text-lg font-bold text-green-600">+$500</div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">New message</p>
                        <p className="text-sm text-gray-600">Melbourne Students Group • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-200 border border-purple-200">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Group meeting scheduled</p>
                        <p className="text-sm text-gray-600">Brisbane Business Network • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
                    <p className="text-gray-600 mb-6">Join a Dhukuti group to start seeing your financial activity here</p>
                    <button 
                      onClick={() => router.push('/groups')}
                      className="btn btn-primary"
                    >
                      Browse Groups
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => router.push('/groups/create')}
                    className="flex items-center space-x-4 p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">Create Group</p>
                      <p className="text-xs text-gray-600">Start a new Dhukuti group</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => router.push('/groups')}
                    className="flex items-center space-x-4 p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-200">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">Join Group</p>
                      <p className="text-xs text-gray-600">Find and join a group</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => router.push('/events/create')}
                    className="flex items-center space-x-4 p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-200">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">Schedule Event</p>
                      <p className="text-xs text-gray-600">Create a community event</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => router.push('/reports')}
                    className="flex items-center space-x-4 p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-200">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">View Reports</p>
                      <p className="text-xs text-gray-600">Financial analytics</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Widget */}
            <ProfileWidget />

            {/* Upcoming Events */}
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Events</h2>
                  <button 
                    onClick={() => router.push('/events')}
                    className="btn btn-ghost btn-sm"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {isDemoUser ? (
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 cursor-pointer" onClick={() => router.push('/events/1')}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">Community</span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">Upcoming</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Dec 15</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Sydney Nepalese Community Meetup</h3>
                      <p className="text-xs text-gray-600 mb-3">Monthly gathering for Sydney-based Nepalese community members</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Sydney Community Center</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">From $15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">45/60 attending</span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 border-2 border-red-600/20 rounded-xl hover:border-red-600/40 hover:bg-red-50 transition-all duration-200 cursor-pointer" onClick={() => router.push('/events/2')}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">Workshop</span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">Upcoming</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Dec 20</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Dhukuti Group Formation Workshop</h3>
                      <p className="text-xs text-gray-600 mb-3">Learn how to start and manage your own Dhukuti savings group</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Melbourne Library</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">$25</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">12/20 attending</span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">No upcoming events</h3>
                    <p className="text-xs text-gray-600 mb-4">Events from your groups will appear here</p>
                    <button 
                      onClick={() => router.push('/events')}
                      className="btn btn-outline btn-sm"
                    >
                      Browse Events
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Stats</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Groups</span>
                  <span className="text-sm font-semibold text-gray-900">{isDemoUser ? "3" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Members</span>
                  <span className="text-sm font-semibold text-gray-900">{isDemoUser ? "24" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Upcoming Events</span>
                  <span className="text-sm font-semibold text-blue-600">{isDemoUser ? "3" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Events Attending</span>
                  <span className="text-sm font-semibold text-green-600">{isDemoUser ? "2" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-semibold text-green-600">{isDemoUser ? "+$2,400" : "$0"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Next Payout</span>
                  <span className="text-sm font-semibold text-blue-600">{isDemoUser ? "Dec 25" : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 