"use client";

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface AnalyticsChartsProps {
  data: any;
  period: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export function AnalyticsCharts({ data, period }: AnalyticsChartsProps) {
  // Sample data for charts
  const contributionTrendData = [
    { month: "Jan", contributions: 1200, payouts: 800, balance: 400 },
    { month: "Feb", contributions: 1400, payouts: 900, balance: 900 },
    { month: "Mar", contributions: 1100, payouts: 1200, balance: 800 },
    { month: "Apr", contributions: 1600, payouts: 1000, balance: 1400 },
    { month: "May", contributions: 1300, payouts: 1100, balance: 1600 },
    { month: "Jun", contributions: 1800, payouts: 1400, balance: 2000 },
  ];

  const groupPerformanceData = [
    { name: "Sydney Savers", contributions: 2400, members: 8, efficiency: 95 },
    { name: "Melbourne Money", contributions: 1800, members: 6, efficiency: 88 },
    { name: "Brisbane Buddies", contributions: 3000, members: 10, efficiency: 92 },
  ];

  const paymentStatusData = [
    { name: "On Time", value: 85, color: "#00C49F" },
    { name: "Late", value: 10, color: "#FFBB28" },
    { name: "Overdue", value: 5, color: "#FF8042" },
  ];

  const monthlyComparisonData = [
    { month: "Jan", thisYear: 1200, lastYear: 1000 },
    { month: "Feb", thisYear: 1400, lastYear: 1100 },
    { month: "Mar", thisYear: 1100, lastYear: 1200 },
    { month: "Apr", thisYear: 1600, lastYear: 1300 },
    { month: "May", thisYear: 1300, lastYear: 1400 },
    { month: "Jun", thisYear: 1800, lastYear: 1500 },
  ];

  const memberActivityData = [
    { member: "Sarah J.", contributions: 6, amount: 6000, reliability: 100 },
    { member: "Mike C.", contributions: 5, amount: 5000, reliability: 95 },
    { member: "Lisa T.", contributions: 4, amount: 4000, reliability: 90 },
    { member: "David W.", contributions: 3, amount: 3000, reliability: 85 },
    { member: "Emma R.", contributions: 2, amount: 2000, reliability: 80 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Contribution Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={contributionTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="contributions"
              stackId="1"
              stroke="#0088FE"
              fill="#0088FE"
              fillOpacity={0.6}
              name="Contributions"
            />
            <Area
              type="monotone"
              dataKey="payouts"
              stackId="1"
              stroke="#00C49F"
              fill="#00C49F"
              fillOpacity={0.6}
              name="Payouts"
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#FF8042"
              strokeWidth={3}
              name="Balance"
              dot={{ fill: "#FF8042", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Group Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="contributions" fill="#0088FE" name="Contributions ($)" />
              <Bar dataKey="members" fill="#00C49F" name="Members" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year-over-Year Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-over-Year Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#0088FE"
              strokeWidth={3}
              name="This Year"
              dot={{ fill: "#0088FE", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#8884D8"
              strokeWidth={2}
              name="Last Year"
              dot={{ fill: "#8884D8", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Member Activity Radar Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Activity Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={memberActivityData}>
            <PolarGrid stroke="#f0f0f0" />
            <PolarAngleAxis dataKey="member" stroke="#666" />
            <PolarRadiusAxis stroke="#666" />
            <Radar
              name="Contributions"
              dataKey="contributions"
              stroke="#0088FE"
              fill="#0088FE"
              fillOpacity={0.3}
            />
            <Radar
              name="Reliability"
              dataKey="reliability"
              stroke="#00C49F"
              fill="#00C49F"
              fillOpacity={0.3}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Contributions</p>
              <p className="text-2xl font-bold">$12,400</p>
              <p className="text-xs opacity-90">+15.3% vs last period</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Groups</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs opacity-90">+1 new this month</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">On-Time Rate</p>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-xs opacity-90">+2.1% improvement</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg. Contribution</p>
              <p className="text-2xl font-bold">$1,033</p>
              <p className="text-xs opacity-90">+8.7% vs last month</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
} 