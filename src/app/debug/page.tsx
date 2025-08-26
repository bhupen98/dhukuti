"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { signIn, signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DebugPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const resetToDemo = async () => {
    await signOut({ redirect: false });
    await signIn("credentials", {
      email: "demo@example.com",
      password: "demo123",
      redirect: false,
    });
    window.location.reload();
  };



  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Session Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Email:</strong> {session?.user?.email || "Not logged in"}</p>
            <p><strong>Name:</strong> {session?.user?.name || "Not logged in"}</p>
            <p><strong>User ID:</strong> {(session?.user as any)?.id || "Not logged in"}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Management</h2>
          <div className="space-y-4">
            <button
              onClick={resetToDemo}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reset to Demo User
            </button>

            <button
              onClick={() => signOut()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="space-y-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Dashboard
            </button>

          </div>
        </div>
      </div>
    </div>
  );
} 