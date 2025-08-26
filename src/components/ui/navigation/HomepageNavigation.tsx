"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import Logo from "./Logo";

interface NavigationProps {
  isAuthenticated: boolean;
  user?: any;
}

const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, user }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Logo variant="compact" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.displayName}
                </span>
                <Link href="/dashboard" className="btn btn-primary btn-sm">
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm">
                  Join Community
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
