"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "boring-avatars";
import { Button } from "@/components/common/Button";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-8">
          <Avatar
            name={profile.name}
            size={80}
            variant="beam"
            colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]}
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                profile.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profile.isVerified ? 'Verified' : 'Pending Verification'}
              </span>
              <span className="text-sm text-gray-500">
                Reputation: {profile.reputation}/100
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{profile.totalContributions}</div>
            <div className="text-sm text-gray-600">Total Contributions</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(profile.totalEarnings)}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{profile.reputation}</div>
            <div className="text-sm text-gray-600">Reputation Score</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <p className="text-gray-900">{profile.phoneNumber || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <p className="text-gray-900">{profile.address || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <p className="text-gray-900">{profile.emergencyContact || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <p className="text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
          <Button>Edit Profile</Button>
          <Button variant="outline">Change Password</Button>
          <Button variant="ghost">Privacy Settings</Button>
        </div>
      </div>
    </div>
  );
} 