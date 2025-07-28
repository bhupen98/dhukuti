"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Avatar from "boring-avatars";
import { formatCurrency } from "@/lib/utils";

interface UserStats {
  totalGroups: number;
  totalContributions: number;
  totalBalance: number;
}

export function ProfileWidget() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/user/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!session?.user) {
    return null;
  }

  const defaultStats = {
    totalGroups: 3,
    totalContributions: 12,
    totalBalance: 34000,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Profile</h3>
        <p className="card-description">Your account overview</p>
      </div>
      <div className="card-content">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar
            size={48}
            name={session.user.name || session.user.email || "User"}
            variant="beam"
            colors={["#1a73e8", "#4285f4", "#34a853", "#fbbc04", "#ea4335"]}
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">
              {session.user.name}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-blue/10 rounded-lg flex items-center justify-center">
                <span className="text-chart-blue font-medium text-sm">G</span>
              </div>
              <span className="text-sm text-muted-foreground">Groups</span>
            </div>
            <span className="font-medium text-foreground">{displayStats.totalGroups}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-green/10 rounded-lg flex items-center justify-center">
                <span className="text-chart-green font-medium text-sm">C</span>
              </div>
              <span className="text-sm text-muted-foreground">Contributions</span>
            </div>
            <span className="font-medium text-foreground">{displayStats.totalContributions}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-orange/10 rounded-lg flex items-center justify-center">
                <span className="text-chart-orange font-medium text-sm">$</span>
              </div>
              <span className="text-sm text-muted-foreground">Balance</span>
            </div>
            <span className="font-medium text-primary">
              {formatCurrency(displayStats.totalBalance)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Status</span>
            </div>
            <span className="badge badge-primary">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
} 