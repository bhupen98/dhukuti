"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { DashboardStats } from "@/types";

export function SummaryCard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Financial Overview</h2>
        </div>
        <div className="card-content">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-8 bg-muted rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const defaultStats = {
    totalGroups: 3,
    totalContributions: 12,
    balance: 34000,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Financial Overview</h2>
        <p className="card-description">Your Dhukuti savings summary</p>
      </div>
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="metric-value text-chart-blue">{displayStats.totalGroups}</div>
            <div className="metric-label">Total Groups</div>
            <div className="mt-2">
              <span className="metric-change positive text-sm">+1 this month</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="metric-value text-chart-green">{displayStats.totalContributions}</div>
            <div className="metric-label">Contributions</div>
            <div className="mt-2">
              <span className="metric-change positive text-sm">+3 this month</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="metric-value text-chart-orange">{formatCurrency(displayStats.balance || 0)}</div>
            <div className="metric-label">Total Balance</div>
            <div className="mt-2">
              <span className="metric-change positive text-sm">+7.6% this month</span>
            </div>
          </div>
        </div>
        
        {/* Simple Chart Placeholder */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-normal">Monthly Trend</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">1M</button>
              <button className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-md">3M</button>
              <button className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-md">6M</button>
            </div>
          </div>
          <div className="h-32 bg-muted rounded-lg flex items-end justify-between p-4">
            {[20, 35, 25, 45, 30, 50, 40].map((height, index) => (
              <div
                key={index}
                className="bg-primary rounded-t"
                style={{ height: `${height}%`, width: '8%' }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 