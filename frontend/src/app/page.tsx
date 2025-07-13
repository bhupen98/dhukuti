import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl px-6 py-12 bg-white/90 rounded-2xl shadow-2xl">
        {/* Left: Illustration */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/dhukuti-hero.png"
            alt="Dhukuti group illustration"
            width={320}
            height={320}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
        {/* Right: Text and CTA */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">Dhukuti</h1>
          <h2 className="text-lg md:text-xl text-gray-600">
            Group money-saving circles—open to everyone, anywhere.
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Create or join a Dhukuti group, save together, and manage your turns online.<br />
            Transparent, automated, and built for communities everywhere.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="bg-white border border-blue-600 text-blue-700 px-6 py-2 rounded-xl font-bold shadow hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <footer className="mt-10 text-gray-400 text-xs text-center">
        Made with ❤️ for global communities — inspired by Dhukuti
      </footer>
    </main>
  );
}
