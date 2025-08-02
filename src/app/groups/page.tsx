"use client";

import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";

interface Group {
  id: string;
  name: string;
  description: string;
  status: string;
  memberCount: number;
  monthlyContribution: number;
}

export default function GroupsPage() {
  const { session, status } = useAuthGuard();

  // Demo data for demonstration
  const groups: Group[] = [
    {
      id: "1",
      name: "Sydney Nepalese Savers",
      description: "Monthly savings group for Sydney-based Nepalese community",
      status: "Active",
      memberCount: 12,
      monthlyContribution: 500,
    },
    {
      id: "2",
      name: "Melbourne Community Fund",
      description: "Traditional Dhukuti group for Melbourne Nepalese families",
      status: "Active",
      memberCount: 8,
      monthlyContribution: 750,
    },
    {
      id: "3",
      name: "Brisbane Buddies",
      description: "Friendly savings group for Brisbane Nepalese community",
      status: "Forming",
      memberCount: 5,
      monthlyContribution: 600,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "forming":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "completed":
        return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Groups</h1>
              <p className="text-gray-600">
                Manage your savings groups and build community wealth
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/groups/create" className="action-btn action-btn-primary">
                Create Group
              </Link>
              <Link href="/groups/join" className="action-btn action-btn-outline">
                Join Group
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Demo Notice */}
        {session?.user?.email === 'demo@example.com' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> Viewing sample groups. Create a real account to manage your own groups.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Groups Grid */}
        {session?.user?.email === 'demo@example.com' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group, index) => (
              <div key={group.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{group.name}</h3>
                      <p className="text-gray-600 text-xs">{group.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(group.status)}`}>
                      {group.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                        <svg className="w-2 h-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span>{group.memberCount} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                        <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <span>${group.monthlyContribution.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200">
                      <span className="text-gray-600 text-xs">Next meeting:</span>
                      <span className="font-medium text-gray-900 text-xs">Dec 15, 2024</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200">
                      <span className="text-gray-600 text-xs">Total collected:</span>
                      <span className="font-medium text-emerald-600 text-xs">${(group.monthlyContribution * group.memberCount).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200">
                      <span className="text-gray-600 text-xs">Your turn:</span>
                      <span className="font-medium text-amber-600 text-xs">Month 3</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 text-xs">
                      View Details
                    </button>
                    <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md border border-gray-300 transition-all duration-200 text-xs">
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Groups Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">Join or create a savings group to start building wealth with your community</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/groups/create" className="action-btn action-btn-primary">
                Create Your First Group
              </Link>
              <Link href="/groups/join" className="action-btn action-btn-outline">
                Join Existing Group
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 