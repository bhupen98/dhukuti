"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAdminGuard";

export default function NewContributionPage() {
  const { session, status } = useAuthGuard();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  if (status === "loading") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isDemoUser = session.user?.email === 'demo@example.com';

  const userGroups = isDemoUser ? [
    {
      id: "sydney-savers",
      name: "Sydney Savers",
      contributionAmount: 1000,
      frequency: "monthly",
      dueDate: "2024-01-15",
      status: "due",
      balance: 0,
      totalMembers: 8,
      adminName: "Sarah Johnson",
    },
    {
      id: "melbourne-money",
      name: "Melbourne Money",
      contributionAmount: 500,
      frequency: "biweekly",
      dueDate: "2024-01-20",
      status: "upcoming",
      balance: 1500,
      totalMembers: 6,
      adminName: "Michael Chen",
    },
    {
      id: "brisbane-buddies",
      name: "Brisbane Buddies",
      contributionAmount: 750,
      frequency: "monthly",
      dueDate: "2024-01-25",
      status: "upcoming",
      balance: 2250,
      totalMembers: 10,
      adminName: "Lisa Thompson",
    },
  ] : [];

  const paymentMethods = [
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank transfer to group account",
      icon: "🏦",
      processingTime: "1-2 business days",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay using your PayPal account",
      icon: "💳",
      processingTime: "Instant",
    },
    {
      id: "cash",
      name: "Cash Payment",
      description: "Pay in cash at the next meeting",
      icon: "💵",
      processingTime: "Next meeting",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Pay using Bitcoin or Ethereum",
      icon: "₿",
      processingTime: "10-30 minutes",
    },
  ];

  const selectedGroupData = userGroups.find(group => group.id === selectedGroup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGroup) {
      alert("Please select a group");
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement contribution API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Contribution submitted successfully!");
      router.push("/contributions");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "due":
        return "Payment Due";
      case "upcoming":
        return "Upcoming";
      case "paid":
        return "Paid";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Make a Contribution</h1>
        <p className="text-sm text-gray-600">
          Submit your contribution to your Dhukuti savings group
        </p>
      </div>

      {/* Demo Notice */}
      {isDemoUser && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">Demo Mode Active</h3>
              <p className="text-xs text-blue-700 mt-1">
                You're viewing sample groups. Create real groups to make actual contributions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Groups State */}
      {!isDemoUser && userGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Groups Available</h3>
          <p className="text-sm text-gray-600 mb-6">
            You need to join or create a group before you can make contributions.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push("/groups/join")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Join a Group
            </button>
            <button
              onClick={() => router.push("/groups/create")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Create a Group
            </button>
          </div>
        </div>
      )}

      {/* Contribution Form */}
      {userGroups.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Group Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Group</h2>
            
            <div className="space-y-3">
              {userGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedGroup === group.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                      {getStatusText(group.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Contribution:</span>
                      <span className="font-medium">${group.contributionAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span className="font-medium">{group.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span className="font-medium">{group.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Group Balance:</span>
                      <span className="font-medium">${group.balance}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Admin: {group.adminName}</span>
                      <span>{group.totalMembers} members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
            
            {selectedGroupData ? (
              <div className="space-y-6">
                {/* Contribution Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Contribution Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group:</span>
                      <span className="font-medium">{selectedGroupData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-lg">${selectedGroupData.contributionAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{selectedGroupData.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedGroupData.status)}`}>
                        {getStatusText(selectedGroupData.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{method.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                            <div className="text-xs text-gray-500">Processing: {method.processingTime}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Payment Instructions</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Ensure you have sufficient funds in your account</p>
                    <p>• Keep your payment receipt for verification</p>
                    <p>• Contact your group admin if you encounter any issues</p>
                    <p>• Payment will be confirmed within 24 hours</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Processing..." : `Pay $${selectedGroupData.contributionAmount}`}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-3">👆</div>
                <p className="text-sm text-gray-600">
                  Select a group from the left to proceed with payment
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment History Link */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/contributions")}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ← View Payment History
        </button>
      </div>
    </div>
  );
} 