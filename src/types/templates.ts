import { ResumeData } from "./resume";
import { CustomizationSettings } from "./customization";

/**
 * Template Section Configuration
 * Defines how a section should be rendered in a specific template
 */
export interface TemplateSection {
  id: string;
  title: string;
  order: number;
  visible: boolean;
  layout?: 'default' | 'compact' | 'detailed' | 'minimal';
  styling?: {
    headerStyle?: 'underline' | 'background' | 'border' | 'none';
    spacing?: 'tight' | 'normal' | 'loose';
    alignment?: 'left' | 'center' | 'right';
  };
}

/**
 * Template Layout Configuration
 * Defines the overall structure and layout of a CV template
 */
export interface TemplateLayout {
  type: 'single-column' | 'two-column' | 'hybrid';
  headerStyle: 'centered' | 'left-aligned' | 'minimal';
  sectionOrder: string[];
  spacing: 'compact' | 'normal' | 'spacious';
  maxWidth?: 'narrow' | 'standard' | 'wide';
}

/**
 * CV Template Definition
 * Complete template configuration with all necessary properties
 */
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'academic' | 'executive' | 'technical';
  region: 'international' | 'us' | 'europe' | 'asia' | 'australia';
  layout: TemplateLayout;
  sections: TemplateSection[];
  preview: string; // Base64 or URL to preview image
  isDefault?: boolean;
  features: string[]; // e.g., ['ATS-friendly', 'Modern', 'Clean']
}

/**
 * Template Renderer Props
 * Props passed to template renderer components
 */
export interface TemplateRendererProps {
  data: ResumeData;
  customization: CustomizationSettings;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

/**
 * Template Engine Interface
 * Defines the contract for template rendering engines
 */
export interface TemplateEngine {
  render(template: CVTemplate, props: TemplateRendererProps): React.ReactElement;
  getAvailableTemplates(): CVTemplate[];
  getTemplateById(id: string): CVTemplate | undefined;
}

/**
 * Template Selection State
 * Manages template selection in the UI
 */
export interface TemplateSelection {
  currentTemplate: string;
  availableTemplates: CVTemplate[];
  isLoading: boolean;
  error?: string;
}

/**
 * Template Customization Options
 * Additional customization options specific to templates
 */
export interface TemplateCustomization {
  templateId: string;
  sectionVisibility: Record<string, boolean>;
  sectionOrder: string[];
  customStyling?: Record<string, string | number | boolean>;
}
