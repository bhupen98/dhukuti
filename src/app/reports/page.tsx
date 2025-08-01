"use client";

import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";

interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  status: string;
  downloadUrl?: string;
}

export default function ReportsPage() {
  const { session, status } = useAuthGuard();

  // Demo data for demonstration
  const reports: Report[] = [
    {
      id: "1",
      title: "Monthly Savings Report",
      description: "Comprehensive overview of all group savings and contributions",
      type: "Financial",
      date: "2024-11-30",
      status: "Available",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Group Performance Analysis",
      description: "Detailed analysis of group participation and performance metrics",
      type: "Analytics",
      date: "2024-11-25",
      status: "Available",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Community Growth Report",
      description: "Statistics on community growth and new member registrations",
      type: "Community",
      date: "2024-11-20",
      status: "Processing",
    },
    {
      id: "4",
      title: "Annual Financial Summary",
      description: "Year-end financial summary for all Dhukuti groups",
      type: "Financial",
      date: "2024-12-01",
      status: "Scheduled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-emerald-100 text-emerald-800";
      case "processing":
        return "bg-amber-100 text-amber-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "financial":
        return "bg-blue-100 text-blue-800";
      case "analytics":
        return "bg-purple-100 text-purple-800";
      case "community":
        return "bg-emerald-100 text-emerald-800";
      case "compliance":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-5 w-5 mx-auto"></div>
          <p className="mt-2 text-slate-600 text-xs">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-base font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600 mt-0.5 text-xs">Generate and download financial reports and community analytics</p>
      </div>

      {/* Demo Notice */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 text-xs mr-1.5">💡</span>
            <div>
              <p className="text-blue-800 font-medium text-xs">Demo Mode Active</p>
              <p className="text-blue-700 text-xs">You're viewing sample reports. Generate real reports to track your community's progress!</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">12</div>
                <div className="metric-label">Total Reports</div>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">8</div>
                <div className="metric-label">Available</div>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">3</div>
                <div className="metric-label">Processing</div>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="metric-value">1</div>
                <div className="metric-label">Scheduled</div>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Grid */}
      {session?.user?.email === 'demo@example.com' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {reports.map((report) => (
            <div key={report.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-3 border-b border-slate-100">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">{report.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{report.description}</p>
                  </div>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ml-2 ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Generated:</span>
                    <span className="font-medium text-slate-800">{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Format:</span>
                    <span className="font-medium text-slate-800">PDF</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Size:</span>
                    <span className="font-medium text-slate-800">2.4 MB</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex space-x-1">
                  {report.downloadUrl ? (
                    <button className="btn btn-primary btn-sm flex-1">
                      Download
                    </button>
                  ) : (
                    <button className="btn btn-outline btn-sm flex-1" disabled>
                      Processing...
                    </button>
                  )}
                  <button className="btn btn-outline btn-sm">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-slate-400 text-3xl mb-2">📊</div>
          <h3 className="text-sm font-medium text-slate-900 mb-1">No reports yet</h3>
          <p className="text-slate-600 mb-3 text-xs">Generate reports to track your community's financial progress and analytics</p>
          <div className="space-x-1.5">
            <button className="btn btn-primary btn-sm">
              Generate Report
            </button>
            <button className="btn btn-outline btn-sm">
              View Templates
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 flex justify-center space-x-2">
        <button className="btn btn-primary btn-sm">
          Generate New Report
        </button>
        <button className="btn btn-outline btn-sm">
          Report Templates
        </button>
        <button className="btn btn-outline btn-sm">
          Export Data
        </button>
      </div>
    </div>
  );
} 