"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GroupChat } from "@/components/chat/GroupChat";
import { PaymentModal } from "@/components/payments/PaymentModal";

function useAuthGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, status };
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  totalAmount: number;
  monthlyContribution: number;
  nextPayout: string;
  progress: number;
  status: "active" | "completed" | "pending";
  category: string;
  createdAt: string;
  admin: {
    name: string;
    avatar: string;
  };
  members: Array<{
    id: string;
    name: string;
    avatar: string;
    contribution: number;
    status: "paid" | "pending" | "overdue";
  }>;
}

export default function GroupsPage() {
  const { session, status } = useAuthGuard();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Demo data for demo user
  useEffect(() => {
    if (session?.user?.email === 'demo@example.com') {
      const demoGroups: Group[] = [
        {
          id: "1",
          name: "Family Savings",
          description: "Monthly savings for family expenses and emergencies",
          memberCount: 8,
          totalAmount: 24000,
          monthlyContribution: 3000,
          nextPayout: "2024-02-15",
          progress: 75,
          status: "active",
          category: "Family",
          createdAt: "2023-01-15",
          admin: {
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
          },
          members: [
            { id: "1", name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", contribution: 3000, status: "paid" },
            { id: "2", name: "Michael Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael", contribution: 3000, status: "paid" },
            { id: "3", name: "Lisa Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa", contribution: 3000, status: "paid" },
            { id: "demo", name: "Demo User", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo", contribution: 3000, status: "paid" },
            { id: "4", name: "David Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", contribution: 3000, status: "pending" },
            { id: "5", name: "Emma Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", contribution: 3000, status: "overdue" },
            { id: "6", name: "James Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", contribution: 3000, status: "paid" },
            { id: "7", name: "Maria Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", contribution: 3000, status: "paid" }
          ]
        },
        {
          id: "2",
          name: "Business Investment",
          description: "Investment pool for business expansion and equipment",
          memberCount: 5,
          totalAmount: 50000,
          monthlyContribution: 10000,
          nextPayout: "2024-03-01",
          progress: 60,
          status: "active",
          category: "Business",
          createdAt: "2023-03-20",
          admin: {
            name: "Michael Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
          },
          members: [
            { id: "2", name: "Michael Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael", contribution: 10000, status: "paid" },
            { id: "demo", name: "Demo User", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo", contribution: 10000, status: "paid" },
            { id: "8", name: "Alex Turner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", contribution: 10000, status: "pending" },
            { id: "9", name: "Sophie Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie", contribution: 10000, status: "paid" },
            { id: "10", name: "Robert Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert", contribution: 10000, status: "paid" }
          ]
        },
        {
          id: "3",
          name: "Community Fund",
          description: "Community development and local projects funding",
          memberCount: 12,
          totalAmount: 36000,
          monthlyContribution: 3000,
          nextPayout: "2024-01-30",
          progress: 90,
          status: "active",
          category: "Community",
          createdAt: "2023-06-10",
          admin: {
            name: "Lisa Thompson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
          },
          members: [
            { id: "3", name: "Lisa Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa", contribution: 3000, status: "paid" },
            { id: "demo", name: "Demo User", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo", contribution: 3000, status: "paid" },
            { id: "11", name: "John Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", contribution: 3000, status: "paid" },
            { id: "12", name: "Anna White", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna", contribution: 3000, status: "paid" },
            { id: "13", name: "Tom Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom", contribution: 3000, status: "paid" },
            { id: "14", name: "Rachel Green", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel", contribution: 3000, status: "paid" },
            { id: "15", name: "Chris Martin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris", contribution: 3000, status: "paid" },
            { id: "16", name: "Nina Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nina", contribution: 3000, status: "paid" },
            { id: "17", name: "Kevin Zhang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kevin", contribution: 3000, status: "paid" },
            { id: "18", name: "Amanda Foster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda", contribution: 3000, status: "paid" },
            { id: "19", name: "Daniel Clark", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel", contribution: 3000, status: "paid" },
            { id: "20", name: "Jessica Taylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", contribution: 3000, status: "pending" }
          ]
        }
      ];
      setGroups(demoGroups);
      setIsLoading(false);
    }
  }, [session]);

  const handleChatOpen = (group: Group) => {
    setSelectedGroup(group);
    setIsChatOpen(true);
  };

  const handlePaymentOpen = (group: Group) => {
    setSelectedGroup(group);
    setPaymentAmount(group.monthlyContribution);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    // Update the group's progress and member status
    if (selectedGroup) {
      setGroups(prev => prev.map(group => {
        if (group.id === selectedGroup.id) {
          return {
            ...group,
            progress: Math.min(group.progress + (100 / group.memberCount), 100),
            members: group.members.map(member => 
              member.id === session?.user?.id 
                ? { ...member, status: "paid" as const }
                : member
            )
          };
        }
        return group;
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "completed": return "text-blue-600 bg-blue-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "overdue": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading groups...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
        <p className="text-gray-600 mt-1">Manage your savings groups and contributions</p>
      </div>

      {/* Demo Banner */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 text-lg mr-2">💡</span>
            <div>
              <p className="text-blue-800 font-medium">Demo Mode Active</p>
              <p className="text-blue-700 text-sm">You're viewing sample groups and data. Try the chat and payment features!</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups yet</h3>
          <p className="text-gray-600 mb-6">Join or create a savings group to get started</p>
          <div className="space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Group
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Join Group
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(group.status)}`}>
                    {group.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>👥 {group.memberCount} members</span>
                  <span>💰 ₹{group.monthlyContribution.toLocaleString()}/month</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{group.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${group.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Next payout: {new Date(group.nextPayout).toLocaleDateString()}</p>
              </div>

              {/* Members Preview */}
              <div className="px-6 pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Members</h4>
                <div className="space-y-2">
                  {group.members.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <span className="text-sm text-gray-900">{member.name}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMemberStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                  {group.members.length > 3 && (
                    <p className="text-xs text-gray-500">+{group.members.length - 3} more members</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleChatOpen(group)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => handlePaymentOpen(group)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    💳 Pay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      {selectedGroup && (
        <GroupChat
          groupId={selectedGroup.id}
          groupName={selectedGroup.name}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Payment Modal */}
      {selectedGroup && (
        <PaymentModal
          groupId={selectedGroup.id}
          groupName={selectedGroup.name}
          amount={paymentAmount}
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
} 