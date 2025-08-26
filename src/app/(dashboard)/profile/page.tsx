"use client";

import React, { useState, useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Avatar from "boring-avatars";
import { dhukutiToast } from "@/lib/utils/toast";
import { formatCurrency } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  isVerified: boolean;
  reputation: number;
  totalEarnings: number;
  totalContributions: number;
  createdAt: string;
}

export default function ProfilePage() {
  const { session, status } = useAuthGuard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        setEditForm({
          name: data.data.name || "",
          phoneNumber: data.data.phoneNumber || "",
          address: data.data.address || "",
          emergencyContact: data.data.emergencyContact || "",
        });
      } else {
        // Mock profile for testing
        const mockProfile: UserProfile = {
          id: session?.user?.id || "test-id",
          name: session?.user?.name || "Test User",
          email: session?.user?.email || "test@example.com",
          phoneNumber: "+61-400-123-456",
          address: "Sydney, NSW, Australia",
          emergencyContact: "+61-400-987-654",
          isVerified: true,
          reputation: 95,
          totalEarnings: 8000,
          totalContributions: 12,
          createdAt: new Date().toISOString(),
        };
        setProfile(mockProfile);
        setEditForm({
          name: mockProfile.name,
          phoneNumber: mockProfile.phoneNumber || "",
          address: mockProfile.address || "",
          emergencyContact: mockProfile.emergencyContact || "",
        });
        dhukutiToast.info("Using mock data - database not connected");
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      const mockProfile: UserProfile = {
        id: session?.user?.id || "test-id",
        name: session?.user?.name || "Test User",
        email: session?.user?.email || "test@example.com",
        phoneNumber: "+61-400-123-456",
        address: "Sydney, NSW, Australia",
        emergencyContact: "+61-400-987-654",
        isVerified: true,
        reputation: 95,
        totalEarnings: 8000,
        totalContributions: 12,
        createdAt: new Date().toISOString(),
      };
      setProfile(mockProfile);
      setEditForm({
        name: mockProfile.name,
        phoneNumber: mockProfile.phoneNumber || "",
        address: mockProfile.address || "",
        emergencyContact: mockProfile.emergencyContact || "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedProfile = { ...profile, ...editForm };
        setProfile(updatedProfile as UserProfile);
        setIsEditing(false);
        dhukutiToast.success("Profile updated successfully");
      } else {
        dhukutiToast.error("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      dhukutiToast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: profile?.name || "",
      phoneNumber: profile?.phoneNumber || "",
      address: profile?.address || "",
      emergencyContact: profile?.emergencyContact || "",
    });
    setIsEditing(false);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Profile Access</h1>
            <p className="text-gray-600 mb-4 text-sm">Please log in to view your profile</p>
            <a href="/login" className="action-btn action-btn-primary">
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
            <p className="text-gray-600 mb-4 text-sm">Unable to load your profile information</p>
            <button 
              onClick={fetchProfile} 
              className="action-btn action-btn-primary"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Profile Dashboard</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="action-btn action-btn-primary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <div className="relative">
                      <Avatar
                        name={profile.name}
                        size={80}
                        variant="beam"
                        colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                    </div>
                    <button
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200 shadow-sm"
                      title="Edit Profile Picture"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{profile.email}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    profile.isVerified 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {profile.isVerified ? '✓ Verified Account' : '⏳ Pending Verification'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Reputation Score</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.reputation}/100</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Earnings</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(profile.totalEarnings)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contributions</p>
                        <p className="text-sm font-semibold text-gray-900">{profile.totalContributions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600">Update your profile details and contact information</p>
              </div>
              
              <div className="p-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phoneNumber}
                        onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                      <input
                        type="tel"
                        value={editForm.emergencyContact}
                        onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={handleSave}
                        className="action-btn action-btn-primary"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="action-btn action-btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                        <p className="text-sm text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        <p className="text-sm text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                        <p className="text-sm text-gray-900">{profile.phoneNumber || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Emergency Contact</label>
                        <p className="text-sm text-gray-900">{profile.emergencyContact || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                      <p className="text-sm text-gray-900">{profile.address || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                      <p className="text-sm text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 