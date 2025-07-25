
// -----------------------------------------------------------------------------
// File: SidebarNav.tsx
// Description: Full-featured sidebar navigation for Dhukuti app dashboard.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------

import Link from "next/link";
import { FaHome, FaUsers, FaPlusCircle, FaBell, FaUserCircle, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";


/**
 * SidebarNav Component
 * Renders the sidebar navigation for the dashboard, including links to main sections.
 */
export default function SidebarNav() {
  return (
    <aside className="hidden md:flex flex-col bg-white shadow-lg rounded-2xl p-6 w-60 h-[calc(100vh-32px)] sticky top-4 gap-8">
      {/* App Logo */}
      <Link href="/dashboard" className="font-bold text-blue-700 text-2xl mb-4">
        Dhukuti
      </Link>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 flex-1">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
          <FaHome /> Dashboard
        </Link>
        <Link href="/groups" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
          <FaUsers /> My Groups
        </Link>
        <Link href="/groups/create" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
          <FaPlusCircle /> Create Group
        </Link>
        <Link href="/notifications" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
          <FaBell /> Notifications
        </Link>
        <Link href="/help" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
          <FaQuestionCircle /> Help
        </Link>
      </nav>
      {/* Profile and Logout */}
      <div>
        <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 mb-2 font-medium">
          <FaUserCircle /> Profile
        </Link>
        <Link href="/logout" className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </aside>
  );
}
