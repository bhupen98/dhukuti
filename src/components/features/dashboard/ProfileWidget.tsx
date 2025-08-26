"use client";

import React from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { formatCurrency } from "@/lib/utils";

interface UserStats {
  totalGroups: number;
  totalContributions: number;
  balance: number;
}

export function ProfileWidget() {
  const { user } = useAuth();
  const [stats, setStats] = React.useState<UserStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Replace with Firebase data fetching
    // const fetchStats = async () => {
    //   try {
    //     const response = await fetch('/api/user/stats');
    //     if (response.ok) {
    //       const data = await response.json();
    //       setStats(data.data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user stats:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchStats();
    setLoading(false);
  }, []);

  if (!user) {
    return null;
  }

  const defaultStats = {
    totalGroups: 3,
    totalContributions: 12,
    balance: 34000,
  };

  const displayStats = stats || defaultStats;

  // Simple avatar with initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarInitials = user.displayName ? getInitials(user.displayName) : 'U';

  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-red-600">{avatarInitials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate text-base">
              {user.displayName || 'User'}
            </h4>
            <p className="text-sm text-gray-600 truncate">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Groups</span>
            </div>
            <span className="font-semibold text-gray-900 text-base">{displayStats.totalGroups}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Contributions</span>
            </div>
            <span className="font-semibold text-gray-900 text-base">{displayStats.totalContributions}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-200 border border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Balance</span>
            </div>
            <span className="font-semibold text-red-600 text-base">
              {formatCurrency(displayStats.balance)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">Status</span>
            </div>
            <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 