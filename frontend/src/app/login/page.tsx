"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registered = params.get("registered");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.access) {
        // Save token in localStorage
        localStorage.setItem("token", data.access);
        router.push("/dashboard");
      } else {
        setError(
          data.detail ||
            data.error ||
            "Login failed. Please check your credentials."
        );
      }
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-2xl shadow-2xl px-6 py-8 md:px-10 md:py-12 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 text-center text-sm mb-1">
          Sign in to your Dhukuti account
        </p>
        {registered && (
          <div className="mb-2 text-green-700 text-center font-bold">
            Registration successful! Please log in.
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded p-2 text-center text-sm">
            {error}
          </div>
        )}

        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            required
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
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-gray-500 text-center mt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}
