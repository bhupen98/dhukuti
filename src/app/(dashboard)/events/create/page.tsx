"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/auth/useAuthGuard";

interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  currency: string;
  capacity: number;
  image: string;
  tags: string[];
  // Phase 2 additions
  ticketTypes: TicketType[];
  marketingSettings: MarketingSettings;
  eventSettings: EventSettings;
}

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  sold: number;
  benefits: string[];
  isActive: boolean;
  saleStartDate: string;
  saleEndDate: string;
}

interface MarketingSettings {
  socialSharing: boolean;
  emailMarketing: boolean;
  featuredEvent: boolean;
  promotionalCode: string;
  earlyBirdDiscount: number;
  referralReward: number;
  customMessage: string;
}

interface EventSettings {
  allowWaitlist: boolean;
  requireApproval: boolean;
  maxTicketsPerPerson: number;
  refundPolicy: string;
  termsConditions: string;
  contactEmail: string;
  contactPhone: string;
}

export default function CreateEventPage() {
  const { session, status } = useAuthGuard();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    venue: "",
    price: 0,
    currency: "AUD",
    capacity: 100,
    image: "",
    tags: [],
    ticketTypes: [],
    marketingSettings: {
      socialSharing: true,
      emailMarketing: true,
      featuredEvent: false,
      promotionalCode: "",
      earlyBirdDiscount: 0,
      referralReward: 0,
      customMessage: "",
    },
    eventSettings: {
      allowWaitlist: false,
      requireApproval: false,
      maxTicketsPerPerson: 1,
      refundPolicy: "No refunds",
      termsConditions: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const categories = [
    { id: "concert", name: "Concert", icon: "🎵", color: "from-purple-500 to-pink-500" },
    { id: "workshop", name: "Workshop", icon: "📚", color: "from-blue-500 to-cyan-500" },
    { id: "meeting", name: "Meeting", icon: "🤝", color: "from-green-500 to-emerald-500" },
    { id: "celebration", name: "Celebration", icon: "🎊", color: "from-yellow-500 to-orange-500" },
    { id: "sports", name: "Sports", icon: "⚽", color: "from-red-500 to-pink-500" },
    { id: "cultural", name: "Cultural", icon: "🎭", color: "from-indigo-500 to-purple-500" },
    { id: "community", name: "Community", icon: "👥", color: "from-amber-500 to-orange-500" },
    { id: "educational", name: "Educational", icon: "🎓", color: "from-teal-500 to-cyan-500" },
  ];

  const steps = [
    { number: 1, title: "Event Details", description: "Basic information", icon: "📝" },
    { number: 2, title: "Date & Location", description: "Schedule and venue", icon: "📍" },
    { number: 3, title: "Tickets & Pricing", description: "Ticket types and costs", icon: "🎫" },
    { number: 4, title: "Marketing", description: "Promotion settings", icon: "📢" },
    { number: 5, title: "Review & Create", description: "Final confirmation", icon: "✅" },
  ];

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement event creation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Event "${formData.title}" created successfully! Redirecting to events page...`);
      router.push("/events");
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.description;
      case 2:
        return formData.date && formData.time && formData.location && formData.venue;
      case 3:
        return formData.ticketTypes.length > 0;
      case 4:
        return true; // Marketing settings are optional
      case 5:
        return formData.eventSettings.contactEmail;
      default:
        return false;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event creation...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🎉</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Create New Event</h1>
              <p className="text-gray-600">
                Share your event with the Dhukuti community
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 slide-up">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              {steps.map((stepInfo, index) => (
                <div key={stepInfo.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= stepInfo.number 
                        ? "bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg scale-110" 
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {currentStep > stepInfo.number ? "✓" : stepInfo.icon}
                    </div>
                    <div className="text-center mt-2">
                      <p className={`text-xs font-medium ${currentStep >= stepInfo.number ? 'text-gray-900' : 'text-gray-500'}`}>
                        {stepInfo.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{stepInfo.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > stepInfo.number ? "bg-gradient-to-r from-purple-400 to-pink-500" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 slide-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Details</h2>
                  <p className="text-gray-600">Tell us about your event</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter a compelling event title..."
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleInputChange("category", category.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            formData.category === category.id
                              ? `border-purple-400 bg-gradient-to-br ${category.color} text-white shadow-lg`
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="text-sm font-medium">{category.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your event, what attendees can expect, and why they should come..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 resize-none border-gray-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      placeholder="https://example.com/event-image.jpg"
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Add a high-quality image to make your event stand out</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Press Enter to add tags (e.g., networking, food, music)"
                      onKeyPress={handleTagInput}
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                    />
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm rounded-full flex items-center border border-purple-200"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-purple-600 hover:text-purple-800 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Location */}
            {currentStep === 2 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Date & Location</h2>
                  <p className="text-gray-600">When and where is your event happening?</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event Time *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City/Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., Sydney, Melbourne, Brisbane"
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        placeholder="e.g., Sydney Opera House, Melbourne Convention Centre"
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Capacity
                      </label>
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange("capacity", parseInt(e.target.value))}
                        placeholder="100"
                        min="1"
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange("currency", e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                      >
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Ticket Types */}
            {currentStep === 3 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">🎫</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tickets & Pricing</h2>
                  <p className="text-gray-600">Set up your ticket types and pricing</p>
                </div>
                
                <div className="space-y-6">
                  {formData.ticketTypes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎫</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Ticket Types Yet</h3>
                      <p className="text-gray-600 mb-6">Add your first ticket type to get started</p>
                      <button
                        type="button"
                        onClick={() => {
                          const newTicket: TicketType = {
                            id: Date.now().toString(),
                            name: "General Admission",
                            description: "",
                            price: 0,
                            currency: "AUD",
                            quantity: 100,
                            sold: 0,
                            benefits: [],
                            isActive: true,
                            saleStartDate: "",
                            saleEndDate: "",
                          };
                          setFormData(prev => ({
                            ...prev,
                            ticketTypes: [...prev.ticketTypes, newTicket]
                          }));
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        + Add Ticket Type
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.ticketTypes.map((ticket, index) => (
                        <div key={ticket.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Ticket Type {index + 1}</h3>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  ticketTypes: prev.ticketTypes.filter(t => t.id !== ticket.id)
                                }));
                              }}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              ×
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                              <input
                                type="text"
                                value={ticket.name}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].name = e.target.value;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                              <input
                                type="number"
                                value={ticket.price}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].price = parseFloat(e.target.value);
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                              <input
                                type="number"
                                value={ticket.quantity}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].quantity = parseInt(e.target.value);
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                min="1"
                                className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                              <input
                                type="text"
                                value={ticket.description}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].description = e.target.value;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                placeholder="What's included with this ticket?"
                                className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newTicket: TicketType = {
                            id: Date.now().toString(),
                            name: "",
                            description: "",
                            price: 0,
                            currency: "AUD",
                            quantity: 100,
                            sold: 0,
                            benefits: [],
                            isActive: true,
                            saleStartDate: "",
                            saleEndDate: "",
                          };
                          setFormData(prev => ({
                            ...prev,
                            ticketTypes: [...prev.ticketTypes, newTicket]
                          }));
                        }}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-all duration-200"
                      >
                        + Add Another Ticket Type
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Marketing */}
            {currentStep === 4 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">📢</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketing & Promotion</h2>
                  <p className="text-gray-600">Help your event reach more people</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.marketingSettings.socialSharing}
                          onChange={(e) => handleInputChange("marketingSettings", {
                            ...formData.marketingSettings,
                            socialSharing: e.target.checked
                          })}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label className="ml-3 text-sm text-gray-700 font-medium">
                          Enable social sharing
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-8">
                        Allow attendees to share your event on social media
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.marketingSettings.emailMarketing}
                          onChange={(e) => handleInputChange("marketingSettings", {
                            ...formData.marketingSettings,
                            emailMarketing: e.target.checked
                          })}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label className="ml-3 text-sm text-gray-700 font-medium">
                          Email marketing
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-8">
                        Send promotional emails to your community
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.marketingSettings.featuredEvent}
                          onChange={(e) => handleInputChange("marketingSettings", {
                            ...formData.marketingSettings,
                            featuredEvent: e.target.checked
                          })}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label className="ml-3 text-sm text-gray-700 font-medium">
                          Featured event
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-8">
                        Highlight your event on the homepage
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.marketingSettings.earlyBirdDiscount > 0}
                          onChange={(e) => handleInputChange("marketingSettings", {
                            ...formData.marketingSettings,
                            earlyBirdDiscount: e.target.checked ? 10 : 0
                          })}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label className="ml-3 text-sm text-gray-700 font-medium">
                          Early bird discount
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-8">
                        Offer 10% discount for early registrations
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Promotional Code
                    </label>
                    <input
                      type="text"
                      value={formData.marketingSettings.promotionalCode}
                      onChange={(e) => handleInputChange("marketingSettings", {
                        ...formData.marketingSettings,
                        promotionalCode: e.target.value
                      })}
                      placeholder="e.g., WELCOME2024"
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 border-gray-200 hover:border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom Message
                    </label>
                    <textarea
                      value={formData.marketingSettings.customMessage}
                      onChange={(e) => handleInputChange("marketingSettings", {
                        ...formData.marketingSettings,
                        customMessage: e.target.value
                      })}
                      placeholder="Add a special message for your attendees..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 resize-none border-gray-200 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Create */}
            {currentStep === 5 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Create</h2>
                  <p className="text-gray-600">Review your event details before publishing</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📝</span>Event Title
                      </h3>
                      <p className="text-sm text-gray-600">{formData.title}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🏷️</span>Category
                      </h3>
                      <p className="text-sm text-gray-600">
                        {categories.find(c => c.id === formData.category)?.name || 'Not selected'}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📅</span>Date & Time
                      </h3>
                      <p className="text-sm text-gray-600">{formData.date} at {formData.time}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📍</span>Location
                      </h3>
                      <p className="text-sm text-gray-600">{formData.venue}, {formData.location}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🎫</span>Ticket Types
                      </h3>
                      <p className="text-sm text-gray-600">{formData.ticketTypes.length} ticket type(s)</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">👥</span>Capacity
                      </h3>
                      <p className="text-sm text-gray-600">{formData.capacity} attendees</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">📖</span>Description
                    </h3>
                    <p className="text-sm text-gray-600">{formData.description}</p>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🏷️</span>Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg">🎉</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-2">Ready to Create Your Event!</h3>
                      <p className="text-purple-700">
                        Your event will be published and visible to the Dhukuti community. 
                        You can edit it anytime from your event dashboard! 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center"
                >
                  <span className="mr-2">←</span> Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span> Create Event
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 