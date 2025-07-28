"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface Notification {
  id: string;
  type: "payment" | "member" | "update" | "reminder" | "success" | "warning" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
  groupId?: string;
  groupName?: string;
}

interface RealTimeNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RealTimeNotifications({ isOpen, onClose }: RealTimeNotificationsProps) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!isOpen) return;

    // Simulate connection
    setIsConnected(true);
    
    // Simulate real-time notifications
    const notificationInterval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: getRandomNotificationType(),
        title: getRandomTitle(),
        message: getRandomMessage(),
        timestamp: new Date(),
        read: false,
        priority: getRandomPriority(),
        groupId: "demo-group",
        groupName: "Sydney Savers",
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep max 20 notifications
      setLastUpdate(new Date());
    }, 30000); // New notification every 30 seconds

    return () => {
      clearInterval(notificationInterval);
      setIsConnected(false);
    };
  }, [isOpen]);

  const getRandomNotificationType = (): Notification["type"] => {
    const types: Notification["type"][] = ["payment", "member", "update", "reminder", "success", "warning"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const getRandomTitle = (): string => {
    const titles = [
      "Payment Received",
      "New Member Joined",
      "Meeting Reminder",
      "Group Update",
      "Payment Due",
      "System Maintenance",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomMessage = (): string => {
    const messages = [
      "Sarah Johnson made a contribution of $1,000",
      "Michael Chen joined the Sydney Savers group",
      "Don't forget our meeting tomorrow at 2 PM",
      "Group rules have been updated",
      "Your payment is due in 3 days",
      "System will be down for maintenance tonight",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomPriority = (): Notification["priority"] => {
    const priorities: Notification["priority"][] = ["low", "medium", "high"];
    return priorities[Math.floor(Math.random() * priorities.length)];
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "payment":
        return "💰";
      case "member":
        return "👤";
      case "update":
        return "📢";
      case "reminder":
        return "⏰";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "system":
        return "🔧";
      default:
        return "📌";
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityText = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Normal";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🔔</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Real-time Notifications</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                <span className="text-xs text-gray-400">
                  • Last update: {formatTime(lastUpdate)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🔕</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h4>
              <p className="text-sm text-gray-500">
                New notifications will appear here in real-time
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getPriorityColor(notification.priority)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.title}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              notification.priority === "high" ? "bg-red-100 text-red-800" :
                              notification.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {getPriorityText(notification.priority)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {notification.message}
                          </p>
                          {notification.groupName && (
                            <p className="text-xs text-gray-500 mb-1">
                              Group: {notification.groupName}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500 text-xs"
                            title="Delete notification"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Mark as read
                          </button>
                        )}
                        {notification.actionUrl && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            View Details
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
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {unreadCount} unread • {notifications.length} total
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Settings
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 