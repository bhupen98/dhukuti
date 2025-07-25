
// -----------------------------------------------------------------------------
// File: Navbar.tsx
// Description: Modern, responsive navigation bar for Dhukuti app.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------
"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import Avatar from "boring-avatars";

export default function Navbar() {
  // ---------------------------------------------------------------------------
  // State: Auth, dropdown, mobile menu, router, and user info
  // ---------------------------------------------------------------------------
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Demo user info (replace with your actual logic)
  const user = {
    name: "Bhupen Thapa",
    email: "bhupen@email.com",
  };

  // ---------------------------------------------------------------------------
  // Effect: Check login status and update on navigation/storage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    function checkToken() {
      setLoggedIn(!!localStorage.getItem("token"));
    }
    checkToken();
    window.addEventListener("storage", checkToken);

    const origPush = router.push;
    router.push = (...args) => {
      setTimeout(checkToken, 0);
      return origPush.apply(router, args);
    };

    return () => {
      window.removeEventListener("storage", checkToken);
      router.push = origPush;
    };
  }, [router]);

  // ---------------------------------------------------------------------------
  // Effect: Close dropdown when clicking outside
  // ---------------------------------------------------------------------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // ---------------------------------------------------------------------------
  // Handler: Logout user
  // ---------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setDropdownOpen(false);
    router.push("/login");
  };

  // ---------------------------------------------------------------------------
  // Render: Navbar UI and logic
  // ---------------------------------------------------------------------------
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo with finance emoji and gradient text */}
        <Link
          href={loggedIn ? "/dashboard" : "/"}
          className="font-bold text-2xl font-serif focus:outline-none flex items-center gap-2 text-gray-900 hover:text-red-700 transition-colors duration-150"
        >
          <span role="img" aria-label="finance" className="text-2xl">💰</span>
          Dhukuti
        </Link>
        {/* Main Links (hidden on mobile) */}
        <div className="hidden md:flex gap-6 ml-8">
          <Link href="/dashboard" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150">Dashboard</Link>
          <Link href="/groups" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150">Groups</Link>
          <Link href="/dashboard/groups/create" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150">Create Group</Link>
          <Link href="/help" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150">Help</Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <button aria-label="Notifications" className="relative p-2 hover:bg-gray-100 focus:outline-none">
                <FaBell className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center p-1 hover:bg-gray-100 focus:outline-none"
                  aria-label="Profile"
                >
                  <Avatar name={user.name} size={32} round={32} />
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg z-50 py-2 border border-gray-100">
                    <div className="px-4 py-2 text-gray-700 font-bold border-b">
                      {user.name}
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/signup" className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded transition">
                Sign Up
              </Link>
              <Link href="/login" className="px-2 py-1 text-red-700 font-semibold hover:bg-gray-100 rounded transition">
                Log In
              </Link>
            </>
          )}
          {/* Hamburger for mobile */}
          <button className="md:hidden ml-2 p-2 hover:bg-gray-100" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
            <FaBars className="text-xl text-gray-700" />
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg p-6 flex flex-col gap-6 animate-slide-in border-l border-gray-200" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-2" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes className="text-2xl text-gray-700" />
            </button>
            <Link href="/dashboard" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/dashboard'); }}>Dashboard</Link>
            <Link href="/groups" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/groups'); }}>Groups</Link>
            <Link href="/dashboard/groups/create" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/dashboard/groups/create'); }}>Create Group</Link>
            <Link href="/help" className="text-gray-700 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors duration-150" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/help'); }}>Help</Link>
            {!loggedIn ? (
              <>
                <Link href="/signup" className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded transition" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/signup'); }}>
                  Sign Up
                </Link>
                <Link href="/login" className="px-2 py-1 text-red-700 font-semibold hover:bg-gray-100 rounded transition" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/login'); }}>
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={e => { e.preventDefault(); setMobileMenuOpen(false); router.push('/profile'); }}>
                  Profile
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
