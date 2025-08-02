"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ProfileWidget } from "@/components/features/dashboard/ProfileWidget";

export default function DashboardPage() {
  const { session, status } = useAuthGuard();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isDemoUser = session.user?.email === 'demo@example.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back, {session.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">
                Here's your Dhukuti overview.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => router.push('/groups/create')}
                className="action-btn action-btn-primary"
              >
                Create Group
              </button>
              <button 
                onClick={() => router.push('/groups')}
                className="action-btn action-btn-outline"
              >
                View Groups
              </button>
            </div>
          </div>
        </div>

        {/* Compact Demo Notice */}
        {isDemoUser && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> Viewing sample data. Create a real account to manage your own groups.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Compact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-bold text-lg">
                  {isDemoUser ? "$2,400" : "$0"}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Contributions</h3>
            <p className="text-xs text-gray-500">This month</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-bold text-lg">
                  {isDemoUser ? "3" : "0"}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Active Groups</h3>
            <p className="text-xs text-gray-500">You're part of</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-purple-600 font-bold text-lg">
                  {isDemoUser ? "$8,500" : "$0"}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Total Savings</h3>
            <p className="text-xs text-gray-500">Accumulated</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-orange-600 font-bold text-lg">
                  {isDemoUser ? "2" : "0"}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Events</h3>
            <p className="text-xs text-gray-500">This week</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <button 
                    onClick={() => router.push('/contributions')}
                    className="nav-btn nav-btn-ghost"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-4">
                {isDemoUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Contribution received</p>
                        <p className="text-xs text-gray-500">Sydney Nepali Community • 2 hours ago</p>
                      </div>
                      <div className="text-sm font-semibold text-green-600">+$500</div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New message</p>
                        <p className="text-xs text-gray-500">Melbourne Students Group • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Group meeting scheduled</p>
                        <p className="text-xs text-gray-500">Brisbane Business Network • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">No activity yet</h3>
                    <p className="text-gray-600 mb-4">Join a group to start seeing your activity here</p>
                    <button 
                      onClick={() => router.push('/groups')}
                      className="action-btn action-btn-primary"
                    >
                      Browse Groups
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button 
                    onClick={() => router.push('/groups/create')}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="space-y-4">
            {/* Profile Widget */}
            <ProfileWidget />

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Events</h2>
                  <button 
                    onClick={() => router.push('/events')}
                    className="nav-btn nav-btn-ghost"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-4">
                {isDemoUser ? (
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push('/events/1')}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">Community</span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">Upcoming</span>
                        </div>
                        <span className="text-xs text-gray-500">Dec 15</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Sydney Nepalese Community Meetup</h3>
                      <p className="text-xs text-gray-600 mb-2">Monthly gathering for Sydney-based Nepalese community members</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Sydney Community Center</span>
                        </div>
                        <span className="text-xs font-medium text-green-600">From $15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">45/60 attending</span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push('/events/2')}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">Workshop</span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">Upcoming</span>
                        </div>
                        <span className="text-xs text-gray-500">Dec 20</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Dhukuti Group Formation Workshop</h3>
                      <p className="text-xs text-gray-600 mb-2">Learn how to start and manage your own Dhukuti savings group</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Melbourne Library</span>
                        </div>
                        <span className="text-xs font-medium text-green-600">$25</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">12/20 attending</span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push('/events/3')}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800 border border-pink-200">Cultural</span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">Upcoming</span>
                        </div>
                        <span className="text-xs text-gray-500">Dec 22</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Traditional Nepalese Cooking Class</h3>
                      <p className="text-xs text-gray-600 mb-2">Learn to cook authentic dal bhat, momo, and other Nepalese dishes</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Perth Community Kitchen</span>
                        </div>
                        <span className="text-xs font-medium text-green-600">From $15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">18/25 attending</span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">No upcoming events</h3>
                    <p className="text-xs text-gray-600 mb-3">Events from your groups will appear here</p>
                    <button 
                      onClick={() => router.push('/events')}
                      className="action-btn action-btn-outline"
                    >
                      Browse Events
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Stats</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">Groups</span>
                  <span className="text-sm font-semibold text-gray-900">{isDemoUser ? "3" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">Members</span>
                  <span className="text-sm font-semibold text-gray-900">{isDemoUser ? "24" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">Upcoming Events</span>
                  <span className="text-sm font-semibold text-blue-600">{isDemoUser ? "3" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">Events Attending</span>
                  <span className="text-sm font-semibold text-green-600">{isDemoUser ? "2" : "0"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-semibold text-green-600">{isDemoUser ? "+$2,400" : "$0"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
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