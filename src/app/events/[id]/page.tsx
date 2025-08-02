"use client";

import { useSession } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { dhukutiToast } from "@/lib/toast";

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
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  longDescription: string;
  agenda: string[];
  requirements: string[];
  tags: string[];
}

export default function EventDetailPage() {
  const { session, status } = useAuthGuard();
  const params = useParams();
  const router = useRouter();
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
      longDescription: "Join us for our monthly community meetup where we celebrate our culture, share stories, and build lasting friendships. This event brings together Nepalese community members from across Sydney for an evening of cultural exchange, networking, and community building. Whether you're a long-time resident or new to Sydney, this is the perfect opportunity to connect with fellow Nepalese community members.",
      date: "2024-12-15",
      time: "6:00 PM",
      location: "Sydney Community Center",
      type: "Community",
      attendees: 45,
      maxAttendees: 60,
      status: "Upcoming",
      organizer: "Sydney Nepalese Association",
      contactEmail: "info@sydneynepalese.org",
      contactPhone: "+61 2 9123 4567",
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
      ],
      agenda: [
        "6:00 PM - Welcome and Registration",
        "6:30 PM - Cultural Performance",
        "7:00 PM - Community Networking",
        "8:00 PM - Traditional Dinner",
        "9:00 PM - Cultural Activities",
        "10:00 PM - Closing Remarks"
      ],
      requirements: [
        "All ages welcome",
        "Traditional dress encouraged",
        "Bring your own cultural items to share"
      ],
      tags: ["Community", "Cultural", "Networking", "Dinner"]
    },
    {
      id: "2",
      title: "Dhukuti Group Formation Workshop",
      description: "Learn how to start and manage your own Dhukuti savings group",
      longDescription: "This comprehensive workshop will teach you everything you need to know about starting and managing a successful Dhukuti savings group. From understanding the traditional Nepalese concept of community savings to modern digital tools for group management, this workshop covers all aspects of Dhukuti group formation and operation.",
      date: "2024-12-20",
      time: "2:00 PM",
      location: "Melbourne Library",
      type: "Workshop",
      attendees: 12,
      maxAttendees: 20,
      status: "Upcoming",
      organizer: "Melbourne Financial Literacy Center",
      contactEmail: "workshops@mflc.org.au",
      contactPhone: "+61 3 9876 5432",
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
      ],
      agenda: [
        "2:00 PM - Introduction to Dhukuti",
        "2:30 PM - Group Formation Process",
        "3:30 PM - Digital Tools and Management",
        "4:30 PM - Legal and Financial Considerations",
        "5:30 PM - Q&A and Networking",
        "6:00 PM - Workshop Conclusion"
      ],
      requirements: [
        "Basic understanding of community savings",
        "Laptop or tablet recommended",
        "Pre-workshop reading materials provided"
      ],
      tags: ["Workshop", "Financial", "Education", "Community"]
    },
    {
      id: "3",
      title: "Traditional Nepalese Cooking Class",
      description: "Learn to cook authentic dal bhat, momo, and other Nepalese dishes",
      longDescription: "Master the art of traditional Nepalese cooking in this hands-on workshop. Learn to prepare authentic dishes including dal bhat, momo, and other beloved Nepalese recipes. Our expert chef will guide you through each step, sharing cultural insights and cooking techniques passed down through generations.",
      date: "2024-12-22",
      time: "10:00 AM",
      location: "Perth Community Kitchen",
      type: "Cultural",
      attendees: 18,
      maxAttendees: 25,
      status: "Upcoming",
      organizer: "Perth Cultural Exchange",
      contactEmail: "cooking@perthcultural.org",
      contactPhone: "+61 8 8765 4321",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
      ticketTypes: [
        {
          id: "3-1",
          name: "Cooking Class",
          price: 45,
          description: "Hands-on cooking experience with ingredients provided",
          available: 7,
          benefits: ["All ingredients provided", "Recipe booklet", "Take-home samples", "Chef guidance"]
        },
        {
          id: "3-2",
          name: "Observer Pass",
          price: 15,
          description: "Watch and learn without hands-on participation",
          available: 10,
          benefits: ["Observation access", "Recipe booklet", "Q&A session"]
        }
      ],
      agenda: [
        "10:00 AM - Introduction and Safety Briefing",
        "10:30 AM - Dal Bhat Preparation",
        "11:30 AM - Momo Making Workshop",
        "12:30 PM - Traditional Spice Blending",
        "1:30 PM - Lunch and Cultural Discussion",
        "2:30 PM - Recipe Sharing and Q&A"
      ],
      requirements: [
        "Closed-toe shoes required",
        "Apron provided",
        "Dietary restrictions accommodated"
      ],
      tags: ["Cooking", "Cultural", "Hands-on", "Food"]
    }
  ];

  const event = events.find(e => e.id === params.id);

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

  const openPurchaseModal = () => {
    if (event?.ticketTypes.length) {
      setSelectedTicketType(event.ticketTypes[0]);
      setQuantity(1);
      setIsPurchaseModalOpen(true);
    }
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedTicketType(null);
    setQuantity(1);
  };

  const handlePurchase = async () => {
    if (!event || !selectedTicketType) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dhukutiToast.success(`Successfully purchased ${quantity} ticket(s) for ${event.title}!`);
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link href="/events" className="action-btn action-btn-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                <p className="text-gray-600">Event Details</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/events" className="action-btn action-btn-outline">
                All Events
              </Link>
              {event.status === "Upcoming" && event.ticketTypes.some(t => t.available > 0) && (
                <button 
                  onClick={openPurchaseModal}
                  className="action-btn action-btn-primary"
                >
                  Buy Tickets
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            {event.image && (
              <div className="relative h-64 overflow-hidden rounded-lg">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            )}

            {/* Event Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{event.longDescription}</p>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Attendees</p>
                      <p className="text-sm text-gray-600">{event.attendees}/{event.maxAttendees} registered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Organizer</p>
                      <p className="text-sm text-gray-600">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Agenda</h2>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {event.requirements && event.requirements.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <div className="space-y-2">
                  {event.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-gray-700">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets</h2>
              <div className="space-y-4">
                {event.ticketTypes.map((ticketType) => (
                  <div key={ticketType.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{ticketType.name}</h3>
                      <span className="text-lg font-semibold text-gray-900">${ticketType.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticketType.description}</p>
                    <div className="space-y-2 mb-3">
                      {ticketType.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{ticketType.available} available</span>
                      {ticketType.available > 0 ? (
                        <button 
                          onClick={() => {
                            setSelectedTicketType(ticketType);
                            setQuantity(1);
                            setIsPurchaseModalOpen(true);
                          }}
                          className="action-btn action-btn-primary"
                        >
                          Select
                        </button>
                      ) : (
                        <span className="text-sm text-red-600 font-medium">Sold Out</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{event.contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{event.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Event */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Share This Event</h2>
              <div className="flex space-x-2">
                <button className="flex-1 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="flex-1 p-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && selectedTicketType && (
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.time}</span>
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Ticket Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Ticket Type</label>
                <div className="space-y-3">
                  {event.ticketTypes.map((ticketType) => (
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