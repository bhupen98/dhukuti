"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "boring-avatars";
import { Button } from "@/components/common/Button";
import { formatCurrency } from "@/lib/utils";
import { dhukutiToast } from "@/lib/toast";
import PasswordChangeModal from "@/components/profile/PasswordChangeModal";
import AvatarUpload from "@/components/profile/AvatarUpload";

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

interface Activity {
  id: string;
  type: string;
  description: string;
  amount?: number;
  groupName?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
  });
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
          setEditForm({
            name: data.data.name,
            phoneNumber: data.data.phoneNumber || "",
            address: data.data.address || "",
            emergencyContact: data.data.emergencyContact || "",
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        dhukutiToast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/user/activities');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchProfile();
    fetchActivities();
  }, [session, status, router]);

  const handleSave = async () => {
    setSaving(true);
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
        dhukutiToast.error("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      dhukutiToast.error("Failed to update profile");
    } finally {
      setSaving(false);
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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-clean">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-32 bg-slate-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-20 bg-slate-200 rounded-lg"></div>
                <div className="h-20 bg-slate-200 rounded-lg"></div>
                <div className="h-20 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-slate-200 rounded-lg"></div>
                <div className="h-40 bg-slate-200 rounded-lg"></div>
              </div>
                      </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-clean flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Profile Not Found</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-clean">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Card */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <AvatarUpload
              name={profile.name}
              currentAvatar={profile.avatar}
              onAvatarChange={(avatarUrl) => {
                setProfile(prev => prev ? { ...prev, avatar: avatarUrl } : null);
              }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{profile.name}</h1>
              <p className="text-slate-600 mb-3">{profile.email}</p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  profile.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {profile.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
                </span>
                <span className="text-sm text-slate-500">
                  Reputation: {profile.reputation}/100
                </span>
                <span className="text-sm text-slate-500">
                  Member since {new Date(profile.createdAt).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="metric-value">{profile.totalContributions}</div>
                    <div className="metric-label">Total Contributions</div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="metric-value">{formatCurrency(profile.totalEarnings)}</div>
                    <div className="metric-label">Total Earnings</div>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="metric-value">{profile.reputation}</div>
                    <div className="metric-label">Reputation Score</div>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Contact Information</h2>
                <p className="card-description">Your personal contact details</p>
              </div>
              <div className="card-content">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="md:col-span-2">
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
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={editForm.emergencyContact}
                        onChange={(e) => setEditForm({...editForm, emergencyContact: e.target.value})}
                        className="input w-full"
                        placeholder="Name and phone number of emergency contact"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <p className="text-slate-900">{profile.phoneNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Address
                      </label>
                      <p className="text-slate-900">{profile.address || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Emergency Contact
                      </label>
                      <p className="text-slate-900">{profile.emergencyContact || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Member Since
                      </label>
                      <p className="text-slate-900">
                        {new Date(profile.createdAt).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
                <p className="card-description">Your latest contributions and activities</p>
              </div>
              <div className="card-content">
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.description}</p>
                          {activity.amount && (
                            <p className="text-xs text-slate-600">{formatCurrency(activity.amount)}</p>
                          )}
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(activity.createdAt).toLocaleDateString('en-AU', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-slate-500">No recent activity</p>
                    <p className="text-sm text-slate-400">Your contributions and activities will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Settings */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Security</h3>
                <p className="card-description">Manage your account security</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                                     <button 
                     onClick={() => setShowPasswordModal(true)}
                     className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3"
                   >
                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                       <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                       </svg>
                     </div>
                     <div>
                       <p className="text-sm font-medium text-slate-900">Change Password</p>
                       <p className="text-xs text-slate-600">Update your account password</p>
                     </div>
                   </button>

                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Two-Factor Auth</p>
                      <p className="text-xs text-slate-600">Add extra security to your account</p>
                    </div>
                  </button>

                  <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Privacy Settings</p>
                      <p className="text-xs text-slate-600">Control your privacy preferences</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Notifications</h3>
                <p className="card-description">Manage your notification preferences</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                      <p className="text-xs text-slate-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">SMS Notifications</p>
                      <p className="text-xs text-slate-600">Receive updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Contribution Reminders</p>
                      <p className="text-xs text-slate-600">Get reminded about due contributions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
} 