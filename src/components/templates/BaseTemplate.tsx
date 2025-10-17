"use client";

import React, { forwardRef } from "react";
import { TemplateRendererProps, TemplateLayout } from "@/types/templates";
import EditableField from "../EditableField";

/**
 * Base Template Component
 * Provides common functionality and structure for all CV templates
 * Follows DRY principle by centralizing shared logic
 */
export interface BaseTemplateProps extends TemplateRendererProps {
  layout: TemplateLayout;
  children?: React.ReactNode;
}

/**
 * Base Template Renderer
 * Abstract base class for all template renderers
 */
export const BaseTemplate = forwardRef<HTMLDivElement, BaseTemplateProps>(
  ({ data, customization, onUpdate, layout, children }, ref) => {
    
    // Helper function to get effective header color
    const getHeaderColor = () => {
      if (customization.accentColor && customization.accentColor !== customization.theme.primary) {
        return customization.accentColor;
      }
      return customization.theme.primary;
    };

    // Common update handlers
    const updateContact = (field: keyof typeof data.contact, value: string) => {
      if (onUpdate) {
        onUpdate({
          ...data,
          contact: { ...data.contact, [field]: value },
        });
      }
    };

    // updateSummary function available for child templates

    // Base container styles
    const getContainerStyles = () => {
      const baseStyles = {
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: customization.spacing.line,
        letterSpacing: `${customization.spacing.letterSpacing}px`,
        color: "#374151", // Base text color
        maxWidth: layout.maxWidth === 'narrow' ? '800px' : 
                 layout.maxWidth === 'wide' ? '1200px' : '1000px',
        margin: '0 auto',
        padding: `${customization.spacing.pageMargin}px`,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      };

      return baseStyles;
    };

    // Header styles based on layout
    const getHeaderStyles = () => {
      const baseHeaderStyles = {
        marginBottom: `${customization.spacing.section}px`,
        textAlign: layout.headerStyle === 'centered' ? 'center' as const : 
                  layout.headerStyle === 'left-aligned' ? 'left' as const : 'left' as const,
      };

      return baseHeaderStyles;
    };

    // Render header section
    const renderHeader = () => {
      const headerStyles = getHeaderStyles();
      
      return (
        <header style={headerStyles}>
          {/* Name */}
          <h1
            style={{
              fontSize: `${customization.fontSize.name}px`,
              fontWeight: 'bold',
              color: getHeaderColor(),
              margin: '0 0 8px 0',
              letterSpacing: `${customization.spacing.letterSpacing * 1.5}px`,
            }}
          >
            <EditableField
              value={data.contact.fullName}
              onChange={(value) => updateContact("fullName", value)}
              placeholder="Your Full Name"
              className="font-bold"
            />
          </h1>

          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            {data.contact.email && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableField
                  value={data.contact.email}
                  onChange={(value) => updateContact("email", value)}
                  placeholder="email@example.com"
                />
              </div>
            )}
            {data.contact.phone && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableField
                  value={data.contact.phone}
                  onChange={(value) => updateContact("phone", value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableField
                  value={data.contact.location}
                  onChange={(value) => updateContact("location", value)}
                  placeholder="City, State"
                />
              </div>
            )}
            {data.contact.linkedin && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <EditableField
                  value={data.contact.linkedin}
                  onChange={(value) => updateContact("linkedin", value)}
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
            )}
            {data.contact.github && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <EditableField
                  value={data.contact.github}
                  onChange={(value) => updateContact("github", value)}
                  placeholder="github.com/yourusername"
                />
              </div>
            )}
            {data.contact.portfolio && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <EditableField
                  value={data.contact.portfolio}
                  onChange={(value) => updateContact("portfolio", value)}
                  placeholder="yourportfolio.com"
                />
              </div>
            )}
          </div>
        </header>
      );
    };

    return (
      <div ref={ref} style={getContainerStyles()}>
        {renderHeader()}
        {children}
      </div>
    );
  }
);

BaseTemplate.displayName = "BaseTemplate";

export default BaseTemplate;
