"use client";

import React, { useState, useEffect } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  avatar: string;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  joinDate: string;
  lastActive: string;
  eventsManaged: number;
}

interface TeamInvitation {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  invitedBy: string;
  invitedAt: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: string;
}

interface TeamRole {
  name: string;
  permissions: string[];
  description: string;
  color: string;
}

export function TeamCollaboration({ eventId }: { eventId: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"members" | "invitations" | "roles" | "activity">("members");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "editor" | "viewer">("viewer");

  // Demo data for team collaboration
  useEffect(() => {
    const demoMembers: TeamMember[] = [
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        role: "owner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        status: "active",
        permissions: ["manage_team", "manage_events", "view_analytics", "manage_billing"],
        joinDate: "2023-06-15",
        lastActive: "2024-01-20T10:30:00Z",
        eventsManaged: 5
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        status: "active",
        permissions: ["manage_events", "view_analytics"],
        joinDate: "2023-08-22",
        lastActive: "2024-01-19T14:20:00Z",
        eventsManaged: 3
      },
      {
        id: "3",
        name: "Mike Wilson",
        email: "mike@example.com",
        role: "editor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        status: "active",
        permissions: ["edit_events", "view_analytics"],
        joinDate: "2023-09-10",
        lastActive: "2024-01-18T09:15:00Z",
        eventsManaged: 2
      },
      {
        id: "4",
        name: "Lisa Brown",
        email: "lisa@example.com",
        role: "viewer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
        status: "pending",
        permissions: ["view_events"],
        joinDate: "2024-01-15",
        lastActive: "2024-01-15T16:45:00Z",
        eventsManaged: 0
      }
    ];

    const demoInvitations: TeamInvitation[] = [
      {
        id: "1",
        email: "alex@example.com",
        role: "editor",
        invitedBy: "John Smith",
        invitedAt: "2024-01-20T10:00:00Z",
        status: "pending",
        expiresAt: "2024-01-27T10:00:00Z"
      },
      {
        id: "2",
        email: "emma@example.com",
        role: "viewer",
        invitedBy: "Sarah Johnson",
        invitedAt: "2024-01-19T14:00:00Z",
        status: "pending",
        expiresAt: "2024-01-26T14:00:00Z"
      }
    ];

    setMembers(demoMembers);
    setInvitations(demoInvitations);
    setIsLoading(false);
  }, [eventId]);

  const roles: TeamRole[] = [
    {
      name: "Owner",
      permissions: ["manage_team", "manage_events", "view_analytics", "manage_billing"],
      description: "Full access to all features and team management",
      color: "text-purple-600 bg-purple-100"
    },
    {
      name: "Admin",
      permissions: ["manage_events", "view_analytics"],
      description: "Can manage events and view analytics",
      color: "text-red-600 bg-red-100"
    },
    {
      name: "Editor",
      permissions: ["edit_events", "view_analytics"],
      description: "Can edit events and view analytics",
      color: "text-blue-600 bg-blue-100"
    },
    {
      name: "Viewer",
      permissions: ["view_events"],
      description: "Can only view events and basic information",
      color: "text-green-600 bg-green-100"
    }
  ];

  const getRoleColor = (role: string) => {
    const roleInfo = roles.find(r => r.name.toLowerCase() === role);
    return roleInfo?.color || "text-gray-600 bg-gray-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "inactive": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newInvitation: TeamInvitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedBy: "Current User",
      invitedAt: new Date().toISOString(),
      status: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    setInvitations(prev => [...prev, newInvitation]);
    setInviteEmail("");
    setInviteRole("viewer");
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleCancelInvitation = (invitationId: string) => {
    setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Team Collaboration</h2>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Invite Member</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "members", name: "Team Members", icon: "👥" },
            { id: "invitations", name: "Invitations", icon: "📧" },
            { id: "roles", name: "Roles & Permissions", icon: "🔐" },
            { id: "activity", name: "Activity", icon: "📊" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Members Tab */}
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Managed:</span>
                    <span className="font-medium">{member.eventsManaged}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="font-medium">{formatDate(member.joinDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Active:</span>
                    <span className="font-medium">{formatDate(member.lastActive)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                      ✏️ Edit Role
                    </button>
                    {member.role !== "owner" && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        🚫 Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invitations Tab */}
      {activeTab === "invitations" && (
        <div className="space-y-4">
          {invitations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">📧</div>
              <p className="text-gray-600">No pending invitations</p>
            </div>
          ) : (
            <div className="space-y-3">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{invitation.email}</h3>
                      <p className="text-sm text-gray-600">
                        Invited by {invitation.invitedBy} • {formatDate(invitation.invitedAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(invitation.role)}`}>
                        {invitation.role}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        invitation.status === "pending" ? "text-yellow-600 bg-yellow-100" :
                        invitation.status === "accepted" ? "text-green-600 bg-green-100" :
                        "text-red-600 bg-red-100"
                      }`}>
                        {invitation.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">
                        Expires: {formatDate(invitation.expiresAt)}
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                          📧 Resend
                        </button>
                        <button
                          onClick={() => handleCancelInvitation(invitation.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.name} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                    {role.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions:</h4>
                  <div className="space-y-1">
                    {role.permissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-gray-700">{permission.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-900">Permission</th>
                    {roles.map((role) => (
                      <th key={role.name} className="text-center py-2 px-4 font-medium text-gray-900">
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["manage_team", "manage_events", "edit_events", "view_events", "view_analytics", "manage_billing"].map((permission) => (
                    <tr key={permission} className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm text-gray-700">{permission.replace('_', ' ')}</td>
                      {roles.map((role) => (
                        <td key={role.name} className="text-center py-2 px-4">
                          {role.permissions.includes(permission) ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-gray-300">✗</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Team Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson joined the team</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">📅</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Mike Wilson created a new event</p>
                  <p className="text-xs text-gray-600">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🔐</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Lisa Brown's role was updated to Editor</p>
                  <p className="text-xs text-gray-600">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm">📧</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Invitation sent to alex@example.com</p>
                  <p className="text-xs text-gray-600">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleInviteMember}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <span className="text-blue-600 text-lg">📧</span>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Invite Team Member
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="colleague@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value as any)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="viewer">Viewer</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Send Invitation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 