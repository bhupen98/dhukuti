"use client";

import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  maxAttendees: number;
  status: string;
}

export default function EventsPage() {
  const { session, status } = useAuthGuard();

  // Demo data for demonstration
  const events: Event[] = [
    {
      id: "1",
      title: "Sydney Nepalese Community Meetup",
      description: "Monthly gathering for Sydney-based Nepalese community members",
      date: "2024-12-15",
      time: "6:00 PM",
      location: "Sydney Community Center",
      type: "Community",
      attendees: 45,
      maxAttendees: 60,
      status: "Upcoming",
    },
    {
      id: "2",
      title: "Dhukuti Group Formation Workshop",
      description: "Learn how to start and manage your own Dhukuti savings group",
      date: "2024-12-20",
      time: "2:00 PM",
      location: "Melbourne Library",
      type: "Workshop",
      attendees: 12,
      maxAttendees: 20,
      status: "Upcoming",
    },
    {
      id: "3",
      title: "Brisbane Cultural Festival",
      description: "Annual Nepalese cultural celebration with food, music, and dance",
      date: "2024-11-30",
      time: "4:00 PM",
      location: "Brisbane Park",
      type: "Festival",
      attendees: 120,
      maxAttendees: 150,
      status: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-emerald-100 text-emerald-800";
      case "completed":
        return "bg-slate-100 text-slate-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "community":
        return "bg-purple-100 text-purple-800";
      case "workshop":
        return "bg-amber-100 text-amber-800";
      case "festival":
        return "bg-emerald-100 text-emerald-800";
      case "meeting":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-5 w-5 mx-auto"></div>
          <p className="mt-2 text-slate-600 text-xs">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-base font-bold text-slate-900">Community Events</h1>
        <p className="text-slate-600 mt-0.5 text-xs">Discover and join Nepalese community events across Australia</p>
      </div>

      {/* Demo Notice */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 text-xs mr-1.5">💡</span>
            <div>
              <p className="text-blue-800 font-medium text-xs">Demo Mode Active</p>
              <p className="text-blue-700 text-xs">You're viewing sample events. Create real events to connect with your community!</p>
            </div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      {session?.user?.email === 'demo@example.com' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {events.map((event) => (
            <div key={event.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-3 border-b border-slate-100">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                  </div>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ml-2 ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                  <span>🕒 {event.time}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Location:</span>
                    <span className="font-medium text-slate-800">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Type:</span>
                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Attendees:</span>
                    <span className="font-medium text-slate-800">
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">Registration</span>
                    <span className="text-slate-600">
                      {Math.round((event.attendees / event.maxAttendees) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex space-x-1">
                  <button className="btn btn-primary btn-sm flex-1">
                    Join Event
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-slate-400 text-3xl mb-2">📅</div>
          <h3 className="text-sm font-medium text-slate-900 mb-1">No events yet</h3>
          <p className="text-slate-600 mb-3 text-xs">Create or join community events to connect with your Nepalese community</p>
          <div className="space-x-1.5">
            <Link href="/events/create" className="btn btn-primary btn-sm">
              Create Event
            </Link>
            <Link href="/events/manage" className="btn btn-outline btn-sm">
              Find Events
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Only show when user has events */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mt-4 flex justify-center space-x-2">
          <Link href="/events/create" className="btn btn-primary btn-sm">
            Create Event
          </Link>
          <Link href="/events/manage" className="btn btn-outline btn-sm">
            Manage Events
          </Link>
        </div>
      )}
    </div>
  );
} 