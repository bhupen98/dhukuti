"use client";

import { useAuthGuard } from "@/lib/hooks/auth/useAuthGuard";
import Link from "next/link";
import { useState } from "react";
import { dhukutiToast } from "@/lib/utils/toast";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  benefits: string[];
}

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
  image?: string;
  ticketTypes: TicketType[];
}

export default function EventsPage() {
  const { session, status } = useAuthGuard();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "1-1",
          name: "General Admission",
          price: 15,
          description: "Standard entry to the community meetup",
          available: 15,
          benefits: ["Access to all activities", "Refreshments included", "Networking opportunities"]
        },
        {
          id: "1-2",
          name: "VIP Pass",
          price: 35,
          description: "Premium experience with exclusive benefits",
          available: 5,
          benefits: ["Priority seating", "Exclusive networking session", "Complimentary dinner", "Event merchandise"]
        }
      ]
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
      image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "2-1",
          name: "Workshop Ticket",
          price: 25,
          description: "Full workshop participation with materials",
          available: 8,
          benefits: ["Comprehensive workshop materials", "Certificate of completion", "Q&A session", "Resource pack"]
        }
      ]
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
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "3-1",
          name: "Festival Pass",
          price: 20,
          description: "Access to all festival activities",
          available: 0,
          benefits: ["All performances", "Food stalls access", "Cultural activities", "Festival program"]
        }
      ]
    },
    {
      id: "4",
      title: "Traditional Nepalese Cooking Class",
      description: "Learn to cook authentic dal bhat, momo, and other Nepalese dishes",
      date: "2024-12-22",
      time: "10:00 AM",
      location: "Perth Community Kitchen",
      type: "Cultural",
      attendees: 18,
      maxAttendees: 25,
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "4-1",
          name: "Cooking Class",
          price: 45,
          description: "Hands-on cooking experience with ingredients provided",
          available: 7,
          benefits: ["All ingredients provided", "Recipe booklet", "Take-home samples", "Chef guidance"]
        },
        {
          id: "4-2",
          name: "Observer Pass",
          price: 15,
          description: "Watch and learn without hands-on participation",
          available: 10,
          benefits: ["Observation access", "Recipe booklet", "Q&A session"]
        }
      ]
    },
    {
      id: "5",
      title: "Financial Literacy for Nepalese Migrants",
      description: "Essential banking and investment knowledge for new migrants in Australia",
      date: "2025-01-05",
      time: "2:00 PM",
      location: "Adelaide Business Center",
      type: "Educational",
      attendees: 8,
      maxAttendees: 30,
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "5-1",
          name: "Seminar Ticket",
          price: 30,
          description: "Educational seminar with expert speakers",
          available: 22,
          benefits: ["Expert presentations", "Resource materials", "Networking break", "Q&A session"]
        }
      ]
    },
    {
      id: "6",
      title: "Dashain Celebration 2024",
      description: "Traditional Dashain festival celebration with community feast and cultural programs",
      date: "2024-10-15",
      time: "5:00 PM",
      location: "Melbourne Convention Center",
      type: "Festival",
      attendees: 200,
      maxAttendees: 250,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "6-1",
          name: "Celebration Pass",
          price: 25,
          description: "Full access to Dashain celebration",
          available: 0,
          benefits: ["Traditional feast", "Cultural performances", "Family activities", "Festival atmosphere"]
        }
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "ongoing":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "community":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "workshop":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "festival":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "meeting":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "cultural":
        return "bg-pink-100 text-pink-800 border border-pink-200";
      case "educational":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const openPurchaseModal = (event: Event) => {
    setSelectedEvent(event);
    setSelectedTicketType(event.ticketTypes[0]);
    setQuantity(1);
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedEvent(null);
    setSelectedTicketType(null);
    setQuantity(1);
  };

  const handlePurchase = async () => {
    if (!selectedEvent || !selectedTicketType) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dhukutiToast.success(`Successfully purchased ${quantity} ticket(s) for ${selectedEvent.title}!`);
      closePurchaseModal();
    } catch (error) {
      dhukutiToast.error("Failed to purchase tickets. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = selectedTicketType ? selectedTicketType.price * quantity : 0;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Community Events</h1>
          <p className="text-sm text-gray-600">
            Discover and join Nepalese community events across Australia
          </p>
        </div>

        {/* Demo Notice */}
        {session?.user?.email === 'demo@example.com' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> Viewing sample events. Create real events to connect with your community!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {true ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={event.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors overflow-hidden flex flex-col h-full">
                {/* Event Image */}
                {event.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Event Header */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-gray-600">{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-gray-600">From ${Math.min(...event.ticketTypes.map(t => t.price))}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-auto">
                    {event.status === "Upcoming" && event.ticketTypes.some(t => t.available > 0) ? (
                      <button 
                        onClick={() => openPurchaseModal(event)}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      >
                        Buy Tickets
                      </button>
                    ) : (
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-500 rounded-md text-sm font-medium cursor-not-allowed">
                        {event.status === "Completed" ? "Ended" : "Sold Out"}
                      </button>
                    )}
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-sm text-gray-600 mb-6">
              Create or join community events to connect with your Nepalese community
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/events/create" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create Your First Event
              </Link>
              <Link 
                href="/events" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          </div>
        )}

        {/* Create Your Own Event */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🎉</div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Want to host an event?</h3>
            <p className="text-sm text-blue-700 mb-4">
              Create your own community event and bring people together for cultural celebrations, workshops, or networking!
            </p>
            <Link
              href="/events/create"
              className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create New Event
            </Link>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Purchase Tickets</h2>
                <button
                  onClick={closePurchaseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedEvent.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  <span>{selectedEvent.time}</span>
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Ticket Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Ticket Type</label>
                <div className="space-y-3">
                  {selectedEvent.ticketTypes.map((ticketType) => (
                    <div
                      key={ticketType.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedTicketType?.id === ticketType.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTicketType(ticketType)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{ticketType.name}</h4>
                        <span className="text-lg font-semibold text-gray-900">${ticketType.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticketType.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{ticketType.available} available</span>
                        <div className="flex space-x-1">
                          {ticketType.benefits.slice(0, 2).map((benefit, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              {selectedTicketType && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedTicketType.available, quantity + 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-500">Max: {selectedTicketType.available}</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${totalPrice}</span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={isProcessing || !selectedTicketType}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Purchase ${quantity} Ticket${quantity > 1 ? 's' : ''}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 