"use client";

import React, { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";
import { ActivityItem } from "@/types";

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activity');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="card-content">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const defaultActivities = [
    {
      id: "1",
      type: "CONTRIBUTION_PAID",
      message: "Bhupen paid contribution for Sydney Savers group",
      timestamp: new Date().toISOString(),
      user: {
        name: "Bhupen Thapa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bhupen"
      },
      group: {
        name: "Sydney Savers"
      }
    },
    {
      id: "2", 
      type: "GROUP_CREATED",
      message: "New group 'Melbourne Money' created",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      user: {
        name: "Asha Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=asha"
      },
      group: {
        name: "Melbourne Money"
      }
    },
    {
      id: "3",
      type: "MEMBER_JOINED", 
      message: "Ramesh joined Brisbane Buddies group",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      user: {
        name: "Ramesh Kumar",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh"
      },
      group: {
        name: "Brisbane Buddies"
      }
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "CONTRIBUTION_PAID":
        return "💰";
      case "GROUP_CREATED":
        return "🏗️";
      case "MEMBER_JOINED":
        return "👋";
      case "MESSAGE_SENT":
        return "💬";
      default:
        return "📝";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "CONTRIBUTION_PAID":
        return "bg-success-light text-success";
      case "GROUP_CREATED":
        return "bg-info-light text-info";
      case "MEMBER_JOINED":
        return "bg-warning-light text-warning";
      case "MESSAGE_SENT":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <p className="card-description">Latest updates from your groups</p>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDateTime(activity.timestamp)}
                  </span>
                  {activity.group && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {activity.group.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  );
} 