"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
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
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Contributions</h1>
        <Button>Record Payment</Button>
      </div>

      {contributions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💸</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Contributions Yet</h2>
          <p className="text-gray-600 mb-6">Join a Dhukuti group to start tracking contributions</p>
          <Button size="lg" onClick={() => router.push('/groups')}>
            Browse Groups
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {contributions.map((contribution) => (
            <div key={contribution.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contribution.group.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Cycle {contribution.cycleNumber} • Due {formatDate(contribution.dueDate)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contribution.status)}`}>
                  {contribution.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(contribution.amount)}
                </div>
                <div className="flex space-x-2">
                  {contribution.status === 'PENDING' && (
                    <Button size="sm" variant="outline">
                      Mark as Paid
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
              
              {contribution.notes && (
                <p className="text-sm text-gray-600 mt-2">{contribution.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 