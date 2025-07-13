"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [members, setMembers] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // Simulated submit handler (replace with real backend call later)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // You would send the data to the backend here:
    // await fetch("/api/groups/create/", { ... })

    setSuccess(true);

    // Wait a moment, then redirect to My Groups page
    setTimeout(() => {
      router.push("/dashboard/groups");
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create Group</h1>
        {success ? (
          <div className="text-green-600 font-bold text-center mb-4">
            Group created! Redirecting to My Groups...
          </div>
        ) : null}
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
              />
            </div>
          </div>
          {/* Optional: Photo Upload
          <div>
            <label className="block font-semibold mb-1">Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={e => setPhoto(e.target.files?.[0] || null)}
            />
          </div>
          */}
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
