import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, status };
}

export function useAdminGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Don't apply guard to login or test pages
    if (pathname === "/admin/login" || pathname === "/admin/test") {
      return;
    }

    // Prevent multiple redirects
    if (hasRedirected) {
      return;
    }

    if (status === "unauthenticated") {
      console.log("User not authenticated, redirecting to admin login");
      setHasRedirected(true);
      router.replace("/admin/login");
    } else if (status === "authenticated" && session?.user) {
      // Check if user has admin role
      const userRole = (session.user as any).role;
      const userEmail = session.user.email;
      
      console.log("User authenticated:", { email: userEmail, role: userRole });
      
      // Allow admin@dhukuti.com to access admin area regardless of role
      if (userEmail === "admin@dhukuti.com" || userRole === "ADMIN") {
        // User is admin, allow access
        console.log("Admin access granted");
        return;
      } else {
        // Not admin, redirect to dashboard
        console.log("User not admin, redirecting to dashboard");
        setHasRedirected(true);
        router.replace("/dashboard");
      }
    }
  }, [status, session, router, pathname, hasRedirected]);

  const isAdmin = (session?.user as any)?.role === "ADMIN" || session?.user?.email === "admin@dhukuti.com";
  
  return { session, status, isAdmin };
} 