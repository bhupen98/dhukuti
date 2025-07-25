
// -----------------------------------------------------------------------------
// File: formatDate.ts
// Description: Utility function to format a date string as a locale date.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------

/**
 * formatDate
 * Converts a date string to a locale-formatted date string.
 * @param dateString - The date string to format
 * @returns Formatted locale date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}
