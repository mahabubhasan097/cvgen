/**
 * Design System - Typography & Color Hierarchy
 * A comprehensive design system for consistent and beautiful resumes
 */

// Typography Scale
export interface TypographyScale {
  // Font Sizes
  display: number;      // Name/Title (28-36px)
  h1: number;          // Section Headers (16-20px)
  h2: number;          // Job Titles, Institutions (14-18px)
  h3: number;          // Subheadings (13-16px)
  body: number;        // Regular text (12-14px)
  small: number;       // Dates, locations (11-13px)
  caption: number;     // Meta info (10-12px)
}

// Line Heights
export interface LineHeightScale {
  tight: number;       // Headings (1.1-1.3)
  normal: number;      // Body text (1.4-1.6)
  relaxed: number;     // Lists, paragraphs (1.6-1.8)
}

// Spacing Scale
export interface SpacingScale {
  xs: number;          // 4px
  sm: number;          // 8px
  md: number;          // 12px
  lg: number;          // 16px
  xl: number;          // 24px
  '2xl': number;       // 32px
  '3xl': number;       // 48px
}

// Color Palette with Hierarchy
export interface ColorPalette {
  // Primary Colors
  primary: string;         // Main brand color (name, major headers)
  primaryDark: string;     // Darker variant for hover/emphasis
  primaryLight: string;    // Lighter variant for backgrounds
  
  // Text Colors with Hierarchy
  textPrimary: string;     // Main body text (#1F2937 - darkest)
  textSecondary: string;   // Supporting text (#4B5563 - medium)
  textTertiary: string;    // Dates, locations (#6B7280 - lighter)
  textMuted: string;       // Meta info, captions (#9CA3AF - lightest)
  
  // Accent Colors
  accent: string;          // Custom accent (bullets, highlights)
  accentLight: string;     // Light accent for backgrounds
  
  // Structural Colors
  border: string;          // Borders, dividers
  borderLight: string;     // Subtle dividers
  background: string;      // Background tints
  
  // Semantic Colors
  success: string;         // Success states
  warning: string;         // Warning states
  error: string;           // Error states
}

// Complete Theme with Color Palette
export interface DesignTheme {
  name: string;
  description: string;
  colors: ColorPalette;
  // When to use this theme
  bestFor: string[];
}

// Typography Presets
export const TYPOGRAPHY_PRESETS = {
  compact: {
    display: 28,
    h1: 16,
    h2: 14,
    h3: 13,
    body: 12,
    small: 11,
    caption: 10,
  },
  normal: {
    display: 32,
    h1: 18,
    h2: 15,
    h3: 14,
    body: 13,
    small: 12,
    caption: 11,
  },
  spacious: {
    display: 36,
    h1: 20,
    h2: 17,
    h3: 15,
    body: 14,
    small: 13,
    caption: 12,
  },
};

// Line Height Presets
export const LINE_HEIGHT_PRESETS = {
  compact: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.5,
  },
  normal: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  spacious: {
    tight: 1.3,
    normal: 1.6,
    relaxed: 1.7,
  },
};

// Spacing Presets
export const SPACING_PRESETS = {
  compact: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 36,
  },
  normal: {
    xs: 4,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
  },
  spacious: {
    xs: 6,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 60,
  },
};

// Professional Design Themes with Complete Color Palettes
export const DESIGN_THEMES: DesignTheme[] = [
  {
    name: "Classic Black",
    description: "Traditional, timeless, universally safe",
    bestFor: ["Finance", "Law", "Government", "Traditional Industries"],
    colors: {
      primary: "#000000",
      primaryDark: "#000000",
      primaryLight: "#F3F4F6",
      
      textPrimary: "#111827",      // Almost black
      textSecondary: "#374151",    // Dark gray
      textTertiary: "#6B7280",     // Medium gray
      textMuted: "#9CA3AF",        // Light gray
      
      accent: "#000000",
      accentLight: "#F9FAFB",
      
      border: "#000000",
      borderLight: "#E5E7EB",
      background: "#F9FAFB",
      
      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
    },
  },
  {
    name: "Professional Blue",
    description: "Corporate, trustworthy, tech-friendly",
    bestFor: ["Corporate", "Tech", "Healthcare", "Consulting"],
    colors: {
      primary: "#1E40AF",          // Deep blue
      primaryDark: "#1E3A8A",      // Navy
      primaryLight: "#DBEAFE",     // Light blue
      
      textPrimary: "#1E3A8A",      // Navy for important text
      textSecondary: "#1E40AF",    // Blue for secondary
      textTertiary: "#64748B",     // Slate for tertiary
      textMuted: "#94A3B8",        // Light slate
      
      accent: "#2563EB",
      accentLight: "#EFF6FF",
      
      border: "#2563EB",
      borderLight: "#DBEAFE",
      background: "#F8FAFC",
      
      success: "#0EA5E9",
      warning: "#F59E0B",
      error: "#EF4444",
    },
  },
  {
    name: "Modern Purple",
    description: "Creative, innovative, startup-friendly",
    bestFor: ["Startups", "Design", "Creative Tech", "Innovation"],
    colors: {
      primary: "#7C3AED",          // Vibrant purple
      primaryDark: "#6D28D9",      // Deep purple
      primaryLight: "#EDE9FE",     // Light purple
      
      textPrimary: "#581C87",      // Dark purple
      textSecondary: "#7C3AED",    // Main purple
      textTertiary: "#6B7280",     // Gray
      textMuted: "#9CA3AF",        // Light gray
      
      accent: "#8B5CF6",
      accentLight: "#F5F3FF",
      
      border: "#7C3AED",
      borderLight: "#DDD6FE",
      background: "#FAF5FF",
      
      success: "#10B981",
      warning: "#F59E0B",
      error: "#F43F5E",
    },
  },
  {
    name: "Tech Green",
    description: "Fresh, eco-friendly, growth-oriented",
    bestFor: ["Sustainability", "Education", "Healthcare", "Growth Companies"],
    colors: {
      primary: "#059669",          // Emerald
      primaryDark: "#047857",      // Dark emerald
      primaryLight: "#D1FAE5",     // Light emerald
      
      textPrimary: "#064E3B",      // Dark green
      textSecondary: "#059669",    // Main green
      textTertiary: "#6B7280",     // Gray
      textMuted: "#9CA3AF",        // Light gray
      
      accent: "#10B981",
      accentLight: "#ECFDF5",
      
      border: "#059669",
      borderLight: "#A7F3D0",
      background: "#F0FDF4",
      
      success: "#22C55E",
      warning: "#FBBF24",
      error: "#EF4444",
    },
  },
  {
    name: "Executive Gray",
    description: "Sophisticated, elegant, leadership-focused",
    bestFor: ["Executive", "Leadership", "Management", "C-Level"],
    colors: {
      primary: "#374151",          // Charcoal
      primaryDark: "#1F2937",      // Darker gray
      primaryLight: "#E5E7EB",     // Light gray
      
      textPrimary: "#111827",      // Almost black
      textSecondary: "#374151",    // Dark gray
      textTertiary: "#6B7280",     // Medium gray
      textMuted: "#9CA3AF",        // Light gray
      
      accent: "#4B5563",
      accentLight: "#F3F4F6",
      
      border: "#6B7280",
      borderLight: "#D1D5DB",
      background: "#F9FAFB",
      
      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
    },
  },
];

// Typography Application Map
export interface TypographyApplication {
  // Where each typography level is used
  display: string[];       // ["Full Name"]
  h1: string[];           // ["Section Headers"]
  h2: string[];           // ["Job Titles", "Institutions"]
  h3: string[];           // ["Subheadings", "Certifications"]
  body: string[];         // ["Summary", "Achievements", "Descriptions"]
  small: string[];        // ["Dates", "Locations", "Companies"]
  caption: string[];      // ["Meta info", "IDs", "Links"]
}

// Color Application Map
export interface ColorApplication {
  // Where each color is used
  primary: string[];              // ["Name", "Section Headers"]
  primaryDark: string[];          // ["Hover states", "Emphasis"]
  textPrimary: string[];          // ["Job Titles", "Main Achievements"]
  textSecondary: string[];        // ["Companies", "Degrees"]
  textTertiary: string[];         // ["Dates", "Locations"]
  textMuted: string[];            // ["Meta info", "Optional fields"]
  accent: string[];               // ["Custom bullets", "Highlights"]
  border: string[];               // ["Header underlines", "Dividers"]
}

// Usage Guide
export const TYPOGRAPHY_USAGE: TypographyApplication = {
  display: ["Full Name"],
  h1: ["Professional Summary", "Professional Experience", "Education", "Technical Skills"],
  h2: ["Job Titles (Senior Software Engineer)", "University Names"],
  h3: ["Company Names", "Degree Names", "Certification Names"],
  body: ["Summary paragraph", "Achievement bullets", "Project descriptions"],
  small: ["Dates (Jan 2022 - Present)", "Locations (San Francisco, CA)", "Issuers"],
  caption: ["Credential IDs", "URLs", "Meta information"],
};

export const COLOR_USAGE: ColorApplication = {
  primary: ["Full Name", "Section Headers (h1)"],
  primaryDark: ["Hover states on links", "Strong emphasis"],
  textPrimary: ["Job Titles", "Key achievements", "Important content"],
  textSecondary: ["Company names", "Degrees", "Skill categories"],
  textTertiary: ["Dates", "Locations", "Duration"],
  textMuted: ["Email", "Phone", "Meta info", "Optional fields"],
  accent: ["Custom bullets (arrow, chevron)", "Highlights", "Badges"],
  border: ["Section underlines", "Dividers", "Borders"],
};

// Helper function to get color by semantic name
export const getSemanticColor = (
  theme: DesignTheme,
  semantic: keyof ColorPalette
): string => {
  return theme.colors[semantic];
};

// Helper function to get typography size
export const getTypographySize = (
  scale: TypographyScale,
  level: keyof TypographyScale
): number => {
  return scale[level];
};

