"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAdminGuard";

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
    { id: "concert", name: "Concert", icon: "🎵" },
    { id: "workshop", name: "Workshop", icon: "📚" },
    { id: "meeting", name: "Meeting", icon: "🤝" },
    { id: "celebration", name: "Celebration", icon: "🎊" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "cultural", name: "Cultural", icon: "🎭" }
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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Event created successfully! Redirecting to events page...");
      // TODO: Redirect to events page or event management dashboard
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 5) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-1">Share your event with the Dhukuti community</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-600"
              }`}>
                {currentStep > step ? "✓" : step}
              </div>
              {step < 5 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step ? "bg-blue-600" : "bg-gray-200"
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">
            Step {currentStep} of 5: {
              currentStep === 1 ? "Event Details" :
              currentStep === 2 ? "Date & Location" :
              currentStep === 3 ? "Ticket Types" :
              currentStep === 4 ? "Marketing & Promotion" :
              "Settings & Review"
            }
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter event title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your event..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    placeholder="Press Enter to add tags"
                    onKeyPress={handleTagInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
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
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City/Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Sydney, Melbourne"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    placeholder="e.g., Sydney Opera House"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ticket Types */}
          {currentStep === 3 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Types & Pricing</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium text-gray-900">Ticket Types</h3>
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
                        saleEndDate: ""
                      };
                      setFormData(prev => ({
                        ...prev,
                        ticketTypes: [...prev.ticketTypes, newTicket]
                      }));
                    }}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    ➕ Add Ticket Type
                  </button>
                </div>

                {formData.ticketTypes.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-gray-400 text-4xl mb-2">🎫</div>
                    <p className="text-gray-600 mb-2">No ticket types added yet</p>
                    <p className="text-sm text-gray-500">Add different ticket types with varying prices and benefits</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.ticketTypes.map((ticket, index) => (
                      <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Ticket Type {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                ticketTypes: prev.ticketTypes.filter(t => t.id !== ticket.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name *</label>
                            <input
                              type="text"
                              value={ticket.name}
                              onChange={(e) => {
                                const updatedTickets = [...formData.ticketTypes];
                                updatedTickets[index].name = e.target.value;
                                setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                              }}
                              placeholder="e.g., Early Bird, VIP, General"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <div className="flex">
                              <select
                                value={ticket.currency}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].currency = e.target.value;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="AUD">AUD</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                              </select>
                              <input
                                type="number"
                                value={ticket.price}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].price = parseFloat(e.target.value) || 0;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available *</label>
                            <input
                              type="number"
                              value={ticket.quantity}
                              onChange={(e) => {
                                const updatedTickets = [...formData.ticketTypes];
                                updatedTickets[index].quantity = parseInt(e.target.value) || 0;
                                setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                              }}
                              placeholder="100"
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Period</label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="date"
                                value={ticket.saleStartDate}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].saleStartDate = e.target.value;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Start Date"
                              />
                              <input
                                type="date"
                                value={ticket.saleEndDate}
                                onChange={(e) => {
                                  const updatedTickets = [...formData.ticketTypes];
                                  updatedTickets[index].saleEndDate = e.target.value;
                                  setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="End Date"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={ticket.description}
                            onChange={(e) => {
                              const updatedTickets = [...formData.ticketTypes];
                              updatedTickets[index].description = e.target.value;
                              setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                            }}
                            placeholder="Describe what's included with this ticket type..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (Optional)</label>
                          <input
                            type="text"
                            placeholder="Press Enter to add benefits (e.g., VIP seating, free drinks)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                e.preventDefault();
                                const newBenefit = e.currentTarget.value.trim();
                                const updatedTickets = [...formData.ticketTypes];
                                updatedTickets[index].benefits = [...updatedTickets[index].benefits, newBenefit];
                                setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                e.currentTarget.value = '';
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {ticket.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {ticket.benefits.map((benefit, benefitIndex) => (
                                <span
                                  key={benefitIndex}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center"
                                >
                                  {benefit}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedTickets = [...formData.ticketTypes];
                                      updatedTickets[index].benefits = updatedTickets[index].benefits.filter((_, i) => i !== benefitIndex);
                                      setFormData(prev => ({ ...prev, ticketTypes: updatedTickets }));
                                    }}
                                    className="ml-1 text-green-600 hover:text-green-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Ticket Summary</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Total Ticket Types:</strong> {formData.ticketTypes.length}</p>
                  <p><strong>Total Capacity:</strong> {formData.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0)} tickets</p>
                  <p><strong>Price Range:</strong> {
                    formData.ticketTypes.length > 0 
                      ? `${Math.min(...formData.ticketTypes.map(t => t.price))} - ${Math.max(...formData.ticketTypes.map(t => t.price))} AUD`
                      : "Not set"
                  }</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Marketing & Promotion */}
          {currentStep === 4 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Marketing & Promotion</h2>
              
              <div className="space-y-6">
                {/* Social Sharing */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Social Sharing</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.marketingSettings.socialSharing}
                        onChange={(e) => handleInputChange("marketingSettings", {
                          ...formData.marketingSettings,
                          socialSharing: e.target.checked
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enable social media sharing</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.marketingSettings.featuredEvent}
                        onChange={(e) => handleInputChange("marketingSettings", {
                          ...formData.marketingSettings,
                          featuredEvent: e.target.checked
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Feature this event on homepage (Premium)</span>
                    </label>
                  </div>
                </div>

                {/* Promotional Tools */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Promotional Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Promotional Code</label>
                      <input
                        type="text"
                        value={formData.marketingSettings.promotionalCode}
                        onChange={(e) => handleInputChange("marketingSettings", {
                          ...formData.marketingSettings,
                          promotionalCode: e.target.value
                        })}
                        placeholder="e.g., SAVE20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Early Bird Discount (%)</label>
                      <input
                        type="number"
                        value={formData.marketingSettings.earlyBirdDiscount}
                        onChange={(e) => handleInputChange("marketingSettings", {
                          ...formData.marketingSettings,
                          earlyBirdDiscount: parseInt(e.target.value) || 0
                        })}
                        placeholder="20"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referral Reward (AUD)</label>
                      <input
                        type="number"
                        value={formData.marketingSettings.referralReward}
                        onChange={(e) => handleInputChange("marketingSettings", {
                          ...formData.marketingSettings,
                          referralReward: parseFloat(e.target.value) || 0
                        })}
                        placeholder="5.00"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Marketing</label>
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={formData.marketingSettings.emailMarketing}
                          onChange={(e) => handleInputChange("marketingSettings", {
                            ...formData.marketingSettings,
                            emailMarketing: e.target.checked
                          })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Send promotional emails</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Custom Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Promotional Message</label>
                  <textarea
                    value={formData.marketingSettings.customMessage}
                    onChange={(e) => handleInputChange("marketingSettings", {
                      ...formData.marketingSettings,
                      customMessage: e.target.value
                    })}
                    placeholder="Write a custom message to promote your event..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Settings & Review */}
          {currentStep === 5 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings & Review</h2>
              
              <div className="space-y-6">
                {/* Event Settings */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Event Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                      <input
                        type="email"
                        value={formData.eventSettings.contactEmail}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          contactEmail: e.target.value
                        })}
                        placeholder="contact@yourevent.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        value={formData.eventSettings.contactPhone}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          contactPhone: e.target.value
                        })}
                        placeholder="+61 400 000 000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Tickets Per Person</label>
                      <input
                        type="number"
                        value={formData.eventSettings.maxTicketsPerPerson}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          maxTicketsPerPerson: parseInt(e.target.value) || 1
                        })}
                        placeholder="1"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Refund Policy</label>
                      <select
                        value={formData.eventSettings.refundPolicy}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          refundPolicy: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="No refunds">No refunds</option>
                        <option value="Full refund up to 7 days before">Full refund up to 7 days before</option>
                        <option value="50% refund up to 3 days before">50% refund up to 3 days before</option>
                        <option value="Full refund up to 24 hours before">Full refund up to 24 hours before</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.eventSettings.allowWaitlist}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          allowWaitlist: e.target.checked
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Allow waitlist when sold out</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.eventSettings.requireApproval}
                        onChange={(e) => handleInputChange("eventSettings", {
                          ...formData.eventSettings,
                          requireApproval: e.target.checked
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Require approval for registrations</span>
                    </label>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                  <textarea
                    value={formData.eventSettings.termsConditions}
                    onChange={(e) => handleInputChange("eventSettings", {
                      ...formData.eventSettings,
                      termsConditions: e.target.value
                    })}
                    placeholder="Add any specific terms and conditions for your event..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Final Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Event Summary</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Title:</strong> {formData.title || "Not set"}</p>
                    <p><strong>Date:</strong> {formData.date ? new Date(formData.date).toLocaleDateString() : "Not set"}</p>
                    <p><strong>Location:</strong> {formData.location || "Not set"}</p>
                    <p><strong>Ticket Types:</strong> {formData.ticketTypes.length}</p>
                    <p><strong>Total Capacity:</strong> {formData.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0)} tickets</p>
                    <p><strong>Marketing Features:</strong> {
                      [
                        formData.marketingSettings.socialSharing && "Social Sharing",
                        formData.marketingSettings.emailMarketing && "Email Marketing",
                        formData.marketingSettings.featuredEvent && "Featured Event",
                        formData.marketingSettings.promotionalCode && "Promo Code"
                      ].filter(Boolean).join(", ") || "None"
                    }</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !isStepValid()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Event..." : "Create Event"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 