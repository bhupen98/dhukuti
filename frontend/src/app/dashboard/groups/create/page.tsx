// -----------------------------------------------------------------------------
// File: page.tsx
// Description: Create Group page for Dhukuti app. Allows users to create a new group.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function CreateGroupPage() {
  // ---------------------------------------------------------------------------
  // State: Form fields, success/error, and router
  // ---------------------------------------------------------------------------
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [members, setMembers] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ---------------------------------------------------------------------------
  // Handler: Submit form and create group via backend API
  // ---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    const groupData = {
      name: groupName,
      description,
      amount,
      frequency,
      members,
      start_date: startDate,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/groups/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/groups");
        }, 1200);
      } else {
        const errData = await response.json();
        setError(
          errData?.detail ||
            "Something went wrong. Please check your inputs and try again."
        );
      }
    } catch {
      setError("Failed to connect to server. Is the backend running?");
    }
  };

  // ---------------------------------------------------------------------------
  // Render: Create Group form and UI
  // ---------------------------------------------------------------------------
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create Group</h1>

        {success && (
          <div className="text-green-600 font-bold text-center mb-4">
            Group created! Redirecting to My Groups...
          </div>
        )}

        {error && (
          <div className="text-red-500 font-bold text-center mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Group Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter group name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional, e.g. 'Family pot for Dashain 2025!'"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Contribution Amount</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="$"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                min={1}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Contribution Frequency</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Number of Members</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={members}
                onChange={e => setMembers(Number(e.target.value))}
                min={2}
                max={100}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-3 font-bold mt-4 hover:bg-blue-700 transition"
            disabled={success}
          >
            Create
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/dashboard/groups"
            className="inline-block bg-blue-200 text-blue-900 px-4 py-2 rounded shadow font-bold mt-4 hover:bg-blue-300 transition"
          >
            Go to My Groups
          </Link>
        </div>
      </div>
    </div>
  );
}
