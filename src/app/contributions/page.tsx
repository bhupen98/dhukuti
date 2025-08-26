"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Contribution {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  cycleNumber: number;
  notes?: string;
  group: {
    name: string;
  };
}

export default function ContributionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    // Demo data for demonstration
    if (user.email === 'demo@example.com') {
      const demoContributions: Contribution[] = [
        {
          id: "1",
          amount: 500,
          dueDate: "2024-12-15",
          paidDate: "2024-12-14",
          status: 'PAID',
          cycleNumber: 1,
          notes: "Monthly contribution for Sydney Nepalese Savers",
          group: { name: "Sydney Nepalese Savers" }
        },
        {
          id: "2",
          amount: 750,
          dueDate: "2024-12-20",
          status: 'PENDING',
          cycleNumber: 2,
          notes: "Monthly contribution for Melbourne Community Fund",
          group: { name: "Melbourne Community Fund" }
        },
        {
          id: "3",
          amount: 600,
          dueDate: "2024-12-10",
          status: 'OVERDUE',
          cycleNumber: 1,
          notes: "Monthly contribution for Brisbane Buddies",
          group: { name: "Brisbane Buddies" }
        },
        {
          id: "4",
          amount: 500,
          dueDate: "2024-11-15",
          paidDate: "2024-11-14",
          status: 'PAID',
          cycleNumber: 12,
          notes: "Previous month contribution",
          group: { name: "Sydney Nepalese Savers" }
        },
        {
          id: "5",
          amount: 750,
          dueDate: "2024-11-20",
          paidDate: "2024-11-19",
          status: 'PAID',
          cycleNumber: 11,
          notes: "Previous month contribution",
          group: { name: "Melbourne Community Fund" }
        }
      ];
      setContributions(demoContributions);
    }

    setIsLoading(false);
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Contributions</h1>
          <p className="text-sm text-gray-600">
            Track your Dhukuti payments and earning cycles
          </p>
        </div>

        {/* Demo Notice */}
        {user?.email === 'demo@example.com' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> Viewing sample contributions. Create real groups to track your actual payments!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {contributions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <div className="text-xl font-bold text-blue-600">{contributions.length}</div>
                <div className="text-xs text-gray-600 font-medium">Total Contributions</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <div className="text-xl font-bold text-green-600">
                  {contributions.filter(c => c.status === 'PAID').length}
                </div>
                <div className="text-xs text-gray-600 font-medium">Paid</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <div className="text-xl font-bold text-amber-600">
                  {contributions.filter(c => c.status === 'PENDING').length}
                </div>
                <div className="text-xs text-gray-600 font-medium">Pending</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <div className="text-xl font-bold text-red-600">
                  {contributions.filter(c => c.status === 'OVERDUE').length}
                </div>
                <div className="text-xs text-gray-600 font-medium">Overdue</div>
              </div>
            </div>
          </div>
        )}

        {contributions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Contributions Yet</h3>
            <p className="text-sm text-gray-600 mb-6">
              Join a Dhukuti group to start tracking your contributions and building wealth
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => router.push('/groups')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Groups
              </button>
              <Link 
                href="/contributions/new"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Record Payment
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((contribution, index) => (
              <div key={contribution.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {contribution.group.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cycle {contribution.cycleNumber} • Due {formatDate(contribution.dueDate)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contribution.status)}`}>
                      {contribution.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-600 text-xs font-medium">Amount:</span>
                      <span className="font-medium text-gray-900 text-sm">{formatCurrency(contribution.amount)}</span>
                    </div>
                    {contribution.paidDate && (
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-600 text-xs font-medium">Paid Date:</span>
                        <span className="font-medium text-gray-900 text-sm">{formatDate(contribution.paidDate)}</span>
                      </div>
                    )}
                  </div>
                  
                  {contribution.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-xs">{contribution.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {contribution.status === 'PENDING' && (
                      <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        Mark as Paid
                      </button>
                    )}
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 