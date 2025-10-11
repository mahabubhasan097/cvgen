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
  const getHeaderStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${customization.fontSize.heading}px`,
      color: customization.theme.primary,
      paddingBottom: "4px",
      marginBottom: `${customization.spacing.line}px`,
    };

    switch (customization.headerStyle) {
      case "underline":
        return {
          ...baseStyle,
          borderBottom: `2px solid ${customization.theme.border}`,
        };
      case "background":
        return {
          ...baseStyle,
          backgroundColor: customization.theme.primary,
          color: "white",
          padding: "8px 12px",
          marginBottom: `${customization.spacing.line * 2}px`,
        };
      case "border":
        return {
          ...baseStyle,
          border: `2px solid ${customization.theme.border}`,
          padding: "6px 12px",
          marginBottom: `${customization.spacing.line * 2}px`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <section className={className} style={style}>
      <h2
        className="font-bold uppercase tracking-wide"
        style={getHeaderStyle()}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};

export default ResumeSection;

