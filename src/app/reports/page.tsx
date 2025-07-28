"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

function useAuthGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, status };
}

export default function ReportsPage() {
  const { session, status } = useAuthGuard();
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isDemoUser = session.user?.email === 'demo@example.com';

  // Sample data for demo user
  const demoData = {
    overview: {
      totalContributions: 34000,
      totalEarnings: 28000,
      activeGroups: 3,
      completionRate: 85,
      avgContribution: 2833,
      totalMembers: 12,
      savingsGrowth: 12.5,
      monthlyTrend: 8.2
    },
    contributionTrend: [
      { month: "Jan", amount: 2500, target: 3000 },
      { month: "Feb", amount: 2800, target: 3000 },
      { month: "Mar", amount: 3200, target: 3000 },
      { month: "Apr", amount: 2900, target: 3000 },
      { month: "May", amount: 3100, target: 3000 },
      { month: "Jun", amount: 3400, target: 3000 },
      { month: "Jul", amount: 3600, target: 3000 },
      { month: "Aug", amount: 3300, target: 3000 },
      { month: "Sep", amount: 3500, target: 3000 },
      { month: "Oct", amount: 3800, target: 3000 },
      { month: "Nov", amount: 3200, target: 3000 },
      { month: "Dec", amount: 4000, target: 3000 }
    ],
    groupPerformance: [
      { name: "Family Savings", contributions: 12000, members: 4, completion: 90 },
      { name: "Business Group", contributions: 15000, members: 5, completion: 85 },
      { name: "Community Fund", contributions: 7000, members: 3, completion: 80 }
    ],
    categoryBreakdown: [
      { name: "Emergency Fund", value: 40, color: "#3B82F6" },
      { name: "Education", value: 25, color: "#10B981" },
      { name: "Home Improvement", value: 20, color: "#F59E0B" },
      { name: "Investment", value: 15, color: "#EF4444" }
    ],
    monthlyComparison: [
      { month: "Jan", thisYear: 2500, lastYear: 2000 },
      { month: "Feb", thisYear: 2800, lastYear: 2200 },
      { month: "Mar", thisYear: 3200, lastYear: 2400 },
      { month: "Apr", thisYear: 2900, lastYear: 2600 },
      { month: "May", thisYear: 3100, lastYear: 2800 },
      { month: "Jun", thisYear: 3400, lastYear: 3000 },
      { month: "Jul", thisYear: 3600, lastYear: 3200 },
      { month: "Aug", thisYear: 3300, lastYear: 3400 },
      { month: "Sep", thisYear: 3500, lastYear: 3600 },
      { month: "Oct", thisYear: 3800, lastYear: 3800 },
      { month: "Nov", thisYear: 3200, lastYear: 4000 },
      { month: "Dec", thisYear: 4000, lastYear: 4200 }
    ]
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "contributions", name: "Contributions", icon: "💰" },
    { id: "groups", name: "Groups", icon: "👥" },
    { id: "analytics", name: "Analytics", icon: "📈" },
    { id: "insights", name: "Insights", icon: "💡" }
  ];

  const insights = [
    {
      type: "positive",
      title: "Excellent Savings Growth",
      description: "Your savings have grown 12.5% this year, exceeding your target by 2.5%",
      icon: "📈"
    },
    {
      type: "warning",
      title: "Group Completion Rate",
      description: "Family Savings group is at 90% completion. Consider encouraging final contributions.",
      icon: "⚠️"
    },
    {
      type: "info",
      title: "Optimal Contribution Timing",
      description: "Your highest contributions occur in December. Consider spreading them throughout the year.",
      icon: "💡"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your financial journey</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      {isDemoUser && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">Demo Analytics Active</h3>
              <p className="text-xs text-blue-700 mt-1">
                Viewing sample data to demonstrate the comprehensive reporting features. Real data will appear when you connect your actual Dhukuti groups.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1.5 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contributions</p>
                  <p className="text-2xl font-bold text-gray-900">₹{demoData.overview.totalContributions.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">💰</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-600">+{demoData.overview.savingsGrowth}%</span>
                <span className="text-gray-500 ml-1">vs last year</span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{demoData.overview.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📈</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-600">+{demoData.overview.monthlyTrend}%</span>
                <span className="text-gray-500 ml-1">this month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Groups</p>
                  <p className="text-2xl font-bold text-gray-900">{demoData.overview.activeGroups}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">👥</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-500">{demoData.overview.totalMembers} total members</span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{demoData.overview.completionRate}%</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">🎯</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-500">Avg: ₹{demoData.overview.avgContribution.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Trend */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={demoData.contributionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Group Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demoData.groupPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="contributions" fill="#3B82F6" name="Contributions (₹)" />
                  <Bar dataKey="completion" fill="#10B981" name="Completion (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  insight.type === 'positive' ? 'bg-green-50 border-green-200' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{insight.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contributions Tab */}
      {activeTab === "contributions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={demoData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {demoData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-over-Year Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={demoData.monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="thisYear" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="This Year" />
                  <Area type="monotone" dataKey="lastYear" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Last Year" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === "groups" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Analytics</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Contributions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {demoData.groupPerformance.map((group, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 text-sm">👥</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{group.name}</div>
                            <div className="text-sm text-gray-500">Active</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{group.members}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{group.contributions.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${group.completion}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-900">{group.completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          group.completion >= 90 ? 'bg-green-100 text-green-800' :
                          group.completion >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {group.completion >= 90 ? 'Excellent' : group.completion >= 70 ? 'Good' : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Savings Growth */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Growth Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Savings</span>
                  <span className="text-lg font-semibold text-gray-900">₹{demoData.overview.totalContributions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Growth Rate</span>
                  <span className="text-lg font-semibold text-green-600">+{demoData.overview.savingsGrowth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Average</span>
                  <span className="text-lg font-semibold text-gray-900">₹{demoData.overview.avgContribution.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Projected Annual</span>
                  <span className="text-lg font-semibold text-blue-600">₹{(demoData.overview.avgContribution * 12).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">On-time Payments</span>
                  <span className="text-lg font-semibold text-green-600">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Group Participation</span>
                  <span className="text-lg font-semibold text-blue-600">88%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Savings Efficiency</span>
                  <span className="text-lg font-semibold text-purple-600">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Goal Achievement</span>
                  <span className="text-lg font-semibold text-orange-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recommendations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 text-lg">💡</span>
                    <div>
                      <h4 className="font-medium text-blue-900">Optimize Contribution Timing</h4>
                      <p className="text-sm text-blue-700 mt-1">Consider contributing earlier in the month to maximize interest earnings.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-lg">🎯</span>
                    <div>
                      <h4 className="font-medium text-green-900">Diversify Savings Goals</h4>
                      <p className="text-sm text-green-700 mt-1">Create separate groups for emergency fund, education, and investment.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-600 text-lg">📈</span>
                    <div>
                      <h4 className="font-medium text-purple-900">Increase Monthly Savings</h4>
                      <p className="text-sm text-purple-700 mt-1">You can increase your monthly contribution by ₹500 without affecting your budget.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Peak Contribution Month</span>
                  <span className="text-sm font-medium text-gray-900">December</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Best Performing Group</span>
                  <span className="text-sm font-medium text-gray-900">Business Group</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Savings Growth Rate</span>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Goal Completion</span>
                  <span className="text-sm font-medium text-blue-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 