/**
 * Application Version
 * Update this when releasing new versions
 */

export const APP_VERSION = "2.0.1";
export const RELEASE_DATE = "January 15, 2025";
export const VERSION_NAME = "Typography System & UI/UX Overhaul";

// Version history for "What's New" detection
export const VERSION_HISTORY = [
  { version: "2.0.1", date: "2025-01-15", name: "Typography System & UI/UX Overhaul - Quick Fixes" },
  { version: "2.0.0", date: "2025-01-15", name: "Typography System & UI/UX Overhaul" },
  { version: "1.0.0", date: "2025-10-12", name: "Advanced Customization" },
  { version: "0.1.0", date: "2025-10-01", name: "Initial Release" },
];

// Check if this is a new version for the user
export const isNewVersion = (lastSeenVersion: string | null): boolean => {
  if (!lastSeenVersion) return true;
  return lastSeenVersion !== APP_VERSION;
};

