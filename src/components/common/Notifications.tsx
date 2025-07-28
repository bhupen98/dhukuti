"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Notifications({ isOpen, onClose }: NotificationsProps) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (session?.user?.email === 'demo@example.com') {
      // Demo notifications
      setNotifications([
        {
          id: "1",
          type: "success",
          title: "Payment Received",
          message: "Your contribution of ₹3,000 has been received for Family Savings group.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          action: { label: "View Details", href: "/contributions" }
        },
        {
          id: "2",
          type: "info",
          title: "Group Update",
          message: "Business Group has reached 85% completion. Great progress!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          action: { label: "View Group", href: "/groups" }
        },
        {
          id: "3",
          type: "warning",
          title: "Payment Reminder",
          message: "Your monthly contribution for Community Fund is due in 3 days.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: true,
          action: { label: "Make Payment", href: "/contributions/new" }
        },
        {
          id: "4",
          type: "success",
          title: "Goal Achieved",
          message: "Congratulations! You've reached your emergency fund goal of ₹50,000.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
          action: { label: "View Report", href: "/reports" }
        },
        {
          id: "5",
          type: "info",
          title: "New Member",
          message: "Sarah Johnson has joined your Family Savings group.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          read: true
        }
      ]);
    }
  }, [session]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const filteredNotifications = activeTab === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100 px-3 py-1">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-1 px-1 border-b-2 font-medium text-xs ${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-1 px-1 border-b-2 font-medium text-xs ${
              activeTab === "unread"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </nav>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-gray-400 text-2xl mb-2">🔔</div>
            <p className="text-gray-500 text-xs">
              {activeTab === "unread" ? "No unread notifications" : "No notifications yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      {notification.action && (
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-100">
          <button
            onClick={() => window.location.href = "/notifications"}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-left"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
} 