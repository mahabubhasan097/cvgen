/**
 * Application Version
 * Update this when releasing new versions
 */

export const APP_VERSION = "1.0.0";
export const RELEASE_DATE = "October 12, 2025";
export const VERSION_NAME = "Advanced Customization";

// Version history for "What's New" detection
export const VERSION_HISTORY = [
  { version: "1.0.0", date: "2025-10-12", name: "Advanced Customization" },
  { version: "0.1.0", date: "2025-10-01", name: "Initial Release" },
];

// Check if this is a new version for the user
export const isNewVersion = (lastSeenVersion: string | null): boolean => {
  if (!lastSeenVersion) return true;
  return lastSeenVersion !== APP_VERSION;
};

