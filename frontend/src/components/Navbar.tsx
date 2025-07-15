"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // Checks token on mount, storage changes, and navigation events
  useEffect(() => {
    function checkToken() {
      setLoggedIn(!!localStorage.getItem("token"));
    }
    checkToken();

    // Listen for token changes (in this tab or other tabs)
    window.addEventListener("storage", checkToken);

    // Optionally: also update on push/replace (client-side navigation)
    const origPush = router.push;
    router.push = (...args) => {
      setTimeout(checkToken, 0);
      return origPush.apply(router, args);
    };

    return () => {
      window.removeEventListener("storage", checkToken);
      router.push = origPush;
    };
    // eslint-disable-next-line
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-blue-700 font-bold text-xl">Dhukuti</div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-gray-700 hover:text-blue-700">
              About
            </Link>
            {!loggedIn ? (
              <>
                <Link href="/signup" className="text-gray-700 hover:text-blue-700">
                  Sign Up
                </Link>
                <Link href="/login" className="text-blue-700 font-semibold hover:underline">
                  Log In
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
