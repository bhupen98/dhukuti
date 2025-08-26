"use client";

import Link from "next/link";

const testimonials = [
  {
    name: "Ramesh Thapa",
    location: "Sydney",
    story: "Dhukuti has helped our family save for our children's education. The community support is incredible.",
    avatar: "/avatars/ramesh.jpg"
  },
  {
    name: "Sita Gurung",
    location: "Melbourne",
    story: "I've been part of Dhukuti for 3 years. It's more than just saving money - it's about community.",
    avatar: "/avatars/sita.jpg"
  },
  {
    name: "Bikash Tamang",
    location: "Brisbane",
    story: "The transparency and trust in Dhukuti groups is amazing. I can see my money growing safely.",
    avatar: "/avatars/bikash.jpg"
  }
];

const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from real families who have transformed their financial future 
            through Dhukuti's community-driven approach.
          </p>
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-testimonial p-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.story}"</p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/testimonials" className="btn btn-secondary btn-lg">
              View Success Stories
            </Link>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Join Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
