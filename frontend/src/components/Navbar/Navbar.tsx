// -----------------------------------------------------------------------------
// File: Navbar.tsx
// Description: Main top navigation bar for the Dhukuti app.
//              Handles authentication state, user dropdown, and navigation links.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------
"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import Avatar from "boring-avatars";


export default function Navbar() {
  // ---------------------------------------------------------------------------
  // State: Authentication, dropdown, router, and user info
  // ---------------------------------------------------------------------------
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Demo user info (replace with your actual logic)
  const user = {
    name: "Bhupen Thapa",
    email: "bhupen@email.com",
  };

  // ---------------------------------------------------------------------------
  // Effect: Check login state on mount and on route change
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
  // Render: Main navigation bar
  // ---------------------------------------------------------------------------
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={loggedIn ? "/dashboard" : "/"}
            className="text-blue-700 font-extrabold text-2xl tracking-wide hover:underline focus:outline-none"
            style={{ letterSpacing: "0.08em", fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
          >
            Dhukuti
          </Link>
          <div className="flex items-center gap-2">
            {/* About: only if NOT logged in */}
            {!loggedIn && (
              <Link
                href="/about"
                className="px-3 py-1 text-gray-700 rounded hover:bg-gray-100 hover:text-blue-700 transition font-medium"
                style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
              >
                About
              </Link>
            )}
            {/* Notification bell for development (no logic) */}
            {loggedIn && (
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Notifications"
                type="button"
                style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
              >
                <FaBell className="text-2xl text-gray-600" />
              </button>
            )}
            {/* Auth or User Dropdown */}
            {!loggedIn ? (
              <>
                <Link
                  href="/signup"
                  className="px-3 py-1 text-gray-700 rounded hover:bg-gray-100 hover:text-blue-700 transition font-medium"
                  style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-1 text-blue-700 font-semibold rounded hover:bg-blue-50 transition font-bold"
                  style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                >
                  Log In
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Profile"
                  style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                >
                  <Avatar name={user.name} size={36} round={36} />
                  {/* Chevron */}
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
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 py-4 border border-gray-100 flex flex-col items-center" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                    {/* Profile Card */}
                    <div className="flex flex-col items-center w-full px-6 pb-4 border-b border-gray-100">
                      <Avatar name={user.name} size={48} round={48} className="mb-2" />
                      <span className="font-extrabold text-lg text-blue-900 mb-1">{user.name}</span>
                      <span className="text-xs text-gray-500 mb-2">{user.email}</span>
                      <div className="flex gap-4 text-xs text-gray-600 mb-2">
                        <span className="flex items-center gap-1"><span role="img" aria-label="role">🧑‍💼</span> Member</span>
                        <span className="flex items-center gap-1"><span role="img" aria-label="since">📅</span> Since 2024</span>
                      </div>
                      <span className="text-xs text-gray-400 italic">View and edit your profile details</span>
                    </div>
                    <Link
                      href="/profile"
                      className="block w-full px-6 py-3 text-blue-700 font-bold hover:bg-blue-50 text-center transition"
                      onClick={() => setDropdownOpen(false)}
                      style={{ fontFamily: 'inherit' }}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-3 text-left text-red-600 font-bold hover:bg-red-50 transition"
                      style={{ fontFamily: 'inherit' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
