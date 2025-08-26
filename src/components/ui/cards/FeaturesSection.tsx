"use client";

const features = [
  {
    icon: "👥",
    title: "Community First",
    description: "Join trusted groups of Nepalese families in your area"
  },
  {
    icon: "💰",
    title: "Secure Savings",
    description: "Save money safely with transparent tracking and management"
  },
  {
    icon: "🏦",
    title: "Traditional Values",
    description: "Built on time-tested community savings principles"
  },
  {
    icon: "📱",
    title: "Digital Platform",
    description: "Modern app for easy access and management"
  },
  {
    icon: "🔒",
    title: "Trusted Security",
    description: "Bank-level security for your financial data"
  },
  {
    icon: "📊",
    title: "Transparent Tracking",
    description: "See exactly where your money goes and grows"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Why Choose Dhukuti?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine the best of traditional Nepalese community values with 
            modern technology to create a platform you can trust.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-feature text-center p-6">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
