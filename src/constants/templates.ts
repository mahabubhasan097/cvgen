import { CVTemplate } from "@/types/templates";

/**
 * Internationally Recognized CV Templates
 * Based on global standards and ATS-friendly formats
 */

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "professional-standard",
    name: "Professional Standard",
    description: "Clean, ATS-friendly single-column layout. Perfect for corporate environments and most industries.",
    category: "professional",
    region: "international",
    layout: {
      type: "single-column",
      headerStyle: "centered",
      sectionOrder: ["summary", "experience", "education", "skills", "certifications", "projects"],
      spacing: "normal",
      maxWidth: "standard"
    },
    sections: [
      {
        id: "summary",
        title: "Professional Summary",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "experience",
        title: "Professional Experience",
        order: 2,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "education",
        title: "Education",
        order: 3,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Technical Skills",
        order: 4,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "certifications",
        title: "Certifications",
        order: 5,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      },
      {
        id: "projects",
        title: "Key Projects",
        order: 6,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      }
    ],
    preview: "/api/placeholder/400/600",
    isDefault: true,
    features: ["ATS-friendly", "Clean", "Professional", "Single-column"]
  },
  {
    id: "executive-minimal",
    name: "Executive Minimal",
    description: "Sophisticated, minimal design for senior executives. Emphasizes achievements and leadership.",
    category: "executive",
    region: "international",
    layout: {
      type: "single-column",
      headerStyle: "left-aligned",
      sectionOrder: ["summary", "experience", "education", "skills"],
      spacing: "spacious",
      maxWidth: "narrow"
    },
    sections: [
      {
        id: "summary",
        title: "Executive Summary",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "none", spacing: "loose" }
      },
      {
        id: "experience",
        title: "Executive Experience",
        order: 2,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "border", spacing: "loose" }
      },
      {
        id: "education",
        title: "Education & Credentials",
        order: 3,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "border", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Core Competencies",
        order: 4,
        visible: true,
        layout: "minimal",
        styling: { headerStyle: "border", spacing: "normal" }
      }
    ],
    preview: "/api/placeholder/400/600",
    features: ["Executive", "Minimal", "Sophisticated", "Leadership-focused"]
  },
  {
    id: "technical-two-column",
    name: "Technical Two-Column",
    description: "Two-column layout optimized for technical professionals. Skills and contact info in sidebar.",
    category: "technical",
    region: "international",
    layout: {
      type: "two-column",
      headerStyle: "centered",
      sectionOrder: ["summary", "experience", "education", "skills", "certifications", "projects"],
      spacing: "normal",
      maxWidth: "wide"
    },
    sections: [
      {
        id: "summary",
        title: "Technical Summary",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "experience",
        title: "Technical Experience",
        order: 2,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "education",
        title: "Education",
        order: 3,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Technical Skills",
        order: 4,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "certifications",
        title: "Certifications",
        order: 5,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      },
      {
        id: "projects",
        title: "Technical Projects",
        order: 6,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      }
    ],
    preview: "/api/placeholder/400/600",
    features: ["Two-column", "Technical", "Skills-focused", "ATS-friendly"]
  },
  {
    id: "creative-modern",
    name: "Creative Modern",
    description: "Modern, visually appealing design for creative professionals. Balanced layout with emphasis on projects.",
    category: "creative",
    region: "international",
    layout: {
      type: "hybrid",
      headerStyle: "centered",
      sectionOrder: ["summary", "experience", "projects", "skills", "education"],
      spacing: "normal",
      maxWidth: "standard"
    },
    sections: [
      {
        id: "summary",
        title: "Creative Profile",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "background", spacing: "normal" }
      },
      {
        id: "experience",
        title: "Professional Experience",
        order: 2,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "projects",
        title: "Featured Projects",
        order: 3,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "background", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Skills & Tools",
        order: 4,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "education",
        title: "Education",
        order: 5,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      }
    ],
    preview: "/api/placeholder/400/600",
    features: ["Creative", "Modern", "Project-focused", "Visual"]
  },
  {
    id: "academic-comprehensive",
    name: "Academic Comprehensive",
    description: "Comprehensive layout for academic professionals. Emphasizes publications, research, and education.",
    category: "academic",
    region: "international",
    layout: {
      type: "single-column",
      headerStyle: "centered",
      sectionOrder: ["summary", "education", "experience", "publications", "skills", "certifications"],
      spacing: "normal",
      maxWidth: "standard"
    },
    sections: [
      {
        id: "summary",
        title: "Research Profile",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "education",
        title: "Education & Qualifications",
        order: 2,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "experience",
        title: "Academic Experience",
        order: 3,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "publications",
        title: "Publications & Research",
        order: 4,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Research Skills",
        order: 5,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "certifications",
        title: "Professional Certifications",
        order: 6,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      }
    ],
    preview: "/api/placeholder/400/600",
    features: ["Academic", "Research-focused", "Publications", "Comprehensive"]
  },
  {
    id: "european-standard",
    name: "European Standard",
    description: "European-style CV format. Includes personal information and follows EU standards.",
    category: "professional",
    region: "europe",
    layout: {
      type: "single-column",
      headerStyle: "left-aligned",
      sectionOrder: ["summary", "experience", "education", "skills", "languages", "certifications"],
      spacing: "normal",
      maxWidth: "standard"
    },
    sections: [
      {
        id: "summary",
        title: "Professional Profile",
        order: 1,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "experience",
        title: "Professional Experience",
        order: 2,
        visible: true,
        layout: "detailed",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "education",
        title: "Education & Training",
        order: 3,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "skills",
        title: "Core Competencies",
        order: 4,
        visible: true,
        layout: "default",
        styling: { headerStyle: "underline", spacing: "normal" }
      },
      {
        id: "languages",
        title: "Languages",
        order: 5,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      },
      {
        id: "certifications",
        title: "Certifications",
        order: 6,
        visible: true,
        layout: "compact",
        styling: { headerStyle: "underline", spacing: "tight" }
      }
    ],
    preview: "/api/placeholder/400/600",
    features: ["European", "EU Standards", "Languages", "Professional"]
  }
];

/**
 * Get template by ID
 */
export const getTemplateById = (id: string): CVTemplate | undefined => {
  return CV_TEMPLATES.find(template => template.id === id);
};

/**
 * Get default template
 */
export const getDefaultTemplate = (): CVTemplate => {
  return CV_TEMPLATES.find(template => template.isDefault) || CV_TEMPLATES[0];
};

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category: string): CVTemplate[] => {
  return CV_TEMPLATES.filter(template => template.category === category);
};

/**
 * Get templates by region
 */
export const getTemplatesByRegion = (region: string): CVTemplate[] => {
  return CV_TEMPLATES.filter(template => template.region === region);
};
