"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: "concert" | "workshop" | "meeting" | "celebration" | "sports" | "cultural";
  price: number;
  currency: string;
  capacity: number;
  soldTickets: number;
  image: string;
  organizer: {
    name: string;
    avatar: string;
  };
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  tags: string[];
  featured: boolean;
}

export default function EventsPage() {
  const { session, status } = useAuthGuard();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price" | "popularity">("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Demo events data
  useEffect(() => {
    if (session?.user?.email === 'demo@example.com') {
      const demoEvents: Event[] = [
        {
          id: "1",
          title: "Sydney Music Festival 2024",
          description: "A spectacular music festival featuring top artists from around the world. Experience amazing performances, food, and entertainment.",
          date: "2024-02-15",
          time: "18:00",
          location: "Sydney",
          venue: "Sydney Opera House",
          category: "concert",
          price: 150,
          currency: "AUD",
          capacity: 2000,
          soldTickets: 1800,
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
          organizer: {
            name: "Sydney Events Co.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sydney"
          },
          status: "upcoming",
          tags: ["Music", "Festival", "Live Performance"],
          featured: true
        },
        {
          id: "2",
          title: "Financial Planning Workshop",
          description: "Learn essential financial planning strategies for better savings and investment decisions. Perfect for Dhukuti group members.",
          date: "2024-01-28",
          time: "14:00",
          location: "Melbourne",
          venue: "Melbourne Convention Centre",
          category: "workshop",
          price: 25,
          currency: "AUD",
          capacity: 100,
          soldTickets: 75,
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
          organizer: {
            name: "Finance Experts",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=finance"
          },
          status: "upcoming",
          tags: ["Finance", "Education", "Workshop"],
          featured: false
        },
        {
          id: "3",
          title: "Dhukuti Community Meetup",
          description: "Monthly meetup for Dhukuti group members to network, share experiences, and plan future activities.",
          date: "2024-01-30",
          time: "19:00",
          location: "Brisbane",
          venue: "Brisbane Community Hall",
          category: "meeting",
          price: 0,
          currency: "AUD",
          capacity: 50,
          soldTickets: 35,
          image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
          organizer: {
            name: "Dhukuti Community",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dhukuti"
          },
          status: "upcoming",
          tags: ["Community", "Networking", "Free"],
          featured: true
        },
        {
          id: "4",
          title: "Bollywood Night Celebration",
          description: "Celebrate Indian culture with Bollywood music, dance performances, and traditional cuisine.",
          date: "2024-02-10",
          time: "20:00",
          location: "Perth",
          venue: "Perth Cultural Centre",
          category: "cultural",
          price: 45,
          currency: "AUD",
          capacity: 300,
          soldTickets: 250,
          image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop",
          organizer: {
            name: "Cultural Events Australia",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cultural"
          },
          status: "upcoming",
          tags: ["Cultural", "Bollywood", "Dance"],
          featured: false
        },
        {
          id: "5",
          title: "Cricket Match: Australia vs India",
          description: "Witness an exciting cricket match between Australia and India. Great atmosphere and entertainment.",
          date: "2024-02-20",
          time: "14:30",
          location: "Adelaide",
          venue: "Adelaide Oval",
          category: "sports",
          price: 80,
          currency: "AUD",
          capacity: 50000,
          soldTickets: 45000,
          image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
          organizer: {
            name: "Cricket Australia",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cricket"
          },
          status: "upcoming",
          tags: ["Sports", "Cricket", "International"],
          featured: true
        },
        {
          id: "6",
          title: "New Year Savings Celebration",
          description: "Ring in the new year with a special celebration for Dhukuti members. Food, music, and savings tips.",
          date: "2024-01-01",
          time: "21:00",
          location: "Gold Coast",
          venue: "Gold Coast Convention Centre",
          category: "celebration",
          price: 30,
          currency: "AUD",
          capacity: 200,
          soldTickets: 200,
          image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop",
          organizer: {
            name: "Dhukuti Community",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dhukuti"
          },
          status: "completed",
          tags: ["Celebration", "New Year", "Community"],
          featured: false
        }
      ];
      setEvents(demoEvents);
      setFilteredEvents(demoEvents);
      setIsLoading(false);
    }
  }, [session]);

  // Filter and sort events
  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price":
          return a.price - b.price;
        case "popularity":
          return (b.soldTickets / b.capacity) - (a.soldTickets / a.capacity);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchQuery, sortBy]);

  const categories = [
    { id: "all", name: "All Events", icon: "🎉" },
    { id: "concert", name: "Concerts", icon: "🎵" },
    { id: "workshop", name: "Workshops", icon: "📚" },
    { id: "meeting", name: "Meetings", icon: "🤝" },
    { id: "celebration", name: "Celebrations", icon: "🎊" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "cultural", name: "Cultural", icon: "🎭" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-blue-600 bg-blue-100";
      case "ongoing": return "text-green-600 bg-green-100";
      case "completed": return "text-gray-600 bg-gray-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getAvailabilityColor = (sold: number, capacity: number) => {
    const percentage = (sold / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBuyTicket = (event: Event) => {
    // TODO: Implement ticket purchase flow
    alert(`Redirecting to ticket purchase for ${event.title}`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading events...</p>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events & Tickets</h1>
            <p className="text-gray-600 mt-1">Discover amazing events and purchase tickets</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/events/manage"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <span>📊</span>
              <span>Manage Events</span>
            </Link>
            <Link
              href="/events/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Create Event</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      {session?.user?.email === 'demo@example.com' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 text-lg mr-2">🎫</span>
            <div>
              <p className="text-blue-800 font-medium">Demo Events Active</p>
              <p className="text-blue-700 text-sm">Browse sample events and explore the ticket booking experience!</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Sort and View */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "price" | "popularity")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="popularity">Sort by Popularity</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              >
                📱
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              >
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      {filteredEvents.filter(e => e.featured).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents
              .filter(event => event.featured)
              .slice(0, 3)
              .map((event) => (
                <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                        ⭐ Featured
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>📅 {formatDate(event.date)}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {event.price === 0 ? "Free" : `${event.currency} ${event.price}`}
                      </span>
                      <span className={`text-sm font-medium ${getAvailabilityColor(event.soldTickets, event.capacity)}`}>
                        {event.capacity - event.soldTickets} tickets left
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuyTicket(event)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Buy Tickets
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Events</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredEvents.map((event) => (
              <div key={event.id} className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}>
                {viewMode === "list" ? (
                  <>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-48 h-32 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📅 {formatDate(event.date)}</span>
                          <span>📍 {event.location}</span>
                          <span>💰 {event.price === 0 ? "Free" : `${event.currency} ${event.price}`}</span>
                        </div>
                        <button
                          onClick={() => handleBuyTicket(event)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>📅 {formatDate(event.date)}</span>
                        <span>📍 {event.location}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {event.price === 0 ? "Free" : `${event.currency} ${event.price}`}
                        </span>
                        <span className={`text-sm font-medium ${getAvailabilityColor(event.soldTickets, event.capacity)}`}>
                          {event.capacity - event.soldTickets} tickets left
                        </span>
                      </div>
                      <button
                        onClick={() => handleBuyTicket(event)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Buy Tickets
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 