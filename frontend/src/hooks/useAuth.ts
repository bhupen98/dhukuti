
// -----------------------------------------------------------------------------
// File: useAuth.ts
// Description: Custom React hook to check authentication status using localStorage token.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------
import { useState, useEffect } from "react";


/**
 * useAuth Hook
 * Returns true if a user is authenticated (token exists in localStorage).
 * Listens for changes to localStorage to update auth state in real time.
 * @returns {boolean} loggedIn - Whether the user is authenticated
 */
export default function useAuth(): boolean {
  // ---------------------------------------------------------------------------
  // State: Track authentication status
  // ---------------------------------------------------------------------------
  const [loggedIn, setLoggedIn] = useState(false);

  // ---------------------------------------------------------------------------
  // Effect: Listen for localStorage changes to update auth state
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
    function onStorage() {
      setLoggedIn(!!localStorage.getItem("token"));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return loggedIn;
}
