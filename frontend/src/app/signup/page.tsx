"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaGlobe } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    country: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
          // country is not used in backend by default
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/login?registered=1");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-2xl shadow-2xl px-6 py-8 md:px-10 md:py-12 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center mb-2">
          Create your Dhukuti account
        </h1>
        <p className="text-gray-500 text-center text-sm mb-1">
          Join money-saving circles with friends, family, or your community.
        </p>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded p-2 text-center text-sm">
            {error}
          </div>
        )}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            value={form.confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="relative">
          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <select
            name="country"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white"
            value={form.country}
            onChange={handleChange}
          >
            <option value="">Country (optional)</option>
            <option value="AU">Australia</option>
            <option value="NP">Nepal</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="accent-blue-600"
          />
          I agree to the{" "}
          <a href="/terms" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </label>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-lg"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p className="text-sm text-gray-500 text-center mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
