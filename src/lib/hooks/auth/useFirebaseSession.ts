import { useAuth } from "@/components/providers/AuthProvider";
import { FirebaseSession } from "@/types";

export function useFirebaseSession(): {
  data: FirebaseSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
} {
  const { user, loading } = useAuth();

  if (loading) {
    return { data: null, status: "loading" };
  }

  if (!user) {
    return { data: null, status: "unauthenticated" };
  }

  const session: FirebaseSession = {
    user: {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  };

  return { data: session, status: "authenticated" };
}
