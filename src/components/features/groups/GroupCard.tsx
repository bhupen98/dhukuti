"use client";

import React from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GroupWithMembers } from "@/types";

interface GroupCardProps {
  group: GroupWithMembers;
  onClick?: () => void;
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          group.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {group.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{group.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Contribution:</span>
          <span className="text-sm font-semibold">{formatCurrency(Number(group.contributionAmount))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Members:</span>
          <span className="text-sm font-semibold">{group.members.length}/{group.maxMembers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Cycle:</span>
          <span className="text-sm font-semibold">{group.cycleDuration} days</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Created {formatDate(group.createdAt)}
        </span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
} 