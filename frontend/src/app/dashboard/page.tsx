"use client";
// ---------------------------------------------------------------------------
// QuickActionsWidget: Fast access to common dashboard actions
// ---------------------------------------------------------------------------
import { FaPlusCircle, FaMoneyBillWave, FaCog } from "react-icons/fa";

function QuickActionsWidget() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-extrabold text-base text-blue-900 mb-1">Quick Actions</span>
      <div className="flex gap-2">
        <Link href="/dashboard/groups/create" className="flex flex-col items-center px-3 py-2 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
          <FaPlusCircle className="text-blue-600 text-xl mb-1" />
          <span className="text-xs text-blue-900 font-bold">New Group</span>
        </Link>
        <Link href="/dashboard/contributions" className="flex flex-col items-center px-3 py-2 bg-green-50 rounded-lg shadow hover:bg-green-100 transition">
          <FaMoneyBillWave className="text-green-600 text-xl mb-1" />
          <span className="text-xs text-green-900 font-bold">Contributions</span>
        </Link>
        <Link href="/dashboard/settings" className="flex flex-col items-center px-3 py-2 bg-yellow-50 rounded-lg shadow hover:bg-yellow-100 transition">
          <FaCog className="text-yellow-600 text-xl mb-1" />
          <span className="text-xs text-yellow-900 font-bold">Settings</span>
        </Link>
      </div>
    </div>
  );
}
// ---------------------------------------------------------------------------
// ProfileWidget: Shows user avatar, name, and quick stats
// ---------------------------------------------------------------------------
function ProfileWidget() {
  // Demo data; replace with API data as needed
  const user = {
    name: "Bhupen Thapa",
    avatar: "https://source.boringavatars.com/beam/120/Bhupen?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
    groups: 5,
    contributions: 12,
    balance: 34000,
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 border border-blue-200 shadow p-4 flex flex-col items-center rounded-2xl mb-6 max-w-xs mx-auto">
      <Image
        src={user.avatar}
        alt="User avatar"
        width={60}
        height={60}
        className="rounded-full mb-2 border-2 border-blue-300"
      />
      <span className="font-extrabold text-base text-blue-900 mb-1">{user.name}</span>
      <div className="flex gap-4 text-xs text-gray-600 mb-2">
        <span className="flex items-center gap-1"><span role="img" aria-label="groups">👥</span> {user.groups} Groups</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="contributions">💸</span> {user.contributions} Contributions</span>
      </div>
      <span className="text-xs font-bold text-yellow-700">Balance: {user.balance.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</span>
    </div>
  );
}
// ---------------------------------------------------------------------------
// SummaryCard: Shows dashboard summary stats (demo data)
// ---------------------------------------------------------------------------
function SummaryCard() {
  // Demo data; replace with API data as needed
  const totalGroups = 5;
  const totalContributions = 12;
  const balance = 34000;
  return (
    <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-100 shadow-lg max-w-5xl mx-auto px-8 py-6 rounded-2xl mb-8 border border-yellow-200/60 flex flex-col md:flex-row items-center justify-center gap-6">
      <span role="img" aria-label="finance" className="text-4xl animate-bounce mb-2 md:mb-0">💰</span>
      <div className="flex flex-row gap-10 w-full justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 font-semibold">Total Groups</span>
          <span className="text-2xl font-extrabold text-blue-700">{totalGroups}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 font-semibold">Contributions</span>
          <span className="text-2xl font-extrabold text-green-600">{totalContributions}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 font-semibold">Balance (AUD)</span>
          <span className="text-2xl font-extrabold text-yellow-700">{balance.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</span>
        </div>
      </div>
      <span className="text-[10px] text-gray-400 italic text-center mt-2 w-full md:w-auto">
        This app is for Dhukuti group automation only. Balance is for tracking only, not real money.
      </span>
    </div>
  );
}
// -----------------------------------------------------------------------------
// File: page.tsx
// Description: Dashboard page for Dhukuti app. Shows group activity, quick links, and sidebar widgets.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCommentDots,
  FaQuestionCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Auth Guard: Protects dashboard, redirects to /login if not logged in
// ---------------------------------------------------------------------------
function useAuthGuard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);
}

// ---------------------------------------------------------------------------
// Activity Feed: Fetches group activity from Django API and displays list
// ---------------------------------------------------------------------------
interface ActivityItem {
  id: number;
  img: string;
  href: string;
  title: string;
  subtitle: string;
  type: string;
  timestamp: string;
}
function ActivityFeed() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [filtered, setFiltered] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  // Demo: Add type and timestamp to ActivityItem
  // Replace with API data as needed
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/activity/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch activity feed.");
        }
        return res.json();
      })
      .then((data) => {
        // Add type and timestamp for demo
        const enhanced = data.map((item: ActivityItem, idx: number) => ({
          ...item,
          type: item.type || ["Contribution", "New Group", "Message"][idx % 3],
          timestamp: item.timestamp || new Date(Date.now() - idx * 3600e3).toISOString(),
        }));
        setActivity(enhanced);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not load activity feed.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFiltered(activity);
    } else {
      setFiltered(activity.filter((item) => item.type === filter));
    }
  }, [activity, filter]);

  // Icon mapping for activity types
  const typeIcons: Record<string, React.ReactNode> = {
    Contribution: <span className="text-green-500 text-xl mr-2" role="img" aria-label="contribution">💸</span>,
    "New Group": <span className="text-yellow-500 text-xl mr-2" role="img" aria-label="new group">👥</span>,
    Message: <FaCommentDots className="text-blue-500 text-xl mr-2" />,
    Default: <span className="text-gray-400 text-xl mr-2">🔔</span>,
  };

  // Filter buttons
  const filters = ["All", "Contribution", "New Group", "Message"];

  return (
    <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-100 shadow-lg max-w-5xl mx-auto rounded-2xl border border-yellow-200/60">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <h2 className="text-lg font-extrabold text-blue-900">Group Activity Feed</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                filter === f
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-yellow-100">
        {loading ? (
          <div className="px-6 py-8 text-gray-400 italic">Loading activity…</div>
        ) : error ? (
          <div className="px-6 py-8 text-red-500 font-bold">{error}</div>
        ) : filtered && filtered.length > 0 ? (
          <ul>
            {filtered.map((item, idx) => (
              <li
                key={item.id}
                className={`flex items-center px-6 py-4 cursor-pointer rounded-xl mb-2 transition border border-transparent ${
                  idx % 2 === 0 ? "bg-yellow-50" : "bg-white"
                } hover:border-blue-400 hover:bg-blue-50 group`}
                title={item.subtitle}
              >
                {/* Icon for activity type */}
                {typeIcons[item.type] || typeIcons.Default}
                {/* User avatar for activity item */}
                <Image
                  src={item.img}
                  alt="Activity avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3 object-cover border border-yellow-200"
                  priority={idx < 3}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={item.href}
                    className="text-blue-700 font-bold hover:underline text-sm truncate"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                </div>
                {/* Timestamp */}
                <span className="text-[10px] text-gray-400 ml-4 whitespace-nowrap">
                  {new Date(item.timestamp).toLocaleString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-8 text-gray-400 italic">No activity yet.</div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TopBar: Quick access links for creating and viewing groups
// ---------------------------------------------------------------------------
// TopBar removed: links now in Navbar
// ---------------------------------------------------------------------------
// Separator: Visual separator for layout
// ---------------------------------------------------------------------------
function Separator() {
  return <hr className="max-w-5xl mx-auto border-t border-gray-300 mb-6" />;
}

// ---------------------------------------------------------------------------
// InviteWidget: Widget for inviting friends to join a group
// ---------------------------------------------------------------------------
function InviteWidget() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 flex flex-col items-center mb-6 max-w-xs mx-auto">
      <span className="font-extrabold text-sm text-blue-900">
        Invite Friends
      </span>
      <input
        className="w-full mt-3 px-3 py-2 border border-blue-200 rounded font-mono text-blue-800 bg-blue-50"
        value="https://dhukuti.com/invite/ABC123"
        readOnly
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
      <button className="bg-blue-600 text-white font-bold px-4 py-2 mt-2 rounded shadow hover:bg-blue-700 transition text-xs">
        Copy Link
      </button>
    </div>
  );
}
// ---------------------------------------------------------------------------
// GroupChatPreview: Widget showing a preview of group chat messages
// ---------------------------------------------------------------------------
function GroupChatPreview() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 mb-6 max-w-xs mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <FaCommentDots className="text-blue-500" />
        <span className="font-extrabold text-sm text-blue-900">
          Group Chat
        </span>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div>
          <span className="font-semibold">Asha:</span> Just sent my contribution!
        </div>
        <div>
          <span className="font-semibold">Bhupen:</span> Received! Thanks!
        </div>
        <div className="text-gray-400 italic">+2 new messages...</div>
      </div>
      <Link
        href="/dashboard/groups/1/chat"
        className="text-blue-700 hover:underline mt-2 text-xs font-extrabold self-end block"
      >
        Open Full Chat
      </Link>
    </div>
  );
}
// ---------------------------------------------------------------------------
// HelpCenterWidget: Widget for help center access and support
// ---------------------------------------------------------------------------
function HelpCenterWidget() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 flex flex-col items-center mb-6 max-w-xs mx-auto">
      <FaQuestionCircle className="text-2xl text-blue-400 mb-1" />
      <span className="font-extrabold text-sm text-blue-900">Need Help?</span>
      <p className="text-gray-700 text-xs text-center mt-1 mb-1">
        Visit our Help Center for FAQs, guides, or to contact support.
      </p>
      <Link
        href="/help"
        className="bg-blue-600 text-white px-3 py-1 rounded shadow font-bold hover:bg-blue-700 transition text-xs"
      >
        Go to Help Center
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DashboardPage: Main dashboard layout, left column for activity, right sidebar for widgets
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  useAuthGuard();
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-[1fr_320px] gap-8">
      <div>
        <SummaryCard />
        <Separator />
        <ActivityFeed />
      </div>
      <aside className="sticky top-20 flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <QuickActionsWidget />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ProfileWidget />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <InviteWidget />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <GroupChatPreview />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <HelpCenterWidget />
        </div>
      </aside>
    </div>
  );
}
