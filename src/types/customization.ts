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
  };
  sections: SectionConfig[];
  showIcons: boolean;
  headerStyle: "underline" | "background" | "border";
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
  },
  sections: [
    { id: "summary", title: "Professional Summary", visible: true, order: 1 },
    { id: "experience", title: "Professional Experience", visible: true, order: 2 },
    { id: "education", title: "Education", visible: true, order: 3 },
    { id: "skills", title: "Technical Skills", visible: true, order: 4 },
    { id: "certifications", title: "Certifications", visible: true, order: 5 },
    { id: "projects", title: "Projects", visible: false, order: 6 },
  ],
  showIcons: false,
  headerStyle: "underline",
};

