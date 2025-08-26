"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Navigation, HeroSection } from "@/components/homepage";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user.displayName || user.email}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ready to continue building your financial future with your community?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </a>
              <a href="/contributions" className="btn btn-secondary btn-lg">
                View Contributions
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation isAuthenticated={false} />
      <HeroSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-xl">Dhukuti</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Dhukuti. Building stronger communities through trusted savings.
          </p>
        </div>
      </footer>
    </div>
  );
} 