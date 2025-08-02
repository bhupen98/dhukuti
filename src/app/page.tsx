import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header - Only show when NOT logged in */}
      {!session && (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">Dhukuti</span>
                  <span className="text-xs text-gray-500 -mt-1">Community Savings</span>
                </div>
              </div>

              {/* Right side - Auth buttons */}
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
                  Sign In
                </Link>
                <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 text-sm shadow-sm">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Enhanced Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
                <div className="relative max-w-7xl mx-auto text-center">
          {session ? (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Welcome back! Your Dhukuti groups are ready
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome back to <span className="text-blue-600">Dhukuti</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Continue managing your Nepalese community savings groups and track your financial progress with our modern platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-200 shadow-sm text-lg">
                  Go to Dashboard
                </Link>
                <Link href="/groups/create" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-md border border-gray-300 transition-all duration-200 text-lg shadow-sm">
                  Create New Group
                </Link>
              </div>
              {/* Quick stats for logged in users */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Active Groups</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-600">$2,400</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-600">24</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Trusted by 1000+ Nepalese community members
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Traditional Nepalese <span className="text-blue-600">Community Savings</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Join the trusted Dhukuti system - a modern platform for traditional Nepalese community savings groups in Australia. Build wealth together, support each other, and strengthen your community bonds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-200 shadow-sm text-lg">
                  Get Started Today
                </Link>
                <Link href="/groups/join" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-md border border-gray-300 transition-all duration-200 text-lg shadow-sm">
                  Join Existing Group
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-600">$2M+</div>
                  <div className="text-sm text-gray-600">Total Savings</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-600">150+</div>
                  <div className="text-sm text-gray-600">Groups Created</div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage your Dhukuti
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern tools for traditional community savings, designed specifically for the Nepalese community in Australia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Create and manage Dhukuti groups with member roles, contribution tracking, and automated rotation cycles.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track contributions, balances, and payouts with real-time analytics and automated payment reminders.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in messaging, event management, and notifications to keep your community connected and informed.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Trusted</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with transparent audit trails, ensuring your community's trust and financial safety.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive reporting and analytics to help you make informed decisions about your community savings.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nepalese Community Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed specifically for the Nepalese community in Australia, respecting cultural traditions and values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is Dhukuti?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Dhukuti is a traditional Nepalese rotating savings and credit association (ROSCA) that has been practiced for generations. It's a community-based financial system where members contribute regularly and receive lump-sum payouts in rotation.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform modernizes this time-tested tradition with digital tools while preserving the community trust and cooperation that makes Dhukuti so valuable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
                  Learn More
                </Link>
                <Link href="/groups" className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-all duration-200 shadow-sm">
                  See Examples
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">How it works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Join a Group</h4>
                    <p className="text-gray-600 text-sm">Find an existing Dhukuti group or create your own with trusted community members.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Make Regular Contributions</h4>
                    <p className="text-gray-600 text-sm">Contribute your agreed amount regularly, whether weekly, monthly, or as arranged.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Receive Your Payout</h4>
                    <p className="text-gray-600 text-sm">When it's your turn, receive the full collected amount to use as needed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your Dhukuti journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nepalese community members who are already building wealth together through trusted Dhukuti groups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg transition-all duration-200 shadow-sm text-lg">
              Get Started Free
            </Link>
            <Link href="/groups" className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 text-lg">
              Browse Groups
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">💰</span>
                </div>
                <span className="text-lg font-bold">Dhukuti</span>
              </div>
              <p className="text-gray-400 text-sm">
                Modernizing traditional Nepalese community savings for the digital age.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Dhukuti. All rights reserved. Built for the Nepalese community in Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 