"use client";

import { useState, useEffect } from "react";
import { useAuthGuard } from "@/lib/hooks/auth/useAuthGuard";
import Link from "next/link";
import { Group, GroupWithMembers } from "@/types";
import { formatCurrency } from "@/lib/utils";

// Mock data for demonstration - replace with real Firebase data
const mockGroups: GroupWithMembers[] = [
  {
    id: "1",
    name: "Sydney Nepalese Savers",
    description: "Monthly savings group for Sydney-based Nepalese community",
    ownerId: "user1",
    maxMembers: 12,
    contributionAmount: 500,
    cycleDuration: 30,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
    isActive: true,
    owner: {
      uid: "user1",
      email: "owner@example.com",
      displayName: "Ram Sharma",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-01"),
      isActive: true,
    },
    members: Array.from({ length: 12 }, (_, i) => ({
      id: `member${i}`,
      userId: `user${i}`,
      groupId: "1",
      joinedAt: new Date("2024-01-01"),
      status: "ACTIVE" as const,
      role: i === 0 ? "OWNER" as const : "MEMBER" as const,
      user: {
        uid: `user${i}`,
        email: `user${i}@example.com`,
        displayName: `User ${i}`,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-01"),
        isActive: true,
      },
      group: {} as Group,
    })),
    contributions: [],
  },
  {
    id: "2",
    name: "Melbourne Community Fund",
    description: "Traditional Dhukuti group for Melbourne Nepalese families",
    ownerId: "user2",
    maxMembers: 8,
    contributionAmount: 750,
    cycleDuration: 30,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-12-01"),
    isActive: true,
    owner: {
      uid: "user2",
      email: "owner2@example.com",
      displayName: "Sita Patel",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-12-01"),
      isActive: true,
    },
    members: Array.from({ length: 8 }, (_, i) => ({
      id: `member${i + 12}`,
      userId: `user${i + 12}`,
      groupId: "2",
      joinedAt: new Date("2024-02-01"),
      status: "ACTIVE" as const,
      role: i === 0 ? "OWNER" as const : "MEMBER" as const,
      user: {
        uid: `user${i + 12}`,
        email: `user${i + 12}@example.com`,
        displayName: `User ${i + 12}`,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-12-01"),
        isActive: true,
      },
      group: {} as Group,
    })),
    contributions: [],
  },
  {
    id: "3",
    name: "Brisbane Buddies",
    description: "Friendly savings group for Brisbane Nepalese community",
    ownerId: "user3",
    maxMembers: 10,
    contributionAmount: 600,
    cycleDuration: 30,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-12-01"),
    isActive: true,
    owner: {
      uid: "user3",
      email: "owner3@example.com",
      displayName: "Gita Thapa",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-12-01"),
      isActive: true,
    },
    members: Array.from({ length: 5 }, (_, i) => ({
      id: `member${i + 20}`,
      userId: `user${i + 20}`,
      groupId: "3",
      joinedAt: new Date("2024-03-01"),
      status: "ACTIVE" as const,
      role: i === 0 ? "OWNER" as const : "MEMBER" as const,
      user: {
        uid: `user${i + 20}`,
        email: `user${i + 20}@example.com`,
        displayName: `User ${i + 20}`,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-01"),
        isActive: true,
      },
      group: {} as Group,
    })),
    contributions: [],
  },
];

export default function GroupsPage() {
  const { session, status } = useAuthGuard();
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
      : "bg-slate-500/20 text-slate-600 border-slate-500/30";
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Active" : "Inactive";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              <div className="h-5 bg-slate-200 rounded w-1/2"></div>
            </div>
            
            {/* Buttons Skeleton */}
            <div className="flex space-x-4">
              <div className="h-10 bg-slate-200 rounded w-32"></div>
              <div className="h-10 bg-slate-200 rounded w-28"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Professional Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Groups</h1>
              <p className="text-sm text-gray-600">
                Manage your savings groups and build community wealth through traditional Dhukuti practices
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                href="/groups/create" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create Group
              </Link>
              <Link 
                href="/groups/join" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Join Group
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Notice for Demo Users */}
        {session?.user?.email === 'demo@example.com' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> Viewing sample groups. Create real groups to start building wealth with your community!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <>
            {/* Quick Stats */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <div className="text-xl font-bold text-red-600">{groups.length}</div>
                  <div className="text-xs text-gray-600 font-medium">Active Groups</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {groups.reduce((total, group) => total + group.members.length, 0)}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Total Members</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(groups.reduce((total, group) => total + (group.contributionAmount * group.members.length), 0))}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Total Pool</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <div className="text-xl font-bold text-amber-600">3</div>
                  <div className="text-xs text-gray-600 font-medium">Upcoming Events</div>
                </div>
              </div>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div 
                  key={group.id} 
                  className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {group.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {group.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(group.isActive)}`}>
                        {getStatusText(group.isActive)}
                      </span>
                    </div>
                    
                    {/* Group Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-lg font-bold text-gray-900">{group.members.length}</div>
                        <div className="text-xs text-gray-600 font-medium">Members</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm font-bold text-gray-900">{formatCurrency(group.contributionAmount)}</div>
                        <div className="text-xs text-gray-600 font-medium">Monthly</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-600 text-xs font-medium">Next meeting:</span>
                        <span className="font-medium text-gray-900 text-xs">Dec 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-600 text-xs font-medium">Total collected:</span>
                        <span className="font-medium text-green-600 text-xs">
                          {formatCurrency(group.contributionAmount * group.members.length)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-600 text-xs font-medium">Your turn:</span>
                        <span className="font-medium text-blue-600 text-xs">Month 3</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity & Upcoming Events */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg border-2 border-slate-200 p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-2 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900">Payment received from Ram Sharma</p>
                      <p className="text-xs text-slate-500">Sydney Nepalese Savers • 2 hours ago</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600">$500</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 p-2 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900">New member joined Brisbane Buddies</p>
                      <p className="text-xs text-slate-500">Brisbane Buddies • 1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 p-2 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900">Monthly meeting scheduled</p>
                      <p className="text-xs text-slate-500">Melbourne Community Fund • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg border-2 border-slate-200 p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-red-900 text-sm">Monthly Meeting</h4>
                      <span className="text-xs font-medium text-red-700 bg-red-200 px-2 py-0.5 rounded-full">Today</span>
                    </div>
                    <p className="text-xs text-red-800 mb-1">Sydney Nepalese Savers</p>
                    <p className="text-xs text-red-600">7:00 PM • Community Center</p>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-blue-900 text-sm">Contribution Due</h4>
                      <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-0.5 rounded-full">Tomorrow</span>
                    </div>
                    <p className="text-xs text-blue-800 mb-1">Melbourne Community Fund</p>
                    <p className="text-xs text-blue-600">Amount: $750</p>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-green-900 text-sm">Group Formation</h4>
                      <span className="text-xs font-medium text-green-700 bg-green-200 px-2 py-0.5 rounded-full">Dec 20</span>
                    </div>
                    <p className="text-xs text-green-800 mb-1">New Brisbane Group</p>
                    <p className="text-xs text-green-600">Initial planning meeting</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Groups Yet</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm">
                Join or create a savings group to start building wealth with your community through traditional Dhukuti practices
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/groups/create" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-red-600 hover:border-red-700 text-sm"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Your First Group
                </Link>
                <Link 
                  href="/groups/join" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-slate-300 hover:border-slate-400 text-sm"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Browse Groups
                </Link>
              </div>
            </div>

            {/* Helpful Information Section */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">How Dhukuti Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Join a Group</h4>
                  <p className="text-slate-600 text-sm">
                    Find an existing Dhukuti group or create your own with trusted community members
                  </p>
                </div>
                
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Monthly Contributions</h4>
                  <p className="text-slate-600 text-sm">
                    Contribute your agreed amount monthly to build the group's savings pool
                  </p>
                </div>
                
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Receive Your Turn</h4>
                  <p className="text-slate-600 text-sm">
                    When your turn comes, receive the entire pool to use for your needs
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 