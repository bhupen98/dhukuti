"use client";

import React, { useState, useEffect } from "react";

interface MarketingCampaign {
  id: string;
  name: string;
  type: "social" | "email" | "promo" | "referral";
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
}

interface MarketingMetrics {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  averageROI: number;
  topPerformingCampaign: string;
  conversionRate: number;
}

export function MarketingDashboard({ eventId }: { eventId: string }) {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [metrics, setMetrics] = useState<MarketingMetrics>({
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    averageROI: 0,
    topPerformingCampaign: "",
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "analytics">("overview");

  // Demo data for marketing campaigns
  useEffect(() => {
    const demoCampaigns: MarketingCampaign[] = [
      {
        id: "1",
        name: "Social Media Launch",
        type: "social",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2024-01-30",
        budget: 500,
        spent: 320,
        impressions: 15420,
        clicks: 1234,
        conversions: 89,
        revenue: 2670,
        roi: 734.38
      },
      {
        id: "2",
        name: "Email Newsletter",
        type: "email",
        status: "active",
        startDate: "2024-01-20",
        endDate: "2024-01-25",
        budget: 200,
        spent: 150,
        impressions: 8900,
        clicks: 567,
        conversions: 45,
        revenue: 1350,
        roi: 800
      },
      {
        id: "3",
        name: "Early Bird Promo",
        type: "promo",
        status: "completed",
        startDate: "2024-01-10",
        endDate: "2024-01-15",
        budget: 300,
        spent: 300,
        impressions: 6700,
        clicks: 890,
        conversions: 67,
        revenue: 2010,
        roi: 570
      },
      {
        id: "4",
        name: "Referral Program",
        type: "referral",
        status: "active",
        startDate: "2024-01-18",
        endDate: "2024-01-28",
        budget: 100,
        spent: 45,
        impressions: 2300,
        clicks: 234,
        conversions: 23,
        revenue: 690,
        roi: 1433.33
      }
    ];

    setCampaigns(demoCampaigns);

    // Calculate metrics
    const totalImpressions = demoCampaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
    const totalClicks = demoCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
    const totalConversions = demoCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
    const totalRevenue = demoCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
    const averageROI = demoCampaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / demoCampaigns.length;
    const topPerformingCampaign = demoCampaigns.reduce((top, campaign) => 
      campaign.roi > top.roi ? campaign : top
    ).name;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    setMetrics({
      totalImpressions,
      totalClicks,
      totalConversions,
      totalRevenue,
      averageROI,
      topPerformingCampaign,
      conversionRate
    });

    setIsLoading(false);
  }, [eventId]);

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "social": return "📱";
      case "email": return "📧";
      case "promo": return "🎫";
      case "referral": return "👥";
      default: return "📊";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "paused": return "text-yellow-600 bg-yellow-100";
      case "completed": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-AU').format(num);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Marketing Dashboard</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          ➕ New Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: "📊" },
            { id: "campaigns", name: "Campaigns", icon: "📈" },
            { id: "analytics", name: "Analytics", icon: "📋" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Impressions</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalImpressions)}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👁️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalClicks)}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🖱️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalConversions)}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🎯</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue Generated</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium">{metrics.conversionRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average ROI:</span>
                  <span className="font-medium">{metrics.averageROI.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Top Campaign:</span>
                  <span className="font-medium">{metrics.topPerformingCampaign}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                  📧 Send Email Campaign
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
                  📱 Create Social Post
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors">
                  🎫 Generate Promo Code
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">●</span>
                  <span>Email campaign sent (2 hours ago)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">●</span>
                  <span>Social post published (5 hours ago)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500">●</span>
                  <span>New conversion from referral (1 day ago)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCampaignTypeIcon(campaign.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Budget</p>
                  <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Spent</p>
                  <p className="font-medium">{formatCurrency(campaign.spent)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Impressions</p>
                  <p className="font-medium">{formatNumber(campaign.impressions)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Clicks</p>
                  <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Conversions</p>
                  <p className="font-medium">{formatNumber(campaign.conversions)}</p>
                </div>
                <div>
                  <p className="text-gray-600">ROI</p>
                  <p className="font-medium">{campaign.roi.toFixed(2)}%</p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  📊 View Details
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  ✏️ Edit
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  🚀 Pause/Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getCampaignTypeIcon(campaign.type)}</span>
                      <span className="text-sm font-medium">{campaign.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{campaign.roi.toFixed(2)}% ROI</p>
                      <p className="text-xs text-gray-600">{formatCurrency(campaign.revenue)} revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Impressions</span>
                  <span className="text-sm font-medium">{formatNumber(metrics.totalImpressions)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Clicks</span>
                  <span className="text-sm font-medium">{formatNumber(metrics.totalClicks)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conversions</span>
                  <span className="text-sm font-medium">{formatNumber(metrics.totalConversions)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Conversion Rate</span>
                    <span className="text-sm font-bold text-blue-600">{metrics.conversionRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-lg">💡</span>
                <div>
                  <p className="text-sm font-medium text-blue-900">Increase Social Media Budget</p>
                  <p className="text-xs text-blue-700">Your social media campaign has the highest ROI. Consider increasing the budget by 20%.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-green-600 text-lg">📈</span>
                <div>
                  <p className="text-sm font-medium text-green-900">Optimize Email Timing</p>
                  <p className="text-xs text-green-700">Emails sent between 9-11 AM have 15% higher open rates.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-600 text-lg">🎯</span>
                <div>
                  <p className="text-sm font-medium text-purple-900">Launch Referral Campaign</p>
                  <p className="text-xs text-purple-700">Referral campaigns show strong performance. Consider expanding this channel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 