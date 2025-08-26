"use client";

import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* Smaller circles */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-primary rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-20 h-20 bg-secondary rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10 flex items-center justify-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Future
            <span className="block text-red-600">Together</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the trusted community savings platform that helps Nepalese families achieve their financial goals through collective support and transparent management.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/signup" className="btn btn-primary btn-lg">
              Join Community
            </Link>
            <a href="#how-it-works" className="btn btn-secondary btn-lg">
              Learn More
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Trusted by 1000+ families</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
