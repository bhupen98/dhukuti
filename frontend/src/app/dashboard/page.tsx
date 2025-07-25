

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";

function useAuthGuard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);
}

function SummaryCard() {
  const totalGroups = 5;
  const totalContributions = 12;
  const balance = 34000;
  return (
    <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-100 shadow-lg max-w-5xl mx-auto px-8 py-6 rounded-2xl mb-8 border border-yellow-200/60 flex flex-col md:flex-row items-center justify-center gap-6" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/activity/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch activity feed.");
        }
        return res.json();
      })
      .then((data) => {
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
      setFiltered(activity.filter((item: ActivityItem) => item.type === filter));
    }
  }, [activity, filter]);

  const typeIcons: Record<string, React.ReactNode> = {
    Contribution: <span className="text-green-500 text-xl mr-2" role="img" aria-label="contribution">💸</span>,
    "New Group": <span className="text-yellow-500 text-xl mr-2" role="img" aria-label="new group">👥</span>,
    Message: <FaCommentDots className="text-blue-500 text-xl mr-2" />,
    Default: <span className="text-gray-400 text-xl mr-2">🔔</span>,
  };

  const filters = ["All", "Contribution", "New Group", "Message"];

  return (
    <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-100 shadow-lg max-w-5xl mx-auto rounded-2xl border border-yellow-200/60" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
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
            {filtered.map((item: ActivityItem, idx: number) => (
              <li
                key={item.id}
                className={`flex items-center px-6 py-4 cursor-pointer rounded-xl mb-2 transition border border-transparent ${
                  idx % 2 === 0 ? "bg-yellow-50" : "bg-white"
                } hover:border-blue-400 hover:bg-blue-50 group`}
                title={item.subtitle}
              >
                {typeIcons[item.type] || typeIcons.Default}
                <Image src={item.img} alt="Activity avatar" width={40} height={40} className="w-10 h-10 rounded-full mr-3 object-cover border border-yellow-200" priority={idx < 3} />
                <div className="flex-1 min-w-0">
                  <Link href={item.href} className="text-blue-700 font-bold hover:underline text-sm truncate">
                    {item.title}
                  </Link>
                  <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                  {/* Cheers message for timely payment */}
                  {item.type === "Contribution" && item.subtitle?.toLowerCase().includes("paid on time") && (
                    <div className="text-green-700 font-bold text-xs flex items-center gap-1 mt-1">
                      <span role="img" aria-label="cheers">🥳</span> Cheers, {item.title.split(':')[0] || 'Member'}!
                    </div>
                  )}
                </div>
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

function Separator() {
  return <hr className="max-w-5xl mx-auto border-t border-gray-300 mb-6" />;
}

function ProfileWidget() {
  const user = {
    name: "Bhupen Thapa",
    avatar: "https://source.boringavatars.com/beam/120/Bhupen?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
    groups: 5,
    contributions: 12,
    balance: 34000,
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 border border-blue-200 shadow p-4 flex flex-col items-center rounded-2xl mb-6 max-w-xs mx-auto" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <Avatar name={user.name} size={60} variant="beam" colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]} className="mb-2" />
      <span className="font-extrabold text-base text-blue-900 mb-1">{user.name}</span>
      <div className="flex gap-4 text-xs text-gray-600 mb-2">
        <span className="flex items-center gap-1"><span role="img" aria-label="groups">👥</span> {user.groups} Groups</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="contributions">💸</span> {user.contributions} Contributions</span>
      </div>
      <span className="text-xs font-bold text-yellow-700">Balance: {user.balance.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</span>
    </div>
  );
}

function InviteWidget() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 flex flex-col items-center mb-6 max-w-xs mx-auto" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <span className="font-extrabold text-sm text-blue-900">Invite Friends</span>
      <input className="w-full mt-3 px-3 py-2 border border-blue-200 rounded font-mono text-blue-800 bg-blue-50" value="https://dhukuti.com/invite/ABC123" readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
      <button className="bg-blue-600 text-white font-bold px-4 py-2 mt-2 rounded shadow hover:bg-blue-700 transition text-xs">Copy Link</button>
    </div>
  );
}

function GroupChatPreview() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 mb-6 max-w-xs mx-auto" style={{ fontFamily: 'Roboto Mono, Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <div className="flex items-center gap-2 mb-2">
        <FaCommentDots className="text-blue-500" />
        <span className="font-extrabold text-sm text-blue-900">Group Chat</span>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div><span className="font-semibold">Asha:</span> Just sent my contribution!</div>
        <div><span className="font-semibold">Bhupen:</span> Received! Thanks!</div>
        <div className="text-gray-400 italic">+2 new messages...</div>
      </div>
      <Link href="/dashboard/groups/1/chat" className="text-blue-700 hover:underline mt-2 text-xs font-extrabold self-end block">Open Full Chat</Link>
    </div>
  );
}

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
        <div className="bg-white rounded-xl shadow-sm p-4"><ProfileWidget /></div>
        <div className="bg-white rounded-xl shadow-sm p-4"><InviteWidget /></div>
        <div className="bg-white rounded-xl shadow-sm p-4"><GroupChatPreview /></div>
      </aside>
    </div>
  );
}

