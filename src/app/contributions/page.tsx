"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
      return;
    }

    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/contributions');
        if (response.ok) {
          const data = await response.json();
          setContributions(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [session, status, router]);

  if (status === "loading" || loading) {
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Contributions</h1>
              <p className="text-gray-600">
                Track your Dhukuti payments and earning cycles
              </p>
            </div>
            <Link href="/contributions/new" className="action-btn action-btn-primary">
              Record Payment
            </Link>
          </div>
        </div>

        {contributions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">💰</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No Contributions Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">Join a Dhukuti group to start tracking your contributions and building wealth</p>
            <button 
              onClick={() => router.push('/groups')}
              className="action-btn action-btn-primary"
            >
              Browse Groups
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution, index) => (
              <div key={contribution.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {contribution.group.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            Cycle {contribution.cycleNumber} • Due {formatDate(contribution.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                      {contribution.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(contribution.amount)}
                    </div>
                    <div className="flex space-x-2">
                      {contribution.status === 'PENDING' && (
                        <button className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium rounded-md border border-emerald-300 transition-all duration-200 text-xs">
                          Mark as Paid
                        </button>
                      )}
                      <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md border border-gray-300 transition-all duration-200 text-xs">
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {contribution.notes && (
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-gray-600 text-xs">{contribution.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 