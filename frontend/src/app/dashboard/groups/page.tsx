"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "boring-avatars";

export default function MyGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/groups/");
        if (!res.ok) throw new Error("Failed to fetch groups");
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        setGroups([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">My Groups</h1>
        <Link
          href="/dashboard/groups/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition font-bold"
        >
          + Create Group
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-500 flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading groups...
        </div>
      ) : groups.length === 0 ? (
        <div className="text-gray-500 border rounded-xl bg-white py-12 text-center shadow">
          <p className="mb-3">You have no groups yet.</p>
          <Link href="/dashboard/groups/create" className="underline text-blue-700 font-bold">
            Create your first group
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/dashboard/groups/${group.id}`}
              className="group block bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-4 p-5 pb-2">
                <Avatar
                  size={52}
                  name={group.name}
                  variant="beam"
                  colors={["#2563eb", "#38bdf8", "#60a5fa", "#a7f3d0", "#fbbf24"]}
                />
                <div>
                  <div className="font-extrabold text-lg text-blue-900 group-hover:underline">{group.name}</div>
                  <div className="flex -space-x-2 mt-2">
                    {(group.members_list || []).slice(0, 5).map((member, i) =>
                      member.avatar ? (
                        <img
                          key={i}
                          src={member.avatar}
                          alt={member.name}
                          className="w-7 h-7 rounded-full border-2 border-white shadow -ml-2"
                          title={member.name}
                          style={{ zIndex: 10 - i }}
                        />
                      ) : (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center border-2 border-white shadow -ml-2"
                          style={{ zIndex: 10 - i }}
                          title={member.name}
                        >
                          <span className="text-xs font-bold text-blue-900">{member.name[0]}</span>
                        </div>
                      )
                    )}
                    {group.members_list && group.members_list.length > 5 && (
                      <span className="ml-2 text-xs text-gray-400 font-semibold">
                        +{group.members_list.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{group.frequency} • {group.members} members</div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1">
                <div className="text-gray-700 mb-2 text-sm line-clamp-2">{group.description || <span className="italic text-gray-400">No description.</span>}</div>
                <div className="flex gap-4 text-xs text-gray-500 mb-2">
                  <span>Amount: <span className="font-bold text-blue-900">${group.amount}</span></span>
                  <span>Start: <span className="font-bold">{group.start_date}</span></span>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-xs text-blue-600 font-bold group-hover:underline">View Group &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
