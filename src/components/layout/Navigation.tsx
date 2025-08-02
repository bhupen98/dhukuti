"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Avatar from "boring-avatars";
import { dhukutiToast } from "@/lib/toast";

export function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Groups", href: "/groups", icon: "👥" },
    { name: "Events", href: "/events", icon: "📅" },
    { name: "Contributions", href: "/contributions", icon: "💰" },
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
      await signOut({ callbackUrl: "/" });
      dhukutiToast.logoutSuccess();
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

  if (!session) {
    return null;
  }



  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-5xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Left - Logo & Navigation */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-6 h-6 theme-blue rounded-lg flex items-center justify-center shadow-clean group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-gradient-blue">Dhukuti</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link-compact ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span className="text-xs">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-xl mx-4" data-dropdown="search">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search groups, members, payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-compact w-full pl-8 pr-3 bg-white border-slate-300 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Right - Actions & User Menu */}
          <div className="flex items-center space-x-1.5">
            {/* Quick Actions */}
            <div className="relative" data-dropdown="quick-actions">
              <button
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              
              {isQuickActionsOpen && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-xl border border-slate-200/50 shadow-clean py-1">
                  <Link href="/groups/create" className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    Create Group
                  </Link>
                  <Link href="/events/create" className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    Create Event
                  </Link>
                  <Link href="/contributions/new" className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    Add Contribution
                  </Link>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" data-dropdown="notifications">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors group relative"
              >
                <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 glass rounded-xl border border-slate-200/50 shadow-clean py-2">
                  <div className="px-3 py-2 border-b border-slate-200">
                    <h3 className="text-xs font-semibold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-3 py-2 hover:bg-slate-50 transition-colors">
                      <p className="text-xs text-slate-700">New contribution received</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                    <div className="px-3 py-2 hover:bg-slate-50 transition-colors">
                      <p className="text-xs text-slate-700">Group meeting scheduled</p>
                      <p className="text-xs text-slate-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" data-dropdown="user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <Avatar
                  size={28}
                  name={session.user?.name || session.user?.email || "User"}
                  colors={["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"]}
                  variant="beam"
                />
                <svg className="w-3 h-3 text-slate-600 group-hover:text-slate-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 glass rounded-xl border border-slate-200/50 shadow-clean py-2">
                  {/* User Info */}
                  <div className="px-3 py-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2.5">
                      <Avatar
                        size={32}
                        name={session.user?.name || session.user?.email || "User"}
                        colors={["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"]}
                        variant="beam"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    
                  </div>
                  
                  {/* Menu Items */}
                  <Link href="/profile" className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    Profile
                  </Link>
                  <div className="border-t border-slate-200 my-1"></div>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {isSigningOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 