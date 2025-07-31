"use client";

import React, { useState, useEffect } from 'react';

interface SecurityEvent {
  id: string;
  timestamp: string;
  ipAddress: string;
  action: string;
  success: boolean;
  userAgent: string;
}

interface SecurityStats {
  totalAttempts: number;
  successfulLogins: number;
  failedAttempts: number;
  blockedIPs: number;
  lastLogin: string;
}

export function AdminSecurityDashboard() {
  const [securityStats, setSecurityStats] = useState<SecurityStats>({
    totalAttempts: 0,
    successfulLogins: 0,
    failedAttempts: 0,
    blockedIPs: 0,
    lastLogin: 'Never'
  });
  const [recentEvents, setRecentEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In production, fetch real data from API
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demo
      setSecurityStats({
        totalAttempts: 47,
        successfulLogins: 12,
        failedAttempts: 35,
        blockedIPs: 3,
        lastLogin: new Date().toLocaleString()
      });

      setRecentEvents([
        {
          id: '1',
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.100',
          action: 'SUCCESS',
          success: true,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          ipAddress: '203.45.67.89',
          action: 'INVALID_TOKEN',
          success: false,
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          ipAddress: '192.168.1.100',
          action: 'RATE_LIMITED',
          success: false,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      ]);
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'SUCCESS':
        return 'text-green-600 bg-green-50';
      case 'INVALID_TOKEN':
      case 'RATE_LIMITED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'SUCCESS':
        return '✅';
      case 'INVALID_TOKEN':
        return '❌';
      case 'RATE_LIMITED':
        return '⏰';
      default:
        return 'ℹ️';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{securityStats.totalAttempts}</div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{securityStats.successfulLogins}</div>
            <div className="text-sm text-gray-600">Successful Logins</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{securityStats.failedAttempts}</div>
            <div className="text-sm text-gray-600">Failed Attempts</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{securityStats.blockedIPs}</div>
            <div className="text-sm text-gray-600">Blocked IPs</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-gray-900">Last Login</div>
            <div className="text-xs text-gray-600">{securityStats.lastLogin}</div>
          </div>
        </div>
      </div>

      {/* Recent Security Events */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h3>
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Agent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {event.ipAddress}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(event.action)}`}>
                        <span className="mr-1">{getActionIcon(event.action)}</span>
                        {event.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        event.success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {event.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-xs">
                      {event.userAgent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Recommendations</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-600 text-lg">🔒</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800">Enable MFA</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Multi-factor authentication is not currently enabled. Consider enabling TOTP for enhanced security.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-lg">📊</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">Monitor Activity</h4>
              <p className="text-sm text-blue-700 mt-1">
                Review failed login attempts regularly and consider IP whitelisting for production environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 