"use client";

import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Join Group",
    description: "Find and join a trusted Dhukuti group in your area",
    icon: "👥"
  },
  {
    number: 2,
    title: "Save Money",
    description: "Contribute regularly to build your savings together",
    icon: "💰"
  },
  {
    number: 3,
    title: "Grow Together",
    description: "Watch your community wealth grow and benefit together",
    icon: "📈"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            How Dhukuti Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to financial security and community building. 
            It's that easy to get started with Dhukuti.
          </p>
        </div>
        
        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.number}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-300 transform translate-x-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
