"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";

export function AdminNavigationProvider() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return <Navigation />;
} 