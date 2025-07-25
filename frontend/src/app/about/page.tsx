// -----------------------------------------------------------------------------
// File: page.tsx
// Description: About page for Dhukuti app. Explains features, benefits, and FAQs.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------

export default function AboutPage() {
  // ---------------------------------------------------------------------------
  // Render: About content, sections, and call-to-action
  // ---------------------------------------------------------------------------
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-4">About Dhukuti</h1>
      <p className="text-gray-700 mb-6">
        Dhukuti is a digital platform for organizing and managing group money-saving circles—open to everyone, everywhere!
      </p>
      {/* What is Dhukuti section */}
      <section className="mb-6">
        <h2 className="font-bold text-lg mb-2">What is Dhukuti?</h2>
        <p>
          A Dhukuti is a rotating savings group where members contribute a fixed amount regularly and take turns receiving the pooled sum. Our app makes this tradition easy, transparent, and accessible for global communities.
        </p>
      </section>
      {/* How Does It Work section */}
      <section className="mb-6">
        <h2 className="font-bold text-lg mb-2">How Does It Work?</h2>
        <ol className="list-decimal ml-6">
          <li>Create or join a Dhukuti group.</li>
          <li>Invite trusted friends, family, or coworkers.</li>
          <li>Contribute your share each round using your preferred payment method.</li>
          <li>The pooled money is given to one member each turn.</li>
          <li>Track progress, manage turns, and get notified—all in one app!</li>
        </ol>
      </section>
      {/* Why Use Dhukuti section */}
      <section className="mb-6">
        <h2 className="font-bold text-lg mb-2">Why Use Dhukuti?</h2>
        <ul className="list-disc ml-6">
          <li>Easy group management and scheduling</li>
          <li>Automatic reminders and transparent tracking</li>
          <li>Secure: we don&apos;t hold your money, just help organize</li>
          <li>Connect with trusted people and save together</li>
        </ul>
      </section>
      {/* FAQs section */}
      <section className="mb-6">
        <h2 className="font-bold text-lg mb-2">FAQs</h2>
        <p><b>Do you hold or transfer my money?</b> <br />
          No, Dhukuti only helps you organize and track payments. All money transfers happen outside the app.
        </p>
        <p className="mt-2"><b>Who can join a group?</b> <br />
          Anyone! Invite people you trust, whether they&apos;re local or global.
        </p>
      </section>
      {/* Call to action */}
      <div className="mt-8 flex justify-center">
        <a href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-blue-700 transition">
          Get Started
        </a>
      </div>
    </main>
  );
}
