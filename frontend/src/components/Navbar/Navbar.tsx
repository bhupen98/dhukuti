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
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={loggedIn ? "/dashboard" : "/"}
            className="text-blue-700 font-bold text-2xl hover:underline focus:outline-none"
            style={{ letterSpacing: "0.05em" }}
          >
            Dhukuti
          </Link>
          <div className="flex items-center gap-2">
            {/* About: only if NOT logged in */}
            {!loggedIn && (
              <Link
                href="/about"
                className="px-3 py-1 text-gray-700 rounded hover:bg-gray-100 hover:text-blue-700 transition"
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
              >
                <FaBell className="text-2xl text-gray-600" />
              </button>
            )}
            {/* Auth or User Dropdown */}
            {!loggedIn ? (
              <>
                <Link
                  href="/signup"
                  className="px-3 py-1 text-gray-700 rounded hover:bg-gray-100 hover:text-blue-700 transition"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-1 text-blue-700 font-semibold rounded hover:bg-blue-50 transition"
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
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50 py-2 border border-gray-100">
                    <div className="px-4 py-2 text-gray-700 font-bold border-b">
                      {user.name}
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
