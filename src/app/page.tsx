import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-clean">
      {/* Navigation Bar */}
      <nav className="relative z-50 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 theme-blue rounded-lg flex items-center justify-center shadow-clean">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-gradient-blue">Dhukuti</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors">Features</a>
            <a href="#about" className="text-slate-600 hover:text-slate-800 transition-colors">About</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-800 transition-colors">Contact</a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {session ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost btn-sm">
                  Dashboard
                </Link>
                <Link href="/groups" className="btn btn-primary btn-sm">
                  Go to App
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm">
                  Sign In
                </Link>
                <Link href="/login" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {session ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Welcome Back to <span className="text-gradient-blue">Dhukuti</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Continue managing your Nepalese community savings groups and track your financial progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
                <Link href="/groups/create" className="btn btn-outline btn-lg">
                  Create New Group
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Traditional Nepalese <span className="text-gradient-blue">Community Savings</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Join the trusted Dhukuti system - a modern platform for traditional Nepalese community savings groups in Australia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className="btn btn-primary btn-lg">
                  Get Started Today
                </Link>
                <Link href="/groups/join" className="btn btn-outline btn-lg">
                  Join Existing Group
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose Dhukuti?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience the perfect blend of traditional Nepalese community values with modern digital convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 theme-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-clean">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Community Trust</h3>
              <p className="text-slate-600">
                Built on the foundation of traditional Nepalese community values and mutual trust.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 theme-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-green">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Secure & Transparent</h3>
              <p className="text-slate-600">
                Modern security with complete transparency in all financial transactions and group activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 theme-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-clean">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Easy Management</h3>
              <p className="text-slate-600">
                Simple and intuitive interface for managing contributions, tracking payments, and group communications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">About Dhukuti</h2>
              <p className="text-slate-600 mb-4">
                Dhukuti is a traditional Nepalese community savings system that has been practiced for generations. 
                It's based on mutual trust, community support, and shared financial goals.
              </p>
              <p className="text-slate-600 mb-6">
                Our modern platform brings this time-tested tradition to the digital age, making it easier for 
                Nepalese communities in Australia to organize, manage, and participate in Dhukuti groups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="btn btn-primary">
                  Join a Group
                </Link>
                <Link href="#contact" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-blue rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">How Dhukuti Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Form a Group</h4>
                      <p className="text-blue-100 text-sm">Gather trusted community members to form a Dhukuti group.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Set Contributions</h4>
                      <p className="text-blue-100 text-sm">Agree on regular contribution amounts and schedules.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Rotate Payouts</h4>
                      <p className="text-blue-100 text-sm">Members receive the collected amount in rotation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          {session ? (
            <>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome Back to Dhukuti!</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Continue your journey with your Nepalese community savings groups. Manage contributions, track progress, and stay connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
                <Link href="/groups/create" className="btn btn-outline btn-lg">
                  Create New Group
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Start Your Dhukuti Journey?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of Nepalese community members in Australia who trust Dhukuti for their savings and financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className="btn btn-primary btn-lg">
                  Get Started Today
                </Link>
                <Link href="/groups/join" className="btn btn-outline btn-lg">
                  Join Existing Group
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 theme-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold">Dhukuti</span>
              </div>
              <p className="text-slate-300 mb-4">
                Empowering Nepalese communities in Australia with modern digital tools for traditional community savings.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807v-.468zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Community Savings</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Group Management</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Payment Tracking</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Financial Reports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              © 2024 Dhukuti. All rights reserved. Empowering Nepalese communities in Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 