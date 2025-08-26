"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function CreateGroupPage() {
  const { session, status } = useAuthGuard();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contributionAmount: "",
    frequency: "monthly",
    maxMembers: "",
    startDate: "",
    meetingDay: "sunday",
    meetingTime: "19:00",
    location: "",
    rules: "",
    isPrivate: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading group creation...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Group name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.contributionAmount || parseFloat(formData.contributionAmount) <= 0) {
      newErrors.contributionAmount = "Valid contribution amount is required";
    }

    if (!formData.maxMembers || parseInt(formData.maxMembers) < 2) {
      newErrors.maxMembers = "Minimum 2 members required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Meeting location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert frequency to cycleDuration (days)
      const frequencyToDays: Record<string, number> = {
        weekly: 7,
        biweekly: 14,
        monthly: 30,
        quarterly: 90,
      };

      const groupData = {
        name: formData.name,
        description: formData.description,
        maxMembers: parseInt(formData.maxMembers),
        contributionAmount: parseFloat(formData.contributionAmount),
        cycleDuration: frequencyToDays[formData.frequency],
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        // Additional metadata for future use
        metadata: {
          meetingDay: formData.meetingDay,
          meetingTime: formData.meetingTime,
          location: formData.location,
          rules: formData.rules,
          isPrivate: formData.isPrivate,
        },
      };

      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create group');
      }

      // Success! Show success message and redirect
      alert(`Group "${formData.name}" created successfully! Redirecting to groups page...`);
      router.push("/groups");
    } catch (error) {
      console.error('Error creating group:', error);
      alert(`Failed to create group: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const frequencies = [
    { value: "weekly", label: "Weekly", icon: "📅" },
    { value: "biweekly", label: "Bi-weekly", icon: "📆" },
    { value: "monthly", label: "Monthly", icon: "🗓️" },
    { value: "quarterly", label: "Quarterly", icon: "📊" },
  ];

  const meetingDays = [
    { value: "sunday", label: "Sunday", icon: "🌅" },
    { value: "monday", label: "Monday", icon: "📚" },
    { value: "tuesday", label: "Tuesday", icon: "💼" },
    { value: "wednesday", label: "Wednesday", icon: "🌿" },
    { value: "thursday", label: "Thursday", icon: "🎯" },
    { value: "friday", label: "Friday", icon: "🎉" },
    { value: "saturday", label: "Saturday", icon: "🌟" },
  ];

  const steps = [
    { number: 1, title: "Basic Information", description: "Group name and details" },
    { number: 2, title: "Group Settings", description: "Schedule and preferences" },
    { number: 3, title: "Review & Create", description: "Final confirmation" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">👥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Create New Group</h1>
              <p className="text-gray-600">
                Set up a new Dhukuti savings group for your community
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
                      step >= stepInfo.number 
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg scale-110" 
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {stepInfo.number}
                    </div>
                    <div className="text-center mt-2">
                      <p className={`text-xs font-medium ${step >= stepInfo.number ? 'text-gray-900' : 'text-gray-500'}`}>
                        {stepInfo.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{stepInfo.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      step > stepInfo.number ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gray-200"
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
            {step === 1 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                  <p className="text-gray-600">Tell us about your new Dhukuti group</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Group Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Sydney Savers, Melbourne Money"
                      className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                        errors.name ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>{errors.name}
                    </p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your group's purpose, goals, and what makes it special..."
                      className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 resize-none ${
                        errors.description ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.description && <p className="text-xs text-red-600 mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>{errors.description}
                    </p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contribution Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-medium">$</span>
                        <input
                          type="number"
                          name="contributionAmount"
                          value={formData.contributionAmount}
                          onChange={handleInputChange}
                          placeholder="100"
                          min="1"
                          className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                            errors.contributionAmount ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.contributionAmount && <p className="text-xs text-red-600 mt-2 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.contributionAmount}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Maximum Members *
                      </label>
                      <input
                        type="number"
                        name="maxMembers"
                        value={formData.maxMembers}
                        onChange={handleInputChange}
                        placeholder="10"
                        min="2"
                        max="50"
                        className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          errors.maxMembers ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {errors.maxMembers && <p className="text-xs text-red-600 mt-2 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.maxMembers}
                      </p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">⚙️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Settings</h2>
                  <p className="text-gray-600">Configure your group's schedule and preferences</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contribution Frequency
                      </label>
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 hover:border-gray-300"
                      >
                        {frequencies.map((freq) => (
                          <option key={freq.value} value={freq.value}>
                            {freq.icon} {freq.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          errors.startDate ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {errors.startDate && <p className="text-xs text-red-600 mt-2 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.startDate}
                      </p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meeting Day
                      </label>
                      <select
                        name="meetingDay"
                        value={formData.meetingDay}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 hover:border-gray-300"
                      >
                        {meetingDays.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.icon} {day.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meeting Time
                      </label>
                      <input
                        type="time"
                        name="meetingTime"
                        value={formData.meetingTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meeting Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Sydney Community Center, Melbourne Library, or Online"
                      className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                        errors.location ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.location && <p className="text-xs text-red-600 mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>{errors.location}
                    </p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Group Rules (Optional)
                    </label>
                    <textarea
                      name="rules"
                      value={formData.rules}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Add any specific rules, guidelines, or expectations for your group members..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 resize-none hover:border-gray-300"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition-all duration-200"
                      />
                      <label className="ml-3 text-sm text-gray-700 font-medium">
                        Make this a private group (invitation only)
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-8">
                      Private groups require admin approval for new members
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Create</h2>
                  <p className="text-gray-600">Review your group details before creating</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📝</span>Group Name
                      </h3>
                      <p className="text-sm text-gray-600">{formData.name}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">💰</span>Contribution
                      </h3>
                      <p className="text-sm text-gray-600">${formData.contributionAmount} ({formData.frequency})</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">👥</span>Max Members
                      </h3>
                      <p className="text-sm text-gray-600">{formData.maxMembers} members</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📅</span>Start Date
                      </h3>
                      <p className="text-sm text-gray-600">{formData.startDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🕒</span>Meeting Schedule
                      </h3>
                      <p className="text-sm text-gray-600">{formData.meetingDay}s at {formData.meetingTime}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📍</span>Location
                      </h3>
                      <p className="text-sm text-gray-600">{formData.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">📖</span>Description
                    </h3>
                    <p className="text-sm text-gray-600">{formData.description}</p>
                  </div>
                  
                  {formData.rules && (
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📋</span>Rules
                      </h3>
                      <p className="text-sm text-gray-600">{formData.rules}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg">🎉</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-amber-900 mb-2">Ready to Create Your Group!</h3>
                      <p className="text-amber-700">
                        You'll be the group admin and can invite members once the group is created. 
                        Your Dhukuti journey starts here! 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center"
                >
                  <span className="mr-2">←</span> Previous
                </button>
              )}
              
              <div className="ml-auto">
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl text-sm font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span> Create Group
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