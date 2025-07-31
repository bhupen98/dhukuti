"use client";

import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAdminGuard";
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
        return "bg-emerald-100 text-emerald-800";
      case "forming":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-5 w-5 mx-auto"></div>
          <p className="mt-2 text-slate-600 text-xs">Loading groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-base font-bold text-slate-900">My Groups</h1>
        <p className="text-slate-600 mt-0.5 text-xs">Manage your savings groups and contributions</p>
      </div>

      {/* Demo Notice */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 text-xs mr-1.5">💡</span>
            <div>
              <p className="text-blue-800 font-medium text-xs">Demo Mode Active</p>
              <p className="text-blue-700 text-xs">You're viewing sample groups and data. Try the chat and payment features!</p>
            </div>
          </div>
        </div>
      )}

      {/* Groups Grid */}
      {session?.user?.email === 'demo@example.com' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {groups.map((group) => (
            <div key={group.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-3 border-b border-slate-100">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{group.name}</h3>
                    <p className="text-xs text-slate-600">{group.description}</p>
                  </div>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(group.status)}`}>
                    {group.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span>👥 {group.memberCount} members</span>
                  <span>💰 ${group.monthlyContribution.toLocaleString()}/month</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Next meeting:</span>
                    <span className="font-medium text-slate-800">Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Total collected:</span>
                    <span className="font-medium text-emerald-600">${(group.monthlyContribution * group.memberCount).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Your turn:</span>
                    <span className="font-medium text-blue-600">Month 3</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex space-x-1">
                  <button className="btn btn-primary btn-sm flex-1">
                    View Details
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-slate-400 text-3xl mb-2">👥</div>
          <h3 className="text-sm font-medium text-slate-900 mb-1">No groups yet</h3>
          <p className="text-slate-600 mb-3 text-xs">Join or create a savings group to get started</p>
          <div className="space-x-1.5">
            <Link href="/groups/create" className="btn btn-primary btn-sm">
              Create Group
            </Link>
            <Link href="/groups/join" className="btn btn-outline btn-sm">
              Join Group
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Only show when user has groups */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mt-4 flex justify-center space-x-2">
          <Link href="/groups/create" className="btn btn-primary btn-sm">
            Create New Group
          </Link>
          <Link href="/groups/join" className="btn btn-outline btn-sm">
            Find Groups
          </Link>
        </div>
      )}
    </div>
  );
} 