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
  primary: string;
  secondary: string;
  text: string;
  border: string;
}

export interface CustomizationSettings {
  theme: ColorTheme;
  fontSize: {
    name: number;
    heading: number;
    body: number;
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
  },
  {
    name: "Professional Blue",
    primary: "#1E40AF",
    secondary: "#3B82F6",
    text: "#1E3A8A",
    border: "#2563EB",
  },
  {
    name: "Modern Purple",
    primary: "#7C3AED",
    secondary: "#8B5CF6",
    text: "#6D28D9",
    border: "#7C3AED",
  },
  {
    name: "Tech Green",
    primary: "#059669",
    secondary: "#10B981",
    text: "#047857",
    border: "#059669",
  },
  {
    name: "Executive Gray",
    primary: "#374151",
    secondary: "#4B5563",
    text: "#1F2937",
    border: "#6B7280",
  },
];

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  theme: DEFAULT_THEMES[0],
  fontSize: {
    name: 30,
    heading: 18,
    body: 14,
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
  accentColor: "#000000",
  headingCase: "normal",
  showDividers: false,
};

// Preset configurations
export const PRESET_CONFIGS = {
  compact: {
    fontSize: { name: 28, heading: 16, body: 12 },
    spacing: { section: 12, line: 4, letterSpacing: 0, pageMargin: 36, sectionPadding: 0 },
    lineHeight: { heading: 1.1, body: 1.4, list: 1.5 },
  },
  normal: {
    fontSize: { name: 30, heading: 18, body: 14 },
    spacing: { section: 16, line: 6, letterSpacing: 0, pageMargin: 48, sectionPadding: 0 },
    lineHeight: { heading: 1.2, body: 1.5, list: 1.6 },
  },
  spacious: {
    fontSize: { name: 34, heading: 20, body: 15 },
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

