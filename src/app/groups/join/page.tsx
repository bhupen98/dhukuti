"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAdminGuard";

export default function JoinGroupPage() {
  const { session, status } = useAuthGuard();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

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

  const categories = [
    { value: "all", label: "All Groups", icon: "👥" },
    { value: "student", label: "Student", icon: "🎓" },
    { value: "business", label: "Business", icon: "💼" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { value: "community", label: "Community", icon: "🏘️" },
  ];

  const availableGroups = [
    {
      id: 1,
      name: "Sydney Student Savers",
      description: "A savings group for university students in Sydney. Perfect for managing expenses and building financial discipline.",
      category: "student",
      contributionAmount: 200,
      frequency: "monthly",
      currentMembers: 8,
      maxMembers: 12,
      location: "Sydney CBD",
      meetingDay: "Sunday",
      meetingTime: "2:00 PM",
      isPrivate: false,
      adminName: "Sarah Johnson",
      adminReputation: 95,
      tags: ["Students", "Budgeting", "Education"],
    },
    {
      id: 2,
      name: "Melbourne Business Network",
      description: "Professional savings group for business owners and entrepreneurs in Melbourne. Network while you save!",
      category: "business",
      contributionAmount: 500,
      frequency: "monthly",
      currentMembers: 6,
      maxMembers: 10,
      location: "Melbourne CBD",
      meetingDay: "Tuesday",
      meetingTime: "7:00 PM",
      isPrivate: true,
      adminName: "Michael Chen",
      adminReputation: 98,
      tags: ["Business", "Networking", "Professional"],
    },
    {
      id: 3,
      name: "Brisbane Family Fund",
      description: "Family-oriented savings group helping families achieve their financial goals together.",
      category: "family",
      contributionAmount: 300,
      frequency: "monthly",
      currentMembers: 5,
      maxMembers: 8,
      location: "Brisbane Suburbs",
      meetingDay: "Saturday",
      meetingTime: "10:00 AM",
      isPrivate: false,
      adminName: "Lisa Thompson",
      adminReputation: 92,
      tags: ["Family", "Children", "Home"],
    },
    {
      id: 4,
      name: "Perth Community Circle",
      description: "Community-based savings group open to all residents. Building stronger communities through financial cooperation.",
      category: "community",
      contributionAmount: 150,
      frequency: "biweekly",
      currentMembers: 12,
      maxMembers: 15,
      location: "Perth Community Center",
      meetingDay: "Wednesday",
      meetingTime: "6:30 PM",
      isPrivate: false,
      adminName: "David Wilson",
      adminReputation: 89,
      tags: ["Community", "Local", "Cooperation"],
    },
    {
      id: 5,
      name: "Adelaide Tech Savers",
      description: "Savings group for tech professionals and IT enthusiasts. Save money while staying updated with technology trends.",
      category: "business",
      contributionAmount: 400,
      frequency: "monthly",
      currentMembers: 7,
      maxMembers: 12,
      location: "Adelaide Tech Hub",
      meetingDay: "Friday",
      meetingTime: "6:00 PM",
      isPrivate: false,
      adminName: "Emma Rodriguez",
      adminReputation: 96,
      tags: ["Technology", "Professional", "Innovation"],
    },
  ];

  const filteredGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinGroup = async (groupId: number) => {
    setIsLoading(true);
    // TODO: Implement join group API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Join request sent! The group admin will review your application.");
      router.push("/groups");
    }, 1500);
  };

  const handleRequestInvite = async (groupId: number) => {
    setIsLoading(true);
    // TODO: Implement invite request API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Invite request sent! The group admin will contact you.");
      router.push("/groups");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Join a Group</h1>
        <p className="text-sm text-gray-600">
          Discover and join Dhukuti savings groups in your area
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">🔍</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xs">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="p-6">
              {/* Group Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      group.category === "student" ? "bg-blue-100 text-blue-800" :
                      group.category === "business" ? "bg-green-100 text-green-800" :
                      group.category === "family" ? "bg-purple-100 text-purple-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {categories.find(c => c.value === group.category)?.icon} {categories.find(c => c.value === group.category)?.label}
                    </span>
                    {group.isPrivate && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🔒 Private
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{group.description}</p>

              {/* Group Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Contribution:</span>
                  <span className="font-medium text-gray-900">${group.contributionAmount} ({group.frequency})</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Members:</span>
                  <span className="font-medium text-gray-900">{group.currentMembers}/{group.maxMembers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Meeting:</span>
                  <span className="font-medium text-gray-900">{group.meetingDay}s at {group.meetingTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium text-gray-900">{group.location}</span>
                </div>
              </div>

              {/* Admin Info */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Group Admin</p>
                  <p className="text-sm font-medium text-gray-900">{group.adminName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Reputation</p>
                  <p className="text-sm font-medium text-gray-900">{group.adminReputation}%</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {group.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {group.isPrivate ? (
                  <button
                    onClick={() => handleRequestInvite(group.id)}
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Requesting..." : "Request Invite"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Joining..." : "Join Group"}
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

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
          <p className="text-sm text-gray-600 mb-6">
            Try adjusting your search criteria or browse all categories
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Create Your Own Group */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <div className="text-3xl mb-3">🏗️</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Can't find the right group?</h3>
          <p className="text-sm text-blue-700 mb-4">
            Create your own Dhukuti savings group and invite friends, family, or community members to join!
          </p>
          <button
            onClick={() => router.push("/groups/create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create New Group
          </button>
        </div>
      </div>
    </div>
  );
} 