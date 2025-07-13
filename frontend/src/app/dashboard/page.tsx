"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "boring-avatars";
import {
  FaBell,
  FaUsers,
  FaPlus,
  FaCrown,
  FaStar,
  FaCheckCircle,
  FaCommentDots,
  FaQuestionCircle,
} from "react-icons/fa";

// Fetches group activity from Django API
function ActivityFeed() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/activity/")
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white shadow p-0 max-w-5xl mx-auto">
      <h2 className="bg-gray-100 px-4 py-2 text-lg font-extrabold text-blue-900 border-b border-gray-200">
        Group Activity Feed
      </h2>
      {loading ? (
        <div className="px-4 py-6 text-gray-400 italic">Loading activity…</div>
      ) : activity && activity.length > 0 ? (
        <ul>
          {activity.map((item, idx) => (
            <li
              key={item.id}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <img
                src={item.img}
                alt=""
                className="w-12 h-12 rounded mr-4 object-cover"
              />
              <div>
                <Link
                  href={item.href}
                  className="text-blue-700 font-bold hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-6 text-gray-400 italic">No activity yet.</div>
      )}
    </div>
  );
}

// The rest of your dashboard components (TopBar, UserProfileCard, etc) are unchanged:
function TopBar() {
  return (
    <div className="flex items-center justify-start max-w-5xl mx-auto py-4 px-4 mb-2 gap-4">
      <Link
        href="/dashboard/groups/create"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition font-bold"
      >
        + Create Group
      </Link>
      <Link
        href="/dashboard/groups"
        className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300 transition font-semibold"
      >
        <FaUsers />
        My Groups
      </Link>
      <Link
        href="/dashboard/notifications"
        className="flex items-center gap-2 bg-yellow-200 text-yellow-900 px-4 py-2 rounded shadow hover:bg-yellow-300 transition font-semibold"
      >
        <FaBell />
        Notifications
      </Link>
    </div>
  );
}
function Separator() {
  return <hr className="max-w-5xl mx-auto border-t border-gray-300 mb-6" />;
}
function UserProfileCard() {
  return (
    <div className="bg-white border border-gray-300 shadow p-4 flex flex-col items-center mb-6 max-w-xs mx-auto">
      <Avatar name="Bhupen Thapa" size={72} round />
      <span className="font-extrabold text-lg mt-2 text-blue-900">Bhupen</span>
      <span className="text-gray-700 text-xs font-bold uppercase mt-1">
        Trusted by 5 groups
      </span>
      <div className="flex gap-2 mt-2">
        <FaCrown className="text-yellow-500" title="Group Leader" />
        <FaStar className="text-indigo-400" title="Always Pays On Time" />
        <FaCheckCircle className="text-green-500" title="Verified Email" />
      </div>
    </div>
  );
}
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

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-[1fr_320px] gap-8">
      <div>
        <TopBar />
        <Separator />
        <ActivityFeed /> {/* <-- Activity is fetched live from Django */}
      </div>
      <aside className="sticky top-20">
        <UserProfileCard />
        <InviteWidget />
        <GroupChatPreview />
        <HelpCenterWidget />
      </aside>
    </div>
  );
}
