"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (session) {
      // Check if there's a callback URL from the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get('callbackUrl');
      
      // Redirect to callback URL if provided, otherwise go to dashboard
      if (callbackUrl && callbackUrl.startsWith('/')) {
        router.push(callbackUrl);
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    // Clear message when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! You can now sign in.' });
        setIsSignUp(false);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } else {
        setMessage({ type: 'error', text: data.error || 'Signup failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage({ type: 'error', text: 'Invalid email or password' });
      } else {
        // Check if there's a callback URL from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrl = urlParams.get('callbackUrl');
        
        // Redirect to callback URL if provided, otherwise go to dashboard
        if (callbackUrl && callbackUrl.startsWith('/')) {
          router.push(callbackUrl);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Login failed. Please try again.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="loading-spinner h-8 w-8"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-6">
      <div className="w-full max-w-md space-y-4 fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 australian-blue rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient-australian mb-2">
            {isSignUp ? "Join Dhukuti" : "Welcome Back"}
          </h1>
          <p className="text-base text-slate-600">
            {isSignUp 
              ? "Connect with your Nepalese community in Australia through traditional Dhukuti savings"
              : "Sign in to manage your Nepalese community savings groups"
            }
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`glass-card rounded-xl p-4 border-l-4 ${
            message.type === 'success' 
              ? 'border-emerald-500 bg-emerald-50/80' 
              : 'border-red-500 bg-red-50/80'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                <svg className={`w-4 h-4 ${
                  message.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {message.type === 'success' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-800">{message.text}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="glass-card rounded-2xl shadow-xl border border-white/30">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input ${
                    errors.email ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="+61-412-345-678"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Sydney, NSW, Australia"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input ${
                    errors.password ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your password"
                  required
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input ${
                      errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg w-full"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="loading-spinner h-4 w-4"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In - Coming Soon */}
              <button
                type="button"
                disabled
                className="btn btn-outline btn-lg w-full relative group cursor-not-allowed opacity-60"
                title="Google Sign In will be available soon! We're working on integrating secure OAuth authentication."
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
                
                {/* Coming Soon Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm">
                    Coming Soon
                  </span>
                </div>
              </button>

              {/* Info about Google Sign In */}
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Google Sign In will be available soon for faster, more secure authentication
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Toggle Sign In/Sign Up */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-slate-600">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Privacy Policy
            </a>
          </p>

          <div className="text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Encrypted data</span>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
} 