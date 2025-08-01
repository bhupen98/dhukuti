"use client";

import React, { useState, useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Avatar from "boring-avatars";
import { dhukutiToast } from "@/lib/toast";
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

  // Debug logging
  console.log("ProfilePage render:", { session, status, profile, isLoading });

  useEffect(() => {
    console.log("ProfilePage useEffect triggered:", { session, status });
    if (session?.user?.id) {
      console.log("Fetching profile for user:", session.user.id);
      fetchProfile();
    } else {
      console.log("No session or user ID, setting loading to false");
      setIsLoading(false);
    }
  }, [session]);

  const fetchProfile = async () => {
    console.log("fetchProfile called");
    try {
      const response = await fetch('/api/user/profile');
      console.log("Profile API response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Profile API response data:", data);
        setProfile(data.data);
        setEditForm({
          name: data.data.name || "",
          phoneNumber: data.data.phoneNumber || "",
          address: data.data.address || "",
          emergencyContact: data.data.emergencyContact || "",
        });
      } else {
        console.error("Profile API error:", response.status, response.statusText);
        // For now, let's create a mock profile for testing
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
      // Create mock profile on error too
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        setIsEditing(false);
        dhukutiToast.success("Profile updated successfully");
      } else {
        // For now, just update the local state
        if (profile) {
          const updatedProfile = { ...profile, ...editForm };
          setProfile(updatedProfile);
          setIsEditing(false);
          dhukutiToast.success("Profile updated (mock mode)");
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Update local state on error
      if (profile) {
        const updatedProfile = { ...profile, ...editForm };
        setProfile(updatedProfile);
        setIsEditing(false);
        dhukutiToast.success("Profile updated (mock mode)");
      }
    } finally {
      setIsLoading(false);
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
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Profile Page</h1>
          <p className="text-slate-600">Loading profile information...</p>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="h-64 bg-slate-200 rounded-xl"></div>
              <div className="h-32 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="h-48 bg-slate-200 rounded-xl"></div>
              <div className="h-32 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Profile Page</h1>
          <p className="text-slate-600">No session found. Please log in to view your profile.</p>
          <div className="mt-4 text-sm text-slate-500">
            <p>Debug Info:</p>
            <p>Status: {status}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Profile Not Found</h1>
          <p className="text-slate-600">Unable to load your profile information.</p>
          <div className="mt-4">
            <button 
              onClick={fetchProfile} 
              className="btn btn-primary"
            >
              Retry Loading Profile
            </button>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            <p>Debug Info:</p>
            <p>Session: {session ? 'Yes' : 'No'}</p>
            <p>Status: {status}</p>
            <p>User ID: {session?.user?.id || 'None'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile</h1>
        <p className="text-slate-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-content">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar
                    name={profile.name}
                    size={120}
                    variant="beam"
                    colors={["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"]}
                  />
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-4">{profile.name}</h2>
                <p className="text-slate-600 mb-2">{profile.email}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profile.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {profile.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Reputation</span>
                  <span className="font-medium text-slate-900">{profile.reputation}/100</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Member since</span>
                  <span className="font-medium text-slate-900">
                    {new Date(profile.createdAt).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-6">
            <div className="card-header">
              <h3 className="card-title">Quick Stats</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Contributions</span>
                  <span className="font-medium text-slate-900">{profile.totalContributions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Earnings</span>
                  <span className="font-medium text-blue-600">{formatCurrency(profile.totalEarnings)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Reputation Score</span>
                  <span className="font-medium text-slate-900">{profile.reputation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="card-title">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline btn-sm"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary btn-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="card-content">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phoneNumber}
                      onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      className="input w-full"
                      rows={3}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={editForm.emergencyContact}
                      onChange={(e) => setEditForm({...editForm, emergencyContact: e.target.value})}
                      className="input w-full"
                      placeholder="Enter emergency contact number"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 mb-2">Contact Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600">Phone Number</span>
                        <p className="text-slate-900">{profile.phoneNumber || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Address</span>
                        <p className="text-slate-900">{profile.address || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Emergency Contact</span>
                        <p className="text-slate-900">{profile.emergencyContact || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-500 mb-2">Account Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600">Email</span>
                        <p className="text-slate-900">{profile.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Member Since</span>
                        <p className="text-slate-900">
                          {new Date(profile.createdAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 