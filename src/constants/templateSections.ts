import { SectionConfig } from '@/types/customization';

/**
 * Template-specific section configurations
 * Each template has its own sections and ordering based on their design and purpose
 */

// Default/Professional Standard Template sections
export const PROFESSIONAL_STANDARD_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Professional Summary', visible: true, order: 1 },
  {
    id: 'experience',
    title: 'Professional Experience',
    visible: true,
    order: 2,
  },
  { id: 'education', title: 'Education', visible: true, order: 3 },
  { id: 'skills', title: 'Technical Skills', visible: true, order: 4 },
  { id: 'certifications', title: 'Certifications', visible: true, order: 5 },
  { id: 'projects', title: 'Projects', visible: false, order: 6 },
];

// Executive Minimal Template sections - focused on leadership and results
export const EXECUTIVE_MINIMAL_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Executive Summary', visible: true, order: 1 },
  { id: 'experience', title: 'Executive Experience', visible: true, order: 2 },
  { id: 'education', title: 'Education', visible: true, order: 3 },
  { id: 'skills', title: 'Leadership & Skills', visible: true, order: 4 },
  {
    id: 'certifications',
    title: 'Professional Certifications',
    visible: true,
    order: 5,
  },
];

// Technical Two-Column Template sections - emphasizes technical skills and projects
export const TECHNICAL_TWO_COLUMN_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Technical Summary', visible: true, order: 1 },
  { id: 'skills', title: 'Technical Skills', visible: true, order: 2 },
  {
    id: 'experience',
    title: 'Professional Experience',
    visible: true,
    order: 3,
  },
  { id: 'projects', title: 'Key Projects', visible: true, order: 4 },
  { id: 'education', title: 'Education', visible: true, order: 5 },
  { id: 'certifications', title: 'Certifications', visible: true, order: 6 },
];

// Creative Modern Template sections - showcases creativity and portfolio
export const CREATIVE_MODERN_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Creative Profile', visible: true, order: 1 },
  {
    id: 'experience',
    title: 'Professional Experience',
    visible: true,
    order: 2,
  },
  { id: 'projects', title: 'Portfolio & Projects', visible: true, order: 3 },
  { id: 'skills', title: 'Creative Skills', visible: true, order: 4 },
  { id: 'education', title: 'Education', visible: true, order: 5 },
  { id: 'certifications', title: 'Certifications', visible: false, order: 6 },
];

// Academic Comprehensive Template sections - emphasizes academic achievements
export const ACADEMIC_COMPREHENSIVE_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Academic Profile', visible: true, order: 1 },
  { id: 'education', title: 'Education', visible: true, order: 2 },
  {
    id: 'experience',
    title: 'Research & Teaching Experience',
    visible: true,
    order: 3,
  },
  { id: 'projects', title: 'Research Projects', visible: true, order: 4 },
  { id: 'skills', title: 'Research Skills', visible: true, order: 5 },
  {
    id: 'certifications',
    title: 'Academic Certifications',
    visible: true,
    order: 6,
  },
];

// European Standard Template sections - follows Europass structure
export const EUROPEAN_STANDARD_SECTIONS: SectionConfig[] = [
  { id: 'summary', title: 'Personal Statement', visible: true, order: 1 },
  { id: 'experience', title: 'Work Experience', visible: true, order: 2 },
  { id: 'education', title: 'Education and Training', visible: true, order: 3 },
  { id: 'skills', title: 'Personal Skills', visible: true, order: 4 },
  {
    id: 'certifications',
    title: 'Additional Information',
    visible: false,
    order: 5,
  },
];

/**
 * Get sections configuration for a specific template
 */
export const getTemplateSections = (templateId: string): SectionConfig[] => {
  switch (templateId) {
    case 'professional-standard':
      return PROFESSIONAL_STANDARD_SECTIONS;
    case 'executive-minimal':
      return EXECUTIVE_MINIMAL_SECTIONS;
    case 'technical-two-column':
      return TECHNICAL_TWO_COLUMN_SECTIONS;
    case 'creative-modern':
      return CREATIVE_MODERN_SECTIONS;
    case 'academic-comprehensive':
      return ACADEMIC_COMPREHENSIVE_SECTIONS;
    case 'european-standard':
      return EUROPEAN_STANDARD_SECTIONS;
    default:
      return PROFESSIONAL_STANDARD_SECTIONS; // Default fallback
  }
};

/**
 * Get all available template IDs
 */
export const TEMPLATE_IDS = [
  'professional-standard',
  'executive-minimal',
  'technical-two-column',
  'creative-modern',
  'academic-comprehensive',
  'european-standard',
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];
