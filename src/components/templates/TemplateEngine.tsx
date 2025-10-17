'use client';

import React from 'react';
import { CVTemplate, TemplateRendererProps } from '@/types/templates';
import { CV_TEMPLATES } from '@/constants/templates';

// Import template renderers
import ProfessionalStandardTemplate from './renderers/ProfessionalStandardTemplate';
import ExecutiveMinimalTemplate from './renderers/ExecutiveMinimalTemplate';
import TechnicalTwoColumnTemplate from './renderers/TechnicalTwoColumnTemplate';
import CreativeModernTemplate from './renderers/CreativeModernTemplate';
import AcademicComprehensiveTemplate from './renderers/AcademicComprehensiveTemplate';
import EuropeanStandardTemplate from './renderers/EuropeanStandardTemplate';

/**
 * Template Engine
 * Centralized template rendering system following DRY and KISS principles
 */
export class TemplateEngine {
  private static instance: TemplateEngine;
  private templateRenderers: Map<
    string,
    React.ComponentType<TemplateRendererProps>
  >;

  private constructor() {
    this.templateRenderers = new Map([
      ['professional-standard', ProfessionalStandardTemplate],
      ['executive-minimal', ExecutiveMinimalTemplate],
      ['technical-two-column', TechnicalTwoColumnTemplate],
      ['creative-modern', CreativeModernTemplate],
      ['academic-comprehensive', AcademicComprehensiveTemplate],
      ['european-standard', EuropeanStandardTemplate],
    ]);
  }

  /**
   * Singleton pattern for template engine
   */
  public static getInstance(): TemplateEngine {
    if (!TemplateEngine.instance) {
      TemplateEngine.instance = new TemplateEngine();
    }
    return TemplateEngine.instance;
  }

  /**
   * Render a template with given props
   */
  public render(
    templateId: string,
    props: TemplateRendererProps
  ): React.ReactElement {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template with id "${templateId}" not found`);
    }

    const Renderer = this.templateRenderers.get(templateId);
    if (!Renderer) {
      throw new Error(`Renderer for template "${templateId}" not found`);
    }

    return React.createElement(Renderer, props);
  }

  /**
   * Get all available templates
   */
  public getAvailableTemplates(): CVTemplate[] {
    return CV_TEMPLATES;
  }

  /**
   * Get template by ID
   */
  public getTemplateById(id: string): CVTemplate | undefined {
    return CV_TEMPLATES.find(template => template.id === id);
  }

  /**
   * Get default template
   */
  public getDefaultTemplate(): CVTemplate {
    return CV_TEMPLATES.find(template => template.isDefault) || CV_TEMPLATES[0];
  }

  /**
   * Get templates by category
   */
  public getTemplatesByCategory(category: string): CVTemplate[] {
    return CV_TEMPLATES.filter(template => template.category === category);
  }

  /**
   * Validate template configuration
   */
  public validateTemplate(template: CVTemplate): boolean {
    return !!(
      template.id &&
      template.name &&
      template.layout &&
      template.sections &&
      template.sections.length > 0
    );
  }
}

/**
 * Hook for using template engine
 */
export const useTemplateEngine = () => {
  return React.useMemo(() => TemplateEngine.getInstance(), []);
};

/**
 * Template Renderer Component
 * Main component that renders templates based on selection
 */
interface TemplateRendererComponentProps extends TemplateRendererProps {
  templateId: string;
}

export const TemplateRenderer = React.forwardRef<
  HTMLDivElement,
  TemplateRendererComponentProps
>(({ templateId, ...props }, ref) => {
  const engine = useTemplateEngine();

  try {
    const renderedTemplate = engine.render(templateId, props);
    // Clone the element and add ref
    return React.cloneElement(renderedTemplate, { ref });
  } catch {
    // Template rendering error - falling back to default
    // Fallback to default template
    const defaultTemplate = engine.getDefaultTemplate();
    const fallbackTemplate = engine.render(defaultTemplate.id, props);
    return React.cloneElement(fallbackTemplate, { ref });
  }
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default TemplateEngine;
