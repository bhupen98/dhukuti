"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Avatar from "boring-avatars";
import { Notifications } from "@/components/common/Notifications";

export function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Groups", href: "/groups", icon: "👥" },
    { name: "Events", href: "/events", icon: "📅" },
    { name: "Contributions", href: "/contributions", icon: "💰" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsQuickActionsOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          {/* Left - Logo & Navigation */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="text-base font-semibold text-gray-900">Dhukuti</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Search Bar (Professional Style) */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search groups, members, payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xs">🔍</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-0.5">
            {/* Quick Actions */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsQuickActionsOpen(!isQuickActionsOpen);
                  setIsUserMenuOpen(false);
                  setIsNotificationsOpen(false);
                }}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Quick Actions"
              >
                <span className="text-xs">➕</span>
              </button>
              
              {isQuickActionsOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-3 py-1 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
                  </div>
                  <Link
                    href="/groups/create"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsQuickActionsOpen(false)}
                  >
                    <span className="text-xs">➕</span>
                    <span>Create Group</span>
                  </Link>
                  <Link
                    href="/groups/join"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsQuickActionsOpen(false)}
                  >
                    <span className="text-xs">🔗</span>
                    <span>Join Group</span>
                  </Link>
                  <Link
                    href="/contributions/new"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsQuickActionsOpen(false)}
                  >
                    <span className="text-xs">💳</span>
                    <span>Make Payment</span>
                  </Link>
                  <Link
                    href="/reports"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsQuickActionsOpen(false)}
                  >
                    <span className="text-xs">📈</span>
                    <span>View Reports</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsQuickActionsOpen(false);
                  setIsUserMenuOpen(false);
                }}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors relative"
                title="Notifications"
              >
                <span className="text-xs">📢</span>
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              
              <Notifications
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsQuickActionsOpen(false);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Avatar
                  name={session.user?.name || "User"}
                  size={20}
                  variant="beam"
                  colors={["#1a73e8", "#4285f4", "#34a853", "#fbbc04", "#ea4335"]}
                />
                <svg
                  className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{session.user?.name}</div>
                    <div className="text-xs text-gray-500">{session.user?.email}</div>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      👤 Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      ⚙️ Settings
                    </Link>
                    <Link
                      href="/reports"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      📈 Reports
                    </Link>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      🛡️ Admin
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-1.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-0.5 px-2 py-1 rounded text-xs transition-colors ${
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isQuickActionsOpen || isUserMenuOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </nav>
  );
} 