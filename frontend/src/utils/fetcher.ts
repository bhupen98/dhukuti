
// -----------------------------------------------------------------------------
// File: fetcher.ts
// Description: Utility function for fetching data from an API endpoint.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------

/**
 * fetcher
 * Fetches data from the given URL and returns the parsed JSON response.
 * Throws an error if the network response is not ok.
 * @param url - The API endpoint to fetch from
 * @returns Parsed JSON response
 */
export async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
