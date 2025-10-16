import React from "react";
import { CustomizationSettings } from "@/types/customization";

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  customization: CustomizationSettings;
  style?: React.CSSProperties;
}

/**
 * ResumeSection Component
 * Reusable section wrapper with consistent styling
 */
const ResumeSection: React.FC<ResumeSectionProps> = ({
  title,
  children,
  className = "",
  customization,
  style,
}) => {
  // Helper function to get effective header color
  const getHeaderColor = () => {
    // If accentColor is set to a custom value (not the theme's primary), use it
    if (customization.accentColor && customization.accentColor !== customization.theme.primary) {
      return customization.accentColor;
    }
    // Otherwise, use theme's primary color
    return customization.theme.primary;
  };
  const getHeaderStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${customization.fontSize.heading}px`,
      color: getHeaderColor(),
      paddingBottom: "4px",
      marginBottom: `${customization.spacing.line}px`,
    };

    switch (customization.headerStyle) {
      case "underline":
        return {
          ...baseStyle,
          borderBottom: `${customization.borderWidth}px solid ${getHeaderColor()}`,
        };
      case "background":
        return {
          ...baseStyle,
          backgroundColor: getHeaderColor(),
          color: "white",
          padding: "8px 12px",
          marginBottom: `${customization.spacing.line * 2}px`,
        };
      case "border":
        return {
          ...baseStyle,
          border: `${customization.borderWidth}px solid ${getHeaderColor()}`,
          padding: "6px 12px",
          marginBottom: `${customization.spacing.line * 2}px`,
        };
      default:
        return baseStyle;
    }
  };

  const getTextTransform = (): React.CSSProperties["textTransform"] => {
    switch (customization.headingCase) {
      case "uppercase":
        return "uppercase";
      case "capitalize":
        return "capitalize";
      case "normal":
      default:
        return "none";
    }
  };

  return (
    <section className={className} style={style}>
      <h2
        className="font-bold tracking-wide"
        style={{ ...getHeaderStyle(), textTransform: getTextTransform() }}
      >
        {title}
      </h2>
      <div>{children}</div>
      {customization.showDividers && (
        <div 
          className="mt-4"
          style={{ 
            borderBottom: `1px solid ${customization.theme.border}20`,
          }} 
        />
      )}
    </section>
  );
};

export default ResumeSection;

