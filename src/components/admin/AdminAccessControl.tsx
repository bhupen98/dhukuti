"use client";

import React from "react";
import { useSession } from "next-auth/react";

interface AdminAccessControlProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminAccessControl({ children, fallback }: AdminAccessControlProps) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  if (!isAdmin) {
    return fallback || (
      <div className="text-center py-8">
        <div className="text-gray-400 text-4xl mb-4">🚫</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access this feature.</p>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminOnly({ children }: { children: React.ReactNode }) {
  return <AdminAccessControl>{children}</AdminAccessControl>;
}

export function useIsAdmin() {
  const { data: session } = useSession();
  return (session?.user as any)?.role === "admin";
} 