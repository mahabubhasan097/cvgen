/**
 * Customization Types
 * Defines the structure for resume customization options
 */

export type SectionType =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "projects";

export interface SectionConfig {
  id: SectionType;
  title: string;
  visible: boolean;
  order: number;
}

export interface ColorTheme {
  name: string;
  // Primary brand colors
  primary: string;
  secondary: string;
  text: string;
  border: string;
  // Extended color hierarchy for better UX
  colors?: {
    // Text hierarchy
    textPrimary: string;      // Job titles, main content
    textSecondary: string;    // Companies, degrees  
    textTertiary: string;     // Dates, locations
    textMuted: string;        // Meta info, captions
    // Accent colors
    accentLight: string;      // Light backgrounds
    borderLight: string;      // Subtle dividers
  };
}

export interface CustomizationSettings {
  theme: ColorTheme;
  // Enhanced typography scale
  fontSize: {
    name: number;          // Display level (your name)
    heading: number;       // H1 (section headers)
    subheading: number;    // H2 (job titles, institutions)
    body: number;          // Regular text
    small: number;         // Dates, locations
    caption: number;       // Meta info
  };
  spacing: {
    section: number;
    line: number;
    letterSpacing: number;
    pageMargin: number;
    sectionPadding: number;
  };
  lineHeight: {
    heading: number;
    body: number;
    list: number;
  };
  sections: SectionConfig[];
  showIcons: boolean;
  iconSize: number;
  headerStyle: "underline" | "background" | "border";
  borderWidth: number;
  fontFamily: string;
  preset: "compact" | "normal" | "spacious";
  bulletStyle: "disc" | "circle" | "square" | "arrow" | "chevron";
  accentColor: string;
  headingCase: "normal" | "uppercase" | "capitalize";
  showDividers: boolean;
}

export const DEFAULT_THEMES: ColorTheme[] = [
  {
    name: "Classic Black",
    primary: "#000000",
    secondary: "#1F2937",
    text: "#374151",
    border: "#000000",
    colors: {
      textPrimary: "#111827",      // Job titles, key content
      textSecondary: "#374151",    // Companies, degrees
      textTertiary: "#6B7280",     // Dates, locations
      textMuted: "#9CA3AF",        // Meta info
      accentLight: "#F9FAFB",
      borderLight: "#E5E7EB",
    },
  },
  {
    name: "Professional Blue",
    primary: "#1E40AF",
    secondary: "#3B82F6",
    text: "#1E3A8A",
    border: "#2563EB",
    colors: {
      textPrimary: "#1E3A8A",      // Navy for job titles
      textSecondary: "#1E40AF",    // Blue for companies
      textTertiary: "#64748B",     // Slate for dates
      textMuted: "#94A3B8",        // Light slate for meta
      accentLight: "#EFF6FF",
      borderLight: "#DBEAFE",
    },
  },
  {
    name: "Modern Purple",
    primary: "#7C3AED",
    secondary: "#8B5CF6",
    text: "#6D28D9",
    border: "#7C3AED",
    colors: {
      textPrimary: "#581C87",      // Dark purple for emphasis
      textSecondary: "#7C3AED",    // Main purple
      textTertiary: "#6B7280",     // Neutral gray
      textMuted: "#9CA3AF",        // Light gray
      accentLight: "#F5F3FF",
      borderLight: "#DDD6FE",
    },
  },
  {
    name: "Tech Green",
    primary: "#059669",
    secondary: "#10B981",
    text: "#047857",
    border: "#059669",
    colors: {
      textPrimary: "#064E3B",      // Dark green for key content
      textSecondary: "#059669",    // Main green
      textTertiary: "#6B7280",     // Gray for dates
      textMuted: "#9CA3AF",        // Light gray
      accentLight: "#ECFDF5",
      borderLight: "#A7F3D0",
    },
  },
  {
    name: "Executive Gray",
    primary: "#374151",
    secondary: "#4B5563",
    text: "#1F2937",
    border: "#6B7280",
    colors: {
      textPrimary: "#111827",      // Almost black
      textSecondary: "#374151",    // Charcoal
      textTertiary: "#6B7280",     // Medium gray
      textMuted: "#9CA3AF",        // Light gray
      accentLight: "#F3F4F6",
      borderLight: "#D1D5DB",
    },
  },
  {
    name: "Corporate Navy",
    primary: "#1E3A8A",
    secondary: "#3730A3",
    text: "#1E40AF",
    border: "#1E3A8A",
    colors: {
      textPrimary: "#1E3A8A",      // Deep navy for headers
      textSecondary: "#3730A3",    // Royal blue for companies
      textTertiary: "#64748B",     // Slate gray for dates
      textMuted: "#94A3B8",        // Light slate for meta
      accentLight: "#EEF2FF",
      borderLight: "#C7D2FE",
    },
  },
  {
    name: "Forest Green",
    primary: "#166534",
    secondary: "#16A34A",
    text: "#15803D",
    border: "#166534",
    colors: {
      textPrimary: "#14532D",      // Forest green for headers
      textSecondary: "#166534",    // Emerald for companies
      textTertiary: "#6B7280",     // Gray for dates
      textMuted: "#9CA3AF",        // Light gray for meta
      accentLight: "#F0FDF4",
      borderLight: "#BBF7D0",
    },
  },
  {
    name: "Burgundy Red",
    primary: "#991B1B",
    secondary: "#DC2626",
    text: "#B91C1C",
    border: "#991B1B",
    colors: {
      textPrimary: "#7F1D1D",      // Dark burgundy for headers
      textSecondary: "#991B1B",    // Crimson for companies
      textTertiary: "#6B7280",     // Gray for dates
      textMuted: "#9CA3AF",        // Light gray for meta
      accentLight: "#FEF2F2",
      borderLight: "#FECACA",
    },
  },
  {
    name: "Ocean Teal",
    primary: "#0F766E",
    secondary: "#14B8A6",
    text: "#0D9488",
    border: "#0F766E",
    colors: {
      textPrimary: "#134E4A",      // Dark teal for headers
      textSecondary: "#0F766E",    // Teal for companies
      textTertiary: "#6B7280",     // Gray for dates
      textMuted: "#9CA3AF",        // Light gray for meta
      accentLight: "#F0FDFA",
      borderLight: "#CCFBF1",
    },
  },
  {
    name: "Royal Purple",
    primary: "#6B21A8",
    secondary: "#8B5CF6",
    text: "#7C2D12",
    border: "#6B21A8",
    colors: {
      textPrimary: "#581C87",      // Deep purple for headers
      textSecondary: "#6B21A8",    // Royal purple for companies
      textTertiary: "#6B7280",     // Gray for dates
      textMuted: "#9CA3AF",        // Light gray for meta
      accentLight: "#FAF5FF",
      borderLight: "#E9D5FF",
    },
  },
  {
    name: "Steel Blue",
    primary: "#1E40AF",
    secondary: "#3B82F6",
    text: "#1E3A8A",
    border: "#1E40AF",
    colors: {
      textPrimary: "#1E3A8A",      // Steel blue for headers
      textSecondary: "#1E40AF",    // Blue for companies
      textTertiary: "#64748B",     // Slate for dates
      textMuted: "#94A3B8",        // Light slate for meta
      accentLight: "#EFF6FF",
      borderLight: "#DBEAFE",
    },
  },
  {
    name: "Charcoal Gray",
    primary: "#374151",
    secondary: "#6B7280",
    text: "#1F2937",
    border: "#4B5563",
    colors: {
      textPrimary: "#111827",      // Almost black for headers
      textSecondary: "#374151",    // Charcoal for companies
      textTertiary: "#6B7280",     // Medium gray for dates
      textMuted: "#9CA3AF",        // Light gray for meta
      accentLight: "#F9FAFB",
      borderLight: "#E5E7EB",
    },
  },
];

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  theme: DEFAULT_THEMES[0],
  fontSize: {
    name: 30,         // Display (full name)
    heading: 18,      // H1 (section headers)
    subheading: 15,   // H2 (job titles, institutions)
    body: 13,         // Regular text
    small: 12,        // Dates, locations
    caption: 11,      // Meta info
  },
  spacing: {
    section: 16,
    line: 6,
    letterSpacing: 0,
    pageMargin: 48,
    sectionPadding: 0,
  },
  lineHeight: {
    heading: 1.2,
    body: 1.5,
    list: 1.6,
  },
  sections: [
    { id: "summary", title: "Professional Summary", visible: true, order: 1 },
    { id: "experience", title: "Professional Experience", visible: true, order: 2 },
    { id: "education", title: "Education", visible: true, order: 3 },
    { id: "skills", title: "Technical Skills", visible: true, order: 4 },
    { id: "certifications", title: "Certifications", visible: true, order: 5 },
    { id: "projects", title: "Projects", visible: false, order: 6 },
  ],
  showIcons: true,
  iconSize: 14,
  headerStyle: "underline",
  borderWidth: 2,
  fontFamily: "Inter",
  preset: "normal",
  bulletStyle: "disc",
  accentColor: DEFAULT_THEMES[0].primary,
  headingCase: "normal",
  showDividers: false,
};

// Preset configurations with complete typography scale
export const PRESET_CONFIGS = {
  compact: {
    fontSize: { name: 28, heading: 16, subheading: 14, body: 12, small: 11, caption: 10 },
    spacing: { section: 12, line: 4, letterSpacing: 0, pageMargin: 36, sectionPadding: 0 },
    lineHeight: { heading: 1.1, body: 1.4, list: 1.5 },
  },
  normal: {
    fontSize: { name: 30, heading: 18, subheading: 15, body: 13, small: 12, caption: 11 },
    spacing: { section: 16, line: 6, letterSpacing: 0, pageMargin: 48, sectionPadding: 0 },
    lineHeight: { heading: 1.2, body: 1.5, list: 1.6 },
  },
  spacious: {
    fontSize: { name: 34, heading: 20, subheading: 17, body: 14, small: 13, caption: 12 },
    spacing: { section: 24, line: 8, letterSpacing: 0.5, pageMargin: 60, sectionPadding: 8 },
    lineHeight: { heading: 1.3, body: 1.6, list: 1.7 },
  },
};

export const ATS_SAFE_FONTS = [
  "Inter",
  "Arial",
  "Helvetica",
  "Calibri",
  "Georgia",
  "Times New Roman",
  "Verdana",
];

