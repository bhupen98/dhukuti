"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { signOutUser } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { dhukutiToast } from "@/lib/toast";

export function Navigation() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navigation = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      )
    },
    { 
      name: "Groups", 
      href: "/groups", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      name: "Events", 
      href: "/events", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "Contributions", 
      href: "/contributions", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    try {
      setIsSigningOut(true);
      console.log("Signing out user...");
      const result = await signOutUser();
      if (result.success) {
        dhukutiToast.logoutSuccess();
        // Redirect to home page after successful logout
        window.location.href = "/";
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error during sign out:", error);
      dhukutiToast.error("Failed to sign out. Please try again.");
      setIsSigningOut(false);
    }
  };

  const closeAllDropdowns = () => {
    setIsQuickActionsOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      const isOutsideQuickActions = !target.closest('[data-dropdown="quick-actions"]');
      const isOutsideUserMenu = !target.closest('[data-dropdown="user-menu"]');
      const isOutsideNotifications = !target.closest('[data-dropdown="notifications"]');
      const isOutsideSearch = !target.closest('[data-dropdown="search"]');
      
      if (!isOutsideQuickActions || !isOutsideUserMenu || !isOutsideNotifications || !isOutsideSearch) {
        return;
      }
      
      closeAllDropdowns();
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left - Logo & Navigation */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">Dhukuti</span>
                <span className="text-xs text-gray-500 -mt-0.5">Community Savings</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-link flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-red-50 text-red-700 border border-red-200" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right - Search, Notifications, User Menu */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative" data-dropdown="search">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="relative" data-dropdown="quick-actions">
              <button
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>

              {isQuickActionsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md border border-gray-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/groups/create"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Create New Group
                    </Link>
                    <Link
                      href="/events/create"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Create Event
                    </Link>
                    <Link
                      href="/contributions/new"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Record Payment
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" data-dropdown="notifications">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v4.5l2.25 2.25a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25L3 14.25V9.75a6 6 0 0 1 6-6z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md border border-gray-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="py-2 max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">New contribution received in Sydney Nepali Community</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Your payout is scheduled for next week</p>
                          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">New event: Community Dinner</p>
                          <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link href="/notifications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" data-dropdown="user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-red-600">{avatarInitials}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md border border-gray-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>

                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <svg className="h-4 w-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {isSigningOut ? "Signing out..." : "Sign out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 