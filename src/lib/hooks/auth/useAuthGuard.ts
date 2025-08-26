import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Create a session object that matches what the dashboard expects
  const session = user ? {
    user: {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  } : null;

  return { session, status: loading ? "loading" : (user ? "authenticated" : "unauthenticated") };
} 