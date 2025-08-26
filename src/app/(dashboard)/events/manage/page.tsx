"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MarketingDashboard } from "@/components/events/MarketingDashboard";
import { TicketManager } from "@/components/events/TicketManager";
import { TeamCollaboration } from "@/components/events/TeamCollaboration";
import { useAuthGuard } from "@/lib/hooks/auth/useAuthGuard";

interface ManagedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  price: number;
  currency: string;
  capacity: number;
  soldTickets: number;
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled";
  revenue: number;
  views: number;
  image: string;
  createdAt: string;
}

export default function ManageEventsPage() {
  const { session, status } = useAuthGuard();
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "revenue" | "views">("date");
  // Phase 2 additions
  const [activeTab, setActiveTab] = useState<"events" | "marketing" | "tickets" | "team">("events");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Demo data for managed events
  useEffect(() => {
    if (session?.user?.email === 'demo@example.com') {
      const demoManagedEvents: ManagedEvent[] = [
        {
          id: "1",
          title: "Financial Planning Workshop",
          date: "2024-01-28",
          time: "14:00",
          location: "Melbourne",
          venue: "Melbourne Convention Centre",
          category: "workshop",
          price: 25,
          currency: "AUD",
          capacity: 100,
          soldTickets: 75,
          status: "published",
          revenue: 1875,
          views: 245,
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
          createdAt: "2024-01-15"
        },
        {
          id: "2",
          title: "Dhukuti Community Meetup",
          date: "2024-01-30",
          time: "19:00",
          location: "Brisbane",
          venue: "Brisbane Community Hall",
          category: "meeting",
          price: 0,
          currency: "AUD",
          capacity: 50,
          soldTickets: 35,
          status: "published",
          revenue: 0,
          views: 89,
          image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
          createdAt: "2024-01-10"
        },
        {
          id: "3",
          title: "New Year Savings Celebration",
          date: "2024-01-01",
          time: "21:00",
          location: "Gold Coast",
          venue: "Gold Coast Convention Centre",
          category: "celebration",
          price: 30,
          currency: "AUD",
          capacity: 200,
          soldTickets: 200,
          status: "completed",
          revenue: 6000,
          views: 567,
          image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop",
          createdAt: "2023-12-20"
        },
        {
          id: "4",
          title: "Summer Music Festival",
          date: "2024-02-15",
          time: "18:00",
          location: "Sydney",
          venue: "Bondi Beach",
          category: "concert",
          price: 80,
          currency: "AUD",
          capacity: 500,
          soldTickets: 0,
          status: "draft",
          revenue: 0,
          views: 12,
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
          createdAt: "2024-01-20"
        }
      ];
      setEvents(demoManagedEvents);
      setIsLoading(false);
    }
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "text-gray-600 bg-gray-100";
      case "published": return "text-blue-600 bg-blue-100";
      case "ongoing": return "text-green-600 bg-green-100";
      case "completed": return "text-purple-600 bg-purple-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return "📝";
      case "published": return "✅";
      case "ongoing": return "🎉";
      case "completed": return "🏁";
      case "cancelled": return "❌";
      default: return "📝";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (sold: number, capacity: number) => {
    return Math.round((sold / capacity) * 100);
  };

  const filteredEvents = events.filter(event => 
    filterStatus === "all" || event.status === filterStatus
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "revenue":
        return b.revenue - a.revenue;
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const totalTicketsSold = events.reduce((sum, event) => sum + event.soldTickets, 0);
  const totalViews = events.reduce((sum, event) => sum + event.views, 0);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-2">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
            <p className="text-gray-600 mt-1">Track and manage your created events</p>
          </div>
          <Link
            href="/events/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Create New Event</span>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "events", name: "Events", icon: "📅" },
            { id: "marketing", name: "Marketing", icon: "📈" },
            { id: "tickets", name: "Tickets", icon: "🎫" },
            { id: "team", name: "Team", icon: "👥" }
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

      {/* Marketing Dashboard */}
      {activeTab === "marketing" && (
        <MarketingDashboard eventId={selectedEvent || "demo"} />
      )}

      {/* Ticket Manager */}
      {activeTab === "tickets" && (
        <TicketManager eventId={selectedEvent || "demo"} />
      )}

      {/* Team Collaboration */}
      {activeTab === "team" && (
        <TeamCollaboration eventId={selectedEvent || "demo"} />
      )}

      {/* Events Management (Original Content) */}
      {activeTab === "events" && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tickets Sold</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTicketsSold}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🎫</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">👁️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Events</option>
                  <option value="draft">Drafts</option>
                  <option value="published">Published</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "revenue" | "views")}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="revenue">Sort by Revenue</option>
                  <option value="views">Sort by Views</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredEvents.length} of {events.length} events
              </div>
            </div>
          </div>

          {/* Events List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : sortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Create your first event to get started</p>
              <Link
                href="/events/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-32 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(event.date)} at {event.time} • {event.venue}, {event.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                            {getStatusIcon(event.status)} {event.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Tickets</p>
                          <p className="font-medium">{event.soldTickets}/{event.capacity}</p>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-600 h-1 rounded-full"
                              style={{ width: `${getProgressPercentage(event.soldTickets, event.capacity)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-medium">${event.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Views</p>
                          <p className="font-medium">{event.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="font-medium">{event.price === 0 ? "Free" : `${event.currency} ${event.price}`}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                          📊 Analytics
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                          ✏️ Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          👁️ View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 